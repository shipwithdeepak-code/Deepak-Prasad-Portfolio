import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, FileText, Menu, X } from "lucide-react";
import { CALENDLY_URL } from "../utils/calendly";

interface NavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenResumeModal?: () => void;
  onOpenContactModal?: () => void;
}

export default function Navigation({
  currentPath,
  onNavigate,
  onOpenResumeModal,
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  // Close mobile menu on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

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

  const navLinks = [
    { label: "Work", path: "/work", targetId: "selected-work" },
    { label: "About Me", path: "/about" },
  ];

  const handleLinkClick = (link: { label: string; path: string; targetId?: string }, e: React.MouseEvent) => {
    e.preventDefault();

    const [targetPath, targetHash] = link.path.split("#");
    const normalizedTargetPath = targetPath === "" ? "/" : targetPath;
    const currentBase = currentPath.split("#")[0] || "/";
    const hash = targetHash || link.targetId;

    if (normalizedTargetPath === currentBase && hash) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", link.path);
        return;
      }
    }

    onNavigate(link.path);
  };

  return (
    <>
      {/* Scroll-progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#A8711A] z-[60] pointer-events-none transition-[width] duration-75 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
        aria-hidden="true"
      />

      {/* Detached Floating Glass Pill Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
        <div
          className={`pointer-events-auto w-full max-w-[1120px] mx-auto rounded-full h-16 pl-4 pr-2 flex items-center justify-between backdrop-blur-[22px] backdrop-saturate-[1.8] transition-[background-color,border-color,box-shadow] duration-300 nav-glass-pill ${
            isScrolled
              ? "bg-white/[0.72] border border-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_12px_36px_rgba(4,39,24,0.12)]"
              : "bg-white/[0.42] border border-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_32px_rgba(4,39,24,0.08)]"
          }`}
        >
          {/* Avatar Photo Logo - Untouched */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/");
            }}
            className="flex items-center gap-3 hover:opacity-85 transition-opacity group rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8711A] focus-visible:ring-offset-2"
            id="nav-logo"
          >
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#042718]/15 shadow-xs group-hover:scale-105 transition-transform bg-[#042718] flex items-center justify-center relative">
                <picture className="w-full h-full block">
                  <source srcSet="/images/deepak-prasad-80.webp" type="image/webp" />
                  <img
                    src="/images/deepak-prasad-80.jpg"
                    alt=""
                    width="40"
                    height="40"
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
                <div className="nav-dp-fallback hidden w-full h-full items-center justify-center font-onest font-bold text-white text-sm bg-[#042718]">
                  DP
                </div>
              </div>
            </div>
            <div className="text-left">
              <span className="font-onest text-base font-bold text-[#042718] leading-none tracking-[-0.2px]">
                Deepak Prasad
              </span>
            </div>
          </a>

          {/* Desktop & Tablet Navigation Links: Work · About Me */}
          <nav id="desktop-nav-links" className="nav-desktop-only hidden md:flex items-center gap-7 lg:gap-8">
            {navLinks.map((link) => {
              const [linkPath] = link.path.split("#");
              const currentBase = currentPath.split("#")[0] || "/";
              const isActive =
                link.path === "/work"
                  ? currentBase.startsWith("/work")
                  : link.path === "/about"
                  ? currentBase.startsWith("/about")
                  : currentBase === linkPath;

              return (
                <a
                  key={link.label}
                  href={link.path}
                  onClick={(e) => handleLinkClick(link, e)}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`font-inter text-[14px] sm:text-[15px] leading-6 tracking-[-0.2px] transition-colors relative py-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8711A] focus-visible:ring-offset-2 ${
                    isActive
                      ? "text-[#042718] font-semibold"
                      : "text-[#042718]/80 font-medium hover:text-[#042718]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs: Résumé and Let's Talk on the right, plus Mobile Menu Toggle on small screens */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Résumé Button */}
            <button
              type="button"
              id="nav-resume-button"
              onClick={() => {
                if (onOpenResumeModal) onOpenResumeModal();
                else onNavigate("/resume");
              }}
              className="nav-btn-hover hidden md:inline-flex items-center gap-2 text-[#042718] text-[14px] font-medium px-3.5 py-1.5 rounded-full hover:bg-white/60 transition-[background-color,border-color,box-shadow] duration-200 border border-transparent hover:border-[#042718]/10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8711A] focus-visible:ring-offset-2"
            >
              <FileText size={16} className="text-[#188E39] shrink-0" />
              <span className="block h-[18px] overflow-hidden pointer-events-none">
                <span className="block nav-label-stack">
                  <span className="block h-[18px] leading-[18px]">Resume</span>
                  <span className="block h-[18px] leading-[18px]">Resume</span>
                </span>
              </span>
            </button>

            {/* Let's Talk Button */}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener"
              id="nav-contact-cta"
              className="nav-btn-hover inline-flex items-center gap-2 py-1 pl-3 pr-1.5 sm:pl-3.5 sm:pr-1.5 rounded-full bg-white/80 hover:bg-white backdrop-blur-md border border-[#042718]/15 cursor-pointer relative h-10 transition-[background-color,border-color,box-shadow] duration-300 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8711A] focus-visible:ring-offset-2"
            >
              <span className="block h-[18px] overflow-hidden pointer-events-none">
                <span className="block nav-label-stack">
                  <span className="block h-[18px] leading-[18px] font-inter text-xs lg:text-[13px] font-semibold text-[#042718]">
                    Let&apos;s Talk
                  </span>
                  <span className="block h-[18px] leading-[18px] font-inter text-xs lg:text-[13px] font-semibold text-[#042718]">
                    Let&apos;s Talk
                  </span>
                </span>
              </span>
              <div className="nav-arrow-chip w-[26px] h-[26px] rounded-full bg-[#042718] text-white flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </div>
            </a>

            {/* Mobile Menu Toggle (375px compact screens) */}
            <button
              type="button"
              id="mobile-nav-toggle"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-dropdown"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#042718] border border-[#042718]/15 shadow-2xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8711A] focus-visible:ring-offset-2"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Compact Mobile Navigation Dropdown (< md) */}
        {isMobileMenuOpen && (
          <div
            id="mobile-nav-dropdown"
            className="pointer-events-auto md:hidden w-full max-w-[1120px] mx-auto mt-2 rounded-[24px] p-2.5 bg-white/95 backdrop-blur-[24px] border border-white/80 shadow-[0_16px_40px_rgba(4,39,24,0.16)] transition-all duration-200"
          >
            <nav className="flex flex-col gap-1 font-inter text-sm" aria-label="Mobile Navigation">
              <a
                href="/work"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  onNavigate("/work");
                }}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-colors ${
                  currentPath.startsWith("/work")
                    ? "bg-[#042718]/10 text-[#042718] font-semibold"
                    : "text-[#042718]/80 hover:bg-[#042718]/5 font-medium"
                }`}
              >
                <span>Work</span>
                <span className="text-[11px] text-[#042718]/45">Selected work</span>
              </a>

              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  onNavigate("/about");
                }}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-colors ${
                  currentPath.startsWith("/about")
                    ? "bg-[#042718]/10 text-[#042718] font-semibold"
                    : "text-[#042718]/80 hover:bg-[#042718]/5 font-medium"
                }`}
              >
                <span>About</span>
                <span className="text-[11px] text-[#042718]/45">Background & Strategy</span>
              </a>

              <a
                href="/resume"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  if (onOpenResumeModal) onOpenResumeModal();
                  else onNavigate("/resume");
                }}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-colors ${
                  currentPath.startsWith("/resume")
                    ? "bg-[#042718]/10 text-[#042718] font-semibold"
                    : "text-[#042718]/80 hover:bg-[#042718]/5 font-medium"
                }`}
              >
                <span>Resume</span>
                <span className="text-[11px] text-[#042718]/45">Full CV</span>
              </a>

              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  onNavigate("/contact");
                }}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-colors ${
                  currentPath.startsWith("/contact")
                    ? "bg-[#042718]/10 text-[#042718] font-semibold"
                    : "text-[#042718]/80 hover:bg-[#042718]/5 font-medium"
                }`}
              >
                <span>Contact</span>
                <span className="text-[11px] text-[#042718]/45">Get in Touch</span>
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
