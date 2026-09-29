import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion, Variants } from "framer-motion";
import {
  ArrowRight,
} from "lucide-react";
import { ALL_FLAGSHIP_CASE_STUDIES } from "../data/caseStudies";
import { CaseStudyDetail } from "../types";
import { OperatingPrinciples } from "./OperatingPrinciples";
import AiBuilds from "./AiBuilds";
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
      className="font-onest text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-[#121517] leading-none"
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

  // Semantic transitions containing "→" (e.g. "0 → 1", "~300 → 3,200+ DAU", "15 days → under 2 hrs")
  // Render canonical text directly with editorial Playfair champagne transition arrow — never coerce to numbers
  if (metric.value.includes("→")) {
    const parts = metric.value.split("→");
    const left = parts[0].trim();
    const right = parts[1].trim();

    return (
      <span
        aria-label={`${metric.value} — ${metric.label}`}
        className="font-onest text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-[#121517] leading-none inline-flex items-center flex-wrap"
      >
        <span aria-hidden="true" className="inline-flex items-center flex-wrap">
          <span>{left}</span>
          <span className="font-playfair italic font-normal text-[#C89B3C] mx-1.5 sm:mx-2 text-[0.85em] select-none">
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
      className="font-onest text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-[#121517] leading-none"
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

  const canonicalHeroProofRail = [
    { name: "ReshaMandi B2B Marketplace", metric: "₹20–25 Cr/month" },
    { name: "Farmer Payout Reliability", metric: "99.9%" },
    { name: "Payout Settlement Window", metric: "15 days → under 2 hrs" },
    { name: "Supply Chain Scale", metric: "80K+ farmers" },
    { name: "Bidding Transaction-Value Uplift", metric: ">35%" },
    { name: "Subscription Platform", metric: "€659k FY25" },
    { name: "AI Coach Growth", metric: "~300 → 3,200+ DAU" },
    { name: "0 → 1 Systems", metric: "Concept to production" },
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
          <span className="font-playfair italic font-medium text-[#121517] relative inline-block px-[2px]">
            curious
          </span>
          .
        </span>
      ),
    },
    {
      id: "w8",
      content: (
        <span className="font-playfair font-medium text-[#121517] inline-block">
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
      value: "0 → 1",
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
    <div className="w-full bg-[#FAF8F5] text-[#121517]">
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

            {/* CTA Hierarchy: Solid dark primary vs. quiet light secondary link */}
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
                className="h-11 sm:h-12 px-6 sm:px-7 gap-2.5 rounded-full font-inter font-semibold text-[14.5px] sm:text-[15px] inline-flex items-center justify-center bg-[#121517] hover:bg-[#1A1E22] text-[#FAF8F5] border border-white/20 hover:border-white/35 shadow-[0_4px_24px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.15)] cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
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
            <span className="w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#121517] hover:bg-[#1E2226] text-[#FAF8F5] flex items-center justify-center shrink-0 ask-dipa-send-btn shadow-2xs transition-colors" aria-hidden="true">
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
              {[...canonicalHeroProofRail, ...canonicalHeroProofRail].map((chip, idx) => (
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
        className="pt-12 sm:pt-14 md:pt-16 pb-14 md:pb-20 bg-[#FAF8F5] scroll-mt-24 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-black/[0.08]">
            <div>
              <h2 className="font-onest text-2xl sm:text-3xl md:text-[34px] lg:text-[36px] font-bold tracking-tight text-[#121517] leading-[1.18]">
                Measurable business & user impact at scale.
              </h2>
            </div>
            <p className="font-inter text-xs sm:text-[13.5px] text-[#5A626A] max-w-sm sm:text-right leading-relaxed">
              Validated across enterprise B2B marketplaces, consumer AI, and subscription platforms.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
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
                        delay: idx * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }
                }
                className={`group flex flex-col items-start ${
                  idx % 3 !== 0 ? "md:border-l md:border-black/[0.08] md:pl-8 lg:pl-10" : "md:pr-8 lg:pr-10"
                } ${
                  idx === 1 || idx === 4 ? "md:pr-8 lg:pr-10" : ""
                } ${
                  idx >= 3 ? "md:border-t md:border-black/[0.08] md:pt-8" : "md:pb-8"
                } ${
                  idx % 2 === 1 ? "sm:max-md:border-l sm:max-md:border-black/[0.08] sm:max-md:pl-6" : "sm:max-md:pr-6"
                } ${
                  idx >= 2 ? "sm:max-md:border-t sm:max-md:border-black/[0.08] sm:max-md:pt-6" : "sm:max-md:pb-6"
                } ${
                  idx > 0 ? "max-sm:border-t max-sm:border-black/[0.08] max-sm:pt-5" : ""
                } ${
                  idx < 5 ? "max-sm:pb-5" : ""
                }`}
              >
                {/* Metric value with subtle micro-interaction */}
                <div className="motion-safe:group-hover:-translate-y-[2px] transition-transform duration-200">
                  <StatNumberDisplay
                    metric={item}
                    idx={idx}
                    isInView={isInView}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </div>

                {/* Restrained Champagne Accent Rule */}
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
                          delay: idx * 0.08 + 0.1,
                          ease: [0.16, 1, 0.3, 1],
                        }
                  }
                  style={{ transformOrigin: "left" }}
                  className="h-[1.5px] w-9 sm:w-11 bg-[#C89B3C]/40 group-hover:bg-[#C89B3C] group-hover:w-14 transition-all duration-300 my-3 rounded-full"
                  aria-hidden="true"
                />

                <span className="font-inter text-xs sm:text-[13.5px] font-semibold text-[#16191D] mt-0.5">
                  {item.label}
                </span>
                <span className="font-inter text-[11.5px] sm:text-[12px] text-[#6B7280] group-hover:text-[#424850] transition-colors duration-200 mt-0.5 leading-normal">
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
      <section id="selected-work" className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <style>{`
          .work-deck-slot {
            position: sticky;
            top: 120px;
            margin-bottom: clamp(20px, 3vw, 48px);
          }
          .work-deck-card {
            position: relative;
            border-radius: 28px;
            overflow: clip;
            padding: 10px;
            aspect-ratio: 964 / 473;
            width: 100%;
            background: #121517;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 20px 48px rgba(0, 0, 0, 0.2);
            transition: transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease;
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
            width: 380px;
            height: 100%;
            border-radius: 22px;
            padding: 32px 30px;
            display: flex;
            flex-direction: column;
            background: rgba(14, 17, 20, 0.82);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
            border: 1px solid rgba(255, 255, 255, 0.14);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.1);
            color: #FAF8F5;
            transition: background 300ms ease, border-color 300ms ease;
          }
          .work-deck-cta {
            height: 44px;
            border-radius: 100px;
            background: rgba(255, 255, 255, 0.92);
            color: #121517;
            border: 1px solid rgba(255, 255, 255, 0.6);
            padding: 6px 6px 6px 20px;
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
            text-decoration: none;
            cursor: pointer;
            transition: transform 240ms ease, box-shadow 240ms ease, background-color 240ms ease;
          }
          .work-deck-cta-arrow {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #121517;
            color: #FAF8F5;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 240ms ease, color 240ms ease, background-color 240ms ease;
          }

          @media (hover: hover) and (pointer: fine) {
            .work-deck-card:hover .work-deck-shot img {
              transform: scale(1.02);
            }
            .work-deck-card:hover {
              transform: translateY(-2px);
              box-shadow: 0 28px 64px rgba(0, 0, 0, 0.28);
              border-color: rgba(255, 255, 255, 0.18);
            }
            .work-deck-card:hover .work-deck-panel {
              background: rgba(14, 17, 20, 0.88);
              border-color: rgba(255, 255, 255, 0.22);
            }
            .work-deck-card:hover .work-deck-cta {
              background: #FFFFFF;
              transform: translateY(-1px);
              box-shadow: 0 4px 16px rgba(0, 0, 0, 0.22);
            }
            .work-deck-card:hover .work-deck-cta-arrow {
              background: #121517;
              color: #FDE68A;
              transform: rotate(45deg);
            }
          }

          @media (max-width: 900px) {
            .work-deck-slot {
              position: static;
              margin-bottom: 24px;
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
              height: clamp(200px, 45vw, 280px);
              border-radius: 18px;
            }
            .work-deck-panel {
              width: 100%;
              height: auto;
              margin: 8px 0 0;
              padding: 24px 20px;
              border-radius: 18px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .work-deck-slot {
              position: static;
            }
            .work-deck-card:hover {
              transform: none !important;
            }
            .work-deck-shot img {
              transition: none !important;
              transform: none !important;
            }
            .work-deck-cta, .work-deck-cta-arrow {
              transition: none !important;
              transform: none !important;
            }
          }
        `}</style>

        {/* Section Header — Centered Editorial Composition */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="font-onest text-[32px] sm:text-[42px] md:text-[50px] font-bold text-[#121517] leading-[1.14] tracking-tight md:tracking-[-1.5px]">
            From silk mandis to <em className="font-playfair italic font-medium text-[#121517]/85 not-italic">conversational AI</em>
          </h2>
          <p className="font-inter text-[15px] md:text-[17px] text-[#5A626A] leading-relaxed max-w-[620px] font-normal mt-3.5">
            Core products I personally owned and shipped to production as Senior Product Manager — driving enterprise scale, B2C subscription growth, and applied AI guardrails.
          </p>
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
                  className="work-deck-card block text-inherit no-underline cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C] focus-visible:ring-offset-4"
                  aria-label={`Explore work: ${item.title}`}
                >
                  {/* Full-bleed authentic background image behind the whole card */}
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

                    {/* Neutral ambient gradient shade for image depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
                  </div>

                  {/* Smoked Glass Charcoal Information Panel */}
                  <div className="work-deck-panel">
                    {/* Project Title: Prominent, begins cleanly at top with zero decorative eyebrow */}
                    <div className="mb-2.5">
                      <h3 className="font-onest font-semibold text-[24px] sm:text-[28px] leading-[1.18] tracking-[-0.02em] text-[#FAF8F5]">
                        {item.title}
                      </h3>
                      {item.tags.some((t) => t.startsWith("UNLAUNCHED")) && (
                        <div className="inline-block mt-1.5">
                          <span className="rounded-full px-2.5 py-0.5 text-[10.5px] font-mono font-semibold tracking-wider bg-[#2A2010] text-[#FDE68A] border border-[#FDE68A]/30">
                            UNLAUNCHED · DEVELOPMENT-READY PRD
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Exact Authentic Description */}
                    <p className="font-inter text-[14px] sm:text-[15.5px] leading-[1.58] text-white/80 font-normal">
                      {item.description}
                    </p>

                    {/* Flex spacer */}
                    <div className="flex-1 min-h-[20px] sm:min-h-[28px]" />

                    {/* Verified Metrics Row */}
                    <div className="pt-4 border-t border-white/[0.12] flex items-baseline justify-between gap-3 mb-5">
                      <div className="font-onest font-semibold text-[32px] sm:text-[38px] leading-none tracking-[-0.02em] text-[#FDE68A] tabular-nums">
                        {item.figure}
                      </div>
                      <div className="font-inter text-[12.5px] sm:text-[14px] leading-snug text-white/70 text-right max-w-[17ch]">
                        {item.qualifier}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="work-deck-cta">
                      <span className="font-inter font-semibold text-[13.5px] text-[#121517]">
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

        {/* Closing Action: All Work */}
        <div className="mt-14 md:mt-18 flex flex-col items-center text-center">
          <p className="font-inter text-xs sm:text-[13px] text-[#5A626A] mb-3 select-none">
            Continue exploring everything I&apos;ve shipped
          </p>
          <a
            href="/work"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/work");
            }}
            id="featured-work-all-work-cta"
            className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/[0.88] hover:bg-white text-[#121517] font-inter text-[13.5px] sm:text-[14px] font-medium border border-black/[0.08] hover:border-black/20 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_18px_rgba(0,0,0,0.1)] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C] focus-visible:ring-offset-2"
          >
            <span>All work</span>
            <span className="w-5 h-5 rounded-full bg-[#121517] text-[#FAF8F5] group-hover:text-[#FDE68A] flex items-center justify-center transition-colors">
              <ArrowRight size={12} />
            </span>
          </a>
        </div>
      </section>

      {/* =========================================================================
          4. THE PRODUCT LAB (PM THINKING, MECHANISM TESTING & APPLIED SYSTEMS)
          ========================================================================= */}
      <section id="ai-builds" data-section="product-lab" className="py-14 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <h2 className="font-onest text-[32px] sm:text-[42px] md:text-[50px] font-bold text-[#121517] leading-[1.15] tracking-tight md:tracking-[-1.5px] max-w-3xl text-center">
            I don&apos;t just use AI to make things. <br className="hidden sm:inline" />
            <span className="font-playfair italic font-medium text-[#121517]/80">I use it to test how products should work.</span>
          </h2>
          <p className="font-inter text-[15px] md:text-[17px] text-[#4A525A] leading-relaxed max-w-[720px] font-normal mt-4 text-center">
            I prototype product mechanisms, challenge my assumptions, and build working systems with AI as an implementation partner &mdash; while keeping the product decisions, constraints, and validation loop mine.
          </p>
        </div>

        {/* Product Lab Grid */}
        <div id="ai-builds-grid" className="w-full">
          <AiBuilds onNavigate={onNavigate} />
        </div>

        {/* Maker's Editorial Signature Line */}
        <div className="mt-10 md:mt-12 text-center">
          <p className="font-mono text-[11px] sm:text-xs text-[#7A828A] tracking-normal flex flex-wrap items-center justify-center gap-x-2 gap-y-1 select-none">
            <span>Built with</span>
            <span className="text-[#C89B3C]/70" aria-hidden="true">·</span>
            <span>Figma</span>
            <span className="text-[#C89B3C]/70" aria-hidden="true">·</span>
            <span>Claude Code</span>
            <span className="text-[#C89B3C]/70" aria-hidden="true">·</span>
            <span>Gemini</span>
            <span className="text-[#C89B3C]/70" aria-hidden="true">·</span>
            <span>Lovable</span>
            <span className="text-[#C89B3C]/70" aria-hidden="true">·</span>
            <span>n8n</span>
            <span className="text-[#C89B3C]/70" aria-hidden="true">·</span>
            <span>Power BI</span>
          </p>
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
