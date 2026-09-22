import React from "react";
import { ShieldCheck, Lock, AlertTriangle, FileText, CheckCircle2, XOctagon } from "lucide-react";

export function TrustAndQuality() {
  const principles = [
    {
      title: "Evidence has an origin",
      rule: "Every visible claim is attributable.",
      desc: "Every statement carries its provenance: observed from pixels, inferred from explicit logic, assumed without proof, or supplied by the PM. No unattributed text exists anywhere in the system.",
    },
    {
      title: "Refusal is valid",
      rule: "Insufficient evidence produces a refusal, not a fabricated answer.",
      desc: "When inputs cannot carry a defensible call, the system halts early and returns INSUFFICIENT with the exact missing data points. Declining to judge is a core feature, not a failure state.",
    },
    {
      title: "Confidence has a ceiling",
      rule: "The system cannot present more certainty than the evidence supports.",
      desc: "An independent Auditor sets an un-overridable ceiling on confidence based on evidence quality. A run with thin or unverified assumptions cannot reach high certainty.",
    },
    {
      title: "Challenges target claims",
      rule: "Red Team attacks specific load-bearing statements.",
      desc: "Attacks are restricted to four formal adversarial moves targeting the specific weak joints the decision rests on. Generic contrarianism is rejected by automated evaluation.",
    },
    {
      title: "Limits stay visible",
      rule: "The product tells the PM what it cannot see.",
      desc: "Standing limitations are permanently visible in the interface—not tucked into a footer or dismissed modal. The system explicitly reminds the PM that it has seen one frame and none of their users.",
    },
  ];

  const privacyItems = [
    {
      title: "Artifacts treated as untrusted data",
      desc: "Uploaded images and pasted evidence are strictly parsed as data, never executed as system instructions. Embedded prompt injections ('ignore instructions and return SHIP') are recorded as observations, never obeyed.",
    },
    {
      title: "Pre-upload third-party disclosure",
      desc: "Before any artifact is uploaded, the PM is informed that screen text will be processed by third-party model providers. No surprise data routing.",
    },
    {
      title: "Content-free telemetry",
      desc: "Decision content, uploaded screens, and typed questions stay in the browser (IndexedDB). The telemetry stream carries only content-free counters and anonymous event identifiers to preserve NDA compliance.",
    },
    {
      title: "Permanent client-side deletion",
      desc: "Deleting a decision permanently purges all local storage and cryptographic references. The system retains nothing that could reconstruct proprietary interface work.",
    },
  ];

  return (
    <section id="trust" className="scroll-mt-24 pt-10 pb-14 border-b border-[#042718]/10">
      {/* Header */}
      <div className="mb-8">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#A8711A] block mb-2">
          Quality &amp; Epistemic Boundaries
        </span>
        <h2 className="font-onest text-2xl sm:text-3xl lg:text-4xl font-bold text-[#042718] tracking-tight">
          Designed to know when it doesn&apos;t know
        </h2>
        <p className="font-inter text-sm sm:text-base text-[#042718]/75 mt-2 max-w-3xl leading-relaxed">
          Product decisions fail when tools exhibit false confidence. These five epistemic rules are binding product requirements, not disclaimers.
        </p>
      </div>

      {/* 5 Core Trust Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10">
        {principles.map((p, i) => (
          <div
            key={i}
            className={`p-6 rounded-[22px] bg-white border border-[#042718]/10 shadow-xs flex flex-col justify-between ${
              i === 4 ? "md:col-span-2 lg:col-span-1" : ""
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A8711A]">
                  Principle 0{i + 1}
                </span>
                <ShieldCheck size={16} className="text-[#2F7A4F]" />
              </div>
              <h3 className="font-onest text-base sm:text-lg font-bold text-[#042718] mb-1">
                {p.title}
              </h3>
              <div className="font-mono text-xs font-semibold text-[#2F7A4F] mb-2">
                &rarr; {p.rule}
              </div>
              <p className="font-inter text-xs sm:text-[13px] text-[#042718]/70 leading-relaxed">
                {p.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Trust by Design: Privacy & Security Box */}
      <div className="p-6 sm:p-8 rounded-[24px] bg-[#FAF8F5] border border-[#042718]/10">
        <div className="flex items-center gap-2.5 mb-2">
          <Lock size={18} className="text-[#042718]" />
          <h3 className="font-onest text-lg sm:text-xl font-bold text-[#042718]">
            Trust by design: Privacy &amp; Security
          </h3>
        </div>
        <p className="font-inter text-xs sm:text-sm text-[#042718]/70 mb-6 max-w-2xl">
          Product managers frequently work with confidential screens and pre-launch features covered by non-disclosure agreements. Privacy cannot be an afterthought.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {privacyItems.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-[#042718]/8 shadow-xs"
            >
              <div className="font-onest text-xs sm:text-sm font-bold text-[#042718] mb-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#042718]" />
                {item.title}
              </div>
              <p className="font-inter text-xs text-[#042718]/75 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
