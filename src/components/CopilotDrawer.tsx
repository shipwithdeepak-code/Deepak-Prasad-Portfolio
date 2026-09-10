import React, { useState, useRef, useEffect } from "react";
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
import { DipaAvatar } from "./DipaAvatar";

export interface RetrievedChunk {
  id: string;
  source: string;
  title: string;
  category: string;
  chunk: string;
  similarity: number;
}

export interface Message {
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

export interface CopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBookChat: () => void;
  onNavigate: (path: string) => void;
  initialPrompt?: string;
}

const STARTER_PROMPTS = [
  "What was Deepak's impact at ReshaMandi?",
  "Why choose RAG over fine-tuning for this site?",
  "How did the Sportstech AI Coach handle latency?",
  "Explain Deepak's first operating principle",
  "What's actually changing for PMs with AI?",
  "Is 'AI-native PM' more than a buzzword?",
];

export default function CopilotDrawer({
  isOpen,
  onClose,
  onOpenBookChat,
  onNavigate,
  initialPrompt,
}: CopilotDrawerProps) {
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [selectedChunk, setSelectedChunk] = useState<RetrievedChunk | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasInteractedRef = useRef<boolean>(false);
  const initialPromptHandledRef = useRef<string | null>(null);

  // Keyboard navigation & visual viewport handling on mobile
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        if (selectedChunk) {
          setSelectedChunk(null);
        } else if (isHowItWorksOpen) {
          setIsHowItWorksOpen(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedChunk, isHowItWorksOpen, onClose]);

  // Focus input when drawer opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Mobile virtual keyboard viewport adaptation
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

  // Auto-scroll after a real interaction
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

      const cleanAnswer = (data.answer || "")
        .replace(
          /^(?:hello!?|hi!?|greetings!?|hey!?)\s*(?:i am|i'm|this is)?\s*(?:dīpa|dipa)?(?:,?\s*deepak(?:'s)?\s*ai\s*assistant)?[.!,:]*\s*/i,
          ""
        )
        .trim();

      const copilotMessage: Message = {
        id: "copilot-" + Date.now(),
        sender: "copilot",
        text: cleanAnswer || data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        fallback: data.fallback,
        retrievedChunks: data.retrievedChunks,
        topSimilarity: data.topSimilarity,
        retrievalTimeMs: data.retrievalTimeMs,
        totalTimeMs: data.totalTimeMs,
      };

      setMessages((prev) => [...prev, copilotMessage]);
    } catch {
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

  // Handle initial prompt if triggered from outside
  useEffect(() => {
    if (initialPrompt && initialPrompt !== initialPromptHandledRef.current) {
      initialPromptHandledRef.current = initialPrompt;
      handleSend(initialPrompt);
    }
  }, [initialPrompt]);

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

  if (!isOpen) return null;

  return (
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
            background:
              "radial-gradient(circle, rgba(1, 188, 124, 0.16) 0%, rgba(1, 188, 124, 0) 70%)",
            filter: "blur(32px)",
          }}
        />
        <div
          className="ambient-drift-2 absolute -bottom-16 -left-16 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(24, 142, 57, 0.14) 0%, rgba(24, 142, 57, 0) 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Header (z-10) — unified continuous glass surface */}
      <div
        className="relative z-10 px-4 py-3 flex items-center justify-between shrink-0"
        style={{
          borderBottom: "1px solid color-mix(in oklch, #042718 8%, transparent)",
          backgroundColor: "transparent",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <DipaAvatar />
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#188E39] border-2 border-white ring-1 ring-[#188E39]/30"
              title="Online & Ready"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-onest font-semibold text-sm text-[#042718] tracking-tight">
                Dīpa
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium tracking-tight bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                RAG v1.2
              </span>
            </div>
            <p className="font-inter text-[11px] text-[#042718]/65 font-normal leading-tight">
              Ask about Deepak&apos;s metrics, case studies, work
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsHowItWorksOpen((prev) => !prev)}
            title="How Dīpa's architecture works"
            className="p-1.5 rounded-lg text-[#042718]/60 hover:text-[#042718] hover:bg-white/40 transition-colors cursor-pointer"
            aria-label="Toggle architecture view"
          >
            <Info size={15} />
          </button>
          <button
            onClick={handleResetChat}
            title="Reset conversation"
            className="p-1.5 rounded-lg text-[#042718]/60 hover:text-[#042718] hover:bg-white/40 transition-colors cursor-pointer"
            aria-label="Reset conversation"
          >
            <RotateCcw size={15} />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#042718]/60 hover:text-[#042718] hover:bg-white/40 transition-colors cursor-pointer"
            aria-label="Close Dīpa"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* How it Works architectural explainer popover */}
      {isHowItWorksOpen && (
        <div
          className="relative z-20 px-4 py-3 text-xs leading-relaxed shrink-0 max-h-48 overflow-y-auto"
          style={{
            background: "color-mix(in oklch, #FAFDFB 88%, transparent)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid color-mix(in oklch, #042718 10%, transparent)",
          }}
        >
          <div className="flex items-start justify-between mb-1.5">
            <span className="font-onest font-bold text-xs uppercase tracking-wider text-[#065F46] flex items-center gap-1.5">
              <Cpu size={13} /> Architecture: Production RAG Pipeline
            </span>
            <button
              onClick={() => setIsHowItWorksOpen(false)}
              className="text-[#042718]/50 hover:text-[#042718] text-xs font-mono"
            >
              Close
            </button>
          </div>
          <p className="text-[#042718]/80 mb-2">
            Rather than relying on model pretraining, Dīpa indexes 45 curated chunks from
            Deepak&apos;s case studies, resume, and product notes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[10px] text-[#042718]/80">
            <div className="p-2 rounded-lg bg-white/60 border border-[#042718]/5">
              <div className="font-bold text-[#065F46] mb-0.5">1. Embeddings</div>
              text-embedding-004 vector space with cosine distance matching.
            </div>
            <div className="p-2 rounded-lg bg-white/60 border border-[#042718]/5">
              <div className="font-bold text-[#065F46] mb-0.5">2. Retrieval</div>
              Top-K ranked chunks filtered above a strict 0.40 similarity gate.
            </div>
            <div className="p-2 rounded-lg bg-white/60 border border-[#042718]/5">
              <div className="font-bold text-[#065F46] mb-0.5">3. Grounding</div>
              Gemini 2.5 Flash synthesized with citations directly to source case studies.
            </div>
          </div>
        </div>
      )}

      {/* Messages Thread (z-10) */}
      <div
        ref={messagesContainerRef}
        className="relative z-10 flex-1 overflow-y-auto px-4 py-3 space-y-3.5 scroll-smooth"
        style={{
          scrollBehavior: "smooth",
        }}
      >
        {messages.map((msg, index) => {
          const isUser = msg.sender === "user";
          const isLastMessage = index === messages.length - 1;
          return (
            <div
              key={msg.id}
              ref={isLastMessage ? lastMessageRef : null}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
            >
              <div
                className={`flex items-start gap-2.5 w-full ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!isUser && <DipaAvatar className="mt-0.5" />}
                <div
                  className={`rounded-2xl px-3.5 py-2.5 transition-all duration-200 ${
                    isUser
                      ? "bg-[#042718] text-white shadow-xs max-w-[88%]"
                      : "text-[#042718] shadow-xs max-w-[84%] sm:max-w-[88%]"
                  }`}
                  style={
                    !isUser
                      ? {
                          background: "color-mix(in oklch, #FAFDFB 78%, transparent)",
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                          border: "1px solid color-mix(in oklch, #042718 10%, transparent)",
                        }
                      : undefined
                  }
                >
                  <div className="break-words">{formatText(msg.text, isUser)}</div>

                  {/* Retrieved chunks / citations drawer */}
                  {!isUser && msg.retrievedChunks && msg.retrievedChunks.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-[#042718]/8">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#065F46] font-semibold flex items-center gap-1">
                          <Database size={11} /> Grounded in {msg.retrievedChunks.length} Source
                          {msg.retrievedChunks.length > 1 ? "s" : ""}
                        </span>
                        {msg.topSimilarity && (
                          <span className="text-[10px] font-mono text-[#042718]/50">
                            Match: {Math.round(msg.topSimilarity * 100)}%
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.retrievedChunks.map((chunk) => (
                          <button
                            key={chunk.id}
                            onClick={() => setSelectedChunk(chunk)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#065F46] border border-[#A7F3D0] transition-colors cursor-pointer"
                          >
                            <BookOpen size={10} />
                            <span className="truncate max-w-[130px]">{chunk.title}</span>
                            <span className="text-[9px] font-mono opacity-60">
                              {Math.round(chunk.similarity * 100)}%
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Timestamp & metrics */}
              <div
                className={`flex items-center gap-2 mt-1 px-1 text-[10px] text-[#042718]/45 font-mono ${
                  isUser ? "flex-row-reverse" : "flex-row ml-[42px]"
                }`}
              >
                <span>{msg.timestamp}</span>
                {!isUser && msg.totalTimeMs && (
                  <span>· {msg.totalTimeMs}ms (RAG)</span>
                )}
                {!isUser && msg.fallback && (
                  <span className="inline-flex items-center gap-0.5 text-amber-700">
                    <AlertTriangle size={10} /> General Knowledge
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex items-start gap-2.5">
            <DipaAvatar className="mt-0.5" />
            <div
              className="rounded-2xl px-4 py-3 flex items-center gap-2 text-xs text-[#042718]/70"
              style={{
                background: "color-mix(in oklch, #FAFDFB 78%, transparent)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid color-mix(in oklch, #042718 10%, transparent)",
              }}
            >
              <div className="flex items-center gap-1.5">
                <span className="copilot-dot-pulse-1 w-2 h-2 rounded-full bg-[#188E39]" />
                <span className="copilot-dot-pulse-2 w-2 h-2 rounded-full bg-[#188E39]" />
                <span className="copilot-dot-pulse-3 w-2 h-2 rounded-full bg-[#188E39]" />
              </div>
              <span className="font-mono text-[11px] ml-1 text-[#042718]/70">
                Searching vector index & synthesizing...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Selected Chunk detail modal popover */}
      {selectedChunk && (
        <div
          className="relative z-30 px-4 py-3 text-xs leading-relaxed shrink-0 max-h-56 overflow-y-auto"
          style={{
            background: "color-mix(in oklch, #FAFDFB 92%, transparent)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderTop: "1px solid color-mix(in oklch, #042718 12%, transparent)",
          }}
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#065F46] font-bold">
                Retrieved Vector Source
              </span>
              <h4 className="font-onest font-bold text-xs text-[#042718]">
                {selectedChunk.title}
              </h4>
            </div>
            <button
              onClick={() => setSelectedChunk(null)}
              className="p-1 rounded text-[#042718]/50 hover:text-[#042718]"
              aria-label="Close source view"
            >
              <X size={14} />
            </button>
          </div>
          <div className="p-2.5 rounded-lg bg-white/70 border border-[#042718]/10 text-[11px] font-mono text-[#042718]/85 whitespace-pre-wrap leading-relaxed max-h-28 overflow-y-auto mb-2">
            {selectedChunk.chunk}
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-[#042718]/60">
            <span>Score: {Math.round(selectedChunk.similarity * 100)}% Match</span>
            <button
              onClick={() => {
                if (selectedChunk.source.includes("reshandi") || selectedChunk.source.includes("reshamandi")) {
                  onNavigate("/work/reshamandi-b2b-ecosystem");
                  onClose();
                } else if (selectedChunk.source.includes("sportstech")) {
                  onNavigate("/work/sportstech-ai-coach");
                  onClose();
                } else {
                  onNavigate("/work");
                  onClose();
                }
              }}
              className="inline-flex items-center gap-1 text-[#188E39] hover:underline font-bold"
            >
              Open Full Case Study <ArrowRight size={10} />
            </button>
          </div>
        </div>
      )}

      {/* Starter Prompts pills — visible only when conversation is short */}
      {messages.length <= 2 && !isLoading && (
        <div
          className="relative z-10 px-4 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0"
          style={{
            backgroundColor: "transparent",
            borderTop: "1px solid color-mix(in oklch, #042718 6%, transparent)",
          }}
        >
          {STARTER_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="whitespace-nowrap px-2.5 py-1 rounded-full text-xs font-medium text-[#042718]/75 bg-white/60 hover:bg-white hover:text-[#042718] border border-[#042718]/10 transition-colors shrink-0 shadow-2xs cursor-pointer"
            >
              {prompt}
            </button>
          ))}
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
  );
}
