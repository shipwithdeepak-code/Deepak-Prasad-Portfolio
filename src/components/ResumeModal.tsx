"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  X,
  FileText,
  Mail,
  Linkedin,
  Github,
  Phone,
  MapPin,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Briefcase,
  Layers,
  Wrench,
  Download,
} from "lucide-react";
import { EXPERIENCE_ROLES } from "@/data/caseStudies";
import { downloadResumePDF } from "@/utils/downloadResume";
import { CALENDLY_URL } from "@/utils/calendly";
import GlassButton from "./ui/GlassButton";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const RESUME_TEXT = `DEEPAK PRASAD
Senior Product Manager | Subscription Growth, Monetization & Applied AI
Bengaluru, India • +91 8792964656 • shipwithdeepak@gmail.com • linkedin.com/in/prasad-deepak • github.com/shipwithdeepak-code

PROFILE
Senior Product Manager with 7+ years across consumer subscriptions, AI features, payments and marketplaces. Founding member of the Sportstech product team and its first PM: took a free app to about 15K paying subscribers in under 3 years, shipped an in-app AI coach (about 4,500 peak daily users) and redesigned onboarding and cancellation across the subscriber lifecycle. Owned the subscription business through ~15K paying subscribers, built payout systems moving ₹20–25 Cr a month, and led cross-border product teams across India and Europe.

WORK EXPERIENCE
1. Senior Product Manager | Sportstech [Oct 2024 – Sep 2026]
Bengaluru, India | Digital sports subscription platform (iOS & Android), via Tejmonvi Softwares (ODC) | 200K+ users
• Took a free app to about 15K paying subscribers in under 3 years, across 200K+ users.
• Shipped the in-app AI Coach (about 4,500 peak daily users) with consent, safety limits, deterministic checks for high-risk cases, Gemini with a ChatGPT fallback, and a 100-user beta first.
• Led AI video recommendations end to end with the data and ML team; workout completion rose 30%+.
• Found that monthly subscribers churned far faster, rebuilt onboarding around the first "aha" moment, won the cancellation A/B tests with a discounted yearly offer and took yearly plans to 87% of paying subscribers. Also led the website checkout launch of Unzer, Google Pay, Apple Pay, Klarna, PayPal and SEPA.
• Built a Lovable and Stripe redemption site that moved about 2,000 of roughly 4,000 free-plan device owners onto paid, auto-renewing plans.
• Shipped 300+ workout videos in Italian, French and Spanish in about 3 weeks (about 10× faster than studio production) with an AI dubbing pipeline and human review.
• Designed a single fitness dashboard that brings workout metrics from iOS, Android, display and Smart Gym into one view, and defined the Performance Score to rate each workout.
• Led the India product team, reporting to the CEO of the India unit: set the roadmap against company OKRs and hired, coached and managed 5 direct reports (3 PMs, growth, content), 2 designers and interns.

2. Senior Product Manager | Sportstech [Aug 2023 – Sep 2024]
Bengaluru, India
• Joined as the first Product Manager on the team and built the platform 0→1 from scratch, designing signup, onboarding and subscription flows (pricing, packaging, trial, paywall, checkout) with no prior playbook and defining retention and conversion metrics from first principles.
• Conducted customer interviews and synthesised feedback, app reviews and behavioural data to prioritise fixes. Translated requirements into PRDs, user stories and acceptance criteria, partnering with engineering and design through discovery, UAT, launch and post-launch iteration.

3. Senior Product Manager | ReshaMandi [Jun 2021 – Aug 2023]
Bengaluru, India | Enterprise B2B agri-tech & silk marketplace | ₹2,000 Cr platform | ~1.1 Lakh stakeholders across 5 business verticals (incl. 80K+ farmers via ReshaFarms)
• Owned product delivery across a complex B2B marketplace ecosystem spanning farmers, buyers, field operations, sales, finance and customer support, translating fragmented offline workflows into scalable digital products.
• Digitised end-to-end workflows across onboarding, KYC, lead generation, purchase and sales orders, logistics and payments, integrating LeadSquared CRM (rolled out for about 700 people), Razorpay, SAP and Camunda across business, IT and vendor teams.
• Led Instant Payouts workflow: from up to 15 days to seconds for standard payouts and under 2 hours for large ones, as disbursements grew from about ₹10–15 Cr to ₹20–25 Cr a month. Before, payments went through WhatsApp approval and manual payment: nominally 2 days, often 7 or more, worst case about 15 days. After the instant payout workflow on Razorpay (lot, centre manager approval, finance approval, farmer acknowledgement, bank validation, automatic payout, success or retry), standard payouts settled within seconds and large ones within 2 hours.
• Built a real-time cocoon bidding workflow 0→1 (Scan → Bid → Watch → Win → Pay); added geofencing and a 15-minute payment window after shared QR codes led to remote bids and non-payment; bidding drove repeat participation.
• Partnered with the ML team to define an image-based price recommendation with a human in the loop, piloted at 2 centres.
• Conducted extensive direct field research in mandi collection centres across Karnataka.

4. Associate Product Manager | LionCircuits [Jul 2018 – May 2020]
Bengaluru, India | IoT, AI & PCB manufacturing platform
• Led concept-to-launch of a B2B Assembly Ordering Platform, contributing to a 40% increase in monthly orders. Built an auto-quote generation and BOM-scrubbing tool, plus a Raspberry Pi-based AI proof-of-concept for facial-recognition traffic monitoring.

PROJECTS
• Dīpa (Portfolio AI Copilot): Live, multilingual voice copilot answering questions about Deepak's work, grounded in RAG with citations, 95% (19/20) on golden evaluation set, voice in 5 Indian languages (Sarvam AI).
• Performance Score Strategy: Comprehensive cross-platform strategy and PRD (Athletic Reliability Performance Score) uniting mobile, Smart Gym, and wearable telemetry.

SKILLS & TOOLS
• Tools & Platforms: Jira, SAP (basic), Camunda, LeadSquared CRM, Razorpay, Figma, Firebase, Google Analytics, Google Play Console
• Domains: Consumer Subscription, Enterprise B2B, Fintech (Instant Payouts & Workflows), Healthtech/AI, Agri-Tech/Field Ops, IoT/Hardware

EDUCATION
• Bachelor of Engineering (B.E.) | Visvesvaraya Technological University (VTU) | 2018`;

export default function ResumeModal({
  isOpen,
  onClose,
  onOpenContact,
}: ResumeModalProps) {
  const [activeTab, setActiveTab] = useState<"pdf" | "structured">("pdf");
  const [downloadStatus, setDownloadStatus] = useState<
    "idle" | "downloading" | "done"
  >("idle");

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    setDownloadStatus("downloading");
    try {
      await downloadResumePDF();
      setDownloadStatus("done");
    } catch {
      setDownloadStatus("idle");
    } finally {
      setTimeout(() => setDownloadStatus("idle"), 2500);
    }
  };


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
      "Fintech (Lending/BNPL)",
      "Healthtech / AI Diagnostics",
      "Agri-Tech / Field Operations",
      "IoT & Hardware",
    ],
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md cursor-pointer"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl h-[94dvh] max-h-[94dvh] bg-white rounded-[24px] sm:rounded-[32px] border border-[#121517]/10 shadow-2xl overflow-hidden flex flex-col text-left cursor-default"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-[#121517]/10 bg-[#FAF8F5] shrink-0 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#F5F3EF] flex items-center justify-center text-[#A8711A] shrink-0">
              <FileText size={18} />
            </div>
            <div className="min-w-0">
              <h3 className="font-onest text-sm sm:text-lg font-bold text-[#121517] truncate">
                Deepak Prasad — Senior PM
              </h3>
              <p className="font-inter text-[11px] sm:text-xs text-[#121517]/60 truncate hidden xs:block">
                Subscription Growth · Monetization · Applied AI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* View Switcher Tabs */}
            <div className="flex items-center bg-[#121517]/5 p-0.5 sm:p-1 rounded-full border border-[#121517]/10 text-xs font-inter font-medium">
              <button
                type="button"
                onClick={() => setActiveTab("pdf")}
                className={`px-2.5 sm:px-3 py-1 rounded-full transition-[background-color,color,box-shadow] cursor-pointer flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs ${
                  activeTab === "pdf"
                    ? "bg-white text-[#121517] font-semibold shadow-2xs"
                    : "text-[#121517]/60 hover:text-[#121517]"
                }`}
              >
                <FileText size={12} className={activeTab === "pdf" ? "text-[#A8711A]" : ""} />
                <span>PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("structured")}
                className={`px-2.5 sm:px-3 py-1 rounded-full transition-[background-color,color,box-shadow] cursor-pointer flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs ${
                  activeTab === "structured"
                    ? "bg-white text-[#121517] font-semibold shadow-2xs"
                    : "text-[#121517]/60 hover:text-[#121517]"
                }`}
              >
                <Layers size={12} className={activeTab === "structured" ? "text-[#A8711A]" : ""} />
                <span className="hidden sm:inline">Structured Profile</span>
                <span className="sm:hidden">Profile</span>
              </button>
            </div>

            {/* Direct Download Button */}
            <a
              href="/Deepak_Prasad_Resume.pdf"
              download="Deepak_Prasad_Resume.pdf"
              onClick={handleDownload}
              className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#A8711A] hover:bg-[#A8711A]/90 text-white font-inter text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 sm:gap-1.5 shadow-2xs no-underline"
              title="Download Resume PDF"
            >
              <Download size={13} />
              <span className="hidden sm:inline">
                {downloadStatus === "downloading"
                  ? "Downloading..."
                  : downloadStatus === "done"
                  ? "Downloaded!"
                  : "Download PDF"}
              </span>
            </a>

            <GlassButton
              as="a"
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener"
              variant="primary"
              size="sm"
              icon={<ArrowRight size={13} />}
              className="hidden lg:inline-flex"
            >
              Let&apos;s Talk
            </GlassButton>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#121517]/5 text-[#121517]/60 hover:text-[#121517] transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {activeTab === "pdf" ? (
          <div className="flex-1 flex flex-col bg-[#FAF8F5] p-3 sm:p-5 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 mb-3 bg-white rounded-2xl border border-[#121517]/10 text-xs font-inter text-[#121517]/75 shadow-xs shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A8711A] animate-pulse" />
                <span className="font-semibold text-[#121517]">Original Executive Resume (PDF)</span>
                <span className="text-black/30">•</span>
                <span className="text-[#121517]/70">Standard 2-Page Format</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#121517]/60">Exact attached PDF</span>
              </div>
            </div>

            <div className="flex-1 w-full bg-white rounded-2xl border border-[#121517]/10 overflow-hidden shadow-sm relative flex flex-col">
              <iframe
                src="/Deepak_Prasad_Resume.pdf#toolbar=1&navpanes=0&view=FitH"
                title="Deepak Prasad Original Resume PDF"
                className="w-full h-full min-h-[500px] flex-1 border-0"
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Contact & Profile Quick Bar */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#121517]/10 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#121517]/10 text-xs font-inter text-[#121517]/80">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="flex items-center gap-1 font-medium text-[#121517]">
                  <MapPin size={14} className="text-[#A8711A]" /> Bengaluru, India
                </span>
                <a
                  href="tel:+918792964656"
                  className="flex items-center gap-1 hover:text-[#A8711A] transition-colors"
                >
                  <Phone size={14} className="text-[#A8711A]" /> +91 8792964656
                </a>
                <a
                  href="mailto:shipwithdeepak@gmail.com"
                  className="flex items-center gap-1 hover:text-[#A8711A] font-medium text-[#121517] transition-colors"
                >
                  <Mail size={14} className="text-[#A8711A]" /> shipwithdeepak@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/prasad-deepak/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#A8711A] hover:underline font-semibold"
                >
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                </a>
                <span className="text-[#121517]/30">•</span>
                <a
                  href="https://github.com/shipwithdeepak-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#121517] hover:text-[#A8711A] font-semibold"
                >
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-onest text-xs font-bold uppercase tracking-wider text-[#A8711A] mb-1.5 flex items-center gap-1.5">
                <Sparkles size={14} /> Profile Summary
              </h4>
              <p className="font-inter text-xs sm:text-sm text-[#121517]/85 leading-relaxed">
                Senior Product Manager with <strong>7+ years</strong> across consumer subscriptions, AI features, payments and marketplaces. Founding member of the Sportstech product team and its first PM: took a free app to about 15K paying subscribers in under 3 years, shipped an in-app AI coach (about 4,500 peak daily users) and redesigned onboarding and cancellation across the subscriber lifecycle. Owned the subscription business through ~15K paying subscribers, built payout systems moving ₹20–25 Cr a month, and led cross-border product teams across India and Europe.
              </p>
            </div>
          </div>

          {/* Work Experience Timeline */}
          <div>
            <h4 className="font-onest text-base font-bold text-[#121517] mb-4 flex items-center gap-2">
              <Briefcase size={18} className="text-[#A8711A]" />
              <span>Work Experience</span>
            </h4>

            <div className="space-y-6">
              {EXPERIENCE_ROLES.map((role, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-[#121517]/10 shadow-xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h5 className="font-onest text-lg font-bold text-[#121517]">
                        {role.title} · <span className="text-[#A8711A]">{role.company}</span>
                      </h5>
                      <p className="font-inter text-xs text-[#121517]/60 font-medium">
                        {role.type}
                      </p>
                    </div>

                    <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#121517]/10 text-[#121517]/70 w-fit">
                      {role.period}
                    </span>
                  </div>

                  <p className="font-inter text-xs sm:text-sm text-[#121517]/80 leading-relaxed italic">
                    “{role.description}”
                  </p>

                  <ul className="space-y-2 pt-1">
                    {role.highlights.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#121517]/85 leading-relaxed">
                        <CheckCircle2 size={15} className="text-[#A8711A] shrink-0 mt-0.5" />
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
          </div>

          {/* Projects */}
          <div>
            <h4 className="font-onest text-base font-bold text-[#121517] mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-[#A8711A]" />
              <span>Projects</span>
            </h4>

            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-white border border-[#121517]/10 space-y-1.5 shadow-2xs">
                <h5 className="font-onest text-sm font-bold text-[#121517]">
                  Dīpa (Portfolio AI Copilot)
                </h5>
                <p className="font-inter text-xs sm:text-sm text-[#121517]/80 leading-relaxed">
                  Live, multilingual voice copilot answering questions about Deepak&apos;s work, grounded in RAG with citations, 95% (19/20) on golden evaluation set, voice in 5 Indian languages (Sarvam AI).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#121517]/10 space-y-1.5 shadow-2xs">
                <h5 className="font-onest text-sm font-bold text-[#121517]">
                  Performance Score Strategy
                </h5>
                <p className="font-inter text-xs sm:text-sm text-[#121517]/80 leading-relaxed">
                  Comprehensive cross-platform strategy and PRD (Athletic Reliability Performance Score) uniting mobile, Smart Gym, and wearable telemetry.
                </p>
              </div>
            </div>
          </div>

          {/* Tools & Domains */}
          <div>
            <h4 className="font-onest text-base font-bold text-[#121517] mb-4 flex items-center gap-2">
              <Wrench size={18} className="text-[#A8711A]" />
              <span>Skills, Platforms & Domains</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#121517]/10 space-y-2">
                <h5 className="font-onest text-xs font-bold uppercase tracking-wider text-[#121517]/60">
                  Tools & Platforms
                </h5>
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

              <div className="p-5 rounded-2xl bg-white border border-[#121517]/10 space-y-2">
                <h5 className="font-onest text-xs font-bold uppercase tracking-wider text-[#121517]/60">
                  Domains & Verticals
                </h5>
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
          </div>

          {/* Education */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#121517]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#121517]/10 flex items-center justify-center text-[#A8711A]">
                <GraduationCap size={20} />
              </div>
              <div>
                <h5 className="font-onest text-sm font-bold text-[#121517]">
                  Bachelor of Engineering (B.E.)
                </h5>
                <p className="font-inter text-xs text-[#121517]/60">
                  Visvesvaraya Technological University (VTU)
                </p>
              </div>
            </div>
            <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-[#121517]/10 text-[#121517]/70 w-fit">
              Graduated 2018
            </span>
          </div>
        </div>
        )}

        {/* Footer Bar */}
        <div className="px-6 py-4 border-t border-[#121517]/10 bg-[#FAF8F5] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 text-xs text-[#121517]/70 font-inter">
            <span>Bengaluru, India</span>
            <span>•</span>
            <a
              href="mailto:shipwithdeepak@gmail.com"
              className="text-[#A8711A] font-medium hover:underline"
            >
              shipwithdeepak@gmail.com
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              className="px-4 py-2 rounded-full bg-[#A8711A] hover:bg-[#A8711A]/90 text-white font-inter text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <Download size={14} />
              <span>
                {downloadStatus === "downloading"
                  ? "Downloading..."
                  : downloadStatus === "done"
                  ? "Downloaded!"
                  : "Download Resume (PDF)"}
              </span>
            </button>

            <GlassButton
              as="a"
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener"
              variant="primary"
              size="sm"
              icon={<ArrowRight size={13} />}
            >
              Discuss Role / Interview
            </GlassButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

