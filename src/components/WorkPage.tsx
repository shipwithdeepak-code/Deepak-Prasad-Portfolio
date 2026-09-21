import React, { useState } from "react";
import {
  Database,
  Activity,
  Terminal,
  Cpu,
} from "lucide-react";
import {
  ALL_FLAGSHIP_CASE_STUDIES,
  MORE_WORK_CATEGORIES,
} from "../data/caseStudies";
import { CaseStudyDetail } from "../types";

interface WorkPageProps {
  onNavigate: (path: string) => void;
  onSelectCaseStudy: (caseStudy: CaseStudyDetail) => void;
}

export default function WorkPage({
  onNavigate,
  onSelectCaseStudy,
}: WorkPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Flagships" },
    { id: "b2b", label: "B2B & Platforms" },
    { id: "ai", label: "AI & Consumer" },
    { id: "monetization", label: "Monetization & Growth" },
    { id: "connected", label: "Connected Products" },
  ];

  const getPrimaryTag = (study: CaseStudyDetail): string => {
    if (study.slug === "reshamandi") return "B2B Marketplace";
    if (study.slug === "ai-coach") return "Conversational AI";
    if (study.slug === "subscription") return "Monetization";
    if (study.slug === "performance-score") return "Algorithms";
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
          desc: "Took an ambiguous AI opportunity to production in three months, behind hard safety guardrails.",
          figure: "3,200+",
          qual: "daily actives, up from 300",
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
          desc: "Four surfaces sampled at different cadences and disagreed about the same body. Reconciling cadence was the product.",
          figure: "174,000",
          qual: "users on one score, five surfaces",
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

  const filteredStudies = ALL_FLAGSHIP_CASE_STUDIES.filter((study) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "b2b")
      return study.tags.includes("B2B") || study.tags.includes("Marketplace");
    if (selectedCategory === "ai")
      return (
        study.tags.includes("AI") || study.tags.includes("Conversational AI")
      );
    if (selectedCategory === "monetization")
      return (
        study.tags.includes("Growth") || study.tags.includes("Monetization")
      );
    if (selectedCategory === "connected")
      return (
        study.tags.includes("Connected Products") ||
        study.tags.includes("Product Strategy")
      );
    return true;
  });

  const getCategoryIcon = (category: string) => {
    if (category.includes("B2B"))
      return <Database size={16} className="text-[#15803D]" />;
    if (category.includes("Sports"))
      return <Activity size={16} className="text-[#0268A1]" />;
    if (category.includes("Automation"))
      return <Terminal size={16} className="text-[#7E22CE]" />;
    return <Cpu size={16} className="text-[#B45209]" />;
  };

  return (
    <div className="w-full bg-[#FAFDFB] text-[#042718] py-12 md:py-20">
      <style>{`
        .work-index-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 430px), 1fr));
          gap: clamp(18px, 2.4vw, 34px);
        }
        .work-icard {
          background: #F1F1EC;
          border-radius: 20px;
          padding: 10px;
          display: flex;
          gap: 20px;
          cursor: pointer;
          transition: transform 240ms ease, background 240ms ease, box-shadow 240ms ease;
          text-decoration: none;
        }
        .work-icard-image {
          flex: 0 0 46%;
          border-radius: 12px;
          object-fit: cover;
          align-self: stretch;
          overflow: hidden;
          background: #E5E5DF;
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
            background: #EDEDE7;
            box-shadow: 0 12px 32px rgba(4, 39, 24, 0.08);
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
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase text-[#A8711A] tracking-[0.24em] font-semibold mb-3 block">
            All work
          </span>
          <h1 className="font-onest text-4xl sm:text-5xl font-bold tracking-tight text-[#042718] leading-[1.15] mb-4">
            Everything that went live, and{" "}
            <em className="font-playfair italic font-medium text-[#042718]/70 not-italic">
              what it moved
            </em>
          </h1>
          <p className="font-inter text-base sm:text-lg text-[#042718]/70 leading-relaxed font-normal">
            Five have a page of their own. The rest are listed underneath.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-[#042718]/8 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-inter font-medium transition-[background-color,color,border-color,box-shadow] cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#042718] text-white shadow-xs"
                  : "bg-white text-[#042718]/70 hover:text-[#042718] border border-[#042718]/10 hover:border-[#042718]/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Flagship Case Studies Grid */}
        <div className="work-index-grid mb-24">
          {filteredStudies.map((study, idx) => {
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
                className="work-icard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#188E39] focus-visible:ring-offset-2"
                aria-label={`Explore work: ${cardData.h3}`}
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
                  {/* One pill tag only */}
                  <div className="mb-2.5">
                    <span className="inline-block rounded-[100px] bg-[#042718] text-white px-2.5 py-1 text-[12px] font-inter font-medium leading-none">
                      {primaryTag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-onest font-semibold text-[24px] leading-[28.8px] tracking-[-0.48px] text-[#042718] mb-2">
                    {cardData.h3}
                  </h3>

                  {/* Description */}
                  <p className="font-inter text-[14px] leading-[19px] text-[#042718]/56 line-clamp-3">
                    {cardData.desc}
                  </p>

                  {/* Spacer */}
                  <div className="flex-1 min-h-[16px]" />

                  {/* Figure & Qualifier */}
                  <div className="pt-3 border-t border-[#042718]/8">
                    <div className="font-onest font-semibold text-[32px] leading-tight tracking-[-0.64px] text-[#042718] tabular-nums">
                      {cardData.figure}
                    </div>
                    <div className="font-inter text-[14px] text-[#042718]/56">
                      {cardData.qual}
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* =========================================================================
            MORE WORK (SECTION 13)
            ========================================================================= */}
        <section id="more-work" className="pt-8 border-t border-[#042718]/10">
          <div className="max-w-3xl mb-8 md:mb-12">
            <h2 className="font-onest text-[34px] sm:text-[44px] md:text-[54px] font-semibold text-[#042718] leading-[1.12] tracking-tight md:tracking-[-2px]">
              More work
            </h2>
            <p className="font-inter text-[15px] md:text-[18px] text-[#042718]/80 leading-relaxed max-w-[640px] mt-4">
              A record of platform extensions, operational pipelines, CRM/ERP integrations, and earlier hardware product initiatives.
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {MORE_WORK_CATEGORIES.map((cat, cIdx) => (
              <div key={cIdx} className="bg-white rounded-[24px] border border-[#042718]/8 p-6 sm:p-8 shadow-2xs">
                <div className="flex items-center gap-3 mb-2">
                  {getCategoryIcon(cat.category)}
                  <h3 className="font-onest text-xl sm:text-2xl font-bold text-[#042718]">
                    {cat.category}
                  </h3>
                </div>
                <p className="font-inter text-xs sm:text-sm text-[#042718]/60 mb-6">
                  {cat.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cat.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="rounded-[16px] bg-[#FAFDFB] hover:bg-[#F4FAFA] border border-[#042718]/6 p-5 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-onest text-base font-bold text-[#042718]">
                            {item.title}
                          </h4>
                          <span className="text-[11px] font-inter font-semibold text-[#188E39] px-2 py-0.5 rounded-full bg-[#188E39]/10 shrink-0">
                            {item.scope}
                          </span>
                        </div>
                        <p className="font-inter text-xs sm:text-[13px] text-[#042718]/70 leading-relaxed mb-4">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#042718]/5">
                        {item.tags.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-inter font-medium px-2 py-0.5 rounded bg-white text-[#042718]/60 border border-[#042718]/5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

