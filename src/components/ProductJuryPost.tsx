import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  Scale,
  Sparkles,
  Layers,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import GlassButton from "./ui/GlassButton";
import Tag from "./ui/Tag";
import SectionLabel from "./ui/SectionLabel";
import { ProductSummary } from "./product-jury/ProductSummary";
import { DecisionLoopVisual } from "./product-jury/DecisionLoopVisual";
import { ComparisonVisual } from "./product-jury/ComparisonVisual";
import { DecisionHierarchyVisual } from "./product-jury/DecisionHierarchyVisual";
import { MagicMoments } from "./product-jury/MagicMoments";
import { RoadmapPhasing } from "./product-jury/RoadmapPhasing";
import { HumanVsAiSplit } from "./product-jury/HumanVsAiSplit";
import { TrustAndQuality } from "./product-jury/TrustAndQuality";
import { WorkedDecisionWalkthrough } from "./product-jury/WorkedDecisionWalkthrough";
import { PlannedMeasures } from "./product-jury/PlannedMeasures";
import { OpenProductQuestions } from "./product-jury/OpenProductQuestions";

interface ProductJuryPostProps {
  onNavigate: (path: string) => void;
}

const NAV_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "the-loop", label: "The Loop" },
  { id: "comparison", label: "Comparison" },
  { id: "how-it-works", label: "Hierarchy" },
  { id: "magic-moments", label: "Magic Moments" },
  { id: "scope", label: "Roadmap" },
  { id: "human-vs-ai", label: "PM vs AI" },
  { id: "trust", label: "Trust & Privacy" },
  { id: "example", label: "Worked Example" },
  { id: "measures", label: "Measures" },
  { id: "open-questions", label: "Open Questions" },
];

export default function ProductJuryPost({ onNavigate }: ProductJuryPostProps) {
  const [activeNav, setActiveNav] = useState<string>("overview");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const scrollToSection = (id: string) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-[#FAFDFB] text-[#042718]">
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <header className="border-b border-[#042718]/8 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 sm:pt-14 sm:pb-18">
          {/* Back to all work button */}
          <button
            type="button"
            onClick={() => onNavigate("/work")}
            className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#042718]/60 hover:text-[#042718] transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to all work</span>
          </button>

          {/* Eyebrow: PRODUCT IN BUILD */}
          <div className="flex items-center gap-2.5 flex-wrap mb-4">
            <Tag variant="amber" icon={<span className="w-1.5 h-1.5 rounded-full bg-[#A8711A] shrink-0" />}>
              PRODUCT IN BUILD
            </Tag>
            <span className="text-[#042718]/30">·</span>
            <span className="font-mono text-[10px] font-medium text-[#042718]/65">
              An active product exploration
            </span>
          </div>

          {/* Main Title & Subheadline */}
          <h1 className="font-onest text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#042718] leading-[1.08]">
            Product Jury
          </h1>
          <p className="font-onest text-lg sm:text-2xl font-medium text-[#042718]/85 mt-2 leading-snug">
            A decision system for product managers.
          </p>

          {/* Prominent Thesis Quote */}
          <blockquote className="my-6 pl-4 sm:pl-5 border-l-2 border-[#D9A94C] font-playfair italic text-lg sm:text-2xl text-[#042718] leading-[1.35]">
            &ldquo;Make a product call you can defend — and keep the defence.&rdquo;
          </blockquote>

          {/* Short Explanation */}
          <div className="space-y-3 font-inter text-sm sm:text-base text-[#042718]/75 max-w-2xl leading-relaxed">
            <p>
              Why I&apos;m building this: AI can generate 50 product ideas in 10 seconds. But who evaluates whether those ideas are any good?
            </p>
            <p>
              Product decisions often disappear after the meeting. The reasoning, evidence, assumptions, objections, and trade-offs rarely survive as a persistent decision record. Product Jury is an active build and research project designed to turn that judgment into something a PM can challenge, defend, revisit, and learn from.
            </p>
          </div>

          {/* Action Row: CTA to loop + Status Indicator (Strictly NO GitHub) */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-6 border-t border-[#042718]/10">
            <GlassButton
              variant="primary"
              size="md"
              icon={<ArrowDown size={15} className="group-hover:translate-y-0.5 transition-transform" />}
              onClick={() => scrollToSection("the-loop")}
              className="group"
            >
              See how the decision loop works
            </GlassButton>

            <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#042718]/65">
              <span className="w-2 h-2 rounded-full bg-[#2F7A4F] shrink-0" />
              <span>Researching · Designing · Prototyping</span>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          STICKY SECTION NAVIGATION
          ========================================================================= */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#042718]/10 shadow-[0_2px_8px_rgba(4,39,24,0.02)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 scrollbar-none text-xs font-mono">
            {NAV_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToSection(sec.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  activeNav === sec.id
                    ? "bg-[#042718] text-white font-semibold"
                    : "text-[#042718]/65 hover:text-[#042718] hover:bg-[#FAF8F5]"
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* =========================================================================
          EDITORIAL SECTIONS CONTAINER
          ========================================================================= */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* 1. Executive Summary: The product in 60 seconds */}
        <ProductSummary />

        {/* 2. Core Decision Loop Visually */}
        <DecisionLoopVisual />

        {/* 3. Product Positioning: General AI vs Product Jury */}
        <ComparisonVisual />

        {/* 4. Core Concept: Decision vs Version vs Verdict */}
        <DecisionHierarchyVisual />

        {/* 5. Five Magic Moments */}
        <MagicMoments />

        {/* 6. Staging: Roadmap MVP -> P1 -> P2 */}
        <RoadmapPhasing />

        {/* 7. Responsibility: PM vs System */}
        <HumanVsAiSplit />

        {/* 8. Trust & AI Quality + Privacy */}
        <TrustAndQuality />

        {/* 9. Worked Example: Maya's decision walkthrough */}
        <WorkedDecisionWalkthrough />

        {/* 10. Planned Product Measures */}
        <PlannedMeasures />

        {/* 11. Open Product Questions & Non-Goals */}
        <OpenProductQuestions />

        {/* =========================================================================
            FINAL SECTION: THE THESIS
            ========================================================================= */}
        <section className="pt-14 pb-16">
          <div className="p-8 sm:p-12 rounded-[28px] bg-[#042718] text-white text-center border border-[#042718] shadow-md">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#D9A94C] font-bold block mb-3">
              The Thesis
            </span>
            <h2 className="font-onest text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              &ldquo;The record is the product.&rdquo;
            </h2>
            <p className="font-inter text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed mb-8">
              Product Jury isn&apos;t trying to give PMs a better opinion. It&apos;s trying to give them a decision they can defend, revisit, and learn from.
            </p>

            <div className="flex justify-center">
              <GlassButton
                variant="secondary"
                size="md"
                icon={<ArrowLeft size={15} />}
                iconPosition="left"
                onClick={() => onNavigate("/work")}
                className="!bg-white !text-[#042718] hover:!bg-white/90"
              >
                Back to all work
              </GlassButton>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
