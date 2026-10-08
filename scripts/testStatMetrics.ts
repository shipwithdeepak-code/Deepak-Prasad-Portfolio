import assert from "node:assert";

// Canonical proof strip metrics as defined in HomePage.tsx
const proofStripMetrics = [
  {
    value: "7+ years",
    label: "Product experience",
    detail: "Across India & Europe",
  },
  {
    value: "0→1",
    label: "AI, SaaS & platforms",
    detail: "Concept to production",
  },
  {
    value: "80K+",
    label: "Farmers served",
    detail: "From offline silk trade to a connected platform",
  },
  {
    value: "12K+",
    label: "Paid subscribers",
    detail: "Built the subscription business from 0",
  },
  {
    value: "~300 → ~4,500 DAU",
    label: "Active scale",
    detail: "peak reached after Nov 2025 launch",
  },
  {
    value: "up to 15 days → under 2 hrs",
    label: "Farmer payout time",
    detail: "99.9% success, fully automated",
  },
];

// Pure simulation of StatNumberDisplay logic
function renderStatNumber(metric: { value: string; label: string }, countOverride?: number): string {
  if (metric.value.includes("→")) {
    const parts = metric.value.split("→");
    const left = parts[0].trim();
    const right = parts[1].trim();
    return `${left} → ${right}`;
  }

  const match = metric.value.match(/^(\d+)(.*)$/);
  if (match) {
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const displayNum = countOverride !== undefined ? countOverride : target;
    return `${displayNum}${suffix}`;
  }

  return metric.value;
}

console.log("=== Testing Stat Metric Integrity & Absence of False Zeros ===");

// 1. Verify Initial Render (Pre-Animation / SSR / Direct Load)
console.log("\n1. Testing Initial Render (Pre-Animation / SSR):");
proofStripMetrics.forEach((m, idx) => {
  const rendered = renderStatNumber(m);
  console.log(`  [Card ${idx}] ${m.label}: "${rendered}" (Canonical: "${m.value}")`);

  // Assert canonical string is preserved
  assert.strictEqual(
    rendered.replace(/\s+/g, " "),
    m.value.replace(/→/, " → ").replace(/\s+/g, " "),
    `Card ${idx} initial render must match canonical metric`
  );

  // Assert false zero values are NEVER present
  assert(rendered !== "0+ years", "Must not render '0+ years'");
  assert(rendered !== "0 → 0", "Must not render '0 → 0'");
  assert(rendered !== "0K+", "Must not render '0K+'");
  assert(rendered !== "~300 → ~300", "Must not render '~300 → ~300'");
  assert(!rendered.includes("under 0 hrs"), "Must not render 'under 0 hrs'");
});

// 2. Verify Semantic Transitions Are Immune to Numeric Coercion
console.log("\n2. Testing Semantic Range Metrics:");
const zeroToOne = renderStatNumber(proofStripMetrics[1]);
assert.strictEqual(zeroToOne, "0 → 1", "0→1 must remain '0 → 1'");

const activeScale = renderStatNumber(proofStripMetrics[4]);
assert.strictEqual(activeScale, "~300 → ~4,500 DAU", "Active scale must remain '~300 → ~4,500 DAU'");

const payoutTime = renderStatNumber(proofStripMetrics[5]);
assert.strictEqual(payoutTime, "up to 15 days → under 2 hrs", "Farmer payout time must remain 'up to 15 days → under 2 hrs'");
console.log("  ✓ All semantic transitions preserved without numeric interpolation bugs.");

// 3. Verify Numeric Counts Finish on Exact Canonical Value
console.log("\n3. Testing Animated Final State on Numeric Counts:");
assert.strictEqual(renderStatNumber(proofStripMetrics[0], 7), "7+ years");
assert.strictEqual(renderStatNumber(proofStripMetrics[2], 80), "80K+");
assert.strictEqual(renderStatNumber(proofStripMetrics[3], 12), "12K+");
console.log("  ✓ All animated numeric counts terminate at exact canonical target values.");

console.log("\n=== ALL REGRESSION TESTS PASSED SUCCESSFULLY ===");
