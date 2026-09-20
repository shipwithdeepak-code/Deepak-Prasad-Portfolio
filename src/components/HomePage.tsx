import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion, Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { ALL_FLAGSHIP_CASE_STUDIES } from "../data/caseStudies";
import { CaseStudyDetail } from "../types";
import { OperatingPrinciples } from "./OperatingPrinciples";
import AiBuilds from "./AiBuilds";

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectCaseStudy: (caseStudy: CaseStudyDetail) => void;
  onOpenResumeModal?: () => void;
}

function useStatCountUp(
  start: number,
  target: number,
  duration: number,
  delay: number,
  isInView: boolean,
  shouldReduceMotion: boolean
) {
  const [value, setValue] = useState(shouldReduceMotion ? target : start);

  useEffect(() => {
    if (shouldReduceMotion) {
      setValue(target);
      return;
    }
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const timeoutId = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Cubic ease-out curve
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (target - start) * easeOut);
        setValue(current);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setValue(target);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [start, target, duration, delay, isInView, shouldReduceMotion]);

  return shouldReduceMotion ? target : value;
}

interface StatNumberDisplayProps {
  idx: number;
  isInView: boolean;
  shouldReduceMotion: boolean;
}

function StatNumberDisplay({ idx, isInView, shouldReduceMotion }: StatNumberDisplayProps) {
  const configs = [
    { start: 0, target: 7, type: "years" },
    { start: 0, target: 1, type: "zeroToOne" },
    { start: 0, target: 80, type: "kPlus" },
    { start: 0, target: 12, type: "kPlus" },
    { start: 300, target: 3200, type: "dauGrowth" },
    { start: 0, target: 2, type: "payoutTime" },
  ];

  const cfg = configs[idx];
  const delay = idx * 90;
  const count = useStatCountUp(cfg.start, cfg.target, 1100, delay, isInView, shouldReduceMotion);

  if (cfg.type === "years") {
    return (
      <span className="font-onest text-2xl sm:text-3xl font-bold tracking-tight text-[#042718]">
        {count}+ years
      </span>
    );
  }

  if (cfg.type === "zeroToOne") {
    return (
      <span className="font-onest text-2xl sm:text-3xl font-bold tracking-tight text-[#042718] inline-flex items-center">
        <span>0</span>
        <span className="font-playfair italic font-normal text-[#042718]/70 mx-1 select-none">
          →
        </span>
        <span>{count}</span>
      </span>
    );
  }

  if (cfg.type === "kPlus") {
    return (
      <span className="font-onest text-2xl sm:text-3xl font-bold tracking-tight text-[#042718]">
        {count}K+
      </span>
    );
  }

  if (cfg.type === "dauGrowth") {
    return (
      <span className="font-onest text-2xl sm:text-3xl font-bold tracking-tight text-[#042718] inline-flex items-center">
        <span>300</span>
        <span className="font-playfair italic font-normal text-[#042718]/70 mx-1.5 select-none">
          →
        </span>
        <span>{count.toLocaleString()}+</span>
      </span>
    );
  }

  if (cfg.type === "payoutTime") {
    return (
      <span className="font-onest text-2xl sm:text-3xl font-bold tracking-tight text-[#042718] inline-flex items-center">
        <span>15 days</span>
        <span className="font-playfair italic font-normal text-[#042718]/70 mx-1.5 select-none">
          →
        </span>
        <span>under {count} hrs</span>
      </span>
    );
  }

  return null;
}

interface GlowCTAProps {
  children: React.ReactNode;
  className?: string;
}

function GlowCTA({ children, className = "" }: GlowCTAProps) {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    x: 0,
    targetX: 0,
    velocity: 0,
    rafId: 0,
    lastTime: 0,
    isRunning: false,
  });

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--light-x", "0px");
    }
    return () => {
      if (stateRef.current.rafId) {
        cancelAnimationFrame(stateRef.current.rafId);
      }
    };
  }, []);

  const updateSpring = (time: number) => {
    const s = stateRef.current;
    if (!s.isRunning) return;

    if (!s.lastTime) s.lastTime = time;
    const dt = Math.min((time - s.lastTime) / 1000, 0.033);
    s.lastTime = time;

    const displacement = s.x - s.targetX;
    // Critically damped spring math (frequency ~3.4, damping ~0.78)
    const springForce = -11.56 * displacement;
    const dampingForce = -5.304 * s.velocity;
    const acceleration = springForce + dampingForce;

    s.velocity += acceleration * dt;
    s.x += s.velocity * dt;

    if (containerRef.current) {
      containerRef.current.style.setProperty("--light-x", `${s.x.toFixed(2)}px`);
    }

    if (Math.abs(s.velocity) < 0.05 && Math.abs(displacement) < 0.1) {
      s.x = s.targetX;
      s.velocity = 0;
      s.isRunning = false;
      if (containerRef.current) {
        containerRef.current.style.setProperty("--light-x", `${s.x.toFixed(2)}px`);
      }
      return;
    }

    s.rafId = requestAnimationFrame(updateSpring);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const halfWidth = rect.width / 2;
    const offsetX = e.clientX - centerX;
    const clampedX = Math.max(-halfWidth, Math.min(halfWidth, offsetX));

    stateRef.current.targetX = clampedX;
    if (!stateRef.current.isRunning) {
      stateRef.current.isRunning = true;
      stateRef.current.lastTime = 0;
      stateRef.current.rafId = requestAnimationFrame(updateSpring);
    }
  };

  const handlePointerLeave = () => {
    setIsActive(false);
    if (prefersReducedMotion) return;
    stateRef.current.targetX = 0;
    if (!stateRef.current.isRunning) {
      stateRef.current.isRunning = true;
      stateRef.current.lastTime = 0;
      stateRef.current.rafId = requestAnimationFrame(updateSpring);
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerEnter={() => setIsActive(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ "--light-x": "0px" } as React.CSSProperties}
    >
      {/* Glow Layer 1: Cursor-left edge tone & mid-intensity glow */}
      <div
        className={`absolute -inset-1 rounded-full pointer-events-none transition-opacity duration-300 blur-[8px] ${
          isActive ? "opacity-55" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(ellipse 60% 85% at calc(50% + var(--light-x) - 18px) 50%, rgba(52, 211, 153, 0.45) 0%, rgba(1, 188, 124, 0.28) 45%, rgba(24, 142, 57, 0.12) 75%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Glow Layer 2: Cursor-right edge tone & mid-intensity glow */}
      <div
        className={`absolute -inset-1 rounded-full pointer-events-none transition-opacity duration-300 blur-[10px] ${
          isActive ? "opacity-50" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(ellipse 60% 85% at calc(50% + var(--light-x) + 18px) 50%, rgba(1, 188, 124, 0.4) 0%, rgba(52, 211, 153, 0.25) 45%, rgba(24, 142, 57, 0.1) 75%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Top light shimmer streak: soft mint-white core fading to transparent */}
      <div
        className={`absolute -inset-[2px] rounded-full pointer-events-none transition-opacity duration-300 blur-[4px] ${
          isActive ? "opacity-60" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(ellipse 55px 22px at calc(50% + var(--light-x)) 0%, #FAFDFB 0%, #ECFDF5 35%, rgba(1, 188, 124, 0.3) 65%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle border outline ring accent that catches the edge halo */}
      <div
        className={`absolute inset-0 rounded-full pointer-events-none border border-[#01bc7c]/30 transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
        style={{
          boxShadow:
            "inset 0 1px 2px rgba(250, 253, 251, 0.5), 0 0 12px -2px rgba(1, 188, 124, 0.22)",
        }}
        aria-hidden="true"
      />

      {/* Render children in front of glow */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function HomePage({
  onNavigate,
  onSelectCaseStudy,
  onOpenResumeModal,
}: HomePageProps) {
  const statsSectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(statsSectionRef, { once: true, amount: 0.15 });
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [canPlayHeroVideo, setCanPlayHeroVideo] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const mql = window.matchMedia("(min-width: 768px)");
    return mql.matches && window.innerWidth >= 768;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(min-width: 768px)");

    const syncVideoAvailability = () => {
      const isDesktop = mql.matches && window.innerWidth >= 768;
      setCanPlayHeroVideo(isDesktop);
    };

    // Immediate sync on mount
    syncVideoAvailability();

    // Listen for media query match changes
    if (mql.addEventListener) {
      mql.addEventListener("change", syncVideoAvailability);
    } else {
      mql.addListener(syncVideoAvailability);
    }

    // Also listen to window resize events (e.g. Chrome DevTools viewport changes, orientation change)
    window.addEventListener("resize", syncVideoAvailability, { passive: true });

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", syncVideoAvailability);
      } else {
        mql.removeListener(syncVideoAvailability);
      }
      window.removeEventListener("resize", syncVideoAvailability);
    };
  }, []);

  const domainChips = [
    { name: "ReshaMandi B2B Ecosystem", metric: "₹20 Cr+/mo" },
    { name: "Instant Payouts Engine", metric: "99.9%" },
    { name: "Computer Vision ML Grading", metric: "4 grades" },
    { name: "Sportstech B2C SaaS", metric: "12,401 members" },
    { name: "0→1 AI Product Advisory", metric: "3 months" },
    { name: "Multi-Tier Supply Chain", metric: "80K+ farmers" },
    { name: "Dynamic Bidding Auctions", metric: "35% uplift" },
    { name: "AI Localisation", metric: "200+ videos" },
  ];

  const DIPA_QUESTIONS = [
    "What did he ship at Sportstech?",
    "How did the escrow pipeline work?",
    "Has he taken an AI feature to production?",
    "What did he get wrong first?",
    "What would he want to own next?",
  ];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const askDipaButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 3200);
      return () => clearTimeout(pauseTimer);
    }

    const currentQuestion = DIPA_QUESTIONS[questionIndex];

    if (!isDeleting) {
      if (charIndex < currentQuestion.length) {
        const typeTimer = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, 28);
        return () => clearTimeout(typeTimer);
      } else {
        setIsPaused(true);
      }
    } else {
      if (charIndex > 0) {
        const deleteTimer = setTimeout(() => {
          setCharIndex((prev) => prev - 1);
        }, 13);
        return () => clearTimeout(deleteTimer);
      } else {
        setIsDeleting(false);
        setQuestionIndex((prev) => (prev + 1) % DIPA_QUESTIONS.length);
      }
    }
  }, [charIndex, isDeleting, isPaused, questionIndex, shouldReduceMotion]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const activeEl = document.activeElement;
        const isInput =
          activeEl instanceof HTMLInputElement ||
          activeEl instanceof HTMLTextAreaElement ||
          activeEl?.getAttribute("contenteditable") === "true";
        if (!isInput) {
          e.preventDefault();
          askDipaButtonRef.current?.focus();
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("open-copilot"));
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const displayedQuestionText = shouldReduceMotion
    ? DIPA_QUESTIONS[0]
    : DIPA_QUESTIONS[questionIndex].slice(0, charIndex);

  const headlineContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.045,
      },
    },
  };

  const headlineWordVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.64, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
    },
  };

  const headlineWords: Array<{ id: string; content: React.ReactNode }> = [
    { id: "w1", content: "I'm" },
    { id: "w2", content: "mostly" },
    { id: "w3", content: "just" },
    { id: "w4", content: "someone" },
    { id: "w5", content: "who" },
    { id: "w6", content: "stays" },
    {
      id: "w7",
      content: (
        <span className="inline-block whitespace-nowrap">
          <span className="font-playfair italic font-medium text-[#042718] relative inline-block px-[3px] headline-curious-marker">
            curious
          </span>
          .
        </span>
      ),
    },
    {
      id: "w8",
      content: (
        <span className="font-playfair font-medium text-[#042718] inline-block">
          Stubborn
        </span>
      ),
    },
    { id: "w9", content: "enough" },
    { id: "w10", content: "not" },
    { id: "w11", content: "to" },
    { id: "w12", content: "stop" },
    { id: "w13", content: "asking" },
    { id: "w14", content: "'why.'" },
  ];

  const proofStripMetrics = [
    {
      value: "7+ years",
      label: "Product experience",
      detail: "Across India & Europe",
    },
    {
      value: "0→1",
      label: "AI, SaaS & platforms",
      detail: "Concept to production",
    },
    {
      value: "80K+",
      label: "Farmers served",
      detail: "From offline silk trade to a connected platform",
    },
    {
      value: "12K+",
      label: "Paid subscribers",
      detail: "Built the subscription business from 0",
    },
    {
      value: "300 → 3,200+",
      label: "DAU growth",
      detail: "AI Coach adoption since launch",
    },
    {
      value: "15 days → under 2 hrs",
      label: "Farmer payout time",
      detail: "99.9% success, fully automated",
    },
  ];

  return (
    <div className="w-full bg-[#FAF8F5] text-[#042718]">
      {/* =========================================================================
          1. HERO SECTION (CENTERED COMPOSITION INTEGRATED WITH TOP NAVIGATION)
          ========================================================================= */}
      <section className="relative pt-[168px] md:pt-[210px] pb-16 md:pb-24 min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#FAF8F5]">
        {/* Background Video/Image band full bleed cover */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <picture>
            <source srcSet="/images/hero-bg-poster.webp" type="image/webp" />
            <img
              src="/images/hero-bg-poster.jpg"
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              width="720"
              height="544"
              className="w-full h-full object-cover object-[50%_60%]"
            />
          </picture>
          {canPlayHeroVideo && (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/images/hero-bg-poster.webp"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-[50%_60%]"
            >
              <source
                src="https://cdn.jiro.build/Amox/All%20Images/P01-Header-01-BG.mp4"
                type="video/mp4"
              />
            </video>
          )}
        </div>

        {/* Soft bottom fade only */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 md:h-32 z-[1] pointer-events-none bg-[linear-gradient(to_bottom,rgba(250,248,245,0)_0%,rgba(250,248,245,0.35)_55%,rgba(250,248,245,0.92)_88%,#FAF8F5_100%)]"
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center my-auto w-full">
          {/* Eyebrow badge / Credential chip - green dot removed, px-[18px] py-2 text-[13px] */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4 }}
            className="inline-flex items-center gap-2 px-[18px] py-2 rounded-full bg-white/90 backdrop-blur-xs border border-[#042718]/10 text-[13px] font-inter font-semibold text-[#042718] mb-6 md:mb-8 shadow-2xs mx-auto max-w-full text-center leading-normal"
          >
            <span>Senior Product Manager · AI · 0→1 · B2B & B2C</span>
          </motion.div>

          {/* Main Headline - Word cascade */}
          <motion.h1
            variants={headlineContainerVariants}
            initial="hidden"
            animate="visible"
            className="font-onest text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#042718] leading-[1.12] mb-6 max-w-4xl mx-auto text-center [overflow-wrap:anywhere]"
          >
            {headlineWords.map((word) => (
              <motion.span
                key={word.id}
                variants={headlineWordVariants}
                className="inline-block mr-[0.26em]"
              >
                {word.content}
              </motion.span>
            ))}
          </motion.h1>

          {/* Supporting Copy - Exact copy, max-w-[64ch], no em-dashes */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.95 }
            }
            className="font-inter text-[15px] md:text-lg text-[#042718]/80 leading-[1.62] md:leading-relaxed mb-8 max-w-full md:max-w-[58ch] lg:max-w-[64ch] mx-auto text-center font-normal"
          >
            I&apos;m{" "}
            <span className="font-playfair italic font-medium text-[#042718] text-xl sm:text-2xl inline-block">
              Deepak
            </span>
            , a Senior Product Manager. Seven years across marketplaces, AI and subscription products. I&apos;ve built systems that move{" "}
            <span className="text-[#042718] font-semibold whitespace-nowrap">
              ₹20 to 25 Cr a month
            </span>
            , and an AI coach that went from{" "}
            <span className="text-[#042718] font-semibold whitespace-nowrap">
              300 to 3,200 daily actives
            </span>{" "}
            in three months. I kept asking questions until the product matched reality.
          </motion.p>

          {/* Ask Dīpa Glass Capsule CTA - only action in fold */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.55, ease: [0.23, 1, 0.32, 1], delay: 1.2 }
            }
            className="flex flex-col items-center justify-center mb-12 sm:mb-14 w-full"
          >
            <button
              type="button"
              ref={askDipaButtonRef}
              id="hero-ask-dipa-capsule"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("open-copilot"));
                }
              }}
              className="ask-dipa-capsule relative isolate overflow-hidden w-[min(94vw,680px)] md:w-[min(92vw,600px)] lg:w-[min(94vw,680px)] rounded-full pl-[22px] pr-[10px] py-[10px] bg-white/[0.84] backdrop-blur-[12px] backdrop-saturate-[1.55] border border-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_14px_40px_rgba(4,39,24,0.13)] flex items-center gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8711A] focus-visible:ring-offset-2 select-none"
              aria-label="Ask Dīpa about my work"
            >
              {/* Amber sparkle */}
              <span className="text-[#A8711A] text-[16px] leading-none shrink-0" aria-hidden="true">
                ✦
              </span>

              {/* ASK DĪPA label (hidden under 820px) */}
              <span className="hidden min-[820px]:inline-block font-inter uppercase text-[11px] tracking-[0.15em] font-bold text-[#A8711A] shrink-0">
                ASK DĪPA
              </span>

              {/* 1px x 20px divider (hidden under 820px) */}
              <span className="hidden min-[820px]:block w-[1px] h-[20px] bg-[#042718]/19 shrink-0" aria-hidden="true" />

              {/* Rotating Question with amber caret */}
              <span className="font-inter text-[15.5px] text-[#042718]/76 flex-1 text-left truncate whitespace-nowrap overflow-hidden text-ellipsis" aria-hidden="true">
                {displayedQuestionText}
                <span className="amber-caret" aria-hidden="true" />
              </span>

              {/* "/" Key Hint (hidden under 820px) */}
              <span className="hidden min-[820px]:inline-flex items-center font-inter text-[10.5px] text-[#042718]/60 border border-[#042718]/19 rounded-md px-[9px] py-1 shrink-0" aria-hidden="true">
                /
              </span>

              {/* 38px Circular Send Button */}
              <span className="w-[38px] h-[38px] rounded-full bg-[#042718] text-[#FAFDFB] flex items-center justify-center shrink-0 ask-dipa-send-btn shadow-2xs" aria-hidden="true">
                <ArrowRight size={16} />
              </span>
            </button>

            {/* Caption underneath - plain text with soft white halo, no pill */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.45, ease: [0.23, 1, 0.32, 1], delay: 1.4 }
              }
              className="font-playfair italic text-[13px] text-[#042718]/75 text-center mt-4 mx-auto max-w-md [text-shadow:0_1px_2px_rgba(255,255,255,0.95),0_0_14px_rgba(255,255,255,0.8)]"
            >
              Trained on my own case studies. It tells you when it doesn&apos;t know.
            </motion.p>
          </motion.div>

          {/* Marquee Ticker with metrics */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 1.6 }
            }
            className="w-full max-w-4xl mx-auto overflow-hidden py-1 hero-marquee-container [mask-image:linear-gradient(90deg,transparent,#000_9%,#000_91%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_9%,#000_91%,transparent)]"
          >
            <div className="hero-marquee-track flex items-center gap-3 w-fit whitespace-nowrap">
              {[...domainChips, ...domainChips].map((chip, i) => (
                <div
                  key={i}
                  className="hero-marquee-chip flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-[8px] backdrop-saturate-[1.5] border border-[#042718]/10 shadow-2xs text-xs sm:text-sm font-medium text-[#042718] shrink-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#188E39] shrink-0" />
                  <span>{chip.name}</span>
                  <span className="text-[#A8711A] text-[11px] font-bold tabular-nums">
                    {chip.metric}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          2. HOMEPAGE PROOF STRIP (RESTRAINED, ELEGANT, NOT DASHBOARD-Y)
          ========================================================================= */}
      <section
        ref={statsSectionRef}
        id="methodology"
        className="pt-20 md:pt-28 pb-12 md:pb-16 bg-[#FAF8F5] scroll-mt-24 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 sm:gap-y-8 md:gap-y-0">
            {proofStripMetrics.map((item, idx) => (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 12 }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.5,
                        delay: idx * 0.09,
                        ease: [0.16, 1, 0.3, 1],
                      }
                }
                className={`flex flex-col items-start ${
                  idx % 3 !== 0 ? "md:border-l md:border-[#042718]/8 md:pl-8 lg:pl-10" : "md:pr-6 lg:pr-8"
                } ${
                  idx === 1 || idx === 4 ? "md:pr-6 lg:pr-8" : ""
                } ${
                  idx >= 3 ? "md:border-t md:border-[#042718]/8 md:pt-7" : "md:pb-7"
                } ${
                  idx % 2 === 1 ? "sm:max-md:border-l sm:max-md:border-[#042718]/8 sm:max-md:pl-6" : "sm:max-md:pr-6"
                } ${
                  idx >= 2 ? "sm:max-md:border-t sm:max-md:border-[#042718]/8 sm:max-md:pt-5" : "sm:max-md:pb-5"
                } ${
                  idx > 0 ? "max-sm:border-t max-sm:border-[#042718]/8 max-sm:pt-4" : ""
                }`}
              >
                <StatNumberDisplay
                  idx={idx}
                  isInView={isInView}
                  shouldReduceMotion={shouldReduceMotion}
                />

                {/* Thin sage/moss accent line beneath each stat number */}
                <motion.div
                  initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                  animate={
                    isInView
                      ? { scaleX: 1 }
                      : shouldReduceMotion
                      ? { scaleX: 1 }
                      : { scaleX: 0 }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.6,
                          delay: idx * 0.09 + 0.12,
                          ease: [0.16, 1, 0.3, 1],
                        }
                  }
                  style={{ transformOrigin: "left" }}
                  className="h-[1.5px] w-12 sm:w-14 bg-[#6E8864]/40 my-2.5 rounded-full"
                  aria-hidden="true"
                />

                <span className="font-inter text-xs sm:text-[13px] font-semibold text-[#042718]/90 mt-0.5">
                  {item.label}
                </span>
                <span className="font-inter text-[11px] text-[#042718]/50 mt-0.5">
                  {item.detail}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SELECTED WORK SECTION (5 FLAGSHIP CASE STUDIES - OVERTAKE STICKY DECK)
          ========================================================================= */}
      <section id="selected-work" className="py-14 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <style>{`
          .work-deck-slot {
            position: sticky;
            top: 120px;
            margin-bottom: clamp(18px, 2.6vw, 42px);
          }
          .work-deck-card {
            position: relative;
            border-radius: 30px;
            overflow: clip;
            padding: 10px;
            aspect-ratio: 964 / 473;
            width: 100%;
            background: #042718;
          }
          .work-deck-shot {
            position: absolute;
            inset: 0;
            z-index: 0;
            overflow: hidden;
          }
          .work-deck-shot img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 1.2s cubic-bezier(0.23, 1, 0.32, 1);
          }
          .work-deck-panel {
            position: relative;
            z-index: 1;
            margin-left: auto;
            width: 360px;
            height: 100%;
            border-radius: 26px;
            padding: 30px;
            display: flex;
            flex-direction: column;
            background: #042718;
            color: #FFFFFF;
          }
          .work-deck-cta {
            height: 47px;
            border-radius: 100px;
            background: #FFFFFF;
            color: #042718;
            padding: 8px 8px 8px 24px;
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
            text-decoration: none;
            cursor: pointer;
            transition: transform 240ms ease, box-shadow 240ms ease;
          }
          .work-deck-cta-arrow {
            width: 31px;
            height: 31px;
            border-radius: 50%;
            background: #042718;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 240ms ease;
          }

          @media (hover: hover) and (pointer: fine) {
            .work-deck-card:hover .work-deck-shot img {
              transform: scale(1.04);
            }
            .work-deck-card:hover .work-deck-cta {
              transform: translateY(-2px);
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
            }
            .work-deck-card:hover .work-deck-cta-arrow {
              transform: rotate(45deg);
            }
          }

          @media (max-width: 900px) {
            .work-deck-slot {
              position: static;
              margin-bottom: 20px;
            }
            .work-deck-card {
              aspect-ratio: auto;
              display: flex;
              flex-direction: column;
              padding: 8px;
              border-radius: 24px;
            }
            .work-deck-shot {
              position: relative;
              inset: auto;
              width: 100%;
              height: clamp(180px, 40vw, 260px);
              border-radius: 18px;
            }
            .work-deck-panel {
              width: 100%;
              height: auto;
              margin: 8px 0 0;
              padding: 22px;
              border-radius: 18px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .work-deck-slot {
              position: static;
            }
            .work-deck-shot img {
              transition: none !important;
            }
            .work-deck-cta, .work-deck-cta-arrow {
              transition: none !important;
            }
          }
        `}</style>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase text-[#A8711A] tracking-[0.24em] font-semibold mb-3 block">
              Selected work
            </span>
            <h2 className="font-onest text-[34px] sm:text-[44px] md:text-[54px] font-bold text-[#042718] leading-[1.12] tracking-tight md:tracking-[-2px]">
              From silk mandis to <em className="font-playfair italic font-medium text-[#042718]/70 not-italic">conversational AI</em>
            </h2>
            <p className="font-inter text-[15px] md:text-[18px] text-[#042718]/80 leading-relaxed max-w-[640px] font-normal mt-4">
              Five with a page of their own. Every one went live and moved a number you can check.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate("/work")}
            className="self-start sm:self-auto shrink-0 h-[47px] px-6 rounded-full bg-[#042718] text-white hover:bg-[#0B3322] font-inter text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>All case studies</span>
            <span className="text-base leading-none">↗</span>
          </button>
        </div>

        {/* The 5 Stacked Cards */}
        <div className="relative w-full">
          {[
            {
              slug: "reshamandi",
              title: "ReshaMandi",
              tags: ["B2B marketplace", "Escrow & payments"],
              role: "PM, core marketplace",
              year: "2021–23",
              description:
                "Rebuilt a fragmented offline silk trade into one governed flow across farmers, yards and finance.",
              figure: "₹20–25 Cr",
              qualifier: "per month, at 99.9% reliability",
              imagePrefix: "/images/reshamandi-hero",
              imgAlt: "ReshaMandi B2B marketplace workflow",
            },
            {
              slug: "ai-coach",
              title: "Sportstech AI Coach",
              tags: ["Conversational AI", "Consumer health"],
              role: "PM, applied AI & safety",
              year: "2024–26",
              description:
                "Took an ambiguous AI opportunity to production in three months, behind hard safety guardrails.",
              figure: "3,200+",
              qualifier: "daily actives, up from 300",
              imagePrefix: "/images/ai-coach-hero",
              imgAlt: "Sportstech AI Coach conversational interface",
            },
            {
              slug: "subscription-growth",
              title: "Sportstech Subscription",
              tags: ["Monetization", "B2C SaaS"],
              role: "PM, monetization",
              year: "2023–26",
              description:
                "Built the subscription business from zero: packaging, paywalls, trial mechanics and win-back.",
              figure: "€659K",
              qualifier: "FY25, up 81.9% YoY",
              imagePrefix: "/images/subscription-hero",
              imgAlt: "Sportstech Subscription checkout and growth screens",
            },
            {
              slug: "performance-score",
              title: "Performance Score",
              tags: ["Connected hardware", "Algorithms"],
              role: "PM, algorithms & hardware",
              year: "2025",
              description:
                "Four surfaces sampled at different cadences and disagreed about the same body. Reconciling cadence was the product.",
              figure: "174,000",
              qualifier: "users on one score, five surfaces",
              imagePrefix: "/images/performance-score-hero",
              imgAlt: "Performance Score algorithm visualization",
            },
            {
              slug: "ai-localization",
              title: "AI Localization",
              tags: ["AI operations", "European expansion"],
              role: "PM, media automation",
              year: "2025",
              description:
                "Re-architected a manual video workflow into an AI-assisted pipeline across three languages.",
              figure: "2 weeks",
              qualifier: "turnaround, down from 3–4 months",
              imagePrefix: "/images/ai-localization-hero",
              imgAlt: "AI video localization pipeline",
            },
          ].map((item, idx) => {
            const isFirst = idx === 0;
            const isEager = idx < 2;
            const targetStudy = ALL_FLAGSHIP_CASE_STUDIES.find(
              (s) => s.slug === item.slug
            );

            return (
              <div key={item.slug} className="work-deck-slot">
                <article
                  onClick={() => {
                    if (targetStudy) onSelectCaseStudy(targetStudy);
                    onNavigate(`/work/${item.slug}`);
                  }}
                  className="work-deck-card cursor-pointer group shadow-[0_24px_64px_rgba(4,39,24,0.12)]"
                >
                  {/* Full-bleed background image behind the whole card */}
                  <div className="work-deck-shot">
                    <img
                      src={`${item.imagePrefix}.webp`}
                      srcSet={`${item.imagePrefix}-480.webp 480w, ${item.imagePrefix}-800.webp 800w, ${item.imagePrefix}.webp 1600w`}
                      sizes="(max-width: 900px) 100vw, 964px"
                      alt={item.imgAlt}
                      width={964}
                      height={473}
                      loading={isEager ? "eager" : "lazy"}
                      decoding={isEager ? "sync" : "async"}
                      {...(isFirst ? { fetchPriority: "high" } : {})}
                    />

                    {/* Gradient shade on mobile for contrast if needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#042718]/40 via-transparent to-black/20 pointer-events-none" />

                    {/* Stamp: Role (top-left) */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 px-3 py-1 rounded-full bg-[rgba(4,39,24,0.58)] backdrop-blur-[8px] text-[11px] sm:text-xs font-mono text-white/90 select-none border border-white/10">
                      {item.role}
                    </div>

                    {/* Stamp: Year (right: 392px on desktop to clear 360px panel + 10px + gap, right: 16px on mobile) */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 min-[901px]:right-[392px] z-10 px-3 py-1 rounded-full bg-[rgba(4,39,24,0.58)] backdrop-blur-[8px] text-[11px] sm:text-xs font-mono text-white/90 select-none border border-white/10">
                      {item.year}
                    </div>
                  </div>

                  {/* Floating Panel on top of image, inset right */}
                  <div className="work-deck-panel">
                    {/* Tag pills */}
                    <div className="flex flex-wrap gap-1.5 mb-3.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-[100px] px-2.5 py-1 text-[12px] font-inter font-medium leading-none bg-[#0B3322] text-[#B7BCBC]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* H3 Title */}
                    <h3 className="font-onest font-semibold text-[22px] sm:text-[26px] leading-[26px] sm:leading-[31.2px] tracking-[-0.78px] text-[#FFFFFF] mb-2.5">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="font-inter text-[14px] sm:text-[16px] leading-[19.2px] text-[#B7BCBC] font-normal">
                      {item.description}
                    </p>

                    {/* Flex spacer */}
                    <div className="flex-1 min-h-[20px] sm:min-h-[28px]" />

                    {/* Metric row */}
                    <div className="pt-[18px] border-t border-[rgba(255,255,255,0.14)] flex items-baseline justify-between gap-3 mb-5">
                      <div className="font-onest font-semibold text-[34px] sm:text-[42px] leading-none tracking-[-0.84px] text-[#E8C48A] tabular-nums">
                        {item.figure}
                      </div>
                      <div className="font-inter text-[13px] sm:text-[16px] leading-snug text-[#B7BCBC] text-right max-w-[15ch]">
                        {item.qualifier}
                      </div>
                    </div>

                    {/* CTA button */}
                    <div className="work-deck-cta">
                      <span className="font-inter font-semibold text-[14px] text-[#042718]">
                        Read case study
                      </span>
                      <span className="work-deck-cta-arrow font-sans text-sm font-semibold">
                        ↗
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          4. AI BUILDS SECTION (SCAFFOLD)
          ========================================================================= */}
      <section id="ai-builds" className="py-14 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase text-[#A8711A] tracking-[0.24em] font-semibold mb-3">
            Things I built myself
          </span>
          <h2 className="font-onest text-[34px] sm:text-[44px] md:text-[54px] font-bold text-[#042718] leading-[1.12] tracking-tight md:tracking-[-2px] max-w-3xl text-center">
            The AI I didn't just <em className="font-playfair italic font-medium text-[#042718]/70 not-italic">manage</em>
          </h2>
          <p className="font-inter text-[15px] md:text-[18px] text-[#042718]/80 leading-relaxed max-w-[640px] font-normal mt-4 text-center">
            Two products I designed, wrote and deployed on my own. One is answering questions on this page right now.
          </p>
        </div>

        {/* Empty container ready for the project cards */}
        <div id="ai-builds-grid" className="w-full">
          <AiBuilds onNavigate={onNavigate} />
        </div>

        {/* Builder's Stack Tool Strip */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#042718]/45">
            Built with
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl">
            {[
              "Figma & Design Systems",
              "Lovable AI",
              "n8n",
              "Claude Code",
              "Google AI Studio",
              "Power BI",
              "Google Analytics",
              "Amplitude",
              "SQL",
            ].map((tool) => (
              <span
                key={tool}
                className="font-mono text-xs px-2.5 py-1 rounded-md border text-[rgba(4,39,24,0.56)] border-[rgba(4,39,24,0.10)] bg-transparent"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. HOW I WORK (6 PRINCIPLES — SYMMETRIC GRID & ORB)
          ========================================================================= */}
      <OperatingPrinciples
        onNavigate={onNavigate}
        onSelectCaseStudy={onSelectCaseStudy}
      />
    </div>
  );
}
