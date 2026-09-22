import React from "react";
import { Eye, HelpCircle, ShieldAlert, Swords, RotateCcw, AlertTriangle } from "lucide-react";

export function MagicMoments() {
  const moments = [
    {
      num: "01",
      title: "Understand before asking",
      tagline: "Drop in a screen. The system separates truth from assumption.",
      body: "Seconds after uploading an artifact, statements appear categorized by their epistemic status: what is directly observable, what is being inferred with reasoning, and what is merely assumed. The PM can correct anything before any judgement is made.",
      badge: "CAP-01 & CAP-03",
      visual: (
        <div className="grid grid-cols-2 gap-2 mt-3 font-mono text-[10.5px]">
          <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#042718]/10">
            <span className="text-[#2F7A4F] font-bold block">OBSERVED</span>
            <span className="text-[#042718]/70 text-[10px]">3 capture buttons visible</span>
          </div>
          <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#042718]/10">
            <span className="text-[#042718] font-bold block">INFERRED</span>
            <span className="text-[#042718]/70 text-[10px]">Step 2 of 3 (progress bar)</span>
          </div>
          <div className="p-2 rounded-lg bg-[#FFFBEB] border border-[#A8711A]/20">
            <span className="text-[#A8711A] font-bold block">ASSUMED</span>
            <span className="text-[#042718]/70 text-[10px]">Users know their category</span>
          </div>
          <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#042718]/10">
            <span className="text-[#042718]/60 font-bold block">UNKNOWN</span>
            <span className="text-[#042718]/70 text-[10px]">Downstream requirement</span>
          </div>
        </div>
      ),
    },
    {
      num: "02",
      title: "Ask only what matters",
      tagline: "Dynamic unknowns that would actually flip the decision.",
      body: "Instead of asking generic questions or guessing missing business context, the system derives only the top 2–4 unknowns that could genuinely move the verdict. Each question explains exactly why it matters to the decision, and can be skipped without breaking the flow.",
      badge: "CAP-02",
      visual: (
        <div className="mt-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#042718]/10 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase font-bold text-[#A8711A]">Derived Unknown #1</span>
            <span className="font-mono text-[9px] text-[#042718]/50">Skippable</span>
          </div>
          <div className="font-onest text-xs font-bold text-[#042718]">
            &ldquo;Is the category field required by downstream reporting, or only this form?&rdquo;
          </div>
          <p className="font-inter text-[11px] text-[#042718]/70 italic">
            <strong>Why I need this:</strong> If optional downstream, removing it is the cheapest way to eliminate friction.
          </p>
        </div>
      ),
    },
    {
      num: "03",
      title: "Refuse when evidence isn't enough",
      tagline: "Refusal is an intentional feature, never an error.",
      body: "When input evidence cannot carry a defensible call, Product Jury returns INSUFFICIENT in under 15 seconds—naming at least two specific missing data points and the cheapest way to get them. A technical failure (FAILED) and an epistemic refusal (INSUFFICIENT) are strictly separated.",
      badge: "CAP-07 & CAP-18",
      visual: (
        <div className="mt-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#A8711A]/25">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded bg-[#A8711A] text-white font-mono text-[10px] font-bold">
              INSUFFICIENT
            </span>
            <span className="font-mono text-[10px] text-[#042718]/60">Refusal arrived in 6.2s</span>
          </div>
          <p className="font-inter text-[11.5px] text-[#042718]/80 leading-snug">
            Evidence cannot support a call on this question. Missing: baseline abandonment rate and qualitative quotes. Supply either to continue.
          </p>
        </div>
      ),
    },
    {
      num: "04",
      title: "Challenge the load-bearing claim",
      tagline: "A competent adversary attacking specific weak joints.",
      body: "The Red Team does not generate generic SaaS contrarianism. It executes four strict moves (Counter-Hypothesis, Claim Attack, Reinterpretation, Falsification Test) targeting the exact claims the verdict rests upon. The PM then decides: Defend, Revise (recomputing confidence), or Collect.",
      badge: "CAP-10 & CAP-11",
      visual: (
        <div className="mt-3 p-3 rounded-xl bg-[#042718] text-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase font-bold text-[#D9A94C]">Red Team · Claim Attack</span>
            <span className="font-mono text-[9px] text-white/50">Target: Statement #3</span>
          </div>
          <p className="font-inter text-[11px] text-white/80 leading-tight">
            &ldquo;You treated the required field as the friction. The quotes say users hesitated over the taxonomy, not the field&apos;s presence.&rdquo;
          </p>
          <div className="flex items-center gap-1.5 pt-1 font-mono text-[9.5px]">
            <span className="px-2 py-0.5 rounded bg-white/10 text-white">DEFEND</span>
            <span className="px-2 py-0.5 rounded bg-[#D9A94C] text-[#042718] font-bold">REVISE</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-white">COLLECT</span>
          </div>
        </div>
      ),
    },
    {
      num: "05",
      title: "Revisit the same decision",
      tagline: "New telemetry arrives weeks later. The decision re-judges.",
      body: "When test results arrive, the PM doesn't prompt an AI from scratch. They return to the existing decision. The system re-evaluates the same question against the falsification condition, records a new version, and shows what changed, why it changed, and what remains unknown.",
      badge: "CAP-15 & CAP-16",
      visual: (
        <div className="mt-3 p-3 rounded-xl bg-[#ECFDF5] border border-[#2F7A4F]/25 text-[#042718]">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[10px] uppercase font-bold text-[#2F7A4F]">9 Days Later · Re-Judge</span>
            <span className="font-mono text-[9px] text-[#2F7A4F]">Version 1 → Version 2</span>
          </div>
          <div className="font-mono text-xs font-bold text-[#042718]">
            TEST at 52% → SHIP at 79%
          </div>
          <p className="font-inter text-[10.5px] text-[#042718]/75 mt-1 leading-snug">
            Falsification condition satisfied (83% completion vs 80% threshold). Two assumptions converted to facts. Taxonomy concern remains flagged open.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section id="magic-moments" className="scroll-mt-24 pt-10 pb-14 border-b border-[#042718]/10">
      {/* Header */}
      <div className="mb-8">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
          Signature Experiences
        </span>
        <h2 className="font-onest text-2xl sm:text-3xl lg:text-4xl font-bold text-[#042718] tracking-tight">
          Five moments that define the product
        </h2>
        <p className="font-inter text-sm sm:text-base text-[#042718]/75 mt-2 max-w-3xl leading-relaxed">
          Instead of listing nineteen abstract capability requirements, these five interactions represent how the decision system behaves differently from any assistant.
        </p>
      </div>

      {/* Grid of 5 moments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {moments.map((m, idx) => (
          <div
            key={m.num}
            className={`p-6 rounded-[22px] bg-white border border-[#042718]/10 shadow-xs flex flex-col justify-between ${
              idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs font-bold text-[#A8711A]">
                  Moment {m.num}
                </span>
                <span className="font-mono text-[9.5px] px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#042718]/8 text-[#042718]/60 font-semibold">
                  {m.badge}
                </span>
              </div>
              <h3 className="font-onest text-lg font-bold text-[#042718] leading-snug">
                {m.title}
              </h3>
              <p className="font-inter text-xs font-semibold text-[#A8711A] mt-1 mb-2">
                {m.tagline}
              </p>
              <p className="font-inter text-xs sm:text-[13px] text-[#042718]/75 leading-relaxed">
                {m.body}
              </p>
            </div>
            {m.visual}
          </div>
        ))}
      </div>
    </section>
  );
}
