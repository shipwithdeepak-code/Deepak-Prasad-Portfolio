import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * Dīpa — the floating portfolio guide / conductor launcher.
 *
 * Treatment:
 * - Launcher shell / background: Deep charcoal (#121517)
 * - Dīpa eye/face: Retains existing Dīpa artwork, green contrast, and glance
 * - Small accent: Existing champagne/gold (#C89B3C)
 * - Visual relationship: Charcoal launcher + Dīpa identity + subtle champagne accent
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
        {/* Launcher shell / background: Deep charcoal #121517 */}
        <linearGradient id="dipaShell" x1=".3" y1="0" x2=".7" y2="1">
          <stop offset="0%" stopColor="#252A2F" />
          <stop offset="55%" stopColor="#181B1E" />
          <stop offset="100%" stopColor="#121517" />
        </linearGradient>
        {/* Dīpa eye/face: Retained existing Dīpa artwork & green contrast */}
        <linearGradient id="dipaVisor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8F07A" />
          <stop offset="45%" stopColor="#8FD44A" />
          <stop offset="100%" stopColor="#3C9A48" />
        </linearGradient>
        <radialGradient id="dipaVisorGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#E8FBA8" stopOpacity=".9" />
          <stop offset="100%" stopColor="#8FD44A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="dipa-c__body">
        {/* Small accent: Champagne stems with warm ivory pearl tips */}
        <g className="dipa-c__antL">
          <path d="M24 15 18 5" stroke="#C89B3C" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="17.4" cy="4" r="3.4" fill="#FAF8F5" stroke="#C89B3C" strokeWidth="0.8" />
        </g>
        <g className="dipa-c__antR">
          <path d="M40 15 46 5.5" stroke="#C89B3C" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="46.6" cy="4.5" r="3.4" fill="#FAF8F5" stroke="#C89B3C" strokeWidth="0.8" />
        </g>

        {/* Charcoal Body Shell with subtle champagne accent outline */}
        <path
          d="M32 8c13.3 0 23 10.2 23 24.5C55 45.3 45.3 54 32 54S9 45.3 9 32.5C9 18.2 18.7 8 32 8Z"
          fill="url(#dipaShell)"
          stroke="#C89B3C"
          strokeWidth="0.8"
          strokeOpacity="0.45"
        />

        {/* Dīpa eye/face: Luminous signature visor */}
        <ellipse cx="32" cy="32" rx="18" ry="11" fill="url(#dipaVisor)" />
        <ellipse cx="32" cy="31" rx="16" ry="9.5" fill="url(#dipaVisorGlow)" />

        {/* Glance: Deep pupil + catchlight */}
        <g className="dipa-c__glance">
          <ellipse cx="32" cy="32" rx="6.4" ry="6.8" fill="#06301B" />
          <circle cx="29.8" cy="29.8" r="1.9" fill="#EAF6EE" />
        </g>

        {/* Charcoal Eyelid */}
        <ellipse className="dipa-c__lid" cx="32" cy="32" rx="18.5" ry="11.5" fill="#181B1E" />
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
          background: #121517; padding: 0 16px 0 4px;
          border: 1px solid rgba(200, 155, 60, 0.3);
          box-shadow: 0 8px 26px rgba(0, 0, 0, 0.28);
        }
        .dipa-l__btn:active { transform: scale(.94); }
        .dipa-l__btn:focus-visible { outline: 2px solid #C89B3C; outline-offset: 4px; }

        .dipa-c {
          width: 48px; height: 48px; flex: none; display: block;
          filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.28));
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
          font-size: 13.5px; font-weight: 600; color: #FAF8F5;
          white-space: nowrap; line-height: 1;
        }

        @media (hover: hover) and (pointer: fine) {
          .dipa-l__btn:hover { transform: scale(1.05); }
          .dipa-l__btn:hover .dipa-c { filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.36)); }
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
