import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  User,
} from 'lucide-react';
import { MoreProductWorkItem } from '../types';
import { MORE_PRODUCT_WORK_ITEMS } from '../data/moreProductWork';

interface MoreWorkDetailPageProps {
  item: MoreProductWorkItem;
  onNavigate: (path: string) => void;
}

export default function MoreWorkDetailPage({
  item,
  onNavigate,
}: MoreWorkDetailPageProps) {
  useEffect(() => {
    // Instant scroll to top on mount to eliminate unwanted sliding animations during route transition
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [item.id]);

  const currentIndex = MORE_PRODUCT_WORK_ITEMS.findIndex((p) => p.id === item.id);
  const nextItem =
    MORE_PRODUCT_WORK_ITEMS[(currentIndex + 1) % MORE_PRODUCT_WORK_ITEMS.length];
  const prevItem =
    MORE_PRODUCT_WORK_ITEMS[
      (currentIndex - 1 + MORE_PRODUCT_WORK_ITEMS.length) %
        MORE_PRODUCT_WORK_ITEMS.length
    ];

  return (
    <div className="w-full bg-[#FAFDFB] text-[#042718]">
      {/* ── Header & Context ─────────────────────────────────── */}
      <section className="pt-10 pb-12 md:pt-14 md:pb-16 border-b border-[#042718]/8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Work Link */}
          <button
            type="button"
            onClick={() => onNavigate('/work')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-inter font-medium text-[#042718]/60 hover:text-[#188E39] mb-8 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to all work</span>
          </button>

          {/* Eyebrow & Category */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-[#A8711A]">
              More Product Work
            </span>
            <span className="text-[#042718]/25">•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#042718]/5 text-xs font-inter font-medium text-[#042718]/80">
              {item.primaryCategory}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-onest text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#042718] leading-[1.15] mb-4">
            {item.title}
          </h1>

          {/* One-line positioning statement */}
          <p className="font-inter text-lg sm:text-xl font-medium text-[#042718]/80 leading-relaxed mb-6">
            {item.description}
          </p>

          {/* Company · Role · Period Metadata Row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-inter text-[#042718]/60 py-4 border-t border-b border-[#042718]/8">
            <div className="flex items-center gap-1.5">
              <Building2 size={15} className="text-[#042718]/45" />
              <span className="font-semibold text-[#042718]">{item.company}</span>
            </div>
            <div className="hidden sm:block text-[#042718]/20">•</div>
            <div className="flex items-center gap-1.5">
              <User size={15} className="text-[#042718]/45" />
              <span>{item.role}</span>
            </div>
            {item.period && (
              <>
                <div className="hidden sm:block text-[#042718]/20">•</div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={15} className="text-[#042718]/45" />
                  <span>{item.period}</span>
                </div>
              </>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-5">
            {item.tags.map((t, idx) => (
              <span
                key={idx}
                className="font-inter text-xs font-medium px-2.5 py-1 rounded-md bg-white border border-[#042718]/10 text-[#042718]/70"
              >
                {t}
              </span>
            ))}
          </div>

          {/* ── EARLY IMPACT / WHAT CHANGED / EVIDENCE ────────────── */}
          {(() => {
            const displayMetrics =
              item.metrics && item.metrics.length > 0
                ? item.metrics.filter((m) => m.value && m.label).slice(0, 3)
                : item.outcome.metrics && item.outcome.metrics.length > 0
                ? item.outcome.metrics.slice(0, 3)
                : [];

            const isSystemDesign =
              item.id === 'performance-score' ||
              item.id === 'sap-erp-integration';
            const eyebrowLabel = isSystemDesign
              ? 'DESIGNED SYSTEM'
              : 'WHAT CHANGED';

            return (
              <div className="mt-8 pt-8 border-t border-[#042718]/10">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-[#A8711A] block mb-4">
                  {eyebrowLabel}
                </span>

                {displayMetrics.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {displayMetrics.map((m, idx) => (
                      <div key={idx} className="flex flex-col">
                        <div className="font-onest text-3xl sm:text-4xl font-bold tracking-tight text-[#042718] tabular-nums">
                          {m.value}
                        </div>
                        <div className="font-inter text-xs sm:text-sm font-semibold text-[#042718]/80 mt-1 leading-snug">
                          {m.label}
                        </div>
                        {'context' in m && (m as { context?: string }).context && (
                          <div className="font-inter text-[11px] text-[#042718]/50 mt-0.5">
                            {(m as { context?: string }).context}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="font-onest text-lg sm:text-xl font-medium text-[#042718]/85 leading-snug max-w-3xl">
                    {item.outcome.summary}
                  </p>
                )}
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── Main Narrative Content ────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* First Screen Matrix: The Problem & Why It Mattered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-6 rounded-2xl bg-white border border-[#042718]/8 shadow-2xs">
              <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#042718]/50 block mb-2">
                The Problem
              </span>
              <p className="font-inter text-sm sm:text-[15px] text-[#042718]/80 leading-relaxed">
                {item.problem}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#042718]/8 shadow-2xs">
              <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#8A5A16] block mb-2">
                Why It Mattered
              </span>
              <p className="font-inter text-sm sm:text-[15px] text-[#042718]/80 leading-relaxed">
                {item.whyItMattered}
              </p>
            </div>
          </div>

          {/* What I Personally Owned */}
          <div className="p-6 rounded-2xl bg-[#F4F9F5] border border-[#188E39]/18">
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#188E39] block mb-2">
              My Role
            </span>
            <p className="font-inter text-sm sm:text-[15px] text-[#042718] font-medium leading-relaxed">
              {item.myOwnership || item.myRole}
            </p>
          </div>

          {/* The Key Decision */}
          {item.keyDecision && (
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#042718]/8 shadow-2xs">
              <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#A8711A] block mb-2">
                The Key Decision
              </span>
              {typeof item.keyDecision === 'string' ? (
                <p className="font-inter text-sm sm:text-[15px] text-[#042718]/80 leading-relaxed">
                  {item.keyDecision}
                </p>
              ) : (
                <div>
                  <h3 className="font-onest text-xl font-bold text-[#042718] mb-3">
                    {item.keyDecision.title}
                  </h3>
                  <p className="font-inter text-sm sm:text-[15px] text-[#042718]/85 leading-relaxed mb-4">
                    <span className="font-semibold text-[#042718]">Decision: </span>
                    {item.keyDecision.decision}
                  </p>
                  {item.keyDecision.tradeoff && (
                    <div className="p-4 rounded-xl bg-[#FAFDFB] border border-[#042718]/6 text-xs sm:text-sm text-[#042718]/75 mb-3">
                      <span className="font-semibold text-[#042718]">Trade-off: </span>
                      {item.keyDecision.tradeoff}
                    </div>
                  )}
                  {item.keyDecision.why && (
                    <p className="font-inter text-xs sm:text-sm text-[#042718]/70 italic">
                      <span className="font-semibold not-italic text-[#042718]">Rationale: </span>
                      {item.keyDecision.why}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* The Solution */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#042718]/8 shadow-2xs">
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#042718]/50 block mb-2">
              The Solution
            </span>
            <p className="font-inter text-base text-[#042718]/80 leading-relaxed mb-6">
              {item.solution.summary}
            </p>

            {/* Workflow steps / Visual representation */}
            {item.solution.steps && item.solution.steps.length > 0 && (
              <div className="space-y-3 pt-2">
                {item.solution.steps.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FAFDFB] border border-[#042718]/6"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#042718] text-white flex items-center justify-center font-mono text-[11px] font-bold shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <div>
                      <h4 className="font-onest font-semibold text-sm text-[#042718]">
                        {step.label}
                      </h4>
                      {step.desc && (
                        <p className="font-inter text-xs text-[#042718]/70 mt-0.5 leading-normal">
                          {step.desc}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {item.solution.details && item.solution.details.length > 0 && (
              <ul className="mt-6 space-y-2 text-xs sm:text-sm font-inter text-[#042718]/75 list-disc pl-5">
                {item.solution.details.map((detail, dIdx) => (
                  <li key={dIdx}>{detail}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Outcome & Systemic Change (Explaining why it happened & how the product changed) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#042718] text-white">
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#8FD44A]">
                {item.id === 'performance-score' ? 'System Architecture Delivery' : 'Outcome & Systemic Change'}
              </span>
              {item.outcome.type && (
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/70">
                  {item.outcome.type}
                </span>
              )}
            </div>
            <p className="font-onest text-lg sm:text-xl font-medium leading-relaxed text-white/95">
              {item.outcome.summary}
            </p>
          </div>

          {/* What I Learned (PM-level reflection) */}
          <div className="p-6 rounded-2xl bg-white border border-[#042718]/8 shadow-2xs">
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#042718]/50 block mb-2">
              What I Learned
            </span>
            <p className="font-inter text-sm sm:text-base italic text-[#042718]/80 leading-relaxed">
              &ldquo;{item.reflection}&rdquo;
            </p>
          </div>

          {/* Related Work */}
          {item.relatedProjects && item.relatedProjects.length > 0 && (
            <div className="pt-8 border-t border-[#042718]/10">
              <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#042718]/50 block mb-4">
                Related Work
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {item.relatedProjects.map((rel, rIdx) => (
                  <a
                    key={rIdx}
                    href={rel.route}
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                      e.preventDefault();
                      onNavigate(rel.route);
                    }}
                    className="p-4 rounded-xl bg-white border border-[#042718]/10 hover:border-[#188E39] hover:bg-[#FAFDFB] transition-colors flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-[#A8711A] uppercase tracking-wider block mb-1">
                        {rel.category}
                      </span>
                      <h4 className="font-onest font-bold text-sm text-[#042718] group-hover:text-[#188E39] transition-colors">
                        {rel.title}
                      </h4>
                    </div>
                    <ArrowRight size={16} className="text-[#042718]/40 group-hover:text-[#188E39] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Previous / Next Project Pagination ────────────────── */}
      <section className="py-12 border-t border-[#042718]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#042718]/10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
            <a
              href={prevItem.route}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                onNavigate(prevItem.route);
              }}
              className="flex items-center gap-3 text-left p-3 rounded-xl hover:bg-[#FAFDFB] border border-transparent hover:border-[#042718]/10 transition-colors cursor-pointer w-full sm:w-auto"
            >
              <ArrowLeft size={20} className="text-[#188E39]" />
              <div>
                <span className="text-[11px] font-inter font-semibold uppercase tracking-wider text-[#042718]/40 block">
                  Previous project
                </span>
                <span className="font-onest font-bold text-sm text-[#042718]">
                  {prevItem.title}
                </span>
              </div>
            </a>

            <a
              href="/work"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                onNavigate('/work');
              }}
              className="text-xs font-inter font-semibold text-[#042718]/60 hover:text-[#042718] transition-colors"
            >
              All work
            </a>

            <a
              href={nextItem.route}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                onNavigate(nextItem.route);
              }}
              className="flex items-center justify-end gap-3 text-right p-3 rounded-xl hover:bg-[#FAFDFB] border border-transparent hover:border-[#042718]/10 transition-colors cursor-pointer w-full sm:w-auto"
            >
              <div>
                <span className="text-[11px] font-inter font-semibold uppercase tracking-wider text-[#042718]/40 block">
                  Next project
                </span>
                <span className="font-onest font-bold text-sm text-[#042718]">
                  {nextItem.title}
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
