import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Activity,
  X,
  CheckCircle2,
} from "lucide-react";
import GlassButton from "./ui/GlassButton";

/**
 * APPLIED AI & PRODUCT SYSTEMS — Homepage Section Grid
 *
 * Visual-First Architecture:
 * 1. Jagr: Primary Flagship Card (Visually dominant, minimal copy, high-fidelity UI visual)
 *    - Short, punchy positioning: "From product signals to product attention."
 *    - Single sophisticated product-interface visual communicating the Sentry vertical slice.
 *    - Opens "How I built Jagr" case-study modal upon click.
 * 2. Dīpa: Secondary Supporting Card (Clean, mascot visual, 1 concise sentence, Open Dīpa CTA)
 * 3. Product Jury: Secondary Supporting Card (Compact decision system, quote, micro-mechanism, 1 CTA)
 */

export default function AiBuilds({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [isJagrModalOpen, setIsJagrModalOpen] = useState(false);

  // Close modal on Escape
  useEffect(() => {
    if (!isJagrModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        setIsJagrModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isJagrModalOpen]);

  return (
    <div className="ai-builds-container w-full">
      <style>{`
        .ai-card {
          border-radius: 24px;
          border: 1px solid rgba(18, 21, 23, 0.08);
          background: #FFFFFF;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          position: relative;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.25s ease,
                      box-shadow 0.25s ease;
        }
        .ai-card:hover {
          border-color: rgba(18, 21, 23, 0.16);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.06);
        }
        .ai-card--jagr {
          background: linear-gradient(178deg, #FFFFFF 0%, #FAF8F5 65%, rgba(200, 155, 60, 0.03) 100%);
        }
        .ai-card--dipa {
          background: linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%);
        }
        @keyframes ai-orb-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2.4px); }
        }
        .ai-orb {
          transform-box: fill-box;
          transform-origin: 50% 88%;
          animation: ai-orb-bob 4.4s cubic-bezier(.4,0,.5,1) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ai-orb {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {/* 1. DĪPA: PRIMARY FLAGSHIP PRODUCT (Full-Width Dominant Card) */}
      <article
        className="ai-card ai-card--dipa w-full p-6 sm:p-9 md:p-10 mb-10 transition-all duration-300"
        aria-label="Dīpa: Flagship AI Product"
      >
        {/* Top Metadata Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-black/[0.06] mb-6 sm:mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A8711A] animate-pulse shrink-0" />
            <span className="font-mono text-[11px] font-bold text-[#A8711A] tracking-wider uppercase">
              FLAGSHIP AI PRODUCT
            </span>
            <span aria-hidden="true" className="text-black/25">·</span>
            <span className="font-mono text-[11px] text-[#4A525A]">
              Live on portfolio · Evaluated RAG &amp; Voice
            </span>
          </div>
          <span className="font-mono text-[10.5px] text-[#7A828A]">
            34 verified chunks · Strict confidence gating
          </span>
        </div>

        {/* Grid: Details on Left (7 cols), Visual on Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A8711A]">
                  MEET DĪPA
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-black/10 font-mono text-[10px] text-[#121517] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8FD44A]" />
                  Live System
                </span>
              </div>

              <h3 className="font-onest text-[34px] sm:text-[44px] md:text-[48px] font-extrabold text-[#121517] tracking-tight leading-none">
                Dīpa
              </h3>

              <p className="font-inter text-[18px] sm:text-[21px] font-semibold text-[#121517] mt-3 leading-snug">
                A live, multilingual voice copilot that answers questions about my work, grounded in evidence and evaluated before it ships.
              </p>

              {/* Three Proof Chips */}
              <div className="flex flex-wrap items-center gap-2.5 mt-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/[0.10] text-[#121517] font-mono text-[11px] font-semibold shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C]" />
                  RAG with citations
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/[0.10] text-[#121517] font-mono text-[11px] font-semibold shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C]" />
                  Golden eval set: 19 of 20
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/[0.10] text-[#121517] font-mono text-[11px] font-semibold shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C]" />
                  Voice in 5 Indian languages (Sarvam AI)
                </span>
              </div>

              <p className="font-inter text-[14px] sm:text-[14.5px] text-[#4A525A] leading-relaxed mt-4 max-w-xl">
                Running in real-time across this entire portfolio. Built with in-memory 512-dim cosine retrieval, 
                sub-second local search, strict refusal gating (&lt;0.68 similarity), and natural voice conversation across 
                English, हिन्दी, ಕನ್ನಡ, தமிழ், and తెలుగు.
              </p>
            </div>

            {/* Flagship Actions */}
            <div className="mt-7 pt-5 border-t border-black/[0.06] flex flex-wrap items-center gap-3">
              <GlassButton
                variant="dark"
                size="md"
                icon={<ArrowUpRight size={15} />}
                onClick={() => window.dispatchEvent(new CustomEvent("open-copilot"))}
                aria-label="Try Dīpa"
              >
                Try Dīpa
              </GlassButton>

              <GlassButton
                variant="secondary"
                size="md"
                icon={<ArrowRight size={15} />}
                onClick={() => onNavigate("/work/dipa")}
                aria-label="How it works"
              >
                How it works
              </GlassButton>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-white to-[#FAF8F5] border border-black/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="ai-orb-wrap w-8 h-8 flex items-center justify-center shrink-0" aria-hidden="true">
                    <svg viewBox="0 0 64 64" className="w-full h-full block overflow-visible">
                      <defs>
                        <linearGradient id="aiDipaVisorCard" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" stopColor="#C8F07A" />
                          <stop offset="45%" stopColor="#8FD44A" />
                          <stop offset="100%" stopColor="#3C9A48" />
                        </linearGradient>
                        <radialGradient id="aiDipaGlowCard" cx="50%" cy="40%" r="60%">
                          <stop offset="0" stopColor="#E8FBA8" stopOpacity=".9" />
                          <stop offset="100%" stopColor="#8FD44A" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id="aiDipaShellCard" x1=".3" y1="0" x2=".7" y2="1">
                          <stop offset="0" stopColor="#252A2F" />
                          <stop offset="55%" stopColor="#181B1E" />
                          <stop offset="100%" stopColor="#121517" />
                        </linearGradient>
                      </defs>
                      <g className="ai-orb">
                        <path d="M24 15 18 5" stroke="#C89B3C" strokeWidth="2.8" strokeLinecap="round" />
                        <circle cx="17.4" cy="4" r="3.4" fill="#FAF8F5" stroke="#C89B3C" strokeWidth="0.8" />
                        <path d="M40 15 46 5.5" stroke="#C89B3C" strokeWidth="2.8" strokeLinecap="round" />
                        <circle cx="46.6" cy="4.5" r="3.4" fill="#FAF8F5" stroke="#C89B3C" strokeWidth="0.8" />
                        <path
                          d="M32 8c13.3 0 23 10.2 23 24.5C55 45.3 45.3 54 32 54S9 45.3 9 32.5C9 18.2 18.7 8 32 8Z"
                          fill="url(#aiDipaShellCard)"
                          stroke="#C89B3C"
                          strokeWidth="0.8"
                          strokeOpacity="0.45"
                        />
                        <ellipse cx="32" cy="32" rx="18" ry="11" fill="url(#aiDipaVisorCard)" />
                        <ellipse cx="32" cy="31" rx="16" ry="9.5" fill="url(#aiDipaGlowCard)" />
                        <ellipse cx="32" cy="32" rx="6.4" ry="6.8" fill="#06301B" />
                        <circle cx="29.8" cy="29.8" r="1.9" fill="#EAF6EE" />
                      </g>
                    </svg>
                  </span>
                  <div>
                    <span className="font-onest text-sm font-bold text-[#121517] block leading-tight">
                      Conversational Interface
                    </span>
                    <span className="font-mono text-[10px] text-[#A8711A]">
                      Interactive Voice &amp; Text
                    </span>
                  </div>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white border border-black/[0.08] text-[#4A525A]">
                  5 Languages
                </span>
              </div>

              {/* Sample Voice Interaction Preview */}
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white border border-black/[0.06] text-left">
                  <div className="flex items-center justify-between text-[10.5px] font-mono text-[#7A828A] mb-1">
                    <span>Visitor (Voice)</span>
                    <span className="text-[#A8711A] font-semibold">ಕನ್ನಡ / Hindi / EN</span>
                  </div>
                  <p className="font-inter text-xs text-[#121517] leading-snug">
                    &ldquo;What did Deepak build at ReshaMandi?&rdquo;
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-black/[0.06] text-left space-y-1.5">
                  <div className="flex items-center justify-between text-[10.5px] font-mono text-[#7A828A]">
                    <span className="text-[#121517] font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8FD44A]" />
                      Dīpa
                    </span>
                    <span className="text-[#A8711A] font-mono">Similarity: 0.867</span>
                  </div>
                  <p className="font-inter text-xs text-[#374151] leading-relaxed">
                    Deepak engineered the instant payout and settlement engine handling ₹20–25 Cr monthly, reducing mandi settlement from 72h to &lt;10s.
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded bg-white border border-black/[0.08] font-mono text-[9.5px] text-[#A8711A] font-medium">
                      [ReshaMandi Instant Payouts Engine]
                    </span>
                    <span className="font-mono text-[9.5px] text-[#7A828A]">
                      · Spoken via bulbul:v3
                    </span>
                  </div>
                </div>
              </div>

              {/* Indian Languages Strip */}
              <div className="mt-3.5 pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-mono text-[#4A525A]">
                <span className="text-[10px] uppercase tracking-wider text-[#7A828A]">Available:</span>
                <span className="font-medium text-[#121517]">English · हिन्दी · ಕನ್ನಡ · தமிழ் · తెలుగు</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* =========================================================================
          2. IN PROGRESS SUBSECTION
          Clearly labelled subsection for exploratory builds and active prototypes.
          ========================================================================= */}
      <div className="w-full mb-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6 pb-3 border-b border-black/[0.08]">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[11px] font-bold text-[#A8711A] tracking-wider uppercase">
              SUBSECTION
            </span>
            <span aria-hidden="true" className="text-black/25">·</span>
            <h3 className="font-onest text-xl sm:text-2xl font-bold text-[#121517] tracking-tight">
              In progress
            </h3>
          </div>
          <p className="font-inter text-xs sm:text-[13px] text-[#7A828A]">
            Active prototypes and decision systems under exploration.
          </p>
        </div>

        {/* 2-Column Grid for Jagr & Product Jury */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {/* ── CARD: JAGR ─────────────────────────────────────────── */}
          <article
            className="ai-card ai-card--jagr p-6 sm:p-7 flex flex-col justify-between cursor-pointer group"
            onClick={() => setIsJagrModalOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsJagrModalOpen(true);
              }
            }}
            aria-label="Jagr: Explore how I built it"
          >
            <div>
              {/* Header row with small 'In progress' tag */}
              <div className="flex items-center justify-between gap-2.5 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-black/10 font-mono text-[10.5px] font-semibold text-[#A8711A] uppercase tracking-wider">
                  In progress
                </span>
                <span className="font-mono text-[10.5px] text-[#7A828A]">
                  Autonomous Product Context
                </span>
              </div>

              <div>
                <h4 className="font-onest text-[24px] sm:text-[26px] font-extrabold text-[#121517] tracking-tight leading-tight">
                  Jagr
                </h4>
                <p className="font-inter text-[14.5px] font-semibold text-[#121517] mt-1 leading-snug">
                  From product signals to product attention.
                </p>
              </div>

              {/* Three Short Lines: Problem, Built so far, What's next */}
              <div className="space-y-2.5 mt-4 pt-3.5 border-t border-black/[0.06] text-left">
                <div className="font-inter text-[13px] text-[#4A525A] leading-relaxed">
                  <strong className="text-[#121517] font-semibold">The problem it explores:</strong> Critical product context fractures across pull requests, telemetry alerts, and noisy channels when product managers step away.
                </div>
                <div className="font-inter text-[13px] text-[#4A525A] leading-relaxed">
                  <strong className="text-[#121517] font-semibold">What&apos;s built so far:</strong> Source-aware vertical slice on Sentry exception and release streams with normalized event ingestion, cadence coalescing (14 spikes into 1 watch), and bounded investigations.
                </div>
                <div className="font-inter text-[13px] text-[#4A525A] leading-relaxed">
                  <strong className="text-[#121517] font-semibold">What&apos;s next:</strong> Broader signal providers including GitHub pull request diffs, Linear tickets, Slack channel synthesis, and automated decision context.
                </div>
              </div>

              {/* Micro-visual bar */}
              <div className="mt-4 p-2.5 rounded-xl bg-[#FAF8F5] border border-black/[0.06] flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] font-bold text-[#121517] uppercase tracking-wider">
                  ⚡ sentry.exception &middot; BatchEscrowWorker
                </span>
                <span className="font-mono text-[9.5px] text-[#A8711A] font-semibold bg-white px-2 py-0.5 rounded border border-black/[0.08]">
                  Coalesced (14 &rarr; 1)
                </span>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="mt-5 pt-4 border-t border-black/[0.06] flex items-center justify-between gap-3">
              <GlassButton
                variant="dark"
                size="sm"
                icon={<ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsJagrModalOpen(true);
                }}
                aria-label="How I built Jagr"
              >
                How I built Jagr
              </GlassButton>
              <span className="font-mono text-[11px] text-[#7A828A]">
                View build journey &rarr;
              </span>
            </div>
          </article>

          {/* ── CARD: PRODUCT JURY ─────────────────────────────────── */}
          <article className="ai-card p-6 sm:p-7 flex flex-col justify-between">
            <div>
              {/* Header row with small 'In progress' tag */}
              <div className="flex items-center justify-between gap-2.5 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-black/10 font-mono text-[10.5px] font-semibold text-[#A8711A] uppercase tracking-wider">
                  In progress
                </span>
                <span className="font-mono text-[10.5px] text-[#7A828A]">
                  Decision Engine
                </span>
              </div>

              <div>
                <h4 className="font-onest text-[24px] sm:text-[26px] font-extrabold text-[#121517] tracking-tight leading-tight">
                  Product Jury
                </h4>
                <p className="font-inter text-[14.5px] font-semibold text-[#121517] mt-1 leading-snug">
                  A decision system for product managers.
                </p>
              </div>

              {/* Three Short Lines: Problem, Built so far, What's next */}
              <div className="space-y-2.5 mt-4 pt-3.5 border-t border-black/[0.06] text-left">
                <div className="font-inter text-[13px] text-[#4A525A] leading-relaxed">
                  <strong className="text-[#121517] font-semibold">The problem it explores:</strong> Making product calls you can defend and preserving the defense—separating empirical evidence from inference and assumption before committing roadmap resources.
                </div>
                <div className="font-inter text-[13px] text-[#4A525A] leading-relaxed">
                  <strong className="text-[#121517] font-semibold">What&apos;s built so far:</strong> Multi-agent product decision system (Evidence &rarr; Decision &rarr; Red Team &rarr; Record) with structured verdict cards, multi-perspective examination, and evidence classification.
                </div>
                <div className="font-inter text-[13px] text-[#4A525A] leading-relaxed">
                  <strong className="text-[#121517] font-semibold">What&apos;s next:</strong> Expanded rubrics for pricing and positioning calls, interactive red-teaming simulations, and shared decision audit logs.
                </div>
              </div>

              {/* Micro mechanism bar */}
              <div className="mt-4 p-2.5 rounded-xl bg-[#FAF8F5] border border-black/[0.06] font-mono text-[10.5px] font-semibold text-[#4A525A] text-center">
                Evidence &rarr; Decision &rarr; Red Team &rarr; Record
              </div>
            </div>

            {/* Bottom Action */}
            <div className="mt-5 pt-4 border-t border-black/[0.06] flex items-center justify-between">
              <GlassButton
                as="a"
                href="/writing/product-jury"
                variant="dark"
                size="sm"
                icon={<ArrowRight size={14} />}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("/writing/product-jury");
                }}
                aria-label="Explore Product Jury"
              >
                Explore Product Jury
              </GlassButton>
            </div>
          </article>
        </div>
      </div>

      {/* =========================================================================
          JAGR CASE STUDY MODAL: "How I Built Jagr"
          Complete product-thinking & build journey opened on click
          ========================================================================= */}
      {isJagrModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in"
          onClick={() => setIsJagrModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="jagr-modal-title"
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-9 shadow-2xl border border-black/[0.10] my-8 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsJagrModalOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-[#121517] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold text-[#A8711A] tracking-wider uppercase">
                FLAGSHIP BUILD
              </span>
              <span aria-hidden="true" className="text-black/25">·</span>
              <span className="font-mono text-xs text-[#7A828A]">
                Active Architecture &middot; Sentry Slice
              </span>
            </div>

            <h2 id="jagr-modal-title" className="font-onest text-3xl sm:text-4xl font-extrabold text-[#121517] tracking-tight leading-tight">
              Jagr: From Product Signals to Product Attention
            </h2>
            <p className="font-inter text-base sm:text-lg text-[#4A525A] mt-2 font-medium">
              An autonomous product-context system built to turn raw engineering chatter and exception telemetry into bounded, defensible product investigations.
            </p>

            <div className="my-6 border-t border-black/[0.08]" />

            {/* Case Study Content Sections */}
            <div className="space-y-6 text-[#121517]">
              {/* Section 1: The Problem */}
              <div>
                <h3 className="font-onest text-lg font-bold text-[#121517] flex items-center gap-2">
                  <span className="font-mono text-xs text-[#A8711A] font-semibold">01</span>
                  The PM Problem: &ldquo;What changed while I was away?&rdquo;
                </h3>
                <p className="font-inter text-sm text-[#4A525A] leading-relaxed mt-1.5">
                  When product managers step away from team channels, critical product context fractures across hundreds of messages, pull requests, and telemetry alerts. Important decisions get made in siloed threads; unexpected release drifts go unnoticed until production outages hit users.
                </p>
              </div>

              {/* Section 2: The Mechanism */}
              <div>
                <h3 className="font-onest text-lg font-bold text-[#121517] flex items-center gap-2">
                  <span className="font-mono text-xs text-[#A8711A] font-semibold">02</span>
                  The Product Mechanism: Signal &rarr; Context &rarr; Attention
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                  {[
                    { step: "01. Idea", desc: "Ambiguous PM charter" },
                    { step: "02. Signal", desc: "Sentry telemetry ingest" },
                    { step: "03. Event", desc: "Normalized state model" },
                    { step: "04. Watch", desc: "Cadence coalescing" },
                    { step: "05. Investigation", desc: "Bounded facts vs inferences" },
                    { step: "06. Attention", desc: "Human PM sign-off point" },
                  ].map((m) => (
                    <div key={m.step} className="p-2.5 rounded-xl bg-[#FAF8F5] border border-black/[0.06]">
                      <div className="font-mono text-[10px] font-bold text-[#A8711A]">{m.step}</div>
                      <div className="font-inter text-xs text-[#4A525A] leading-tight mt-0.5">{m.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Architecture & Validated Vertical Slice */}
              <div>
                <h3 className="font-onest text-lg font-bold text-[#121517] flex items-center gap-2">
                  <span className="font-mono text-xs text-[#A8711A] font-semibold">03</span>
                  Current Implementation: Sentry Vertical Slice
                </h3>
                <p className="font-inter text-sm text-[#4A525A] leading-relaxed mt-1.5">
                  Jagr is currently built around an active, source-aware vertical slice on Sentry exception and release streams. It implements durable execution, normalized event ingestion, and cadence-slot coalescing to turn 14 raw error spikes into 1 high-signal watch without alert fatigue.
                </p>
                <div className="mt-3 p-3 rounded-xl bg-[#FAF8F5] border border-black/[0.06] font-mono text-xs text-[#4A525A]">
                  SourceTarget &rarr; SourceState &rarr; Normalized Events &rarr; Watches &rarr; Bounded Investigation &rarr; Provenance Record
                </div>
              </div>

              {/* Section 4: Truthful Status */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-black/[0.06] flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#A8711A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-inter text-xs font-bold uppercase tracking-wider text-[#121517]">
                    Active Build Validation
                  </h4>
                  <p className="font-inter text-xs text-[#5A626A] leading-relaxed mt-0.5">
                    Currently validated in architecture prototyping. Broader providers (GitHub pull request diffs, Linear tickets, Slack channel synthesis) represent the planned system roadmap.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-5 border-t border-black/[0.08] flex items-center justify-between">
              <span className="font-mono text-xs text-[#7A828A]">
                Deepak Prasad &middot; Senior Product Manager
              </span>
              <button
                type="button"
                onClick={() => setIsJagrModalOpen(false)}
                className="px-5 py-2 rounded-full bg-[#121517] text-white font-inter text-xs font-semibold hover:bg-[#1E2226] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
