import express from "express";
import compression from "compression";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { getRouteMetadata, injectMetadataIntoHtml } from "./src/utils/seo";

interface KnowledgeChunk {
  id: string;
  source: string;
  category: string;
  title: string;
  chunk: string;
  embedding: number[];
}

interface ScoredChunk extends KnowledgeChunk {
  similarity: number;
}

// Lazy/Safe Gemini initialization
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is not configured");
    }
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

// Load in-memory knowledge base
let knowledgeBase: KnowledgeChunk[] = [];
try {
  const kbPath = path.resolve("src/data/ragKnowledgeBase.json");
  if (fs.existsSync(kbPath)) {
    const raw = fs.readFileSync(kbPath, "utf-8");
    knowledgeBase = JSON.parse(raw);
    console.log(`[RAG] Loaded ${knowledgeBase.length} embedded chunks into memory.`);
  } else {
    console.warn(`[RAG] Knowledge base file not found at ${kbPath}`);
  }
} catch (e: any) {
  console.error("[RAG] Failed to load ragKnowledgeBase.json:", e.message);
}

// Cosine similarity utilities
function dotProduct(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }
  return sum;
}

function magnitude(a: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * a[i];
  }
  return Math.sqrt(sum);
}

function cosineSimilarity(a: number[], b: number[]): number {
  const magA = magnitude(a);
  const magB = magnitude(b);
  if (magA === 0 || magB === 0) return 0;
  return dotProduct(a, b) / (magA * magB);
}

// Keyword-based fallback scoring if offline/testing
function keywordFallbackScore(query: string, chunk: KnowledgeChunk): number {
  const qWords = query.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(w => w.length > 2);
  if (qWords.length === 0) return 0;
  
  const text = `${chunk.title} ${chunk.chunk} ${chunk.source}`.toLowerCase();
  let matches = 0;
  for (const w of qWords) {
    if (text.includes(w)) matches++;
  }
  return (matches / qWords.length) * 0.75;
}

// In-Memory Rate Limiting for /api/copilot/query (20 req / minute / IP)
interface RateLimitEntry {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  entry.count++;
  return false;
}

// Periodic cleanup of stale rate-limit entries
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000).unref();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Safe reverse-proxy configuration for Cloud Run / AI Studio hosting
  app.set("trust proxy", 1);

  app.use(compression() as unknown as express.RequestHandler);
  app.use(express.json({ limit: "64kb" }));

  // -------------------------------------------------------------
  // API: Health Check
  // -------------------------------------------------------------
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      chunksInMemory: knowledgeBase.length,
      embeddingModel: "gemini-embedding-2-preview",
      generationModel: "gemini-3.1-flash-lite",
    });
  });

  // -------------------------------------------------------------
  // API: Copilot Architecture Metadata (Explainability)
  // -------------------------------------------------------------
  app.get("/api/copilot/architecture", (_req, res) => {
    res.json({
      architecture: "In-Memory Vectorless RAG (Retrieval-Augmented Generation)",
      totalChunks: knowledgeBase.length,
      embeddingModel: "gemini-embedding-2-preview (512-dim)",
      generationModel: "gemini-3.1-flash-lite",
      retrievalMethod: "Exact Cosine Similarity (In-Memory Array)",
      confidenceThreshold: 0.68,
      vectorDatabase: "None (Zero-dependency In-Memory JSON)",
      systemSafetyPattern: "Gemini-Primary with Confidence-Gated 'Book Chat' Fallback",
      pipelineSteps: [
        { name: "Documents", desc: "Resume, Case Studies, Operating Principles & Methodology" },
        { name: "Chunk", desc: "Semantic boundary splitting (1 chunk per bullet/sub-section)" },
        { name: "Embed", desc: "Build-time Gemini 512-dim dense vector embedding" },
        { name: "Retrieve", desc: "Query embedding + in-memory cosine similarity ranking (top 3-5)" },
        { name: "Ground", desc: "Confidence threshold check (>=0.68) & contextual prompt assembly" },
        { name: "Generate", desc: "Constrained synthesis with gemini-3.1-flash-lite & source citations" },
      ],
    });
  });

  // -------------------------------------------------------------
  // API: RAG Query Endpoint
  // -------------------------------------------------------------
  app.post("/api/copilot/query", async (req, res) => {
    const startTime = Date.now();
    try {
      // 0. In-Memory IP Rate Limiting (20 req / min / IP)
      const clientIp = (req.ip || req.socket.remoteAddress || "unknown").toString();
      if (isRateLimited(clientIp)) {
        return res.status(429).json({
          error: "Rate limit exceeded. Please wait a moment before asking another question.",
          fallback: true,
          retryAfter: 60,
          answer: "I've received several questions in a short period. Please wait a minute before trying again, or feel free to click 'Let's Talk' to connect with Deepak directly.",
        });
      }

      const { question, topK = 4 } = req.body;
      if (!question || typeof question !== "string" || question.trim().length === 0) {
        return res.status(400).json({ error: "Question is required." });
      }

      const cleanQuestion = question.trim();
      if (cleanQuestion.length > 1000) {
        return res.status(400).json({ error: "Question must be under 1,000 characters." });
      }

      let queryVector: number[] = [];
      let usedEmbeddingApi = false;

      // 1. Compute Query Embedding with explicit 5s timeout
      try {
        const ai = getGeminiClient();
        const embedPromise = ai.models.embedContent({
          model: "gemini-embedding-2-preview",
          contents: cleanQuestion,
          config: { outputDimensionality: 512 },
        });

        let embedTimer: NodeJS.Timeout;
        const embedTimeout = new Promise<never>((_, reject) => {
          embedTimer = setTimeout(() => reject(new Error("Embedding timed out")), 12000);
        });

        try {
          const embedRes = await Promise.race([embedPromise, embedTimeout]);
          if (embedRes.embeddings && embedRes.embeddings[0] && embedRes.embeddings[0].values) {
            queryVector = embedRes.embeddings[0].values;
            usedEmbeddingApi = true;
          }
        } finally {
          clearTimeout(embedTimer!);
        }
      } catch (embedError: any) {
        console.log("[RAG] Query embedding API unavailable, using lexical retrieval fallback:", embedError.message);
      }

      // 2. Compute Cosine Similarity against all stored chunks in memory
      let scoredChunks: ScoredChunk[] = [];
      if (usedEmbeddingApi && queryVector.length === 512) {
        scoredChunks = knowledgeBase.map((item) => ({
          ...item,
          similarity: cosineSimilarity(queryVector, item.embedding),
        }));
      } else {
        // Lexical heuristic fallback
        scoredChunks = knowledgeBase.map((item) => ({
          ...item,
          similarity: keywordFallbackScore(cleanQuestion, item),
        }));
      }

      // Sort descending by similarity score
      scoredChunks.sort((a, b) => b.similarity - a.similarity);

      // Top K retrieved
      const retrieved = scoredChunks.slice(0, Math.min(topK, scoredChunks.length));
      const topScore = retrieved.length > 0 ? retrieved[0].similarity : 0;
      const CONFIDENCE_THRESHOLD = 0.68;
      const retrievalTimeMs = Date.now() - startTime;

      // 3. Confidence Gating (Sportstech AI Coach Failover Pattern)
      if (topScore < CONFIDENCE_THRESHOLD) {
        const fallbackText =
          "I don't have enough verified information in Deepak's portfolio to answer that with high confidence. Deepak's work focuses on AI products, B2B marketplaces, subscriptions, and workflow systems. To discuss this topic directly with Deepak, please click 'Let's Talk' below to connect with him.";
        return res.json({
          question: cleanQuestion,
          answer: fallbackText,
          fallback: true,
          topSimilarity: Number(topScore.toFixed(4)),
          confidenceThreshold: CONFIDENCE_THRESHOLD,
          retrievalTimeMs,
          totalTimeMs: Date.now() - startTime,
          message: fallbackText,
          retrievedChunks: retrieved.map((c) => ({
            id: c.id,
            source: c.source,
            title: c.title,
            category: c.category,
            chunk: c.chunk,
            similarity: Number(c.similarity.toFixed(4)),
          })),
        });
      }

      // 4. Grounded Generation with Gemini 3.1 Flash Lite (with explicit 10s timeout)
      const contextBlocks = retrieved
        .map(
          (c, idx) =>
            `[Source ${idx + 1}: ${c.source} | Title: ${c.title}]\n${c.chunk}`
        )
        .join("\n\n");

      let answer = "";
      if (!process.env.GEMINI_API_KEY) {
        // Graceful contextual answer when API key is not yet configured
        answer = `${retrieved[0].chunk}\n\n*(Note: Add GEMINI_API_KEY in the Settings menu to enable AI synthesis.)*`;
      } else {
        try {
          const ai = getGeminiClient();
          const systemInstruction = `You are Dīpa, an AI assistant answering questions about Deepak Prasad's work, experience, case studies, principles, methodology, and portfolio architecture.

CRITICAL IDENTITY & CONVERSATION RULES:
1. NO GREETINGS OR SELF-INTRODUCTIONS: You introduce yourself ONLY in the initial greeting message of the chat (which the user has already seen). In every subsequent reply, you must NEVER say "Hello", "Hi", "I am Dīpa", "I am Deepak's AI assistant", or restate who or what you are. Answer the user's question directly from the very first word.
2. ALWAYS REFER TO DEEPAK IN THE THIRD PERSON: Continue to refer to Deepak in the third person ("Deepak", "he", "his"). You are an AI agent speaking about Deepak and his work; you are not Deepak.

STRICT CLOSED-WORLD ASSUMPTION:
3. CLOSED-WORLD EVIDENCE BOUNDARY:
   - Your universe of factual knowledge is STRICTLY LIMITED to the provided Context below.
   - You have zero outside knowledge, zero web knowledge, and zero model memory about Deepak's biography or personal details.
   - If a fact is not explicitly supported by the retrieved Context, you must NEVER state it as fact.
   - Never fill in missing biography, guess unmentioned details, or provide "common sense" corrections.

NEGATIVE CLAIM RULE (ABSENCE OF EVIDENCE IS NOT EVIDENCE OF ABSENCE):
4. ABSOLUTELY NO UNSUPPORTED NEGATIVE CLAIMS:
   - The Context establishes what Deepak DID do, study, or build. It does NOT establish everything he DID NOT do.
   - Absence from the knowledge base is NOT evidence of absence in reality.
   - NEVER generate negative assertions (containing "did not", "never", "no", "not", "doesn't", "wasn't", "hasn't", "without", "never worked", "never studied", "never built", "never owned") UNLESS the retrieved Context explicitly contains that exact negative fact.
   - When asked whether Deepak attended, worked at, or did something not mentioned in the Context (e.g., "Did Deepak study at [Institution]?", "Did Deepak work at [Company]?"):
     * DO NOT say: "No, he didn't attend..." or "No, he never worked at...".
     * INSTEAD state what IS verified in the portfolio, and state that you do not have verified portfolio information about the requested item.
       Example: "The verified portfolio information I have lists a Bachelor of Engineering from Visvesvaraya Technological University (VTU), completed in 2018. I don't have verified portfolio information about [requested institution]."
       Example: "I don't have verified information about that in the portfolio material."
   - When asked a neutral or open question (e.g., "Where did he study?", "What was his role at X?"):
     * State ONLY what is verified: e.g. "Deepak completed a Bachelor of Engineering from Visvesvaraya Technological University (VTU) in 2018."
     * Do NOT volunteer unprompted negative claims (e.g., do NOT add "He did not attend [unmentioned institution]" or "He did not study [unmentioned field]").

HANDLING MISSING & UNKNOWN INFORMATION:
5. HONEST ABSTENTION ON ABSENT TOPICS:
   - If the user asks about something not present in the Context (such as salary, high school, personal details, or unlisted companies):
     Respond with: "I don't have verified [topic] information in the portfolio material." (e.g. "I don't have verified salary information in the portfolio material.")
   - Never invent or assume facts from outside the context.

FACT VS INFERENCE VS UNKNOWN:
6. EPISTEMIC PRECISION:
   - "First job" vs "Earliest listed role": If asked for his first job, state that his earliest listed professional role in his verified resume is Associate Product Manager at LionCircuits (July 2018 – May 2020). Do not assert it was definitely his first-ever employment if the source does not state that.
   - Career gaps: If asked about unlisted periods (e.g., May 2020 – June 2021), state that the verified resume lists no roles or activities for that period; do not infer or invent any activities.

METRICS & SPECIFICS:
7. GROUNDED METRICS & TONE:
   - Always refer to him as "Deepak Prasad" (never "Deepak P").
   - Experience: 7+ years across subscriptions, B2B marketplaces, and applied AI.
   - AI Coach vs Platform Telemetry: The AI Coach scaled from ~300 to a peak of ~4,500 DAU after its November 2025 launch. Platform-wide app usage was 3,033 DAU and 27,001 MAU as of May 2026. Always state these timeframes when citing either number and never present one as a subset of the other. AI Coach DAU was measured from backend event logs (unique users with at least one coach interaction per day), whereas app-level DAU/MAU was measured in Firebase.
   - Subscriptions: 174,180 freemium users; 12,401 paying subscribers; €659K FY2025 revenue; 81.9% YoY subscriber growth; 96.8% annual plan retention; 39.4% trial-to-paid in a mature trial cohort (172 of 437 users).
   - Copilot Evaluation: 95% (19 of 20) on a golden evaluation set.
   - ReshaMandi Payouts & Marketplace: disbursements grew from ~₹10–15 Cr to ₹20–25 Cr per month; 80,000+ farmers; ₹2,000 Cr platform; >90% ML pricing model accuracy; 35%+ lift in transaction value.
   - Marketplace & Payments Wording: Deepak "led" (never "architected") marketplace and payment systems.
   - Athletic Performance Score: "One Body. One Score. One Ecosystem." is strictly Product Strategy & PRD work (development-ready PRD); it was not launched to production and did not ship.
   - Content Localisation: 200+ videos in ~3 weeks, ~10× faster, Italian, French, and Spanish.
   - LionCircuits: 40% increase in monthly orders.
   - Deliver crisp, natural, professional answers (1–3 brief paragraphs or focused bullet points) without robotic phrases like "According to chunk...".`;

          const prompt = `Context:\n${contextBlocks}\n\nUser Question:\n${cleanQuestion}\n\nPlease provide a direct answer without any greeting, "Hello", or self-introduction:`;

          const candidateModels = ["gemini-3.1-flash-lite", "gemini-flash-latest", "gemini-3.8-flash"];
          let rawText = "";

          for (const model of candidateModels) {
            let genTimer: NodeJS.Timeout | undefined;
            try {
              const genPromise = ai.models.generateContent({
                model,
                contents: prompt,
                config: {
                  systemInstruction,
                  temperature: 0.2,
                },
              });

              const timeoutPromise = new Promise<never>((_, reject) => {
                genTimer = setTimeout(() => reject(new Error(`${model} request duration exceeded`)), 12000);
              });

              const genRes = await Promise.race([genPromise, timeoutPromise]);
              if (genRes.text) {
                rawText = genRes.text;
                break; // Succeeded!
              }
            } catch (modelErr: any) {
              console.log(`[RAG] Candidate ${model} response unavailable (${modelErr.message}), trying next model...`);
            } finally {
              if (genTimer) clearTimeout(genTimer);
            }
          }

          if (rawText) {
            answer = rawText
              .replace(
                /^(?:hello!?|hi!?|greetings!?|hey!?)\s*(?:i am|i'm|this is)?\s*(?:dīpa|dipa)?(?:,?\s*deepak(?:'s)?\s*ai\s*assistant)?[.!,:]*\s*/i,
                ""
              )
              .trim();
          } else {
            console.log("[RAG] Serving grounded portfolio evidence directly from primary verified chunk.");
            answer = `${retrieved[0].chunk}`;
          }
        } catch (outerErr: any) {
          console.log("[RAG] Serving grounded portfolio evidence directly:", outerErr.message);
          answer = `${retrieved[0].chunk}`;
        }
      }

      const totalTimeMs = Date.now() - startTime;

      res.json({
        question: cleanQuestion,
        answer,
        fallback: false,
        topSimilarity: Number(topScore.toFixed(4)),
        confidenceThreshold: CONFIDENCE_THRESHOLD,
        retrievalTimeMs,
        totalTimeMs,
        retrievedChunks: retrieved.map((c) => ({
          id: c.id,
          source: c.source,
          title: c.title,
          category: c.category,
          chunk: c.chunk,
          similarity: Number(c.similarity.toFixed(4)),
        })),
      });
    } catch (err: any) {
      console.error("[RAG] Query error:", err);
      res.status(500).json({
        error: "Something went wrong processing your question. Please try again.",
      });
    }
  });

  // Serve static assets from public folder
  app.use(express.static(path.resolve("public")));

  // -------------------------------------------------------------
  // Vite Integration (Dev vs Prod)
  // -------------------------------------------------------------
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);

    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      if (url.startsWith("/api") || path.extname(url)) {
        return next();
      }
      try {
        const templatePath = path.resolve("index.html");
        let template = fs.readFileSync(templatePath, "utf-8");
        template = await vite.transformIndexHtml(url, template);
        const meta = getRouteMetadata(req.path);
        const html = injectMetadataIntoHtml(template, meta);
        res
          .status(meta.is404 ? 404 : 200)
          .set({
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-cache",
          })
          .send(html);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");

    // Vite emits content-hashed filenames into /assets, so those are safe to
    // cache forever. A new build produces a new filename.
    app.use(
      "/assets",
      express.static(path.join(distPath, "assets"), {
        immutable: true,
        maxAge: "1y",
      })
    );

    // Everything else in dist: revalidate, but do not automatically serve index.html
    // so our route metadata injector handles all direct HTML requests.
    app.use(express.static(distPath, { maxAge: "1h", index: false }));

    app.get("*", (req, res, next) => {
      const url = req.originalUrl;
      if (url.startsWith("/api") || path.extname(url)) {
        return next();
      }
      try {
        const templatePath = path.join(distPath, "index.html");
        const template = fs.readFileSync(templatePath, "utf-8");
        const meta = getRouteMetadata(req.path);
        const html = injectMetadataIntoHtml(template, meta);
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.status(meta.is404 ? 404 : 200).send(html);
      } catch (err: any) {
        next(err);
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Deepak Prasad Portfolio with RAG Copilot running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
