import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * Dīpa — the launcher character.
 *
 * Replaces ShaderOrb + ShaderCanvas, which together pulled 2.44 MB (698 KB
 * gzipped) of WebGPU runtime to render a 52px button. This is one inline SVG.
 *
 * Form: a single lens eye rather than two. At 48px one ~10px pupil holds its
 * read where two ~6.5px pupils merge into a smear, and a lens reads as an
 * instrument, which is what this assistant is — it retrieves, cites, and
 * declines when the evidence is thin.
 *
 * Idle behaviour: four independent cycles at 4.4s (bob), 5.4s (blink), 6.2s
 * (antennae) and 7.4s (glance). They share no common multiple inside a minute,
 * so the character never visibly repeats. The glance is load-bearing: an eye
 * that never moves reads as surveillance; an eye that looks around reads as
 * curious.
 *
 * Discoverability: on a first visit it appears as a labelled pill, which
 * collapses after the first interaction or after 8 seconds and never returns.
 *
 * All motion is transform-only, paused off-screen and on hidden tabs, and
 * stilled entirely under prefers-reduced-motion.
 */

const SEEN_KEY = "dipa-launcher-seen";

interface DipaLauncherProps {
  onClick: () => void;
  isOpen: boolean;
  className?: string;
}

function DipaCharacter() {
  return (
    <svg viewBox="0 0 64 64" className="dipa-c__svg" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="dipaVisor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C8F07A" />
          <stop offset="45%" stopColor="#8FD44A" />
          <stop offset="100%" stopColor="#3C9A48" />
        </linearGradient>
        <radialGradient id="dipaVisorGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0" stopColor="#E8FBA8" stopOpacity=".9" />
          <stop offset="100%" stopColor="#8FD44A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dipaShell" x1=".3" y1="0" x2=".7" y2="1">
          <stop offset="0" stopColor="#11482C" />
          <stop offset="55%" stopColor="#08301E" />
          <stop offset="100%" stopColor="#042718" />
        </linearGradient>
      </defs>

      <g className="dipa-c__body">
        <g className="dipa-c__antL">
          <path d="M24 15 18 5" stroke="#9FD9B4" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="17.4" cy="4" r="3.4" fill="#C9EBD6" />
        </g>
        <g className="dipa-c__antR">
          <path d="M40 15 46 5.5" stroke="#9FD9B4" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="46.6" cy="4.5" r="3.4" fill="#C9EBD6" />
        </g>

        <path
          d="M32 8c13.3 0 23 10.2 23 24.5C55 45.3 45.3 54 32 54S9 45.3 9 32.5C9 18.2 18.7 8 32 8Z"
          fill="url(#dipaShell)"
        />

        <ellipse cx="32" cy="32" rx="18" ry="11" fill="url(#dipaVisor)" />
        <ellipse cx="32" cy="31" rx="16" ry="9.5" fill="url(#dipaVisorGlow)" />

        <g className="dipa-c__glance">
          <ellipse cx="32" cy="32" rx="6.4" ry="6.8" fill="#06301B" />
          <circle cx="29.8" cy="29.8" r="1.9" fill="#EAF6EE" />
        </g>

        <ellipse className="dipa-c__lid" cx="32" cy="32" rx="18.5" ry="11.5" fill="#08301E" />
      </g>
    </svg>
  );
}

export default function DipaLauncher({ onClick, isOpen, className = "" }: DipaLauncherProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [showLabel, setShowLabel] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let seen = true;
    try {
      seen = window.localStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // Private mode or blocked storage: treat as seen so we never nag.
    }
    if (!seen) setShowLabel(true);
  }, []);

  const dismissLabel = useCallback(() => {
    setShowLabel(false);
    try {
      window.localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* storage unavailable — the label simply returns next visit */
    }
  }, []);

  useEffect(() => {
    if (!showLabel) return;
    const t = window.setTimeout(dismissLabel, 8000);
    return () => window.clearTimeout(t);
  }, [showLabel, dismissLabel]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting), {
      rootMargin: "200px",
    });
    io.observe(el);
    const onVisibility = () => {
      if (document.visibilityState === "hidden") setPaused(true);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const handleClick = () => {
    dismissLabel();
    onClick();
  };

  const label = isOpen ? "Close Dīpa" : "Ask Dīpa";

  return (
    <div ref={ref} className={`dipa-l ${className}`} data-paused={paused ? "1" : "0"}>
      <style>{`
        .dipa-l { position: relative; }
        .dipa-l__btn {
          display: inline-flex; align-items: center; gap: 8px;
          border: none; background: transparent; padding: 0; cursor: pointer;
          border-radius: 9999px; outline: none; font-family: inherit;
          transition: transform .3s cubic-bezier(.23,1,.32,1);
          -webkit-tap-highlight-color: transparent;
        }
        .dipa-l__btn--pill {
          background: #FFFFFF; padding: 0 16px 0 4px;
          border: 1px solid rgba(4,39,24,.12);
          box-shadow: 0 8px 26px rgba(4,39,24,.16);
        }
        .dipa-l__btn:active { transform: scale(.94); }
        .dipa-l__btn:focus-visible { outline: 2px solid #A8711A; outline-offset: 4px; }

        .dipa-c {
          width: 48px; height: 48px; flex: none; display: block;
          filter: drop-shadow(0 6px 14px rgba(4,39,24,.28));
        }
        @media (min-width: 768px) { .dipa-c { width: 64px; height: 64px; } }
        .dipa-c__svg { width: 100%; height: 100%; display: block; overflow: visible; }

        /* fill-box so transform-origin percentages resolve against each element */
        .dipa-c__body, .dipa-c__antL, .dipa-c__antR,
        .dipa-c__lid, .dipa-c__glance { transform-box: fill-box; }

        .dipa-c__body   { transform-origin: 50% 88%; animation: dipa-bob 4.4s cubic-bezier(.4,0,.5,1) infinite; }
        .dipa-c__lid    { transform-origin: 50% 50%; animation: dipa-blink 5.4s cubic-bezier(.4,0,.6,1) infinite; }
        .dipa-c__antL   { transform-origin: 100% 100%; animation: dipa-antl 6.2s cubic-bezier(.23,1,.32,1) infinite; }
        .dipa-c__antR   { transform-origin: 0% 100%;  animation: dipa-antr 6.2s cubic-bezier(.23,1,.32,1) infinite; }
        .dipa-c__glance { transform-origin: 50% 50%; animation: dipa-glance 7.4s cubic-bezier(.23,1,.32,1) infinite; }

        @keyframes dipa-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2.2px); } }
        @keyframes dipa-blink {
          0%, 88%  { transform: scaleY(0); }
          92%      { transform: scaleY(1); }
          95%      { transform: scaleY(1); }
          100%     { transform: scaleY(0); }
        }
        @keyframes dipa-antl {
          0%,66% { transform: rotate(0deg); } 74% { transform: rotate(-7deg); }
          82% { transform: rotate(3deg); } 90%,100% { transform: rotate(0deg); }
        }
        @keyframes dipa-antr {
          0%,66% { transform: rotate(0deg); } 76% { transform: rotate(6deg); }
          84% { transform: rotate(-3deg); } 92%,100% { transform: rotate(0deg); }
        }
        @keyframes dipa-glance {
          0%,52% { transform: translateX(0); } 60% { transform: translateX(3.6px); }
          70% { transform: translateX(-3.6px); } 80%,100% { transform: translateX(0); }
        }

        .dipa-l[data-paused="1"] .dipa-c__body,
        .dipa-l[data-paused="1"] .dipa-c__lid,
        .dipa-l[data-paused="1"] .dipa-c__antL,
        .dipa-l[data-paused="1"] .dipa-c__antR,
        .dipa-l[data-paused="1"] .dipa-c__glance { animation-play-state: paused; }

        .dipa-l__label {
          font-size: 13.5px; font-weight: 600; color: #042718;
          white-space: nowrap; line-height: 1;
        }

        @media (hover: hover) and (pointer: fine) {
          .dipa-l__btn:hover { transform: scale(1.05); }
          .dipa-l__btn:hover .dipa-c { filter: drop-shadow(0 8px 18px rgba(4,39,24,.36)); }
        }

        @media (prefers-reduced-motion: reduce) {
          .dipa-c__body, .dipa-c__antL, .dipa-c__antR, .dipa-c__glance { animation: none; }
          .dipa-c__lid { animation: none; transform: scaleY(0); }
          .dipa-l__btn { transition: none; }
        }
      `}</style>

      <button
        type="button"
        onClick={handleClick}
        aria-label={showLabel ? undefined : label}
        title={label}
        className={`dipa-l__btn ${showLabel ? "dipa-l__btn--pill" : ""}`}
      >
        <span className="dipa-c">
          <DipaCharacter />
        </span>
        {showLabel && (
          <span className="dipa-l__label">Ask Dīpa</span>
        )}
      </button>
    </div>
  );
}
