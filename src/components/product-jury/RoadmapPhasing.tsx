import React from "react";
import { ArrowRight, CheckCircle2, Clock, Globe } from "lucide-react";

export function RoadmapPhasing() {
  return (
    <section id="scope" className="scroll-mt-24 pt-10 pb-14 border-b border-[#042718]/10">
      {/* Header */}
      <div className="mb-8">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
          Staging &amp; Product Discipline
        </span>
        <h2 className="font-onest text-2xl sm:text-3xl lg:text-4xl font-bold text-[#042718] tracking-tight">
          What I&apos;m building first
        </h2>
        <p className="font-inter text-sm sm:text-base text-[#042718]/75 mt-2 max-w-3xl leading-relaxed">
          Product Jury is scoped strictly to prevent feature bloat. The sequence moves from establishing one honest, uncompromised decision to making it revisitable, and finally making it shareable.
        </p>
      </div>

      {/* Visual Progression Banner */}
      <div className="mb-8 p-4 sm:p-5 rounded-[20px] bg-[#FAF8F5] border border-[#042718]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs sm:text-sm font-inter">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#042718] text-white font-mono text-[10px] font-bold">MVP</span>
          <span className="font-semibold text-[#042718]">&ldquo;Make one decision honestly&rdquo;</span>
        </div>
        <ArrowRight size={14} className="hidden md:block text-[#042718]/30" />
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#A8711A] text-white font-mono text-[10px] font-bold">P1</span>
          <span className="font-semibold text-[#042718]">&ldquo;Make the decision revisitable&rdquo;</span>
        </div>
        <ArrowRight size={14} className="hidden md:block text-[#042718]/30" />
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#2F7A4F] text-white font-mono text-[10px] font-bold">P2</span>
          <span className="font-semibold text-[#042718]">&ldquo;Make the decision travel&rdquo;</span>
        </div>
      </div>

      {/* 3 Columns: MVP, P1, P2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Column 1: MVP */}
        <div className="p-6 rounded-[22px] bg-white border-2 border-[#042718] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[#042718]/10">
              <span className="px-2.5 py-0.5 rounded bg-[#042718] text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                MVP · In Active Build
              </span>
              <span className="font-mono text-[10px] text-[#042718]/60">Baseline</span>
            </div>
            <h3 className="font-onest text-lg font-bold text-[#042718] mb-1">
              One decision, honestly.
            </h3>
            <p className="font-inter text-xs text-[#042718]/70 leading-relaxed mb-4">
              The smallest version that is still this product. Strip the contract, the refusal, the challenge or the record and what remains is an AI critique tool.
            </p>

            <ul className="space-y-2 list-none p-0 font-inter text-xs text-[#042718]/85">
              {[
                "Artifact understanding & origin tagging",
                "Dynamic unknowns derived from artifact",
                "Four-tier Evidence model (Fact, Inference, Assumption, Unknown)",
                "System-proposed, PM-edited decision question",
                "Early sufficiency gate (under 15s)",
                "Jury deliberation with specialist positions",
                "Auditor binding confidence ceiling & veto",
                "INSUFFICIENT outcome distinct from FAILED",
                "Provisional verdict & falsification contract",
                "Red Team adversarial claim challenges",
                "PM response: Defend, Revise, or Collect",
                "Continuous local persistence & versions as stored data",
                "Evaluation set with coverage matrix & content-free telemetry",
                "Accessibility baseline on all MVP surfaces",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#042718] shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-[#042718]/10 font-mono text-[10.5px] text-[#042718]/70">
            <strong>Launch gate:</strong> 5 unassisted PMs reach verdict/refusal; 0 fabricated statements.
          </div>
        </div>

        {/* Column 2: P1 */}
        <div className="p-6 rounded-[22px] bg-[#FAF8F5] border border-[#A8711A]/30 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[#042718]/8">
              <span className="px-2.5 py-0.5 rounded bg-[#A8711A] text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                Phase 1 (P1)
              </span>
              <span className="font-mono text-[10px] text-[#042718]/60">The Wedge</span>
            </div>
            <h3 className="font-onest text-lg font-bold text-[#042718] mb-1">
              The decision lives.
            </h3>
            <p className="font-inter text-xs text-[#042718]/70 leading-relaxed mb-4">
              Turning the completed decision into a living record that updates when telemetry arrives weeks later.
            </p>

            <ul className="space-y-2 list-none p-0 font-inter text-xs text-[#042718]/85">
              {[
                "Add evidence to an existing decision & re-judge",
                "Version reading & comparison surface",
                "Visual diff engine: what changed and why",
                "Chronological Decision Log surface",
                "Return prompt & out-of-product route back",
                "Decision success condition capture",
                "Structured decision export (markdown / JSON)",
                "Explicit evaluation of falsification conditions",
                "Public calibration reporting",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8711A] shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-[#042718]/8 font-mono text-[10.5px] text-[#042718]/70">
            <strong>Target:</strong> North-star 30-day revisit rate reaches ≥25%.
          </div>
        </div>

        {/* Column 3: P2 */}
        <div className="p-6 rounded-[22px] bg-white border border-[#2F7A4F]/30 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[#042718]/8">
              <span className="px-2.5 py-0.5 rounded bg-[#2F7A4F] text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                Phase 2 (P2)
              </span>
              <span className="font-mono text-[10px] text-[#042718]/60">Expansion</span>
            </div>
            <h3 className="font-onest text-lg font-bold text-[#042718] mb-1">
              The decision travels.
            </h3>
            <p className="font-inter text-xs text-[#042718]/70 leading-relaxed mb-4">
              Extending the decision beyond the individual PM to stakeholders and across connected product journeys.
            </p>

            <ul className="space-y-2 list-none p-0 font-inter text-xs text-[#042718]/85">
              {[
                "Read-only sharing of complete decision records",
                "Evidence-span deep linking & citations",
                "Artifact-region citation (visual bounding boxes)",
                "Multi-artifact decisions spanning several flows",
                "Post-decision outcome capture feeding calibration",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2F7A4F] shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-[#042718]/8 font-mono text-[10.5px] text-[#042718]/70">
            <strong>Target:</strong> Decisions are opened and referenced by teammates who didn&apos;t create them.
          </div>
        </div>
      </div>
    </section>
  );
}
