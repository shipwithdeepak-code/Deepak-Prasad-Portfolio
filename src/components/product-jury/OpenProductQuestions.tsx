import React from "react";
import { HelpCircle, Slash, XCircle, ArrowRight } from "lucide-react";

export function OpenProductQuestions() {
  const openQuestions = [
    {
      num: "01",
      topic: "Launch Direction",
      question: "Portfolio demonstration vs. standalone tool for external PMs?",
      implications:
        "Both paths are valid, but they dictate entirely different product investments. A portfolio demonstration prioritizes transparent case studies, deep architecture explainability, and inspectable evaluation sets. A tool seeking external PM users requires self-serve onboarding, auth infrastructure, multi-tenant persistence, and enterprise privacy guarantees.",
    },
    {
      num: "02",
      topic: "Revisit Mechanism",
      question: "Is in-product return enough, or does it require an external bridge?",
      implications:
        "The north star metric requires ≥25% of decisions to be revisited within 30 days. If users only see open loops when actively visiting the app, retention depends on memory. Testing whether an optional external trigger (such as an email or calendar ping based on the Falsification Contract's verification date) is necessary to close the loop.",
    },
    {
      num: "03",
      topic: "Evaluation Set & Real PM Decisions",
      question: "Synthetic decision pairs vs. consensual anonymized PM logs?",
      implications:
        "The automated quality evaluation set currently uses curated screens and synthetic evidence. To stress-test genuine product ambiguity, should it ingest real anonymized decisions contributed by practicing PMs with signed NDAs and explicit consent?",
    },
  ];

  const nonGoals = [
    {
      title: "Autonomous Decision Making",
      desc: "The system never issues orders or makes the call. The PM makes the decision; the system provides argument, cross-examination, and audit bounds.",
    },
    {
      title: "Chat Interface",
      desc: "No open-ended chat box. Unstructured conversational threads encourage rambling exploration, prompt drift, and avoid committing to a durable decision object.",
    },
    {
      title: "Live Product URL Scraping",
      desc: "Does not crawl live URLs or scrape production sites. That changes the privacy boundary and distracts from the core reasoning loop.",
    },
    {
      title: "Team Collaboration & Multi-Player Voting",
      desc: "No multi-user voting, shared workspaces, or comment threads in MVP. Building collaborative governance before the loop works for a single decider is premature.",
    },
    {
      title: "Generic UX Audit / Heuristic Scoring",
      desc: "Does not rate screens 1–10 on Nielsen heuristics or generate cosmetic audit checkmarks. That is commodity analysis already handled by standard linters.",
    },
    {
      title: "Design or Code Generation",
      desc: "Does not generate wireframes, Figma components, or React code. Product Jury focuses purely on the strategic product judgement, not design execution.",
    },
  ];

  return (
    <section id="open-questions" className="scroll-mt-24 pt-10 pb-14 border-b border-[#042718]/10">
      {/* Part 1: Open Questions */}
      <div className="mb-8">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
          Product Discovery
        </span>
        <h2 className="font-onest text-2xl sm:text-3xl lg:text-4xl font-bold text-[#042718] tracking-tight">
          What I&apos;m still deciding
        </h2>
        <p className="font-inter text-sm sm:text-base text-[#042718]/75 mt-2 max-w-3xl leading-relaxed">
          Real products in build have genuine trade-offs that haven&apos;t been settled. These three strategic decisions are actively being weighed.
        </p>
      </div>

      <div className="space-y-4 mb-14">
        {openQuestions.map((q) => (
          <div
            key={q.num}
            className="p-6 rounded-[22px] bg-white border border-[#042718]/10 shadow-xs"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-[#A8711A]">
                Question {q.num}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF8F5] text-[#042718]/70 border border-[#042718]/8">
                {q.topic}
              </span>
            </div>
            <h3 className="font-onest text-base sm:text-lg font-bold text-[#042718] mb-2">
              {q.question}
            </h3>
            <p className="font-inter text-xs sm:text-sm text-[#042718]/75 leading-relaxed">
              {q.implications}
            </p>
          </div>
        ))}
      </div>

      {/* Part 2: Non-Goals */}
      <div className="mb-6">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#042718]/60 block mb-2">
          Scope Boundaries
        </span>
        <h3 className="font-onest text-xl sm:text-2xl font-bold text-[#042718] tracking-tight">
          What I&apos;m deliberately not building
        </h3>
        <p className="font-inter text-xs sm:text-sm text-[#042718]/70 mt-1 max-w-2xl">
          A product is defined as much by what it rejects as what it builds. These are explicit, non-negotiable boundaries.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {nonGoals.map((ng, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-xl bg-[#FAF8F5] border border-[#042718]/8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <XCircle size={15} className="text-[#A8711A] shrink-0" />
                <span className="font-onest text-xs sm:text-sm font-bold text-[#042718]">
                  {ng.title}
                </span>
              </div>
              <p className="font-inter text-xs text-[#042718]/70 leading-relaxed">
                {ng.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
