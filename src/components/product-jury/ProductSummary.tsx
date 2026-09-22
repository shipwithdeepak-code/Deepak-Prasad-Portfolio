import React from "react";
import { AlertCircle, Lightbulb, Compass, Zap } from "lucide-react";

export function ProductSummary() {
  return (
    <section id="overview" className="scroll-mt-24 pt-8 pb-14 border-b border-[#042718]/10">
      {/* Section Header */}
      <div className="mb-8">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
          Executive Summary
        </span>
        <h2 className="font-onest text-2xl sm:text-3xl lg:text-4xl font-bold text-[#042718] tracking-tight">
          The product in 60 seconds
        </h2>
        <p className="font-inter text-sm sm:text-base text-[#042718]/70 mt-2 max-w-2xl">
          For recruiters, product leaders, and hiring managers who need the core thesis in under a minute.
        </p>
      </div>

      {/* 4 Concise Scannable Editorial Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {/* Block 1: The Problem */}
        <div className="p-6 rounded-[20px] bg-white border border-[#042718]/10 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-7 h-7 rounded-lg bg-[#A8711A]/10 text-[#A8711A] flex items-center justify-center font-mono text-xs font-bold">
                01
              </span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#A8711A]">
                The Problem
              </span>
            </div>
            <h3 className="font-onest text-lg sm:text-xl font-bold text-[#042718] mb-2 leading-snug">
              Consequential calls made on thin evidence—lost to meeting memory.
            </h3>
            <p className="font-inter text-sm text-[#042718]/75 leading-relaxed">
              PMs make dozens of high-stakes product calls each quarter with incomplete evidence. But the reasoning, assumptions, objections, and trade-offs rarely survive beyond the meeting or Slack thread. When things go wrong, nobody can reconstruct what was known.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#042718]/6 font-mono text-[11px] text-[#042718]/60">
            Fails at: accountability, retrospectability &amp; institutional learning
          </div>
        </div>

        {/* Block 2: The Insight */}
        <div className="p-6 rounded-[20px] bg-white border border-[#042718]/10 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-7 h-7 rounded-lg bg-[#2F7A4F]/10 text-[#2F7A4F] flex items-center justify-center font-mono text-xs font-bold">
                02
              </span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#2F7A4F]">
                The Insight
              </span>
            </div>
            <h3 className="font-onest text-lg sm:text-xl font-bold text-[#042718] mb-2 leading-snug">
              The valuable product is not another AI opinion.
            </h3>
            <p className="font-inter text-sm text-[#042718]/75 leading-relaxed">
              Critique is already free and fluent everywhere in general AI assistants. The real leverage is creating a persistent, versioned <strong className="font-semibold text-[#042718]">decision object</strong> that can be challenged before launch, defended in review, and re-judged when telemetry lands.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#042718]/6 font-mono text-[11px] text-[#2F7A4F] font-semibold">
            The wedge: holding a decision accountable across time
          </div>
        </div>

        {/* Block 3: The Product */}
        <div className="p-6 rounded-[20px] bg-white border border-[#042718]/10 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-7 h-7 rounded-lg bg-[#042718]/10 text-[#042718] flex items-center justify-center font-mono text-xs font-bold">
                03
              </span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#042718]">
                The Product
              </span>
            </div>
            <h3 className="font-onest text-lg sm:text-xl font-bold text-[#042718] mb-2 leading-snug">
              A structured, evidence-led decision process.
            </h3>
            <p className="font-inter text-sm text-[#042718]/75 leading-relaxed">
              Product Jury transforms an artifact into a disciplined decision loop: Understand → identify unknowns → frame the call → assess evidence sufficiency → convene the jury → produce a provisional verdict → challenge it via Red Team → record the PM&apos;s response → revisit when new data arrives.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#042718]/6 font-mono text-[11px] text-[#042718]/60">
            Mechanism: 11 distinct product behaviours in a closed loop
          </div>
        </div>

        {/* Block 4: The Difference */}
        <div className="p-6 rounded-[20px] bg-white border border-[#042718]/10 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-7 h-7 rounded-lg bg-[#A8711A]/10 text-[#A8711A] flex items-center justify-center font-mono text-xs font-bold">
                04
              </span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#A8711A]">
                The Difference
              </span>
            </div>
            <h3 className="font-onest text-lg sm:text-xl font-bold text-[#042718] mb-2 leading-snug">
              General AI critiques a screen. Product Jury defends a decision.
            </h3>
            <p className="font-inter text-sm text-[#042718]/75 leading-relaxed">
              Chatbots agree too easily, never refuse when evidence is absent, and leave no durable record. Product Jury enforces epistemic boundaries, sets binding confidence ceilings, attacks load-bearing claims, and tracks what would overturn the verdict.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#042718]/6 font-mono text-[11px] text-[#A8711A] font-semibold">
            Invariant: Refusal is an intentional feature, not a failure
          </div>
        </div>
      </div>

      {/* Prominent Editorial Callout */}
      <div className="mt-6 p-6 sm:p-7 rounded-[22px] bg-[#042718] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D9A94C] font-semibold block">
            Core Philosophy
          </span>
          <div className="font-onest text-xl sm:text-2xl font-bold tracking-tight text-white">
            &ldquo;The record is the product.&rdquo;
          </div>
          <p className="font-inter text-xs sm:text-sm text-white/75 max-w-xl">
            A verdict without a falsification contract is just an opinion. If the reasoning isn&apos;t kept and revisit isn&apos;t possible, the decision never truly existed.
          </p>
        </div>
        <div className="shrink-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 font-mono text-xs text-[#D9A94C]">
            <span>Single Decider · Durable Record</span>
          </div>
        </div>
      </div>
    </section>
  );
}
