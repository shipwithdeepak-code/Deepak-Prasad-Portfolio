import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/**
 * Fills the existing #ai-builds-grid scaffold in HomePage.
 *
 * Two products, deliberately unequal: Product Jury is the new thing to try and
 * read about, so it takes the wide card and the looping dossier. Dipa is already
 * running in the corner of the page, so it only has to be recognised.
 *
 * The loop is CSS keyframes rather than Framer Motion because it is predetermined
 * motion on a page that also runs the Sylva footer scene, so it must stay off the
 * main thread. Styles are component-local, matching the work-deck convention.
 */

type Grade = "fact" | "inference" | "assumption" | "unknown";

const CLAIMS: { grade: Grade; label: string; text: string; conf: string }[] = [
  { grade: "fact", label: "Fact", text: "Schema mapping is demanded before any value is shown", conf: "88%" },
  { grade: "inference", label: "Inference", text: "Setup is optimised over the first-mile win", conf: "74%" },
  { grade: "assumption", label: "Assumption", text: "Primary action loses to four competing buttons", conf: "62%" },
  { grade: "unknown", label: "Unknown", text: "Dwell time before abandonment at step 3", conf: "no data" },
];

const GRADE_CLASS: Record<Grade, string> = {
  fact: "bg-[#042718] text-white border border-[#042718]",
  inference: "text-[#A8711A] border border-[#A8711A]/55 bg-[#A8711A]/10",
  assumption: "text-[#A8711A] border border-dashed border-[#A8711A]/65",
  unknown: "text-[#042718]/45 border border-dashed border-[#042718]/25",
};

const DOT_CLASS: Record<Grade, string> = {
  fact: "bg-[#D9A94C]",
  inference: "bg-[#A8711A]",
  assumption: "border-[1.5px] border-[#A8711A]",
  unknown: "border-[1.5px] border-dotted border-[#042718]/45",
};

function Grade({ grade, label }: { grade: Grade; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap ${GRADE_CLASS[grade]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${DOT_CLASS[grade]}`} />
      {label}
    </span>
  );
}

export default function AiBuilds({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <div className="ai-builds-grid-inner">
      <style>{`
        .ai-builds-grid-inner {
          display: grid;
          grid-template-columns: minmax(0, 1.72fr) minmax(0, 1fr);
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
          background: linear-gradient(180deg, #FFFFFF 0%, rgba(111, 190, 140, 0.10) 100%);
        }
        @keyframes ai-line {
          0%        { opacity: 0; transform: translateX(-10px); }
          6%, 72%   { opacity: 1; transform: none; }
          84%, 100% { opacity: 0; transform: translateX(-10px); }
        }
        @keyframes ai-verdict {
          0%        { opacity: 0; transform: translateY(9px) scale(0.97); }
          7%, 58%   { opacity: 1; transform: none; }
          70%, 100% { opacity: 0; transform: translateY(9px) scale(0.97); }
        }
        @keyframes ai-orb-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2.4px); } }
        .ai-line   { animation: ai-line 8s cubic-bezier(0.23, 1, 0.32, 1) infinite both; }
        .ai-verdict{ animation: ai-verdict 8s cubic-bezier(0.23, 1, 0.32, 1) 3.5s infinite both; }
        .ai-orb    { transform-box: fill-box; transform-origin: 50% 88%; animation: ai-orb-bob 4.4s cubic-bezier(.4,0,.5,1) infinite; }
        @media (max-width: 900px) {
          .ai-builds-grid-inner { grid-template-columns: minmax(0, 1fr); }
          .ai-card { padding: 22px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ai-line, .ai-verdict, .ai-orb {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {/* ── Product Jury ───────────────────────────────────── */}
      <article className="ai-card">
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <Grade grade="fact" label="Product Jury" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#042718]/60">
            Preview v0.1
          </span>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-[#042718]/60">
            Deliberating
          </span>
        </div>

        <h3 className="font-onest text-[22px] sm:text-[26px] font-bold text-[#042718] leading-[1.15] tracking-tight">
          A jury that grades its own certainty
        </h3>
        <p className="font-inter text-[14.5px] text-[#042718]/70 leading-relaxed mt-2.5 max-w-[46ch]">
          Hand it a product screen. Two specialists examine it in parallel, a third audits their
          claims, and a fourth returns a verdict graded by the evidence behind it.
        </p>

        <ul className="flex flex-col gap-3 list-none m-0 p-0 mt-7">
          {CLAIMS.map((c, i) => (
            <li
              key={c.label}
              className="ai-line flex items-center gap-3 flex-wrap"
              style={{ animationDelay: `${0.3 + i * 0.8}s` }}
            >
              <Grade grade={c.grade} label={c.label} />
              <span className="font-inter text-[13.5px] text-[#042718]/80 leading-snug flex-1 min-w-[150px]">
                {c.text}
              </span>
              <span className="font-mono text-[11px] text-[#042718]/45 tabular-nums shrink-0">
                {c.conf}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 pt-5 border-t border-[#042718]/10 flex items-end gap-5 flex-wrap">
          <span className="ai-verdict font-onest text-[40px] sm:text-[52px] font-bold tracking-[-0.05em] leading-[0.9] text-[#042718]">
            ITERATE
          </span>
          <p className="font-inter text-[13px] text-[#042718]/60 leading-relaxed flex-1 min-w-[190px]">
            68% confidence. The fourth line never gets a number, because the jury will not guess.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap gap-2.5">
          <a
            href="https://product-jury.ai.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 h-[47px] px-6 rounded-[100px] bg-[#042718] text-white hover:bg-[#0B3322] font-inter text-sm font-semibold transition-colors duration-200"
          >
            <span className="w-[7px] h-[7px] rounded-full bg-[#D9A94C] ring-3 ring-[#D9A94C]/25 shrink-0" />
            <span>Judge your own screen</span>
            <ArrowUpRight size={16} />
          </a>
          <a
            href="/writing/product-jury"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/writing/product-jury");
            }}
            className="inline-flex items-center gap-2.5 h-[47px] px-6 rounded-[100px] border border-[#042718]/14 text-[#042718] hover:bg-[#042718]/5 font-inter text-sm font-semibold transition-colors duration-200"
          >
            <span>Read how I built it</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </article>

      {/* ── Dipa ───────────────────────────────────────────── */}
      <article className="ai-card ai-card--dipa">
        <div className="flex items-center gap-2.5 mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#2F7A4F] border border-[#2F7A4F]/35 bg-[#6FBE8C]/12 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6FBE8C] shrink-0" />
            Live now
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

        <h3 className="font-onest text-[22px] font-bold text-[#042718] leading-[1.15] tracking-tight mt-5">
          Dīpa
        </h3>
        <p className="font-inter text-[14.5px] text-[#042718]/70 leading-relaxed mt-2.5">
          Running on this page right now. It answers questions about my work from 45 chunks of my
          own writing, cites what it used, and declines when the evidence is thin.
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {["45 chunks", "512-dim", "cosine", "confidence-gated"].map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] px-2 py-1 rounded-md border text-[rgba(4,39,24,0.56)] border-[rgba(4,39,24,0.10)]"
            >
              {t}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent("open-copilot"))}
          aria-label="Ask it something — open Dīpa"
          className="mt-auto pt-7 inline-flex items-center gap-2 font-inter text-sm font-semibold text-[#2F7A4F] hover:text-[#042718] transition-colors cursor-pointer self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8711A] focus-visible:ring-offset-2 rounded-sm"
        >
          <span className="border-b border-[#2F7A4F]/40 pb-0.5">Ask it something</span>
          <ArrowRight size={15} />
        </button>
      </article>
    </div>
  );
}
