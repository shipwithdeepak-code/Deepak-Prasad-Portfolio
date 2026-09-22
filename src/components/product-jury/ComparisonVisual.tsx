import React from "react";
import { ArrowDown, XCircle, CheckCircle2, ShieldX, HelpCircle, Layers } from "lucide-react";

export function ComparisonVisual() {
  return (
    <section id="comparison" className="scroll-mt-24 pt-10 pb-14 border-b border-[#042718]/10">
      {/* Header */}
      <div className="mb-8">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
          Product Positioning
        </span>
        <h2 className="font-onest text-2xl sm:text-3xl lg:text-4xl font-bold text-[#042718] tracking-tight">
          It looks like an AI critique tool. It isn&apos;t.
        </h2>
        <p className="font-inter text-sm sm:text-base text-[#042718]/75 mt-2 max-w-3xl leading-relaxed">
          General AI assistants already critique a screenshot instantly, fluently, and for free. Competing on that ground is building a worse version of something a PM already has open in another tab.
        </p>
      </div>

      {/* Side-by-Side Comparison Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {/* Left Column: General AI Assistant */}
        <div className="p-6 sm:p-7 rounded-[22px] bg-white border border-[#042718]/10 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[#042718]/8">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#A8711A] font-semibold block">
                  Commodity Model
                </span>
                <h3 className="font-onest text-lg sm:text-xl font-bold text-[#042718]">
                  General AI Assistant
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#042718]/10 font-mono text-[10px] text-[#042718]/70">
                Stateless Chat
              </span>
            </div>

            {/* Simple Linear Flow */}
            <div className="space-y-2.5 my-5">
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#042718]/6 text-center font-onest text-xs sm:text-sm font-semibold text-[#042718]">
                Screenshot
              </div>
              <div className="flex justify-center text-[#042718]/30">
                <ArrowDown size={14} />
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#042718]/6 text-center font-onest text-xs sm:text-sm font-semibold text-[#042718]">
                Critique
              </div>
              <div className="flex justify-center text-[#042718]/30">
                <ArrowDown size={14} />
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#042718]/6 text-center font-onest text-xs sm:text-sm font-semibold text-[#042718]">
                Answer
              </div>
            </div>

            {/* Inherent Failure Modes */}
            <div className="space-y-2.5 pt-4 border-t border-[#042718]/8">
              <div className="flex items-start gap-2 text-xs font-inter text-[#042718]/70">
                <XCircle size={14} className="text-[#A8711A] shrink-0 mt-0.5" />
                <span><strong>No commitment:</strong> Agrees too readily; never states in advance what would prove its opinion wrong.</span>
              </div>
              <div className="flex items-start gap-2 text-xs font-inter text-[#042718]/70">
                <XCircle size={14} className="text-[#A8711A] shrink-0 mt-0.5" />
                <span><strong>No object:</strong> A conversation thread is not a decision. It has no lineage, no versions, and no diff.</span>
              </div>
              <div className="flex items-start gap-2 text-xs font-inter text-[#042718]/70">
                <XCircle size={14} className="text-[#A8711A] shrink-0 mt-0.5" />
                <span><strong>No refusal:</strong> Built to be helpful, so it will always fabricate a plausible recommendation even with zero evidence.</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-[#042718]/8 font-mono text-[11px] text-[#042718]/50 text-center">
            Outcome: Ephemeral opinion forgotten by next week
          </div>
        </div>

        {/* Right Column: Product Jury */}
        <div className="p-6 sm:p-7 rounded-[22px] bg-[#042718] text-white shadow-md flex flex-col justify-between border border-[#042718]">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-white/10">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#D9A94C] font-bold block">
                  Decision Intelligence
                </span>
                <h3 className="font-onest text-lg sm:text-xl font-bold text-white">
                  Product Jury
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 font-mono text-[10px] text-[#D9A94C]">
                Durable System
              </span>
            </div>

            {/* Structured Multi-Stage Flow */}
            <div className="space-y-1.5 my-4 font-mono text-[11px] text-white/90">
              <div className="p-2 rounded-lg bg-white/10 border border-white/10 text-center">
                Artifact &amp; Separated Evidence
              </div>
              <div className="text-center text-[#D9A94C] text-[10px]">↓</div>
              <div className="p-2 rounded-lg bg-white/10 border border-white/10 text-center">
                Decision Question &amp; Derived Unknowns
              </div>
              <div className="text-center text-[#D9A94C] text-[10px]">↓</div>
              <div className="p-2 rounded-lg bg-white/10 border border-white/10 text-center">
                Jury Deliberation &amp; Binding Confidence Ceiling
              </div>
              <div className="text-center text-[#D9A94C] text-[10px]">↓</div>
              <div className="p-2 rounded-lg bg-white/10 border border-white/10 text-center">
                Provisional Verdict + Falsification Contract
              </div>
              <div className="text-center text-[#D9A94C] text-[10px]">↓</div>
              <div className="p-2 rounded-lg bg-white/10 border border-white/10 text-center text-[#D9A94C] font-semibold">
                Red Team Challenge &amp; PM Response Gate
              </div>
              <div className="text-center text-[#D9A94C] text-[10px]">↓</div>
              <div className="p-2 rounded-lg bg-[#2F7A4F]/60 border border-[#2F7A4F] text-center text-white">
                Durable Decision Record &amp; 30-Day Revisit
              </div>
            </div>

            {/* Inherent Strengths */}
            <div className="space-y-2 pt-3 border-t border-white/10">
              <div className="flex items-start gap-2 text-xs font-inter text-white/80">
                <CheckCircle2 size={14} className="text-[#D9A94C] shrink-0 mt-0.5" />
                <span><strong>Falsification:</strong> States explicitly what incoming observation would overturn the call.</span>
              </div>
              <div className="flex items-start gap-2 text-xs font-inter text-white/80">
                <CheckCircle2 size={14} className="text-[#D9A94C] shrink-0 mt-0.5" />
                <span><strong>Persistence:</strong> The question, assumptions, and responses become a permanent auditable asset.</span>
              </div>
              <div className="flex items-start gap-2 text-xs font-inter text-white/80">
                <CheckCircle2 size={14} className="text-[#D9A94C] shrink-0 mt-0.5" />
                <span><strong>Honest Refusal:</strong> Declines to answer (INSUFFICIENT) when evidence is thin, naming what is missing.</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/10 font-mono text-[11px] text-[#D9A94C] text-center font-semibold">
            Outcome: A product call you can defend in review and learn from
          </div>
        </div>
      </div>

      {/* Synthesis Quote */}
      <div className="p-5 sm:p-6 rounded-[20px] bg-[#FAF8F5] border border-[#042718]/8 text-center max-w-2xl mx-auto">
        <blockquote className="font-playfair italic text-base sm:text-lg text-[#042718] leading-snug">
          &ldquo;General AI is already very good at critique. Product Jury does not need to win that battle. The product is the structure around the judgement.&rdquo;
        </blockquote>
      </div>
    </section>
  );
}
