import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Activity,
  X,
  CheckCircle2,
  ShieldCheck,
  Layers,
  Sparkles,
} from "lucide-react";
import GlassButton from "./ui/GlassButton";
import Tag from "./ui/Tag";

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

      {/* Main Grid: 8 Cols for Jagr (Primary Flagship ~67%), 4 Cols for Dīpa + Product Jury (~33%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch w-full">
        {/* =========================================================================
            1. JAGR: PRIMARY FLAGSHIP BUILD (lg:col-span-8)
            Visual-first, minimal text, strong product interface mockup
            ========================================================================= */}
        <article
          className="ai-card ai-card--jagr lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between cursor-pointer group"
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
            {/* Top Metadata Row: Status & Supporting Micro-Mechanism */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-[#A8711A] tracking-wider uppercase">
                  FLAGSHIP BUILD
                </span>
                <span aria-hidden="true" className="text-black/25">·</span>
                <span className="font-mono text-[11px] text-[#4A525A] flex items-center gap-1.5">
                  <Activity size={12} className="text-[#C89B3C]" />
                  Active build &middot; Sentry vertical slice
                </span>
              </div>
              <span className="font-mono text-[10.5px] uppercase tracking-wider text-[#7A828A] hidden sm:inline-block">
                Signal &rarr; Context &rarr; Attention
              </span>
            </div>

            {/* Product Title & Concise Statement */}
            <div>
              <h3 className="font-onest text-[32px] sm:text-[40px] md:text-[44px] font-extrabold text-[#121517] tracking-tight leading-none">
                Jagr
              </h3>
              <p className="font-inter text-[18px] sm:text-[21px] font-semibold text-[#121517] mt-2 leading-snug">
                From product signals to product attention.
              </p>
              <p className="font-inter text-[14.5px] sm:text-[15px] text-[#4A525A] leading-relaxed mt-2.5 max-w-2xl font-normal">
                I&apos;m building an autonomous product-context system that detects meaningful
                change, preserves evidence, and helps turn noisy signals into focused product
                investigations.
              </p>
            </div>

            {/* PRODUCT VISUAL: Authentic Sentry Vertical Slice Interface */}
            <div className="relative mt-5 rounded-2xl border border-black/[0.08] bg-white/95 shadow-[0_10px_28px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300 group-hover:border-black/[0.14] group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)]">
              {/* Window Frame Bar */}
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#FAF8F5] border-b border-black/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E57373]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFB74D]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#81C784]/80" />
                  </div>
                  <span className="ml-1.5 font-mono text-[11px] text-[#4A525A] font-medium tracking-tight">
                    jagr &middot; investigation #inv-0842
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white border border-black/[0.08] text-[#121517] font-mono text-[9.5px] font-semibold tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C] animate-pulse" />
                    Coalesced (14 &rarr; 1)
                  </span>
                </div>
              </div>

              {/* Interface Workspace */}
              <div className="p-4 sm:p-5 bg-gradient-to-b from-white to-[#FAF8F5]/60 space-y-3">
                {/* Signal Ingestion & Coalescing Trigger */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl bg-[#FAF8F5] border border-black/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-black/[0.03] border border-black/[0.06] flex items-center justify-center text-[#A8711A] shrink-0 font-mono font-bold text-xs">
                      ⚡
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-[#121517] uppercase tracking-wider">
                          sentry.exception &middot; BatchEscrowWorker
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-white border border-black/[0.08] font-mono text-[9.5px] text-[#4A525A]">
                          v2.4.1
                        </span>
                      </div>
                      <p className="font-inter text-[11.5px] text-[#5A626A] leading-tight mt-0.5">
                        14 exception spikes grouped under Watch #W-0842
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-[#A8711A] font-semibold self-start sm:self-auto bg-white px-2 py-0.5 rounded border border-black/[0.08]">
                    P99 Latency +320ms
                  </span>
                </div>

                {/* Bounded Investigation Card */}
                <div className="p-3.5 rounded-xl bg-white border border-black/[0.08] shadow-2xs space-y-2.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 pb-2 border-b border-black/[0.05]">
                    <div>
                      <span className="font-mono text-[9.5px] font-bold uppercase tracking-widest text-[#A8711A]">
                        Bounded Investigation
                      </span>
                      <h4 className="font-inter text-[14px] sm:text-[15px] font-bold text-[#121517] leading-snug">
                        DB Connection Pool Starvation during Settlement Run
                      </h4>
                    </div>
                    <span className="font-mono text-[10px] text-[#7A828A]">
                      Provenance: Validated
                    </span>
                  </div>

                  {/* Evidence Split: Observed vs Inferred */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                    <div className="p-2 rounded-lg bg-[#FAF8F5] border border-black/[0.05]">
                      <span className="font-mono text-[9px] uppercase font-bold text-[#1E6B3E] block mb-0.5">
                        ✓ Observed Evidence
                      </span>
                      <p className="font-inter text-[11.5px] text-[#374151] leading-snug">
                        Worker pool saturated at 100% capacity; escrow settlement loop blocked awaiting connection acquisition.
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-[#FAF8F5] border border-black/[0.05]">
                      <span className="font-mono text-[9px] uppercase font-bold text-[#A8711A] block mb-0.5">
                        ✦ Inferred Root Cause
                      </span>
                      <p className="font-inter text-[11.5px] text-[#374151] leading-snug">
                        Release v2.4.1 omitted connection keep-alive timeout under concurrent batch disbursement load.
                      </p>
                    </div>
                  </div>

                  {/* Required PM Attention Callout */}
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C89B3C] shrink-0" />
                      <span className="font-inter text-[11.5px] font-medium text-[#121517]">
                        <strong>Required PM Attention:</strong> Decision on pool scaling (10 &rarr; 32) vs async worker decoupling.
                      </span>
                    </div>
                    <span className="font-mono text-[10px] font-semibold text-[#A8711A] shrink-0 bg-white px-2 py-0.5 rounded border border-black/[0.08]">
                      Awaiting Sign-off &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Strip */}
          <div className="mt-5 pt-4 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3">
            <GlassButton
              variant="dark"
              size="md"
              icon={<ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />}
              onClick={(e) => {
                e.stopPropagation();
                setIsJagrModalOpen(true);
              }}
              aria-label="How I built Jagr"
            >
              How I built Jagr &rarr;
            </GlassButton>
            <span className="font-mono text-[11px] text-[#7A828A] flex items-center gap-1.5">
              Click to view build journey &rarr;
            </span>
          </div>
        </article>

        {/* =========================================================================
            2 & 3. SECONDARY PRODUCTS STACK (lg:col-span-4)
            Compact, lightweight, distinct products
            ========================================================================= */}
        <div className="lg:col-span-4 flex flex-col gap-5 justify-between">
          {/* ── CARD 2: DĪPA (AI PORTFOLIO ASSISTANT) ───────────────────────── */}
          <article className="ai-card ai-card--dipa p-6 sm:p-7 flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center justify-between gap-2.5 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#188E39] animate-pulse shrink-0" />
                  <span className="font-mono text-[11px] font-bold text-[#188E39] uppercase tracking-wider">
                    LIVE BUILD
                  </span>
                </div>
                <span className="font-mono text-[10.5px] text-[#7A828A]">32 verified chunks</span>
              </div>

              <div className="flex items-center gap-3.5 mb-3.5">
                <span className="ai-orb-wrap w-12 h-12 flex items-center justify-center shrink-0" aria-hidden="true">
                  <svg viewBox="0 0 64 64" className="w-full h-full block overflow-visible">
                    <defs>
                      <linearGradient id="aiDipaVisor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#C8F07A" />
                        <stop offset="45%" stopColor="#8FD44A" />
                        <stop offset="100%" stopColor="#3C9A48" />
                      </linearGradient>
                      <radialGradient id="aiDipaGlow" cx="50%" cy="40%" r="60%">
                        <stop offset="0" stopColor="#E8FBA8" stopOpacity=".9" />
                        <stop offset="100%" stopColor="#8FD44A" stopOpacity="0" />
                      </radialGradient>
                      <linearGradient id="aiDipaShell" x1=".3" y1="0" x2=".7" y2="1">
                        <stop offset="0" stopColor="#11482C" />
                        <stop offset="55%" stopColor="#08301E" />
                        <stop offset="100%" stopColor="#042718" />
                      </linearGradient>
                    </defs>
                    <g className="ai-orb">
                      <path d="M24 15 18 5" stroke="#9FD9B4" strokeWidth="2.8" strokeLinecap="round" />
                      <circle cx="17.4" cy="4" r="3.4" fill="#C9EBD6" />
                      <path d="M40 15 46 5.5" stroke="#9FD9B4" strokeWidth="2.8" strokeLinecap="round" />
                      <circle cx="46.6" cy="4.5" r="3.4" fill="#C9EBD6" />
                      <path
                        d="M32 8c13.3 0 23 10.2 23 24.5C55 45.3 45.3 54 32 54S9 45.3 9 32.5C9 18.2 18.7 8 32 8Z"
                        fill="url(#aiDipaShell)"
                      />
                      <ellipse cx="32" cy="32" rx="18" ry="11" fill="url(#aiDipaVisor)" />
                      <ellipse cx="32" cy="31" rx="16" ry="9.5" fill="url(#aiDipaGlow)" />
                      <ellipse cx="32" cy="32" rx="6.4" ry="6.8" fill="#06301B" />
                      <circle cx="29.8" cy="29.8" r="1.9" fill="#EAF6EE" />
                    </g>
                  </svg>
                </span>
                <div>
                  <h3 className="font-onest text-[22px] sm:text-[24px] font-bold text-[#121517] leading-tight tracking-tight">
                    Dīpa
                  </h3>
                  <p className="font-inter text-[12.5px] font-semibold text-[#A8711A]">
                    AI Portfolio Assistant
                  </p>
                </div>
              </div>

              <p className="font-inter text-[14px] font-medium text-[#121517] leading-snug">
                Grounded in my verified product work.
              </p>
              <p className="font-inter text-[12.5px] text-[#4A525A] leading-relaxed mt-2">
                Running right now on this page. Answers questions about my work from 32 curated
                chunks, cites evidence, and declines when confidence is thin.
              </p>
            </div>

            {/* Dīpa Action Buttons */}
            <div className="mt-5 pt-4 border-t border-black/[0.06] flex items-center justify-between gap-3">
              <GlassButton
                variant="dark"
                size="sm"
                icon={<ArrowUpRight size={14} />}
                onClick={() => window.dispatchEvent(new CustomEvent("open-copilot"))}
                aria-label="Open Dīpa copilot"
              >
                Open Dīpa &rarr;
              </GlassButton>
              <a
                href="/work/dipa"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("/work/dipa");
                }}
                className="font-mono text-[11px] text-[#5A626A] hover:text-[#121517] transition-colors"
              >
                How I built this &rarr;
              </a>
            </div>
          </article>

          {/* ── CARD 3: PRODUCT JURY (DECISION SYSTEM) ────────── */}
          <article className="ai-card p-6 sm:p-7 flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center justify-between gap-2.5 mb-4">
                <span className="font-mono text-[11px] font-bold text-[#A8711A] tracking-wider uppercase">
                  ACTIVE BUILD
                </span>
                <span className="font-mono text-[10.5px] text-[#7A828A] font-medium">Decision Engine</span>
              </div>

              <div>
                <h3 className="font-onest text-[22px] sm:text-[24px] font-bold text-[#121517] leading-tight tracking-tight">
                  Product Jury
                </h3>
                <p className="font-inter text-[12.5px] font-semibold text-[#A8711A] mt-0.5">
                  A decision system for product managers.
                </p>
                <blockquote className="my-3 pl-3 border-l-2 border-[#C89B3C] font-playfair italic text-[14px] text-[#121517] leading-snug">
                  &ldquo;Make a product call you can defend &mdash; and keep the defence.&rdquo;
                </blockquote>
              </div>

              {/* Compact mechanism */}
              <div className="mt-3.5 p-2 rounded-lg bg-[#FAF8F5] border border-black/[0.06] font-mono text-[10.5px] font-semibold text-[#4A525A] text-center">
                Evidence &rarr; Decision &rarr; Red Team &rarr; Record
              </div>
            </div>

            {/* Product Jury Action Button */}
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
                Explore Product Jury &rarr;
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
                <CheckCircle2 size={18} className="text-[#188E39] shrink-0 mt-0.5" />
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
