import React, { useState, useEffect, useRef, useCallback } from "react";

/**
 * =========================================================================
 * SEASONAL HERO BACKGROUND SYSTEM
 * =========================================================================
 *
 * 1. Exactly One Continuous Pass Per Season (No Restart Feel):
 *    - Each 10-second seasonal video plays through its full duration once
 *    - At 8.2s, the incoming video begins a smooth 1800ms crossfade into view
 *    - The outgoing video finishes its single continuous pass at 10.0s as it completes fading out
 *    - Progression: Golden Hour (0) -> Still Water (1) -> Deep Woods (2) -> Quiet Dawn (3) -> Golden Hour (0)
 *    - No video looping during a state, no duplicate states, no restarts
 *
 * 2. True Double-Buffered Overlapping Video Layers:
 *    - Persistent Slot A and Slot B video elements (never unmounted or recreated)
 *    - Incoming layer at zIndex 2 dissolves 0 -> 1 over solid base layer at zIndex 1
 *    - Zero background poster bleed, zero luminance dip, zero blank frames
 *
 * 3. Zero Visible Season Labels:
 *    - Completely clean, production-grade visual experience
 *    - No debug indicators, no seasonal pills, no visible text labels
 *
 * 4. Adaptive Environmental Theming:
 *    - Synchronously adapts headline, copy, CTAs, and proof chips
 *    - Dīpa bar styling remains fixed and canonical across all seasons
 */

export interface SeasonalBackgroundState {
  id: string;
  name: string;
  video: string;
  objectPosition?: string;
}

export const SEASONAL_BACKGROUNDS: SeasonalBackgroundState[] = [
  {
    id: "golden-hour",
    name: "Golden Hour",
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4",
    objectPosition: "center center",
  },
  {
    id: "still-water",
    name: "Still Water",
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4",
    objectPosition: "center center",
  },
  {
    id: "deep-woods",
    name: "Deep Woods",
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4",
    objectPosition: "center center",
  },
  {
    id: "quiet-dawn",
    name: "Quiet Dawn",
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4",
    objectPosition: "center center",
  },
];

// Single session timing: each 10s video plays through once.
// Crossfade begins at 8.2s so incoming video dissolves over outgoing video as it completes at 10.0s.
export const SEASON_PASS_DURATION_MS = 8200;
export const BACKGROUND_CROSSFADE_MS = 1800;

// Transparent PNG overlay asset
export const OVERLAY_PNG_URL = "/images/seasonal-overlay.png";

/**
 * ADAPTIVE THEME SPECIFICATIONS FOR EACH SEASONAL SCENE
 * Dīpa is excluded and retains its canonical fixed styling.
 */
export interface SeasonalTheme {
  id: string;
  name: string;
  isDark: boolean;
  headingStyle: string;
  headingAccentStyle: string;
  headingShadow: string;
  bodyStyle: string;
  bodyHighlightStyle: string;
  bodyShadow: string;
  eyebrowBg: string;
  eyebrowBorder: string;
  eyebrowText: string;
  eyebrowDot: string;
  eyebrowShadow: string;
  primaryCtaBg: string;
  primaryCtaHoverBg: string;
  primaryCtaText: string;
  primaryCtaBorder: string;
  primaryCtaShadow: string;
  secondaryCtaBg: string;
  secondaryCtaHoverBg: string;
  secondaryCtaText: string;
  secondaryCtaBorder: string;
  secondaryCtaShadow: string;
  chipBg: string;
  chipBorder: string;
  chipText: string;
  chipDot: string;
  chipMetricColor: string;
  radialWash: string;
}

export const SEASONAL_THEMES: Record<string, SeasonalTheme> = {
  "golden-hour": {
    id: "golden-hour",
    name: "Golden Hour",
    isDark: false,
    headingStyle: "text-[#FAFDFB]",
    headingAccentStyle: "text-[#FDE68A]",
    headingShadow:
      "0 2px 14px rgba(0,0,0,0.75), 0 0 28px rgba(0,0,0,0.5)",
    bodyStyle: "text-white/95",
    bodyHighlightStyle: "text-white",
    bodyShadow:
      "0 1px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)",
    eyebrowBg: "bg-transparent",
    eyebrowBorder: "border-transparent",
    eyebrowText: "text-white/90",
    eyebrowDot: "bg-[#FDE68A]",
    eyebrowShadow: "none",
    primaryCtaBg: "bg-[#121517]",
    primaryCtaHoverBg: "hover:bg-[#1A1E22]",
    primaryCtaText: "text-[#FAFDFB]",
    primaryCtaBorder: "border-white/20",
    primaryCtaShadow: "shadow-[0_4px_24px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.15)]",
    secondaryCtaBg: "bg-transparent",
    secondaryCtaHoverBg: "hover:bg-white/10",
    secondaryCtaText: "text-white/90",
    secondaryCtaBorder: "border-white/15",
    secondaryCtaShadow: "none",
    chipBg: "bg-[#121517]/55",
    chipBorder: "border-white/14",
    chipText: "text-white/85",
    chipDot: "bg-[#FDE68A]",
    chipMetricColor: "text-[#FDE68A]",
    radialWash:
      "bg-radial-[ellipse_75%_60%_at_50%_42%] from-black/[0.08] via-transparent to-transparent",
  },
  "still-water": {
    id: "still-water",
    name: "Still Water",
    isDark: false,
    headingStyle: "text-[#FAFDFB]",
    headingAccentStyle: "text-[#FDE68A]",
    headingShadow:
      "0 2px 14px rgba(0,0,0,0.75), 0 0 28px rgba(0,0,0,0.5)",
    bodyStyle: "text-white/95",
    bodyHighlightStyle: "text-white",
    bodyShadow:
      "0 1px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)",
    eyebrowBg: "bg-transparent",
    eyebrowBorder: "border-transparent",
    eyebrowText: "text-white/90",
    eyebrowDot: "bg-[#FDE68A]",
    eyebrowShadow: "none",
    primaryCtaBg: "bg-[#121517]",
    primaryCtaHoverBg: "hover:bg-[#1A1E22]",
    primaryCtaText: "text-[#FAFDFB]",
    primaryCtaBorder: "border-white/20",
    primaryCtaShadow: "shadow-[0_4px_24px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.15)]",
    secondaryCtaBg: "bg-transparent",
    secondaryCtaHoverBg: "hover:bg-white/10",
    secondaryCtaText: "text-white/90",
    secondaryCtaBorder: "border-white/15",
    secondaryCtaShadow: "none",
    chipBg: "bg-[#121517]/55",
    chipBorder: "border-white/14",
    chipText: "text-white/85",
    chipDot: "bg-[#FDE68A]",
    chipMetricColor: "text-[#FDE68A]",
    radialWash:
      "bg-radial-[ellipse_75%_60%_at_50%_42%] from-black/[0.08] via-transparent to-transparent",
  },
  "deep-woods": {
    id: "deep-woods",
    name: "Deep Woods",
    isDark: true,
    headingStyle: "text-[#FAFDFB]",
    headingAccentStyle: "text-[#FDE68A]",
    headingShadow:
      "0 2px 14px rgba(0,0,0,0.75), 0 0 28px rgba(0,0,0,0.5)",
    bodyStyle: "text-white/95",
    bodyHighlightStyle: "text-white",
    bodyShadow:
      "0 1px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)",
    eyebrowBg: "bg-transparent",
    eyebrowBorder: "border-transparent",
    eyebrowText: "text-white/90",
    eyebrowDot: "bg-[#FDE68A]",
    eyebrowShadow: "none",
    primaryCtaBg: "bg-[#121517]",
    primaryCtaHoverBg: "hover:bg-[#1A1E22]",
    primaryCtaText: "text-[#FAFDFB]",
    primaryCtaBorder: "border-white/20",
    primaryCtaShadow: "shadow-[0_4px_24px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.15)]",
    secondaryCtaBg: "bg-transparent",
    secondaryCtaHoverBg: "hover:bg-white/10",
    secondaryCtaText: "text-white/90",
    secondaryCtaBorder: "border-white/15",
    secondaryCtaShadow: "none",
    chipBg: "bg-[#121517]/55",
    chipBorder: "border-white/14",
    chipText: "text-white/85",
    chipDot: "bg-[#FDE68A]",
    chipMetricColor: "text-[#FDE68A]",
    radialWash:
      "bg-radial-[ellipse_75%_60%_at_50%_42%] from-black/[0.08] via-transparent to-transparent",
  },
  "quiet-dawn": {
    id: "quiet-dawn",
    name: "Quiet Dawn",
    isDark: false,
    headingStyle: "text-[#FAFDFB]",
    headingAccentStyle: "text-[#FDE68A]",
    headingShadow:
      "0 2px 14px rgba(0,0,0,0.75), 0 0 28px rgba(0,0,0,0.5)",
    bodyStyle: "text-white/95",
    bodyHighlightStyle: "text-white",
    bodyShadow:
      "0 1px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)",
    eyebrowBg: "bg-transparent",
    eyebrowBorder: "border-transparent",
    eyebrowText: "text-white/90",
    eyebrowDot: "bg-[#FDE68A]",
    eyebrowShadow: "none",
    primaryCtaBg: "bg-[#121517]",
    primaryCtaHoverBg: "hover:bg-[#1A1E22]",
    primaryCtaText: "text-[#FAFDFB]",
    primaryCtaBorder: "border-white/20",
    primaryCtaShadow: "shadow-[0_4px_24px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.15)]",
    secondaryCtaBg: "bg-transparent",
    secondaryCtaHoverBg: "hover:bg-white/10",
    secondaryCtaText: "text-white/90",
    secondaryCtaBorder: "border-white/15",
    secondaryCtaShadow: "none",
    chipBg: "bg-[#121517]/55",
    chipBorder: "border-white/14",
    chipText: "text-white/85",
    chipDot: "bg-[#FDE68A]",
    chipMetricColor: "text-[#FDE68A]",
    radialWash:
      "bg-radial-[ellipse_75%_60%_at_50%_42%] from-black/[0.08] via-transparent to-transparent",
  },
};

interface SeasonalHeroBackgroundProps {
  onThemeChange?: (theme: SeasonalTheme) => void;
}

export default function SeasonalHeroBackground({
  onThemeChange,
}: SeasonalHeroBackgroundProps) {
  // SINGLE SOURCE OF TRUTH: exactly ONE active season index (0 -> 1 -> 2 -> 3 -> 0)
  const [activeSeasonIndex, setActiveSeasonIndex] = useState<number>(0);

  // Decoupled video buffer slots (Slot A and Slot B)
  const [currentVideoSlot, setCurrentVideoSlot] = useState<"A" | "B">("A");

  // Track the source indices assigned to Slot A and Slot B
  const [slotAIndex, setSlotAIndex] = useState(0);
  const [slotBIndex, setSlotBIndex] = useState(1);

  // Explicit opacity states for Slot A and Slot B
  const [slotAOpacity, setSlotAOpacity] = useState(1);
  const [slotBOpacity, setSlotBOpacity] = useState(0);

  // Explicit zIndex for Slot A and Slot B
  const [slotAZIndex, setSlotAZIndex] = useState(1);
  const [slotBZIndex, setSlotBZIndex] = useState(2);

  // Transition enabled flag for smooth crossfade vs instant reset
  const [slotATransition, setSlotATransition] = useState(false);
  const [slotBTransition, setSlotBTransition] = useState(false);

  // Transition state ref to lock against duplicate overlapping transitions
  const isTransitioningRef = useRef(false);
  const currentSlotRef = useRef<"A" | "B">("A");
  currentSlotRef.current = currentVideoSlot;

  // Track previous season index so crossfade runs only on real season change
  const prevSeasonIndexRef = useRef(0);

  const videoRefA = useRef<HTMLVideoElement | null>(null);
  const videoRefB = useRef<HTMLVideoElement | null>(null);

  // Reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Safe video playback helper
  const safePlay = useCallback((video: HTMLVideoElement | null) => {
    if (!video) return Promise.resolve();
    const playPromise = video.play();
    if (playPromise !== undefined) {
      return playPromise.catch(() => {
        // Autoplay may be restricted; safe to absorb
      });
    }
    return Promise.resolve();
  }, []);

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Broadcast initial theme on mount
  useEffect(() => {
    const initialTheme =
      SEASONAL_THEMES[SEASONAL_BACKGROUNDS[0].id] ||
      SEASONAL_THEMES["golden-hour"];
    onThemeChange?.(initialTheme);
  }, [onThemeChange]);

  // Handle visibility changes (pause decoders when tab hidden, resume when visible)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (videoRefA.current) videoRefA.current.pause();
        if (videoRefB.current) videoRefB.current.pause();
      } else if (!prefersReducedMotion) {
        if (currentVideoSlot === "A") {
          safePlay(videoRefA.current);
        } else {
          safePlay(videoRefB.current);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [currentVideoSlot, prefersReducedMotion, safePlay]);

  // Start initial video playback on mount
  useEffect(() => {
    if (prefersReducedMotion) return;
    const vidA = videoRefA.current;
    if (vidA) {
      safePlay(vidA);
    }
  }, [prefersReducedMotion, safePlay]);

  // SINGLE AUTHORITATIVE SCHEDULER:
  // Advances activeSeasonIndex by 1 exactly once per session pass (8.2s interval)
  useEffect(() => {
    if (prefersReducedMotion) return;

    if (
      typeof navigator !== "undefined" &&
      (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData
    ) {
      return;
    }

    const timer = setInterval(() => {
      if (document.hidden || isTransitioningRef.current) return;
      setActiveSeasonIndex((current) => (current + 1) % SEASONAL_BACKGROUNDS.length);
    }, SEASON_PASS_DURATION_MS);

    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  // SINGLE CROSSFADE HANDLER: Executes once when activeSeasonIndex changes
  useEffect(() => {
    if (activeSeasonIndex === prevSeasonIndexRef.current) {
      return;
    }

    const targetIndex = activeSeasonIndex;
    prevSeasonIndexRef.current = targetIndex;
    isTransitioningRef.current = true;

    // 1. Synchronously broadcast the adaptive theme for the new season
    const nextTheme =
      SEASONAL_THEMES[SEASONAL_BACKGROUNDS[targetIndex].id] ||
      SEASONAL_THEMES["golden-hour"];
    onThemeChange?.(nextTheme);

    const baseSlot = currentSlotRef.current;

    if (baseSlot === "A") {
      // Slot A is base layer. Slot B will fade in with target season.
      setSlotBIndex(targetIndex);
      const incomingVideo = videoRefB.current;
      const outgoingVideo = videoRefA.current;

      const startFade = () => {
        // Slot A stays solid at opacity 1, zIndex 1
        setSlotAZIndex(1);
        setSlotATransition(false);

        // Slot B begins 1800ms fade-in on top (zIndex 2)
        setSlotBZIndex(2);
        setSlotBTransition(!prefersReducedMotion);
        setSlotBOpacity(1);

        const timeoutId = setTimeout(() => {
          // Slot B is now 100% opaque base layer
          setSlotBZIndex(1);
          setSlotBTransition(false);

          // Slot A is hidden behind Slot B: reset opacity to 0 instantly
          setSlotATransition(false);
          setSlotAOpacity(0);
          setSlotAZIndex(2);

          // Pause retired outgoing video
          if (outgoingVideo) outgoingVideo.pause();

          // Preload next upcoming season into Slot A so it is buffered and rolling in advance
          const nextUpcomingIndex = (targetIndex + 1) % SEASONAL_BACKGROUNDS.length;
          setSlotAIndex(nextUpcomingIndex);
          if (outgoingVideo) {
            outgoingVideo.src = SEASONAL_BACKGROUNDS[nextUpcomingIndex].video;
            outgoingVideo.load();
          }

          setCurrentVideoSlot("B");
          isTransitioningRef.current = false;
        }, BACKGROUND_CROSSFADE_MS + 50);

        return timeoutId;
      };

      if (incomingVideo) {
        if (slotBIndex !== targetIndex) {
          incomingVideo.src = SEASONAL_BACKGROUNDS[targetIndex].video;
          incomingVideo.load();
        }
        incomingVideo.currentTime = 0;
        safePlay(incomingVideo).then(() => {
          startFade();
        });
      } else {
        startFade();
      }
    } else {
      // Slot B is base layer. Slot A will fade in with target season.
      setSlotAIndex(targetIndex);
      const incomingVideo = videoRefA.current;
      const outgoingVideo = videoRefB.current;

      const startFade = () => {
        // Slot B stays solid at opacity 1, zIndex 1
        setSlotBZIndex(1);
        setSlotBTransition(false);

        // Slot A begins 1800ms fade-in on top (zIndex 2)
        setSlotAZIndex(2);
        setSlotATransition(!prefersReducedMotion);
        setSlotAOpacity(1);

        const timeoutId = setTimeout(() => {
          // Slot A is now 100% opaque base layer
          setSlotAZIndex(1);
          setSlotATransition(false);

          // Slot B is hidden behind Slot A: reset opacity to 0 instantly
          setSlotBTransition(false);
          setSlotBOpacity(0);
          setSlotBZIndex(2);

          // Pause retired outgoing video
          if (outgoingVideo) outgoingVideo.pause();

          // Preload next upcoming season into Slot B so it is buffered and rolling in advance
          const nextUpcomingIndex = (targetIndex + 1) % SEASONAL_BACKGROUNDS.length;
          setSlotBIndex(nextUpcomingIndex);
          if (outgoingVideo) {
            outgoingVideo.src = SEASONAL_BACKGROUNDS[nextUpcomingIndex].video;
            outgoingVideo.load();
          }

          setCurrentVideoSlot("A");
          isTransitioningRef.current = false;
        }, BACKGROUND_CROSSFADE_MS + 50);

        return timeoutId;
      };

      if (incomingVideo) {
        if (slotAIndex !== targetIndex) {
          incomingVideo.src = SEASONAL_BACKGROUNDS[targetIndex].video;
          incomingVideo.load();
        }
        incomingVideo.currentTime = 0;
        safePlay(incomingVideo).then(() => {
          startFade();
        });
      } else {
        startFade();
      }
    }
  }, [activeSeasonIndex]);

  const activeTheme =
    SEASONAL_THEMES[SEASONAL_BACKGROUNDS[activeSeasonIndex].id] ||
    SEASONAL_THEMES["golden-hour"];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <style>{`
        @keyframes seasonalOverlayFloat {
          0%, 100% {
            transform: scale(1.02) translateY(0px);
          }
          50% {
            transform: scale(1.02) translateY(-2.5px);
          }
        }
        .seasonal-overlay-float {
          animation: seasonalOverlayFloat 12s ease-in-out infinite;
          transform-origin: center center;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .seasonal-overlay-float {
            animation: none !important;
            transform: scale(1.02) translateY(0px) !important;
          }
        }
      `}</style>

      {/* Static Fallback Poster (Behind all videos in case of network latency) */}
      <picture className="absolute inset-0 w-full h-full block">
        <source srcSet="/images/hero-bg-poster.webp" type="image/webp" />
        <img
          src="/images/hero-bg-poster.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          width={1440}
          height={900}
        />
      </picture>

      {/* OVERLAPPING VIDEO LAYER A (Persistent Slot A) */}
      <video
        ref={videoRefA}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        style={{
          opacity: slotAOpacity,
          zIndex: slotAZIndex,
          transition: slotATransition
            ? `opacity ${BACKGROUND_CROSSFADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : "none",
          objectPosition:
            SEASONAL_BACKGROUNDS[slotAIndex]?.objectPosition || "center center",
        }}
        src={SEASONAL_BACKGROUNDS[slotAIndex]?.video}
      />

      {/* OVERLAPPING VIDEO LAYER B (Persistent Slot B) */}
      <video
        ref={videoRefB}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        style={{
          opacity: slotBOpacity,
          zIndex: slotBZIndex,
          transition: slotBTransition
            ? `opacity ${BACKGROUND_CROSSFADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : "none",
          objectPosition:
            SEASONAL_BACKGROUNDS[slotBIndex]?.objectPosition || "center center",
        }}
        src={SEASONAL_BACKGROUNDS[slotBIndex]?.video}
      />

      {/* Cinematic Inner Train Window PNG Overlay (Above videos, below hero text) */}
      <div className="absolute inset-0 z-[3] overflow-hidden pointer-events-none">
        <img
          src={OVERLAY_PNG_URL}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center pointer-events-none"
        />
      </div>

      {/* Adaptive localized readability wash (Smooth 1500ms transition) */}
      <div
        className={`absolute inset-0 z-[4] ${activeTheme.radialWash} pointer-events-none transition-all duration-[1500ms] ease-in-out`}
        aria-hidden="true"
      />
    </div>
  );
}
