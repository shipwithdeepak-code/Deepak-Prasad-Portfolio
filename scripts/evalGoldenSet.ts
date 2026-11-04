import { COPILOT_GOLDEN_EVALUATION_SET } from '../src/data/caseStudies';

async function runEval() {
  console.log("=== Evaluating Dīpa Golden Set (20 Queries) ===");
  let passed = 0;
  let total = COPILOT_GOLDEN_EVALUATION_SET.length;

  for (const item of COPILOT_GOLDEN_EVALUATION_SET) {
    try {
      const res = await fetch("http://localhost:3000/api/copilot/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: item.query }),
      });

      if (!res.ok) {
        console.error(`[FAIL] Query ${item.id}: "${item.query}" HTTP ${res.status}`);
        continue;
      }

      const data = await res.json();
      const isFallbackExpected = item.groundTruthSource.includes("Out of Scope");
      let itemPass = false;

      if (isFallbackExpected) {
        // Fallback queries (18, 19) should either be flagged as fallback or have low topSimilarity (<0.68)
        itemPass = data.fallback === true || (data.topSimilarity !== undefined && data.topSimilarity < 0.68);
      } else {
        // Grounded queries should have high confidence and non-empty answers
        itemPass = !data.fallback && data.topSimilarity >= 0.68 && !!data.answer && data.answer.length > 20;
      }

      if (itemPass) {
        passed++;
        console.log(`[PASS] Q${item.id} (${item.category}): "${item.query}" -> similarity: ${data.topSimilarity?.toFixed(3) || 'N/A'}, fallback: ${data.fallback}`);
      } else {
        console.log(`[CHECK] Q${item.id} (${item.category}): "${item.query}" -> similarity: ${data.topSimilarity?.toFixed(3) || 'N/A'}, fallback: ${data.fallback}, notes: ${item.notes}`);
      }
    } catch (err: any) {
      console.error(`[ERROR] Query ${item.id}:`, err.message);
    }
  }

  console.log(`\n========================================`);
  console.log(`FINAL GOLDEN EVALUATION SCORE: ${passed} of ${total} (${((passed / total) * 100).toFixed(1)}%)`);
  console.log(`========================================`);
}

runEval().catch(console.error);
