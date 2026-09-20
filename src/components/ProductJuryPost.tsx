import React from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

interface ProductJuryPostProps {
  onNavigate: (path: string) => void;
}

const STEPS = [
  ["Provide a screen artifact", "Upload a screenshot or point it at a URL. Not a written brief, an actual interface, because the whole method depends on there being pixels to argue about."],
  ["Artifact understanding", "The model reads the screen back to you: what it thinks this is, what it can see, what it cannot make out. You correct it here rather than discovering the misread in the verdict."],
  ["Confirm critical context", "You state what the product is meant to do and who it is for. This becomes the thing the jury checks the screen against, instead of the standard against which it judges you."],
];

const AGENTS = [
  ["UX Researcher", "Phase 1 · parallel", "Mental models, cognitive load, adoption friction. Finds where complexity is offloaded onto the user rather than absorbed by the system."],
  ["Product Strategist", "Phase 1 · parallel", "Positioning, differentiation, opportunity cost. Whether this advances a durable advantage or matches a competitor's minor feature."],
  ["Evidence Auditor", "Phase 2 · cross-examines", "Reads what the other two claimed and grades every statement: fact, inference, assumption or unknown. This is the agent that makes the rest trustworthy."],
  ["Jury Decision Agent", "Phase 3 · synthesises", "Takes all three, weighs the disagreement, and returns the verdict with a confidence figure. It is forbidden from overriding a dissent just because it is outnumbered."],
];

type Tone = "fact" | "inference" | "assumption" | "unknown";
const TIERS: [string, Tone, string][] = [
  ["Fact", "fact", "Directly observable in the artifact, or backed by telemetry and transcripts supplied with it."],
  ["Inference", "inference", "A structured conclusion derived from patterns in the evidence. Carries less weight than a fact, and says so."],
  ["Assumption", "assumption", "A working belief about cause and effect that has not been validated against behaviour."],
  ["Unknown", "unknown", "Needed for a confident decision and not establishable from what was provided. Returned as a gap to measure, never as an estimate."],
];
const TIER_CLASS: Record<Tone, string> = {
  fact: "bg-[#042718] text-white border border-[#042718]",
  inference: "text-[#A8711A] border border-[#A8711A]/55 bg-[#A8711A]/10",
  assumption: "text-[#A8711A] border border-dashed border-[#A8711A]/65",
  unknown: "text-[#042718]/45 border border-dashed border-[#042718]/25",
};

const DOSSIER = [
  ["Jury decision", "One of ship, iterate, test or kill. The three rejected options stay on screen, because which verdicts were on the table is part of the finding."],
  ["Executive summary", "The argument in a paragraph, with an epistemic confidence percentage and a sentence explaining what would raise it."],
  ["Priority opportunities", "The top problems ranked by friction times impact, each graded and each carrying its user impact, business impact and evidence basis."],
  ["Specialist panel", "Each persona's key observation, recommendation and reasoning, with its own confidence figure."],
  ["Consensus & divergence", "Where they agree, where they split and why, and a separate list of what is still unknown."],
  ["Immediate PM action", "One recommended next step, and the reasoning that produced it."],
];

const DECISIONS = [
  ["Artifacts, not briefs", "The first version took a written brief. People wrote the brief they wished were true, and the jury dutifully critiqued a product that did not exist. A screenshot cannot flatter itself. Moving to artifact-first removed an entire class of useless review."],
  ["Asynchronous deliberation over a live chat room", "Early prototypes streamed the agents talking to each other in real time. Entertaining, and useless. Attention went on reading banter instead of evaluating the decision. A structured dossier produces something you can take into a room."],
  ["A DAG, not a panel", "The obvious design is five agents voting. What works better is two running in parallel, a third auditing what they said, and a fourth synthesising. Every agent also ships a typed fallback, so one failing degrades the review instead of killing it."],
  ["Preserving dissent instead of averaging it", "Most tools flatten everything into consensus. Here the disagreement stays visible, and the synthesiser is forbidden from overriding a seat's warning because the others are enthusiastic."],
];

const NEXT = [
  ["Context alignment in the verdict", "Step three already compares what you claimed the product does against what the screenshot actually supports. That comparison does not survive into the dossier, and it is the most defensible thing the tool does. It belongs at the top of the verdict."],
  ["Surfacing the remaining two lenses", "Engineering feasibility and unit economics inform the analysis but have no voice in the panel. A screenshot supports them weakly, so they need either their own evidence input or an honest label saying their read is thin."],
  ["Decision readiness, and a challenge loop", "A single score for how ready this decision is, and a way to push back on the verdict and make the jury defend it rather than restate it."],
];

export default function ProductJuryPost({ onNavigate }: ProductJuryPostProps) {
  return (
    <div className="bg-[#FAFDFB]">
      <header className="border-b border-[#042718]/8 bg-[#FAF8F5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <button
            type="button"
            onClick={() => onNavigate("/")}
            className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#042718]/50 hover:text-[#042718] transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to portfolio</span>
          </button>

          <div className="flex items-center gap-3 flex-wrap mb-4">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A8711A]">
              Build note
            </span>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full border border-[#042718]/15 text-[#042718]/50">
              Preview v0.1
            </span>
          </div>

          <h1 className="font-onest text-[32px] sm:text-[48px] font-bold tracking-tight text-[#042718] leading-[1.06] text-balance">
            I built a jury that tells me what it cannot prove
          </h1>

          <p className="font-inter text-base sm:text-lg text-[#042718]/70 mt-5 leading-relaxed">
            Product Jury takes a product screen, runs it through a three-stage agent pipeline, and
            returns a verdict graded by the evidence behind it. The grade that matters most is the
            one where it declines to answer.
          </p>

          <div className="mt-8 pt-6 border-t border-[#042718]/10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] text-[#042718]/55">
            <span className="font-semibold text-[#042718]">Deepak Prasad</span>
            <span className="text-[#042718]/25">/</span>
            <span>Gemini Pro &amp; Flash</span>
            <span className="text-[#042718]/25">/</span>
            <span>Structured schemas, TypeScript</span>
          </div>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <Note>
          This describes what is shipped and usable today. It is a preview, not a finished product,
          and the last section says plainly what is missing.
        </Note>

        <S n="01" t="The problem is that AI agrees with you">
          <Pull>
            Ask any assistant what it thinks of your product idea and it will encourage you, restate
            your own premises back at you, and add a few surface suggestions. That is not review.
            That is a mirror with better vocabulary.
          </Pull>
          <P>
            Across seven years of product work I kept meeting the same failure: decisions are almost
            never stress-tested at the point where changing them is still cheap. Engineers hesitate to
            challenge strategy early. Business stakeholders price the upside and not the debt.
            Research surfaces friction that gets deprioritised in a rush to ship. Everyone is being
            reasonable, and the bad decision survives anyway.
          </P>
          <P>
            I wanted the sharpest cross-functional room I could imagine, available at eleven at night,
            before three sprints go into something that should have been reshaped or dropped. The
            hard part was never generating opinions. It was making the opinions disagree with each
            other honestly, and making them admit the limits of what they could see.
          </P>
        </S>

        <S n="02" t="How a review actually runs">
          <P>
            The single most consequential decision was making it artifact-first. You do not describe
            your product to it. You show it one.
          </P>
          <ol className="mt-6 space-y-5 list-none p-0">
            {STEPS.map(([t, b], i) => (
              <li key={t} className="flex gap-4">
                <span className="shrink-0 w-7 h-7 rounded-full bg-[#042718] text-white font-onest text-xs font-bold grid place-items-center mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-onest text-base font-bold text-[#042718]">{t}</h3>
                  <p className="font-inter text-[15px] text-[#042718]/70 leading-relaxed mt-1.5">{b}</p>
                </div>
              </li>
            ))}
          </ol>
          <P className="mt-6">
            Then it deliberates, and returns a dossier. The whole run takes a couple of minutes, and
            there is a sample case loaded if you want to read an output before uploading anything of
            your own.
          </P>
        </S>

        <S n="03" t="Three agents, and the one that audits them">
          <P>
            This is a directed graph, not a flat panel, and that shape is the whole design. Two
            specialists run in parallel on the same artifact. A third then reads what both of them
            claimed and audits it. Only then does a fourth synthesise a verdict.
          </P>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {AGENTS.map(([role, phase, body]) => (
              <div key={role} className="rounded-[20px] bg-white border border-[#042718]/8 p-5">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A8711A]">
                  {phase}
                </span>
                <h3 className="font-onest text-base font-bold text-[#042718] mt-2 leading-snug">{role}</h3>
                <p className="font-inter text-[13.5px] text-[#042718]/70 leading-relaxed mt-2">{body}</p>
              </div>
            ))}
          </div>
          <P className="mt-8">
            The auditor is the part I would build first if I started again. Two agents reasoning
            independently will contradict each other, and without something whose only job is to
            grade those claims against the evidence, you get two confident opinions and no way to
            choose. The audit stage is what turns disagreement into a decision.
          </P>
          <P>
            The panel you read in the dossier is not a fixed cast. The Jury Decision Agent's
            response schema includes a <code>roleTitle</code> and an <code>agentName</code> for each
            seat, so the synthesiser names and frames the panel for the artifact in front of it. The
            reasoning underneath is always the same three agents.
          </P>
        </S>

        <S n="04" t="Every claim is graded">
          <P>
            The main vulnerability in any LLM workflow is invented evidence. Agents here are forbidden
            from fabricating customer quotes, benchmarks or statistics. Every claim carries a grade,
            and the grade travels with it into every section of the dossier.
          </P>
          <div className="mt-6 space-y-3">
            {TIERS.map(([k, tone, body]) => (
              <div key={k} className="rounded-[18px] bg-[#FAF8F5] border border-[#042718]/8 p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                <span className={`shrink-0 self-start inline-flex items-center rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] ${TIER_CLASS[tone]}`}>
                  {k}
                </span>
                <p className="font-inter text-[14.5px] text-[#042718]/75 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <Pull>
            The fourth grade is what makes the other three trustworthy. A tool that can only return
            answers will always return an answer.
          </Pull>
          <P>
            This is the part people react to. Being told that a question cannot be settled from the
            evidence provided is more useful than a confident number, and it is the reason the
            confident numbers are worth anything when they do appear.
          </P>
        </S>

        <S n="05" t="What comes back">
          <P>The dossier has six sections, in this order.</P>
          <div className="mt-6 divide-y divide-[#042718]/8 border-t border-[#042718]/8">
            {DOSSIER.map(([t, b], i) => (
              <div key={t} className="py-4 flex gap-4">
                <span className="shrink-0 font-mono text-[11px] font-semibold text-[#A8711A] tabular-nums pt-1 w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-onest text-[15px] font-bold text-[#042718]">{t}</h3>
                  <p className="font-inter text-[14px] text-[#042718]/70 leading-relaxed mt-1">{b}</p>
                </div>
              </div>
            ))}
          </div>
        </S>

        <S n="06" t="Architecture">
          <P>
            Gemini Pro handles the analytical reasoning, Gemini Flash runs the rapid cross-examination
            passes. Every output conforms to a strict JSON schema, so each agent returns a formatted
            risk matrix, confidence interval and prerequisite checklist rather than prose.
          </P>
          <div className="mt-6 rounded-[20px] bg-[#042718] p-6 sm:p-7">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D9A94C]/75">
              Pipeline
            </span>
            <ol className="mt-4 list-none p-0">
              {[
                "Artifact ingest, multimodal inspection and scope extraction",
                "Context confirmation against what the screen actually supports",
                "Phase 1 — UX Researcher and Product Strategist, in parallel",
                "Phase 2 — Evidence Auditor grades every claim the two made",
                "Phase 3 — Jury Decision Agent synthesises the verdict and confidence",
              ].map((step, i, arr) => (
                <li key={step}>
                  <div className="flex gap-3.5 items-start">
                    <span className="shrink-0 font-mono text-[11px] font-semibold text-[#D9A94C] tabular-nums mt-0.5 w-5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-inter text-[14.5px] text-white/85 leading-relaxed">{step}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="block w-px h-4 bg-white/20 ml-[9px] my-1.5" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </S>

        <S n="07" t="Decisions I made while building">
          <div className="divide-y divide-[#042718]/8">
            {DECISIONS.map(([t, b], i) => (
              <div key={t} className="py-6 first:pt-2">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] font-semibold text-[#A8711A] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-onest text-lg font-bold text-[#042718] leading-snug">{t}</h3>
                </div>
                <p className="font-inter text-[15px] text-[#042718]/70 leading-relaxed mt-2.5 sm:pl-7">{b}</p>
              </div>
            ))}
          </div>
        </S>

        <S n="08" t="What I learned">
          <Pull>
            Agent specialisation and adversarial tension consistently beat one monolithic prompt.
          </Pull>
          <P>
            Ask a single model to be a great strategist, think about friction, consider architecture
            and verify economics, and you get an averaged compromise that offends nobody and helps
            nobody. Instantiate separate agents whose explicit job is to defend their own boundary,
            and the debate starts to resemble a good executive review.
          </P>
          <P>
            The thing I did not anticipate is how much the refusals matter. I built the unknown grade
            as a safety measure against hallucination. It turned out to be the feature people trust
            the tool for.
          </P>
        </S>

        <S n="09" t="What is missing">
          <P>
            This is a preview, and pretending otherwise would be a strange way to write about a tool
            whose entire point is admitting what it cannot establish. Three things are known gaps.
          </P>
          <div className="mt-6 space-y-3">
            {NEXT.map(([t, b], i) => (
              <div key={t} className="rounded-[18px] border border-dashed border-[#042718]/20 p-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] font-semibold text-[#042718]/40 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-onest text-base font-bold text-[#042718] leading-snug">{t}</h3>
                </div>
                <p className="font-inter text-[14.5px] text-[#042718]/70 leading-relaxed mt-2 sm:pl-7">{b}</p>
              </div>
            ))}
          </div>
        </S>
      </article>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-[30px] bg-[#042718] text-white p-8 sm:p-10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D9A94C]/75">
            Live preview
          </span>
          <h2 className="font-onest text-2xl sm:text-3xl font-bold leading-tight mt-3">
            Hand it one of your own screens
          </h2>
          <p className="font-inter text-sm sm:text-base text-white/70 leading-relaxed mt-3 max-w-lg">
            There is a sample case loaded if you would rather read a finished dossier first.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="https://product-jury.ai.studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 h-[47px] px-6 rounded-[100px] bg-white text-[#042718] hover:bg-[#FAFDFB] font-inter text-sm font-semibold transition-colors duration-200"
            >
              <span className="w-[7px] h-[7px] rounded-full bg-[#A8711A] shrink-0" />
              <span>Try Product Jury</span>
              <ArrowUpRight size={16} />
            </a>
            <button
              type="button"
              onClick={() => onNavigate("/work")}
              className="inline-flex items-center gap-2.5 h-[47px] px-6 rounded-[100px] border border-white/25 text-white hover:bg-white/10 font-inter text-sm font-semibold transition-colors duration-200 cursor-pointer"
            >
              <span>Explore other shipped work</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function S({ n, t, children }: { n: string; t: string; children: React.ReactNode }) {
  return (
    <section className="mb-14 sm:mb-16 last:mb-0">
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-mono text-[11px] font-semibold text-[#A8711A] tabular-nums tracking-wider">{n}</span>
        <h2 className="font-onest text-2xl sm:text-[28px] font-bold tracking-tight text-[#042718] leading-tight">
          {t}
        </h2>
      </div>
      {children}
    </section>
  );
}

function P({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-inter text-[15.5px] sm:text-base text-[#042718]/75 leading-[1.75] mt-4 first:mt-0 ${className}`}>
      {children}
    </p>
  );
}

function Pull({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-6 pl-5 border-l-2 border-[#D9A94C] font-playfair italic text-lg sm:text-xl text-[#042718] leading-[1.5]">
      {children}
    </blockquote>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-12 rounded-[18px] bg-[#A8711A]/8 border border-[#A8711A]/25 px-5 py-4">
      <p className="font-inter text-[14px] text-[#042718]/80 leading-relaxed">{children}</p>
    </div>
  );
}
