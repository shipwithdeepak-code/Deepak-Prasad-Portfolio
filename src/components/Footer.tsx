import React, { useEffect, useRef, useState, Suspense } from "react";
import { motion } from "framer-motion";
import {
  Linkedin,
  Github,
  Mail,
  Sparkles,
  ArrowUpRight,
  Calendar,
} from "lucide-react";
import { CALENDLY_URL } from "../utils/calendly";

interface FooterProps {
  onNavigate?: (path: string) => void;
  onOpenResumeModal?: () => void;
  onOpenContactModal?: () => void;
  onSelectCaseStudy?: (id?: string) => void;
}

const SylvaLivingWorldScene = React.lazy(() =>
  import("@designcodeio/threeui").then((m) => ({ default: m.SylvaLivingWorldScene }))
);

export default function Footer({}: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  // Condition 4: Mobile (< 768px) and reduced-motion get a still, not a scene
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth >= 768;
  });

  // FIX B — warm it up on idle, not on scroll. Move the mount off the IntersectionObserver entirely
  const [mounted, setMounted] = useState(false);
  const [settled, setSettled] = useState(false);

  // FIX C — reveal on approach, at 800px rootMargin, 700ms fade cubic-bezier(0.23,1,0.32,1)
  const [inView, setInView] = useState(false);

  // Reveal ONLY when settled AND in view
  const visible = settled && inView;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // FIX B: Warm up chunk and initialize scene on browser idle
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion || window.innerWidth < 768) return;

    const id = ("requestIdleCallback" in window)
      ? (window as any).requestIdleCallback(() => setMounted(true), { timeout: 3000 })
      : setTimeout(() => setMounted(true), 1500);

    return () => {
      if ("cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
    };
  }, [prefersReducedMotion]);

  // FIX C: Keep the IntersectionObserver ONLY for the opacity reveal on approach
  useEffect(() => {
    if (prefersReducedMotion || !isDesktop) return;

    const el = footerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { rootMargin: "800px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion, isDesktop]);

  // Ensure scene camera & canvas update layout if footer aspect ratio resizes
  useEffect(() => {
    const el = footerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(() => {
      const iframe = sceneRef.current?.querySelector("iframe");
      iframe?.contentWindow?.postMessage({ type: "resize" }, "*");
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden min-h-[85vh] md:min-h-screen flex flex-col justify-center items-center bg-[#FAF8F5]"
    >
      {/* FIX A — permanent base layer UNDER the canvas so there is no empty state at any point */}
      <div
        className="absolute inset-0 z-0 bg-[radial-gradient(120%_90%_at_50%_100%,#DDE6DA_0%,#EEF1EA_45%,#FAF8F5_100%)]"
        aria-hidden="true"
      />

      {/* Ambient 3D Scene Layer (Z-0) — Fades in on top of base layer ONLY when settled AND in view */}
      <div
        className={`absolute inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        ref={sceneRef}
      >
        {mounted && (
          <Suspense fallback={null}>
            <SylvaLivingWorldScene
              variant="living-green"
              className="w-full h-full"
              style={{ pointerEvents: "none" }}
              onSettled={() => setSettled(true)}
            />
          </Suspense>
        )}
      </div>

      {/* Scrim Overlay (Z-1): Weighted to TOP, completely clears by 62% for full scene visibility */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(to_bottom,#FAF8F5_0%,rgba(250,248,245,0.88)_18%,rgba(250,248,245,0.45)_40%,rgba(250,248,245,0)_62%,rgba(250,248,245,0)_100%)]"
        aria-hidden="true"
      />

      {/* Watermark closing mark of the whole page (Z-1) */}
      <div
        className="absolute inset-x-0 bottom-[4%] z-[1] pointer-events-none select-none flex justify-center"
        aria-hidden="true"
      >
        <span className="font-onest font-bold tracking-[-0.04em] text-[clamp(3.5rem,15vw,13rem)] leading-none text-[#042718]/[0.55] mix-blend-soft-light whitespace-nowrap">
          Deepak Prasad
        </span>
      </div>

      {/* Existing Footer Content Centered (Z-2) */}
      <div className="relative z-[2] w-full flex flex-col items-center justify-center my-auto">
        {/* CTA SECTION */}
        <section className="w-full relative py-12 sm:py-16 md:py-20 overflow-hidden flex flex-col items-center justify-center">
          <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-[96px] relative z-10 flex flex-col items-center">
            <div className="max-w-[1248px] w-full flex flex-col items-center">
              {/* Heading with soft protective halo */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="w-full max-w-3xl text-center text-[#042718] font-onest text-[34px] sm:text-[44px] md:text-[54px] font-semibold leading-[1.12] tracking-tight md:tracking-[-2px] mb-4 [text-shadow:0_1px_2px_rgba(250,248,245,0.9),0_0_16px_rgba(250,248,245,0.75)]"
              >
                Let’s build something{" "}
                <span className="font-playfair italic font-medium text-[#042718]/70">
                  extraordinary
                </span>{" "}
                together
              </motion.h2>

              {/* Subheading with soft protective halo */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-full max-w-[640px] text-center text-[#042718]/85 font-inter text-[15px] md:text-[18px] leading-relaxed mb-10 [text-shadow:0_1px_2px_rgba(250,248,245,0.9),0_0_16px_rgba(250,248,245,0.75)]"
              >
                Looking for a Senior Product Manager who thrives in ambiguity,
                talks to real users, and builds resilient physical-digital
                systems? Let’s connect.
              </motion.p>

              {/* Action Buttons Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
              >
                {/* Full CTA button */}
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-book-strategy-chat-cta"
                  className="h-14 px-8 rounded-full bg-[#042718] text-white font-inter font-semibold text-base shadow-lg hover:bg-[#042718]/90 transition-colors flex items-center gap-3 group cursor-pointer"
                >
                  <Calendar size={18} className="text-[#34D399]" />
                  <span>Let&apos;s Talk</span>
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>

                {/* Three icon-only circular buttons */}
                <a
                  href="https://www.linkedin.com/in/prasad-deepak/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="h-14 w-14 rounded-full bg-white/70 backdrop-blur-md border border-[#042718]/15 hover:bg-white text-[#042718] transition-colors flex items-center justify-center cursor-pointer shadow-xs shrink-0"
                >
                  <Linkedin size={20} className="text-[#042718]" />
                </a>

                <a
                  href="https://github.com/shipwithdeepak-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="h-14 w-14 rounded-full bg-white/70 backdrop-blur-md border border-[#042718]/15 hover:bg-white text-[#042718] transition-colors flex items-center justify-center cursor-pointer shadow-xs shrink-0"
                >
                  <Github size={20} className="text-[#042718]" />
                </a>

                <a
                  href="mailto:shipwithdeepak@gmail.com"
                  aria-label="Email"
                  className="h-14 w-14 rounded-full bg-white/70 backdrop-blur-md border border-[#042718]/15 hover:bg-white text-[#042718] transition-colors flex items-center justify-center cursor-pointer shadow-xs shrink-0"
                >
                  <Mail size={20} className="text-[#042718]" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
