import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion, Variants } from "framer-motion";
import {
  ArrowRight,
} from "lucide-react";
import { ALL_FLAGSHIP_CASE_STUDIES } from "../data/caseStudies";
import { CaseStudyDetail } from "../types";
import { OperatingPrinciples } from "./OperatingPrinciples";
import AiBuilds from "./AiBuilds";
import GlassButton from "./ui/GlassButton";
import SectionLabel from "./ui/SectionLabel";
import SeasonalHeroBackground, {
  SeasonalTheme,
  SEASONAL_THEMES,
} from "./SeasonalHeroBackground";

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectCaseStudy: (caseStudy: CaseStudyDetail) => void;
  onOpenResumeModal?: () => void;
}

function useNumericCountUp(
  target: number,
  duration: number,
  delay: number,
  isInView: boolean,
  shouldReduceMotion: boolean
) {
  // Always initialize with canonical target value so initial paint, SSR, and pre-animation state show the real metric
  const [value, setValue] = useState(target);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (shouldReduceMotion || !isInView || animatedRef.current) return;
    animatedRef.current = true;

    let startTime: number | null = null;
    let animationFrameId: number;

    const timeoutId = setTimeout(() => {
      setValue(0);
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Cubic ease-out curve
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * easeOut);
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
  }, [target, duration, delay, isInView, shouldReduceMotion]);

  return shouldReduceMotion ? target : value;
}

interface StatMetricItem {
  value: string;
  label: string;
  detail: string;
}

interface StatNumberDisplayProps {
  metric: StatMetricItem;
  idx: number;
  isInView: boolean;
  shouldReduceMotion: boolean;
}

function NumericStatDisplay({
  target,
  suffix,
  canonicalValue,
  label,
  delay,
  isInView,
  shouldReduceMotion,
}: {
  target: number;
  suffix: string;
  canonicalValue: string;
  label: string;
  delay: number;
  isInView: boolean;
  shouldReduceMotion: boolean;
}) {
  const count = useNumericCountUp(target, 1100, delay, isInView, shouldReduceMotion);

  return (
    <span
      aria-label={`${canonicalValue} — ${label}`}
      className="font-onest text-2xl sm:text-3xl font-bold tracking-tight text-[#042718]"
    >
      <span aria-hidden="true">
        {count}
        {suffix}
      </span>
    </span>
  );
}

function StatNumberDisplay({
  metric,
  idx,
  isInView,
  shouldReduceMotion,
}: StatNumberDisplayProps) {
  const delay = idx * 90;

  // Semantic transitions containing "→" (e.g. "0→1", "~300 → 3,200+ DAU", "15 days → under 2 hrs")
  // Render canonical text directly with editorial Playfair transition arrow — never coerce to numbers
  if (metric.value.includes("→")) {
    const parts = metric.value.split("→");
    const left = parts[0].trim();
    const right = parts[1].trim();

    return (
      <span
        aria-label={`${metric.value} — ${metric.label}`}
        className="font-onest text-2xl sm:text-3xl font-bold tracking-tight text-[#042718] inline-flex items-center"
      >
        <span aria-hidden="true" className="inline-flex items-center">
          <span>{left}</span>
          <span className="font-playfair italic font-normal text-[#042718]/70 mx-1.5 select-none">
            →
          </span>
          <span>{right}</span>
        </span>
      </span>
    );
  }

  // Pure count metrics with numeric prefix (e.g. "7+ years", "80K+", "12K+")
  const match = metric.value.match(/^(\d+)(.*)$/);
  if (match) {
    const target = parseInt(match[1], 10);
    const suffix = match[2];

    return (
      <NumericStatDisplay
        target={target}
        suffix={suffix}
        canonicalValue={metric.value}
        label={metric.label}
        delay={delay}
        isInView={isInView}
        shouldReduceMotion={shouldReduceMotion}
      />
    );
  }

  // Fallback: render canonical string directly
  return (
    <span
      aria-label={`${metric.value} — ${metric.label}`}
      className="font-onest text-2xl sm:text-3xl font-bold tracking-tight text-[#042718]"
    >
      {metric.value}
    </span>
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
    { name: "Sportstech B2C SaaS", metric: "12,401 subscribers" },
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
  // Seed the first question fully typed. Starting at 0 left the Ask Dīpa field
  // visibly empty on arrival — on a slow connection that is several seconds of
  // a blank CTA.
  const [charIndex, setCharIndex] = useState(() => DIPA_QUESTIONS[0].length);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
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
        staggerChildren: shouldReduceMotion ? 0 : 0.03,
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
          <span className="font-playfair italic font-medium text-[#042718] relative inline-block px-[2px]">
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
      value: "~300 → 3,200+ DAU",
      label: "Active scale",
      detail: "in ~3 months",
    },
    {
      value: "15 days → under 2 hrs",
      label: "Farmer payout time",
      detail: "99.9% success, fully automated",
    },
  ];

  // BACKGROUND EXPERIMENT: Set to true to enable the four seasonal cinematic states background, or false to use the exact original background.
  const USE_SEASONAL_BACKGROUND = true;

  // Adaptive theme state synchronized with seasonal video background
  const [heroTheme, setHeroTheme] = useState<SeasonalTheme>(
    SEASONAL_THEMES["golden-hour"]
  );

  return (
    <div className="w-full bg-[#FAF8F5] text-[#042718]">
      {/* =========================================================================
          1. HERO SECTION (ORIGINAL HERO WITH SEASONAL BACKGROUND EXPERIMENT)
          ========================================================================= */}
      <section
        id="hero-section"
        className="relative pt-[112px] md:pt-[132px] pb-8 md:pb-12 min-h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-[#FAF8F5]"
      >
        {/* Living Cinematic Background or Exact Original Background */}
        {USE_SEASONAL_BACKGROUND ? (
          <SeasonalHeroBackground onThemeChange={setHeroTheme} />
        ) : (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <picture className="w-full h-full block">
              <source srcSet="/images/hero-bg-poster.webp" type="image/webp" />
              <img
                src="/images/hero-bg-poster.jpg"
                alt=""
                aria-hidden="true"
                fetchPriority="high"
                loading="eager"
                decoding="sync"
                width={1440}
                height={900}
                className="w-full h-full object-cover object-center"
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
                className="absolute inset-0 w-full h-full object-cover object-center"
              >
                <source
                  src="https://cdn.jiro.build/Amox/All%20Images/P01-Header-01-BG.mp4"
                  type="video/mp4"
                />
              </video>
            )}
          </div>
        )}

        {/* Restrained bottom edge: connects naturally to the next section without washing out the proof strip */}
        <div
          className="absolute bottom-0 left-0 right-0 h-10 md:h-12 z-[1] pointer-events-none bg-[linear-gradient(to_bottom,transparent_0%,rgba(250,248,245,0.4)_50%,#FAF8F5_100%)]"
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center my-auto w-full md:pb-[150px]">
          {/* Central Hero Content Group - Reduced ~5–8% to fit comfortably inside inner window with generous breathing room */}
          <div className="flex flex-col items-center text-center w-full max-w-3xl mx-auto -translate-y-2 sm:-translate-y-3 md:-translate-y-5">
            {/* Eyebrow - Simple editorial text, zero pill, zero border, zero background */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4 }}
              className="text-[12px] sm:text-[12.5px] md:text-[13px] font-inter font-medium tracking-[0.02em] text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.75),0_0_16px_rgba(0,0,0,0.5)] mb-3 mx-auto max-w-full text-center leading-normal select-none"
            >
              Senior Product Manager · AI · 0→1 · B2B & B2C
            </motion.div>

            {/* Main Headline - Reduced scale ~6%, stable light treatment, high contrast, warm cream 'curious.', fits inside inner window */}
            <motion.h1
              className="font-onest text-[32px] sm:text-[42px] md:text-[48px] lg:text-[52px] font-bold tracking-tight text-white leading-[1.14] mb-4 md:mb-5 max-w-3xl mx-auto text-center [overflow-wrap:anywhere] [text-shadow:0_2px_14px_rgba(0,0,0,0.75),0_0_28px_rgba(0,0,0,0.5)]"
            >
              <span className="sr-only">
                I'm mostly just someone who stays curious. Stubborn enough not to stop asking 'why.'
              </span>
              <motion.span
                aria-hidden="true"
                variants={headlineContainerVariants}
                initial="hidden"
                animate="visible"
                className="inline"
              >
                {headlineWords.map((word) => {
                  if (word.id === "w7") {
                    return (
                      <motion.span
                        key={word.id}
                        variants={headlineWordVariants}
                        className="inline-block mr-[0.26em]"
                      >
                        <span className="inline-block whitespace-nowrap">
                          <span
                            className="font-playfair italic font-medium text-[#FDE68A] relative inline-block px-[2px] [text-shadow:0_2px_14px_rgba(0,0,0,0.8),0_0_24px_rgba(253,230,138,0.35)]"
                          >
                            curious
                          </span>
                          .
                        </span>
                      </motion.span>
                    );
                  }
                  if (word.id === "w8") {
                    return (
                      <motion.span
                        key={word.id}
                        variants={headlineWordVariants}
                        className="inline-block mr-[0.26em]"
                      >
                        <span
                          className="font-playfair font-medium text-white inline-block"
                        >
                          Stubborn
                        </span>
                      </motion.span>
                    );
                  }
                  return (
                    <motion.span
                      key={word.id}
                      variants={headlineWordVariants}
                      className="inline-block mr-[0.26em]"
                    >
                      {word.content}
                    </motion.span>
                  );
                })}
              </motion.span>
            </motion.h1>

            {/* Supporting Copy - Refined scale, near-white, high readability over landscape, preserved metrics */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.42 }
              }
              className="font-inter text-[14px] sm:text-[15px] md:text-[16px] text-white/95 leading-[1.62] mb-5 sm:mb-6 max-w-full md:max-w-[54ch] lg:max-w-[58ch] mx-auto text-center font-normal [text-shadow:0_1px_8px_rgba(0,0,0,0.7),0_0_20px_rgba(0,0,0,0.5)]"
            >
              I&apos;m{" "}
              <span
                className="font-playfair italic font-medium text-[#FDE68A] text-[16.5px] sm:text-[17.5px] md:text-[18.5px] inline-block"
              >
                Deepak
              </span>
              , a Senior Product Manager. Seven years across marketplaces, AI and subscription products. I&apos;ve built systems that move{" "}
              <span
                className="text-white font-semibold whitespace-nowrap"
              >
                ₹20 to 25 Cr a month
              </span>
              , and an AI coach that scaled from{" "}
              <span
                className="text-white font-semibold whitespace-nowrap"
              >
                ~300 to 3,200+ DAU
              </span>{" "}
              in ~3 months. I kept asking questions until the product matched reality.
            </motion.p>

            {/* CTA Hierarchy: Solid dark/green primary vs. quiet light secondary link */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.45, ease: [0.23, 1, 0.32, 1], delay: 0.52 }
              }
              className="flex flex-wrap items-center justify-center gap-3.5 relative z-10"
            >
              {/* PRIMARY CTA: Charcoal + Warm Ivory / Champagne */}
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("selected-work");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  } else if (onNavigate) {
                    onNavigate("/work");
                  }
                }}
                aria-label="Explore Flagship Shipped Work"
                className="h-11 sm:h-12 px-6 sm:px-7 gap-2.5 rounded-full font-inter font-semibold text-[14.5px] sm:text-[15px] inline-flex items-center justify-center bg-[#121517] hover:bg-[#1A1E22] text-[#FAFDFB] border border-white/20 hover:border-white/35 shadow-[0_4px_24px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.15)] cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Shipped Work</span>
                <ArrowRight size={15} className="shrink-0 text-[#FDE68A]" />
              </button>

              {/* SECONDARY CTA: Quiet frosted glass text link */}
              <button
                type="button"
                onClick={() => {
                  if (onOpenResumeModal) {
                    onOpenResumeModal();
                  } else if (onNavigate) {
                    onNavigate("/resume");
                  }
                }}
                aria-label="View Deepak's Resume"
                className="h-11 sm:h-12 px-4 sm:px-5 gap-2 rounded-full font-inter font-medium text-[14px] sm:text-[14.5px] inline-flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 border border-white/15 backdrop-blur-sm transition-colors cursor-pointer"
              >
                <span>View Resume</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Dīpa Conversational Discovery - Frosted Glass + Charcoal + Amber/Champagne Accents */}
        <div className="w-full flex justify-center px-4 relative z-20 mt-4 mb-3 md:mt-0 md:mb-0 md:absolute md:bottom-[16%] lg:bottom-[16.5%] xl:bottom-[17%] left-0 right-0 pointer-events-auto">
          <button
            type="button"
            id="hero-ask-dipa-cta"
            ref={askDipaButtonRef}
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("open-copilot"));
              }
            }}
            className="ask-dipa-capsule relative isolate overflow-hidden w-[min(92vw,590px)] rounded-full pl-[18px] sm:pl-[22px] pr-[8px] sm:pr-[10px] py-[8px] sm:py-[9px] bg-white/[0.86] backdrop-blur-[14px] backdrop-saturate-[1.5] border border-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_32px_rgba(0,0,0,0.22)] flex items-center gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C] focus-visible:ring-offset-2 select-none"
            aria-label="Ask Dīpa about my work"
          >
            {/* Amber / Champagne sparkle */}
            <span className="text-[#A8711A] text-[16px] leading-none shrink-0" aria-hidden="true">
              ✦
            </span>

            {/* ASK DĪPA label (hidden under 820px) */}
            <span className="hidden min-[820px]:inline-block font-inter uppercase text-[11px] tracking-[0.15em] font-bold text-[#A8711A] shrink-0">
              ASK DĪPA
            </span>

            {/* 1px x 20px divider (neutral charcoal tint) */}
            <span className="hidden min-[820px]:block w-[1px] h-[20px] bg-[#121517]/15 shrink-0" aria-hidden="true" />

            {/* Rotating Question with amber caret */}
            <span className="font-inter text-[14px] sm:text-[15px] text-[#121517]/80 flex-1 text-left truncate whitespace-nowrap overflow-hidden text-ellipsis" aria-hidden="true">
              {displayedQuestionText}
              <span className="amber-caret" aria-hidden="true" />
            </span>

            {/* 36–38px Circular Send Button in Charcoal */}
            <span className="w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#121517] hover:bg-[#1E2226] text-[#FAFDFB] flex items-center justify-center shrink-0 ask-dipa-send-btn shadow-2xs transition-colors" aria-hidden="true">
              <ArrowRight size={16} />
            </span>
          </button>
        </div>

        {/* Cinematic Proof Rail - Charcoal Frosted Glass + Champagne Metric Accents */}
        <div className="w-full flex justify-center px-4 relative z-20 mt-3 mb-2 md:mt-0 md:mb-0 md:absolute md:bottom-4 lg:bottom-5 left-0 right-0 pointer-events-auto">
          <div
            tabIndex={0}
            aria-label="Verified product metrics and operational scale across shipped systems"
            className="hero-marquee-container group relative max-w-[min(94vw,900px)] w-full mx-auto overflow-hidden rounded-full py-1.5 sm:py-2 px-3 sm:px-4 bg-[#121517]/55 hover:bg-[#121517]/70 focus-visible:bg-[#121517]/70 backdrop-blur-[14px] backdrop-saturate-[1.4] border border-white/[0.14] shadow-[0_4px_24px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.1)] transition-colors duration-300 select-none [mask-image:linear-gradient(90deg,transparent_0%,#000_5%,#000_95%,transparent_100%)] [-webkit-mask-image:linear-gradient(90deg,transparent_0%,#000_5%,#000_95%,transparent_100%)] cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDE68A]/40"
          >
            <div className="hero-marquee-track flex items-center whitespace-nowrap">
              {[...domainChips, ...domainChips].map((chip, idx) => (
                <div
                  key={`${chip.name}-${idx}`}
                  className="flex items-center gap-2 px-3 sm:px-4 shrink-0 text-xs sm:text-[13px]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FDE68A] shrink-0 opacity-90" aria-hidden="true" />
                  <span className="font-medium text-white/85 tracking-[-0.01em] whitespace-nowrap">
                    {chip.name}
                  </span>
                  <span className="text-white/30 font-normal select-none" aria-hidden="true">·</span>
                  <span className="font-semibold text-[#FDE68A] tracking-[-0.01em] whitespace-nowrap">
                    {chip.metric}
                  </span>
                  <span className="ml-3 sm:ml-4 text-white/20 font-light select-none text-[11px]" aria-hidden="true">
                    /
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. HOMEPAGE PROOF STRIP (MEASURABLE IMPACT & SCALE)
          ========================================================================= */}
      <section
        ref={statsSectionRef}
        id="methodology"
        className="pt-20 md:pt-28 pb-12 md:pb-16 bg-[#FAF8F5] scroll-mt-24 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#042718]/8">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#188E39] block mb-2">
                VERIFIED TRACK RECORD · 7+ YEARS SHIPPING PRODUCTION SYSTEMS
              </span>
              <h2 className="font-onest text-2xl sm:text-3xl font-bold tracking-tight text-[#042718]">
                Measurable business & user impact at scale.
              </h2>
            </div>
            <p className="font-inter text-xs sm:text-sm text-[#042718]/60 max-w-sm sm:text-right">
              Validated across enterprise B2B marketplaces, consumer AI, and subscription platforms.
            </p>
          </div>
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
                  metric={item}
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
            <SectionLabel label="FLAGSHIP SHIPPED PRODUCTS" color="green" className="mb-3" />
            <h2 className="font-onest text-[34px] sm:text-[44px] md:text-[54px] font-bold text-[#042718] leading-[1.12] tracking-tight md:tracking-[-2px]">
              From silk mandis to <em className="font-playfair italic font-medium text-[#042718]/70 not-italic">conversational AI</em>
            </h2>
            <p className="font-inter text-[15px] md:text-[18px] text-[#042718]/80 leading-relaxed max-w-[640px] font-normal mt-4">
              Core products I personally owned and shipped to production as Senior Product Manager — driving enterprise scale, B2C subscription growth, and applied AI guardrails.
            </p>
          </div>

          <GlassButton
            variant="primary"
            size="md"
            icon={<ArrowRight size={15} />}
            onClick={() => onNavigate("/work")}
            className="self-start sm:self-auto shrink-0"
          >
            All work
          </GlassButton>
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
              has1200: false,
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
              qualifier: "DAU during rollout period",
              imagePrefix: "/images/ai-coach-hero",
              imgAlt: "Sportstech AI Coach conversational interface",
              has1200: true,
            },
            {
              slug: "subscription",
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
              has1200: true,
            },
            {
              slug: "performance-score",
              title: "Performance Score",
              tags: ["UNLAUNCHED · DEVELOPMENT-READY PRD", "Connected hardware"],
              role: "PM, algorithms & hardware",
              year: "2025",
              description:
                "Unlaunched product strategy and development-ready PRD: unifying 5 fragmented surfaces into one shared fitness recovery engine.",
              figure: "5 surfaces",
              qualifier: "unlaunched PRD & system design",
              imagePrefix: "/images/performance-score-hero",
              imgAlt: "Performance Score algorithm visualization",
              has1200: true,
            },
            {
              slug: "ai-localization",
              title: "AI Localization",
              tags: ["AI operations", "European expansion"],
              role: "PM, media automation",
              year: "2025",
              description:
                "Re-architected a manual video workflow into an AI-assisted pipeline across three languages.",
              figure: "~3 weeks",
              qualifier: "turnaround, down from 3–4 months",
              imagePrefix: "/images/ai-localization-hero",
              imgAlt: "AI video localization pipeline",
              has1200: true,
            },
          ].map((item, idx) => {
            const isFirst = idx === 0;
            const isEager = idx < 2;
            const targetStudy = ALL_FLAGSHIP_CASE_STUDIES.find(
              (s) => s.slug === item.slug
            );

            return (
              <div key={item.slug} className="work-deck-slot">
                <a
                  href={`/work/${item.slug}`}
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
                      return;
                    }
                    e.preventDefault();
                    if (targetStudy) onSelectCaseStudy(targetStudy);
                    onNavigate(`/work/${item.slug}`);
                  }}
                  className="work-deck-card block text-inherit no-underline cursor-pointer group shadow-[0_24px_64px_rgba(4,39,24,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#188E39] focus-visible:ring-offset-4"
                  aria-label={`Explore work: ${item.title}`}
                >
                  {/* Full-bleed background image behind the whole card */}
                  <div className="work-deck-shot">
                    <img
                      src={`${item.imagePrefix}.webp`}
                      srcSet={
                        item.has1200
                          ? `${item.imagePrefix}-480.webp 480w, ${item.imagePrefix}-800.webp 800w, ${item.imagePrefix}-1200.webp 1200w, ${item.imagePrefix}.webp 1600w`
                          : `${item.imagePrefix}-480.webp 480w, ${item.imagePrefix}-800.webp 800w, ${item.imagePrefix}.webp 1600w`
                      }
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

                    {/* Stamp: Year (right: 392px on desktop to clear 360px panel + 10px + gap, right: 16px on mobile) */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 min-[901px]:right-[392px] z-10 px-3 py-1 rounded-full bg-[rgba(4,39,24,0.58)] backdrop-blur-[8px] text-[11px] sm:text-xs font-mono text-white/90 select-none border border-white/10">
                      {item.year}
                    </div>
                  </div>

                  {/* Floating Panel on top of image, inset right */}
                  <div className="work-deck-panel">
                    {/* Role & Year Header */}
                    <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/10">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#E8C48A]">
                        {item.role}
                      </span>
                      <span className="font-mono text-[11px] text-white/50">
                        {item.year}
                      </span>
                    </div>

                    {/* Tag pills */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className={
                            tag.startsWith("UNLAUNCHED")
                              ? "rounded-[100px] px-2.5 py-1 text-[11px] font-mono font-bold leading-none bg-[#3D2605] text-[#FDE68A] border border-[#F59E0B]/40"
                              : "rounded-[100px] px-2.5 py-1 text-[12px] font-inter font-medium leading-none bg-[#0B3322] text-[#B7BCBC]"
                          }
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
                        Explore the work
                      </span>
                      <span className="work-deck-cta-arrow font-sans text-sm font-semibold">
                        ↗
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          4. APPLIED AI LAB & PRODUCT EXPERIMENTS (PM THINKING & MECHANISM TESTING)
          ========================================================================= */}
      <section id="ai-builds" className="py-14 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <SectionLabel label="APPLIED AI & PRODUCT SYSTEMS" color="amber" className="mb-2" />
          <h2 className="font-onest text-[32px] sm:text-[42px] md:text-[50px] font-bold text-[#042718] leading-[1.15] tracking-tight md:tracking-[-1.5px] max-w-3xl text-center">
            I don&apos;t just use AI to make things. <br className="hidden sm:inline" />
            <span className="font-playfair italic font-medium text-[#042718]/85">I use it to test how products should work.</span>
          </h2>
          <p className="font-inter text-[15px] md:text-[17.5px] text-[#042718]/80 leading-relaxed max-w-[720px] font-normal mt-4 text-center">
            I prototype product mechanisms, challenge my assumptions, and build working systems with AI as an implementation partner &mdash; while keeping the product decisions, constraints, and validation loop mine.
          </p>
        </div>

        {/* Empty container ready for the project cards */}
        <div id="ai-builds-grid" className="w-full">
          <AiBuilds onNavigate={onNavigate} />
        </div>

        {/* Builder's Stack Tool Strip */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#042718]/45">
            PM & AI Tooling
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl">
            {[
              "Figma & Design Systems",
              "Lovable AI",
              "n8n",
              "Claude Code",
              "Google AI Studio",
              "Power BI",
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
      />
    </div>
  );
}
