import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
  Activity,
  Check,
  Scale,
} from "lucide-react";

export type MechanismSlug =
  | "reshamandi"
  | "ai-coach"
  | "subscription"
  | "performance-score"
  | "ai-localization";

export interface MechanismVisualProps {
  slug: MechanismSlug;
  variant?: "card" | "detail";
  theme?: "dark" | "light";
  moment?: "ecosystem" | "migration" | "hardware-tiers" | "all";
  className?: string;
}

/**
 * Editorial Product Evidence & Mechanism Visuals.
 * Grounded strictly in documented facts and verified product decisions.
 * Designed with senior editorial discipline, generous negative space, and refined typography.
 */
export function MechanismVisual({
  slug,
  variant = "detail",
  theme = "light",
  moment,
  className = "",
}: MechanismVisualProps) {
  switch (slug) {
    case "reshamandi":
      return <ReshaMandiEditorialWorkflow theme={theme} className={className} />;
    case "ai-coach":
      return <AiCoachEditorialBoundary theme={theme} className={className} />;
    case "subscription":
      return <SubscriptionEditorialJourney theme={theme} className={className} />;
    case "performance-score":
      return (
        <PerformanceScoreEditorialEcosystem
          moment={moment}
          theme={theme}
          className={className}
        />
      );
    case "ai-localization":
      return <AiLocalizationEditorialOperatingModel theme={theme} className={className} />;
    default:
      return null;
  }
}

// =========================================================================
// 1. RESHAMANDI: FROM MANUAL HANDOFFS TO A GOVERNED PAYOUT FLOW
// =========================================================================
function ReshaMandiEditorialWorkflow({
  theme,
  className = "",
}: {
  theme: "dark" | "light";
  className?: string;
}) {
  const isDark = theme === "dark";

  const oldSteps = [
    { name: "Centre Incharge", role: "Manual Paper Intake" },
    { name: "WhatsApp Purchase IDs", role: "Unverified Chat Strings" },
    { name: "Vertical Admin Approval", role: "Ad-hoc Manual Signoff" },
    { name: "Accounts Processing", role: "Manual Bank Upload (T+3 to T+15)" },
    { name: "Manual Reference Update", role: "Spreadsheet Reconcile" },
  ];

  const newSteps = [
    { num: "01", name: "Agent Creates Lot", desc: "Weighbridge tare/gross locked" },
    { num: "02", name: "Centre Manager Approval", desc: "Physical lot verification" },
    { num: "03", name: "Finance Approval", desc: "Automated ledger validation" },
    { num: "04", name: "Farmer Acknowledgement", desc: "Vernacular SMS/audio confirmation" },
    { num: "05", name: "Bank / Account Validation", desc: "Instant NPCI/penny-drop ping" },
    { num: "06", name: "Automatic Payout", desc: "Direct IMPS/RTGS disbursement" },
    { num: "07", name: "Success / Retry", desc: "Deterministic retry queue" },
  ];

  const biddingSteps = [
    { num: "01", step: "SCAN", desc: "Lot QR & quality grade" },
    { num: "02", step: "BID", desc: "Live competitive floor" },
    { num: "03", step: "WATCH", desc: "Real-time countdown" },
    { num: "04", step: "WIN", desc: "Instant lot lock" },
    { num: "05", step: "PAY", desc: "Escrow settlement" },
  ];

  const fieldResearchStages = [
    { label: "FIELD", detail: "On-ground mandi immersion" },
    { label: "OBSERVE", detail: "Cash handoff friction" },
    { label: "MAP WORKFLOW", detail: "Weighbridge to bank" },
    { label: "DIGITISE", detail: "Assisted touch terminal" },
    { label: "AUTOMATE", detail: "Instant bank ledger" },
    { label: "SCALE", detail: "₹20–25 Cr/month" },
  ];

  return (
    <div
      className={`my-10 p-6 sm:p-8 md:p-10 rounded-[24px] border ${
        isDark
          ? "bg-[#042718] text-white border-white/10"
          : "bg-white text-[#042718] border-[#042718]/10 shadow-xs"
      } ${className}`}
      aria-label="ReshaMandi Governed Payout Workflow"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-6 pb-5 border-b border-current/10">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#188E39] font-bold block mb-1">
            Operational Architecture · Cashflow Restoration
          </span>
          <h3 className="font-onest text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
            FROM MANUAL HANDOFFS TO A GOVERNED PAYOUT FLOW
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono shrink-0">
          <span className="px-3 py-1 rounded-full bg-[#188E39]/12 text-[#188E39] font-semibold">
            &gt;₹5L within 2 hours
          </span>
          <span className="px-3 py-1 rounded-full bg-[#042718]/5 text-[#042718]/80 font-semibold border border-current/10">
            99.9% payout success
          </span>
        </div>
      </div>

      <p className="font-inter text-sm sm:text-base text-[#042718]/80 leading-relaxed mb-8 max-w-3xl">
        "The intervention was not simply digitising payment. It was restructuring the workflow around approval, validation and settlement." Instead of farmers waiting days for manual bank batches, settlement was programmatically locked to weighbridge verification.
      </p>

      {/* Comparative Workflow Blocks */}
      <div className="flex flex-col gap-6">
        {/* OLD: MANUAL / FRAGMENTED */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#FEF2F2]/70 border border-[#FCA5A5]/40">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#FCA5A5]/30">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#991B1B]">
                OLD WORKFLOW · MANUAL / FRAGMENTED
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#DC2626] font-medium">
              High Friction · 3–15 Days Delay · Disconnected Spreadsheets & WhatsApp
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
            {oldSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/90 border border-[#FCA5A5]/40 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-[10px] text-[#DC2626] font-semibold block mb-1">
                    Node 0{idx + 1}
                  </span>
                  <h4 className="font-onest text-xs sm:text-sm font-bold text-[#7F1D1D] leading-snug">
                    {step.name}
                  </h4>
                </div>
                <span className="font-inter text-[11px] text-[#991B1B]/75 mt-2 block italic">
                  {step.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Transition Indicator */}
        <div className="flex items-center justify-center gap-3 py-1">
          <div className="h-px bg-[#042718]/15 flex-1" />
          <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#188E39] px-3 py-1 rounded-full bg-[#188E39]/10">
            Engineered Restructuring ↓
          </span>
          <div className="h-px bg-[#042718]/15 flex-1" />
        </div>

        {/* NEW: STRUCTURED / CONNECTED */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#ECFDF5]/80 border border-[#6EE7B7]/50">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#6EE7B7]/40">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#059669]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#065F46]">
                NEW WORKFLOW · STRUCTURED / CONNECTED
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#059669] font-medium">
              Deterministic Guardrails · &lt; 2 Hours Payout · Zero Orphan Lots
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5">
            {newSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white border border-[#188E39]/30 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-[#188E39] font-bold">
                      {step.num}
                    </span>
                    {idx < newSteps.length - 1 && (
                      <ArrowRight size={12} className="text-[#188E39]/50 hidden lg:block" />
                    )}
                  </div>
                  <h4 className="font-onest text-xs sm:text-sm font-bold text-[#042718] leading-tight">
                    {step.name}
                  </h4>
                </div>
                <p className="font-inter text-[11px] text-[#042718]/70 mt-2 leading-snug">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECONDARY VISUAL: COCOON BIDDING MECHANISM */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#FAFDFB] border border-[#042718]/10 mt-2">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-[#042718]/8">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#042718]">
                SECONDARY MECHANISM · REAL-TIME COCOON BIDDING
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="px-2.5 py-0.5 rounded-full bg-[#188E39]/10 text-[#188E39] font-semibold">
                ~3 sessions/day
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#A8711A]/10 text-[#A8711A] font-semibold">
                &gt;35% transaction uplift in pilot
              </span>
            </div>
          </div>

          <p className="font-inter text-xs text-[#042718]/70 mb-4 leading-relaxed">
            Replaced manual buyer discovery and informal hall negotiation with an orderly digital auction floor. (Note: &gt;35% uplift was observed in the regional collection centre pilot; not company-wide growth).
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {biddingSteps.map((b, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white border border-[#042718]/10 text-center shadow-2xs"
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="font-mono text-[10px] text-[#188E39] font-bold">
                    {b.num}
                  </span>
                  {idx < biddingSteps.length - 1 && (
                    <ArrowRight size={11} className="text-[#042718]/30 hidden sm:inline" />
                  )}
                </div>
                <h5 className="font-onest text-xs font-bold text-[#042718]">
                  {b.step}
                </h5>
                <span className="font-inter text-[10px] text-[#042718]/60 mt-0.5 block">
                  {b.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FIELD RESEARCH ARTIFACT */}
        <div className="p-4 rounded-xl bg-[#FAFDFB] border border-[#042718]/8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#042718]/60">
              Field Research & Systemization Model
            </span>
            <span className="font-mono text-[10px] text-[#042718]/40">
              Ground-Level Immersion
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center">
            {fieldResearchStages.map((st, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-white border border-[#042718]/6 shadow-2xs"
              >
                <span className="font-mono text-[9px] text-[#188E39] font-bold block mb-0.5">
                  Step 0{idx + 1}
                </span>
                <span className="font-onest text-[11px] font-bold text-[#042718] block leading-tight">
                  {st.label}
                </span>
                <span className="font-inter text-[10px] text-[#042718]/60 mt-0.5 block">
                  {st.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editorial Caption / Evidence Footer */}
      <div className="mt-6 pt-4 border-t border-current/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-inter text-[#042718]/70">
        <p className="italic">
          "The intervention was not simply digitising payment. It was restructuring the workflow around approval, validation and settlement."
        </p>
        <span className="font-mono text-[11px] font-semibold text-[#188E39] shrink-0">
          Dual biometric + weighbridge physical interlock
        </span>
      </div>
    </div>
  );
}

// =========================================================================
// 2. SPORTSTECH AI COACH: THE MODEL CAN GENERATE. THE PRODUCT DEFINES THE BOUNDARY.
// =========================================================================
function AiCoachEditorialBoundary({
  theme,
  className = "",
}: {
  theme: "dark" | "light";
  className?: string;
}) {
  const isDark = theme === "dark";

  const iterationStages = [
    { num: "01", name: "INTERNAL", detail: "Dogfooding & failure modes" },
    { num: "02", name: "100-USER BETA", detail: "Real fitness edge cases" },
    { num: "03", name: "PRODUCTION", detail: "Controlled rollout" },
    { num: "04", name: "FEEDBACK", detail: "Usage & response telemetry" },
    { num: "05", name: "ITERATE", detail: "Continuous prompt & guardrail tuning" },
  ];

  const whatChangedTesting = [
    {
      before: "Long explanatory answers",
      after: "Shorter, scannable routines",
      reason: "Users in gym environments need 5-second glanceability, not multi-paragraph essays.",
    },
    {
      before: "Generic exercise suggestions",
      after: "Constrained platform catalogue",
      reason: "Mapped outputs strictly to verified studio videos with 1-tap deep links.",
    },
    {
      before: "Assumed user context",
      after: "Clarifying question gates",
      reason: "Prompted for injuries and available minutes before generating workouts.",
    },
  ];

  return (
    <div
      className={`my-10 p-6 sm:p-8 md:p-10 rounded-[24px] border ${
        isDark
          ? "bg-[#042718] text-white border-white/10"
          : "bg-white text-[#042718] border-[#042718]/10 shadow-xs"
      } ${className}`}
      aria-label="Sportstech AI Coach Editorial Boundary"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-6 pb-5 border-b border-current/10">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#188E39] font-bold block mb-1">
            Applied AI Architecture · Product Boundaries
          </span>
          <h3 className="font-onest text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
            THE MODEL CAN GENERATE. THE PRODUCT DEFINES THE BOUNDARY.
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono shrink-0">
          <span className="px-3 py-1 rounded-full bg-[#188E39]/12 text-[#188E39] font-semibold">
            ~2,000 DAU
          </span>
          <span className="px-3 py-1 rounded-full bg-[#042718]/5 text-[#042718]/80 font-semibold border border-current/10">
            Scaled from ~300 in ~3 months
          </span>
        </div>
      </div>

      <p className="font-inter text-sm sm:text-base text-[#042718]/80 leading-relaxed mb-8 max-w-3xl">
        "Building AI is easy. Building an AI experience people can trust is the product problem." AI product quality depended on defining where the model should act, where it must be constrained, and where deterministic code takes over.
      </p>

      {/* Boundary Architecture Diagram */}
      <div className="flex flex-col gap-6">
        {/* Main Controlled Path */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#FAFDFB] border border-[#042718]/10">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#042718]/8">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#188E39]">
              PRIMARY PATH · CONTROLLED AI ACTION LOOP
            </span>
            <span className="font-mono text-[11px] text-[#042718]/60">
              Gemini Primary · ChatGPT Failover
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
            {/* Step 1: User Context */}
            <div className="p-4 rounded-xl bg-white border border-[#042718]/10 flex flex-col justify-between shadow-2xs">
              <div>
                <span className="font-mono text-[10px] text-[#188E39] uppercase font-bold block mb-1">
                  01 · Ingestion
                </span>
                <h4 className="font-onest text-sm font-bold text-[#042718] mb-1">
                  USER CONTEXT
                </h4>
                <p className="font-inter text-xs text-[#042718]/70 leading-relaxed">
                  Consented workout history, available equipment, available minutes, and recent strain telemetry.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-[#042718]/6 font-mono text-[10px] text-[#042718]/50">
                Explainable Context
              </div>
            </div>

            {/* Step 2: AI Coach */}
            <div className="p-4 rounded-xl bg-white border border-[#042718]/10 flex flex-col justify-between shadow-2xs">
              <div>
                <span className="font-mono text-[10px] text-[#188E39] uppercase font-bold block mb-1">
                  02 · Model Layer
                </span>
                <h4 className="font-onest text-sm font-bold text-[#042718] mb-1">
                  AI COACH
                </h4>
                <p className="font-inter text-xs text-[#042718]/70 leading-relaxed">
                  Google Gemini (primary for speed & token cost) with automated ChatGPT fallback for high availability.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-[#042718]/6 font-mono text-[10px] text-[#042718]/50">
                Sub-Second First Token
              </div>
            </div>

            {/* Step 3: Product Boundaries */}
            <div className="p-4 rounded-xl bg-[#ECFDF5] border border-[#188E39]/40 flex flex-col justify-between shadow-2xs">
              <div>
                <span className="font-mono text-[10px] text-[#059669] uppercase font-bold block mb-1">
                  03 · Policy Interlock
                </span>
                <h4 className="font-onest text-sm font-bold text-[#065F46] mb-1">
                  PRODUCT BOUNDARIES
                </h4>
                <p className="font-inter text-xs text-[#042718]/80 leading-relaxed">
                  Controlled content ecosystem: maps solely to verified studio exercises and certified safety cues.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-[#188E39]/20 font-mono text-[10px] text-[#059669] font-medium">
                AI ≠ Doctor · Data ≠ Diagnosis
              </div>
            </div>

            {/* Step 4: Actionable Platform Content */}
            <div className="p-4 rounded-xl bg-white border border-[#042718]/10 flex flex-col justify-between shadow-2xs">
              <div>
                <span className="font-mono text-[10px] text-[#188E39] uppercase font-bold block mb-1">
                  04 · Delivery
                </span>
                <h4 className="font-onest text-sm font-bold text-[#042718] mb-1">
                  ACTIONABLE PLATFORM CONTENT
                </h4>
                <p className="font-inter text-xs text-[#042718]/70 leading-relaxed">
                  Actionable routine with 1-tap deep links, transparent rationale, and quick-feedback telemetry chips.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-[#042718]/6 font-mono text-[10px] text-[#042718]/50">
                Grounded Workout Card
              </div>
            </div>
          </div>
        </div>

        {/* Separate Branch: Risk Intercept & Deterministic Fallback */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#FEF2F2]/70 border border-[#FCA5A5]/40">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-[#FCA5A5]/30">
            <div className="flex items-center gap-2">
              <ShieldAlert size={16} className="text-[#DC2626]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#991B1B]">
                SAFETY BRANCH · DETERMINISTIC FALLBACK (BYPASSES GENERATION)
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#DC2626]">
              Safety Before Engagement Principle
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
            <div className="p-4 rounded-xl bg-white/90 border border-[#FCA5A5]/40">
              <span className="font-mono text-[10px] text-[#DC2626] font-bold block mb-1">
                Trigger · High-Risk or Out-of-Scope Query
              </span>
              <h5 className="font-onest text-xs sm:text-sm font-bold text-[#7F1D1D] mb-1">
                HIGH-RISK / OUT-OF-SCOPE REQUEST
              </h5>
              <p className="font-inter text-xs text-[#991B1B]/80 leading-relaxed">
                Chest pain, acute joint injury, clinical rehabilitation, or eating disorder indications immediately halt generative inference.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/90 border border-[#FCA5A5]/40">
              <span className="font-mono text-[10px] text-[#DC2626] font-bold block mb-1">
                Response · Product Boundary Guardrail
              </span>
              <h5 className="font-onest text-xs sm:text-sm font-bold text-[#7F1D1D] mb-1">
                APPROPRIATE GUIDANCE / DETERMINISTIC FALLBACK
              </h5>
              <p className="font-inter text-xs text-[#991B1B]/80 leading-relaxed">
                Returns static, verified medical advisories and directs the user to certified clinical care, maintaining zero physical safety compromises.
              </p>
            </div>
          </div>
        </div>

        {/* ITERATION LOOP ARTIFACT */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#FAFDFB] border border-[#042718]/10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-[#042718]/8">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#042718]">
              ITERATION LOOP · FROM AMBIGUOUS CHARTER TO CONTROLLED ROLLOUT
            </span>
            <span className="font-mono text-[11px] text-[#188E39] font-semibold">
              ~300 → ~2,000 DAU in ~3 Months
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {iterationStages.map((stage, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white border border-[#042718]/10 text-center shadow-2xs"
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="font-mono text-[10px] text-[#188E39] font-bold">
                    {stage.num}
                  </span>
                  {idx < iterationStages.length - 1 && (
                    <ArrowRight size={11} className="text-[#042718]/30 hidden sm:inline" />
                  )}
                </div>
                <h5 className="font-onest text-xs font-bold text-[#042718]">
                  {stage.name}
                </h5>
                <span className="font-inter text-[10px] text-[#042718]/60 mt-0.5 block">
                  {stage.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* WHAT CHANGED AFTER TESTING VISUAL */}
        <div className="p-5 rounded-2xl bg-[#FAFDFB] border border-[#042718]/8">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#042718] block mb-3">
            WHAT CHANGED AFTER TESTING · EVIDENCE-BACKED ADAPTATIONS
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {whatChangedTesting.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white border border-[#042718]/8 shadow-2xs"
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                  <span className="text-[#DC2626] line-through">{item.before}</span>
                  <span className="text-[#188E39] font-bold">→ {item.after}</span>
                </div>
                <p className="font-inter text-xs text-[#042718]/75 leading-relaxed">
                  {item.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Product Principles Grid (Editorial Scale) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-[#FAFDFB] border border-[#042718]/8">
            <span className="font-mono text-[10px] text-[#188E39] font-bold block mb-0.5">
              Principle 01
            </span>
            <h5 className="font-onest text-xs font-bold text-[#042718]">Safety Before Engagement</h5>
            <p className="font-inter text-[11px] text-[#042718]/70 mt-1 leading-snug">
              User physical safety strictly supersedes conversational flair or lengthened session time.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAFDFB] border border-[#042718]/8">
            <span className="font-mono text-[10px] text-[#188E39] font-bold block mb-0.5">
              Principle 02
            </span>
            <h5 className="font-onest text-xs font-bold text-[#042718]">AI ≠ Doctor · Data ≠ Diagnosis</h5>
            <p className="font-inter text-[11px] text-[#042718]/70 mt-1 leading-snug">
              Heart rate spikes and calorie metrics are behavioral signals, never clinical diagnoses.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAFDFB] border border-[#042718]/8">
            <span className="font-mono text-[10px] text-[#188E39] font-bold block mb-0.5">
              Principle 03
            </span>
            <h5 className="font-onest text-xs font-bold text-[#042718]">Iterative Beta Discipline</h5>
            <p className="font-inter text-[11px] text-[#042718]/70 mt-1 leading-snug">
              Internal dogfooding → 100-user closed beta → production rollout. Hallucinations mitigated via mandatory clarifying taps.
            </p>
          </div>
        </div>
      </div>

      {/* Editorial Caption / Evidence Footer */}
      <div className="mt-6 pt-4 border-t border-current/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-inter text-[#042718]/70">
        <p className="italic">
          "The model can generate. The product defines the boundary."
        </p>
        <span className="font-mono text-[11px] font-semibold text-[#188E39] shrink-0">
          Scaled from ~300 to ~2,000 DAU in ~3 months behind deterministic safety guardrails
        </span>
      </div>
    </div>
  );
}

// =========================================================================
// 3. SPORTSTECH SUBSCRIPTION: THE PRODUCT JOURNEY & RETENTION TENSION
// =========================================================================
function SubscriptionEditorialJourney({
  theme,
  className = "",
}: {
  theme: "dark" | "light";
  className?: string;
}) {
  const isDark = theme === "dark";

  const journeySteps = [
    { num: "01", name: "SIGNUP", desc: "Frictionless social & email entry" },
    { num: "02", name: "ONBOARDING", desc: "Hardware pairing + goals ungated" },
    { num: "03", name: "TRIAL / PAYWALL", desc: "Delayed trial offer after 1st routine" },
    { num: "04", name: "SUBSCRIPTION", desc: "Annual packaging with clear savings" },
    { num: "05", name: "PAYMENT", desc: "Transparent billing & 1-tap cancel UX" },
    { num: "06", name: "VALUE REALISATION", desc: "Habit lock past Workout #3 & #5" },
    { num: "07", name: "RENEWAL / CANCEL", desc: "Annual recap & EU-compliant UX" },
  ];

  return (
    <div
      className={`my-10 p-6 sm:p-8 md:p-10 rounded-[24px] border ${
        isDark
          ? "bg-[#042718] text-white border-white/10"
          : "bg-white text-[#042718] border-[#042718]/10 shadow-xs"
      } ${className}`}
      aria-label="Sportstech Subscription Monetization Journey"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-6 pb-5 border-b border-current/10">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#188E39] font-bold block mb-1">
            Monetization Architecture · Growth & Retention
          </span>
          <h3 className="font-onest text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
            THE PRODUCT JOURNEY: PERCEIVED VALUE BEFORE THE PAYWALL
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono shrink-0">
          <span className="px-3 py-1 rounded-full bg-[#188E39]/12 text-[#188E39] font-semibold">
            €659K FY25 Revenue
          </span>
          <span className="px-3 py-1 rounded-full bg-[#042718]/5 text-[#042718]/80 font-semibold border border-current/10">
            81.9% YoY Growth · 96.8% Retention
          </span>
        </div>
      </div>

      <p className="font-inter text-sm sm:text-base text-[#042718]/80 leading-relaxed mb-8 max-w-3xl">
        "Monetization is fundamentally a product problem, not just a pricing problem." The core challenge was creating enough perceived value to make paid membership make sense while protecting existing customer trust. Instead of aggressive Day-1 paywalls that trigger customer revolt, monetization was structured as progressive value realization.
      </p>

      {/* Full Product Journey Sequence */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#FAFDFB] border border-[#042718]/10 mb-6">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#042718]/8">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#188E39]">
            END-TO-END USER JOURNEY
          </span>
          <span className="font-mono text-[11px] text-[#042718]/60">
            Full-Launch Execution · Transparent Terms
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5">
          {journeySteps.map((step, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white border border-[#042718]/8 flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] text-[#188E39] font-bold">
                    {step.num}
                  </span>
                  {idx < journeySteps.length - 1 && (
                    <ArrowRight size={12} className="text-[#042718]/30 hidden lg:block" />
                  )}
                </div>
                <h4 className="font-onest text-xs sm:text-sm font-bold text-[#042718] leading-tight">
                  {step.name}
                </h4>
              </div>
              <p className="font-inter text-[11px] text-[#042718]/70 mt-2 leading-snug">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Horizontal Tension Underneath: Conversion ↕ Value Realization ↕ Retention */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#FAFDFB] border border-[#042718]/10">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8A5A16] block mb-3">
          THE THREE PRODUCT FORCES BALANCED
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white border border-[#042718]/8 shadow-2xs">
            <span className="font-mono text-[10px] uppercase font-bold text-[#8A5A16] block mb-1">
              Pillar 01 · Trust & Compliance
            </span>
            <h5 className="font-onest text-sm font-bold text-[#042718] mb-1">
              CONVERSION WITH EMPATHY
            </h5>
            <p className="font-inter text-xs text-[#042718]/70 leading-relaxed">
              Transparent 7-day trial terms, upfront renewal countdown notifications, and 1-tap cancellation UX strictly complying with European consumer protection directives.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#ECFDF5] border border-[#188E39]/30 shadow-2xs">
            <span className="font-mono text-[10px] uppercase font-bold text-[#188E39] block mb-1">
              Pillar 02 · Utility Core
            </span>
            <h5 className="font-onest text-sm font-bold text-[#065F46] mb-1">
              VALUE REALISATION
            </h5>
            <p className="font-inter text-xs text-[#042718]/80 leading-relaxed">
              Hardware pairing kept 100% free; habit formation stabilized past Workout #3 and Workout #5 through dynamic schedule adaptation and live sensor telemetry.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#042718]/8 shadow-2xs">
            <span className="font-mono text-[10px] uppercase font-bold text-[#8A5A16] block mb-1">
              Pillar 03 · Long-Term Health
            </span>
            <h5 className="font-onest text-sm font-bold text-[#042718] mb-1">
              COMPOUNDING RETENTION
            </h5>
            <p className="font-inter text-xs text-[#042718]/70 leading-relaxed">
              Prioritizing annual commitments with substantial upfront savings, resulting in a 96.8% yearly-plan cohort retention rate across mature subscribers.
            </p>
          </div>
        </div>

        {/* Renewal Friction Analysis Block */}
        <div className="mt-5 p-4 rounded-xl bg-white border border-[#A8711A]/20">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="font-mono text-[11px] uppercase font-bold text-[#A8711A]">
              RENEWAL FRICTION ARCHITECTURE
            </span>
            <span className="font-mono text-[10px] text-[#042718]/60">
              Hardware Bundle Expiry Dilemma
            </span>
          </div>
          <p className="font-inter text-xs text-[#042718]/75 mb-3 leading-relaxed">
            "Renewal was not just a billing problem. It was a product-friction problem." When bundled hardware subscriptions expired, users faced high cognitive friction:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono text-[11px]">
            <div className="p-2 rounded-lg bg-[#FAFDFB] border border-[#042718]/8">
              <span className="text-[#042718]/50 block text-[9px] mb-0.5">FRICTION 01</span>
              <span className="text-[#042718] font-bold">Which Platform?</span>
              <span className="text-[10px] text-[#042718]/60 block mt-0.5">iOS vs Android vs Web</span>
            </div>
            <div className="p-2 rounded-lg bg-[#FAFDFB] border border-[#042718]/8">
              <span className="text-[#042718]/50 block text-[9px] mb-0.5">FRICTION 02</span>
              <span className="text-[#042718] font-bold">Which Plan?</span>
              <span className="text-[10px] text-[#042718]/60 block mt-0.5">Monthly vs Annual Tier</span>
            </div>
            <div className="p-2 rounded-lg bg-[#FAFDFB] border border-[#042718]/8">
              <span className="text-[#042718]/50 block text-[9px] mb-0.5">FRICTION 03</span>
              <span className="text-[#042718] font-bold">Re-enter Card</span>
              <span className="text-[10px] text-[#042718]/60 block mt-0.5">Payment method entry</span>
            </div>
            <div className="p-2 rounded-lg bg-[#ECFDF5] border border-[#188E39]/30">
              <span className="text-[#188E39] block text-[9px] mb-0.5">PRODUCT FIX</span>
              <span className="text-[#065F46] font-bold">1-Tap Resubscribe</span>
              <span className="text-[10px] text-[#065F46]/70 block mt-0.5">Pre-selected best tier</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Caption / Evidence Footer */}
      <div className="mt-6 pt-4 border-t border-current/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-inter text-[#042718]/70">
        <p className="italic">
          "The challenge was creating enough perceived value to make paid membership make sense while protecting existing customer trust."
        </p>
        <span className="font-mono text-[11px] font-semibold text-[#188E39] shrink-0">
          Full launch execution · 12,401 paid subscribers
        </span>
      </div>
    </div>
  );
}

// =========================================================================
// 4. PERFORMANCE SCORE: THE 3 EDITORIAL MOMENTS (P0 READY FOR DEVELOPMENT)
// =========================================================================
function PerformanceScoreEditorialEcosystem({
  moment = "all",
  theme,
  className = "",
}: {
  moment?: "ecosystem" | "migration" | "hardware-tiers" | "all";
  theme: "dark" | "light";
  className?: string;
}) {
  const isDark = theme === "dark";

  return (
    <div className={`my-10 flex flex-col gap-8 ${className}`}>
      {/* MOMENT 1: LARGE ECOSYSTEM MAP */}
      {(moment === "all" || moment === "ecosystem") && (
        <div
          className={`p-6 sm:p-8 md:p-10 rounded-[24px] border ${
            isDark
              ? "bg-[#042718] text-white border-white/10"
              : "bg-white text-[#042718] border-[#042718]/10 shadow-xs"
          }`}
          aria-label="Performance Score Ecosystem Map"
        >
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-6 pb-5 border-b border-current/10">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#188E39] font-bold block mb-1">
                Visual Moment 01 · Ecosystem Map
              </span>
              <h3 className="font-onest text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                ONE BODY. ONE SCORE. ONE ECOSYSTEM.
              </h3>
              <span className="font-mono text-xs text-[#042718]/60 block mt-0.5">
                From 5 Fragmented Surfaces to One Unified Experience
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono shrink-0">
              <span className="px-3 py-1 rounded-full bg-[#7E22CE]/12 text-[#7E22CE] font-bold border border-[#7E22CE]/20">
                P0 · READY FOR DEVELOPMENT
              </span>
            </div>
          </div>

          <p className="font-inter text-sm sm:text-base text-[#042718]/80 leading-relaxed mb-8 max-w-3xl">
            "Before promising users one measure of progress, we had to make five surfaces behave like one product." This architectural map established a single Athletic Reliability contract uniting mobile, consoles, gym machines, and firmware.
          </p>

          {/* 3-Level Vertical Stack with Clear Connecting Bridges */}
          <div className="flex flex-col gap-4">
            {/* LEVEL 01: PRODUCT SURFACES */}
            <div className="p-5 rounded-2xl bg-[#FAFDFB] border border-[#042718]/8">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#042718]/70">
                  LEVEL 01 · 5 PRODUCT SURFACES
                </span>
                <span className="font-mono text-[11px] text-[#042718]/50">
                  Disparate Sampling Cadences
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {[
                  { name: "iOS App", tech: "HealthKit · BLE" },
                  { name: "Android App", tech: "Health Connect" },
                  { name: "Touch Display", tech: "Cardio Embedded" },
                  { name: "Smart Gym", tech: "Strength Console" },
                  { name: "BLE Firmware", tech: "sPulse Sensor" },
                ].map((s) => (
                  <div
                    key={s.name}
                    className="p-3 rounded-xl bg-white border border-[#042718]/10 text-center shadow-2xs"
                  >
                    <span className="font-onest text-xs sm:text-sm font-bold text-[#042718] block">
                      {s.name}
                    </span>
                    <span className="font-mono text-[10px] text-[#042718]/50 block mt-0.5">
                      {s.tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ingestion Connector */}
            <div className="flex justify-center items-center gap-2 py-0.5">
              <div className="h-px bg-[#042718]/15 flex-1" />
              <span className="font-mono text-[11px] text-[#188E39] font-semibold px-3 py-0.5 rounded-full bg-[#188E39]/10">
                ↓ Event Normalization & Ingestion Layer ↓
              </span>
              <div className="h-px bg-[#042718]/15 flex-1" />
            </div>

            {/* LEVEL 02: FOUNDATION */}
            <div className="p-5 rounded-2xl bg-[#FAFDFB] border border-[#042718]/8">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#188E39]">
                  LEVEL 02 · UNIFIED DATA FOUNDATION
                </span>
                <span className="font-mono text-[11px] text-[#188E39] font-semibold">
                  Zero Data Fragmentation
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-[#188E39]/30 shadow-2xs">
                  <span className="font-mono text-[10px] font-bold text-[#188E39] block mb-0.5">
                    Schema Contract
                  </span>
                  <h5 className="font-onest text-xs sm:text-sm font-bold text-[#042718]">
                    Unified WorkoutSession
                  </h5>
                  <p className="font-inter text-[11px] text-[#042718]/70 mt-1">
                    Normalized telemetry schema across all strength, cardio, and wearable endpoints.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#188E39]/30 shadow-2xs">
                  <span className="font-mono text-[10px] font-bold text-[#188E39] block mb-0.5">
                    Data Integrity
                  </span>
                  <h5 className="font-onest text-xs sm:text-sm font-bold text-[#042718]">
                    Idempotent Ingestion
                  </h5>
                  <p className="font-inter text-[11px] text-[#042718]/70 mt-1">
                    Prevents double-counting when users record simultaneously on phone and smart gym.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#188E39]/30 shadow-2xs">
                  <span className="font-mono text-[10px] font-bold text-[#188E39] block mb-0.5">
                    Scoring Engine
                  </span>
                  <h5 className="font-onest text-xs sm:text-sm font-bold text-[#042718]">
                    Athletic Reliability Core
                  </h5>
                  <p className="font-inter text-[11px] text-[#042718]/70 mt-1">
                    Calculates holistic exertion and recovery confidence regardless of sensor availability.
                  </p>
                </div>
              </div>
            </div>

            {/* Experience Connector */}
            <div className="flex justify-center items-center gap-2 py-0.5">
              <div className="h-px bg-[#042718]/15 flex-1" />
              <span className="font-mono text-[11px] text-[#188E39] font-semibold px-3 py-0.5 rounded-full bg-[#188E39]/10">
                ↓ Front-End Experience Delivery ↓
              </span>
              <div className="h-px bg-[#042718]/15 flex-1" />
            </div>

            {/* LEVEL 03: EXPERIENCE */}
            <div className="p-5 rounded-2xl bg-[#ECFDF5] border border-[#188E39]/30">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#065F46]">
                  LEVEL 03 · UNIFIED USER EXPERIENCE
                </span>
                <span className="font-mono text-[11px] text-[#059669] font-semibold">
                  Consistent Everywhere
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-[#188E39]/30 shadow-2xs">
                  <h5 className="font-onest text-sm font-bold text-[#042718] mb-0.5">
                    0–100 Performance Score
                  </h5>
                  <p className="font-inter text-[11px] text-[#042718]/75 leading-relaxed">
                    A singular, intuitive progress index replacing fragmented reps, calories, and zones.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#188E39]/30 shadow-2xs">
                  <h5 className="font-onest text-sm font-bold text-[#042718] mb-0.5">
                    My Activity Timeline
                  </h5>
                  <p className="font-inter text-[11px] text-[#042718]/75 leading-relaxed">
                    Unified multi-device session history rendering seamlessly across phone and equipment.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#188E39]/30 shadow-2xs">
                  <h5 className="font-onest text-sm font-bold text-[#042718] mb-0.5">
                    Wellness Dashboard
                  </h5>
                  <p className="font-inter text-[11px] text-[#042718]/75 leading-relaxed">
                    Synthesized exertion and recovery feedback that motivates without causing data fatigue.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-current/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-inter text-[#042718]/70">
            <p className="italic">
              "Before promising users one measure of progress, make the ecosystem behave like one product."
            </p>
            <span className="font-mono text-[11px] font-semibold text-[#7E22CE] shrink-0">
              P0 · Ready for Development · No post-launch claims
            </span>
          </div>
        </div>
      )}

      {/* MOMENT 2: MIGRATION STRATEGY */}
      {(moment === "all" || moment === "migration") && (
        <div
          className={`p-6 sm:p-8 md:p-10 rounded-[24px] border ${
            isDark
              ? "bg-[#042718] text-white border-white/10"
              : "bg-white text-[#042718] border-[#042718]/10 shadow-xs"
          }`}
          aria-label="Performance Score Migration Strategy"
        >
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-6 pb-5 border-b border-current/10">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#188E39] font-bold block mb-1">
                Visual Moment 02 · Migration Strategy
              </span>
              <h3 className="font-onest text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                THE 3-PHASE DUAL-WRITE MIGRATION ROADMAP
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono shrink-0">
              <span className="px-3 py-1 rounded-full bg-[#188E39]/12 text-[#188E39] font-semibold">
                P0 · Ready for Development
              </span>
              <span className="px-3 py-1 rounded-full bg-[#042718]/5 text-[#042718]/80 font-semibold border border-current/10">
                Idempotent Data Path
              </span>
            </div>
          </div>

          <p className="font-inter text-sm sm:text-base text-[#042718]/80 leading-relaxed mb-8 max-w-3xl">
            Thousands of live workouts could not tolerate dropped Bluetooth packets or database lockups. Instead of a single high-risk "big-bang" cutover, the architecture specified a phased dual-write bridge to deprecate legacy tables safely.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                phase: "PHASE 01",
                title: "DUAL-WRITE",
                desc: "Standalone dashboard continues while unified workout events are emitted to the central data layer.",
                status: "Proposed Strategy",
              },
              {
                phase: "PHASE 02",
                title: "UNIFIED READ",
                desc: "Smart Gym reads profile/score/goals from the central data layer.",
                status: "Proposed Strategy",
              },
              {
                phase: "PHASE 03",
                title: "DECOMMISSION LEGACY",
                desc: "Standalone dashboard is removed and Smart Gym uses the unified data layer.",
                status: "Proposed Strategy",
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#FAFDFB] border border-[#042718]/8 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] text-[#188E39] font-bold">
                      {p.phase}
                    </span>
                    {idx < 2 && (
                      <ArrowRight size={12} className="text-[#042718]/30 hidden md:block" />
                    )}
                  </div>
                  <h4 className="font-onest text-xs sm:text-sm font-bold text-[#042718] mb-1">
                    {p.title}
                  </h4>
                  <p className="font-inter text-[11px] text-[#042718]/70 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#042718]/6 font-mono text-[10px] text-[#188E39] font-medium">
                  {p.status}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-current/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-inter text-[#042718]/70">
            <p className="italic">
              "A user-facing metric is only as credible as the data pipeline underneath."
            </p>
            <span className="font-mono text-[11px] font-semibold text-[#188E39] shrink-0">
              DUAL-WRITE → UNIFIED READ → DECOMMISSION LEGACY (P0 · READY FOR DEV)
            </span>
          </div>
        </div>
      )}

      {/* MOMENT 3: HARDWARE / TIER MODEL */}
      {(moment === "all" || moment === "hardware-tiers") && (
        <div
          className={`p-6 sm:p-8 md:p-10 rounded-[24px] border ${
            isDark
              ? "bg-[#042718] text-white border-white/10"
              : "bg-white text-[#042718] border-[#042718]/10 shadow-xs"
          }`}
          aria-label="Performance Score Hardware Tier Model"
        >
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-6 pb-5 border-b border-current/10">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#188E39] font-bold block mb-1">
                Visual Moment 03 · Hardware & Tier Model
              </span>
              <h3 className="font-onest text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                HARDWARE STRATEGY: ASPIRATION, NOT A GATE
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono shrink-0">
              <span className="px-3 py-1 rounded-full bg-[#188E39]/12 text-[#188E39] font-semibold">
                100% Mobile Access
              </span>
              <span className="px-3 py-1 rounded-full bg-[#042718]/5 text-[#042718]/80 font-semibold border border-current/10">
                3 Telemetry Tiers
              </span>
            </div>
          </div>

          <p className="font-inter text-sm sm:text-base text-[#042718]/80 leading-relaxed mb-8 max-w-3xl">
            "Hardware should be an aspiration, not an exclusionary gate." Over 80% of mobile users did not own connected equipment; locking the progress score behind a €500+ machine would alienate the community. The system engineered three progressive calculation tiers:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tier 1 */}
            <div className="p-5 rounded-2xl bg-[#FAFDFB] border border-[#042718]/8 flex flex-col justify-between shadow-2xs">
              <div>
                <span className="font-mono text-[10px] text-[#188E39] font-bold uppercase block mb-1">
                  Tier 01 · Software Baseline
                </span>
                <h4 className="font-onest text-base font-bold text-[#042718] mb-1">
                  NO HARDWARE
                </h4>
                <p className="font-inter text-xs text-[#042718]/70 leading-relaxed">
                  Calculates score using session duration, self-reported RPE (Rate of Perceived Exertion 1–10), and weekly workout consistency. Zero sensor required.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#042718]/6 font-mono text-[11px] text-[#042718]/60">
                100% of mobile users included
              </div>
            </div>

            {/* Tier 2 */}
            <div className="p-5 rounded-2xl bg-white border border-[#188E39]/30 flex flex-col justify-between shadow-2xs">
              <div>
                <span className="font-mono text-[10px] text-[#188E39] font-bold uppercase block mb-1">
                  Tier 02 · Sensor-Enhanced
                </span>
                <h4 className="font-onest text-base font-bold text-[#042718] mb-1">
                  sPulse HR-ENHANCED
                </h4>
                <p className="font-inter text-xs text-[#042718]/70 leading-relaxed">
                  Pairs with BLE heart-rate armbands and chest straps. Calculates live cardio zone distribution, peak effort spikes, and physiological strain.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#042718]/6 font-mono text-[11px] text-[#188E39] font-medium">
                Live cardiovascular telemetry
              </div>
            </div>

            {/* Tier 3 */}
            <div className="p-5 rounded-2xl bg-[#FAFDFB] border border-[#042718]/8 flex flex-col justify-between shadow-2xs">
              <div>
                <span className="font-mono text-[10px] text-[#188E39] font-bold uppercase block mb-1">
                  Tier 03 · Bio-Centric Recovery
                </span>
                <h4 className="font-onest text-base font-bold text-[#042718] mb-1">
                  TRACKER / RING BIO-CENTRIC
                </h4>
                <p className="font-inter text-xs text-[#042718]/70 leading-relaxed">
                  Integrates continuous biometric recovery metrics: resting heart rate trends, sleep stage duration, and overnight HRV recovery capacity.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#042718]/6 font-mono text-[11px] text-[#042718]/60">
                Full 24/7 recovery synthesis
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-current/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-inter text-[#042718]/70">
            <p className="italic">
              "Hardware enhances the experience. Hardware does not gate the core score."
            </p>
            <span className="font-mono text-[11px] font-semibold text-[#7E22CE] shrink-0">
              P0 Blueprint · Development-Ready
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 5. AI LOCALIZATION: OPERATING MODEL TRANSFORMATION (OLD VS NEW)
// =========================================================================
function AiLocalizationEditorialOperatingModel({
  theme,
  className = "",
}: {
  theme: "dark" | "light";
  className?: string;
}) {
  const isDark = theme === "dark";

  const oldOperatingSteps = [
    { name: "Studio Setup", detail: "Scout European filming space & crew" },
    { name: "Trainer Hiring", detail: "Casting native trainers per country" },
    { name: "Filming", detail: "On-set production (20 videos/shoot)" },
    { name: "Post-Production", detail: "Extensive editing, audio mix & color" },
    { name: "Publishing", detail: "Manual localized subtitle upload" },
  ];

  const newOperatingSteps = [
    { name: "Existing Video", detail: "Source 200+ English master catalog", isHuman: false },
    { name: "AI Localization", detail: "ElevenLabs voice cloning & HeyGen sync", isHuman: false },
    { name: "Cue Guidelines", detail: "Standardized fitness cue memory", isHuman: false },
    { name: "Human Review", detail: "Dedicated native-speaker verification pass", isHuman: true },
    { name: "Language/Lip Check", detail: "Idiomatic coaching tone check", isHuman: true },
    { name: "Catalog Publish", detail: "IT, FR, ES catalogs live in ~3 wks", isHuman: false },
  ];

  return (
    <div
      className={`my-10 p-6 sm:p-8 md:p-10 rounded-[24px] border ${
        isDark
          ? "bg-[#042718] text-white border-white/10"
          : "bg-white text-[#042718] border-[#042718]/10 shadow-xs"
      } ${className}`}
      aria-label="AI Localization Operating Model"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-6 pb-5 border-b border-current/10">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#188E39] font-bold block mb-1">
            Operational AI Engineering · European Expansion
          </span>
          <h3 className="font-onest text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
            OPERATING MODEL: TRADITIONAL STUDIO VS AI-ASSISTED PIPELINE
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono shrink-0">
          <span className="px-3 py-1 rounded-full bg-[#188E39]/12 text-[#188E39] font-semibold">
            200+ videos in ~3 weeks
          </span>
          <span className="px-3 py-1 rounded-full bg-[#042718]/5 text-[#042718]/80 font-semibold border border-current/10">
            High brand integrity
          </span>
        </div>
      </div>

      <p className="font-inter text-sm sm:text-base text-[#042718]/80 leading-relaxed mb-8 max-w-3xl">
        "Technology creates leverage when it reorganizes the operating model. AI shortened the production cycle, while human review remained the quality gate." Rather than unconstrained machine translations that butchered gym terminology, the pipeline orchestrated commercial tools with mandatory human governance.
      </p>

      {/* Comparative Operating Model Blocks */}
      <div className="flex flex-col gap-6">
        {/* OLD TRADITIONAL STUDIO WORKFLOW */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#FEF2F2]/70 border border-[#FCA5A5]/40">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#FCA5A5]/30">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#991B1B]">
                OLD OPERATING MODEL · TRADITIONAL STUDIO WORKFLOW
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#DC2626] font-medium">
              3–4 Months per 20 Videos · Heavy Capex · International Launch Delay
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
            {oldOperatingSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/90 border border-[#FCA5A5]/40 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-[10px] text-[#DC2626] font-semibold block mb-1">
                    Stage 0{idx + 1}
                  </span>
                  <h4 className="font-onest text-xs sm:text-sm font-bold text-[#7F1D1D] leading-snug">
                    {step.name}
                  </h4>
                </div>
                <span className="font-inter text-[11px] text-[#991B1B]/75 mt-2 block leading-tight">
                  {step.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Transition Indicator */}
        <div className="flex items-center justify-center gap-3 py-1">
          <div className="h-px bg-[#042718]/15 flex-1" />
          <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#188E39] px-3 py-1 rounded-full bg-[#188E39]/10">
            Operational Model Transformation ↓
          </span>
          <div className="h-px bg-[#042718]/15 flex-1" />
        </div>

        {/* NEW AI-ASSISTED + HUMAN-GOVERNED PIPELINE */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#ECFDF5]/80 border border-[#6EE7B7]/50">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#6EE7B7]/40">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#059669]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#065F46]">
                NEW OPERATING MODEL · AI-ASSISTED + HUMAN-GOVERNED PIPELINE
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#059669] font-medium">
              ~3 Weeks Turnaround · ~10× Faster Velocity · 100% Brand Safe
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5">
            {newOperatingSteps.map((step, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl flex flex-col justify-between shadow-2xs ${
                  step.isHuman
                    ? "bg-[#ECFDF5] border-2 border-[#059669] ring-2 ring-[#059669]/20"
                    : "bg-white border border-[#188E39]/30"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-[#188E39] font-bold">
                      0{idx + 1}
                    </span>
                    {step.isHuman && (
                      <span className="font-mono text-[9px] uppercase font-bold text-[#059669] bg-[#059669]/10 px-1.5 py-0.5 rounded">
                        Quality Gate
                      </span>
                    )}
                    {idx < newOperatingSteps.length - 1 && !step.isHuman && (
                      <ArrowRight size={12} className="text-[#188E39]/50 hidden lg:block" />
                    )}
                  </div>
                  <h4 className={`font-onest text-xs sm:text-sm font-bold leading-tight ${
                    step.isHuman ? "text-[#065F46]" : "text-[#042718]"
                  }`}>
                    {step.name}
                  </h4>
                </div>
                <p className="font-inter text-[11px] text-[#042718]/70 mt-2 leading-snug">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Human Review Gate Callout (Non-Negotiable Quality Constraint) */}
      <div className="mt-6 p-4 rounded-xl bg-[#FAFDFB] border border-[#042718]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-inter">
        <div>
          <span className="font-mono font-bold uppercase tracking-wider text-[#188E39] block mb-0.5">
            Non-Negotiable Governance Gate
          </span>
          <p className="text-[#042718]/80 leading-relaxed">
            Every translated video underwent a dedicated native-speaker review gate to eliminate physiological coaching errors (e.g. preventing "break your knees" instead of "soft bend in the knees").
          </p>
        </div>
        <span className="font-mono text-[11px] font-semibold text-[#042718]/60 shrink-0">
          Not Zero-Touch · Human-in-the-Loop
        </span>
      </div>

      {/* Editorial Caption / Evidence Footer */}
      <div className="mt-6 pt-4 border-t border-current/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-inter text-[#042718]/70">
        <p className="italic">
          "AI shortened the production cycle, while human review remained the quality gate."
        </p>
        <span className="font-mono text-[11px] font-semibold text-[#188E39] shrink-0">
          Italian, French, and Spanish Catalogs Live
        </span>
      </div>
    </div>
  );
}
