import React from "react";
import { UserCheck, Cpu, ArrowRight, ShieldCheck } from "lucide-react";

export function HumanVsAiSplit() {
  return (
    <section id="human-vs-ai" className="scroll-mt-24 pt-10 pb-14 border-b border-[#042718]/10">
      {/* Header */}
      <div className="mb-8">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
          Agency &amp; Accountability
        </span>
        <h2 className="font-onest text-2xl sm:text-3xl lg:text-4xl font-bold text-[#042718] tracking-tight">
          The PM still makes the call
        </h2>
        <p className="font-inter text-sm sm:text-base text-[#042718]/75 mt-2 max-w-3xl leading-relaxed">
          The line between assistive AI and autonomous overreach is carried by language, interface architecture, and strict boundary design.
        </p>
      </div>

      {/* Visual Split Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
        {/* Left Side: System Role */}
        <div className="p-6 sm:p-7 rounded-[22px] bg-white border border-[#042718]/10 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 pb-3 mb-4 border-b border-[#042718]/8">
              <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#042718]/15 flex items-center justify-center text-[#042718]">
                <Cpu size={18} />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#A8711A] font-bold block">
                  Responsibility
                </span>
                <h3 className="font-onest text-xl font-bold text-[#042718]">
                  SYSTEM
                </h3>
              </div>
            </div>

            <p className="font-inter text-xs sm:text-sm text-[#042718]/70 leading-relaxed mb-4">
              The system operates strictly within derived facts. It audits claims, surfaces blind spots, and subjects assumptions to hostile cross-examination.
            </p>

            <ul className="space-y-2 font-mono text-xs text-[#042718]/85">
              {[
                "Evidence categorization (Fact / Inference / Assumption / Unknown)",
                "Derived unknowns that could flip the outcome",
                "Deliberation arguments across specialist lenses",
                "Auditor authority & binding confidence ceiling",
                "Adversarial Red Team claim attacks",
                "Falsification conditions naming what proves it wrong",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#A8711A] font-bold">↳</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-3 border-t border-[#042718]/8 font-inter text-xs text-[#042718]/60 italic">
            Binding rule: Never uses first-person decisional voice (&ldquo;You should ship&rdquo; is strictly forbidden).
          </div>
        </div>

        {/* Right Side: Human PM Role */}
        <div className="p-6 sm:p-7 rounded-[22px] bg-[#042718] text-white shadow-md flex flex-col justify-between border border-[#042718]">
          <div>
            <div className="flex items-center gap-3 pb-3 mb-4 border-b border-white/10">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#D9A94C]">
                <UserCheck size={18} />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#D9A94C] font-bold block">
                  Ownership
                </span>
                <h3 className="font-onest text-xl font-bold text-white">
                  PRODUCT MANAGER
                </h3>
              </div>
            </div>

            <p className="font-inter text-xs sm:text-sm text-white/75 leading-relaxed mb-4">
              Product management is the practice of bearing responsibility for outcomes. The PM evaluates arguments, weighs trade-offs, and authors the defence.
            </p>

            <ul className="space-y-2 font-mono text-xs text-white/90">
              {[
                "Framing & confirming the decision question",
                "Supplying proprietary business context & telemetry",
                "Defending decisions against Red Team challenges",
                "Revising claims with recorded justifications",
                "Scheduling research checks (Collect open loops)",
                "Recording the decision into institutional memory",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#D9A94C] font-bold">↳</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-3 border-t border-white/10 font-inter text-xs text-white/70 italic">
            The PM owns the call. The record is their defence when challenged in review.
          </div>
        </div>
      </div>

      {/* Trust Anchor Statement */}
      <div className="mt-8 text-center max-w-xl mx-auto">
        <blockquote className="font-playfair italic text-lg sm:text-xl text-[#042718] leading-relaxed">
          &ldquo;The system produces evidence, argument and challenge.<br />
          <span className="not-italic font-onest font-bold text-[#042718]">The PM decides.</span>&rdquo;
        </blockquote>
      </div>
    </section>
  );
}
