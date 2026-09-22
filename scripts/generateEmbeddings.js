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

  console.log(`[RAG Build] Knowledge source version: ${knowledgeSource.version}`);
  console.log(`[RAG Build] Total canonical chunks: ${CHUNKS.length}`);
  console.log(`[RAG Build] Target embedding model: gemini-embedding-2-preview (512-dim)`);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("[RAG Build Warning] GEMINI_API_KEY is not set.");
    if (fs.existsSync(outputPath)) {
      console.warn("[RAG Build Warning] Retaining existing ragKnowledgeBase.json for local build.");
      return;
    } else {
      console.warn("[RAG Build Warning] No existing ragKnowledgeBase.json found. Creating placeholder embeddings for local compilation.");
      const fallback = CHUNKS.map(c => ({
        ...c,
        embedding: new Array(512).fill(0.01)
      }));
      fs.writeFileSync(outputPath, JSON.stringify(fallback, null, 2), 'utf-8');
      return;
    }
  }

  const ai = new GoogleGenAI({ apiKey });
  console.log(`Generating embeddings for ${CHUNKS.length} chunks using gemini-embedding-2-preview...`);

  const embeddedChunks = [];
  const batchSize = 5;

  for (let i = 0; i < CHUNKS.length; i += batchSize) {
    const batch = CHUNKS.slice(i, i + batchSize);
    console.log(`Processing batch ${i + 1} to ${Math.min(i + batchSize, CHUNKS.length)} of ${CHUNKS.length}...`);

    for (const item of batch) {
      try {
        const textToEmbed = `${item.title}. ${item.chunk}`;
        const res = await ai.models.embedContent({
          model: 'gemini-embedding-2-preview',
          contents: textToEmbed,
          config: { outputDimensionality: 512 }
        });

        const embedding = res.embeddings && res.embeddings[0] ? res.embeddings[0].values : [];
        if (!embedding || embedding.length !== 512) {
          throw new Error(`Invalid embedding length: ${embedding ? embedding.length : 'null'}`);
        }

        embeddedChunks.push({
          id: item.id,
          source: item.source,
          category: item.category,
          title: item.title,
          chunk: item.chunk,
          embedding
        });
      } catch (err) {
        console.error(`Failed to embed chunk ${item.id}:`, err.message);
        throw err;
      }
    }
  }

  fs.writeFileSync(outputPath, JSON.stringify(embeddedChunks, null, 2), 'utf-8');
  console.log(`Successfully generated and saved ${embeddedChunks.length} embedded chunks to ${outputPath}!`);

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
