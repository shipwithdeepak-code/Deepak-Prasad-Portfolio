import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ShaderOrb } from "./ShaderOrb";

const CopilotDrawer = lazy(() => import("./CopilotDrawer"));

interface CopilotWidgetProps {
  onOpenBookChat: () => void;
  onNavigate: (path: string) => void;
}

export default function CopilotWidget({
  onOpenBookChat,
  onNavigate,
}: CopilotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>(undefined);
  const [showIntroTooltip, setShowIntroTooltip] = useState(false);
  const [showScrollNudge, setShowScrollNudge] = useState(false);
  const [isCtaHovering, setIsCtaHovering] = useState(false);
  // Mobile only: true while the hero section's own "Ask Dīpa" CTA is on
  // screen, so the floating launcher can step out of its way instead of
  // visually colliding with it.
  const [hideForHeroCta, setHideForHeroCta] = useState(false);
  const shouldReduceMotion = Boolean(useReducedMotion());

  // Track if user has actually opened the chat (persists in localStorage)
  useEffect(() => {
    if (isOpen) {
      try {
        localStorage.setItem("copilotEverOpened", "true");
      } catch {}
    }
  }, [isOpen]);

  const dismissIntroTooltip = useCallback(() => {
    setShowIntroTooltip(false);
    try {
      localStorage.setItem("copilotIntroSeen", "true");
    } catch {}
  }, []);

  const dismissScrollNudge = useCallback(() => {
    setShowScrollNudge(false);
    try {
      sessionStorage.setItem("copilotScrollNudgeShown", "true");
    } catch {}
  }, []);

  // One-time intro tooltip (appears once ever per browser, 4.5s after mount, auto-dismisses after 9s)
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && localStorage.getItem("copilotIntroSeen") === "true") {
        return;
      }
    } catch {}

    if (isOpen) return;

    const timer = setTimeout(() => {
      try {
        if (localStorage.getItem("copilotIntroSeen") !== "true") {
          setShowIntroTooltip(true);
        }
      } catch {
        setShowIntroTooltip(true);
      }
    }, 4500);

    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!showIntroTooltip) return;

    const autoDismissTimer = setTimeout(() => {
      dismissIntroTooltip();
    }, 9000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        dismissIntroTooltip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(autoDismissTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showIntroTooltip, dismissIntroTooltip]);

  // Contextual scroll nudge auto-dismiss (7s, lighter touch)
  useEffect(() => {
    if (!showScrollNudge) return;

    const autoDismissTimer = setTimeout(() => {
      dismissScrollNudge();
    }, 7000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        dismissScrollNudge();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(autoDismissTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showScrollNudge, dismissScrollNudge]);

  // Contextual scroll nudge: triggers when user scrolls to #selected-work (~40-50% visible)
  // fires at most once per session for users who have never opened the chat
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      if (localStorage.getItem("copilotEverOpened") === "true") return;
      if (sessionStorage.getItem("copilotScrollNudgeShown") === "true") return;
    } catch {}

    let observer: IntersectionObserver | null = null;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;

    const attachObserver = () => {
      const targetEl = document.getElementById("selected-work");
      if (!targetEl) return false;

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
              try {
                const everOpened = localStorage.getItem("copilotEverOpened") === "true";
                const nudgeShown = sessionStorage.getItem("copilotScrollNudgeShown") === "true";

                if (!everOpened && !nudgeShown && !showIntroTooltip && !isOpen) {
                  setShowScrollNudge(true);
                  sessionStorage.setItem("copilotScrollNudgeShown", "true");
                  if (observer) {
                    observer.disconnect();
                  }
                }
              } catch {}
            }
          }
        },
        {
          threshold: [0.4, 0.5],
        }
      );

      observer.observe(targetEl);
      return true;
    };

    const attached = attachObserver();
    if (!attached) {
      retryTimer = setTimeout(attachObserver, 800);
    }

    return () => {
      if (observer) observer.disconnect();
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [isOpen, showIntroTooltip]);

  // If panel opens while tooltip or nudge is visible, dismiss them
  useEffect(() => {
    if (isOpen) {
      if (showIntroTooltip) dismissIntroTooltip();
      if (showScrollNudge) dismissScrollNudge();
    }
  }, [isOpen, showIntroTooltip, showScrollNudge, dismissIntroTooltip, dismissScrollNudge]);

  // Mobile only: the hero section has its own "Ask Dīpa" CTA right above
  // the fold. On small screens it sits in the same bottom-right area as
  // the floating launcher, so fade the launcher out while that CTA is
  // visible and bring it back once the visitor scrolls past it.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 640) return;

    let observer: IntersectionObserver | null = null;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;

    const attachObserver = () => {
      const heroCta = document.getElementById("hero-ask-dipa-cta");
      if (!heroCta) return false;

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            setHideForHeroCta(entry.isIntersecting);
          }
        },
        { threshold: 0.15 }
      );

      observer.observe(heroCta);
      return true;
    };

    const attached = attachObserver();
    if (!attached) {
      retryTimer = setTimeout(attachObserver, 800);
    }

    return () => {
      if (observer) observer.disconnect();
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, []);

  // Global custom event listener so any button on the site can open Dīpa
  useEffect(() => {
    const handleOpenDipa = () => {
      setIsOpen(true);
      dismissIntroTooltip();
      dismissScrollNudge();
    };
    window.addEventListener("open-copilot", handleOpenDipa);
    return () => window.removeEventListener("open-copilot", handleOpenDipa);
  }, [dismissIntroTooltip, dismissScrollNudge]);

  // Listen for Hero CTA hover events to animate the launcher orb wrapper
  useEffect(() => {
    const handleCtaHover = (e: Event) => {
      const customEvent = e as CustomEvent<{ hovering?: boolean }>;
      setIsCtaHovering(Boolean(customEvent.detail?.hovering));
    };

    window.addEventListener("hero-dipa-hover", handleCtaHover);
    return () => window.removeEventListener("hero-dipa-hover", handleCtaHover);
  }, []);

  return (
    <>
      <style>{`
        @keyframes ambientDrift1 {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          50% {
            transform: translate(14px, -14px) scale(1.05);
          }
        }
        @keyframes ambientDrift2 {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          50% {
            transform: translate(-14px, 14px) scale(1.05);
          }
        }
        .ambient-drift-1 {
          animation: ambientDrift1 24s ease-in-out infinite;
        }
        .ambient-drift-2 {
          animation: ambientDrift2 28s ease-in-out infinite;
        }

        @keyframes copilotDotPulse {
          0%, 80%, 100% {
            opacity: 0.35;
            transform: scale(0.82);
          }
          40% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .copilot-dot-pulse-1 {
          animation: copilotDotPulse 1.1s ease-in-out infinite;
          animation-delay: 0s;
        }
        .copilot-dot-pulse-2 {
          animation: copilotDotPulse 1.1s ease-in-out infinite;
          animation-delay: 0.15s;
        }
        .copilot-dot-pulse-3 {
          animation: copilotDotPulse 1.1s ease-in-out infinite;
          animation-delay: 0.3s;
        }

        @media (prefers-reduced-motion: reduce) {
          .ambient-drift-1,
          .ambient-drift-2 {
            animation: none !important;
            transform: none !important;
          }
          .copilot-dot-pulse-1,
          .copilot-dot-pulse-2,
          .copilot-dot-pulse-3 {
            animation: none !important;
            opacity: 0.65 !important;
            transform: scale(1) !important;
          }
        }
      `}</style>

      {/* One-time intro tooltip or contextual scroll nudge */}
      <AnimatePresence>
        {(showIntroTooltip || showScrollNudge) && !isOpen && !hideForHeroCta && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-[calc(216px_+_env(safe-area-inset-bottom))] sm:bottom-[148px] right-5 z-40 max-w-[300px] sm:max-w-[330px] p-3.5 rounded-2xl cursor-pointer text-left select-none"
            style={{
              background: "color-mix(in oklch, #FAFDFB 82%, transparent)",
              backdropFilter: "blur(20px) saturate(160%)",
              WebkitBackdropFilter: "blur(20px) saturate(160%)",
              border: "1px solid color-mix(in oklch, #042718 12%, transparent)",
              boxShadow:
                "0 12px 30px -8px rgba(4,39,24,.22), 0 4px 10px -3px rgba(4,39,24,.1)",
            }}
            onClick={() => {
              if (showScrollNudge) dismissScrollNudge();
              if (showIntroTooltip) dismissIntroTooltip();
              setIsOpen(true);
            }}
          >
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full overflow-hidden border border-[#188E39]/30 bg-white shrink-0 mt-0.5 shadow-2xs">
                <picture>
                  <source srcSet="/images/deepak-prasad-80.webp" type="image/webp" />
                  <img
                    src="/images/deepak-prasad-80.jpg"
                    alt="Dīpa"
                    width="28"
                    height="28"
                    className="w-full h-full object-cover"
                  />
                </picture>
              </div>
              <div>
                <p className="font-inter text-xs sm:text-[13px] font-medium text-[#042718] leading-snug">
                  {showScrollNudge
                    ? "Curious about the thinking behind this? Ask Dīpa →"
                    : "I'm Dīpa. I know a little about Deepak's work. Ask me anything →"}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const promptText = showScrollNudge
                      ? "Tell me about the trade-offs in Deepak's selected work"
                      : "What's Deepak's strongest 0→1 product?";
                    if (showScrollNudge) dismissScrollNudge();
                    if (showIntroTooltip) dismissIntroTooltip();
                    setInitialPrompt(promptText);
                    setIsOpen(true);
                  }}
                  className="mt-2 text-left font-inter text-[11px] font-medium text-[#065F46] hover:text-[#042718] bg-[#ECFDF5]/85 hover:bg-[#ECFDF5] px-2.5 py-1 rounded-lg border border-[#01bc7c]/30 transition-colors block w-fit"
                >
                  Try:{" "}
                  <span className="font-semibold">
                    {showScrollNudge
                      ? "Trade-offs in Deepak's selected work"
                      : "What's Deepak's strongest 0→1 product?"}
                  </span>
                </button>
              </div>
            </div>

            {/* Speech bubble pointer toward the launcher orb */}
            <div
              className="absolute -bottom-1.5 right-6 w-3 h-3 rotate-45"
              style={{
                background: "color-mix(in oklch, #FAFDFB 82%, transparent)",
                borderRight: "1px solid color-mix(in oklch, #042718 12%, transparent)",
                borderBottom: "1px solid color-mix(in oklch, #042718 12%, transparent)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Circular Trigger (always visible, toggles open/close) */}
      <div
        id="copilot-launcher-btn"
        className={`fixed bottom-[calc(148px_+_env(safe-area-inset-bottom))] sm:bottom-20 right-5 z-40 transition-[transform,opacity] duration-300 ease-out ${
          isCtaHovering && !shouldReduceMotion
            ? "scale-[1.08] -translate-y-1"
            : "scale-100 translate-y-0"
        } ${hideForHeroCta && !isOpen ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}
        style={
          isCtaHovering && !shouldReduceMotion
            ? {
                filter: "drop-shadow(0 0 16px rgba(1, 188, 124, 0.45))",
                transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), filter 0.25s ease-out",
              }
            : undefined
        }
      >
        <ShaderOrb
          fixedLabel=""
          disableClickAdvance
          sizeClassName="w-[52px] h-[52px]"
          title={
            isOpen
              ? "Close Dīpa"
              : "Dīpa: illuminate the thinking. Ask about Deepak's work."
          }
          ariaLabel={
            isOpen
              ? "Close Dīpa"
              : "Open Dīpa, Deepak's AI assistant"
          }
          onOrbClick={() => {
            setIsOpen((prev) => !prev);
            dismissIntroTooltip();
            dismissScrollNudge();
          }}
        />
      </div>

      {/* Main Copilot Drawer / Modal — loaded only when opened */}
      {isOpen && (
        <Suspense fallback={null}>
          <CopilotDrawer
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onOpenBookChat={onOpenBookChat}
            onNavigate={onNavigate}
            initialPrompt={initialPrompt}
          />
        </Suspense>
      )}
    </>
  );
}
