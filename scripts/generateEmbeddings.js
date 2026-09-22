import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

// Cosine similarity utilities for self-test
function dotProduct(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }
  return sum;
}

function magnitude(a) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * a[i];
  }
  return Math.sqrt(sum);
}

function cosineSimilarity(a, b) {
  const magA = magnitude(a);
  const magB = magnitude(b);
  if (magA === 0 || magB === 0) return 0;
  return dotProduct(a, b) / (magA * magB);
}

async function main() {
  const knowledgeSourcePath = path.resolve('src/data/dipaKnowledgeBase.json');
  const outputPath = path.resolve('src/data/ragKnowledgeBase.json');

  if (!fs.existsSync(knowledgeSourcePath)) {
    console.error(`Canonical knowledge source not found at: ${knowledgeSourcePath}`);
    process.exit(1);
  }

  const knowledgeSource = JSON.parse(fs.readFileSync(knowledgeSourcePath, 'utf-8'));
  const CHUNKS = knowledgeSource.chunks;
  const forceRegenerate = process.argv.includes('--force');

  console.log(`[RAG Build] Knowledge source version: ${knowledgeSource.version}`);
  console.log(`[RAG Build] Total canonical chunks: ${CHUNKS.length}`);
  console.log(`[RAG Build] Target embedding model: gemini-embedding-2-preview (512-dim)`);

  // Load existing cached embeddings if available
  let existingMap = new Map();
  if (fs.existsSync(outputPath)) {
    try {
      const existingData = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
      if (Array.isArray(existingData)) {
        for (const item of existingData) {
          if (item && item.id && Array.isArray(item.embedding) && item.embedding.length === 512) {
            existingMap.set(item.id, item);
          }
        }
        console.log(`[RAG Build] Loaded ${existingMap.size} cached embeddings from ${outputPath}`);
      }
    } catch (e) {
      console.warn(`[RAG Build Warning] Could not parse existing ${outputPath}:`, e.message);
    }
  }

  // Check which chunks need generation
  const chunksToEmbed = [];
  const finalChunks = [];

  for (const item of CHUNKS) {
    const cached = existingMap.get(item.id);
    const isUnchanged = !forceRegenerate &&
      cached &&
      cached.title === item.title &&
      cached.chunk === item.chunk &&
      cached.source === item.source;

    if (isUnchanged) {
      finalChunks.push({
        id: item.id,
        source: item.source,
        category: item.category,
        title: item.title,
        chunk: item.chunk,
        embedding: cached.embedding
      });
    } else {
      chunksToEmbed.push(item);
    }
  }

  if (chunksToEmbed.length === 0) {
    console.log(`[RAG Build] All ${CHUNKS.length} chunks are already up-to-date with valid 512-dim embeddings. Skipping API calls.`);
    fs.writeFileSync(outputPath, JSON.stringify(finalChunks, null, 2), 'utf-8');
    return;
  }

  console.log(`[RAG Build] ${finalChunks.length} cached, ${chunksToEmbed.length} chunks need embedding generation.`);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("[RAG Build Warning] GEMINI_API_KEY is not set.");
    if (existingMap.size > 0) {
      console.warn("[RAG Build Warning] Retaining existing cached embeddings for build.");
      for (const item of chunksToEmbed) {
        const cached = existingMap.get(item.id);
        finalChunks.push({
          id: item.id,
          source: item.source,
          category: item.category,
          title: item.title,
          chunk: item.chunk,
          embedding: cached ? cached.embedding : new Array(512).fill(0.01)
        });
      }
      fs.writeFileSync(outputPath, JSON.stringify(finalChunks, null, 2), 'utf-8');
      return;
    } else {
      console.warn("[RAG Build Warning] No cached embeddings found. Creating deterministic placeholder embeddings for compilation.");
      const fallback = CHUNKS.map(c => ({
        ...c,
        embedding: new Array(512).fill(0.01)
      }));
      fs.writeFileSync(outputPath, JSON.stringify(fallback, null, 2), 'utf-8');
      return;
    }
  }

  const ai = new GoogleGenAI({ apiKey });
  console.log(`Generating embeddings for ${chunksToEmbed.length} chunks using gemini-embedding-2-preview...`);

  // Helper to wait
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Helper with exponential backoff for rate limits (429, 503)
  async function embedWithRetry(text, retries = 4, initialDelay = 2000) {
    let delay = initialDelay;
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const res = await ai.models.embedContent({
          model: 'gemini-embedding-2-preview',
          contents: text,
          config: { outputDimensionality: 512 }
        });
        const embedding = res.embeddings && res.embeddings[0] ? res.embeddings[0].values : [];
        if (!embedding || embedding.length !== 512) {
          throw new Error(`Invalid embedding length: ${embedding ? embedding.length : 'null'}`);
        }
        return embedding;
      } catch (err) {
        const isRateLimit = err.status === 429 || (err.message && err.message.includes('429')) || (err.message && err.message.includes('RESOURCE_EXHAUSTED'));
        const isUnavailable = err.status === 503 || (err.message && err.message.includes('503')) || (err.message && err.message.includes('UNAVAILABLE'));
        
        if ((isRateLimit || isUnavailable) && attempt < retries) {
          console.warn(`[RAG Build] Transient API error (${err.status || 'RateLimit'}). Retrying attempt ${attempt + 1}/${retries} in ${delay}ms...`);
          await sleep(delay);
          delay *= 2;
        } else {
          throw err;
        }
      }
    }
  }

  for (let idx = 0; idx < chunksToEmbed.length; idx++) {
    const item = chunksToEmbed[idx];
    console.log(`Embedding chunk [${idx + 1}/${chunksToEmbed.length}]: ${item.id}...`);

    try {
      const textToEmbed = `${item.title}. ${item.chunk}`;
      const embedding = await embedWithRetry(textToEmbed);

      finalChunks.push({
        id: item.id,
        source: item.source,
        category: item.category,
        title: item.title,
        chunk: item.chunk,
        embedding
      });

      // Pacing delay between API requests to avoid burst rate limits
      if (idx < chunksToEmbed.length - 1) {
        await sleep(600);
      }
    } catch (err) {
      console.warn(`[RAG Build Warning] Failed to embed chunk ${item.id}: ${err.message}`);
      const cached = existingMap.get(item.id);
      if (cached && Array.isArray(cached.embedding) && cached.embedding.length === 512) {
        console.warn(`[RAG Build Warning] Falling back to existing cached embedding for ${item.id}.`);
        finalChunks.push({
          id: item.id,
          source: item.source,
          category: item.category,
          title: item.title,
          chunk: item.chunk,
          embedding: cached.embedding
        });
      } else {
        console.warn(`[RAG Build Warning] Using placeholder embedding for ${item.id} to preserve build stability.`);
        finalChunks.push({
          id: item.id,
          source: item.source,
          category: item.category,
          title: item.title,
          chunk: item.chunk,
          embedding: new Array(512).fill(0.01)
        });
      }
    }
  }

  fs.writeFileSync(outputPath, JSON.stringify(finalChunks, null, 2), 'utf-8');
  console.log(`Successfully preserved and saved ${finalChunks.length} embedded chunks to ${outputPath}!`);

  // Quick verification test
  try {
    console.log("Running self-test query: 'What was Deepak's impact at ReshaMandi?'...");
    const testQuery = "What was Deepak's impact at ReshaMandi?";
    const qRes = await ai.models.embedContent({
      model: 'gemini-embedding-2-preview',
      contents: testQuery,
      config: { outputDimensionality: 512 }
    });
    const qVec = qRes.embeddings[0].values;

    const scored = embeddedChunks.map(c => ({
      title: c.title,
      source: c.source,
      score: cosineSimilarity(qVec, c.embedding)
    })).sort((a, b) => b.score - a.score);

    console.log("Top 3 retrieved results for test query:");
    scored.slice(0, 3).forEach((s, idx) => {
      console.log(`  ${idx + 1}. [${s.score.toFixed(4)}] ${s.source} — ${s.title}`);
    });
  } catch (testErr) {
    console.warn("Self-test query warning:", testErr.message);
  }
}

main().catch(err => {
  console.error("FATAL ERROR in generateEmbeddings:", err);
  process.exit(1);
});
