import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileDown,
  ArrowRight,
  GraduationCap,
  Eye,
  CheckCircle2,
  Sparkles,
  Wrench,
  Briefcase,
} from "lucide-react";
import GlassButton from "./ui/GlassButton";
import { EXPERIENCE_ROLES } from "../data/caseStudies";

interface ResumePageProps {
  onNavigate: (path: string) => void;
  onOpenResumeModal?: () => void;
}

export default function ResumePage({
  onNavigate,
  onOpenResumeModal,
}: ResumePageProps) {
  const resumePdfPath = "/Deepak_Prasad_Resume.pdf";

  const toolsAndDomains = {
    tools: [
      "Jira",
      "LeadSquared CRM",
      "Razorpay",
      "Camunda",
      "SAP (basic)",
      "Figma",
      "Firebase",
      "Google Analytics",
      "Google Play Console",
    ],
    domains: [
      "Consumer Subscription",
      "Enterprise B2B",
      "Fintech (Instant Payouts & Workflows)",
      "Healthtech / AI Diagnostics",
      "Agri-Tech / Field Operations",
      "IoT & Hardware",
    ],
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-[#121517] py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121517]/5 text-xs font-inter font-semibold text-[#121517]/80 mb-4">
            <span>Official Curriculum Vitae</span>
          </div>
          <h1 className="font-onest text-4xl sm:text-5xl font-bold tracking-tight text-[#121517] leading-[1.15] mb-4">
            Deepak Prasad — Resume
          </h1>
          <p className="font-inter text-base sm:text-lg text-[#121517]/70 leading-relaxed font-normal">
            Senior Product Manager | Subscription Growth, Monetization & Applied AI. 7+ years across consumer subscriptions, AI features, payments and marketplaces.
          </p>
        </div>

        {/* =========================================================================
            DOWNLOAD CALLOUT CARD
            ========================================================================= */}
        <div className="p-8 rounded-[24px] bg-[#121517] text-white mb-16 shadow-md relative overflow-hidden">
          <div className="max-w-xl relative z-10">
            <h2 className="font-onest text-2xl sm:text-3xl font-bold leading-snug mb-3">
              Want the full career history? Download my resume
            </h2>
            <p className="font-inter text-sm sm:text-base text-white/70 leading-relaxed mb-6">
              Download the official, comprehensive single-page PDF covering full metrics, company tenures, technology stacks, and academic background.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <GlassButton
                as="a"
                href={resumePdfPath}
                download="Deepak_Prasad_Resume.pdf"
                id="resume-page-direct-download"
                variant="primary"
                size="md"
                icon={<FileDown size={16} />}
                iconPosition="left"
              >
                Download resume (PDF)
              </GlassButton>

              {onOpenResumeModal && (
                <GlassButton
                  type="button"
                  id="resume-page-preview-modal"
                  onClick={onOpenResumeModal}
                  variant="secondary"
                  size="md"
                  icon={<Eye size={16} />}
                  iconPosition="left"
                >
                  Preview in-app
                </GlassButton>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            1. PROFILE (EXECUTIVE SUMMARY)
            ========================================================================= */}
        <section className="mb-16">
          <h3 className="font-onest text-xl sm:text-2xl font-bold text-[#121517] mb-6 flex items-center gap-2">
            <Sparkles size={20} className="text-[#A8711A]" />
            <span>Profile</span>
          </h3>
          <div className="p-6 rounded-[20px] bg-white border border-[#121517]/8 shadow-2xs font-inter text-sm sm:text-base text-[#121517]/80 leading-relaxed space-y-3">
            <p>
              Senior Product Manager with 7+ years across consumer subscriptions, AI features, payments and marketplaces. Founding member of the Sportstech product team and its first PM: took a free app to about 15K paying subscribers in under 3 years, shipped an in-app AI coach (about 4,500 peak daily users) and redesigned onboarding and cancellation across the subscriber lifecycle. Owned the subscription business through ~15K paying subscribers, built payout systems moving ₹20–25 Cr a month, and led cross-border product teams across India and Europe.
            </p>
            <p>
              Experienced in cross-border product leadership (ODC model partnering between India product pods and European executive teams), mentoring cross-functional pods, and leading technical roadmaps from discovery to deployment.
            </p>
          </div>
        </section>

        {/* =========================================================================
            2. WORK EXPERIENCE
            ========================================================================= */}
        <section className="mb-16">
          <h3 className="font-onest text-xl sm:text-2xl font-bold text-[#121517] mb-6 flex items-center gap-2">
            <Briefcase size={20} className="text-[#A8711A]" />
            <span>Work Experience</span>
          </h3>
          <div className="flex flex-col gap-6">
            {EXPERIENCE_ROLES.map((role, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[20px] bg-white border border-[#121517]/8 shadow-2xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#121517]/6">
                  <div>
                    <h4 className="font-onest text-lg sm:text-xl font-bold text-[#121517]">
                      {role.title} · <span className="text-[#A8711A]">{role.company}</span>
                    </h4>
                    {role.subline && (
                      <div className="font-inter text-xs text-[#121517]/60 mt-0.5">
                        {role.subline}
                      </div>
                    )}
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="font-inter text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#121517]/10 text-[#121517]/80 block w-fit sm:inline-block">
                      {role.period}
                    </span>
                    <span className="font-inter text-[11px] text-[#121517]/50 block mt-1">
                      {role.type}
                    </span>
                  </div>
                </div>

                <p className="font-inter text-xs sm:text-sm text-[#121517]/70 italic">
                  “{role.description}”
                </p>

                <ul className="space-y-2.5 pt-1">
                  {role.highlights.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#121517]/85 leading-relaxed"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-[#A8711A] shrink-0 mt-0.5"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {role.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-0.5 rounded text-[11px] font-inter font-medium bg-[#FAF8F5] text-[#121517]/70 border border-[#121517]/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            3. PROJECTS
            ========================================================================= */}
        <section className="mb-16">
          <h3 className="font-onest text-xl sm:text-2xl font-bold text-[#121517] mb-6 flex items-center gap-2">
            <Sparkles size={20} className="text-[#A8711A]" />
            <span>Projects</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-[20px] bg-white border border-[#121517]/8 shadow-2xs space-y-2">
              <h4 className="font-onest text-base font-bold text-[#121517]">
                Dīpa (Portfolio AI Copilot)
              </h4>
              <p className="font-inter text-xs sm:text-sm text-[#121517]/80 leading-relaxed">
                Live, multilingual voice copilot answering questions about Deepak&apos;s work, grounded in RAG with citations, 95% (19/20) on golden evaluation set, voice in 5 Indian languages (Sarvam AI).
              </p>
            </div>
            <div className="p-6 rounded-[20px] bg-white border border-[#121517]/8 shadow-2xs space-y-2">
              <h4 className="font-onest text-base font-bold text-[#121517]">
                Performance Score Strategy
              </h4>
              <p className="font-inter text-xs sm:text-sm text-[#121517]/80 leading-relaxed">
                Comprehensive cross-platform strategy and PRD (Athletic Reliability Performance Score) uniting mobile, Smart Gym, and wearable telemetry.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. SKILLS & TOOLS
            ========================================================================= */}
        <section className="mb-16">
          <h3 className="font-onest text-xl sm:text-2xl font-bold text-[#121517] mb-6 flex items-center gap-2">
            <Wrench size={20} className="text-[#A8711A]" />
            <span>Skills & Tools</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-[20px] bg-white border border-[#121517]/8 shadow-2xs space-y-3">
              <h4 className="font-onest text-xs font-bold uppercase tracking-wider text-[#121517]/60">
                Tools & Platforms
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {toolsAndDomains.tools.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-[#F5F3EF] text-[#121517] font-inter text-xs font-medium border border-[#A8711A]/15"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-[20px] bg-white border border-[#121517]/8 shadow-2xs space-y-3">
              <h4 className="font-onest text-xs font-bold uppercase tracking-wider text-[#121517]/60">
                Domains & Verticals
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {toolsAndDomains.domains.map((d, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-[#FAF8F5] text-[#121517] font-inter text-xs font-medium border border-[#121517]/15"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. EDUCATION
            ========================================================================= */}
        <section className="mb-12">
          <h3 className="font-onest text-xl sm:text-2xl font-bold text-[#121517] mb-6 flex items-center gap-2">
            <GraduationCap size={20} className="text-[#A8711A]" />
            <span>Education</span>
          </h3>
          <div className="p-6 rounded-[20px] bg-white border border-[#121517]/8 shadow-2xs">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap size={20} className="text-[#A8711A]" />
              <h4 className="font-onest text-base sm:text-lg font-bold text-[#121517]">
                Bachelor of Engineering (B.E.)
              </h4>
            </div>
            <p className="font-inter text-xs sm:text-sm text-[#121517]/70">
              Visvesvaraya Technological University (VTU) · 2018 · Technical foundation in systems engineering, computing, and software platforms.
            </p>
          </div>
        </section>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-[#121517]/8">
          <button
            type="button"
            onClick={() => onNavigate("/about")}
            className="font-inter text-sm font-semibold text-[#121517]/60 hover:text-[#121517] transition-colors cursor-pointer"
          >
            ← Read full story in About
          </button>
          <button
            type="button"
            onClick={() => onNavigate("/contact")}
            className="inline-flex items-center gap-1.5 font-inter text-sm font-semibold text-[#A8711A] hover:underline cursor-pointer"
          >
            <span>Get in touch</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
