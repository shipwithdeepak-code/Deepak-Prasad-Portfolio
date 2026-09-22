export interface CapabilitySpec {
  id: string;
  name: string;
  summary: string;
  inputs?: string[];
  outputs?: string[];
  rules?: string[];
  details?: string[];
}

export interface PrdSection {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  content: string[];
  principles?: { name: string; desc: string }[];
  table?: {
    headers: string[];
    rows: (string | React.ReactNode)[][];
  };
  callout?: string;
  capabilities?: CapabilitySpec[];
}

export const PRD_METADATA = {
  title: "Product Jury 2.0",
  subtitle: "A decision system for product managers.",
  thesis: "Make a product call you can defend — and keep the defence.",
  positioning:
    "For product managers who will be asked to justify their calls, Product Jury is a decision system that turns a product judgement into a defensible record — unlike AI critique tools, which give you an opinion and keep nothing.",
  category: "Product decision defence",
  tagline: "Challenge the product. Defend the decision.",
  version: "1.1",
  status: "amended baseline",
  amendedDate: "22 September 2026",
  supersedes: "v1.0, approved & frozen 22 September 2026",
  author: "product, for design & engineering",
  baselineNote: "Baseline for the technical implementation plan",
  elevenBehaviours:
    "Product Jury 2.0 is a decision system with eleven behaviours: it separates evidence from inference, names what is unknown, asks the PM only for the missing decision-critical evidence, convenes an evidence-aware jury, produces a provisional verdict, states what would overturn it, attacks it through a Red Team round, records the PM's response, persists the decision, re-evaluates when new evidence arrives, and shows what changed and why.",
  humanDecides:
    "Throughout, the human PM decides. The system produces evidence, argument and challenge; it never issues an instruction.",
};

export const CORE_PRINCIPLES = [
  {
    letter: "A",
    title: "A Decision is not a Verdict",
    statement:
      "A Decision is the durable object. A Version is the state of that decision at a point in time. A Verdict is one position inside one version.",
    desc: "A verdict is an ephemeral assessment from an automated panel. A Decision is an evolving, auditable asset owned by the PM that accumulates evidence, rationale, challenges, and revisions across time.",
  },
  {
    letter: "B",
    title: "Refusal is a feature",
    statement:
      "INSUFFICIENT is a legitimate product outcome. It is NOT the same as FAILED.",
    desc: "When evidence cannot support a defensible call, returning an honest refusal with the exact missing evidence is far more valuable than an ungrounded, fabricated recommendation.",
  },
  {
    letter: "C",
    title: "The PM decides",
    statement:
      "The system produces evidence, argument, and challenge; it never issues an instruction.",
    desc: "Product management is the practice of bearing responsibility for outcomes. The AI surfaces blind spots, stress-tests reasoning, and checks consistency, but the human product manager makes and owns the call.",
  },
  {
    letter: "D",
    title: "The record is the product",
    statement:
      "The decision persists. The reasoning persists. Challenges persist. PM responses persist.",
    desc: "Critique sessions are forgotten in days; when an initiative underperforms months later, teams struggle to recall why trade-offs were made. The persistent record turns ephemeral debate into organizational intelligence.",
  },
  {
    letter: "E",
    title: "The revisit is the wedge",
    statement:
      "Decision → evidence arrives → re-judge → show what changed and why.",
    desc: "The value of Product Jury compounds after launch: when telemetry, survey feedback, or pilot metrics return, the system highlights which initial assumptions were broken and updates the defensible posture.",
  },
];

export const CAPABILITIES: CapabilitySpec[] = [
  {
    id: "CAP-01",
    name: "Understanding",
    summary:
      "Extracts structured assertions from uploaded screen artifacts, PRDs, or user journeys without pre-judging quality.",
    rules: [
      "Strict separation of directly observable facts from downstream interpretations.",
      "Identifies interactive affordances, copy hierarchy, visual focal points, and user commitment gates.",
      "Produces an epistemic confidence boundary for the artifact before any jury member is summoned.",
    ],
  },
  {
    id: "CAP-02",
    name: "Dynamic Unknowns",
    summary:
      "Identifies critical operational and user behavior gaps that cannot be resolved from the supplied artifacts alone.",
    rules: [
      "Never estimates missing telemetry, retention rates, or user intent as plausible facts.",
      "Ranks unknowns by decision-criticality: which missing fact would flip a verdict from SHIP to KILL?",
      "Generates precise, targeted inquiries for the PM rather than broad open-ended questionnaires.",
    ],
  },
  {
    id: "CAP-03",
    name: "Evidence Model",
    summary:
      "Enforces a 4-tier evidentiary taxonomy across all arguments: Fact, Inference, Assumption, and Unknown.",
    rules: [
      "FACT: Verifiable directly in the artifact, uploaded telemetry, or cited user research.",
      "INFERENCE: Logical deduction derived from patterns in the evidence.",
      "ASSUMPTION: Working hypothesis that lacks empirical proof.",
      "UNKNOWN: Required context that is absent and must not be hallucinated.",
    ],
  },
  {
    id: "CAP-04",
    name: "The Decision Question",
    summary:
      "Frames the specific choice being made (e.g. 'Should we gate onboarding behind email verification before showing value?').",
    rules: [
      "Prevents vague, sprawling critiques by constraining analysis to a defined trade-off.",
      "Maps the Decision Question to actionable operational levers and explicit success criteria.",
    ],
  },
  {
    id: "CAP-17",
    name: "Decision Success Condition",
    summary:
      "Defines the verifiable criteria under which the decision will be deemed successful after deployment.",
    rules: [
      "Specifies the primary metric, minimum acceptable threshold, and observation timeframe.",
      "Establishes the empirical baseline against which the eventual Revisit (CAP-15) will compare incoming telemetry.",
    ],
  },
  {
    id: "CAP-05",
    name: "Jury Deliberation",
    summary:
      "Convenes specialized agent roles (UX Researcher, Product Strategist, Systems Architect) to evaluate the proposal.",
    rules: [
      "Runs specialist lenses asynchronously to prevent groupthink or conversational anchoring.",
      "Preserves divergent reasoning rather than computing an unweighted average consensus.",
    ],
  },
  {
    id: "CAP-18",
    name: "Early Sufficiency Gate",
    summary:
      "Halts the deliberation pipeline before compute is wasted if foundational inputs fail minimum viability.",
    rules: [
      "Triggers an immediate INSUFFICIENT status if the artifact is illegible or core target user context is absent.",
      "Presents the PM with the exact missing element required to reopen deliberation.",
    ],
  },
  {
    id: "CAP-06",
    name: "Auditor Authority — The Binding Ceiling",
    summary:
      "An independent Evidence Auditor cross-examines all jury claims and sets a strict mathematical ceiling on confidence.",
    rules: [
      "Audits every assertion made by the jury against the CAP-03 Evidence Model.",
      "No jury member can claim high certainty if their argument relies primarily on unvalidated assumptions.",
      "The Auditor's confidence ceiling is binding and cannot be overridden by consensus voting.",
    ],
  },
  {
    id: "CAP-07",
    name: "INSUFFICIENT Status",
    summary:
      "A first-class product outcome declaring that current evidence cannot support a defensible recommendation.",
    rules: [
      "INSUFFICIENT is NOT a failure state; it is an honest refusal that prevents reckless decisions.",
      "Provides a structured research recipe detailing what data collection would unlock a defensible call.",
    ],
  },
  {
    id: "CAP-08",
    name: "Verdict Generation",
    summary:
      "Synthesizes the audited deliberation into a provisional recommendation: SHIP, ITERATE, TEST, or KILL.",
    rules: [
      "Always labeled as 'Provisional' until accepted, modified, or defended by the PM.",
      "Accompanied by a transparent breakdown of supporting facts, underlying risks, and rejected alternative verdicts.",
    ],
  },
  {
    id: "CAP-09",
    name: "Falsification Contract",
    summary:
      "Explicitly defines what specific new empirical evidence would overturn this verdict.",
    rules: [
      "Forces intellectual honesty: 'If day-7 drop-off exceeds 18%, this SHIP recommendation flips to KILL.'",
      "Forms the automated trigger conditions for the future Revisit Loop.",
    ],
  },
  {
    id: "CAP-10",
    name: "Red Team Challenge Round",
    summary:
      "An adversarial challenge module that simulates skeptical executives, cynical users, and worst-case operational edge cases.",
    rules: [
      "Attacks the provisional verdict from three angles: Strategic blind spots, adoption friction, and adversarial exploitability.",
      "Tests whether the decision holds up when subjected to hostile cross-examination.",
    ],
  },
  {
    id: "CAP-11",
    name: "PM Response — Defend, Revise, Collect",
    summary:
      "The human decision gate where the product manager formally responds to the jury's verdict and Red Team attacks.",
    rules: [
      "DEFEND: The PM provides counter-evidence or accepts documented risks based on broader strategic context.",
      "REVISE: The PM alters the product scope or flow to resolve identified friction.",
      "COLLECT: The PM pauses the decision and triggers targeted user research or telemetry instrumentation.",
    ],
  },
  {
    id: "CAP-12",
    name: "The Decision Persists",
    summary:
      "Stores the complete deliberation graph, evidence audit, Red Team challenges, and PM responses as a permanent record.",
    rules: [
      "Immutable audit trail accessible via shareable link or exportable markdown dossier.",
      "Separates ephemeral debate from durable institutional memory.",
    ],
  },
  {
    id: "CAP-13",
    name: "Decision Versions",
    summary:
      "Maintains point-in-time snapshots of the decision as new evidence or pivots emerge.",
    rules: [
      "Version 1.0 captures the initial pre-launch review; subsequent versions capture post-pilot calibrations.",
      "Diff engine visually highlights how confidence, verdicts, and evidence grades evolved across versions.",
    ],
  },
  {
    id: "CAP-14",
    name: "Decision Log",
    summary:
      "A chronologically organized portfolio view of all team product calls and their current health states.",
    rules: [
      "Allows product leaders to audit organizational decision velocity, evidence rigor, and open falsification risks.",
      "Flags decisions whose falsification monitoring windows are active.",
    ],
  },
  {
    id: "CAP-15",
    name: "Re-Judge with New Evidence",
    summary:
      "Ingests post-launch telemetry, user interviews, or conversion metrics and re-evaluates the original decision.",
    rules: [
      "Compares incoming data directly against the CAP-09 Falsification Contract.",
      "Automatically highlights 'What Changed and Why': which assumptions were validated, and which broke under reality.",
    ],
  },
  {
    id: "CAP-19",
    name: "Open Loops & The Return",
    summary:
      "Actively tracks unresolved assumptions and scheduled calibration dates, alerting the PM when evidence is due.",
    rules: [
      "Transforms passive documentation into proactive decision governance.",
      "Closes the loop between strategic intent and empirical post-launch reality.",
    ],
  },
];
