import React, { useState } from "react";
import { ArrowRight, ChevronRight, CheckCircle2, RotateCcw, AlertTriangle } from "lucide-react";

export function WorkedDecisionWalkthrough() {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    {
      time: "Minute 0",
      stage: "Artifact Ingestion",
      title: "Maya uploads the redesigned receipt capture screen",
      context: "Maya is a senior PM on an expense product facing a Q4 code freeze in 3 weeks. Their director will ask why this redesign should ship.",
      body: "Seconds after upload, the system extracts four classes of statements:",
      details: [
        { label: "Observed", text: "3 capture methods presented with equal weight; 'Category' is marked required; no skip control visible." },
        { label: "Inferred", text: "Mid-flow step, not entry point (progress indicator shows step 2 of 3)." },
        { label: "Assumed", text: "Users know which category to choose (unverified: screen offers no guidance)." },
        { label: "Cannot know", text: "Abandonment rate, whether category is required downstream, or user intent." },
      ],
    },
    {
      time: "Minute 1",
      stage: "Question & Unknowns",
      title: "Framing the call & asking what matters",
      context: "The product proposes a decision question which Maya edits in five seconds:",
      body: "\"Should we ship the redesigned receipt-capture flow before the Q4 freeze?\"",
      details: [
        { label: "Tailored Unknown", text: "\"Is the category field required by downstream reporting, or only by this form? I can see it is marked required but not why. If only this form, it is the cheapest thing to remove.\"" },
        { label: "Action", text: "Maya doesn't know. They ask in Slack and skip it—recorded as a known gap rather than forgotten." },
      ],
    },
    {
      time: "Minute 3",
      stage: "Evidence & Sufficiency",
      title: "Supplying baseline data & passing the gate",
      context: "Maya pastes what they have: two usability session quotes about hesitation, and a baseline metric.",
      body: "Evidence supplied: 22% abandonment at this step in the current flow. Desired target: 80% completion.",
      details: [
        { label: "Early Sufficiency Gate", text: "Passes in 4.8s: Qualitative friction + baseline metric is enough for a provisional call, though nothing exists yet on the redesign itself." },
      ],
    },
    {
      time: "Minute 4–5",
      stage: "Deliberation & Verdict",
      title: "Specialist cross-examination & the falsification contract",
      context: "The Experience lens and Strategy lens deliberate. Experience lens argues the required field causes friction. Strategy lens points out the 22% baseline describes the OLD flow, not the redesign. Experience lens concedes.",
      body: "Auditor caps confidence at 60% because the central claim rests on zero data about the redesign.",
      details: [
        { label: "Provisional Verdict", text: "TEST — 58% (capped at 60%). Rationale: Evidence establishes categorisation causes hesitation; it does not establish that the redesign fixes it." },
        { label: "Falsification Contract", text: "\"This flips to SHIP if completion reaches 80% in a one-week ramp to 10% traffic. If it stays below 70%, it becomes HOLD. Check: one week, existing instrumentation, zero engineering work.\"" },
      ],
    },
    {
      time: "Minute 7",
      stage: "Adversarial Red Team",
      title: "Attacking the load-bearing claim",
      context: "Maya presses Challenge. Two contrarian attacks are dismissed, but the third hits a nerve:",
      body: "\"You're treating the required category field as the friction. The quotes say users hesitated over which category, not over the field existing. If the taxonomy is confusing, removing the field moves confusion downstream into expense reports—improving completion while degrading data quality.\"",
      details: [
        { label: "PM Response: REVISE", text: "Maya revises the statement: 'Friction is taxonomy, not field.' Writes a one-sentence rationale. Confidence moves to 52%, recorded beside the decision." },
        { label: "PM Response: COLLECT", text: "Maya clicks Collect on the falsification check, which creates an active open loop waiting on ramp telemetry." },
      ],
    },
    {
      time: "9 Days Later",
      stage: "The Return (The Wedge)",
      title: "New telemetry lands & the decision re-judges",
      context: "The 10% traffic ramp concludes with 83% completion. Maya returns to the existing decision—not a new session—and pastes the result.",
      body: "The system evaluates the new evidence against the Falsification Contract without re-asking any past context:",
      details: [
        { label: "The Diff", text: "TEST at 52% → SHIP at 79%. The falsification condition set 9 days ago has been satisfied (83% vs 80% bar). Two claims moved from assumption to fact." },
        { label: "Still Open", text: "The taxonomy concern raised in the Red Team attack remains unresolved—completion rose, but categorisation accuracy needs downstream tracking." },
      ],
    },
    {
      time: "In Review",
      stage: "The Defence",
      title: "A director's hardest question already answered on the record",
      context: "In the executive review, Maya's director asks: 'Why are we confident shipping, and won't this create bad data for the accounting team?'",
      body: "Instead of reconstructing memory or searching Slack, Maya opens the Decision Log:",
      details: [
        { label: "Institutional Defence", text: "Shows the exact question asked, what was known, the specialist dispute, the falsification threshold set beforehand, the 83% ramp result, and the explicit open monitoring ticket for accounting taxonomy." },
      ],
    },
  ];

  const current = steps[stepIndex];

  return (
    <section id="example" className="scroll-mt-24 pt-10 pb-14 border-b border-[#042718]/10">
      {/* Header */}
      <div className="mb-8">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
          Mini Product Walkthrough
        </span>
        <h2 className="font-onest text-2xl sm:text-3xl lg:text-4xl font-bold text-[#042718] tracking-tight">
          One decision, from question to re-judgement
        </h2>
        <p className="font-inter text-sm sm:text-base text-[#042718]/75 mt-2 max-w-3xl leading-relaxed">
          How Product Jury works in practice: following Maya, a Senior PM deciding whether to ship a receipt-capture redesign before a code freeze.
        </p>
      </div>

      {/* Interactive Timeline Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin">
        {steps.map((s, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setStepIndex(idx)}
            className={`px-3.5 py-2 rounded-xl text-left shrink-0 transition-all cursor-pointer font-mono text-xs border ${
              stepIndex === idx
                ? "bg-[#042718] text-white border-[#042718] shadow-xs"
                : "bg-white text-[#042718]/70 border-[#042718]/10 hover:border-[#042718]/30 hover:bg-[#FAF8F5]"
            }`}
          >
            <div className="font-bold">{s.time}</div>
            <div className={`text-[10px] truncate max-w-[110px] ${stepIndex === idx ? "text-[#D9A94C]" : "text-[#042718]/50"}`}>
              {s.stage}
            </div>
          </button>
        ))}
      </div>

      {/* Main Walkthrough Card */}
      <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-[#042718]/10 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#042718]/8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#042718]/10 font-mono text-[10px] font-bold text-[#A8711A] uppercase">
                {current.time} · {current.stage}
              </span>
            </div>
            <h3 className="font-onest text-xl sm:text-2xl font-bold text-[#042718]">
              {current.title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={stepIndex === 0}
              onClick={() => setStepIndex((p) => Math.max(0, p - 1))}
              className="p-2 rounded-lg border border-[#042718]/15 text-xs font-mono disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF8F5] cursor-pointer"
            >
              Prev
            </button>
            <button
              type="button"
              disabled={stepIndex === steps.length - 1}
              onClick={() => setStepIndex((p) => Math.min(steps.length - 1, p + 1))}
              className="px-3 py-2 rounded-lg bg-[#042718] text-white text-xs font-mono disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#0B3322] cursor-pointer"
            >
              Next Step &rarr;
            </button>
          </div>
        </div>

        <p className="font-inter text-xs sm:text-sm text-[#042718]/65 mb-3 italic">
          {current.context}
        </p>

        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#042718]/8 font-inter text-sm sm:text-[15px] font-medium text-[#042718] leading-relaxed mb-5">
          {current.body}
        </div>

        <div className="space-y-2.5">
          {current.details.map((d, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-white border border-[#042718]/8 text-xs sm:text-[13px] font-inter leading-relaxed"
            >
              <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#A8711A] block mb-0.5">
                {d.label}
              </span>
              <span className="text-[#042718]/85">{d.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
