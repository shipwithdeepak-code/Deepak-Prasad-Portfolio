import React, { useState, useEffect } from "react";
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

const PHASES = ["BREATHE IN", "HOLD", "BREATHE OUT"];

export const ShaderOrb: React.FC<ShaderOrbProps> = ({
  className = "",
  forceFallback = false,
}) => {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [phaseIndex, setPhaseIndex] = useState(0);

  // Cycle through "BREATHE IN" → "HOLD" → "BREATHE OUT" every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setPhaseIndex((prev) => (prev + 1) % PHASES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer thin ring breathing in sync (scale 1 -> 1.07) */}
      <div
        className={`absolute -inset-2.5 sm:-inset-3 lg:-inset-4 rounded-full border border-sky-300/30 pointer-events-none ${
          shouldReduceMotion ? "" : "principles-ring-breathe"
        }`}
        aria-hidden="true"
      />

      {/* Main Breathing Orb Wrapper (scaled to ~90-100px on mobile, 280-310px on desktop) */}
      <div
        className={`relative w-[96px] h-[96px] sm:w-[110px] sm:h-[110px] lg:w-[280px] lg:h-[280px] xl:w-[310px] xl:h-[310px] rounded-full shrink-0 select-none shadow-[0_0_30px_rgba(56,189,248,0.25)] lg:shadow-[0_0_60px_rgba(56,189,248,0.3)] ${
          shouldReduceMotion ? "principles-orb-static" : "principles-orb-breathe"
        }`}
      >
        {/* Clipped circular canvas / fallback container */}
        <div className="w-full h-full rounded-full overflow-hidden relative">
          {showShader ? (
            <Shader
              className="w-full h-full block cursor-pointer"
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
                  colorA="#bae6fd"
                  colorB="#38bdf8"
                  stops={[
                    { color: "#bae6fd", position: 0 },
                    { color: "#38bdf8", position: 0.5 },
                    { color: "#0ea5e9", position: 1 },
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
                  particleColor="#e0f2fe"
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
            /* CSS fallback matching warm sunlight glare at (62%, 8%) on top of 3-tone sky-blue body */
            <div
              className="w-full h-full rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 62% 8%, #fef3c7 0%, rgba(254, 243, 199, 0.45) 18%, transparent 35%), radial-gradient(circle at 45% 35%, #bae6fd 0%, #38bdf8 50%, #0ea5e9 100%)",
              }}
            />
          )}
        </div>

        {/* Phase label: uppercase, letter-spaced, medium weight, white/90% opacity, 0.8s crossfade */}
        <div
          className="absolute inset-0 z-20 rounded-full flex items-center justify-center select-none pointer-events-none"
          aria-hidden="true"
        >
          <div className="relative h-6 w-full flex items-center justify-center">
            <AnimatePresence>
              <motion.span
                key={PHASES[phaseIndex]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute font-inter font-medium text-[9px] sm:text-[10px] lg:text-[13px] xl:text-[14px] uppercase tracking-[0.14em] lg:tracking-[0.22em] text-white/95 drop-shadow-sm text-center px-2"
              >
                {PHASES[phaseIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
