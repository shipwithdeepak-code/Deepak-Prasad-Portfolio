import React, { useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Terminal,
} from "lucide-react";

interface DipaBuildPageProps {
  onNavigate: (path: string) => void;
}

const WHAT_I_BUILT = [
  {
    title: "Portfolio-Aware Grounded Answers",
    description:
      "Direct answers to recruiter and hiring manager questions regarding specific product ownership, verified metrics, timelines, and decision trade-offs.",
  },
  {
    title: "Sub-2ms In-Memory Retrieval",
    description:
      "A deterministic in-memory vector index computing cosine similarity over typed Float32 arrays directly on CPU, bypassing hosted vector DB latency.",
  },
  {
    title: "Strict Confidence Gating",
    description:
      "A similarity gate (threshold 0.40–0.68) that halts generation and declines to guess when queries drift out of domain, redirecting users to direct booking.",
  },
  {
    title: "Verified Citation Provenance",
    description:
      "Every factual claim generated links back to source case studies, allowing readers to verify the underlying artifacts and context instantly.",
  },
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    name: "Corpus Ingestion & Atomic Chunking",
    desc: "45 curated semantic chunks extracted from flagship case studies, resume data, and product frameworks, strictly bounded to prevent metric leakage across unrelated projects.",
  },
  {
    step: "02",
    name: "Precomputed Dense Embeddings",
    desc: "text-embedding-004 generates 512-dimensional dense embeddings stored in a static JSON file baked at build time. Zero runtime embedding calls for known corpus texts.",
  },
  {
    step: "03",
    name: "In-Memory Cosine Similarity Calculation",
    desc: "When a user asks a question, the query vector is compared against all 45 stored vectors via dot-product in <2ms on CPU, completely eliminating remote database network hops.",
  },
  {
    step: "04",
    name: "Confidence Gate & Hallucination Guardrail",
    desc: "Retrieval results below the similarity threshold trigger an honest fallback response: 'I don't have verified notes on that topic in Deepak's portfolio,' offering an email or booking link.",
  },
  {
    step: "05",
    name: "Grounded Synthesis with Direct Citations",
    desc: "Gemini 2.5 Flash receives the top-ranked context chunks and synthesizes an objective, factual answer with clickable citation chips linking to the corresponding case studies.",
  },
];

const KEY_DECISIONS = [
  {
    title: "In-memory index over hosted vector databases",
    decision:
      "Stored precomputed embeddings in an in-memory JSON array rather than provisioning Pinecone, Weaviate, or Milvus.",
    why:
      "For a domain portfolio corpus of ~45–100 chunks, a remote database call adds 50–150ms of network latency, monthly SaaS bills, and operational failure points. Local CPU dot product executes in under 2ms with zero infrastructure overhead.",
    tradeoff:
      "Corpus updates cannot be streamed dynamically from external web scrapers; they are baked deterministically at build time.",
  },
  {
    title: "Epistemic modesty: declining over plausible guessing",
    decision:
      "Configured strict prompt constraints and similarity gating to decline queries that lack direct source evidence.",
    why:
      "In a hiring portfolio, hallucinating an unverified metric or claiming ownership of unworked domains destroys credibility permanently. Saying 'I cannot establish this from the evidence' proves integrity.",
    tradeoff:
      "The assistant answers fewer speculative queries, prioritizing precision over chattiness.",
  },
  {
    title: "Ambient companion UX over support widget",
    decision:
      "Designed Dīpa as an animated SVG character with subtle glances and visor states, integrated directly into hero search and drawer navigation.",
    why:
      "Standard floating intercom/zendesk widgets feel like customer service intrusions. An expressive, bespoke companion creates an engaging, exploratory product experience.",
    tradeoff:
      "Required custom SVG frame management and accessibility handling (reduced-motion fallbacks).",
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
          HERO & HEADER
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
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A8711A]">
              Applied AI · Build Story
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#2F7A4F] border border-[#2F7A4F]/35 bg-[#6FBE8C]/12">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6FBE8C] shrink-0" />
              Live on portfolio
            </span>
          </div>

          {/* Title & Subtitle */}
          <h1 className="font-onest text-3xl sm:text-5xl font-bold tracking-tight text-[#042718] leading-[1.1] text-balance">
            Dīpa
          </h1>
          <p className="font-onest text-xl sm:text-2xl font-medium text-[#042718]/80 mt-2">
            An AI-native portfolio assistant
          </p>

          <p className="font-inter text-base sm:text-lg text-[#042718]/70 mt-5 leading-relaxed max-w-3xl">
            An AI assistant grounded in my own portfolio and product work, designed to answer
            questions using retrieved source material without hallucinating or requiring external
            vector databases.
          </p>

          {/* Metadata bar */}
          <div className="mt-8 pt-6 border-t border-[#042718]/10 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] text-[#042718]/65">
            <span className="font-semibold text-[#042718]">Deepak Prasad</span>
            <span className="text-[#042718]/25">/</span>
            <span>Product Architect &amp; Builder</span>
            <span className="text-[#042718]/25">/</span>
            <span>Gemini 2.5 Flash</span>
            <span className="text-[#042718]/25">/</span>
            <span>In-Memory Cosine RAG</span>
          </div>

          {/* CTA actions */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleOpenDipa}
              className="inline-flex items-center gap-2 h-11 px-6 rounded-[100px] bg-[#042718] text-white hover:bg-[#0B3322] font-inter text-sm font-semibold transition-colors duration-200 cursor-pointer shadow-xs"
            >
              <span>Try Dīpa now</span>
              <ArrowRight size={15} />
            </button>
            <a
              href="/work/product-jury"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/work/product-jury");
              }}
              className="inline-flex items-center gap-2 h-11 px-6 rounded-[100px] border border-[#042718]/15 text-[#042718] hover:bg-[#042718]/5 font-inter text-sm font-semibold transition-colors duration-200"
            >
              <span>Read Product Jury build</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </header>

      {/* =========================================================================
          ARTICLE CONTENT
          ========================================================================= */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* SECTION 1: CONTEXT & PURPOSE */}
        <section className="mb-14 pb-12 border-b border-[#042718]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            01 · Context &amp; Purpose
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] tracking-tight mb-4">
            Why build an assistant for a personal portfolio?
          </h2>
          <div className="space-y-4 font-inter text-[15px] sm:text-base text-[#042718]/75 leading-relaxed">
            <p>
              Standard product portfolios force hiring managers and collaborators to read through
              thousands of words of linear case studies to answer specific questions:{" "}
              <em>&ldquo;What was Deepak&apos;s direct ownership at ReshaMandi?&rdquo;</em>,{" "}
              <em>&ldquo;Did he launch the Performance Score architecture?&rdquo;</em>, or{" "}
              <em>&ldquo;What were the exact trade-offs on instant payouts?&rdquo;</em>
            </p>
            <p>
              Most conversational agents deployed on portfolios make one of two fatal errors: they
              either connect a frontier model directly to raw ungrounded prompts—which hallucinate
              metrics and credentials—or they over-engineer a complex hosted vector database pipeline
              (Pinecone, Weaviate) that adds 100ms+ network lag and ongoing maintenance.
            </p>
            <p>
              I built Dīpa as an AI-native portfolio assistant that proves grounded retrieval can be
              blazingly fast, deterministic, zero-cost to maintain, and fundamentally truthful.
            </p>
          </div>
        </section>

        {/* SECTION 2: WHAT I BUILT */}
        <section className="mb-14 pb-12 border-b border-[#042718]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            02 · Scope
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] tracking-tight mb-6">
            What I built
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WHAT_I_BUILT.map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-[18px] bg-white border border-[#042718]/8 flex flex-col justify-between"
              >
                <h3 className="font-onest text-base font-bold text-[#042718] mb-2">
                  {item.title}
                </h3>
                <p className="font-inter text-xs sm:text-[13.5px] text-[#042718]/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: MY ROLE */}
        <section className="mb-14 pb-12 border-b border-[#042718]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            03 · Ownership
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] tracking-tight mb-4">
            My role
          </h2>
          <div className="space-y-4 font-inter text-[15px] sm:text-base text-[#042718]/75 leading-relaxed">
            <p>
              <strong>Sole Architect &amp; Builder.</strong> I owned Dīpa end-to-end: from defining
              the semantic chunking boundaries across my career documents and writing the retrieval
              algorithms, to creating the custom SVG character animations and evaluating retrieval
              accuracy with automated golden benchmarks.
            </p>
          </div>
        </section>

        {/* SECTION 4: HOW IT WORKS (SUPPORTED BY ACTUAL REPO) */}
        <section className="mb-14 pb-12 border-b border-[#042718]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            04 · Technical Architecture
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] tracking-tight mb-4">
            How it works
          </h2>
          <p className="font-inter text-sm sm:text-base text-[#042718]/70 leading-relaxed mb-8">
            The retrieval pipeline operates deterministically directly within the application
            runtime, without external vector service dependencies.
          </p>

          <div className="space-y-4">
            {WORKFLOW_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-[18px] bg-white border border-[#042718]/8 flex gap-4 items-start"
              >
                <span className="font-mono text-xs font-bold text-[#A8711A] bg-[#A8711A]/10 px-2 py-1 rounded-md shrink-0">
                  {step.step}
                </span>
                <div>
                  <h3 className="font-onest text-base font-bold text-[#042718] mb-1">
                    {step.name}
                  </h3>
                  <p className="font-inter text-xs sm:text-[13.5px] text-[#042718]/70 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: KEY PRODUCT DECISIONS */}
        <section className="mb-14 pb-12 border-b border-[#042718]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            05 · Trade-Offs
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] tracking-tight mb-6">
            Key product decisions
          </h2>

          <div className="space-y-6">
            {KEY_DECISIONS.map((d) => (
              <div
                key={d.title}
                className="p-6 rounded-[20px] bg-[#FAF8F5] border border-[#042718]/8 space-y-3"
              >
                <h3 className="font-onest text-lg font-bold text-[#042718]">
                  {d.title}
                </h3>
                <div className="text-xs sm:text-sm font-inter text-[#042718]/80 leading-relaxed">
                  <span className="font-semibold text-[#042718]">Decision: </span>
                  {d.decision}
                </div>
                <div className="text-xs sm:text-sm font-inter text-[#042718]/70 leading-relaxed">
                  <span className="font-semibold text-[#042718]">Why: </span>
                  {d.why}
                </div>
                <div className="text-xs sm:text-sm font-inter text-[#042718]/60 leading-relaxed">
                  <span className="font-semibold text-[#042718]">Trade-off accepted: </span>
                  {d.tradeoff}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: WHAT I LEARNED */}
        <section className="mb-14 pb-12 border-b border-[#042718]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
            06 · Synthesis
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] tracking-tight mb-4">
            What I learned
          </h2>
          <div className="space-y-4 font-inter text-[15px] sm:text-base text-[#042718]/75 leading-relaxed">
            <p>
              <strong>1. Granularity beats parameter scale:</strong> The single biggest factor in
              RAG answer quality is chunk boundary cleanliness. When chunks combine multiple
              unrelated projects or vague summaries, LLMs mix details. Single-concept chunks with
              explicit metric anchors prevent retrieval confusion.
            </p>
            <p>
              <strong>2. Epistemic modesty builds more trust than omniscient prose:</strong> Users are
              conditioned to expect AI chatbots to make things up. When Dīpa plainly states,{" "}
              <em>&ldquo;I don&apos;t have verified data on that in Deepak&apos;s writing,&rdquo;</em>{" "}
              it immediately authenticates all the other answers where it cites concrete evidence.
            </p>
            <p>
              <strong>3. Vector DBs are often premature optimization:</strong> For finite corpora
              (&lt;1,000 documents), running vector math in-memory on CPU delivers single-digit
              millisecond latency, zero monthly infrastructure bills, and zero external dependency
              downtime.
            </p>
          </div>
        </section>

        {/* BOTTOM CTA BAR */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleOpenDipa}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[100px] bg-[#042718] text-white hover:bg-[#0B3322] font-inter text-sm font-semibold transition-colors duration-200 cursor-pointer"
          >
            <span>Try Dīpa</span>
            <ArrowRight size={15} />
          </button>

          <button
            type="button"
            onClick={() => onNavigate("/work")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[100px] border border-[#042718]/15 text-[#042718] hover:bg-[#042718]/5 font-inter text-sm font-semibold transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft size={15} />
            <span>Back to all work</span>
          </button>
        </div>
      </article>
    </div>
  );
}
