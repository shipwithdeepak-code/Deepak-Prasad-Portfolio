import React, { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { ALL_FLAGSHIP_CASE_STUDIES } from "../data/caseStudies";
import { MORE_PRODUCT_WORK_ITEMS } from "../data/moreProductWork";
import { CaseStudyDetail } from "../types";
import GlassButton from "./ui/GlassButton";
import Tag from "./ui/Tag";
import SectionLabel from "./ui/SectionLabel";

interface WorkPageProps {
  onNavigate: (path: string) => void;
  onSelectCaseStudy: (caseStudy: CaseStudyDetail) => void;
}

export default function WorkPage({
  onNavigate,
  onSelectCaseStudy,
}: WorkPageProps) {
  // More Product Work filter state (exactly 6 categories: All + 5 primary categories)
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const moreWorkFilters = [
    "All",
    "B2B & Platforms",
    "AI & Data",
    "Growth & Monetization",
    "Connected Products",
    "Operations & Automation",
  ];

  const filteredMoreWork = MORE_PRODUCT_WORK_ITEMS.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.primaryCategory === selectedCategory;
  });

  const getPrimaryTag = (study: CaseStudyDetail): string => {
    if (study.slug === "reshamandi") return "B2B Marketplace";
    if (study.slug === "ai-coach") return "Conversational AI";
    if (study.slug === "subscription") return "Monetization";
    if (study.slug === "performance-score") return "Product Strategy / System Design";
    if (study.slug === "ai-localization") return "AI Operations";
    return study.tags[0] || "Product";
  };

  const getCardDisplayData = (study: CaseStudyDetail) => {
    switch (study.slug) {
      case "reshamandi":
        return {
          h3: "ReshaMandi",
          desc: "Rebuilt a fragmented offline silk trade into one governed flow across farmers, yards and finance.",
          figure: "₹20–25 Cr",
          qual: "per month, at 99.9% reliability",
          imagePrefix: "/images/reshamandi-hero",
        };
      case "ai-coach":
        return {
          h3: "Sportstech AI Coach",
          desc: "Took an ambiguous conversational AI opportunity to production in 3 months; scaled from ~300 to a peak of ~4,500 DAU after its November 2025 launch behind medical escalation and physiological safety guardrails.",
          figure: "~4,500",
          qual: "peak DAU reached after Nov 2025 launch",
          imagePrefix: "/images/ai-coach-hero",
        };
      case "subscription":
        return {
          h3: "Sportstech Subscription",
          desc: "Built the subscription business from zero: packaging, paywalls, trial mechanics and win-back.",
          figure: "€659K",
          qual: "FY25, up 81.9% YoY",
          imagePrefix: "/images/subscription-hero",
        };
      case "performance-score":
        return {
          h3: "Performance Score",
          desc: "Unlaunched product strategy and development-ready PRD: unifying 5 fragmented surfaces into one shared fitness recovery engine.",
          figure: "5 surfaces",
          qual: "unlaunched PRD & system design",
          imagePrefix: "/images/performance-score-hero",
        };
      case "ai-localization":
        return {
          h3: "AI Localization",
          desc: "Re-architected a manual video workflow into an AI-assisted pipeline across three languages.",
          figure: "~3 weeks",
          qual: "turnaround, down from 3–4 months",
          imagePrefix: "/images/ai-localization-hero",
        };
      default:
        return {
          h3: study.title,
          desc: study.description,
          figure: study.keyStats?.[0]?.value || "Live",
          qual: study.keyStats?.[0]?.label || "Product Impact",
          imagePrefix: "/images/hero-bg-poster",
        };
    }
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-[#121517] py-12 md:py-20">
      <style>{`
        .work-index-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 430px), 1fr));
          gap: clamp(18px, 2.4vw, 34px);
        }
        .work-icard {
          background: #FFFFFF;
          border: 1px solid rgba(18, 21, 23, 0.08);
          border-radius: 20px;
          padding: 10px;
          display: flex;
          gap: 20px;
          cursor: pointer;
          transition: transform 240ms ease, border-color 240ms ease, box-shadow 240ms ease;
          text-decoration: none;
        }
        .work-icard-image {
          flex: 0 0 46%;
          border-radius: 12px;
          object-fit: cover;
          align-self: stretch;
          overflow: hidden;
          background: #F0EDE8;
        }
        .work-icard-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 1.2s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .work-icard-body {
          flex: 1;
          padding: 14px 14px 14px 0;
          display: flex;
          flex-direction: column;
        }

        @media (hover: hover) and (pointer: fine) {
          .work-icard:hover {
            transform: translateY(-4px);
            border-color: rgba(18, 21, 23, 0.16);
            box-shadow: 0 14px 32px rgba(0, 0, 0, 0.06);
          }
          .work-icard:hover .work-icard-image img {
            transform: scale(1.05);
          }
        }

        @media (max-width: 560px) {
          .work-icard {
            flex-direction: column;
            gap: 14px;
          }
          .work-icard-image {
            flex: none;
            width: 100%;
            height: clamp(170px, 44vw, 220px);
          }
          .work-icard-body {
            padding: 4px 6px 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .work-icard {
            transition: none !important;
          }
          .work-icard:hover {
            transform: none !important;
          }
          .work-icard-image img {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            PAGE HEADER
            ========================================================================= */}
        <div className="max-w-3xl mb-14 md:mb-16">
          <h1 className="font-onest text-4xl sm:text-5xl font-bold tracking-tight text-[#121517] leading-[1.15] mb-4">
            Products, decisions, and{" "}
            <em className="font-playfair italic font-medium text-[#121517]/75 not-italic">
              what changed
            </em>
          </h1>
          <p className="font-inter text-base sm:text-lg text-[#4A525A] leading-relaxed font-normal">
            Five flagship projects with a deeper look — plus the broader work behind them.
          </p>
        </div>

        {/* =========================================================================
            SECTION 1: FLAGSHIP WORK (Curated 5 Flagships — No Top-Level Database Filter)
            ========================================================================= */}
        <section className="mb-20 md:mb-28">
          <div className="mb-8">
            <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#121517] tracking-tight">
              Five deep PM stories
            </h2>
          </div>

          <div className="work-index-grid">
            {ALL_FLAGSHIP_CASE_STUDIES.map((study, idx) => {
              const isFirst = idx === 0;
              const isEager = idx < 2;
              const cardData = getCardDisplayData(study);
              const primaryTag = getPrimaryTag(study);

              return (
                <a
                  key={study.id}
                  href={`/work/${study.slug}`}
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
                      return;
                    }
                    e.preventDefault();
                    onSelectCaseStudy(study);
                    onNavigate(`/work/${study.slug}`);
                  }}
                  className="work-icard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C] focus-visible:ring-offset-2"
                  aria-label={`Explore flagship work: ${cardData.h3}`}
                >
                  {/* Left Image (flex: 0 0 46%) */}
                  <div className="work-icard-image">
                    <img
                      src={`${cardData.imagePrefix}.webp`}
                      srcSet={`${cardData.imagePrefix}-480.webp 480w, ${cardData.imagePrefix}-800.webp 800w, ${cardData.imagePrefix}.webp 1600w`}
                      sizes="(max-width: 560px) 100vw, 46vw"
                      alt={cardData.h3}
                      width={480}
                      height={320}
                      loading={isEager ? "eager" : "lazy"}
                      decoding={isEager ? "sync" : "async"}
                      {...(isFirst ? { fetchPriority: "high" } : {})}
                    />
                  </div>

                  {/* Right Body Content */}
                  <div className="work-icard-body">
                    <div className="mb-2.5 flex flex-wrap items-center gap-2">
                      <Tag variant="default" className="!bg-[#121517] !text-[#FAF8F5] !border-transparent">
                        {primaryTag}
                      </Tag>
                      {study.slug === "performance-score" && (
                        <span className="font-mono text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]/40 shadow-2xs">
                          UNLAUNCHED · DEVELOPMENT-READY PRD
                        </span>
                      )}
                    </div>

                    <h3 className="font-onest font-semibold text-[24px] leading-[28.8px] tracking-[-0.48px] text-[#121517] mb-2">
                      {cardData.h3}
                    </h3>

                    <p className="font-inter text-[14px] leading-[19px] text-[#121517]/65 line-clamp-3">
                      {cardData.desc}
                    </p>

                    <div className="flex-1 min-h-[16px]" />

                    <div className="pt-3 border-t border-[#121517]/8">
                      <div className="font-onest font-semibold text-[32px] leading-tight tracking-[-0.64px] text-[#121517] tabular-nums">
                        {cardData.figure}
                      </div>
                      <div className="font-inter text-[14px] text-[#121517]/60">
                        {cardData.qual}
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: APPLIED AI (Things I built)
            ========================================================================= */}
        <section className="mb-20 md:mb-28 pt-10 border-t border-[#121517]/10">
          <div className="max-w-3xl mb-8">
            <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#121517] tracking-tight">
              Things I built.
            </h2>
            <p className="font-inter text-sm sm:text-base text-[#121517]/70 leading-relaxed mt-2">
              AI products I designed and built to explore grounded intelligence, multi-lingual voice, and product decision systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* ── 01. Dīpa (Flagship AI Product) ────────────────────── */}
            <div className="bg-[#FAF8F5] rounded-[20px] p-6 sm:p-7 border border-[#121517]/10 flex flex-col justify-between transition-all duration-240 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(18,21,23,0.06)]">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <SectionLabel number="01" label="Dīpa (Flagship)" color="amber" />
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-black/10 font-mono text-[10px] text-[#121517] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8FD44A]" />
                    Live System
                  </span>
                </div>

                <h3 className="font-onest font-semibold text-[22px] sm:text-[24px] leading-[28px] tracking-[-0.48px] text-[#121517] mb-2">
                  Dīpa
                </h3>

                <p className="font-inter text-[14.5px] leading-[21px] text-[#121517] font-medium mb-3">
                  A live, multilingual voice copilot that answers questions about my work, grounded in evidence and evaluated before it ships.
                </p>

                {/* Proof Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 pb-3">
                  <span className="px-2 py-0.5 rounded-md bg-white border border-black/[0.08] font-mono text-[10.5px] text-[#4A525A] font-semibold">
                    RAG with citations
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-black/[0.08] font-mono text-[10.5px] text-[#4A525A] font-semibold">
                    Golden eval set: 19 of 20
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-black/[0.08] font-mono text-[10.5px] text-[#A8711A] font-semibold">
                    Voice in 5 Indian languages (Sarvam AI)
                  </span>
                </div>

                <div className="pt-3 border-t border-[#121517]/8 mb-5">
                  <p className="font-inter text-xs text-[#121517]/65 leading-relaxed">
                    In-memory cosine retrieval · Refusal gate (&lt;0.68) · Sub-second latency · Zero hosted vector DB costs
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <GlassButton
                  variant="primary"
                  size="sm"
                  icon={<ArrowRight size={13} />}
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("open-copilot"));
                    }
                  }}
                >
                  TRY DĪPA
                </GlassButton>
                <GlassButton
                  as="a"
                  href="/work/dipa"
                  variant="secondary"
                  size="sm"
                  icon={<ArrowRight size={13} />}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/work/dipa");
                  }}
                >
                  HOW IT WORKS
                </GlassButton>
              </div>
            </div>

            {/* ── 02. Product Jury (In progress) ────────────────────── */}
            <div className="bg-[#F5F3EF] rounded-[20px] p-6 sm:p-7 border border-[#121517]/8 flex flex-col justify-between transition-all duration-240 hover:-translate-y-1 hover:bg-[#EFECE6] hover:shadow-[0_12px_32px_rgba(18,21,23,0.06)]">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <SectionLabel number="02" label="Product Jury" color="amber" />
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-black/10 font-mono text-[10.5px] font-semibold text-[#A8711A] uppercase tracking-wider">
                    In progress
                  </span>
                </div>

                <h3 className="font-onest font-semibold text-[22px] sm:text-[24px] leading-[28px] tracking-[-0.48px] text-[#121517] mb-2">
                  Product Jury
                </h3>

                <p className="font-inter text-[13.5px] font-semibold text-[#121517] mb-3">
                  A decision system for product managers.
                </p>

                {/* Three short lines */}
                <div className="space-y-2 pt-2 pb-3 text-left">
                  <div className="font-inter text-xs text-[#4A525A] leading-relaxed">
                    <strong className="text-[#121517] font-semibold">The problem it explores:</strong> Making product calls you can defend and preserving the defense—separating evidence from inference and assumption before committing roadmap resources.
                  </div>
                  <div className="font-inter text-xs text-[#4A525A] leading-relaxed">
                    <strong className="text-[#121517] font-semibold">What&apos;s built so far:</strong> Multi-agent product decision system (Evidence &rarr; Decision &rarr; Red Team &rarr; Record) with structured verdict cards and evidence classification.
                  </div>
                  <div className="font-inter text-xs text-[#4A525A] leading-relaxed">
                    <strong className="text-[#121517] font-semibold">What&apos;s next:</strong> Expanded rubrics for pricing and positioning calls, interactive red-teaming simulations, and shared decision audit logs.
                  </div>
                </div>

                <div className="pt-3 border-t border-[#121517]/8 mb-5">
                  <p className="font-mono text-[11px] text-[#4A525A] font-medium text-center">
                    Evidence &rarr; Decision &rarr; Red Team &rarr; Record
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <GlassButton
                  as="a"
                  href="/writing/product-jury"
                  variant="primary"
                  size="sm"
                  icon={<ArrowRight size={13} />}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/writing/product-jury");
                  }}
                >
                  EXPLORE PRODUCT JURY
                </GlassButton>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: MORE PRODUCT WORK (Filterable Library of 23 Structured Stories)
            ========================================================================= */}
        <section id="more-work" className="pt-10 border-t border-[#121517]/10">
          <div className="max-w-3xl mb-8">
            <h2 className="font-onest text-3xl sm:text-4xl font-bold text-[#121517] tracking-tight">
              More product work
            </h2>
            <p className="font-inter text-base text-[#121517]/80 leading-relaxed mt-2">
              Smaller PM stories across the products, platforms and systems I&apos;ve worked on.
            </p>
            <p className="font-inter text-sm text-[#121517]/60 mt-1">
              Explore by problem space, product type or capability.
            </p>
          </div>

          {/* Filter Pills (Exactly 6 primary filters) + Dynamic Project Counter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[#121517]/8 pb-6">
            <div className="flex flex-wrap items-center gap-2">
              {moreWorkFilters.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-inter font-medium transition-[background-color,color,border-color,box-shadow] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C]/40 ${
                    selectedCategory === cat
                      ? "bg-[#121517] text-[#FAF8F5] shadow-xs"
                      : "bg-white text-[#121517]/70 hover:text-[#121517] border border-[#121517]/10 hover:border-[#121517]/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <span className="font-mono text-xs text-[#121517]/50 font-medium shrink-0">
              {filteredMoreWork.length} {filteredMoreWork.length === 1 ? "project" : "projects"}
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMoreWork.map((item) => (
              <a
                key={item.id}
                href={item.route}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
                    return;
                  }
                  e.preventDefault();
                  onNavigate(item.route);
                }}
                className="group rounded-[20px] bg-white border border-[#121517]/8 hover:border-[#121517]/25 hover:shadow-[0_8px_24px_rgba(18,21,23,0.06)] p-6 transition-all flex flex-col justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C]"
                aria-label={`Read story: ${item.title}`}
              >
                <div>
                  {/* Category & Company */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-[#A8711A]">
                      {item.primaryCategory}
                    </span>
                    <span className="font-inter text-[11px] text-[#121517]/50">
                      {item.company}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-onest text-lg sm:text-xl font-bold text-[#121517] mb-1 group-hover:text-[#A8711A] transition-colors">
                    {item.title}
                  </h3>

                  {/* Story Angle */}
                  <p className="font-inter text-xs sm:text-[13px] font-medium text-[#121517]/75 mb-2.5">
                    {item.storyAngle}
                  </p>

                  {/* Verified Impact / Metric highlight */}
                  {item.metrics && item.metrics.length > 0 && (
                    <div className="font-mono text-[11px] text-[#A8711A] font-semibold mb-3 leading-snug">
                      {item.metrics
                        .filter((m) => m.value && m.label)
                        .slice(0, 2)
                        .map((m) => `${m.value} ${m.label}`)
                        .join(" · ")}
                    </div>
                  )}
                </div>

                <div>
                  {/* Tags (Max 3 concise tags) */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-[#121517]/6 mb-3 font-inter text-[11px] text-[#121517]/60">
                    {item.tags.slice(0, 3).map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-inter font-medium px-2 py-0.5 rounded bg-[#121517]/4 text-[#121517]/70 border border-[#121517]/6"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA link */}
                  <div className="inline-flex items-center gap-1.5 text-xs font-inter font-semibold text-[#121517] group-hover:text-[#A8711A] group-hover:translate-x-0.5 transition-all">
                    <span>Read the story</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
