import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Shader,
  Spherize,
  Swirl,
  LensFlare,
  FloatingParticles,
  CursorRipples,
  FilmGrain,
  isWebGPUSupported,
  getWebGPUSupport,
} from "shaders/react";

interface ShaderOrbProps {
  className?: string;
  forceFallback?: boolean;
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
}) => {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pulseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      advancePhase();
    }
  };

  const currentPhase = PHASES[phaseIndex];

  const [canUseShader, setCanUseShader] = useState<boolean>(() => {
    if (typeof window === "undefined" || forceFallback) return false;
    try {
      return isWebGPUSupported();
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (forceFallback) {
      setCanUseShader(false);
      return;
    }

    let isMounted = true;
    try {
      if (!isWebGPUSupported()) {
        setCanUseShader(false);
        return;
      }

      getWebGPUSupport()
        .then((info) => {
          if (isMounted) {
            setCanUseShader(Boolean(info?.supported));
          }
        })
        .catch(() => {
          if (isMounted) setCanUseShader(false);
        });
    } catch {
      if (isMounted) setCanUseShader(false);
    }

    return () => {
      isMounted = false;
    };
  }, [forceFallback]);

  const showShader = canUseShader && !shouldReduceMotion && !forceFallback;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={advancePhase}
      onKeyDown={handleKeyDown}
      aria-label={`Operating principle: ${currentPhase.label}. Click to cycle through the principles.`}
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
        className={`absolute -inset-2.5 sm:-inset-3 lg:-inset-4 rounded-full border principles-orb-ring pointer-events-none ${
          shouldReduceMotion ? "" : "principles-ring-breathe"
        }`}
        aria-hidden="true"
      />

      {/* Main Breathing Orb Wrapper (compact ~88-96px on mobile, responsive clamp 160px-215px on desktop) with dynamic phase glow */}
      <div
        className={`relative w-[88px] h-[88px] sm:w-[96px] sm:h-[96px] lg:w-[clamp(160px,21vh,215px)] lg:h-[clamp(160px,21vh,215px)] rounded-full shrink-0 select-none principles-orb-glow ${
          shouldReduceMotion ? "principles-orb-static" : "principles-orb-breathe"
        }`}
      >
        {/* Clipped circular canvas / fallback container */}
        <div className="w-full h-full rounded-full overflow-hidden relative">
          {showShader ? (
            <Shader
              className="w-full h-full block"
              style={{ width: "100%", height: "100%" }}
              onUnavailable={() => setCanUseShader(false)}
            >
              <Spherize
                depth={1.1}
                lightColor="#fef3c7"
                lightIntensity={0.85}
                lightPosition={{ x: 0.62, y: 0.08 }}
                lightSoftness={0.2}
                radius={1}
              >
                <Swirl
                  colorA={currentPhase.light}
                  colorB={currentPhase.mid}
                  stops={[
                    { color: currentPhase.light, position: 0 },
                    { color: currentPhase.mid, position: 0.5 },
                    { color: currentPhase.accent, position: 1 },
                  ]}
                  colorSpace="oklab"
                  detail={1.2}
                  speed={0.5}
                />
                <LensFlare
                  ghostChroma={0}
                  ghostIntensity={0.35}
                  ghostSpread={0.78}
                  glareIntensity={0.25}
                  glareSize={0.18}
                  haloChroma={0.5}
                  haloIntensity={0.3}
                  haloRadius={0.38}
                  haloSoftness={1.1}
                  lightPosition={{ x: 0.6, y: 0.1 }}
                  speed={0.9}
                  starburstIntensity={0.08}
                  starburstPoints={4}
                  streakIntensity={0}
                  streakLength={0.21}
                />
                <FloatingParticles
                  angle={188}
                  angleVariance={77}
                  opacity={0.5}
                  particleColor="#ffffff"
                  particleSize={1}
                  randomness={0.3}
                  speed={0.1}
                  speedVariance={0.6}
                  twinkle={1}
                />
                <CursorRipples
                  chromaticSplit={2}
                  decay={4}
                />
              </Spherize>
              <FilmGrain
                strength={0.04}
                visible={true}
              />
            </Shader>
          ) : (
            /* CSS fallback matching warm sunlight glare at (62%, 8%) on top of 3-tone body */
            <div
              className="w-full h-full rounded-full transition-all duration-700 ease-in-out"
              style={{
                background: `radial-gradient(circle at 62% 8%, #fef3c7 0%, rgba(254, 243, 199, 0.45) 18%, transparent 35%), radial-gradient(circle at 45% 35%, ${currentPhase.light} 0%, ${currentPhase.mid} 50%, ${currentPhase.accent} 100%)`,
              }}
            />
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

        {/* Phase label: uppercase, white text on dark scrim/pill for contrast guarantee */}
        <div
          className="absolute inset-0 z-20 rounded-full flex items-center justify-center select-none pointer-events-none p-1"
          aria-hidden="true"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase.label}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: shouldReduceMotion ? 0.05 : 0.35, ease: "easeInOut" }}
              className="px-2 py-0.5 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1 rounded-full bg-black/35 backdrop-blur-sm border border-white/10 shadow-sm flex items-center justify-center max-w-[86%] sm:max-w-none"
            >
              <span className="font-inter font-semibold text-[7.5px] sm:text-[9px] lg:text-[clamp(9.5px,1.3vh,11.5px)] uppercase tracking-[0.08em] sm:tracking-[0.14em] text-white text-center whitespace-nowrap">
                {currentPhase.label}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
