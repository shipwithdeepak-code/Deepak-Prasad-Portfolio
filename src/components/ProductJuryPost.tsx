import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Scale,
  FileText,
  UserCheck,
  CheckCircle2,
  Lock,
  Layers,
  Search,
} from "lucide-react";
import {
  PRD_METADATA,
  CORE_PRINCIPLES,
  CAPABILITIES,
  CapabilitySpec,
} from "../data/productJuryPrdData";
import { ProductJuryCoreLoop } from "./ProductJuryCoreLoop";

interface ProductJuryPostProps {
  onNavigate: (path: string) => void;
}

export default function ProductJuryPost({ onNavigate }: ProductJuryPostProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const [expandedCaps, setExpandedCaps] = useState<Record<string, boolean>>({
    "CAP-01": true,
    "CAP-06": true,
    "CAP-07": true,
    "CAP-11": true,
    "CAP-15": true,
  });

  const toggleCap = (id: string) => {
    setExpandedCaps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAllCaps = () => {
    const all: Record<string, boolean> = {};
    CAPABILITIES.forEach((c) => {
      all[c.id] = true;
    });
    setExpandedCaps(all);
  };

  const collapseAllCaps = () => {
    setExpandedCaps({});
  };

  return (
    <div className="w-full bg-[#FAFDFB] text-[#042718]">
      {/* =========================================================================
          HEADER & METADATA BAR
          ========================================================================= */}
      <header className="border-b border-[#042718]/8 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => onNavigate("/work")}
            className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#042718]/60 hover:text-[#042718] transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to all work</span>
          </button>

          {/* Tags & Document Status */}
          <div className="flex items-center gap-2.5 flex-wrap mb-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8711A]">
              PRODUCT JURY 2.0
            </span>
            <span className="text-[#042718]/30">·</span>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2F7A4F]">
              PRD v1.1
            </span>
            <span className="text-[#042718]/30">·</span>
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#042718]/70 border border-[#042718]/15 bg-white">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9A94C] shrink-0" />
              Amended baseline · 22 September 2026
            </span>
          </div>

          {/* Main Title & Thesis */}
          <h1 className="font-onest text-3xl sm:text-5xl font-bold tracking-tight text-[#042718] leading-[1.08] text-balance">
            Product Jury 2.0
          </h1>
          <p className="font-onest text-xl sm:text-2xl font-medium text-[#042718]/85 mt-2.5 leading-snug">
            A decision system for product managers.
          </p>

          <blockquote className="my-6 pl-5 border-l-2 border-[#D9A94C] font-playfair italic text-lg sm:text-2xl text-[#042718] leading-[1.4]">
            &ldquo;{PRD_METADATA.thesis}&rdquo;
          </blockquote>

          <p className="font-inter text-base sm:text-lg text-[#042718]/75 mt-4 leading-relaxed max-w-3xl">
            Not an AI critique tool. Product Jury is being built as a decision system that makes a
            product call checkable, challengeable, and revisitable.
          </p>

          {/* Metadata bar */}
          <div className="mt-8 pt-6 border-t border-[#042718]/10 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] text-[#042718]/65">
            <span className="font-semibold text-[#042718]">Author: product, for design &amp; engineering</span>
            <span className="text-[#042718]/25">/</span>
            <span>Category: {PRD_METADATA.category}</span>
            <span className="text-[#042718]/25">/</span>
            <span>Tagline: &ldquo;{PRD_METADATA.tagline}&rdquo;</span>
            <span className="text-[#042718]/25">/</span>
            <span>Status: {PRD_METADATA.status}</span>
          </div>

          {/* Header Action Buttons (GitHub CTA + Work navigation) */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/shipwithdeepak-code/product-jury"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-[100px] bg-[#042718] text-white hover:bg-[#0B3322] font-inter text-sm font-semibold transition-colors duration-200 shadow-xs cursor-pointer"
            >
              <Github size={16} />
              <span>View on GitHub ↗</span>
            </a>
            <span className="font-inter text-xs text-[#042718]/60 ml-2">
              Official repository: shipwithdeepak-code/product-jury
            </span>
          </div>
        </div>
      </header>

      {/* =========================================================================
          PRD EDITORIAL ARTICLE
          ========================================================================= */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Callout: Status & Intent */}
        <div className="mb-12 p-6 rounded-[20px] bg-[#FAF8F5] border border-[#A8711A]/20">
          <div className="flex items-start gap-3">
            <Scale size={20} className="text-[#A8711A] shrink-0 mt-0.5" />
            <div>
              <h2 className="font-onest text-sm font-bold uppercase tracking-wider text-[#A8711A]">
                Product Requirements Document · Canonical Baseline
              </h2>
              <p className="font-inter text-sm text-[#042718]/80 leading-relaxed mt-1.5">
                This document is the authoritative product specification for Product Jury 2.0. It
                represents an active, evidence-led product system currently in research, architecture,
                and validation. It establishes the functional and quality contracts for implementation.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            FIVE PRIORITIZED PRODUCT IDEAS (VISUAL CALLOUT CARDS)
            ========================================================================= */}
        <section className="mb-16 pb-12 border-b border-[#042718]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            Foundational Axioms
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] tracking-tight mb-3">
            Five core ideas that define this system
          </h2>
          <p className="font-inter text-sm sm:text-base text-[#042718]/70 leading-relaxed mb-6">
            Product Jury rejects the standard paradigm of conversational AI feedback. These five
            architectural principles govern every capability and interface state:
          </p>

          <div className="space-y-4">
            {CORE_PRINCIPLES.map((p) => (
              <div
                key={p.letter}
                className="p-5 sm:p-6 rounded-[20px] bg-white border border-[#042718]/10 shadow-xs flex flex-col sm:flex-row gap-4 items-start"
              >
                <span className="w-8 h-8 rounded-full bg-[#042718] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {p.letter}
                </span>
                <div className="space-y-1.5">
                  <h3 className="font-onest text-lg font-bold text-[#042718] flex items-center gap-2 flex-wrap">
                    <span>{p.title}</span>
                  </h3>
                  <div className="font-mono text-xs font-semibold text-[#A8711A]">
                    &ldquo;{p.statement}&rdquo;
                  </div>
                  <p className="font-inter text-xs sm:text-[13.5px] text-[#042718]/70 leading-relaxed pt-1">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            PART I — WHY IT EXISTS
            ========================================================================= */}
        <section className="mb-16 pb-12 border-b border-[#042718]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            Part I · Strategic Thesis
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] tracking-tight mb-6">
            Why it exists
          </h2>

          <div className="space-y-8">
            {/* 01 Executive Summary */}
            <div className="p-6 rounded-[20px] bg-[#FAF8F5] border border-[#042718]/8">
              <span className="font-mono text-[11px] font-bold text-[#A8711A] block mb-1">
                01 · Executive Summary
              </span>
              <h3 className="font-onest text-lg font-bold text-[#042718] mb-2">
                Eleven Behaviours of a Decision System
              </h3>
              <p className="font-inter text-sm sm:text-[15px] text-[#042718]/80 leading-relaxed">
                {PRD_METADATA.elevenBehaviours}
              </p>
              <div className="mt-4 pt-3 border-t border-[#042718]/10 font-inter text-xs sm:text-sm font-semibold text-[#2F7A4F]">
                {PRD_METADATA.humanDecides}
              </div>
            </div>

            {/* 02 & 03 Problem & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-[18px] bg-white border border-[#042718]/8">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#A8711A] block mb-1">
                  02 · Product Vision
                </span>
                <h4 className="font-onest text-base font-bold text-[#042718] mb-2">
                  Institutional Memory for Judgement
                </h4>
                <p className="font-inter text-xs sm:text-[13.5px] text-[#042718]/70 leading-relaxed">
                  To give product leaders a rigorous, repeatable method for defending product
                  decisions before engineering cycles are burned—and preserving that defence so
                  learnings compound across subsequent product generations.
                </p>
              </div>

              <div className="p-5 rounded-[18px] bg-white border border-[#042718]/8">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#A8711A] block mb-1">
                  03 · Problem Statement
                </span>
                <h4 className="font-onest text-base font-bold text-[#042718] mb-2">
                  The Ephemeral Judgement Vacuum
                </h4>
                <p className="font-inter text-xs sm:text-[13.5px] text-[#042718]/70 leading-relaxed">
                  Decisions are made in Slack threads, whiteboards, and verbal syncs. When a release
                  fails three months later, nobody remembers which trade-offs were deliberate, which
                  risks were accepted, or what evidence was missing.
                </p>
              </div>
            </div>

            {/* 04–06 Target Users, JTBD, Pain Points */}
            <div className="space-y-4">
              <h3 className="font-onest text-lg font-bold text-[#042718]">
                04–06 · Users, JTBD &amp; Pain Points
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-white border border-[#042718]/8">
                  <div className="font-onest text-xs font-bold text-[#042718] mb-1">Target Users</div>
                  <p className="font-inter text-xs text-[#042718]/70 leading-snug">
                    Senior Product Managers, Group PMs, and technical founders who must justify roadmap commitments to executives and engineering leads.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#042718]/8">
                  <div className="font-onest text-xs font-bold text-[#042718] mb-1">Jobs to be Done</div>
                  <p className="font-inter text-xs text-[#042718]/70 leading-snug">
                    When framing a high-stakes release, help me pressure-test my rationale against hostile edge cases so I can defend my decision in review.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#042718]/8">
                  <div className="font-onest text-xs font-bold text-[#042718] mb-1">Primary Pain Point</div>
                  <p className="font-inter text-xs text-[#042718]/70 leading-snug">
                    Confirmation bias and sycophantic peer feedback that rubber-stamps proposals without auditing the empirical validity of core assumptions.
                  </p>
                </div>
              </div>
            </div>

            {/* 07–09 Why General AI is Insufficient */}
            <div className="p-6 rounded-[20px] bg-white border border-[#042718]/8 space-y-3">
              <span className="font-mono text-[11px] font-bold text-[#A8711A] block mb-1">
                07–09 · The Critique Tool Failure Mode
              </span>
              <h3 className="font-onest text-lg font-bold text-[#042718]">
                Why General AI is Insufficient for Product Decision-Making
              </h3>
              <p className="font-inter text-sm text-[#042718]/75 leading-relaxed">
                Standard conversational LLMs are sycophantic by design: they praise the user&apos;s
                prompt, rephrase assumptions as validated facts, and offer ungrounded aesthetic advice.
                When asked whether to ship, they generate generic SaaS platitudes and invent plausible metrics.
              </p>
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#042718]/8 text-xs font-mono text-[#042718]/80 leading-relaxed">
                <strong>Differentiation:</strong> Critique tools give you an opinion and keep nothing.
                Product Jury enforces epistemic boundaries, audits facts vs assumptions, provides a
                binding confidence ceiling, and records the entire deliberative defence into a durable object.
              </div>
            </div>

            {/* 10–11 Positioning & Category */}
            <div className="p-5 rounded-[18px] bg-[#FAF8F5] border border-[#042718]/8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A8711A] block mb-0.5">
                  10–11 · Positioning &amp; Category
                </span>
                <div className="font-onest text-base font-bold text-[#042718]">
                  Category: &ldquo;{PRD_METADATA.category}&rdquo;
                </div>
                <div className="font-inter text-xs text-[#042718]/70 mt-0.5">
                  Tagline: &ldquo;{PRD_METADATA.tagline}&rdquo;
                </div>
              </div>
              <div className="font-mono text-[11px] px-3 py-1.5 rounded-lg bg-white border border-[#042718]/15 text-[#042718] shrink-0">
                Not a copilot · Not a critique tool
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PART II — THE EXPERIENCE & CORE LOOP
            ========================================================================= */}
        <section className="mb-16 pb-12 border-b border-[#042718]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            Part II · The Experience
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] tracking-tight mb-2">
            12 · The Core Product Loop
          </h2>
          <p className="font-inter text-sm sm:text-base text-[#042718]/70 leading-relaxed mb-4 max-w-3xl">
            The decision system models the exact progression of rigorous product reasoning. The
            human product manager is seated directly at the decision point—evaluating arguments,
            defending choices, and persisting the record.
          </p>

          {/* Render Visual Core Loop Diagram */}
          <ProductJuryCoreLoop />

          {/* 13–16 Experience Milestones */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-white border border-[#042718]/8">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A8711A] block mb-1">
                13 · Ideal 30 Seconds
              </span>
              <p className="font-inter text-xs text-[#042718]/70 leading-relaxed">
                Drop in a screen artifact. The system extracts observable interface elements and explicitly surfaces what it cannot see, avoiding initial misreads.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#042718]/8">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A8711A] block mb-1">
                14 · Ideal 5 Minutes
              </span>
              <p className="font-inter text-xs text-[#042718]/70 leading-relaxed">
                Jury cross-examination runs, the Auditor sets confidence ceilings, and a Red Team attacks the proposal with hostile user scenarios.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#042718]/8">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A8711A] block mb-1">
                15 · The Revisit (Wedge)
              </span>
              <p className="font-inter text-xs text-[#042718]/70 leading-relaxed">
                Months later, new telemetry is uploaded. The system re-judges the original decision against its Falsification Contract and explains what changed.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PART III — THE DECISION SYSTEM & CAPABILITIES
            ========================================================================= */}
        <section className="mb-16 pb-12 border-b border-[#042718]/10">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-1">
                Part III · System Architecture
              </span>
              <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] tracking-tight">
                17–33 · Capabilities &amp; The Decision Object
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={expandAllCaps}
                className="font-mono text-[10px] uppercase font-semibold px-2.5 py-1 rounded bg-white border border-[#042718]/15 hover:bg-[#042718]/5 text-[#042718]"
              >
                Expand all
              </button>
              <button
                type="button"
                onClick={collapseAllCaps}
                className="font-mono text-[10px] uppercase font-semibold px-2.5 py-1 rounded bg-white border border-[#042718]/15 hover:bg-[#042718]/5 text-[#042718]"
              >
                Collapse all
              </button>
            </div>
          </div>

          <p className="font-inter text-sm sm:text-base text-[#042718]/70 leading-relaxed mb-6">
            The canonical capability set retains all original v1.0 specifications alongside the
            architectural additions (CAP-17 Decision Success Condition, CAP-18 Early Sufficiency Gate,
            and CAP-19 Open Loops).
          </p>

          {/* Capabilities List with Progressive Disclosure */}
          <div className="space-y-3">
            {CAPABILITIES.map((cap) => {
              const isOpen = !!expandedCaps[cap.id];
              return (
                <div
                  key={cap.id}
                  className="rounded-[18px] bg-white border border-[#042718]/10 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleCap(cap.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3 hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#042718]/5 border border-[#042718]/10 text-[#042718] shrink-0 mt-0.5">
                        {cap.id}
                      </span>
                      <div>
                        <h3 className="font-onest text-base font-bold text-[#042718]">
                          {cap.name}
                        </h3>
                        <p className="font-inter text-xs sm:text-[13px] text-[#042718]/70 mt-0.5 leading-snug">
                          {cap.summary}
                        </p>
                      </div>
                    </div>
                    <div className="text-[#042718]/40 hover:text-[#042718] shrink-0 mt-1">
                      {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </div>
                  </button>

                  {isOpen && cap.rules && cap.rules.length > 0 && (
                    <div className="px-5 pb-5 pt-1 border-t border-[#042718]/8 bg-[#FAFDFB]">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A8711A] block my-2">
                        Execution Specifications &amp; Invariants:
                      </span>
                      <ul className="space-y-1.5 list-none p-0 m-0">
                        {cap.rules.map((rule, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 font-inter text-xs sm:text-[13px] text-[#042718]/80 leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2F7A4F] shrink-0 mt-1.5" />
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            PART IV — REQUIREMENTS & TRUST CONTRACT
            ========================================================================= */}
        <section className="mb-16 pb-12 border-b border-[#042718]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            Part IV · Engineering Specifications
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] tracking-tight mb-6">
            34–53 · Requirements, Trust &amp; Untrusted Content
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-[18px] bg-white border border-[#042718]/8 space-y-2">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-[#A8711A]" />
                <h3 className="font-onest text-sm font-bold text-[#042718]">
                  34–35 · Functional &amp; Non-Functional
                </h3>
              </div>
              <p className="font-inter text-xs text-[#042718]/70 leading-relaxed">
                Deterministic JSON schemas for all agent outputs. Asynchronous pipeline execution to prevent blocking on slow model calls. Offline capability for local cached decisions.
              </p>
            </div>

            <div className="p-5 rounded-[18px] bg-white border border-[#042718]/8 space-y-2">
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-[#2F7A4F]" />
                <h3 className="font-onest text-sm font-bold text-[#042718]">
                  36–38 · Trust, Privacy &amp; Security
                </h3>
              </div>
              <p className="font-inter text-xs text-[#042718]/70 leading-relaxed">
                Customer artifacts are never used for model training. Strict data hygiene for uploaded customer screenshots, telemetry logs, and private PRDs.
              </p>
            </div>

            <div className="p-5 rounded-[18px] bg-white border border-[#042718]/8 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#042718]" />
                <h3 className="font-onest text-sm font-bold text-[#042718]">
                  51–52 · Quality Contract &amp; Prompt Injection
                </h3>
              </div>
              <p className="font-inter text-xs text-[#042718]/70 leading-relaxed">
                Screen text is treated strictly as untrusted data. Embedded adversarial instructions inside UI screenshots cannot override auditor grading rules or force positive verdicts.
              </p>
            </div>

            <div className="p-5 rounded-[18px] bg-white border border-[#042718]/8 space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-[#A8711A]" />
                <h3 className="font-onest text-sm font-bold text-[#042718]">
                  53 · Explicit Limitations
                </h3>
              </div>
              <p className="font-inter text-xs text-[#042718]/70 leading-relaxed">
                Product Jury cannot replace physical user testing or market validation. It audits logic, exposes assumptions, and flags operational friction; it cannot simulate human irrationality.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PART V — HOW WE KNOW & EVALUATION
            ========================================================================= */}
        <section className="mb-16 pb-12 border-b border-[#042718]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            Part V · Evaluation &amp; Telemetry
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] tracking-tight mb-4">
            41–56 · AI Quality, Calibration &amp; Success Metrics
          </h2>
          <p className="font-inter text-sm sm:text-base text-[#042718]/70 leading-relaxed mb-6">
            Evaluating a decision intelligence system requires metrics distinct from generative chatbots.
            Success is defined by decision defensibility, audit accuracy, and revisit frequency:
          </p>

          <div className="overflow-x-auto rounded-[18px] border border-[#042718]/10 bg-white">
            <table className="w-full text-left font-inter text-xs">
              <thead className="bg-[#FAF8F5] border-b border-[#042718]/10 font-mono text-[10px] uppercase text-[#042718]/60 tracking-wider">
                <tr>
                  <th className="p-3.5 sm:p-4">Dimension</th>
                  <th className="p-3.5 sm:p-4">Metric Focus</th>
                  <th className="p-3.5 sm:p-4">Target Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#042718]/8">
                <tr>
                  <td className="p-3.5 sm:p-4 font-bold text-[#042718]">41 Success Metrics</td>
                  <td className="p-3.5 sm:p-4 text-[#042718]/80">Decision Defensibility Rate</td>
                  <td className="p-3.5 sm:p-4 font-mono text-[#2F7A4F]">PM affirms &gt;85% of audited claims</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-bold text-[#042718]">42 AI Quality</td>
                  <td className="p-3.5 sm:p-4 text-[#042718]/80">Hallucination Rejection</td>
                  <td className="p-3.5 sm:p-4 font-mono text-[#2F7A4F]">Zero fabricated telemetry numbers</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-bold text-[#042718]">43 Calibration</td>
                  <td className="p-3.5 sm:p-4 text-[#042718]/80">Refusal Correctness</td>
                  <td className="p-3.5 sm:p-4 font-mono text-[#2F7A4F]">100% INSUFFICIENT on ungrounded inputs</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-bold text-[#042718]">54–56 Telemetry</td>
                  <td className="p-3.5 sm:p-4 text-[#042718]/80">The Revisit Loop</td>
                  <td className="p-3.5 sm:p-4 font-mono text-[#2F7A4F]">Post-launch telemetry re-evaluations</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            PART VI — SCOPE, ROADMAP & RISKS
            ========================================================================= */}
        <section className="mb-16 pb-12 border-b border-[#042718]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            Part VI · Scope &amp; Staging
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] tracking-tight mb-6">
            44–50 · Release Phasing &amp; Non-Goals
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="p-4 rounded-xl bg-white border border-[#2F7A4F]/25 shadow-xs">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#2F7A4F] block mb-1">
                MVP Baseline
              </span>
              <div className="font-onest text-sm font-bold text-[#042718] mb-1">Core Deliberation Engine</div>
              <p className="font-inter text-xs text-[#042718]/70 leading-snug">
                CAP-01 through CAP-11: Screen artifact ingestion, Evidence Model, Auditor authority, Red Team attacks, and PM response gate.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#A8711A]/20 shadow-xs">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A8711A] block mb-1">
                Phase 1 (P1)
              </span>
              <div className="font-onest text-sm font-bold text-[#042718] mb-1">Persistence &amp; Versioning</div>
              <p className="font-inter text-xs text-[#042718]/70 leading-snug">
                CAP-12 through CAP-14: Durable Decision object persistence, immutable decision logs, and multi-version differential comparisons.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#042718]/10 shadow-xs">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#042718]/50 block mb-1">
                Phase 2 (P2)
              </span>
              <div className="font-onest text-sm font-bold text-[#042718] mb-1">The Revisit &amp; Open Loops</div>
              <p className="font-inter text-xs text-[#042718]/70 leading-snug">
                CAP-15 and CAP-19: Post-launch telemetry re-judgement, automated falsification trigger detection, and scheduled calibration nudges.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-[18px] bg-[#FAF8F5] border border-[#042718]/8">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A8711A] block mb-1">
              47 · Explicit Non-Goals
            </span>
            <ul className="space-y-1 font-inter text-xs text-[#042718]/75 list-disc pl-4 leading-relaxed">
              <li>Autonomous decision-making: The system will never make an executive call on behalf of the team.</li>
              <li>Figma plugins for visual micro-tweaks: We do not critique color palette or icon padding; we critique user flows and trade-offs.</li>
              <li>Marketing copy generator: The system will not rewrite marketing headlines or promotional hero banners.</li>
            </ul>
          </div>
        </section>

        {/* =========================================================================
            BOTTOM NAVIGATION & GITHUB CALL TO ACTION
            ========================================================================= */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href="https://github.com/shipwithdeepak-code/product-jury"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[100px] bg-[#042718] text-white hover:bg-[#0B3322] font-inter text-sm font-semibold transition-colors duration-200 cursor-pointer shadow-xs"
          >
            <Github size={15} />
            <span>View on GitHub ↗</span>
          </a>

          <button
            type="button"
            onClick={() => onNavigate("/work")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[100px] border border-[#042718]/15 text-[#042718] hover:bg-[#042718]/5 font-inter text-sm font-semibold transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft size={15} />
            <span>Back to all work</span>
          </button>
        </div>
      </article>
    </div>
  );
}
