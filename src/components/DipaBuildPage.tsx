import React, { useEffect } from "react";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2, Mic, Globe, ShieldCheck, HelpCircle } from "lucide-react";
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
    <div className="w-full bg-[#FAF8F5] text-[#121517]">
      {/* =========================================================================
          HERO & HEADER (Calm, Editorial, Technical)
          ========================================================================= */}
      <header className="border-b border-[#121517]/8 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Back Link */}
          <button
            type="button"
            onClick={() => onNavigate("/work")}
            className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#121517]/60 hover:text-[#121517] transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to all work</span>
          </button>

          {/* Tags */}
          <div className="flex items-center gap-2.5 flex-wrap mb-4">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A8711A]">
              DĪPA
            </span>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#121517]/50">
              ·
            </span>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C89B3C]">
              AI-native portfolio assistant
            </span>
            <Tag variant="live" icon={<span className="w-1.5 h-1.5 rounded-full bg-[#A8711A] shrink-0" />}>
              Live on portfolio
            </Tag>
          </div>

          {/* Title & Core Quote */}
          <h1 className="font-onest text-3xl sm:text-5xl font-bold tracking-tight text-[#121517] leading-[1.1] text-balance">
            Dīpa
          </h1>
          <p className="font-onest text-xl sm:text-2xl font-medium text-[#121517]/85 mt-3 leading-snug">
            &ldquo;An AI copilot grounded in my actual product work — not generic model knowledge.&rdquo;
          </p>

          <p className="font-inter text-base sm:text-lg text-[#121517]/70 mt-5 leading-relaxed max-w-3xl">
            Dīpa answers questions about Deepak&apos;s product work, experience, and portfolio using a
            curated, verified knowledge base. It does not scrape the portfolio live at query time; its
            knowledge is synchronized deterministically during each build and deployment.
          </p>

          {/* Metadata bar */}
          <div className="mt-8 pt-6 border-t border-[#121517]/10 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] text-[#121517]/65">
            <span className="font-semibold text-[#121517]">Deepak Prasad</span>
            <span className="text-[#121517]/25">/</span>
            <span>Product Architect &amp; Builder</span>
            <span className="text-[#121517]/25">/</span>
            <span>gemini-embedding-2-preview (512-dim)</span>
            <span className="text-[#121517]/25">/</span>
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
            <span className="font-inter text-xs text-[#121517]/60 ml-2">
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
        <section className="mb-14 pb-12 border-b border-[#121517]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            01 · Grounded Scope
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#121517] tracking-tight mb-4">
            What Dīpa can answer
          </h2>
          <p className="font-inter text-sm sm:text-base text-[#121517]/70 leading-relaxed mb-6">
            Dīpa is built specifically for recruiters, engineering leaders, and founders reviewing this portfolio.
            It provides factual, sourced answers to specific operational and strategic inquiries:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WHAT_DIPA_ANSWERS.map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-[18px] bg-white border border-[#121517]/8 flex flex-col justify-start"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={16} className="text-[#C89B3C] shrink-0" />
                  <h3 className="font-onest text-base font-bold text-[#121517]">
                    {item.title}
                  </h3>
                </div>
                <p className="font-inter text-xs sm:text-[13.5px] text-[#121517]/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: HOW IT WORKS */}
        <section className="mb-14 pb-12 border-b border-[#121517]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            02 · System Flow
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#121517] tracking-tight mb-2">
            How it works
          </h2>
          <p className="font-onest text-lg sm:text-xl font-medium text-[#121517]/80 mb-4">
            &ldquo;From verified portfolio content to grounded answers.&rdquo;
          </p>
          <p className="font-inter text-sm sm:text-base text-[#121517]/70 leading-relaxed max-w-3xl">
            The system separates knowledge ingestion from query execution. Content is converted to dense vectors
            at build time, enabling fast local cosine retrieval and strict confidence evaluation before model generation.
          </p>

          {/* Architecture Visual */}
          <DipaArchitectureDiagram />
        </section>

        {/* SECTION 3: HOW DĪPA STAYS UP TO DATE */}
        <section className="mb-14 pb-12 border-b border-[#121517]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            03 · Knowledge Synchronization
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#121517] tracking-tight mb-4">
            How Dīpa stays up to date
          </h2>

          <div className="p-6 sm:p-7 rounded-[20px] bg-[#FAF8F5] border border-[#121517]/10 space-y-4">
            <p className="font-inter text-base sm:text-[17px] text-[#121517]/85 leading-relaxed">
              Dīpa does not scrape my portfolio live. Instead, it uses a deterministic build-time synchronization process.
              When verified portfolio content changes, the prebuild pipeline regenerates the knowledge base and creates new
              512-dimensional embeddings, stored in the local <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-white border border-[#121517]/15 text-[#121517]">ragKnowledgeBase.json</code>.
              Each deployment therefore ships with a knowledge index generated from the same canonical source as the portfolio.
            </p>
            <p className="font-inter text-sm sm:text-base text-[#121517]/75 leading-relaxed font-medium">
              This keeps Dīpa&apos;s knowledge aligned with the canonical, verified source at each deployment.
            </p>
          </div>
        </section>

        {/* SECTION 4: TECHNICAL DETAILS */}
        <section className="mb-14 pb-12 border-b border-[#121517]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            04 · Architecture Specifications
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#121517] tracking-tight mb-6">
            Technical details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {TECHNICAL_SPEC_ITEMS.map((item) => (
              <div
                key={item.label}
                className="p-5 rounded-[18px] bg-white border border-[#121517]/8 flex flex-col justify-between"
              >
                <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#A8711A] mb-1">
                  {item.label}
                </div>
                <div className="font-onest text-base font-bold text-[#121517] my-1">
                  {item.value}
                </div>
                <div className="font-inter text-xs text-[#121517]/65 mt-1 leading-snug">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: EPISTEMIC MODESTY / CONFIDENCE GATE */}
        <section className="mb-14 pb-12 border-b border-[#121517]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            05 · Safety &amp; Grounding
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#121517] tracking-tight mb-4">
            Epistemic modesty: declining over guessing
          </h2>
          <div className="space-y-4 font-inter text-[15px] sm:text-base text-[#121517]/75 leading-relaxed">
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

        {/* SECTION 6: TECHNICAL CHOICES & TRADE-OFFS */}
        <section className="mb-14 pb-12 border-b border-[#121517]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            06 · Technical Choices &amp; Trade-offs
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#121517] tracking-tight mb-4">
            Why in-memory, why Gemini, and why the golden evaluation set
          </h2>
          <div className="space-y-4 font-inter text-[15px] sm:text-base text-[#121517]/75 leading-relaxed">
            <div className="p-5 rounded-[18px] bg-white border border-[#121517]/8">
              <h3 className="font-onest text-base font-bold text-[#121517] mb-1">
                Why In-Memory CPU Dot-Product vs Pinecone or pgvector?
              </h3>
              <p className="text-xs sm:text-sm text-[#121517]/75 leading-relaxed">
                For a curated portfolio knowledge base of 32 chunks, running external vector database infrastructure (Pinecone, Weaviate, or pgvector) adds monthly costs, network hops (50–150ms latency), and external failure modes. A client-side or serverless in-memory cosine dot-product across 32 512-dimensional vectors executes in &lt;1 millisecond with zero cold-start overhead.
              </p>
            </div>

            <div className="p-5 rounded-[18px] bg-white border border-[#121517]/8">
              <h3 className="font-onest text-base font-bold text-[#121517] mb-1">
                Why Gemini 3.1 Flash-Lite &amp; Embedding-2-Preview?
              </h3>
              <p className="text-xs sm:text-sm text-[#121517]/75 leading-relaxed">
                Flash-Lite provides sub-second time-to-first-token while adhering strictly to negative system prompts (&ldquo;If the retrieved chunks do not contain the answer, say you do not know&rdquo;). Embedding-2-preview at 512 dimensions strikes the ideal balance between semantic nuance and compact payload size (~65KB for the entire precomputed index).
              </p>
            </div>

            <div className="p-5 rounded-[18px] bg-white border border-[#121517]/8">
              <h3 className="font-onest text-base font-bold text-[#121517] mb-1">
                Why a Golden Evaluation Set?
              </h3>
              <p className="text-xs sm:text-sm text-[#121517]/75 leading-relaxed">
                You cannot improve what you cannot benchmark. I created a 15-question golden test suite spanning career metrics, unlaunched project boundaries, and technical architecture questions to verify precision, recall, and strict adherence to refusal thresholds before shipping updates.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7: WHAT WORKED, WHAT BROKE & WHAT COMES NEXT */}
        <section className="mb-14 pb-12 border-b border-[#121517]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            07 · Reality Check
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#121517] tracking-tight mb-4">
            What worked, what broke, and what comes next
          </h2>
          <div className="space-y-4 font-inter text-[15px] sm:text-base text-[#121517]/75 leading-relaxed">
            <p>
              <strong>What worked:</strong> Grounding queries against verified case study chunks prevented fabricated dates, inflated metrics, and inaccurate role attributions. Direct citation links give recruiters instant one-click proof.
            </p>
            <p>
              <strong>What broke in early builds:</strong> Our initial chunking strategy sliced case studies by arbitrary paragraph length rather than semantic boundary. This separated key trade-off rationale from the eventual metric outcome, causing the retriever to occasionally miss context. Re-architecting the knowledge base around structured, semantic decision units fixed this immediately.
            </p>
            <p>
              <strong>What comes next:</strong> Adding interactive follow-up nudges based on recruiter reading depth, exploring streaming conversational voice mode, and open-sourcing the prebuild portfolio-RAG harness for other product craftspeople.
            </p>
          </div>
        </section>

        {/* SECTION 8: VOICE & INDIAN LANGUAGES */}
        <section className="mb-14 pb-12 border-b border-[#121517]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            08 · Voice &amp; Localization
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#121517] tracking-tight mb-4">
            Voice &amp; Indian languages
          </h2>
          <div className="space-y-4 font-inter text-[15px] sm:text-base text-[#121517]/75 leading-relaxed">
            <p>
              To make Dīpa intuitive for visitors across diverse linguistic regions, we added an optional voice interaction pipeline powered by Sarvam AI across English and four major Indian languages: <strong>Hindi (हिन्दी)</strong>, <strong>Kannada (ಕನ್ನಡ)</strong>, <strong>Tamil (தமிழ்)</strong>, and <strong>Telugu (తెలుగు)</strong>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
              <div className="p-4 rounded-xl bg-white border border-[#121517]/8">
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#A8711A] block mb-1">
                  Multi-Modal Speech
                </span>
                <p className="text-xs text-[#121517]/70">
                  Browser MediaRecorder captures audio up to 29s and pipes it directly to speech-to-text without heavy client WAV conversions.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#121517]/8">
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#A8711A] block mb-1">
                  Grounded Core Intact
                </span>
                <p className="text-xs text-[#121517]/70">
                  Non-English questions translate to English for retrieval against our verified in-memory corpus, ensuring zero loss of factual precision.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#121517]/8">
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#A8711A] block mb-1">
                  Local Voice Persona
                </span>
                <p className="text-xs text-[#121517]/70">
                  Synthesized back in the visitor&apos;s language with calibrated male honorifics and natural text-to-speech cadence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: BUILDING ON SARVAM AI: FIELD NOTES */}
        <section className="mb-14 pb-12 border-b border-[#121517]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            09 · Build Log &amp; Learnings
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#121517] tracking-tight mb-2">
            Building on Sarvam AI: field notes
          </h2>
          <p className="font-onest text-lg sm:text-xl font-medium text-[#121517]/80 mb-6">
            A product manager&apos;s build log: why Sarvam, architecture, setup decisions, and production findings.
          </p>

          <div className="space-y-8 font-inter text-[15px] sm:text-base text-[#121517]/80 leading-relaxed">
            {/* a) Why Sarvam */}
            <div className="p-6 rounded-[20px] bg-white border border-[#121517]/8">
              <h3 className="font-onest text-lg font-bold text-[#121517] mb-2 flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-[#A8711A]">a</span>
                Why Sarvam
              </h3>
              <p className="text-sm sm:text-[15px] text-[#121517]/75 leading-relaxed">
                I wanted Dīpa to work for visitors who prefer Indian languages and voice. Sarvam offers speech-to-text, translation and text-to-speech for Indian languages through one API and credit system, and new accounts get free credits to evaluate.
              </p>
            </div>

            {/* b) Architecture & Diagram */}
            <div className="p-6 rounded-[20px] bg-white border border-[#121517]/8">
              <h3 className="font-onest text-lg font-bold text-[#121517] mb-2 flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-[#A8711A]">b</span>
                Architecture
              </h3>
              <p className="text-sm text-[#121517]/70 mb-4">
                The voice pipeline stitches together browser audio, edge proxy translation, and the existing verified RAG core:
              </p>

              {/* Simple Flow Diagram */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8F5] border border-[#121517]/10 overflow-x-auto">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-1.5 min-w-[700px] text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-white border border-[#121517]/10 text-center flex-1">
                    <span className="block font-bold text-[#121517]">Browser</span>
                    <span className="text-[10px] text-[#121517]/60">Recording (MediaRecorder)</span>
                  </div>
                  <span className="text-[#C89B3C] font-bold text-center sm:text-left">&rarr;</span>

                  <div className="p-2.5 rounded-lg bg-white border border-[#121517]/10 text-center flex-1">
                    <span className="block font-bold text-[#121517]">Worker Proxy</span>
                    <span className="text-[10px] text-[#121517]/60">Cloudflare Edge</span>
                  </div>
                  <span className="text-[#C89B3C] font-bold text-center sm:text-left">&rarr;</span>

                  <div className="p-2.5 rounded-lg bg-white border border-[#121517]/10 text-center flex-1">
                    <span className="block font-bold text-[#121517]">Sarvam STT</span>
                    <span className="text-[10px] text-[#A8711A]">saaras:v3</span>
                  </div>
                  <span className="text-[#C89B3C] font-bold text-center sm:text-left">&rarr;</span>

                  <div className="p-2.5 rounded-lg bg-white border border-[#121517]/10 text-center flex-1">
                    <span className="block font-bold text-[#121517]">Translate</span>
                    <span className="text-[10px] text-[#A8711A]">sarvam-translate:v1 (&rarr;en)</span>
                  </div>
                  <span className="text-[#C89B3C] font-bold text-center sm:text-left">&rarr;</span>

                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border-2 border-[#C89B3C]/40 text-center flex-1 shadow-2xs">
                    <span className="block font-bold text-[#121517]">Gemini RAG</span>
                    <span className="text-[10px] text-[#121517]/70">Unchanged retrieval</span>
                  </div>
                  <span className="text-[#C89B3C] font-bold text-center sm:text-left">&rarr;</span>

                  <div className="p-2.5 rounded-lg bg-white border border-[#121517]/10 text-center flex-1">
                    <span className="block font-bold text-[#121517]">Translate Back</span>
                    <span className="text-[10px] text-[#A8711A]">speaker_gender: &quot;male&quot;</span>
                  </div>
                  <span className="text-[#C89B3C] font-bold text-center sm:text-left">&rarr;</span>

                  <div className="p-2.5 rounded-lg bg-white border border-[#121517]/10 text-center flex-1">
                    <span className="block font-bold text-[#121517]">Sarvam TTS</span>
                    <span className="text-[10px] text-[#A8711A]">bulbul:v3 (MP3)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* c) Setup decisions */}
            <div className="p-6 rounded-[20px] bg-white border border-[#121517]/8">
              <h3 className="font-onest text-lg font-bold text-[#121517] mb-3 flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-[#A8711A]">c</span>
                Setup decisions
              </h3>
              <ul className="space-y-3 text-sm sm:text-[14.5px] text-[#121517]/75">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8711A] shrink-0 mt-2" />
                  <span>
                    <strong>Isolated Secret Storage:</strong> My site is hosted by Google AI Studio, which can&apos;t hold a custom secret, so I put the Sarvam key in a separate Cloudflare Worker. The key never reaches the browser.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8711A] shrink-0 mt-2" />
                  <span>
                    <strong>Cost Guardrails:</strong> 15 voice requests per visitor per day, 300 per day site-wide, and an allowed-origin check to prevent quota drains.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8711A] shrink-0 mt-2" />
                  <span>
                    <strong>Concise Answer Caps:</strong> Voice-mode answers are capped at about 3 sentences, so they stay within translation and speech character limits and sound natural when spoken.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8711A] shrink-0 mt-2" />
                  <span>
                    <strong>Reliable Failover:</strong> Every failure, including running out of credits, falls back to text chat with a friendly notice.
                  </span>
                </li>
              </ul>
            </div>

            {/* d) Four findings */}
            <div className="p-6 rounded-[20px] bg-white border border-[#121517]/8">
              <h3 className="font-onest text-lg font-bold text-[#121517] mb-2 flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-[#A8711A]">d</span>
                Four findings: what happened &rarr; what I did &rarr; what I&apos;d suggest
              </h3>
              <p className="text-xs text-[#121517]/60 mb-5">
                Concrete developer friction points and PM recommendations discovered during integration:
              </p>

              <div className="space-y-5">
                {/* Finding 1 */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8F5] border border-[#121517]/8">
                  <h4 className="font-onest text-base font-bold text-[#121517] mb-2">
                    1. Browser audio was rejected
                  </h4>
                  <div className="space-y-2 text-xs sm:text-[13.5px] text-[#121517]/75">
                    <p>
                      <strong>What happened:</strong> Every Chrome recording failed with &ldquo;Invalid file type&rdquo;. Chrome labels recordings <code className="font-mono text-xs px-1 py-0.5 rounded bg-white border border-black/10">&quot;audio/webm;codecs=opus&quot;</code>; the speech-to-text API accepts <code className="font-mono text-xs px-1 py-0.5 rounded bg-white border border-black/10">&quot;audio/webm&quot;</code> but rejects the same type with a codecs parameter, and the docs don&apos;t mention it.
                    </p>
                    <p>
                      <strong>What I did:</strong> I reproduced it with test clips, then normalised the content type in my proxy; Chrome and Safari recordings now work.
                    </p>
                    <p className="text-[#A8711A] font-medium pt-1">
                      <strong>Suggestion:</strong> Accept standard MIME parameters, or document the exact accepted values with a browser example. Any developer building browser voice input will hit this on day one.
                    </p>
                  </div>
                </div>

                {/* Finding 2 */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8F5] border border-[#121517]/8">
                  <h4 className="font-onest text-base font-bold text-[#121517] mb-2">
                    2. Grammatical gender in translation
                  </h4>
                  <div className="space-y-2 text-xs sm:text-[13.5px] text-[#121517]/75">
                    <p>
                      <strong>What happened:</strong> With no setting, &ldquo;How are you?&rdquo; translated to Hindi in the feminine form (<span className="font-hindi font-medium">आप कैसी हैं?</span>). The translate API&apos;s <code className="font-mono text-xs px-1 py-0.5 rounded bg-white border border-black/10">speaker_gender</code> parameter fixed it, but it changed the form used for the person being addressed, not just the speaker, which the name doesn&apos;t suggest.
                    </p>
                    <p>
                      <strong>What I did:</strong> I set it to male to match the male voice.
                    </p>
                    <p className="text-[#A8711A] font-medium pt-1">
                      <strong>Suggestion:</strong> Clarify the parameter&apos;s scope in the docs, and consider an addressee or neutral option for assistants talking to strangers.
                    </p>
                  </div>
                </div>

                {/* Finding 3 */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8F5] border border-[#121517]/8">
                  <h4 className="font-onest text-base font-bold text-[#121517] mb-2">
                    3. Pricing consistency
                  </h4>
                  <div className="space-y-2 text-xs sm:text-[13.5px] text-[#121517]/75">
                    <p>
                      <strong>What happened:</strong> The public pricing page and the API docs listed different translation prices (₹0.005 per character on the pricing page versus ₹20 per 10,000 characters in the docs).
                    </p>
                    <p>
                      <strong>What I did:</strong> Factored conservative budgeting and rate testing into usage forecast models.
                    </p>
                    <p className="text-[#A8711A] font-medium pt-1">
                      <strong>Suggestion:</strong> One source of truth for rates, plus a cost estimator, so developers can forecast spend.
                    </p>
                  </div>
                </div>

                {/* Finding 4 */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8F5] border border-[#121517]/8">
                  <h4 className="font-onest text-base font-bold text-[#121517] mb-2">
                    4. Designing for a prepaid wallet
                  </h4>
                  <div className="space-y-2 text-xs sm:text-[13.5px] text-[#121517]/75">
                    <p>
                      <strong>What happened:</strong> Sarvam&apos;s docs say API calls fail outright once the prepaid balance reaches zero. I haven&apos;t hit that in production; I designed for it up front.
                    </p>
                    <p>
                      <strong>What I did:</strong> Proxy-side limits, a per-visitor and daily cap, and a friendly &ldquo;Voice is resting&rdquo; fallback to text.
                    </p>
                    <p className="text-[#A8711A] font-medium pt-1">
                      <strong>Suggestion:</strong> Low-balance alerts by email or WhatsApp and a small grace buffer for paying accounts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* e) Result */}
            <div className="p-6 rounded-[20px] bg-white border border-[#121517]/8">
              <h3 className="font-onest text-lg font-bold text-[#121517] mb-2 flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-[#A8711A]">e</span>
                Result
              </h3>
              <p className="text-sm sm:text-[15px] text-[#121517]/75 leading-relaxed">
                Voice works end to end in Chrome and Safari across English, Hindi, Kannada, Tamil and Telugu. A typical voice round trip takes about 3 to 4 seconds.
              </p>
            </div>

            {/* f) What I'd do next */}
            <div className="p-6 rounded-[20px] bg-white border border-[#121517]/8">
              <h3 className="font-onest text-lg font-bold text-[#121517] mb-2 flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-[#A8711A]">f</span>
                What I&apos;d do next
              </h3>
              <p className="text-sm sm:text-[15px] text-[#121517]/75 leading-relaxed">
                Measure which languages visitors actually choose, and test whether voice changes how many questions they ask.
              </p>
            </div>
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
