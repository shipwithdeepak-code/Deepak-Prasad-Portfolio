import React, { useState, useEffect, useRef, useCallback, Suspense, lazy } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const ShaderCanvas = lazy(() => import("./ShaderCanvas"));

export interface ShaderOrbProps {
  className?: string;
  forceFallback?: boolean;
  fixedLabel?: string;
  disableClickAdvance?: boolean;
  onOrbClick?: () => void;
  sizeClassName?: string;
  ariaLabel?: string;
  title?: string;
  isSmall?: boolean;
}

interface PhaseConfig {
  label: string;
  accent: string;
  mid: string;
  light: string;
  glowRgba: string;
  ringBorder: string;
}

const PHASES: PhaseConfig[] = [
  {
    label: "GROUND TRUTH",
    accent: "#f59e0b",
    mid: "#fbbf24",
    light: "#fde68a",
    glowRgba: "rgba(245, 158, 11, 0.35)",
    ringBorder: "rgba(245, 158, 11, 0.4)",
  },
  {
    label: "ZERO FRICTION",
    accent: "#14b8a6",
    mid: "#2dd4bf",
    light: "#99f6e4",
    glowRgba: "rgba(20, 184, 166, 0.35)",
    ringBorder: "rgba(20, 184, 166, 0.4)",
  },
  {
    label: "MVP FIRST",
    accent: "#0ea5e9",
    mid: "#38bdf8",
    light: "#bae6fd",
    glowRgba: "rgba(56, 189, 248, 0.35)",
    ringBorder: "rgba(56, 189, 248, 0.4)",
  },
  {
    label: "GO TO MARKET",
    accent: "#6366f1",
    mid: "#818cf8",
    light: "#c7d2fe",
    glowRgba: "rgba(99, 102, 241, 0.35)",
    ringBorder: "rgba(99, 102, 241, 0.4)",
  },
  {
    label: "FIND LEVERAGE",
    accent: "#a855f7",
    mid: "#c084fc",
    light: "#e9d5ff",
    glowRgba: "rgba(168, 85, 247, 0.35)",
    ringBorder: "rgba(168, 85, 247, 0.4)",
  },
  {
    label: "SHARED OWNERSHIP",
    accent: "#fb7185",
    mid: "#fda4af",
    light: "#fecdd3",
    glowRgba: "rgba(251, 113, 133, 0.35)",
    ringBorder: "rgba(251, 113, 133, 0.4)",
  },
];

export const ShaderOrb: React.FC<ShaderOrbProps> = ({
  className = "",
  forceFallback = false,
  fixedLabel,
  disableClickAdvance = false,
  onOrbClick,
  sizeClassName,
  ariaLabel,
  title,
  isSmall,
}) => {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pulseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isSmallComputed =
    isSmall !== undefined
      ? isSmall
      : Boolean(
          sizeClassName &&
            (/\b(w|h)-(?:[1-9]|1[0-4])\b/.test(sizeClassName) ||
              /(?:[1-4][0-9]|5[0-6])px/.test(sizeClassName))
        );

  // Auto-advance every 4 seconds
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setPhaseIndex((prev) => (prev + 1) % PHASES.length);
    }, 4000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
    };
  }, [startTimer]);

  // Click / interaction: advance immediately and reset 4-second timer
  const advancePhase = useCallback(() => {
    setPhaseIndex((prev) => (prev + 1) % PHASES.length);
    startTimer();

    if (!shouldReduceMotion) {
      if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
      setIsPulsing(true);
      pulseTimeoutRef.current = setTimeout(() => {
        setIsPulsing(false);
      }, 300);
    }
  }, [shouldReduceMotion, startTimer]);

  const handleClick = useCallback(() => {
    if (!disableClickAdvance) {
      advancePhase();
    }
    onOrbClick?.();
  }, [disableClickAdvance, advancePhase, onOrbClick]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const currentPhase = PHASES[phaseIndex];
  const labelText = fixedLabel !== undefined ? fixedLabel : currentPhase.label;
  const accessibleLabel =
    ariaLabel ||
    `Operating principle: ${currentPhase.label}. Click to cycle through the principles.`;

  const [canUseShader, setCanUseShader] = useState<boolean>(false);
  const [isShaderReady, setIsShaderReady] = useState<boolean>(false);
  const isMobileDevice = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (forceFallback || shouldReduceMotion) {
      setCanUseShader(false);
      return;
    }

    if (typeof window === "undefined" || typeof navigator === "undefined" || !("gpu" in navigator)) {
      setCanUseShader(false);
      return;
    }

    let isMounted = true;
    let idleHandle: number | null = null;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const checkAdapter = () => {
      (navigator as any).gpu
        ?.requestAdapter?.()
        .then((adapter: any) => {
          if (isMounted) {
            setCanUseShader(Boolean(adapter));
          }
        })
        .catch(() => {
          if (isMounted) setCanUseShader(false);
        });
    };

    // Wait for the browser to be completely idle before requesting the GPU
    // adapter. On mobile, allow a longer idle window (2500ms) to ensure
    // critical hydration, font swaps, and hero paint are 100% complete.
    const idleTimeout = isMobileDevice ? 2500 : 1800;
    if ("requestIdleCallback" in window) {
      idleHandle = (window as any).requestIdleCallback(checkAdapter, { timeout: idleTimeout });
    } else {
      idleTimer = setTimeout(checkAdapter, idleTimeout);
    }

    return () => {
      isMounted = false;
      if (idleHandle !== null && "cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback(idleHandle);
      }
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [forceFallback, shouldReduceMotion, isMobileDevice]);

  // Reference animation-heavy sites (Stripe's gradient work included) all
  // share one habit regardless of how the effect itself is built: stop the
  // render loop the moment it's not visible. Pause when scrolled out of
  // view, and pause when the browser tab is backgrounded — resume the
  // instant either comes back. The look is identical; the GPU just stops
  // working for it when nobody's watching.
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(
    () => typeof document === "undefined" || document.visibilityState !== "hidden"
  );

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const handleVisibility = () => setIsTabVisible(document.visibilityState !== "hidden");
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const showShader =
    canUseShader && !shouldReduceMotion && !forceFallback && isInViewport && isTabVisible;

  return (
    <motion.div
      ref={wrapperRef}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      title={title || accessibleLabel}
      aria-label={accessibleLabel}
      animate={isPulsing && !shouldReduceMotion ? { scale: [1, 1.08, 1] } : { scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative flex items-center justify-center cursor-pointer select-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-[#188E39] ${className}`}
      style={
        {
          "--orb-glow": currentPhase.glowRgba,
          "--orb-ring-border": currentPhase.ringBorder,
        } as React.CSSProperties
      }
    >
      {/* Outer thin ring breathing in sync (scale 1 -> 1.07) with dynamic phase border color */}
      <div
        className={`absolute ${
          isSmallComputed ? "-inset-1.5" : "-inset-2.5 sm:-inset-3 lg:-inset-4"
        } rounded-full border principles-orb-ring pointer-events-none ${
          shouldReduceMotion ? "" : "principles-ring-breathe"
        }`}
        aria-hidden="true"
      />

      {/* Main Breathing Orb Wrapper (compact ~88-96px on mobile, responsive clamp 160px-215px on desktop) with dynamic phase glow */}
      <div
        className={`relative ${
          sizeClassName ||
          "w-[88px] h-[88px] sm:w-[96px] sm:h-[96px] lg:w-[clamp(160px,21vh,215px)] lg:h-[clamp(160px,21vh,215px)]"
        } rounded-full shrink-0 select-none principles-orb-glow ${
          shouldReduceMotion ? "principles-orb-static" : "principles-orb-breathe"
        }`}
      >
        {/* Clipped circular canvas / fallback container */}
        <div className="w-full h-full rounded-full overflow-hidden relative">
          {/* Base CSS gradient fallback: always rendered for instant 0ms first paint */}
          <div
            className="absolute inset-0 w-full h-full rounded-full transition-all duration-700 ease-in-out"
            style={{
              background: `radial-gradient(circle at 62% 8%, #fef3c7 0%, rgba(254, 243, 199, 0.45) 18%, transparent 35%), radial-gradient(circle at 45% 35%, ${currentPhase.light} 0%, ${currentPhase.mid} 50%, ${currentPhase.accent} 100%)`,
            }}
          />

          {/* Shader Canvas overlay: smoothly fades in over 700ms once ready */}
          {showShader && (
            <div
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-out ${
                isShaderReady ? "opacity-100" : "opacity-0"
              }`}
            >
              <Suspense fallback={null}>
                <ShaderCanvas
                  currentPhase={currentPhase}
                  isMobile={isMobileDevice}
                  onReady={() => setIsShaderReady(true)}
                  onUnavailable={() => setCanUseShader(false)}
                />
              </Suspense>
            </div>
          )}
        </div>

        {/* Quick radial color flash on click pulse */}
        <AnimatePresence>
          {isPulsing && !shouldReduceMotion && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: [0, 0.6, 0], scale: [0.85, 1.1, 1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 rounded-full pointer-events-none z-30"
              style={{
                background: `radial-gradient(circle, ${currentPhase.accent} 0%, transparent 70%)`,
              }}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        {/* Phase / Fixed label: uppercase, white text on dark scrim/pill for contrast guarantee */}
        {labelText !== "" && (
          <div
            className={`absolute inset-0 z-20 rounded-full flex ${
              isSmallComputed
                ? "items-end justify-center pb-1.5"
                : "items-center justify-center p-1"
            } select-none pointer-events-none`}
            aria-hidden="true"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={fixedLabel !== undefined ? fixedLabel : currentPhase.label}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: shouldReduceMotion ? 0.05 : 0.35, ease: "easeInOut" }}
                className={
                  isSmallComputed
                    ? "px-[6px] py-[2px] rounded-full bg-black/45 backdrop-blur-sm border border-white/15 shadow-sm flex items-center justify-center max-w-[92%]"
                    : "px-2 py-0.5 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1 rounded-full bg-black/35 backdrop-blur-sm border border-white/10 shadow-sm flex items-center justify-center max-w-[86%] sm:max-w-none"
                }
              >
                <span
                  className={
                    isSmallComputed
                      ? "font-inter font-bold text-[7px] uppercase tracking-[0.08em] text-white text-center whitespace-nowrap leading-none"
                      : "font-inter font-semibold text-[7.5px] sm:text-[9px] lg:text-[clamp(9.5px,1.3vh,11.5px)] uppercase tracking-[0.08em] sm:tracking-[0.14em] text-white text-center whitespace-nowrap"
                  }
                >
                  {labelText}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};
