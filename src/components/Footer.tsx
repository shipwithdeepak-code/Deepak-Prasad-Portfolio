import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Linkedin,
  Github,
  Mail,
  ArrowUpRight,
  ArrowRight,
  Calendar,
  FileText,
} from "lucide-react";
import { CALENDLY_URL } from "../utils/calendly";
import GlassButton from "./ui/GlassButton";

interface FooterProps {
  onNavigate?: (path: string) => void;
  onOpenResumeModal?: () => void;
  onOpenContactModal?: () => void;
}

export default function Footer({
  onNavigate,
  onOpenResumeModal,
  onOpenContactModal: _onOpenContactModal,
}: FooterProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const footerRef = useRef<HTMLElement | null>(null);

  const handleExploreWork = (e: React.MouseEvent<HTMLElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (onNavigate) {
      e.preventDefault();
      onNavigate("/work");
    }
  };

  const handleResumeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (onOpenResumeModal) {
      e.preventDefault();
      onOpenResumeModal();
    }
  };

  const currentYear = 2026;

  return (
    <footer
      ref={footerRef}
      id="footer-section"
      role="contentinfo"
      aria-label="Site Colophon and Contact"
      className="relative w-full bg-[#FAF8F5] text-[#121517] border-t border-[#121517]/10 overflow-hidden"
    >
      {/* Subtle architectural background warmth - restrained single ambient bloom */}
      <div
        className="absolute top-0 right-1/4 w-[480px] h-[260px] bg-[radial-gradient(ellipse_at_center,rgba(200,155,60,0.05)_0%,transparent_70%)] pointer-events-none -translate-y-1/2"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-10 md:pt-12 lg:pt-14 pb-10 sm:pb-12">
        {/* =====================================================================
            TOP ROW: Small introductory label + Professional Positioning
            ===================================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 sm:pb-8 border-b border-[#121517]/8">
          {/* A. Small introductory label */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35 }}
            viewport={{ once: true, amount: 0.5 }}
            className="inline-flex items-center gap-2"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#A8711A] shrink-0"
              aria-hidden="true"
            />
            <span className="font-mono text-[11px] sm:text-[11.5px] font-bold uppercase tracking-[0.24em] text-[#A8711A]">
              THE NEXT CHAPTER STARTS HERE
            </span>
          </motion.div>

          {/* F. Professional positioning */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35, delay: 0.05 }}
            viewport={{ once: true, amount: 0.5 }}
            className="flex items-center"
          >
            <span className="font-mono text-[10.5px] sm:text-[11.5px] font-medium tracking-[0.14em] text-[#4A525A] uppercase select-none">
              PRODUCT STRATEGY <span className="text-[#C89B3C] mx-1">·</span> AI <span className="text-[#C89B3C] mx-1">·</span> GROWTH <span className="text-[#C89B3C] mx-1">·</span> EXECUTION
            </span>
          </motion.div>
        </div>

        {/* =====================================================================
            MAIN CONTENT SECTION: Asymmetric Editorial Split Composition
            ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start pt-7 sm:pt-9 md:pt-11 pb-10 sm:pb-14 lg:pb-16">
          {/* LEFT COLUMN: Main Monumental Headline (Visual Anchor) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true, amount: 0.3 }}
              className="font-onest text-[38px] xs:text-[46px] sm:text-[58px] md:text-[72px] lg:text-[80px] xl:text-[92px] font-bold text-[#121517] leading-[0.98] sm:leading-[0.96] tracking-[-1px] sm:tracking-[-2px] xl:tracking-[-3px] [overflow-wrap:anywhere]"
            >
              LET&apos;S BUILD
              <br />
              WHAT&apos;S NEXT
              <span className="text-[#C89B3C]">.</span>
            </motion.h2>
          </div>

          {/* RIGHT COLUMN: Supporting Copy, CTAs, and Direct Channels */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between space-y-6 sm:space-y-7 pt-1 lg:pt-2.5">
            {/* C. Supporting Copy */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45, delay: 0.08 }}
              viewport={{ once: true, amount: 0.3 }}
              className="font-inter text-[15px] sm:text-[16.5px] md:text-[17.5px] text-[#4A525A] leading-[1.62] max-w-[42ch] font-normal"
            >
              I turn complex problems into products people use and businesses can grow.
            </motion.p>

            {/* ACTION GROUP: Primary (LET'S TALK) & Secondary (EXPLORE MY WORK) */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45, delay: 0.14 }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center flex-wrap gap-3 sm:gap-3.5"
            >
              {/* D. Primary Call to Action: LET'S TALK (Protected Single-Line Layout) */}
              <GlassButton
                as="a"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-primary-cta"
                variant="primary"
                size="lg"
                icon={<Calendar size={17} className="text-[#FDE68A] shrink-0" />}
                iconPosition="left"
                className="w-full sm:w-auto justify-center group !h-12 sm:!h-12.5 !px-5 sm:!px-6 shadow-md whitespace-nowrap shrink-0 min-w-fit"
              >
                <span className="inline-flex items-center gap-1.5 font-inter font-semibold tracking-[0.02em] uppercase text-[13px] sm:text-[13.5px] whitespace-nowrap">
                  <span className="whitespace-nowrap">Let&apos;s Talk</span>
                  <ArrowUpRight
                    size={15}
                    className="shrink-0 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </span>
              </GlassButton>

              {/* E. Secondary Call to Action: EXPLORE MY WORK */}
              <GlassButton
                as="a"
                href="/work"
                onClick={handleExploreWork}
                id="footer-secondary-cta"
                variant="secondary"
                size="lg"
                icon={<ArrowRight size={15} className="text-[#121517]/70 group-hover:translate-x-0.5 transition-transform shrink-0" />}
                iconPosition="right"
                className="w-full sm:w-auto justify-center group !h-12 sm:!h-12.5 !px-5 sm:!px-6 !bg-white hover:!bg-[#F5F3EF] border border-[#121517]/12 hover:border-[#121517]/24 shadow-xs whitespace-nowrap shrink-0 min-w-fit"
              >
                <span className="font-inter font-medium tracking-[0.01em] uppercase text-[12.5px] sm:text-[13px] text-[#121517] whitespace-nowrap">
                  Explore My Work
                </span>
              </GlassButton>
            </motion.div>

            {/* G. Social and Professional Links */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex items-center gap-2.5 pt-1 sm:pt-2"
            >
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/prasad-deepak/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile of Deepak Prasad (opens in new tab)"
                className="w-10 h-10 sm:w-10.5 sm:h-10.5 rounded-full bg-white hover:bg-[#FAF8F5] border border-[#121517]/10 hover:border-[#121517]/25 shadow-xs flex items-center justify-center text-[#121517] hover:text-[#A8711A] transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C] focus-visible:ring-offset-2 shrink-0"
              >
                <Linkedin size={17} />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/shipwithdeepak-code"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile of Deepak Prasad (opens in new tab)"
                className="w-10 h-10 sm:w-10.5 sm:h-10.5 rounded-full bg-white hover:bg-[#FAF8F5] border border-[#121517]/10 hover:border-[#121517]/25 shadow-xs flex items-center justify-center text-[#121517] hover:text-[#A8711A] transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C] focus-visible:ring-offset-2 shrink-0"
              >
                <Github size={17} />
              </a>

              {/* Email */}
              <a
                href="mailto:shipwithdeepak@gmail.com"
                aria-label="Send email to shipwithdeepak@gmail.com"
                className="w-10 h-10 sm:w-10.5 sm:h-10.5 rounded-full bg-white hover:bg-[#FAF8F5] border border-[#121517]/10 hover:border-[#121517]/25 shadow-xs flex items-center justify-center text-[#121517] hover:text-[#A8711A] transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C] focus-visible:ring-offset-2 shrink-0"
              >
                <Mail size={17} />
              </a>

              {/* Resume Quick Access Link */}
              <a
                href="/Deepak_Prasad_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleResumeClick}
                aria-label="View Deepak Prasad's Resume (opens PDF)"
                className="h-10 sm:h-10.5 px-3.5 rounded-full bg-white hover:bg-[#FAF8F5] border border-[#121517]/10 hover:border-[#121517]/25 shadow-xs inline-flex items-center gap-1.5 text-xs font-inter font-medium text-[#121517] hover:text-[#A8711A] transition-all duration-200 hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C] focus-visible:ring-offset-2 cursor-pointer shrink-0"
              >
                <FileText size={14} className="text-[#121517]/70" />
                <span>Resume</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* =====================================================================
            H. CLOSING SIGNATURE & COLOPHON BAR
            ===================================================================== */}
        <div className="pt-6 sm:pt-8 border-t border-[#121517]/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#5A626A] select-none">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1">
            <span className="font-semibold text-[#121517]/80">
              Deepak Prasad &copy; {currentYear}
            </span>
            <span className="text-[#C89B3C]/70" aria-hidden="true">
              ·
            </span>
            <span>Senior Product Manager</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#5A626A] text-center sm:text-right">
            <span>Bengaluru, India</span>
            <span className="text-[#C89B3C]/70" aria-hidden="true">
              ·
            </span>
            <span className="text-[#A8711A] font-medium">Available to join immediately</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
