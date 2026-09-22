import React from "react";
import { Layers, ArrowDown, Shield, FileText, CheckCircle } from "lucide-react";

export function DecisionHierarchyVisual() {
  return (
    <section id="how-it-works" className="scroll-mt-24 pt-10 pb-14 border-b border-[#042718]/10">
      {/* Header */}
      <div className="mb-8">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
          Core Product Concept
        </span>
        <h2 className="font-onest text-2xl sm:text-3xl lg:text-4xl font-bold text-[#042718] tracking-tight">
          A Decision is not a Verdict
        </h2>
        <p className="font-inter text-sm sm:text-base text-[#042718]/75 mt-2 max-w-3xl leading-relaxed">
          This distinction is central to the product and must be immediately clear. A verdict is an ephemeral assessment from a panel; a decision is the entire living record.
        </p>
      </div>

      {/* 3-Level Visual Hierarchy (Decision -> Version -> Verdict) */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {/* Tier 1: DECISION */}
        <div className="p-6 sm:p-7 rounded-[22px] bg-white border-2 border-[#042718] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[#042718]/10">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-md bg-[#042718] text-white font-mono text-xs font-bold uppercase tracking-wider">
                Level 1 · The Container
              </span>
              <h3 className="font-onest text-xl font-bold text-[#042718]">
                DECISION
              </h3>
            </div>
            <span className="font-mono text-xs text-[#A8711A] font-semibold">
              The Durable Object
            </span>
          </div>

          <p className="font-inter text-sm text-[#042718]/80 leading-relaxed">
            Exists for as long as the question is active. Named and listed by the <strong>decision question</strong>, never by a screenshot filename or verdict badge.
          </p>

          <div className="mt-4 pt-3 border-t border-[#042718]/8 flex flex-wrap gap-2">
            {[
              "The Decision Question",
              "Success Condition",
              "Versions (in order)",
              "Active Open Loops",
              "Immutable Audit Log",
            ].map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#042718]/10 font-mono text-[11px] text-[#042718]/80"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex justify-center mt-4 text-[#042718]/40">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#042718]/50 flex items-center gap-1.5">
              <ArrowDown size={14} /> Contains sequence of
            </span>
          </div>
        </div>

        {/* Tier 2: VERSION */}
        <div className="p-6 sm:p-7 rounded-[22px] bg-[#FAF8F5] border border-[#A8711A]/30 shadow-xs ml-0 sm:ml-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[#042718]/8">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-md bg-[#A8711A] text-white font-mono text-xs font-bold uppercase tracking-wider">
                Level 2 · State in Time
              </span>
              <h3 className="font-onest text-lg sm:text-xl font-bold text-[#042718]">
                VERSION
              </h3>
            </div>
            <span className="font-mono text-xs text-[#042718]/70 font-semibold">
              Decision + Sequence Number
            </span>
          </div>

          <p className="font-inter text-sm text-[#042718]/80 leading-relaxed">
            The state of the decision at one specific point in time. Re-judging with new telemetry or revising a claim creates a new version—it never silently overwrites the previous state.
          </p>

          <div className="mt-4 pt-3 border-t border-[#042718]/8 flex flex-wrap gap-2">
            {[
              "Claim Classifications",
              "Supplied Evidence",
              "Jury Positions",
              "Audit Ceiling & Reason",
              "Trigger Event",
            ].map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#042718]/10 font-mono text-[11px] text-[#042718]/80"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex justify-center mt-4 text-[#042718]/40">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#042718]/50 flex items-center gap-1.5">
              <ArrowDown size={14} /> Contains
            </span>
          </div>
        </div>

        {/* Tier 3: VERDICT */}
        <div className="p-6 sm:p-7 rounded-[22px] bg-white border border-[#2F7A4F]/30 shadow-xs ml-0 sm:ml-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[#042718]/8">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-md bg-[#2F7A4F] text-white font-mono text-xs font-bold uppercase tracking-wider">
                Level 3 · Ephemeral Position
              </span>
              <h3 className="font-onest text-lg sm:text-xl font-bold text-[#042718]">
                VERDICT
              </h3>
            </div>
            <span className="font-mono text-xs text-[#2F7A4F] font-semibold">
              Belongs to a Version
            </span>
          </div>

          <p className="font-inter text-sm text-[#042718]/80 leading-relaxed">
            One position at a given moment: <em>Ship, Hold, Test, or Kill</em> (or refusal to answer). Provisional until challenged by Red Team.
          </p>

          <div className="mt-4 pt-3 border-t border-[#042718]/8 flex flex-wrap gap-2">
            {[
              "Provisional Outcome",
              "Confidence % + Ceiling Reason",
              "Falsification Contract",
              "Ranked Opportunities",
            ].map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#042718]/10 font-mono text-[11px] text-[#042718]/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Narrative Synthesis */}
      <div className="mt-8 p-5 sm:p-6 rounded-[20px] bg-[#FAF8F5] border border-[#042718]/8 max-w-3xl mx-auto font-inter text-sm text-[#042718]/80 leading-relaxed">
        <strong className="font-semibold text-[#042718]">In the PM&apos;s words:</strong> A Decision is <em>&ldquo;the call I made about the export flow, and everything behind it.&rdquo;</em> A Verdict is simply <em>&ldquo;what the panel said on the 22nd.&rdquo;</em> Later verdicts can contradict earlier ones without breaking the decision—that is the entire point of learning from new evidence.
      </div>
    </section>
  );
}
