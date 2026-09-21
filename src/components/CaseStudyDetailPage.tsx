import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Quote,
} from "lucide-react";
import { CaseStudyDetail } from "../types";
import { ALL_FLAGSHIP_CASE_STUDIES, ALL_CASE_STUDIES } from "../data/caseStudies";
import { MechanismVisual, MechanismSlug } from "./MechanismVisual";

interface CaseStudyDetailPageProps {
  caseStudy: CaseStudyDetail;
  onNavigate: (path: string) => void;
}

export default function CaseStudyDetailPage({
  caseStudy,
  onNavigate,
}: CaseStudyDetailPageProps) {
  useEffect(() => {
    // Instant scroll to top on mount to eliminate unwanted sliding animations during route transition
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [caseStudy.id]);

  // Find adjacent case studies for next/previous navigation safely
  const studyList = ALL_FLAGSHIP_CASE_STUDIES.some((c) => c.id === caseStudy.id)
    ? ALL_FLAGSHIP_CASE_STUDIES
    : ALL_CASE_STUDIES;
  const foundIndex = studyList.findIndex((c) => c.id === caseStudy.id);
  const currentIndex = foundIndex >= 0 ? foundIndex : 0;
  const nextStudy = studyList[(currentIndex + 1) % studyList.length];
  const prevStudy =
    studyList[(currentIndex - 1 + studyList.length) % studyList.length];

  return (
    <div className="w-full bg-[#FAFDFB] text-[#042718]">
      {/* =========================================================================
          HERO & HEADER
          ========================================================================= */}
      <section className="pt-10 pb-16 md:pt-14 md:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Work Link */}
          <button
            type="button"
            onClick={() => onNavigate("/work")}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-inter font-medium text-[#042718]/60 hover:text-[#188E39] mb-8 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to all work</span>
          </button>

          {/* Eyebrow & Status Notice */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#042718]/5 text-xs font-inter font-semibold text-[#042718]">
              {caseStudy.category}
            </span>
            {caseStudy.isStrategyOnly && (
              <span className="px-3 py-1 rounded-full bg-[#F3E8FF] text-[#7E22CE] text-xs font-inter font-semibold">
                Product Strategy · Systems Architecture
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-onest text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#042718] leading-[1.15] mb-4">
            {caseStudy.title}
          </h1>

          {/* Subtitle */}
          <p className="font-inter text-lg sm:text-xl font-medium text-[#042718]/80 leading-relaxed mb-6">
            {caseStudy.subtitle}
          </p>

          {/* Role and Timeline */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-inter text-[#042718]/60 border-t border-b border-[#042718]/8 py-4 mb-8">
            <div>
              <span className="font-semibold text-[#042718]">Role: </span>
              <span>{caseStudy.role}</span>
            </div>
            <div className="hidden sm:block text-[#042718]/20">•</div>
            <div>
              <span className="font-semibold text-[#042718]">Timeline: </span>
              <span>{caseStudy.timeline}</span>
            </div>
          </div>

          {/* Thesis Statement */}
          <div className="mb-8 pb-6 border-b border-[#042718]/8">
            <p className="font-onest font-semibold text-2xl sm:text-[28px] leading-snug text-[#042718]">
              {caseStudy.thesis}
            </p>
            {caseStudy.centralQuestion && (
              <p className="font-inter text-sm text-[#042718]/70 mt-4">
                <span className="font-semibold text-[#042718]">The question I kept coming back to: </span>
                {caseStudy.centralQuestion}
              </p>
            )}
          </div>

          {/* Quick Context First-Screen Matrix (Problem, Why It Mattered, Ownership, What Changed) */}
          {caseStudy.quickContext && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 p-5 sm:p-6 rounded-[20px] bg-white border border-[#042718]/8 shadow-2xs">
              <div className="p-3.5 rounded-xl bg-[#FAFDFB] border border-[#042718]/6">
                <span className="text-[11px] font-inter font-bold uppercase tracking-wider text-[#042718]/50 block mb-1">
                  The Problem
                </span>
                <p className="text-xs sm:text-sm font-inter text-[#042718]/80 leading-relaxed">
                  {caseStudy.quickContext.problem}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAFDFB] border border-[#042718]/6">
                <span className="text-[11px] font-inter font-bold uppercase tracking-wider text-[#8A5A16] block mb-1">
                  Why It Mattered
                </span>
                <p className="text-xs sm:text-sm font-inter text-[#042718]/80 leading-relaxed">
                  {caseStudy.quickContext.whyItMattered}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAFDFB] border border-[#042718]/6">
                <span className="text-[11px] font-inter font-bold uppercase tracking-wider text-[#188E39] block mb-1">
                  What I Personally Owned
                </span>
                <p className="text-xs sm:text-sm font-inter text-[#042718]/85 leading-relaxed font-medium">
                  {caseStudy.quickContext.myOwnership}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAFDFB] border border-[#042718]/6">
                <span className="text-[11px] font-inter font-bold uppercase tracking-wider text-[#042718] block mb-1">
                  {caseStudy.slug === 'performance-score' ? 'Designed System' : 'What Changed'}
                </span>
                <p className="text-xs sm:text-sm font-inter text-[#042718] leading-relaxed font-medium">
                  {caseStudy.quickContext.whatChanged}
                </p>
              </div>
            </div>
          )}

          {/* Strategy Status Callout if applicable */}
          {caseStudy.statusNotice && (
            <div className="p-4 rounded-[16px] bg-[#F3E8FF]/40 border border-[#7E22CE]/20 flex items-start gap-3 text-xs sm:text-sm font-inter text-[#6B21A8] mb-8">
              <AlertTriangle size={18} className="shrink-0 text-[#7E22CE] mt-0.5" />
              <span>{caseStudy.statusNotice}</span>
            </div>
          )}

          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-[20px] bg-white border border-[#042718]/8 shadow-2xs">
            {caseStudy.keyStats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="font-onest text-2xl sm:text-3xl font-bold text-[#042718]">
                  {stat.value}
                </span>
                <span className="font-inter text-xs font-semibold text-[#042718]/90 mt-0.5">
                  {stat.label}
                </span>
                {stat.detail && (
                  <span className="font-inter text-[11px] text-[#042718]/50 mt-0.5">
                    {stat.detail}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          NARRATIVE SECTIONS (EDITORIAL LAYOUT, NOT EXCESSIVE CARDS)
          ========================================================================= */}
      <section className="py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 md:gap-14">
            {caseStudy.sections.map((sec) => (
              <article
                key={sec.id}
                id={sec.id}
                className="scroll-mt-24 pb-12 border-b border-[#042718]/8 last:border-b-0"
              >
                {/* Section header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-onest text-sm font-bold text-[#188E39]">
                      {sec.number}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#042718]/30" />
                    <span className="font-inter text-xs uppercase tracking-wider text-[#042718]/50 font-semibold">
                      {sec.title.split(":")[0]}
                    </span>
                  </div>
                  <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] leading-tight">
                    {sec.title.includes(":") ? sec.title.split(":")[1].trim() : sec.title}
                  </h2>
                  {sec.subtitle && (
                    <p className="font-inter text-base text-[#042718]/70 mt-1 font-medium">
                      {sec.subtitle}
                    </p>
                  )}
                </div>

                {/* Narrative Paragraphs with Subheading Support */}
                <div className="flex flex-col gap-4 font-inter text-base sm:text-lg text-[#042718]/80 leading-relaxed mb-6 font-normal">
                  {sec.content.map((p, pIdx) => {
                    if (p.startsWith("### ")) {
                      return (
                        <h3
                          key={pIdx}
                          className="font-onest font-bold text-lg sm:text-xl text-[#042718] mt-4 mb-0.5 tracking-tight"
                        >
                          {p.replace("### ", "")}
                        </h3>
                      );
                    }
                    if (p.startsWith("#### ")) {
                      return (
                        <h4
                          key={pIdx}
                          className="font-onest font-semibold text-base sm:text-lg text-[#042718] mt-3 mb-0.5"
                        >
                          {p.replace("#### ", "")}
                        </h4>
                      );
                    }
                    return <p key={pIdx}>{p}</p>;
                  })}
                </div>

                {/* Product Mechanism Visual if this is the pivotal mechanism section */}
                {((caseStudy.slug === "reshamandi" && sec.id === "instant-payout") ||
                  (caseStudy.slug === "ai-coach" && sec.id === "safety") ||
                  (caseStudy.slug === "subscription" && sec.id === "product-journey") ||
                  (caseStudy.slug === "performance-score" &&
                    (sec.id === "the-vision" ||
                      sec.id === "architecture" ||
                      sec.id === "hardware-tiers")) ||
                  (caseStudy.slug === "ai-localization" && sec.id === "pipeline-redesign")) && (
                  <div className="my-8">
                    <MechanismVisual
                      slug={caseStudy.slug as MechanismSlug}
                      variant="detail"
                      theme="light"
                      moment={
                        caseStudy.slug === "performance-score"
                          ? sec.id === "the-vision"
                            ? "ecosystem"
                            : sec.id === "architecture"
                            ? "migration"
                            : "hardware-tiers"
                          : undefined
                      }
                    />
                  </div>
                )}

                {/* Inline Decision Moment if attached to section */}
                {sec.decision && (
                  <div className="my-7 rounded-[20px] bg-white border-l-4 border-l-[#188E39] border-y border-r border-[#042718]/10 p-6 sm:p-7 shadow-xs">
                    <div className="flex flex-wrap items-center gap-2 mb-4 pb-3 border-b border-[#042718]/8">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#188E39] font-bold">
                        Key Product Decision
                      </span>
                      {sec.decision.title && (
                        <>
                          <span className="text-[#042718]/30">•</span>
                          <span className="text-xs sm:text-sm font-onest font-bold text-[#042718]">
                            {sec.decision.title}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                      <div className="p-3.5 rounded-xl bg-[#FAFDFB] border border-[#042718]/6">
                        <span className="text-[11px] font-inter font-bold uppercase tracking-wider text-[#042718] block mb-1">
                          The Decision
                        </span>
                        <p className="font-inter text-[#042718]/90 leading-relaxed font-medium">
                          {sec.decision.decision}
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#FAFDFB] border border-[#042718]/6">
                        <span className="text-[11px] font-inter font-bold uppercase tracking-wider text-[#8A5A16] block mb-1">
                          Why (Constraint & Evidence)
                        </span>
                        <p className="font-inter text-[#042718]/80 leading-relaxed">
                          {sec.decision.why}
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#FAFDFB] border border-[#042718]/6">
                        <span className="text-[11px] font-inter font-bold uppercase tracking-wider text-[#B45309] block mb-1">
                          Tradeoff (What was given up)
                        </span>
                        <p className="font-inter text-[#042718]/80 leading-relaxed">
                          {sec.decision.tradeoff}
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#FAFDFB] border border-[#042718]/6">
                        <span className="text-[11px] font-inter font-bold uppercase tracking-wider text-[#188E39] block mb-1">
                          Result
                        </span>
                        <p className="font-inter text-[#042718] font-medium leading-relaxed">
                          {sec.decision.result}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section Outcome Hierarchy if present */}
                {sec.outcomeHierarchy && sec.outcomeHierarchy.length > 0 && (
                  <div className="my-6 p-6 rounded-[20px] bg-white border border-[#042718]/10 shadow-2xs">
                    <span className="text-xs font-inter font-bold uppercase tracking-wider text-[#042718]/50 block mb-4">
                      Outcome Hierarchy
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {sec.outcomeHierarchy.map((item, oIdx) => (
                        <div
                          key={oIdx}
                          className="flex flex-col p-3.5 rounded-xl bg-[#FAFDFB] border border-[#042718]/6"
                        >
                          <span className="text-[11px] font-inter font-bold uppercase tracking-wider text-[#188E39]">
                            {item.category}
                          </span>
                          {item.metric && (
                            <span className="font-onest text-xl sm:text-2xl font-bold text-[#042718] mt-1">
                              {item.metric}
                            </span>
                          )}
                          <span className="font-inter text-xs sm:text-sm text-[#042718]/75 mt-1 leading-relaxed">
                            {item.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section Retrospective Reflection if present */}
                {sec.reflection && (
                  <div className="my-6 p-5 sm:p-6 rounded-[20px] bg-[#FAFDFB] border-l-4 border-l-[#8A5A16] border-y border-r border-[#042718]/12 shadow-2xs">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#8A5A16] block mb-2">
                      What I'd Change (Retrospective Insight)
                    </span>
                    <p className="font-inter text-xs sm:text-sm text-[#042718]/85 leading-relaxed italic">
                      "{sec.reflection}"
                    </p>
                  </div>
                )}

                {/* Workflow Steps Diagram (only if not handled by custom mechanism visual) */}
                {sec.workflowSteps &&
                  !(
                    (caseStudy.slug === "performance-score" && sec.id === "architecture") ||
                    (caseStudy.slug === "reshamandi" && sec.id === "instant-payout")
                  ) && (
                  <div className="my-8 p-6 rounded-[20px] bg-white border border-[#042718]/10 shadow-2xs">
                    <span className="text-xs font-inter font-semibold uppercase tracking-wider text-[#042718]/50 block mb-4">
                      Execution Flow
                    </span>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 relative">
                      {sec.workflowSteps.map((step, sIdx) => (
                        <div key={sIdx} className="flex-1 flex flex-col items-start bg-[#FAFDFB] p-3.5 rounded-xl border border-[#042718]/6">
                          <span className="text-[11px] font-onest font-bold text-[#188E39]">
                            STEP 0{sIdx + 1}
                          </span>
                          <span className="font-onest text-sm font-bold text-[#042718] mt-0.5">
                            {step.label}
                          </span>
                          {step.desc && (
                            <span className="font-inter text-[11px] text-[#042718]/60 mt-1 leading-tight">
                              {step.desc}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Before vs After Comparison */}
                {sec.comparison && (
                  <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-[20px] bg-[#FEF2F2] border border-[#FCA5A5]/30">
                      <span className="text-xs font-inter font-bold uppercase tracking-wider text-[#DC2626] block mb-3">
                        {sec.comparison.before.title}
                      </span>
                      <ul className="flex flex-col gap-2.5">
                        {sec.comparison.before.steps.map((st, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs sm:text-sm font-inter text-[#991B1B]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] mt-1.5 shrink-0" />
                            <span>{st}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-6 rounded-[20px] bg-[#ECFDF5] border border-[#6EE7B7]/40">
                      <span className="text-xs font-inter font-bold uppercase tracking-wider text-[#059669] block mb-3">
                        {sec.comparison.after.title}
                      </span>
                      <ul className="flex flex-col gap-2.5">
                        {sec.comparison.after.steps.map((st, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs sm:text-sm font-inter text-[#065F46] font-medium">
                            <CheckCircle2 size={15} className="text-[#059669] mt-0.5 shrink-0" />
                            <span>{st}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Evaluation Table if present */}
                {sec.evaluationTable && sec.evaluationTable.length > 0 && (
                  <div className="my-8 rounded-[20px] bg-white border border-[#042718]/10 shadow-2xs overflow-hidden">
                    <div className="p-5 sm:p-6 border-b border-[#042718]/8 flex flex-wrap items-center justify-between gap-3 bg-[#FAFDFB]">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-inter font-semibold uppercase tracking-wider text-[#188E39]">
                          <Sparkles size={14} />
                          <span>Evaluation Benchmark Matrix</span>
                        </div>
                        <h3 className="font-onest text-lg sm:text-xl font-bold text-[#042718] mt-1">
                          Golden Test Set ({sec.evaluationTable.length} Questions)
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-inter font-medium text-[#042718]/70">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#065F46] font-semibold">
                          <CheckCircle2 size={13} />
                          <span>95% Pass Rate (19/20)</span>
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#042718]/5 text-[#042718]/80 font-semibold">
                          <span>0% Hallucinations</span>
                        </span>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-[#042718]/8 bg-[#042718]/[0.02] text-[#042718]/60 font-inter font-semibold">
                            <th className="py-3 px-4 w-12 text-center">#</th>
                            <th className="py-3 px-4 min-w-[220px]">Test Query</th>
                            <th className="py-3 px-4 min-w-[130px]">Category</th>
                            <th className="py-3 px-4 min-w-[180px]">Target Ground Source</th>
                            <th className="py-3 px-4 text-center w-24">Cosine Sim</th>
                            <th className="py-3 px-4 text-center w-28">Status</th>
                            <th className="py-3 px-4 min-w-[240px]">Verification Notes</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#042718]/6 font-inter">
                          {sec.evaluationTable.map((row) => (
                            <tr key={row.id} className="hover:bg-[#FAFDFB] transition-colors">
                              <td className="py-3 px-4 text-center font-mono text-xs text-[#042718]/50">
                                {String(row.id).padStart(2, "0")}
                              </td>
                              <td className="py-3 px-4 font-medium text-[#042718]">
                                "{row.query}"
                              </td>
                              <td className="py-3 px-4">
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#042718]/5 text-[#042718]/80">
                                  {row.category}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-xs text-[#042718]/70">
                                {row.groundTruthSource}
                              </td>
                              <td className="py-3 px-4 text-center font-mono text-xs font-semibold text-[#042718]">
                                {row.similarity.toFixed(2)}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span
                                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                                    row.status === "Pass"
                                      ? "bg-[#ECFDF5] text-[#065F46]"
                                      : row.status.includes("Fallback")
                                      ? "bg-[#FEF3C7] text-[#92400E]"
                                      : "bg-[#FEF2F2] text-[#991B1B]"
                                  }`}
                                >
                                  {row.status === "Pass" ? (
                                    <CheckCircle2 size={12} />
                                  ) : (
                                    <AlertTriangle size={12} />
                                  )}
                                  <span>{row.status}</span>
                                </span>
                              </td>
                              <td className="py-3 px-4 text-xs text-[#042718]/70 leading-relaxed">
                                {row.notes}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Highlights Grid */}
                {sec.highlights && sec.highlights.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                    {sec.highlights.map((h, hIdx) => (
                      <div
                        key={hIdx}
                        className="p-5 rounded-[18px] bg-white border border-[#042718]/8 shadow-2xs"
                      >
                        <h4 className="font-onest text-base font-bold text-[#042718] mb-1.5 flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-[#188E39] shrink-0" />
                          <span>{h.title}</span>
                        </h4>
                        <p className="font-inter text-xs sm:text-sm text-[#042718]/70 leading-relaxed">
                          {h.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reflection Quote */}
                {sec.quote && (
                  <div className="my-8 p-6 sm:p-8 rounded-[24px] bg-[#042718] text-white relative overflow-hidden">
                    <Quote size={32} className="text-[#188E39]/40 mb-3" />
                    <p className="font-onest text-lg sm:text-xl font-medium leading-relaxed italic text-white/95">
                      "{sec.quote}"
                    </p>
                    <span className="block font-inter text-xs text-[#A7F3D0] mt-4 font-semibold uppercase tracking-wider">
                      Deepak Prasad · Product Philosophy
                    </span>
                  </div>
                )}

              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE TRADE-OFF: WHAT I CHOSE NOT TO BUILD
          ========================================================================= */}
      {caseStudy.tradeOff && (
        <section className="py-10 border-t border-[#042718]/8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-7 sm:p-9 rounded-[24px] bg-[#042718] text-white shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-[#D9A94C]">
                  Product Strategy & Discipline
                </span>
              </div>
              <h3 className="font-onest text-2xl sm:text-3xl font-bold tracking-tight mb-6">
                The Trade-Off: What I Chose Not to Build
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-white/10">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 block mb-1">
                    What we considered
                  </span>
                  <p className="font-inter text-sm sm:text-[15px] text-white/80 leading-relaxed">
                    {caseStudy.tradeOff.considered}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#A7F3D0] block mb-1">
                    What I chose
                  </span>
                  <p className="font-inter text-sm sm:text-[15px] text-white leading-relaxed font-medium">
                    {caseStudy.tradeOff.chose}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#D9A94C] block mb-1">
                    Why (Constraint & Evidence)
                  </span>
                  <p className="font-inter text-sm sm:text-[15px] text-white/80 leading-relaxed">
                    {caseStudy.tradeOff.why}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#F87171] block mb-1">
                    What we gave up
                  </span>
                  <p className="font-inter text-sm sm:text-[15px] text-white/80 leading-relaxed">
                    {caseStudy.tradeOff.gaveUp}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#6EE7B7] block mb-1">
                  {caseStudy.slug === 'performance-score' ? 'Delivered System Architecture' : 'What happened (Outcome)'}
                </span>
                <p className="font-inter text-sm sm:text-[15px] text-white/90 leading-relaxed">
                  {caseStudy.tradeOff.outcome}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          PRODUCT ARTIFACTS & SPECIFICATIONS
          ========================================================================= */}
      {caseStudy.artifacts && (
        <section className="py-8 border-t border-[#042718]/8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-[#8A5A16] mb-1 block">
                Product Evidence & Schemas
              </span>
              <h3 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] tracking-tight">
                {caseStudy.artifacts.title}
              </h3>
              {caseStudy.artifacts.subtitle && (
                <p className="font-inter text-sm text-[#042718]/70 mt-1">
                  {caseStudy.artifacts.subtitle}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {caseStudy.artifacts.items.map((item, aIdx) => (
                <div
                  key={aIdx}
                  className="p-5 sm:p-6 rounded-[20px] bg-white border border-[#042718]/10 shadow-2xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                    <h4 className="font-onest font-bold text-base text-[#042718]">
                      {item.label}
                    </h4>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[#042718]/5 text-[#042718]">
                      {item.value}
                    </span>
                  </div>
                  {item.desc && (
                    <p className="font-inter text-xs sm:text-sm text-[#042718]/70 leading-relaxed mb-3">
                      {item.desc}
                    </p>
                  )}
                  {item.code && (
                    <div className="p-3.5 rounded-xl bg-[#042718] text-[#A7F3D0] font-mono text-xs overflow-x-auto leading-relaxed border border-white/10">
                      <code>{item.code}</code>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          PREVIOUS / NEXT CASE STUDY PAGINATION
          ========================================================================= */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-[#042718]/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <a
              href={`/work/${prevStudy.slug}`}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                onNavigate(`/work/${prevStudy.slug}`);
              }}
              className="flex items-center gap-3 text-left p-3 rounded-xl hover:bg-[#FAFDFB] border border-transparent hover:border-[#042718]/10 transition-colors cursor-pointer w-full sm:w-auto"
            >
              <ArrowLeft size={20} className="text-[#188E39]" />
              <div>
                <span className="text-[11px] font-inter font-semibold uppercase tracking-wider text-[#042718]/40 block">
                  Previous project
                </span>
                <span className="font-onest font-bold text-sm text-[#042718]">
                  {prevStudy.title}
                </span>
              </div>
            </a>

            <a
              href="/work"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                onNavigate("/work");
              }}
              className="text-xs font-inter font-semibold text-[#042718]/60 hover:text-[#042718] transition-colors"
            >
              All work
            </a>

            <a
              href={`/work/${nextStudy.slug}`}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                onNavigate(`/work/${nextStudy.slug}`);
              }}
              className="flex items-center justify-end gap-3 text-right p-3 rounded-xl hover:bg-[#FAFDFB] border border-transparent hover:border-[#042718]/10 transition-colors cursor-pointer w-full sm:w-auto"
            >
              <div>
                <span className="text-[11px] font-inter font-semibold uppercase tracking-wider text-[#042718]/40 block">
                  Next project
                </span>
                <span className="font-onest font-bold text-sm text-[#042718]">
                  {nextStudy.title}
                </span>
              </div>
              <ArrowRight size={20} className="text-[#188E39]" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
