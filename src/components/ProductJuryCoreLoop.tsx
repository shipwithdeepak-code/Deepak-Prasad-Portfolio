import React from "react";
import { ArrowDown, ArrowRight, UserCheck } from "lucide-react";

/**
 * Visual representation of the Product Jury 2.0 Core Loop:
 *
 * ARTIFACT
 *    ↓
 * UNDERSTANDING
 *    ↓
 * DECISION QUESTION
 *    ↓
 * UNKNOWNS → ASKED
 *    ↓
 * JURY
 *    ↓
 * PROVISIONAL VERDICT
 *    ↓
 * RED TEAM
 *    ↓
 * PM RESPONSE (defend / revise / collect)  <-- PM sits at the decision point!
 *    ↓
 * DECISION RECORDED
 *    ↓
 * NEW EVIDENCE ARRIVES
 *    ↓
 * RE-JUDGE
 *    ↓
 * WHAT CHANGED AND WHY
 *    ↓
 * back into the decision
 */

export function ProductJuryCoreLoop() {
  return (
    <div className="w-full my-8 p-6 sm:p-8 rounded-[24px] bg-[#FAF8F5] border border-[#042718]/10 text-[#042718]">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Step 1: Input */}
        <div className="w-full sm:w-84 text-center p-3.5 rounded-xl bg-white border border-[#042718]/10 shadow-xs">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#A8711A] block">
            Step 01 · Input
          </span>
          <div className="font-onest text-sm font-bold text-[#042718] mt-0.5">Artifact Ingestion</div>
          <div className="font-inter text-xs text-[#042718]/65 mt-0.5">Screen, doc, PRD, or prototype context</div>
        </div>

        <ArrowDown size={16} className="my-1.5 text-[#042718]/35" />

        {/* Step 2: Understanding */}
        <div className="w-full sm:w-84 text-center p-3.5 rounded-xl bg-white border border-[#042718]/10 shadow-xs">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#A8711A] block">
            Step 02 · Grounding
          </span>
          <div className="font-onest text-sm font-bold text-[#042718] mt-0.5">Understanding &amp; Evidence Model</div>
          <div className="font-inter text-xs text-[#042718]/65 mt-0.5">Separates observed facts from inferences</div>
        </div>

        <ArrowDown size={16} className="my-1.5 text-[#042718]/35" />

        {/* Step 3: Decision Question & Success Condition */}
        <div className="w-full sm:w-84 text-center p-3.5 rounded-xl bg-white border border-[#042718]/10 shadow-xs">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#A8711A] block">
            Step 03 · Framing
          </span>
          <div className="font-onest text-sm font-bold text-[#042718] mt-0.5">The Decision Question</div>
          <div className="font-inter text-xs text-[#042718]/65 mt-0.5">Bounded decision success condition</div>
        </div>

        <ArrowDown size={16} className="my-1.5 text-[#042718]/35" />

        {/* Step 4: Unknowns & Missing Evidence */}
        <div className="w-full sm:w-84 text-center p-3.5 rounded-xl bg-white border border-[#042718]/10 shadow-xs">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#A8711A] block">
            Step 04 · Targeted Query
          </span>
          <div className="font-onest text-sm font-bold text-[#042718] mt-0.5">Unknowns Identified &amp; Asked</div>
          <div className="font-inter text-xs text-[#042718]/65 mt-0.5">Asks PM only for decision-critical missing data</div>
        </div>

        <ArrowDown size={16} className="my-1.5 text-[#042718]/35" />

        {/* Step 5: Jury Deliberation & Sufficiency Gate */}
        <div className="w-full sm:w-84 text-center p-3.5 rounded-xl bg-white border border-[#042718]/10 shadow-xs">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#A8711A] block">
            Step 05 · Deliberation
          </span>
          <div className="font-onest text-sm font-bold text-[#042718] mt-0.5">Evidence-Aware Jury Panel</div>
          <div className="font-inter text-xs text-[#042718]/65 mt-0.5">Auditor authority sets binding epistemic ceiling</div>
        </div>

        <ArrowDown size={16} className="my-1.5 text-[#042718]/35" />

        {/* Step 6: Provisional Verdict & Falsification */}
        <div className="w-full sm:w-84 text-center p-3.5 rounded-xl bg-white border border-[#042718]/10 shadow-xs">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#A8711A] block">
            Step 06 · Finding
          </span>
          <div className="font-onest text-sm font-bold text-[#042718] mt-0.5">Provisional Verdict</div>
          <div className="font-inter text-xs text-[#042718]/65 mt-0.5">States explicitly what evidence would overturn it</div>
        </div>

        <ArrowDown size={16} className="my-1.5 text-[#042718]/35" />

        {/* Step 7: Red Team Round */}
        <div className="w-full sm:w-84 text-center p-3.5 rounded-xl bg-[#FFFBEB] border border-[#A8711A]/25 shadow-xs">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#A8711A] block">
            Step 07 · Challenge
          </span>
          <div className="font-onest text-sm font-bold text-[#042718] mt-0.5">Adversarial Red Team</div>
          <div className="font-inter text-xs text-[#042718]/70 mt-0.5">Attacks assumptions, edge cases, and failure modes</div>
        </div>

        <ArrowDown size={16} className="my-2 text-[#042718]/35" />

        {/* ==============================================================
            THE DECISION POINT: THE PM DECIDES (High visual emphasis)
            ============================================================== */}
        <div className="w-full sm:w-96 text-center p-5 rounded-2xl bg-[#042718] text-white shadow-md border border-[#042718]">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <UserCheck size={18} className="text-[#C8F07A]" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#C8F07A] font-bold">
              The Decision Point · The PM Decides
            </span>
          </div>
          <div className="font-onest text-lg font-bold text-white">
            PM Response: Defend, Revise, or Collect
          </div>
          <p className="font-inter text-xs text-white/80 mt-2 leading-relaxed">
            The system never issues instructions. The human PM evaluates arguments, records counter-evidence, or schedules research.
          </p>
        </div>

        <ArrowDown size={16} className="my-2 text-[#042718]/35" />

        {/* Step 9: Decision Persisted */}
        <div className="w-full sm:w-84 text-center p-3.5 rounded-xl bg-white border border-[#042718]/10 shadow-xs">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#2F7A4F] block">
            Step 08 · Record
          </span>
          <div className="font-onest text-sm font-bold text-[#042718] mt-0.5">Decision Object Persists</div>
          <div className="font-inter text-xs text-[#042718]/65 mt-0.5">Durable decision log with versioned rationale</div>
        </div>

        {/* The Revisit Loop (Wedge) */}
        <div className="w-full mt-6 p-4 rounded-xl bg-[#ECFDF5] border border-[#2F7A4F]/25 flex flex-col items-center text-center">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#2F7A4F] mb-1">
            The Long-Term Wedge · The Revisit Loop
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 font-inter text-xs text-[#042718]/85 font-medium mt-1">
            <span>New Evidence Arrives</span>
            <ArrowRight size={13} className="text-[#2F7A4F]" />
            <span>Re-evaluate Decision</span>
            <ArrowRight size={13} className="text-[#2F7A4F]" />
            <span>Show What Changed &amp; Why</span>
          </div>
          <div className="font-mono text-[10.5px] text-[#2F7A4F] mt-2">
            Returns back into the durable Decision object (Decision ≠ Verdict)
          </div>
        </div>
      </div>
    </div>
  );
}
