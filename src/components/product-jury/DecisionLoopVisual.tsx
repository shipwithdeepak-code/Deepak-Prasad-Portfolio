import React, { useState } from "react";
import {
  ArrowRight,
  ArrowDown,
  RotateCcw,
  UserCheck,
  ShieldAlert,
  FileSearch,
  Scale,
  Sparkles,
  HelpCircle,
  Database,
  Layers,
  History,
  CheckCircle2,
} from "lucide-react";

interface StepDetail {
  id: string;
  name: string;
  category: "Intake" | "Framing" | "Deliberation" | "Challenge" | "Decision" | "Revisit";
  whatHappens: string;
  role: "system" | "pm" | "loop";
}

const LOOP_STEPS: StepDetail[] = [
  {
    id: "01",
    name: "Artifact",
    category: "Intake",
    whatHappens: "Screen, wireframe or spec dropped in. Treated as untrusted visual data.",
    role: "pm",
  },
  {
    id: "02",
    name: "Understanding",
    category: "Intake",
    whatHappens: "Separates observed layout from inferred logic. States what cannot be seen.",
    role: "system",
  },
  {
    id: "03",
    name: "Decision Question",
    category: "Framing",
    whatHappens: "System proposes the exact call being made; PM confirms or refines in seconds.",
    role: "pm",
  },
  {
    id: "04",
    name: "Unknowns",
    category: "Framing",
    whatHappens: "Identifies only the questions that would change the verdict. Skippable.",
    role: "system",
  },
  {
    id: "05",
    name: "Evidence",
    category: "Framing",
    whatHappens: "PM pastes quotes or telemetry. Early Sufficiency Gate checks if a call is possible.",
    role: "pm",
  },
  {
    id: "06",
    name: "Jury",
    category: "Deliberation",
    whatHappens: "Specialist lenses (UX & Strategy) deliberate; Auditor sets a binding confidence ceiling.",
    role: "system",
  },
  {
    id: "07",
    name: "Provisional Verdict",
    category: "Deliberation",
    whatHappens: "Ship, Hold, Test, or Kill — plus an explicit Falsification Contract naming what would overturn it.",
    role: "system",
  },
  {
    id: "08",
    name: "Red Team",
    category: "Challenge",
    whatHappens: "Attacks specific load-bearing statements, not generic contrarianism.",
    role: "system",
  },
  {
    id: "09",
    name: "PM Response",
    category: "Decision",
    whatHappens: "The PM decides: Defend (with reason), Revise (updates confidence), or Collect (open loop).",
    role: "pm",
  },
  {
    id: "10",
    name: "Decision Recorded",
    category: "Decision",
    whatHappens: "Durable record persists without a save button. Retained and listed by question.",
    role: "system",
  },
  {
    id: "11",
    name: "New Evidence Arrives",
    category: "Revisit",
    whatHappens: "Weeks later, telemetry or pilot data lands against the outstanding open loop.",
    role: "pm",
  },
  {
    id: "12",
    name: "Re-Judge",
    category: "Revisit",
    whatHappens: "Re-evaluates the same question without starting over; tests against the falsification contract.",
    role: "system",
  },
  {
    id: "13",
    name: "What Changed & Why",
    category: "Revisit",
    whatHappens: "Shows the exact diff: claims shifted, confidence delta, and what remains open.",
    role: "loop",
  },
];

export function DecisionLoopVisual() {
  const [activeStep, setActiveStep] = useState<string>("09");
  const currentStep = LOOP_STEPS.find((s) => s.id === activeStep) || LOOP_STEPS[8];

  return (
    <section id="the-loop" className="scroll-mt-24 pt-10 pb-14 border-b border-[#042718]/10">
      {/* Section Header */}
      <div className="mb-6">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
          Core Product Loop
        </span>
        <h2 className="font-onest text-2xl sm:text-3xl lg:text-4xl font-bold text-[#042718] tracking-tight">
          A closed decision loop, not a one-way conveyor
        </h2>
        <p className="font-inter text-sm sm:text-base text-[#042718]/75 mt-2 max-w-3xl leading-relaxed">
          Two properties separate this system from generic generative AI: it closes when new evidence arrives, and the human product manager sits directly at the point of decision.
        </p>
      </div>

      {/* Interactive Loop Diagram Container */}
      <div className="p-5 sm:p-8 rounded-[24px] bg-[#FAF8F5] border border-[#042718]/10">
        {/* Step Navigation Bar / Horizontal Grid for Desktop, vertical for Mobile */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#042718]/60 font-semibold">
              Select any stage to inspect:
            </span>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#042718]/60">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#042718]" /> PM Action
              </span>
              <span className="inline-flex items-center gap-1 ml-2">
                <span className="w-2 h-2 rounded-full bg-[#A8711A]" /> System Analysis
              </span>
              <span className="inline-flex items-center gap-1 ml-2">
                <span className="w-2 h-2 rounded-full bg-[#2F7A4F]" /> Closed Loop
              </span>
            </div>
          </div>

          {/* Connected Flow Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {LOOP_STEPS.slice(0, 7).map((step) => {
              const isSelected = activeStep === step.id;
              const isPm = step.role === "pm";
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(step.id)}
                  className={`p-2.5 sm:p-3 rounded-xl text-left transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-white border-[#042718] shadow-sm ring-1 ring-[#042718]"
                      : "bg-white/80 border-[#042718]/10 hover:bg-white hover:border-[#042718]/25"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-mono text-[9px] font-bold text-[#A8711A]">
                      {step.id}
                    </span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isPm ? "bg-[#042718]" : "bg-[#A8711A]"
                      }`}
                    />
                  </div>
                  <div className="font-onest text-xs font-bold text-[#042718] leading-tight truncate">
                    {step.name}
                  </div>
                  <div className="font-mono text-[8.5px] uppercase tracking-wider text-[#042718]/50 mt-0.5">
                    {step.category}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Row 2: Challenge -> PM Decision Point -> Record -> Revisit */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">
            {LOOP_STEPS.slice(7, 13).map((step) => {
              const isSelected = activeStep === step.id;
              const isPm = step.role === "pm";
              const isLoop = step.role === "loop";
              const isDecisionPoint = step.id === "09";

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(step.id)}
                  className={`p-2.5 sm:p-3 rounded-xl text-left transition-all cursor-pointer border ${
                    isDecisionPoint
                      ? isSelected
                        ? "bg-[#042718] text-white border-[#042718] shadow-md ring-2 ring-[#D9A94C]"
                        : "bg-[#042718]/90 text-white border-[#042718] hover:bg-[#042718]"
                      : isSelected
                      ? "bg-white border-[#2F7A4F] shadow-sm ring-1 ring-[#2F7A4F]"
                      : "bg-white/80 border-[#042718]/10 hover:bg-white hover:border-[#042718]/25"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`font-mono text-[9px] font-bold ${
                        isDecisionPoint ? "text-[#D9A94C]" : isLoop ? "text-[#2F7A4F]" : "text-[#A8711A]"
                      }`}
                    >
                      {step.id}
                    </span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isDecisionPoint
                          ? "bg-[#D9A94C]"
                          : isLoop
                          ? "bg-[#2F7A4F]"
                          : isPm
                          ? "bg-[#042718]"
                          : "bg-[#A8711A]"
                      }`}
                    />
                  </div>
                  <div
                    className={`font-onest text-xs font-bold leading-tight truncate ${
                      isDecisionPoint ? "text-white" : "text-[#042718]"
                    }`}
                  >
                    {step.name}
                  </div>
                  <div
                    className={`font-mono text-[8.5px] uppercase tracking-wider mt-0.5 ${
                      isDecisionPoint ? "text-white/60" : "text-[#042718]/50"
                    }`}
                  >
                    {isDecisionPoint ? "The Decision Point" : step.category}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Card for Selected Step */}
        <div className="p-5 sm:p-6 rounded-[20px] bg-white border border-[#042718]/10 shadow-xs mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#042718]/8">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#042718]/15 font-mono text-xs font-bold text-[#042718] flex items-center justify-center shrink-0">
                {currentStep.id}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-onest text-base sm:text-lg font-bold text-[#042718]">
                    {currentStep.name}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF8F5] text-[#A8711A] font-semibold border border-[#042718]/8">
                    {currentStep.category}
                  </span>
                </div>
                <span className="font-inter text-xs text-[#042718]/60">
                  {currentStep.role === "pm"
                    ? "Human Action — The PM leads and validates"
                    : currentStep.role === "loop"
                    ? "Loop Closure — Connects back into the Decision object"
                    : "System Execution — Strict epistemic derivation"}
                </span>
              </div>
            </div>

            {currentStep.id === "09" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#042718] text-[#D9A94C] font-mono text-[10.5px] font-bold tracking-wide shrink-0">
                <UserCheck size={13} />
                THE PM DECIDES
              </span>
            )}
          </div>

          <p className="font-inter text-sm text-[#042718]/85 mt-3 leading-relaxed">
            {currentStep.whatHappens}
          </p>
        </div>

        {/* The Closed Loop Revisit Box (Highlighting the return back to the decision) */}
        <div className="p-5 rounded-[20px] bg-[#ECFDF5] border border-[#2F7A4F]/25 text-[#042718]">
          <div className="flex items-start sm:items-center justify-between flex-wrap gap-2 mb-2">
            <div className="flex items-center gap-2">
              <RotateCcw size={16} className="text-[#2F7A4F]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#2F7A4F]">
                The Loop Closes · Return &amp; Re-Judge
              </span>
            </div>
            <span className="font-mono text-[10.5px] px-2.5 py-0.5 rounded-full bg-white text-[#2F7A4F] border border-[#2F7A4F]/20 font-semibold">
              North Star Mechanism: ≥25% 30-day revisit
            </span>
          </div>

          <p className="font-inter text-xs sm:text-[13.5px] text-[#042718]/80 leading-relaxed">
            Unlike chatbots where conversations vanish into stale threads, Product Jury treats a decision as an evolving asset. When new telemetry or user research arrives, it re-evaluates the call against the original <strong>falsification condition</strong> and maps back into the decision—highlighting exactly what changed, why it changed, and what remains unknown.
          </p>

          <div className="mt-4 pt-3 border-t border-[#2F7A4F]/20 flex flex-wrap items-center gap-2 font-mono text-[11px] text-[#2F7A4F] font-semibold">
            <span>Step 11: Evidence Arrives</span>
            <ArrowRight size={12} />
            <span>Step 12: Re-Judge Against Contract</span>
            <ArrowRight size={12} />
            <span>Step 13: Diff &amp; What Changed</span>
            <ArrowRight size={12} />
            <span className="underline decoration-[#2F7A4F] underline-offset-2">
              Loops back into the durable Decision record
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
