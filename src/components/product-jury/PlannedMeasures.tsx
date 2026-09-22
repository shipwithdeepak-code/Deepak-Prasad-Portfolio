import React from "react";
import { Target, Activity, ShieldCheck, AlertOctagon } from "lucide-react";

export function PlannedMeasures() {
  return (
    <section id="measures" className="scroll-mt-24 pt-10 pb-14 border-b border-[#042718]/10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#A8711A]">
            PLANNED PRODUCT MEASURES
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-[#042718]/10 font-mono text-[9px] uppercase tracking-wider text-[#042718]/60">
            Design Targets · Not Achieved Outcomes
          </span>
        </div>
        <h2 className="font-onest text-2xl sm:text-3xl lg:text-4xl font-bold text-[#042718] tracking-tight">
          How I&apos;ll know this is working
        </h2>
        <p className="font-inter text-sm sm:text-base text-[#042718]/75 mt-2 max-w-3xl leading-relaxed">
          Product Jury is in active development. The metrics below are planned evaluation targets and guardrails defined in the PRD to steer development, not claims of current user adoption.
        </p>
      </div>

      {/* North Star Metric Card */}
      <div className="p-6 sm:p-8 rounded-[24px] bg-[#042718] text-white shadow-md mb-8 border border-[#042718]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
          <div>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#D9A94C] font-bold block mb-1">
              Planned North Star Metric
            </span>
            <h3 className="font-onest text-xl sm:text-2xl font-bold text-white">
              Decisions revisited with new evidence within 30 days
            </h3>
          </div>
          <div className="text-right sm:text-left">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-[#D9A94C]">
              &ge; 25%
            </span>
            <span className="block font-mono text-[10px] text-white/60">Target Benchmark</span>
          </div>
        </div>

        <p className="font-inter text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl">
          This is the only metric that can only go up if the product is genuinely doing its job: a PM returns to an existing decision because the record was worth keeping and the re-judgement was worth doing. Session duration and raw verdict counts are diagnostics, never success goals.
        </p>
      </div>

      {/* 3 Metric Categories: Product Signals, AI Quality, Guardrails */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Column 1: Product Signals */}
        <div className="p-5 sm:p-6 rounded-[22px] bg-white border border-[#042718]/10 shadow-xs">
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#042718]/8">
            <Activity size={16} className="text-[#A8711A]" />
            <h4 className="font-onest text-base font-bold text-[#042718]">
              Product Signals
            </h4>
          </div>
          <div className="space-y-3 font-inter text-xs">
            <div>
              <div className="flex justify-between font-mono font-semibold text-[#042718]">
                <span>Challenge rate</span>
                <span className="text-[#A8711A]">&ge; 60%</span>
              </div>
              <p className="text-[#042718]/65 text-[11px] mt-0.5">PMs engage with the adversary rather than accepting the verdict flat.</p>
            </div>
            <div>
              <div className="flex justify-between font-mono font-semibold text-[#042718]">
                <span>Revision on challenge</span>
                <span className="text-[#A8711A]">&ge; 30%</span>
              </div>
              <p className="text-[#042718]/65 text-[11px] mt-0.5">Red Team has teeth: PMs actually revise a claim.</p>
            </div>
            <div>
              <div className="flex justify-between font-mono font-semibold text-[#042718]">
                <span>Contract take-up</span>
                <span className="text-[#A8711A]">&ge; 30%</span>
              </div>
              <p className="text-[#042718]/65 text-[11px] mt-0.5">Falsification conditions become active open loops.</p>
            </div>
            <div>
              <div className="flex justify-between font-mono font-semibold text-[#042718]">
                <span>Question answer rate</span>
                <span className="text-[#A8711A]">&ge; 70%</span>
              </div>
              <p className="text-[#042718]/65 text-[11px] mt-0.5">Derived unknowns are perceived as worth answering.</p>
            </div>
            <div>
              <div className="flex justify-between font-mono font-semibold text-[#042718]">
                <span>Question drop-off</span>
                <span className="text-[#A8711A]">&lt; 15%</span>
              </div>
              <p className="text-[#042718]/65 text-[11px] mt-0.5">PMs accept or edit the proposed decision question.</p>
            </div>
          </div>
        </div>

        {/* Column 2: AI Quality & Epistemics */}
        <div className="p-5 sm:p-6 rounded-[22px] bg-white border border-[#042718]/10 shadow-xs">
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#042718]/8">
            <ShieldCheck size={16} className="text-[#2F7A4F]" />
            <h4 className="font-onest text-base font-bold text-[#042718]">
              AI Quality Gates
            </h4>
          </div>
          <div className="space-y-3 font-inter text-xs">
            <div>
              <div className="flex justify-between font-mono font-semibold text-[#042718]">
                <span>Fabrication rate</span>
                <span className="text-[#2F7A4F]">0% (human-scored)</span>
              </div>
              <p className="text-[#042718]/65 text-[11px] mt-0.5">Zero statements asserting anything not derivable from input.</p>
            </div>
            <div>
              <div className="flex justify-between font-mono font-semibold text-[#042718]">
                <span>Attack specificity</span>
                <span className="text-[#2F7A4F]">100%</span>
              </div>
              <p className="text-[#042718]/65 text-[11px] mt-0.5">Every Red Team attack targets a specific named statement.</p>
            </div>
            <div>
              <div className="flex justify-between font-mono font-semibold text-[#042718]">
                <span>Load-bearing hit rate</span>
                <span className="text-[#2F7A4F]">100%</span>
              </div>
              <p className="text-[#042718]/65 text-[11px] mt-0.5">At least one attack per challenge hits a foundational claim.</p>
            </div>
            <div>
              <div className="flex justify-between font-mono font-semibold text-[#042718]">
                <span>Verdict stability</span>
                <span className="text-[#2F7A4F]">&ge; 80%</span>
              </div>
              <p className="text-[#042718]/65 text-[11px] mt-0.5">Repeat runs on same input yield the same outcome.</p>
            </div>
            <div>
              <div className="flex justify-between font-mono font-semibold text-[#042718]">
                <span>Prompt injection escape</span>
                <span className="text-[#2F7A4F]">0 (absolute bar)</span>
              </div>
              <p className="text-[#042718]/65 text-[11px] mt-0.5">Zero successful injections across adversarial evaluation.</p>
            </div>
          </div>
        </div>

        {/* Column 3: Guardrail Metrics */}
        <div className="p-5 sm:p-6 rounded-[22px] bg-white border border-[#042718]/10 shadow-xs">
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#042718]/8">
            <AlertOctagon size={16} className="text-[#042718]" />
            <h4 className="font-onest text-base font-bold text-[#042718]">
              Guardrail Limits
            </h4>
          </div>
          <div className="space-y-3 font-inter text-xs">
            <div>
              <div className="flex justify-between font-mono font-semibold text-[#042718]">
                <span>Blind acceptance</span>
                <span className="text-[#042718]">&lt; 40%</span>
              </div>
              <p className="text-[#042718]/65 text-[11px] mt-0.5">Ceiling: if PMs accept without challenge, it has become an oracle.</p>
            </div>
            <div>
              <div className="flex justify-between font-mono font-semibold text-[#042718]">
                <span>Refusal w/ evidence</span>
                <span className="text-[#042718]">&lt; 10%</span>
              </div>
              <p className="text-[#042718]/65 text-[11px] mt-0.5">Ceiling: avoids over-refusal when adequate data is supplied.</p>
            </div>
            <div>
              <div className="flex justify-between font-mono font-semibold text-[#042718]">
                <span>Refusal on thin attempts</span>
                <span className="text-[#042718]">&gt; 40%</span>
              </div>
              <p className="text-[#042718]/65 text-[11px] mt-0.5">Floor: prevents silent rubber-stamping when inputs are empty.</p>
            </div>
            <div>
              <div className="flex justify-between font-mono font-semibold text-[#042718]">
                <span>Session time to verdict</span>
                <span className="text-[#042718]">&lt; 10 min median</span>
              </div>
              <p className="text-[#042718]/65 text-[11px] mt-0.5">Rigour must not become bureaucratic tedium.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
