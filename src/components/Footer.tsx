import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Linkedin,
  Github,
  Mail,
  ArrowUpRight,
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
  onOpenContactModal,
}: FooterProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const footerRef = useRef<HTMLElement | null>(null);

  return (
    <footer
      ref={footerRef}
      id="footer-section"
      className="relative w-full overflow-hidden min-h-[85vh] md:min-h-screen flex flex-col justify-between items-center bg-[#FAF8F5] contain-[layout_paint_style]"
    >
      <style>{`
        @keyframes horizonMistSlow {
          0% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(-2.5%, -2px, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .footer-horizon-mist {
          animation: horizonMistSlow 48s ease-in-out infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .footer-horizon-mist {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* =========================================================================
          1. ATMOSPHERIC HORIZON LAYERS (SOFT, DISTANT, UNDERSTATED DEPTH)
          Progression: Ivory -> Warm Atmosphere -> Distant Horizon -> Subtle Foreground
          ========================================================================= */}

      {/* Layer 1: Seamless sky transition from #FAF8F5 into soft dawn twilight */}
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(180deg,#FAF8F5_0%,#FAF7F2_24%,#F5EFE4_50%,#EBE0CC_76%,#DFCFB5_100%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Layer 2: Restrained golden-hour sun bloom on the horizon line */}
      <div
        className="absolute inset-x-0 bottom-0 h-[60%] z-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_88%,rgba(253,230,138,0.28)_0%,rgba(200,155,60,0.14)_35%,rgba(200,155,60,0.03)_65%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Layer 3: Subtle atmospheric mist drift (Zero literal tracks/trains) */}
      <div
        className="footer-horizon-mist absolute inset-x-[-10%] bottom-[6%] h-[24%] z-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_60%_35%_at_45%_50%,rgba(255,255,255,0.5)_0%,rgba(250,248,245,0.2)_45%,transparent_75%)]"
        aria-hidden="true"
      />

      {/* Layer 4: Distant Multi-Plane Horizon Silhouettes (Soft, low-profile rolling topography) */}
      <div
        className="absolute inset-x-0 bottom-0 h-[140px] sm:h-[180px] md:h-[220px] z-[1] pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <defs>
            {/* Far Ridge Gradient: Soft, distant atmospheric perspective */}
            <linearGradient id="farRidgeGrad" x1="720" y1="60" x2="720" y2="240" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A89F91" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#968C7E" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#7E7467" stopOpacity="0.52" />
            </linearGradient>

            {/* Mid Ridge Gradient: Warm atmospheric charcoal-slate (Soft, no harsh black band) */}
            <linearGradient id="midRidgeGrad" x1="720" y1="110" x2="720" y2="240" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#484E55" stopOpacity="0.38" />
              <stop offset="45%" stopColor="#30353B" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#1E2226" stopOpacity="0.72" />
            </linearGradient>

            {/* Valley Haze: Soft ambient glow between the ridges */}
            <linearGradient id="valleyHaze" x1="720" y1="80" x2="720" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0" />
            </linearGradient>

            {/* Base atmospheric haze softening the bottom foundation */}
            <linearGradient id="baseHazeGrad" x1="720" y1="180" x2="720" y2="240" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#DFCFB5" stopOpacity="0" />
              <stop offset="100%" stopColor="#DFCFB5" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          {/* Far Distant Mountain Ridges: Gentle, undulating horizon */}
          <path
            d="M0 145C140 125 260 105 400 118C540 131 660 155 800 135C940 115 1060 90 1200 110C1310 125 1380 140 1440 148V240H0V145Z"
            fill="url(#farRidgeGrad)"
          />

          {/* Atmospheric Valley Haze */}
          <path
            d="M0 160C180 135 360 128 540 145C720 162 900 138 1080 125C1260 112 1380 140 1440 155V240H0V160Z"
            fill="url(#valleyHaze)"
          />

          {/* Mid-Ground Horizon Ridge: Softer, low-lying rolling hills */}
          <path
            d="M0 182C150 170 280 158 430 174C580 190 710 170 860 158C1010 146 1150 174 1300 166C1380 162 1420 170 1440 176V240H0V182Z"
            fill="url(#midRidgeGrad)"
          />

          {/* Base Atmospheric Wash */}
          <rect x="0" y="180" width="1440" height="60" fill="url(#baseHazeGrad)" />
        </svg>
      </div>

      {/* Layer 5: Scrim Overlay for pristine headline & copy contrast */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(to_bottom,#FAF8F5_0%,rgba(250,248,245,0.92)_28%,rgba(250,248,245,0.60)_52%,rgba(250,248,245,0)_76%)]"
        aria-hidden="true"
      />

      {/* =========================================================================
          2. CTA CONTENT CONTAINER (GENEROUS ATMOSPHERIC DISTANCE & CLARITY)
          Hierarchy: NEXT STOP -> Main Heading -> Supporting Copy -> CTAs -> Horizon
          ========================================================================= */}
      <div className="relative z-[3] w-full flex flex-col items-center justify-center pt-16 sm:pt-20 md:pt-24 pb-32 sm:pb-40 md:pb-48">
        <section className="w-full relative overflow-hidden flex flex-col items-center justify-center">
          <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-[96px] relative z-10 flex flex-col items-center">
            <div className="max-w-[1040px] w-full flex flex-col items-center text-center">
              {/* Eyebrow: NEXT STOP */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45 }}
                viewport={{ once: true }}
                className="mb-3"
              >
                <span className="font-mono text-[11px] sm:text-[11.5px] font-bold uppercase tracking-[0.22em] text-[#A8711A]">
                  NEXT STOP
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h2
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.08 }}
                viewport={{ once: true }}
                className="w-full max-w-3xl text-center text-[#121517] font-onest text-[32px] sm:text-[44px] md:text-[54px] font-bold leading-[1.12] tracking-tight md:tracking-[-1.8px] mb-4 [text-shadow:0_1px_2px_rgba(250,248,245,0.9),0_0_16px_rgba(250,248,245,0.75)]"
              >
                Looking for the next product challenge worth getting{" "}
                <span className="font-playfair italic font-medium text-[#121517]/85">
                  stubborn
                </span>{" "}
                about.
              </motion.h2>

              {/* Subheading: Preserved exact verified copy */}
              <motion.p
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.16 }}
                viewport={{ once: true }}
                className="w-full max-w-[56ch] text-center text-[#4A525A] font-inter text-[14.5px] sm:text-[16px] md:text-[17.5px] leading-[1.62] mb-9 [text-shadow:0_1px_2px_rgba(250,248,245,0.9),0_0_16px_rgba(250,248,245,0.75)] mx-auto font-normal"
              >
                Open to <span className="text-[#121517] font-semibold">Senior Product Manager</span> and{" "}
                <span className="text-[#121517] font-semibold">Product Lead</span> opportunities across subscriptions,
                marketplaces, and applied AI. If you&apos;re building products that need to scale long after launch,
                let&apos;s talk.
              </motion.p>

              {/* Action Buttons Row */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.24 }}
                viewport={{ once: true }}
                className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
              >
                {/* Primary CTA: Let's Talk */}
                <GlassButton
                  as="a"
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-book-strategy-chat-cta"
                  variant="primary"
                  size="lg"
                  icon={
                    <span className="flex items-center gap-1.5">
                      <Calendar size={18} className="text-[#C89B3C]" />
                    </span>
                  }
                  iconPosition="left"
                  className="shadow-md group"
                >
                  <span className="flex items-center gap-2">
                    <span>Let&apos;s Talk</span>
                    <ArrowUpRight
                      size={16}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </span>
                </GlassButton>

                {/* Secondary CTA: View Resume (Direct recruiter accessibility) */}
                {onOpenResumeModal && (
                  <GlassButton
                    type="button"
                    onClick={onOpenResumeModal}
                    id="footer-view-resume-cta"
                    variant="secondary"
                    size="lg"
                    icon={<FileText size={17} className="text-[#121517]/70" />}
                    iconPosition="left"
                    className="shadow-sm !bg-white/90 hover:!bg-white"
                  >
                    View Resume
                  </GlassButton>
                )}

                {/* Three Contact Icons */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <GlassButton
                    as="a"
                    href="https://www.linkedin.com/in/prasad-deepak/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    variant="icon"
                    className="h-12 w-12 sm:h-13 sm:w-13 !rounded-full !bg-white/85 hover:!bg-white"
                  >
                    <Linkedin size={19} className="text-[#121517]" />
                  </GlassButton>

                  <GlassButton
                    as="a"
                    href="https://github.com/shipwithdeepak-code"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    variant="icon"
                    className="h-12 w-12 sm:h-13 sm:w-13 !rounded-full !bg-white/85 hover:!bg-white"
                  >
                    <Github size={19} className="text-[#121517]" />
                  </GlassButton>

                  <GlassButton
                    as="a"
                    href="mailto:shipwithdeepak@gmail.com"
                    aria-label="Email Deepak Prasad"
                    variant="icon"
                    className="h-12 w-12 sm:h-13 sm:w-13 !rounded-full !bg-white/85 hover:!bg-white"
                  >
                    <Mail size={19} className="text-[#121517]" />
                  </GlassButton>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Copyright & Colophon Bar */}
      <div className="relative z-[3] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 border-t border-[#121517]/8 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-mono text-[#121517]/55 select-none">
        <div>
          <span>&copy; {new Date().getFullYear()} Deepak Prasad</span>
          <span className="mx-2" aria-hidden="true">&middot;</span>
          <span>Senior Product Manager</span>
        </div>
        <div className="text-[11px] text-[#121517]/45">
          Bengaluru, India &middot; Open to Global Relocation
        </div>
      </div>
    </footer>
  );
}
