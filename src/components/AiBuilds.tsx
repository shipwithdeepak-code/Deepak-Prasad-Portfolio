import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/**
 * Fills the existing #ai-builds-grid scaffold in HomePage.
 *
 * Two distinct AI stories:
 * 1. Dīpa: LIVE BUILD — An AI-native portfolio assistant grounded in verified product work.
 * 2. Product Jury: PRODUCT IN BUILD — A decision system for product managers in active research & development.
 */

const EXPLORING_POINTS = [
  "Evidence quality and unknowns",
  "Structured product judgement",
  "Multi-perspective challenge",
  "Red-team dissent",
  "Decision records",
  "Re-judging when new evidence appears",
];

export default function AiBuilds({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <div className="ai-builds-grid-inner">
      <style>{`
        .ai-builds-grid-inner {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
          gap: 16px;
          align-items: stretch;
        }
        .ai-card {
          border-radius: 30px;
          border: 1px solid rgba(4, 39, 24, 0.10);
          background: #FFFFFF;
          box-shadow: 0 24px 64px rgba(4, 39, 24, 0.10);
          padding: 28px;
          display: flex;
          flex-direction: column;
        }
        .ai-card--dipa {
          background: linear-gradient(180deg, #FFFFFF 0%, rgba(111, 190, 140, 0.08) 100%);
        }
        @keyframes ai-orb-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2.4px); } }
        .ai-orb    { transform-box: fill-box; transform-origin: 50% 88%; animation: ai-orb-bob 4.4s cubic-bezier(.4,0,.5,1) infinite; }
        @media (max-width: 900px) {
          .ai-builds-grid-inner { grid-template-columns: minmax(0, 1fr); }
          .ai-card { padding: 22px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ai-orb {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {/* ── CARD 1: DĪPA (LIVE BUILD) ───────────────────────── */}
      <article className="ai-card ai-card--dipa">
        <div className="flex items-center gap-2.5 mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#2F7A4F] border border-[#2F7A4F]/35 bg-[#6FBE8C]/12 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6FBE8C] shrink-0" />
            LIVE BUILD
          </span>
        </div>

        <span className="ai-orb-wrap w-16 h-16 flex items-center justify-center shrink-0" aria-hidden="true">
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
              <path d="M32 8c13.3 0 23 10.2 23 24.5C55 45.3 45.3 54 32 54S9 45.3 9 32.5C9 18.2 18.7 8 32 8Z" fill="url(#aiDipaShell)" />
              <ellipse cx="32" cy="32" rx="18" ry="11" fill="url(#aiDipaVisor)" />
              <ellipse cx="32" cy="31" rx="16" ry="9.5" fill="url(#aiDipaGlow)" />
              <ellipse cx="32" cy="32" rx="6.4" ry="6.8" fill="#06301B" />
              <circle cx="29.8" cy="29.8" r="1.9" fill="#EAF6EE" />
            </g>
          </svg>
        </span>

        <h3 className="font-onest text-[22px] sm:text-[24px] font-bold text-[#042718] leading-[1.15] tracking-tight mt-5">
          Dīpa
        </h3>
        <p className="font-inter text-[14.5px] font-medium text-[#042718]/85 mt-1 leading-snug">
          An AI-native portfolio assistant grounded in my verified product work.
        </p>
        <p className="font-inter text-[14px] text-[#042718]/70 leading-relaxed mt-2.5">
          Running on this page right now. It answers questions about my work from 32 curated chunks
          of verified writing, cites what it used, and declines when the evidence is thin.
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {["32 chunks", "512-dim", "cosine", "confidence-gated"].map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] px-2 py-1 rounded-md border text-[rgba(4,39,24,0.56)] border-[rgba(4,39,24,0.10)]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTAs: Primary = Open Dīpa ↗, Secondary = How I built this → */}
        <div className="mt-auto pt-7 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-copilot"))}
            aria-label="Open Dīpa copilot"
            className="inline-flex items-center gap-2 h-[45px] px-5 rounded-[100px] bg-[#042718] text-white hover:bg-[#0B3322] font-inter text-sm font-semibold transition-colors duration-200 cursor-pointer shadow-xs"
          >
            <span>Open Dīpa</span>
            <ArrowUpRight size={15} />
          </button>
          <a
            href="/work/dipa"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/work/dipa");
            }}
            className="inline-flex items-center gap-2 h-[45px] px-5 rounded-[100px] border border-[#042718]/15 text-[#042718] hover:bg-[#042718]/5 font-inter text-sm font-semibold transition-colors duration-200"
          >
            <span>How I built this</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </article>

      {/* ── CARD 2: PRODUCT JURY (PRODUCT IN BUILD) ────────── */}
      <article className="ai-card">
        <div className="flex items-center gap-2.5 mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#A8711A] border border-[#A8711A]/40 bg-[#A8711A]/10 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8711A] shrink-0" />
            PRODUCT IN BUILD
          </span>
        </div>

        <div>
          <h3 className="font-onest text-[22px] sm:text-[26px] font-bold text-[#042718] leading-[1.15] tracking-tight">
            Product Jury
          </h3>
          <p className="font-inter text-[14.5px] font-medium text-[#042718]/85 mt-1 leading-snug">
            A decision system for product managers.
          </p>
          <blockquote className="my-3 pl-3.5 border-l-2 border-[#D9A94C] font-playfair italic text-[15px] sm:text-[16px] text-[#042718] leading-[1.35]">
            &ldquo;Make a product call you can defend — and keep the defence.&rdquo;
          </blockquote>
        </div>

        <p className="font-inter text-[13.5px] text-[#042718]/75 leading-relaxed mt-1">
          Product Jury is an early-stage product I’m researching and building around a simple
          problem: product decisions often disappear after the meeting. The reasoning, evidence,
          assumptions, objections and trade-offs are rarely preserved as a decision record.
        </p>
        <p className="font-inter text-[13.5px] text-[#042718]/75 leading-relaxed mt-2.5">
          Instead of giving PMs another AI opinion, Product Jury is being designed to turn a product
          judgement into a defensible decision record.
        </p>

        {/* Concise Product Loop */}
        <div className="mt-5 p-3 rounded-xl bg-[#FAF8F5] border border-[#042718]/8">
          <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#A8711A] block mb-1">
            Product Loop
          </span>
          <div className="font-inter text-xs font-semibold text-[#042718]/90 leading-snug">
            Artifact → Evidence → Jury → Decision → Red Team → Record → Revisit
          </div>
        </div>

        {/* What I'm exploring */}
        <div className="mt-5">
          <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#042718]/50 block mb-2">
            What I&apos;m exploring
          </span>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5 list-none m-0 p-0 font-inter text-xs text-[#042718]/75">
            {EXPLORING_POINTS.map((pt) => (
              <li key={pt} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#A8711A] shrink-0" />
                <span className="truncate">{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Single Primary CTA: Check what I'm building → */}
        <div className="mt-auto pt-7 flex flex-wrap items-center">
          <a
            href="/writing/product-jury"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/writing/product-jury");
            }}
            className="inline-flex items-center gap-2.5 h-[45px] px-6 rounded-[100px] bg-[#042718] text-white hover:bg-[#0B3322] font-inter text-sm font-semibold transition-colors duration-200 shadow-xs"
          >
            <span>Check what I&apos;m building</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </article>
    </div>
  );
}

