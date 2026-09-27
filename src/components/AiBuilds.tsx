import React, { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  GitPullRequest,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  Activity,
  Terminal,
} from "lucide-react";
import GlassButton from "./ui/GlassButton";
import Tag from "./ui/Tag";

/**
 * AI Systems I Built — Homepage Section Grid
 *
 * Visual Hierarchy:
 * 1. Jagr: Primary Flagship Build (~65-70% visual emphasis)
 *    - Autonomous context reconstruction engine for product managers
 *    - Solves "knowing what changed while I was away"
 *    - Live interactive morning delta briefing simulator
 * 2. Dīpa: Secondary Live Build (~15-18% emphasis)
 *    - Live portfolio assistant grounded in 32 verified chunks
 * 3. Product Jury: Secondary Build (~15-18% emphasis)
 *    - Decision system turning PM calls into defensible decision records
 */

interface DeltaItem {
  id: string;
  type: "decision" | "drift" | "action";
  badge: string;
  badgeVariant: "live" | "amber" | "accent";
  title: string;
  detail: string;
  source: string;
  time: string;
}

const SAMPLE_DELTA_ITEMS: DeltaItem[] = [
  {
    id: "delta-1",
    type: "decision",
    badge: "DECISION RECORD",
    badgeVariant: "live",
    title: "DB Connection Pooling migrated to async worker queue (PR #312)",
    detail:
      "Checkout P99 latency dropped 320ms. Escrow retry logic isolated from the synchronous payment gateway loop.",
    source: "GitHub #312 · Slack #eng-core",
    time: "09:14 AM",
  },
  {
    id: "delta-2",
    type: "drift",
    badge: "SCOPE DRIFT ALERT",
    badgeVariant: "amber",
    title: "Unplanned tiered pricing added to merchant onboarding",
    detail:
      "A 3-step pricing variation was added in branch feature/merchant-tiers. Flagged for PM sign-off before sprint freeze.",
    source: "Figma Review · Linear #ENG-884",
    time: "11:30 AM",
  },
  {
    id: "delta-3",
    type: "action",
    badge: "PM INPUT REQUIRED",
    badgeVariant: "accent",
    title: "Escrow settlement buffer: 24h hold vs instant payout trade-off",
    detail:
      "Awaiting PM sign-off on risk buffer threshold before merchant batch settlement runs at 6:00 PM.",
    source: "Linear #FIN-104 · Jira RISK-89",
    time: "02:45 PM",
  },
];

export default function AiBuilds({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [activeTab, setActiveTab] = useState<"stream" | "architecture">("stream");

  return (
    <div className="ai-builds-container w-full">
      <style>{`
        .ai-card {
          border-radius: 28px;
          border: 1px solid rgba(4, 39, 24, 0.10);
          background: #FFFFFF;
          box-shadow: 0 24px 64px rgba(4, 39, 24, 0.08);
          display: flex;
          flex-direction: column;
          position: relative;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .ai-card:hover {
          border-color: rgba(4, 39, 24, 0.18);
        }
        .ai-card--jagr {
          background: linear-gradient(175deg, #FFFFFF 0%, #F8FAF8 50%, rgba(111, 190, 140, 0.07) 100%);
        }
        .ai-card--dipa {
          background: linear-gradient(180deg, #FFFFFF 0%, rgba(111, 190, 140, 0.08) 100%);
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
            1. JAGR: PRIMARY FEATURED PRODUCT (lg:col-span-8)
            ========================================================================= */}
        <article className="ai-card ai-card--jagr lg:col-span-8 p-6 sm:p-8 md:p-9 flex flex-col justify-between">
          <div>
            {/* Top Eyebrow Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2">
                <Tag
                  variant="live"
                  icon={<span className="w-2 h-2 rounded-full bg-[#2F7A4F] animate-pulse shrink-0" />}
                >
                  LIVE BUILD
                </Tag>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#042718]/60 bg-[#042718]/5 px-2.5 py-1 rounded-full border border-[#042718]/8">
                  Flagship AI System
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#042718]/50 flex items-center gap-1.5">
                <Clock size={12} className="text-[#188E39]" />
                Continuous Ingestion
              </span>
            </div>

            {/* Product Title & Tagline */}
            <div>
              <div className="flex items-baseline gap-3">
                <h3 className="font-onest text-[32px] sm:text-[40px] md:text-[44px] font-extrabold text-[#042718] tracking-tight leading-none">
                  Jagr
                </h3>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#188E39] font-bold">
                  v1.2 · Live
                </span>
              </div>
              <p className="font-inter text-[17px] sm:text-[19px] font-semibold text-[#042718] mt-2 leading-snug">
                Knowing what changed while you were away.
              </p>
            </div>

            {/* Core Narrative */}
            <p className="font-inter text-[14.5px] sm:text-[15px] text-[#042718]/75 leading-relaxed mt-3.5 max-w-3xl">
              An autonomous context reconstruction engine for product managers. When you step away from
              Slack, GitHub, and Jira, critical context fractures across hundreds of messages, pull
              requests, and design reviews. Jagr ingests the firehose of engineering signals, filters
              the chatter, and synthesizes a high-fidelity delta briefing: key decisions made,
              architectural trade-offs, scope deviations, and action items waiting on product input.
            </p>

            {/* Interactive Showcase / Architecture Tabs */}
            <div className="mt-6 bg-[#042718]/[0.03] border border-[#042718]/10 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between border-b border-[#042718]/8 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#188E39] shrink-0" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#042718]/70">
                    Morning Delta Briefing · Live Sample
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-white/80 p-0.5 rounded-lg border border-[#042718]/8">
                  <button
                    type="button"
                    onClick={() => setActiveTab("stream")}
                    className={`font-mono text-[10.5px] font-semibold px-2.5 py-1 rounded-md transition-all ${
                      activeTab === "stream"
                        ? "bg-[#042718] text-white shadow-sm"
                        : "text-[#042718]/70 hover:text-[#042718]"
                    }`}
                  >
                    Delta Feed
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("architecture")}
                    className={`font-mono text-[10.5px] font-semibold px-2.5 py-1 rounded-md transition-all ${
                      activeTab === "architecture"
                        ? "bg-[#042718] text-white shadow-sm"
                        : "text-[#042718]/70 hover:text-[#042718]"
                    }`}
                  >
                    Pipeline
                  </button>
                </div>
              </div>

              {activeTab === "stream" ? (
                <div className="space-y-2.5">
                  {SAMPLE_DELTA_ITEMS.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl p-3 sm:p-3.5 border border-[#042718]/8 shadow-sm flex flex-col gap-1.5 transition-all hover:border-[#188E39]/30"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <Tag
                          variant={item.badgeVariant}
                          className="font-mono text-[9.5px] py-0.5 px-2 tracking-wider uppercase font-bold"
                        >
                          {item.badge}
                        </Tag>
                        <span className="font-mono text-[10.5px] text-[#042718]/45">
                          {item.time}
                        </span>
                      </div>
                      <h4 className="font-inter text-[13.5px] font-semibold text-[#042718] leading-snug">
                        {item.title}
                      </h4>
                      <p className="font-inter text-[12.5px] text-[#042718]/70 leading-relaxed">
                        {item.detail}
                      </p>
                      <div className="font-mono text-[10.5px] text-[#042718]/50 flex items-center gap-1.5 pt-0.5">
                        <Activity size={11} className="text-[#188E39]" />
                        <span>Source: {item.source}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3.5 py-1">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left">
                    <div className="bg-white p-3 rounded-xl border border-[#042718]/8">
                      <div className="flex items-center gap-1.5 text-[#188E39] mb-1 font-mono text-[10.5px] font-bold uppercase tracking-wider">
                        <Layers size={13} />
                        <span>1. Ingestion</span>
                      </div>
                      <p className="font-inter text-[12px] text-[#042718]/70 leading-snug">
                        Hooks into GitHub PR diffs, Slack release channels, Jira ticket states, and Figma review threads.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-[#042718]/8">
                      <div className="flex items-center gap-1.5 text-[#A8711A] mb-1 font-mono text-[10.5px] font-bold uppercase tracking-wider">
                        <Sparkles size={13} />
                        <span>2. De-noising</span>
                      </div>
                      <p className="font-inter text-[12px] text-[#042718]/70 leading-snug">
                        Strips out social banter, routine linter commits, and trivial chore tickets using semantic filtering.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-[#042718]/8">
                      <div className="flex items-center gap-1.5 text-[#2F7A4F] mb-1 font-mono text-[10.5px] font-bold uppercase tracking-wider">
                        <CheckCircle2 size={13} />
                        <span>3. Delta Synthesis</span>
                      </div>
                      <p className="font-inter text-[12px] text-[#042718]/70 leading-snug">
                        Correlates decisions to user-facing impact, generates scope-drift alerts, and compiles PM action queues.
                      </p>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#042718]/8 font-mono text-[11px] text-[#042718]/80 text-center font-semibold">
                    Multi-Source Ingest → De-noising → Semantic Delta → Impact Attribution → Action Queue
                  </div>
                </div>
              )}
            </div>

            {/* Spec Badges */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {[
                "Git & PR Ingest",
                "Slack De-noising",
                "Scope Drift Detection",
                "Impact Scoring",
                "Action Queue",
              ].map((t) => (
                <Tag key={t} variant="outline" className="font-mono text-[10px] py-0.5 px-2">
                  {t}
                </Tag>
              ))}
            </div>
          </div>

          {/* Bottom Action Strip */}
          <div className="mt-7 pt-6 border-t border-[#042718]/8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <GlassButton
                variant="primary"
                size="md"
                icon={<ArrowRight size={15} />}
                onClick={() => {
                  const el = document.getElementById("ai-builds");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  setActiveTab((prev) => (prev === "stream" ? "architecture" : "stream"));
                }}
                aria-label="Toggle Jagr system details"
              >
                {activeTab === "stream" ? "View Pipeline Architecture" : "View Live Delta Feed"}
              </GlassButton>
            </div>
            <span className="font-mono text-[11px] text-[#042718]/55 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#188E39]" />
              Production Ready · Standalone PM Engine
            </span>
          </div>
        </article>

        {/* =========================================================================
            2 & 3. SECONDARY PRODUCTS STACK (lg:col-span-4)
            ========================================================================= */}
        <div className="lg:col-span-4 flex flex-col gap-5 justify-between">
          {/* ── CARD 2: DĪPA (LIVE BUILD) ───────────────────────── */}
          <article className="ai-card ai-card--dipa p-6 sm:p-7 flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center justify-between gap-2.5 mb-4">
                <Tag
                  variant="live"
                  icon={<span className="w-1.5 h-1.5 rounded-full bg-[#6FBE8C] shrink-0" />}
                >
                  LIVE BUILD
                </Tag>
                <span className="font-mono text-[10.5px] text-[#042718]/50">32 chunks</span>
              </div>

              <div className="flex items-center gap-3.5 mb-3">
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
                  <h3 className="font-onest text-[22px] sm:text-[24px] font-bold text-[#042718] leading-tight tracking-tight">
                    Dīpa
                  </h3>
                  <p className="font-inter text-[12.5px] font-semibold text-[#188E39]">
                    AI Portfolio Assistant
                  </p>
                </div>
              </div>

              <p className="font-inter text-[13.5px] font-medium text-[#042718]/85 leading-snug">
                Grounded in my verified product work.
              </p>
              <p className="font-inter text-[13px] text-[#042718]/70 leading-relaxed mt-2">
                Running right now on this page. Answers questions about my work from 32 curated
                chunks, cites evidence, and declines when confidence is thin.
              </p>

              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {["512-dim", "cosine", "confidence-gated"].map((t) => (
                  <Tag key={t} variant="outline" className="font-mono text-[9.5px] py-0.5 px-2">
                    {t}
                  </Tag>
                ))}
              </div>
            </div>

            {/* Dīpa Action Buttons */}
            <div className="mt-5 pt-4 border-t border-[#042718]/8 flex flex-wrap items-center gap-2.5">
              <GlassButton
                variant="primary"
                size="sm"
                icon={<ArrowUpRight size={14} />}
                onClick={() => window.dispatchEvent(new CustomEvent("open-copilot"))}
                aria-label="Open Dīpa copilot"
              >
                Open Dīpa
              </GlassButton>
              <GlassButton
                as="a"
                href="/work/dipa"
                variant="secondary"
                size="sm"
                icon={<ArrowRight size={14} />}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("/work/dipa");
                }}
              >
                How I built this
              </GlassButton>
            </div>
          </article>

          {/* ── CARD 3: PRODUCT JURY (PRODUCT IN BUILD) ────────── */}
          <article className="ai-card p-6 sm:p-7 flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center justify-between gap-2.5 mb-4">
                <Tag
                  variant="amber"
                  icon={<span className="w-1.5 h-1.5 rounded-full bg-[#A8711A] shrink-0" />}
                >
                  PRODUCT IN BUILD
                </Tag>
                <span className="font-mono text-[10.5px] text-[#A8711A] font-semibold">Decision Engine</span>
              </div>

              <div>
                <h3 className="font-onest text-[22px] sm:text-[24px] font-bold text-[#042718] leading-tight tracking-tight">
                  Product Jury
                </h3>
                <p className="font-inter text-[12.5px] font-semibold text-[#A8711A] mt-0.5">
                  A decision system for product managers
                </p>
                <blockquote className="my-2.5 pl-3 border-l-2 border-[#D9A94C] font-playfair italic text-[14px] text-[#042718] leading-snug">
                  &ldquo;Make a product call you can defend — and keep the defence.&rdquo;
                </blockquote>
              </div>

              <p className="font-inter text-[13px] text-[#042718]/70 leading-relaxed mt-2">
                Decisions vanish after meetings. Product Jury turns PM judgements into permanent,
                defensible decision records with red-team dissent.
              </p>

              <div className="mt-3 p-2 rounded-lg bg-[#FAF8F5] border border-[#042718]/8 font-mono text-[10.5px] font-semibold text-[#042718]/85 text-center">
                Artifact → Jury → Decision → Red Team → Record
              </div>
            </div>

            {/* Product Jury Action Button */}
            <div className="mt-5 pt-4 border-t border-[#042718]/8 flex flex-wrap items-center">
              <GlassButton
                as="a"
                href="/writing/product-jury"
                variant="primary"
                size="sm"
                icon={<ArrowRight size={14} />}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("/writing/product-jury");
                }}
              >
                Check what I&apos;m building
              </GlassButton>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
