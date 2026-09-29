import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { CALENDLY_URL } from "../utils/calendly";

interface NavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenResumeModal?: () => void;
}

export default function Navigation({
  currentPath,
  onNavigate,
}: NavigationProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Normalize current path to determine context-aware destination
  const cleanPath = currentPath.split("?")[0].replace(/\/+$/, "") || "/";
  const isHomepage = cleanPath === "/";
  const targetHref = isHomepage ? "/about" : "/";
  const ariaLabel = isHomepage
    ? "Deepak Prasad - About Me"
    : "Deepak Prasad - Home";

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / scrollHeight)));
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll-progress bar (Minimal subtle top indicator) */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#A8711A] z-[60] pointer-events-none transition-[width] duration-75 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
        aria-hidden="true"
      />

      {/* Floating Corner Navigation: Zero shared container, zero pill. Two independent floating corner elements */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none">
        <div className="w-full flex items-center justify-between px-4 sm:px-5 md:px-6 pt-1 sm:pt-1.5 md:pt-2">
          {/* TOP LEFT: Context-Aware Editorial Identity Lockup [avatar] Deepak Prasad */}
          <a
            href={targetHref}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(targetHref);
            }}
            className="pointer-events-auto inline-flex items-center gap-2.5 sm:gap-3 group rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C] focus-visible:ring-offset-2 shrink-0 select-none transition-transform duration-200 hover:scale-[1.01]"
            id="nav-logo"
            aria-label={ariaLabel}
          >
            {/* Sharp circular photo avatar (40–44px desktop, personal signature caliber) */}
            <div className="relative shrink-0">
              <div className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] md:w-[44px] md:h-[44px] rounded-full overflow-hidden border border-white/30 shadow-[0_2px_10px_rgba(0,0,0,0.5)] bg-[#121517] flex items-center justify-center relative transition-transform duration-200 group-hover:scale-[1.03]">
                <picture className="w-full h-full block">
                  <source srcSet="/images/deepak-prasad-80.webp" type="image/webp" />
                  <img
                    src="/images/deepak-prasad-80.jpg"
                    alt="Deepak Prasad"
                    width="44"
                    height="44"
                    referrerPolicy="no-referrer"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-center block"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const fallback = target.closest(".rounded-full")?.querySelector(".nav-dp-fallback");
                      if (fallback) (fallback as HTMLElement).style.display = "flex";
                    }}
                  />
                </picture>
                <div className="nav-dp-fallback hidden w-full h-full items-center justify-center font-onest font-semibold text-white text-xs bg-[#121517]">
                  DP
                </div>
              </div>
            </div>

            {/* Editorial Name: Semibold, crisp, 15–16px, near-white light signature with soft shadow, no pill, no border */}
            <span className="font-onest text-[15px] sm:text-[16px] font-semibold text-[#FAF8F5] leading-none tracking-[-0.2px] whitespace-nowrap [text-shadow:0_1px_6px_rgba(0,0,0,0.9),0_0_16px_rgba(0,0,0,0.65)] group-hover:text-white/90 transition-colors">
              Deepak Prasad
            </span>
          </a>

          {/* TOP RIGHT: Standalone Compact Let's Talk CTA (Frosted Glass + Charcoal) */}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener"
            id="nav-contact-cta"
            className="pointer-events-auto nav-btn-hover inline-flex items-center gap-1.5 sm:gap-2 py-1 pl-3 sm:pl-3.5 pr-1.5 rounded-full bg-white/[0.88] hover:bg-white backdrop-blur-md border border-white/60 cursor-pointer relative h-[34px] sm:h-[38px] transition-[background-color,border-color,box-shadow,transform] duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.18)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C] focus-visible:ring-offset-2 shrink-0 select-none"
            aria-label="Let's Talk (Opens scheduling calendar in new tab)"
          >
            <span className="block h-[18px] overflow-hidden pointer-events-none">
              <span className="block nav-label-stack">
                <span className="block h-[18px] leading-[18px] font-inter text-xs sm:text-[13px] font-semibold text-[#121517] whitespace-nowrap">
                  Let&apos;s Talk
                </span>
                <span className="block h-[18px] leading-[18px] font-inter text-xs sm:text-[13px] font-semibold text-[#121517] whitespace-nowrap">
                  Let&apos;s Talk
                </span>
              </span>
            </span>
            <div className="nav-arrow-chip w-[22px] h-[22px] sm:w-[25px] sm:h-[25px] rounded-full bg-[#121517] text-[#FAF8F5] flex items-center justify-center shrink-0">
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
            </div>
          </a>
        </div>
      </header>
    </>
  );
}
