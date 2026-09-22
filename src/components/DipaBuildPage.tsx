import React, { useEffect } from "react";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { DipaArchitectureDiagram } from "./DipaArchitectureDiagram";
import GlassButton from "./ui/GlassButton";
import Tag from "./ui/Tag";
import SectionLabel from "./ui/SectionLabel";

interface DipaBuildPageProps {
  onNavigate: (path: string) => void;
}

const TECHNICAL_SPEC_ITEMS = [
  {
    label: "Embedding",
    value: "gemini-embedding-2-preview",
    detail: "512 dimensions",
  },
  {
    label: "Knowledge index",
    value: "ragKnowledgeBase.json",
    detail: "32 curated semantic chunks",
  },
  {
    label: "Retrieval",
    value: "Cosine similarity",
    detail: "In-memory exact dot-product on CPU",
  },
  {
    label: "Confidence gate",
    value: "0.68",
    detail: "Strict threshold for grounded generation",
  },
  {
    label: "Generation",
    value: "gemini-3.1-flash-lite",
    detail: "Constrained synthesis with direct citations",
  },
  {
    label: "Knowledge synchronization",
    value: "Build-time / deployment",
    detail: "Prebuild pipeline regenerates index",
  },
];

const WHAT_DIPA_ANSWERS = [
  {
    title: "Project Ownership & Decisions",
    desc: "Direct answers to questions regarding Deepak's exact role, team boundaries, and strategic trade-offs across his flagship case studies.",
  },
  {
    title: "Verified Case Study Metrics",
    desc: "Specific numbers and operational context (e.g. ReshaMandi mandi workflows, instant payout adoption, Sportstech AI Coach primary/fallback mechanics).",
  },
  {
    title: "Operating Principles & Background",
    desc: "His core design and engineering philosophies, domain experience, and technical perspectives.",
  },
  {
    title: "Direct Citation Attribution",
    desc: "Every grounded answer provides clickable citation tags mapping claims directly back to the verified source portfolio case studies.",
  },
];

export default function DipaBuildPage({ onNavigate }: DipaBuildPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const handleOpenDipa = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-copilot"));
    }
  };

  return (
    <div className="w-full bg-[#FAFDFB] text-[#042718]">
      {/* =========================================================================
          HERO & HEADER (Calm, Editorial, Technical)
          ========================================================================= */}
      <header className="border-b border-[#042718]/8 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Back Link */}
          <button
            type="button"
            onClick={() => onNavigate("/work")}
            className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#042718]/60 hover:text-[#042718] transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to all work</span>
          </button>

          {/* Tags */}
          <div className="flex items-center gap-2.5 flex-wrap mb-4">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A8711A]">
              DĪPA
            </span>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#042718]/50">
              ·
            </span>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2F7A4F]">
              AI-native portfolio assistant
            </span>
            <Tag variant="live" icon={<span className="w-1.5 h-1.5 rounded-full bg-[#6FBE8C] shrink-0" />}>
              Live on portfolio
            </Tag>
          </div>

          {/* Title & Core Quote */}
          <h1 className="font-onest text-3xl sm:text-5xl font-bold tracking-tight text-[#042718] leading-[1.1] text-balance">
            Dīpa
          </h1>
          <p className="font-onest text-xl sm:text-2xl font-medium text-[#042718]/85 mt-3 leading-snug">
            &ldquo;An AI copilot grounded in my actual product work — not generic model knowledge.&rdquo;
          </p>

          <p className="font-inter text-base sm:text-lg text-[#042718]/70 mt-5 leading-relaxed max-w-3xl">
            Dīpa answers questions about Deepak&apos;s product work, experience, and portfolio using a
            curated, verified knowledge base. It does not scrape the portfolio live at query time; its
            knowledge is synchronized deterministically during each build and deployment.
          </p>

          {/* Metadata bar */}
          <div className="mt-8 pt-6 border-t border-[#042718]/10 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] text-[#042718]/65">
            <span className="font-semibold text-[#042718]">Deepak Prasad</span>
            <span className="text-[#042718]/25">/</span>
            <span>Product Architect &amp; Builder</span>
            <span className="text-[#042718]/25">/</span>
            <span>gemini-embedding-2-preview (512-dim)</span>
            <span className="text-[#042718]/25">/</span>
            <span>gemini-3.1-flash-lite</span>
          </div>

          {/* Interactive Launcher Action */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <GlassButton
              variant="primary"
              size="md"
              icon={
                <span className="flex items-center gap-1.5">
                  <Sparkles size={15} className="text-[#C8F07A]" />
                </span>
              }
              iconPosition="left"
              onClick={handleOpenDipa}
            >
              <span className="flex items-center gap-1.5">
                <span>Ask Dīpa a question</span>
                <ArrowRight size={15} />
              </span>
            </GlassButton>
            <span className="font-inter text-xs text-[#042718]/60 ml-2">
              Opens the conversational drawer directly on this page
            </span>
          </div>
        </div>
      </header>

      {/* =========================================================================
          EDITORIAL CONTENT & ARCHITECTURE
          ========================================================================= */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* SECTION 1: WHAT DĪPA ANSWERS */}
        <section className="mb-14 pb-12 border-b border-[#042718]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            01 · Grounded Scope
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] tracking-tight mb-4">
            What Dīpa can answer
          </h2>
          <p className="font-inter text-sm sm:text-base text-[#042718]/70 leading-relaxed mb-6">
            Dīpa is built specifically for recruiters, engineering leaders, and founders reviewing this portfolio.
            It provides factual, sourced answers to specific operational and strategic inquiries:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WHAT_DIPA_ANSWERS.map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-[18px] bg-white border border-[#042718]/8 flex flex-col justify-start"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={16} className="text-[#2F7A4F] shrink-0" />
                  <h3 className="font-onest text-base font-bold text-[#042718]">
                    {item.title}
                  </h3>
                </div>
                <p className="font-inter text-xs sm:text-[13.5px] text-[#042718]/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: HOW IT WORKS */}
        <section className="mb-14 pb-12 border-b border-[#042718]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            02 · System Flow
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] tracking-tight mb-2">
            How it works
          </h2>
          <p className="font-onest text-lg sm:text-xl font-medium text-[#042718]/80 mb-4">
            &ldquo;From verified portfolio content to grounded answers.&rdquo;
          </p>
          <p className="font-inter text-sm sm:text-base text-[#042718]/70 leading-relaxed max-w-3xl">
            The system separates knowledge ingestion from query execution. Content is converted to dense vectors
            at build time, enabling fast local cosine retrieval and strict confidence evaluation before model generation.
          </p>

          {/* Architecture Visual */}
          <DipaArchitectureDiagram />
        </section>

        {/* SECTION 3: HOW DĪPA STAYS UP TO DATE */}
        <section className="mb-14 pb-12 border-b border-[#042718]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            03 · Knowledge Synchronization
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] tracking-tight mb-4">
            How Dīpa stays up to date
          </h2>

          <div className="p-6 sm:p-7 rounded-[20px] bg-[#FAF8F5] border border-[#042718]/10 space-y-4">
            <p className="font-inter text-base sm:text-[17px] text-[#042718]/85 leading-relaxed">
              Dīpa does not scrape my portfolio live. Instead, it uses a deterministic build-time synchronization process.
              When verified portfolio content changes, the prebuild pipeline regenerates the knowledge base and creates new
              512-dimensional embeddings, stored in the local <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-white border border-[#042718]/15 text-[#042718]">ragKnowledgeBase.json</code>.
              Each deployment therefore ships with a knowledge index generated from the same canonical source as the portfolio.
            </p>
            <p className="font-inter text-sm sm:text-base text-[#042718]/75 leading-relaxed font-medium">
              This keeps Dīpa&apos;s knowledge aligned with the canonical, verified source at each deployment.
            </p>
          </div>
        </section>

        {/* SECTION 4: TECHNICAL DETAILS */}
        <section className="mb-14 pb-12 border-b border-[#042718]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            04 · Architecture Specifications
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] tracking-tight mb-6">
            Technical details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {TECHNICAL_SPEC_ITEMS.map((item) => (
              <div
                key={item.label}
                className="p-5 rounded-[18px] bg-white border border-[#042718]/8 flex flex-col justify-between"
              >
                <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#A8711A] mb-1">
                  {item.label}
                </div>
                <div className="font-onest text-base font-bold text-[#042718] my-1">
                  {item.value}
                </div>
                <div className="font-inter text-xs text-[#042718]/65 mt-1 leading-snug">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: EPISTEMIC MODESTY / CONFIDENCE GATE */}
        <section className="mb-14 pb-12 border-b border-[#042718]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            05 · Safety &amp; Grounding
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] tracking-tight mb-4">
            Epistemic modesty: declining over guessing
          </h2>
          <div className="space-y-4 font-inter text-[15px] sm:text-base text-[#042718]/75 leading-relaxed">
            <p>
              In an executive portfolio, a plausible hallucination destroys credibility far faster than an honest abstention.
              If a visitor asks about topics not covered in the verified corpus—such as non-work personal trivia or
              unworked domains—the top cosine similarity falls below the <strong>0.68</strong> threshold.
            </p>
            <p>
              When this happens, Dīpa deliberately suppresses model generation and returns a transparent fallback message
              offering a direct channel to book time or email Deepak. Grounding is prioritized over chattiness.
            </p>
          </div>
        </section>

        {/* BOTTOM CTA BAR */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <GlassButton
            variant="primary"
            size="md"
            icon={<ArrowRight size={15} />}
            onClick={handleOpenDipa}
            className="w-full sm:w-auto"
          >
            <span className="flex items-center gap-2">
              <Sparkles size={15} className="text-[#C8F07A]" />
              <span>Try Dīpa</span>
            </span>
          </GlassButton>

          <GlassButton
            variant="secondary"
            size="md"
            icon={<ArrowLeft size={15} />}
            iconPosition="left"
            onClick={() => onNavigate("/work")}
            className="w-full sm:w-auto"
          >
            Back to all work
          </GlassButton>
        </div>
      </article>
    </div>
  );
}
