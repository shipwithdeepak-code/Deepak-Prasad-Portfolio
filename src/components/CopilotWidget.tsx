import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Send,
  X,
  ChevronDown,
  ChevronUp,
  Cpu,
  Database,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  Calendar,
  RotateCcw,
  BookOpen,
  Layers,
  Terminal,
} from "lucide-react";
import { CALENDLY_URL } from "../utils/calendly";
import { ShaderOrb } from "./ShaderOrb";

interface RetrievedChunk {
  id: string;
  source: string;
  title: string;
  category: string;
  chunk: string;
  similarity: number;
}

interface Message {
  id: string;
  sender: "user" | "copilot";
  text: string;
  timestamp: string;
  fallback?: boolean;
  retrievedChunks?: RetrievedChunk[];
  topSimilarity?: number;
  retrievalTimeMs?: number;
  totalTimeMs?: number;
}

interface CopilotWidgetProps {
  onOpenBookChat: () => void;
  onNavigate: (path: string) => void;
}

const STARTER_PROMPTS = [
  "What was Deepak's impact at ReshaMandi?",
  "Why choose RAG over fine-tuning for this site?",
  "How did the Sportstech AI Coach handle latency?",
  "Explain Deepak's first operating principle",
  "What's actually changing for PMs with AI?",
  "Is 'AI-native PM' more than a buzzword?",
];

export default function CopilotWidget({
  onOpenBookChat,
  onNavigate,
}: CopilotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [selectedChunk, setSelectedChunk] = useState<RetrievedChunk | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showIntroTooltip, setShowIntroTooltip] = useState(false);
  const [showScrollNudge, setShowScrollNudge] = useState(false);
  const [isCtaHovering, setIsCtaHovering] = useState(false);
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [keyboardViewport, setKeyboardViewport] = useState<{
    height: number;
    offsetTop: number;
  } | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "copilot",
      text: "Hi, I'm Dīpa. I know Deepak's work, thinking, and the stories behind his projects: the case studies, decisions, and lessons in between. What are you curious about?",
      timestamp: "Just now",
    },
  ]);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasInteractedRef = useRef<boolean>(false);

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
      if (customEvent.detail) {
        setIsCtaHovering(Boolean(customEvent.detail.hovering));
      }
    };
    window.addEventListener("dipa-cta-hover", handleCtaHover);
    return () => window.removeEventListener("dipa-cta-hover", handleCtaHover);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        if (selectedChunk) {
          setSelectedChunk(null);
        } else {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isOpen, selectedChunk]);

  // When panel opens, reset scroll position to the top of the welcome message
  useEffect(() => {
    if (isOpen) {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = 0;
      }
      requestAnimationFrame(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = 0;
        }
      });
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [isOpen]);

  // Track the visual viewport so the chat window repositions above the
  // on-screen keyboard on mobile. 100dvh alone isn't enough: Chrome only
  // shrinks it when interactive-widget=resizes-content is set, and iOS
  // Safari doesn't shrink dvh for the keyboard at all — so without this,
  // the keyboard just covers the bottom of the fixed-position window
  // (including the input bar) on iPhone.
  useEffect(() => {
    if (!isOpen) return;
    const vv = window.visualViewport;
    if (!vv) return;

    const updateViewport = () => {
      setKeyboardViewport({ height: vv.height, offsetTop: vv.offsetTop });
    };

    updateViewport();
    vv.addEventListener("resize", updateViewport);
    vv.addEventListener("scroll", updateViewport);
    return () => {
      vv.removeEventListener("resize", updateViewport);
      vv.removeEventListener("scroll", updateViewport);
    };
  }, [isOpen]);

  // Only auto-scroll after a real interaction (user sends query or AI replies)
  useEffect(() => {
    if (isOpen && hasInteractedRef.current) {
      const timer = setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages]);

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || input).trim();
    if (!textToSend || isLoading) return;

    hasInteractedRef.current = true;
    const userMessage: Message = {
      id: "user-" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!queryText) setInput("");
    setIsLoading(true);

    try {
      const fetchPromise = (async () => {
        const res = await fetch("/api/copilot/query", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: textToSend }),
        });

        if (!res.ok) {
          throw new Error(`Server returned status ${res.status}`);
        }

        return await res.json();
      })();

      const minDurationPromise = new Promise((resolve) => setTimeout(resolve, 300));
      const [data] = await Promise.all([fetchPromise, minDurationPromise]);

      const copilotMessage: Message = {
        id: "copilot-" + Date.now(),
        sender: "copilot",
        text: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        fallback: data.fallback,
        retrievedChunks: data.retrievedChunks,
        topSimilarity: data.topSimilarity,
        retrievalTimeMs: data.retrievalTimeMs,
        totalTimeMs: data.totalTimeMs,
      };

      setMessages((prev) => [...prev, copilotMessage]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: "error-" + Date.now(),
          sender: "copilot",
          text: "I encountered a transient network connection error while communicating with the retrieval server. Please try asking again or feel free to book a chat directly with Deepak.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          fallback: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResetChat = () => {
    hasInteractedRef.current = false;
    setMessages([
      {
        id: "welcome-" + Date.now(),
        sender: "copilot",
        text: "Hi, I'm Dīpa. I know Deepak's work, thinking, and the stories behind his projects: the case studies, decisions, and lessons in between. What are you curious about?",
        timestamp: "Just now",
      },
    ]);
    setSelectedChunk(null);
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = 0;
    }
  };

  const formatText = (content: string, isUser: boolean = false) => {
    // Simple markdown paragraph and list formatter
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      if (line.startsWith("* ") || line.startsWith("- ")) {
        const bulletText = line.substring(2);
        return (
          <li
            key={idx}
            className={`ml-4 list-disc text-sm my-1 leading-relaxed ${
              isUser ? "text-white" : "text-[#042718]/90"
            }`}
          >
            {renderBold(bulletText, isUser)}
          </li>
        );
      }
      if (line.trim() === "") {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p
          key={idx}
          className={`text-sm leading-relaxed my-1 ${
            isUser ? "text-white font-medium" : "text-[#042718]/90"
          }`}
        >
          {renderBold(line, isUser)}
        </p>
      );
    });
  };

  const renderBold = (str: string, isUser: boolean = false) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong
            key={i}
            className={`font-bold ${
              isUser ? "text-white" : "text-[#042718]"
            }`}
          >
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

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
        {(showIntroTooltip || showScrollNudge) && !isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-[calc(148px_+_env(safe-area-inset-bottom))] right-5 z-40 max-w-[300px] sm:max-w-[330px] p-3.5 rounded-2xl cursor-pointer text-left select-none"
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
            {/* Close × button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (showScrollNudge) dismissScrollNudge();
                if (showIntroTooltip) dismissIntroTooltip();
              }}
              aria-label="Dismiss"
              className="absolute top-2.5 right-2.5 p-1 rounded-full text-[#042718]/40 hover:text-[#042718] hover:bg-[#042718]/8 transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>

            <div className="flex items-start gap-2.5 pr-4">
              <div className="w-7 h-7 rounded-full overflow-hidden border border-[#042718]/15 bg-[#042718] shrink-0 mt-0.5">
                <picture className="w-full h-full block">
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
                    setIsOpen(true);
                    handleSend(promptText);
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
        className={`fixed bottom-[calc(5rem_+_env(safe-area-inset-bottom))] right-5 z-40 transition-transform duration-300 ease-out ${
          isCtaHovering && !shouldReduceMotion
            ? "scale-[1.08] -translate-y-1"
            : "scale-100 translate-y-0"
        }`}
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

      {/* Main Copilot Drawer / Modal */}
      {isOpen && (
        <div
          id="copilot-window"
          className="fixed bottom-4 sm:bottom-[152px] right-4 sm:right-5 left-4 sm:left-auto z-50 w-auto sm:w-[460px] h-[calc(100dvh-32px)] sm:h-[620px] max-h-[calc(100dvh-32px)] sm:max-h-[calc(100dvh-176px)] flex flex-col rounded-[24px] overflow-hidden font-inter transition-[opacity,transform] duration-300"
          style={{
            background: "color-mix(in oklch, #FAFDFB 55%, transparent)",
            backdropFilter: "blur(24px) saturate(160%)",
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
            border: "1px solid color-mix(in oklch, #042718 12%, transparent)",
            boxShadow:
              "0 16px 32px -16px rgba(4,39,24,.4), 0 4px 10px -4px rgba(4,39,24,.18)",
            ...(keyboardViewport &&
            typeof window !== "undefined" &&
            window.innerWidth < 640
              ? {
                  top: keyboardViewport.offsetTop + 16,
                  bottom: "auto",
                  height: keyboardViewport.height - 32,
                  maxHeight: keyboardViewport.height - 32,
                }
              : undefined),
          }}
        >
          {/* Ambient glowing background layer (z-0) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
            <div
              className="ambient-drift-1 absolute -top-12 -right-12 w-72 h-72 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, #188E39 0%, transparent 70%)",
                opacity: 0.18,
                filter: "blur(34px)",
                WebkitFilter: "blur(34px)",
              }}
            />
            <div
              className="ambient-drift-2 absolute -bottom-10 -left-10 w-64 h-64 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, #188E39 0%, transparent 70%)",
                opacity: 0.14,
                filter: "blur(30px)",
                WebkitFilter: "blur(30px)",
              }}
            />
          </div>

          {/* Header (z-10) — soft continuous glass surface without hard divider line */}
          <div
            className="relative z-10 p-4 flex items-center justify-between shrink-0 select-none"
            style={{
              backgroundColor: "transparent",
            }}
          >
            <div className="flex items-center gap-2.5">
              <div className="relative shrink-0">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#042718]/15 bg-[#042718] flex items-center justify-center relative shadow-2xs">
                  <picture className="w-full h-full block">
                    <source srcSet="/images/deepak-prasad-80.webp" type="image/webp" />
                    <img
                      src="/images/deepak-prasad-80.jpg"
                      alt="Deepak Prasad"
                      width="32"
                      height="32"
                      referrerPolicy="no-referrer"
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover object-center block"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                        const fallback = target.closest(".rounded-full")?.querySelector(".dipa-dp-fallback");
                        if (fallback) (fallback as HTMLElement).style.display = "flex";
                      }}
                    />
                  </picture>
                  <div className="dipa-dp-fallback hidden w-full h-full items-center justify-center font-onest font-bold text-white text-xs bg-[#042718]">
                    DP
                  </div>
                </div>
                {/* Subtle online status indicator */}
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#188E39] border-2 border-[#FAFDFB]"
                  title="Online"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-onest text-sm sm:text-base font-bold text-[#042718] tracking-tight">
                    Dīpa
                  </h3>
                  <span
                    className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-[#065F46]"
                    style={{
                      backgroundColor: "color-mix(in oklch, #01bc7c 18%, transparent)",
                      border: "1px solid color-mix(in oklch, #01bc7c 30%, transparent)",
                    }}
                  >
                    RAG
                  </span>
                </div>
                <p className="text-[11px] text-[#042718]/65 font-inter">
                  Illuminate the thinking.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsHowItWorksOpen(!isHowItWorksOpen)}
                title="How this works"
                className="p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                style={{
                  backgroundColor: isHowItWorksOpen
                    ? "color-mix(in oklch, #01bc7c 22%, transparent)"
                    : "transparent",
                  color: isHowItWorksOpen ? "#042718" : "rgba(4, 39, 24, 0.55)",
                }}
              >
                <Info size={16} />
                <span
                  className={`hidden sm:inline text-[11px] ${
                    isHowItWorksOpen ? "font-bold text-[#042718]" : "text-[#042718]/70"
                  }`}
                >
                  Architecture
                </span>
              </button>

              <button
                onClick={handleResetChat}
                title="Reset conversation"
                className="p-1.5 rounded-lg text-[#042718]/55 hover:text-[#042718] hover:bg-[#042718]/5 transition-colors cursor-pointer"
              >
                <RotateCcw size={15} />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Close Dīpa"
                aria-label="Close Dīpa"
                className="p-1.5 rounded-lg text-[#042718]/55 hover:text-[#042718] hover:bg-[#042718]/5 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* "How This Works" Collapsible Transparent Architecture Panel (z-10) */}
          {isHowItWorksOpen && (
            <div
              className="relative z-10 p-4 shrink-0 overflow-y-auto max-h-[240px] transition-[opacity,max-height] duration-200"
              style={{
                background: "color-mix(in oklch, #FAFDFB 65%, transparent)",
                backdropFilter: "blur(10px) saturate(150%)",
                WebkitBackdropFilter: "blur(10px) saturate(150%)",
                borderBottom: "1px solid color-mix(in oklch, #042718 10%, transparent)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#188E39] uppercase tracking-wider">
                  <Cpu size={14} />
                  <span>How Dīpa Works</span>
                </div>
                <button
                  onClick={() => {
                    onNavigate("/work/behind-ai-copilot");
                    setIsOpen(false);
                  }}
                  className="text-[11px] font-semibold text-[#188E39] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Case Study</span>
                  <ArrowRight size={12} />
                </button>
              </div>

              {/* Technical Specifications (relocated from header) */}
              <div
                className="mb-2.5 px-2.5 py-1.5 rounded-lg text-[10.5px] font-mono text-[#065F46] flex flex-wrap items-center gap-x-2 gap-y-1"
                style={{
                  backgroundColor: "color-mix(in oklch, #01bc7c 14%, transparent)",
                  border: "1px solid color-mix(in oklch, #01bc7c 24%, transparent)",
                }}
              >
                <span className="font-bold">Specs:</span>
                <span>Grounded in 45+ case study chunks</span>
                <span>·</span>
                <span>gemini-3.1-flash-lite</span>
                <span>·</span>
                <span>In-memory CPU cosine similarity (&lt;2ms)</span>
              </div>

              {/* Step-by-Step Transparent Pipeline Diagram */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-[#042718] font-inter">
                {[
                  {
                    step: "1. Ingest & Chunk",
                    desc: "45 atomic semantic chunks (subsections, not tokens)",
                  },
                  {
                    step: "2. Build Embed",
                    desc: "gemini-embedding-2 (512-dim) stored in JSON",
                  },
                  {
                    step: "3. In-Memory Search",
                    desc: "Cosine similarity on CPU in <2ms (No Vector DB)",
                  },
                  {
                    step: "4. Confidence Gate",
                    desc: "Threshold \u2265 0.68. Unknowns escalate to Let's Talk",
                  },
                  {
                    step: "5. Strict Grounding",
                    desc: "Top 3-4 chunks passed to gemini-3.1-flash-lite",
                  },
                  {
                    step: "6. Source Provenance",
                    desc: "Citations tagged with exact similarity percentages",
                  },
                ].map((tile, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-lg"
                    style={{
                      background: "color-mix(in oklch, #FAFDFB 70%, transparent)",
                      backdropFilter: "blur(10px) saturate(150%)",
                      WebkitBackdropFilter: "blur(10px) saturate(150%)",
                      border: "1px solid color-mix(in oklch, #042718 8%, transparent)",
                    }}
                  >
                    <div className="font-bold text-[#188E39] flex items-center gap-1 mb-0.5">
                      <span>{tile.step}</span>
                    </div>
                    <p className="text-[10px] text-[#042718]/70">{tile.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Selected Chunk Modal / Drawer Overlay */}
          {selectedChunk && (
            <div className="absolute inset-0 bg-[#042718]/40 backdrop-blur-xs z-30 flex flex-col justify-end p-3 animate-fade-in">
              <div
                className="rounded-2xl p-4 shadow-2xl max-h-[80%] overflow-y-auto flex flex-col"
                style={{
                  background: "color-mix(in oklch, #FAFDFB 75%, transparent)",
                  backdropFilter: "blur(12px) saturate(150%)",
                  WebkitBackdropFilter: "blur(12px) saturate(150%)",
                  border: "1px solid color-mix(in oklch, #042718 10%, transparent)",
                }}
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#042718]/10">
                  <div>
                    <span className="text-[10px] font-bold text-[#188E39] uppercase tracking-wider">
                      Ground Truth Source Chunk
                    </span>
                    <h4 className="font-onest text-sm font-bold text-[#042718]">
                      {selectedChunk.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => setSelectedChunk(null)}
                    className="p-1 rounded hover:bg-[#042718]/10 text-[#042718]/70 cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="my-2.5 flex items-center gap-2">
                  <span
                    className="px-2 py-0.5 rounded text-[11px] font-semibold text-[#042718]/80"
                    style={{
                      background: "color-mix(in oklch, #FAFDFB 60%, transparent)",
                      border: "1px solid color-mix(in oklch, #042718 8%, transparent)",
                    }}
                  >
                    {selectedChunk.source}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#ECFDF5] text-[11px] font-bold text-[#065F46] border border-[#01bc7c]/30">
                    Match: {(selectedChunk.similarity * 100).toFixed(1)}%
                  </span>
                </div>

                <div
                  className="p-3 rounded-xl text-xs text-[#042718]/85 leading-relaxed font-mono"
                  style={{
                    background: "color-mix(in oklch, #FAFDFB 60%, transparent)",
                    border: "1px solid color-mix(in oklch, #042718 8%, transparent)",
                  }}
                >
                  {selectedChunk.chunk}
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#042718]/10">
                  <span className="text-[11px] text-[#042718]/60">
                    Chunk ID: <code className="text-[#042718] font-bold">{selectedChunk.id}</code>
                  </span>
                  <button
                    onClick={() => setSelectedChunk(null)}
                    className="px-3 py-1 text-xs font-semibold rounded-lg bg-[#042718] text-white hover:bg-[#188E39] transition-colors cursor-pointer"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Messages Area (z-10) */}
          <div
            ref={messagesContainerRef}
            className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4 bg-transparent"
          >
            {messages.map((msg, idx) => (
              <div
                key={msg.id}
                ref={idx === messages.length - 1 ? lastMessageRef : null}
                className={`flex flex-col scroll-mt-3 ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
                style={{ scrollMarginTop: 12 }}
              >
                {/* Chat Bubble */}
                <div
                  className={`max-w-[88%] p-3.5 rounded-[18px] text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#042718] text-white rounded-br-xs shadow-xs"
                      : "rounded-bl-xs shadow-2xs text-[#042718]"
                  }`}
                  style={
                    msg.sender === "copilot"
                      ? {
                          background: "color-mix(in oklch, #FAFDFB 65%, transparent)",
                          backdropFilter: "blur(10px) saturate(150%)",
                          WebkitBackdropFilter: "blur(10px) saturate(150%)",
                          border: "1px solid color-mix(in oklch, #042718 10%, transparent)",
                        }
                      : undefined
                  }
                >
                  {formatText(msg.text, msg.sender === "user")}

                  {/* Fallback CTA Button if query went out of bounds */}
                  {msg.fallback && (
                    <div className="mt-3 pt-3 border-t border-[#042718]/10 flex flex-col gap-2">
                      <div className="text-[11px] text-[#042718]/70 flex items-center gap-1.5">
                        <AlertTriangle size={13} className="text-[#D97706] shrink-0" />
                        <span>Question is outside verified portfolio facts.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={CALENDLY_URL}
                          target="_blank"
                          rel="noopener"
                          onClick={() => {
                            setIsOpen(false);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#188E39] hover:bg-[#065F46] text-white font-semibold text-xs transition-colors shadow-xs"
                        >
                          <Calendar size={13} />
                          <span>Let&apos;s Talk with Deepak</span>
                        </a>
                        <button
                          onClick={() => {
                            onNavigate("/work/behind-ai-copilot");
                            setIsOpen(false);
                          }}
                          className="text-xs text-[#188E39] font-medium hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>See Fallback Design</span>
                          <ArrowRight size={11} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Grounded Source Badges (Transparency Layer) */}
                {msg.sender === "copilot" &&
                  msg.retrievedChunks &&
                  msg.retrievedChunks.length > 0 && (
                    <div className="mt-2 ml-1 max-w-[92%]">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#042718]/60 uppercase tracking-wider mb-1">
                        <CheckCircle2 size={11} className="text-[#188E39]" />
                        <span>Grounded in {msg.retrievedChunks.length} sources:</span>
                        {msg.retrievalTimeMs && (
                          <span className="text-[9px] text-[#042718]/40 lowercase font-mono">
                            ({msg.retrievalTimeMs}ms retrieval)
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.retrievedChunks.map((chunk, cIdx) => (
                          <button
                            key={cIdx}
                            onClick={() => setSelectedChunk(chunk)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium text-[#042718]/80 hover:text-[#065F46] hover:border-[#188E39]/40 transition-colors shadow-2xs group cursor-pointer"
                            style={{
                              background: "color-mix(in oklch, #FAFDFB 65%, transparent)",
                              backdropFilter: "blur(8px) saturate(150%)",
                              WebkitBackdropFilter: "blur(8px) saturate(150%)",
                              border: "1px solid color-mix(in oklch, #042718 10%, transparent)",
                            }}
                            title="Click to view exact ground chunk"
                          >
                            <BookOpen size={10} className="text-[#188E39]" />
                            <span className="truncate max-w-[140px]">{chunk.source}</span>
                            <span className="font-mono text-[9px] text-[#188E39] font-bold">
                              {(chunk.similarity * 100).toFixed(0)}%
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                <span className="text-[10px] text-[#042718]/40 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div
                  className="p-3.5 rounded-[18px] shadow-2xs rounded-bl-xs flex items-center gap-2"
                  style={{
                    background: "color-mix(in oklch, #FAFDFB 65%, transparent)",
                    backdropFilter: "blur(10px) saturate(150%)",
                    WebkitBackdropFilter: "blur(10px) saturate(150%)",
                    border: "1px solid color-mix(in oklch, #042718 10%, transparent)",
                  }}
                >
                  <div className="flex space-x-1.5 items-center">
                    <div className="w-2 h-2 bg-[#188E39] rounded-full copilot-dot-pulse-1" />
                    <div className="w-2 h-2 bg-[#188E39] rounded-full copilot-dot-pulse-2" />
                    <div className="w-2 h-2 bg-[#188E39] rounded-full copilot-dot-pulse-3" />
                  </div>
                  <span className="text-xs text-[#042718]/60 font-inter font-medium">
                    Searching in-memory embeddings...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Chips (z-10) */}
          {messages.length <= 2 && !isLoading && (
            <div
              className="relative z-10 p-3 shrink-0"
              style={{
                backgroundColor: "transparent",
              }}
            >
              <div className="text-[10px] font-bold text-[#042718]/50 uppercase tracking-wider mb-2">
                Suggested Questions
              </div>
              <div className="grid grid-cols-2 gap-2">
                {STARTER_PROMPTS.map((prompt, idx) => {
                  const isAIPMTrend = idx >= 4;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSend(prompt)}
                      className={`text-left text-[11px] leading-snug p-2 rounded-xl transition-colors cursor-pointer flex items-center ${
                        isAIPMTrend
                          ? "text-[#065F46] font-medium hover:bg-[#ECFDF5]/80"
                          : "text-[#042718]/80 hover:text-[#065F46] hover:bg-[#ECFDF5]/60"
                      }`}
                      style={{
                        background: "color-mix(in oklch, #FAFDFB 65%, transparent)",
                        backdropFilter: "blur(8px) saturate(150%)",
                        WebkitBackdropFilter: "blur(8px) saturate(150%)",
                        border: isAIPMTrend
                          ? "1px solid color-mix(in oklch, #01bc7c 30%, transparent)"
                          : "1px solid color-mix(in oklch, #042718 10%, transparent)",
                      }}
                    >
                      "{prompt}"
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Input Bar (z-10) — seamless continuous glass surface */}
          <div
            className="relative z-10 p-3 flex items-center gap-2 shrink-0"
            style={{
              backgroundColor: "transparent",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Dīpa about Deepak's metrics, case studies, work..."
              disabled={isLoading}
              className="flex-1 px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#188E39] focus:ring-1 focus:ring-[#188E39] text-xs sm:text-sm text-[#042718] placeholder-[#042718]/40"
              style={{
                background: "color-mix(in oklch, #FAFDFB 65%, transparent)",
                backdropFilter: "blur(10px) saturate(150%)",
                WebkitBackdropFilter: "blur(10px) saturate(150%)",
                border: "1px solid color-mix(in oklch, #042718 12%, transparent)",
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-[#042718] hover:bg-[#188E39] disabled:bg-[#042718]/20 text-white disabled:text-white/40 transition-colors shrink-0 shadow-xs cursor-pointer disabled:cursor-not-allowed"
              aria-label="Send query to Dīpa"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
