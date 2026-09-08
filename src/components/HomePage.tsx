import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  FileText,
} from "lucide-react";
import { ALL_FLAGSHIP_CASE_STUDIES } from "../data/caseStudies";
import { CaseStudyDetail } from "../types";
import ProductStack from "./ProductStack";
import { CaseFileCarousel } from "./CaseFileCarousel";
import { OperatingPrinciples } from "./OperatingPrinciples";

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

export default function HomePage({
  onNavigate,
  onSelectCaseStudy,
  onOpenResumeModal,
}: HomePageProps) {
  const statsSectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(statsSectionRef, { once: true, amount: 0.15 });
  const shouldReduceMotion = Boolean(useReducedMotion());

  const domainPills = [
    "ReshaMandi B2B Ecosystem",
    "Instant Payouts Engine (99.9%)",
    "Computer Vision ML Grading",
    "Sportstech B2C SaaS",
    "0→1 AI Product Advisory",
    "Multi-Tier Supply Chain",
    "Dynamic Bidding Auctions (>35%)",
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
    <div className="w-full bg-[#FAFDFB] text-[#042718]">
      {/* =========================================================================
          1. HERO SECTION (CENTERED COMPOSITION INTEGRATED WITH TOP NAVIGATION)
          ========================================================================= */}
      <section className="relative -mt-20 pt-28 pb-16 md:pt-36 md:pb-24 min-h-[calc(100vh)] flex flex-col justify-center items-center overflow-hidden bg-[#FAFDFB]">
        {/* Earlier Original Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://cdn.jiro.build/Amox/All%20Images/P01-Header-01-BG.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Soft gradient fade at bottom to blend smoothly into stats section background */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 md:h-28 bg-gradient-to-b from-transparent via-[#FAF8F5]/60 to-[#FAF8F5] pointer-events-none z-1"
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center my-auto w-full">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xs border border-[#042718]/10 text-xs sm:text-sm font-inter font-semibold text-[#042718]/80 mb-6 shadow-2xs mx-auto"
          >
            <span className="w-2 h-2 rounded-full bg-[#188E39]" />
            <span>Senior Product Manager · AI · 0→1 · B2B & B2C</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="font-onest text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#042718] leading-[1.1] mb-6 max-w-4xl mx-auto text-center"
          >
            I&apos;m mostly just someone who stays{" "}
            <span className="font-playfair italic font-medium text-[#042718]/70">
              curious
            </span>
            .{" "}
            <span className="font-playfair italic font-medium text-[#042718]/70">
              Stubborn
            </span>{" "}
            enough not to stop asking &apos;why.&apos;
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="font-inter text-lg sm:text-xl text-[#042718]/80 leading-relaxed mb-8 max-w-3xl mx-auto text-center font-normal"
          >
            I&apos;m{" "}
            <span className="font-playfair italic font-medium text-[#042718]">
              Deepak
            </span>
            , a Senior Product Manager, though most days it just feels like staying curious long enough to build things that actually work. 7+ years across marketplaces, AI features, and subscription products. Not because I had all the answers. Because I kept asking questions until the product matched reality.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12 sm:mb-16"
          >
            <button
              type="button"
              id="hero-view-work-cta"
              onClick={() => onNavigate("/work")}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#042718] hover:bg-[#063b25] text-white font-inter text-sm font-semibold transition-[background-color,box-shadow] duration-200 shadow-sm hover:shadow cursor-pointer"
            >
              <span>View Selected Work</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              id="hero-about-cta"
              onClick={() => onNavigate("/about")}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/90 hover:bg-white border border-[#042718]/15 text-[#042718] font-inter text-sm font-semibold transition-colors duration-200 cursor-pointer shadow-2xs backdrop-blur-xs"
            >
              <span>About Me</span>
              <ArrowUpRight size={15} className="text-[#042718]/60" />
            </button>
          </motion.div>

          {/* Domain Ticker Marquee */}
          <div
            className="w-full max-w-4xl mx-auto overflow-hidden py-1"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            } as React.CSSProperties}
          >
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 24,
                ease: "linear",
                repeat: Infinity,
              }}
              className="flex items-center gap-3 w-fit whitespace-nowrap mx-auto"
            >
              {[...domainPills, ...domainPills].map((pill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-xs border border-[#042718]/10 shadow-2xs text-xs sm:text-sm font-medium text-[#042718]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#188E39]" />
                  <span>{pill}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. HOMEPAGE PROOF STRIP (RESTRAINED, ELEGANT, NOT DASHBOARD-Y)
          ========================================================================= */}
      <section
        ref={statsSectionRef}
        id="methodology"
        className="py-12 md:py-16 bg-[#FAF8F5] border-b border-[#042718]/8 scroll-mt-24 relative z-10"
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
          3. SELECTED WORK SECTION (5 FLAGSHIP CASE STUDIES)
          ========================================================================= */}
      <section id="selected-work" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-inter font-semibold uppercase tracking-wider text-[#188E39] mb-2">
              <Sparkles size={14} />
              <span>Flagship Case Studies</span>
            </div>
            <h2 className="font-onest text-3xl sm:text-4xl font-bold tracking-tight text-[#042718]">
              Selected work
            </h2>
            <p className="font-inter text-base text-[#042718]/70 mt-2">
              A selection of products I’ve taken from ambiguity to launch, scale or development-ready strategy.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate("/work")}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[#042718]/10 shadow-xs hover:bg-[#FAFDFB] text-sm font-inter font-semibold text-[#042718] hover:text-[#188E39] transition-colors cursor-pointer group shrink-0 self-start md:self-end"
          >
            <span>Explore all projects</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3D Case-File Carousel */}
        <CaseFileCarousel
          onNavigate={onNavigate}
          onSelectCaseStudy={onSelectCaseStudy}
        />
      </section>

      {/* =========================================================================
          CORE COMPETENCIES & CRAFT
          ========================================================================= */}
      <ProductStack />

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
