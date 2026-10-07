import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  X,
  Cpu,
  Database,
  AlertTriangle,
  ArrowRight,
  Info,
  RotateCcw,
  BookOpen,
  Mic,
  Volume2,
  Pause,
  Globe,
  Loader2,
  Square,
} from "lucide-react";
import { DipaAvatar } from "./DipaAvatar";
import {
  VOICE_LANGUAGES,
  VoiceLanguageCode,
  parseVoiceError,
  speechToText,
  translateText,
  textToSpeech,
} from "../services/voiceProxy";

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
  sender: "user" | "copilot" | "system";
  text: string;
  timestamp: string;
  fallback?: boolean;
  retrievedChunks?: RetrievedChunk[];
  topSimilarity?: number;
  retrievalTimeMs?: number;
  totalTimeMs?: number;
  originalEnglishText?: string;
  language?: VoiceLanguageCode;
  hasVoiceAudio?: boolean;
  isVoice?: boolean;
  isSystemNotice?: boolean;
}

export interface CopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBookChat: () => void;
  onNavigate: (path: string) => void;
  initialPrompt?: string;
}

const STARTER_PROMPTS = [
  "Take me to the subscription story",
  "Show me how Deepak approaches AI",
  "Tell me about the ReshaMandi work",
  "How does Deepak make product decisions?",
  "What was Deepak's impact at Sportstech?",
  "What trade-offs did Deepak make in 0→1 builds?",
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

  // Voice mode state
  const [selectedLanguage, setSelectedLanguage] = useState<VoiceLanguageCode>(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("dipa_voice_lang");
      if (stored && VOICE_LANGUAGES.some((l) => l.code === stored)) {
        return stored as VoiceLanguageCode;
      }
    }
    return "en";
  });
  const [isVoiceResting, setIsVoiceResting] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("dipa_voice_resting") === "true";
    }
    return false;
  });
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingCountdown, setRecordingCountdown] = useState(29);
  const [voiceStatus, setVoiceStatus] = useState<
    "Listening…" | "Transcribing…" | "Thinking…" | "Preparing voice…" | null
  >(null);
  const [playingAudioMsgId, setPlayingAudioMsgId] = useState<string | null>(null);
  const [audioLoadingMsgId, setAudioLoadingMsgId] = useState<string | null>(null);
  const [shownOriginalTextMap, setShownOriginalTextMap] = useState<Record<string, boolean>>({});

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const countdownIntervalRef = useRef<any>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const activeAudioElement = useRef<HTMLAudioElement | null>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "copilot",
      text: "Hi, I'm Dīpa, your conductor. I know Deepak's work, decisions, and lessons across every case study on this route. What are you curious about?",
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

  // Click outside listener for language menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    if (isLangMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLangMenuOpen]);

  // Drawer close & unmount cleanup
  useEffect(() => {
    if (!isOpen) {
      if (activeAudioElement.current) {
        activeAudioElement.current.pause();
        activeAudioElement.current = null;
        setPlayingAudioMsgId(null);
      }
      if (isRecording) {
        stopRecording();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
      if (activeAudioElement.current) {
        activeAudioElement.current.pause();
      }
    };
  }, []);

  const stopRecording = () => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      audioStreamRef.current = null;
    }
    setIsRecording(false);
    setRecordingCountdown(29);
  };

  const startRecording = async () => {
    if (isVoiceResting || isLoading) return;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      const err = parseVoiceError("upstream_unreachable");
      setMessages((prev) => [
        ...prev,
        {
          id: "voice-notice-" + Date.now(),
          sender: "system",
          text: err.friendlyMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isSystemNotice: true,
        },
      ]);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;

      const preferredTypes = [
        "audio/webm;codecs=opus",
        "audio/webm",
        "audio/mp4",
      ];
      let selectedMime = "";
      for (const t of preferredTypes) {
        if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(t)) {
          selectedMime = t;
          break;
        }
      }

      const recorder = selectedMime
        ? new MediaRecorder(stream, { mimeType: selectedMime })
        : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        if (stream) {
          stream.getTracks().forEach((t) => t.stop());
        }
        audioStreamRef.current = null;
        if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current);
          countdownIntervalRef.current = null;
        }
        setIsRecording(false);
        setRecordingCountdown(29);

        const recordedBlob = new Blob(audioChunksRef.current, {
          type: selectedMime || "audio/webm",
        });
        handleVoiceUploadAndQuery(recordedBlob);
      };

      recorder.start(250);
      setIsRecording(true);
      setRecordingCountdown(29);
      setVoiceStatus("Listening…");

      let currentSec = 29;
      countdownIntervalRef.current = setInterval(() => {
        currentSec -= 1;
        if (currentSec <= 0) {
          stopRecording();
        } else {
          setRecordingCountdown(currentSec);
        }
      }, 1000);
    } catch {
      const err = parseVoiceError("upstream_unreachable");
      setMessages((prev) => [
        ...prev,
        {
          id: "voice-notice-" + Date.now(),
          sender: "system",
          text: err.friendlyMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isSystemNotice: true,
        },
      ]);
      setIsRecording(false);
      setVoiceStatus(null);
    }
  };

  const handleMicToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleVoiceUploadAndQuery = async (audioBlob: Blob) => {
    if (audioBlob.size > 2 * 1024 * 1024) {
      const err = parseVoiceError("audio_too_large");
      setMessages((prev) => [
        ...prev,
        {
          id: "voice-notice-" + Date.now(),
          sender: "system",
          text: err.friendlyMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isSystemNotice: true,
        },
      ]);
      setVoiceStatus(null);
      return;
    }

    hasInteractedRef.current = true;
    setIsLoading(true);

    try {
      // 1. Speech to Text via Sarvam proxy
      setVoiceStatus("Transcribing…");
      const sttRes = await speechToText(audioBlob, selectedLanguage);
      const transcript = (sttRes.transcript || "").trim();

      if (!transcript) {
        const err = parseVoiceError("upstream_rejected_input");
        setMessages((prev) => [
          ...prev,
          {
            id: "voice-notice-" + Date.now(),
            sender: "system",
            text: err.friendlyMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isSystemNotice: true,
          },
        ]);
        return;
      }

      // Display visitor message in their selected language
      const userMessage: Message = {
        id: "user-" + Date.now(),
        sender: "user",
        text: transcript,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        language: selectedLanguage,
        isVoice: true,
      };
      setMessages((prev) => [...prev, userMessage]);

      // 2. Translate to English if needed
      let englishQuery = transcript;
      if (selectedLanguage !== "en") {
        setVoiceStatus("Thinking…");
        const transRes = await translateText(transcript, selectedLanguage, "en");
        englishQuery = transRes.translation;
      }

      // 3. Query RAG in concise voice mode (<= 3 sentences, ~500 chars)
      setVoiceStatus("Thinking…");
      const queryRes = await fetch("/api/copilot/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: englishQuery, isVoiceMode: true }),
      });

      if (!queryRes.ok) {
        throw new Error(`Server returned status ${queryRes.status}`);
      }

      const ragData = await queryRes.json();
      const rawAnswer = ragData.answer || "";
      const cleanAnswer = rawAnswer
        .replace(
          /^(?:hello!?|hi!?|greetings!?|hey!?)\s*(?:i am|i'm|this is)?\s*(?:dīpa|dipa)?(?:,?\s*deepak(?:'s)?\s*ai\s*assistant)?[.!,:]*\s*/i,
          ""
        )
        .trim();
      const englishAnswer = cleanAnswer || rawAnswer;

      // 4. Translate back to selected language if needed (male speaker gender)
      let finalDisplayAnswer = englishAnswer;
      if (selectedLanguage !== "en") {
        setVoiceStatus("Preparing voice…");
        const backTransRes = await translateText(
          englishAnswer,
          "en",
          selectedLanguage,
          "male"
        );
        finalDisplayAnswer = backTransRes.translation;
      }

      const copilotMessage: Message = {
        id: "copilot-" + Date.now(),
        sender: "copilot",
        text: finalDisplayAnswer,
        originalEnglishText: selectedLanguage !== "en" ? englishAnswer : undefined,
        language: selectedLanguage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        fallback: ragData.fallback,
        retrievedChunks: ragData.retrievedChunks,
        topSimilarity: ragData.topSimilarity,
        retrievalTimeMs: ragData.retrievalTimeMs,
        totalTimeMs: ragData.totalTimeMs,
        hasVoiceAudio: true,
      };

      setMessages((prev) => [...prev, copilotMessage]);
    } catch (err: any) {
      const voiceErr = parseVoiceError(err?.code || err?.message);
      if (voiceErr.isResting) {
        sessionStorage.setItem("dipa_voice_resting", "true");
        setIsVoiceResting(true);
      }
      setMessages((prev) => [
        ...prev,
        {
          id: "voice-notice-" + Date.now(),
          sender: "system",
          text: voiceErr.friendlyMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isSystemNotice: true,
        },
      ]);
    } finally {
      setVoiceStatus(null);
      setIsLoading(false);
    }
  };

  const handlePlayAudio = async (msg: Message) => {
    if (isVoiceResting) return;

    if (playingAudioMsgId === msg.id) {
      if (activeAudioElement.current) {
        activeAudioElement.current.pause();
        activeAudioElement.current = null;
      }
      setPlayingAudioMsgId(null);
      return;
    }

    if (activeAudioElement.current) {
      activeAudioElement.current.pause();
      activeAudioElement.current = null;
      setPlayingAudioMsgId(null);
    }

    const isEnglishShown = Boolean(shownOriginalTextMap[msg.id]);
    const textToSpeak = isEnglishShown && msg.originalEnglishText ? msg.originalEnglishText : msg.text;
    const langToSpeak: VoiceLanguageCode = isEnglishShown ? "en" : (msg.language || selectedLanguage);

    setAudioLoadingMsgId(msg.id);

    try {
      const audioBlob = await textToSpeech(textToSpeak, langToSpeak);
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      activeAudioElement.current = audio;

      audio.onended = () => {
        setPlayingAudioMsgId(null);
        activeAudioElement.current = null;
        URL.revokeObjectURL(audioUrl);
      };

      audio.onerror = () => {
        setPlayingAudioMsgId(null);
        activeAudioElement.current = null;
        URL.revokeObjectURL(audioUrl);
      };

      setPlayingAudioMsgId(msg.id);
      await audio.play();
    } catch (err: any) {
      const voiceErr = parseVoiceError(err?.code || err?.message);
      if (voiceErr.isResting) {
        sessionStorage.setItem("dipa_voice_resting", "true");
        setIsVoiceResting(true);
      }
      setMessages((prev) => [
        ...prev,
        {
          id: "voice-notice-" + Date.now(),
          sender: "system",
          text: voiceErr.friendlyMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isSystemNotice: true,
        },
      ]);
    } finally {
      setAudioLoadingMsgId(null);
    }
  };

  const toggleShowOriginal = (msgId: string) => {
    setShownOriginalTextMap((prev) => ({
      ...prev,
      [msgId]: !prev[msgId],
    }));
  };

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

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 45000);

    try {
      const fetchPromise = (async () => {
        const res = await fetch("/api/copilot/query", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: textToSend }),
          signal: controller.signal,
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
      clearTimeout(timeoutId);
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
              isUser ? "text-white" : "text-[#121517]/90"
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
            isUser ? "text-white font-medium" : "text-[#121517]/90"
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
              isUser ? "text-white" : "text-[#121517]"
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
      className="fixed bottom-4 sm:bottom-[104px] right-4 sm:right-5 left-4 sm:left-auto z-50 w-auto sm:w-[460px] h-[calc(100dvh-32px)] sm:h-[620px] max-h-[calc(100dvh-32px)] sm:max-h-[calc(100dvh-128px)] flex flex-col rounded-[24px] overflow-hidden font-inter transition-[opacity,transform] duration-300"
      style={{
        background: "color-mix(in oklch, #FAF8F5 55%, transparent)",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        border: "1px solid color-mix(in oklch, #121517 12%, transparent)",
        boxShadow:
          "0 16px 32px -16px rgba(18,21,23,.24), 0 4px 10px -4px rgba(18,21,23,.12)",
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
              "radial-gradient(circle, rgba(200, 155, 60, 0.14) 0%, rgba(200, 155, 60, 0) 70%)",
            filter: "blur(32px)",
          }}
        />
        <div
          className="ambient-drift-2 absolute -bottom-16 -left-16 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(229, 193, 108, 0.12) 0%, rgba(229, 193, 108, 0) 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Header (z-10) — unified continuous glass surface */}
      <div
        className="relative z-10 px-4 py-3 flex items-center justify-between shrink-0"
        style={{
          borderBottom: "1px solid color-mix(in oklch, #121517 8%, transparent)",
          backgroundColor: "transparent",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <DipaAvatar />
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#A8711A] border-2 border-white ring-1 ring-[#A8711A]/30"
              title="Online & Ready"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-onest font-semibold text-sm text-[#121517] tracking-tight">
                Dīpa
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium tracking-tight bg-[#C89B3C]/10 text-[#A8711A] border border-[#C89B3C]/30">
                Conductor · RAG v1.2
              </span>
            </div>
            <p className="font-inter text-[11px] text-[#121517]/65 font-normal leading-tight">
              Ask Dīpa about any project and she&apos;ll point you to the evidence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsHowItWorksOpen((prev) => !prev)}
            title="How Dīpa's architecture works"
            className="p-1.5 rounded-lg text-[#121517]/60 hover:text-[#121517] hover:bg-white/40 transition-colors cursor-pointer"
            aria-label="Toggle architecture view"
          >
            <Info size={15} />
          </button>
          <button
            onClick={handleResetChat}
            title="Reset conversation"
            className="p-1.5 rounded-lg text-[#121517]/60 hover:text-[#121517] hover:bg-white/40 transition-colors cursor-pointer"
            aria-label="Reset conversation"
          >
            <RotateCcw size={15} />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#121517]/60 hover:text-[#121517] hover:bg-white/40 transition-colors cursor-pointer"
            aria-label="Close Dīpa"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* How it Works architectural explainer popover */}
      {isHowItWorksOpen && (
        <div
          className="relative z-20 px-4 py-3 text-xs leading-relaxed shrink-0 max-h-52 overflow-y-auto"
          style={{
            background: "color-mix(in oklch, #FAF8F5 88%, transparent)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid color-mix(in oklch, #121517 10%, transparent)",
          }}
        >
          <div className="flex items-start justify-between mb-1.5">
            <span className="font-onest font-bold text-xs uppercase tracking-wider text-[#A8711A] flex items-center gap-1.5">
              <Cpu size={13} /> Architecture: Production RAG Pipeline
            </span>
            <button
              onClick={() => setIsHowItWorksOpen(false)}
              className="text-[#121517]/50 hover:text-[#121517] text-xs font-mono"
            >
              Close
            </button>
          </div>
          <p className="text-[#121517]/80 mb-2">
            Dīpa does not scrape the portfolio live. It uses a deterministic build-time synchronization process,
            generating 512-dimensional embeddings stored in the local <code className="font-mono text-[10px] px-1 py-0.5 rounded bg-white/70 border border-[#121517]/10">ragKnowledgeBase.json</code>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[10px] text-[#121517]/80">
            <div className="p-2 rounded-lg bg-white/60 border border-[#121517]/5">
              <div className="font-bold text-[#121517] mb-0.5">1. Embeddings</div>
              gemini-embedding-2-preview (512-dim) generated at build time.
            </div>
            <div className="p-2 rounded-lg bg-white/60 border border-[#121517]/5">
              <div className="font-bold text-[#121517] mb-0.5">2. Retrieval &amp; Gate</div>
              In-memory cosine similarity evaluated against a 0.68 confidence gate.
            </div>
            <div className="p-2 rounded-lg bg-white/60 border border-[#121517]/5">
              <div className="font-bold text-[#121517] mb-0.5">3. Grounding</div>
              gemini-3.1-flash-lite generates grounded answers with source citations.
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
          const isSystem = msg.sender === "system" || Boolean(msg.isSystemNotice);
          const isLastMessage = index === messages.length - 1;

          if (isSystem) {
            return (
              <div
                key={msg.id}
                ref={isLastMessage ? lastMessageRef : null}
                className="flex flex-col items-center justify-center my-1.5 px-3 text-center w-full"
              >
                <div
                  className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full text-xs font-normal leading-relaxed text-[#121517]/60 bg-[#121517]/[0.035] border border-[#121517]/[0.08] max-w-[92%] shadow-2xs"
                  role="status"
                >
                  <span>{msg.text}</span>
                </div>
              </div>
            );
          }

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
                      ? "bg-[#121517] text-white shadow-xs max-w-[88%]"
                      : "text-[#121517] shadow-xs max-w-[84%] sm:max-w-[88%]"
                  }`}
                  style={
                    !isUser
                      ? {
                          background: "color-mix(in oklch, #FAF8F5 78%, transparent)",
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                          border: "1px solid color-mix(in oklch, #121517 10%, transparent)",
                        }
                      : undefined
                  }
                >
                  <div className="break-words">
                    {formatText(
                      !isUser && shownOriginalTextMap[msg.id] && msg.originalEnglishText
                        ? msg.originalEnglishText
                        : msg.text,
                      isUser
                    )}
                  </div>

                  {/* Voice Player & Language Toggle Bar */}
                  {!isUser && !msg.fallback && (
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#121517]/8 flex-wrap">
                      {!isVoiceResting && (
                        <button
                          type="button"
                          onClick={() => handlePlayAudio(msg)}
                          aria-label={
                            playingAudioMsgId === msg.id
                              ? "Pause audio voice response"
                              : audioLoadingMsgId === msg.id
                              ? "Preparing voice response"
                              : `Play voice response in ${
                                  shownOriginalTextMap[msg.id]
                                    ? "English"
                                    : VOICE_LANGUAGES.find((l) => l.code === msg.language)?.nativeName || "voice"
                                }`
                          }
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#C89B3C]/12 hover:bg-[#C89B3C]/20 text-[#A8711A] border border-[#C89B3C]/25 transition-colors cursor-pointer"
                        >
                          {audioLoadingMsgId === msg.id ? (
                            <>
                              <Loader2 size={11} className="animate-spin text-[#A8711A]" />
                              <span className="font-mono text-[10px]">Loading voice…</span>
                            </>
                          ) : playingAudioMsgId === msg.id ? (
                            <>
                              <Pause size={11} className="text-[#A8711A]" />
                              <span className="font-mono text-[10px] font-semibold text-[#A8711A]">Pause</span>
                            </>
                          ) : (
                            <>
                              <Volume2 size={11} className="text-[#A8711A]" />
                              <span className="font-mono text-[10px]">Listen</span>
                            </>
                          )}
                        </button>
                      )}

                      {msg.originalEnglishText && (
                        <button
                          type="button"
                          onClick={() => toggleShowOriginal(msg.id)}
                          aria-label={
                            shownOriginalTextMap[msg.id]
                              ? "Show translated text"
                              : "Show original English text"
                          }
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium text-[#121517]/65 hover:text-[#121517] hover:bg-[#121517]/5 transition-colors cursor-pointer"
                        >
                          {shownOriginalTextMap[msg.id]
                            ? `Show ${VOICE_LANGUAGES.find((l) => l.code === msg.language)?.nativeName || "translation"}`
                            : "Show English"}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Retrieved chunks / citations drawer */}
                  {!isUser && msg.retrievedChunks && msg.retrievedChunks.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-[#121517]/8">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#A8711A] font-semibold flex items-center gap-1">
                          <Database size={11} /> Grounded in {msg.retrievedChunks.length} Source
                          {msg.retrievedChunks.length > 1 ? "s" : ""}
                        </span>
                        {msg.topSimilarity && (
                          <span className="text-[10px] font-mono text-[#121517]/50">
                            Match: {Math.round(msg.topSimilarity * 100)}%
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.retrievedChunks.map((chunk) => (
                          <button
                            key={chunk.id}
                            onClick={() => setSelectedChunk(chunk)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#C89B3C]/10 hover:bg-[#C89B3C]/18 text-[#A8711A] border border-[#C89B3C]/25 transition-colors cursor-pointer"
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
                className={`flex items-center gap-2 mt-1 px-1 text-[10px] text-[#121517]/45 font-mono ${
                  isUser ? "flex-row-reverse" : "flex-row ml-[42px]"
                }`}
              >
                <span>{msg.timestamp}</span>
                {!isUser && (msg.totalTimeMs || msg.retrievalTimeMs) && (
                  <span>
                    · retrieval:{" "}
                    {typeof msg.retrievalTimeMs === "number"
                      ? msg.retrievalTimeMs < 2
                        ? "<2ms"
                        : `${msg.retrievalTimeMs}ms`
                      : "<2ms"}{" "}
                    · gen:{" "}
                    {typeof msg.totalTimeMs === "number" && typeof msg.retrievalTimeMs === "number"
                      ? `${((msg.totalTimeMs - msg.retrievalTimeMs) / 1000).toFixed(1)}s`
                      : typeof msg.totalTimeMs === "number"
                      ? `${(msg.totalTimeMs / 1000).toFixed(1)}s`
                      : "~4–6s"}
                  </span>
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

        {/* Live Status indicator (voice & retrieval) */}
        {(voiceStatus || isLoading) && (
          <div className="flex items-start gap-2.5">
            <DipaAvatar className="mt-0.5" />
            <div
              className="rounded-2xl px-4 py-3 flex items-center gap-2 text-xs text-[#121517]/80"
              style={{
                background: "color-mix(in oklch, #FAF8F5 85%, transparent)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid color-mix(in oklch, #121517 12%, transparent)",
              }}
            >
              {voiceStatus === "Listening…" ? (
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-mono text-[11px] font-bold text-red-600">
                    Listening… ({recordingCountdown}s)
                  </span>
                  <span className="text-[10px] font-mono text-[#121517]/50 hidden sm:inline">
                    · tap mic to finish
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="copilot-dot-pulse-1 w-2 h-2 rounded-full bg-[#A8711A]" />
                    <span className="copilot-dot-pulse-2 w-2 h-2 rounded-full bg-[#A8711A]" />
                    <span className="copilot-dot-pulse-3 w-2 h-2 rounded-full bg-[#A8711A]" />
                  </div>
                  <span className="font-mono text-[11px] ml-1 text-[#121517]/80">
                    {voiceStatus || "Searching vector index & synthesizing..."}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Selected Chunk detail modal popover */}
      {selectedChunk && (
        <div
          className="relative z-30 px-4 py-3 text-xs leading-relaxed shrink-0 max-h-56 overflow-y-auto"
          style={{
            background: "color-mix(in oklch, #FAF8F5 92%, transparent)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderTop: "1px solid color-mix(in oklch, #121517 12%, transparent)",
          }}
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#A8711A] font-bold">
                Retrieved Vector Source
              </span>
              <h4 className="font-onest font-bold text-xs text-[#121517]">
                {selectedChunk.title}
              </h4>
            </div>
            <button
              onClick={() => setSelectedChunk(null)}
              className="p-1 rounded text-[#121517]/50 hover:text-[#121517]"
              aria-label="Close source view"
            >
              <X size={14} />
            </button>
          </div>
          <div className="p-2.5 rounded-lg bg-white/70 border border-[#121517]/10 text-[11px] font-mono text-[#121517]/85 whitespace-pre-wrap leading-relaxed max-h-28 overflow-y-auto mb-2">
            {selectedChunk.chunk}
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-[#121517]/60">
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
              className="inline-flex items-center gap-1 text-[#A8711A] hover:underline font-bold"
            >
              Open Full Case Study <ArrowRight size={10} />
            </button>
          </div>
        </div>
      )}

      {/* Starter Prompts pills — visible only when conversation is short */}
      {messages.filter((m) => m.sender !== "system" && !m.isSystemNotice).length <= 2 && !isLoading && (
        <div
          className="relative z-10 px-4 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0"
          style={{
            backgroundColor: "transparent",
            borderTop: "1px solid color-mix(in oklch, #121517 6%, transparent)",
          }}
        >
          {STARTER_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="whitespace-nowrap px-2.5 py-1 rounded-full text-xs font-medium text-[#121517]/75 bg-white/60 hover:bg-white hover:text-[#121517] border border-[#121517]/10 transition-colors shrink-0 shadow-2xs cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Bar & Voice Controls (z-10) — seamless continuous glass surface */}
      <div
        className="relative z-10 flex flex-col shrink-0"
        style={{
          backgroundColor: "transparent",
        }}
      >
        <div className="p-3 flex items-center gap-2">
          {/* Language Selector Dropdown */}
          <div ref={langMenuRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsLangMenuOpen((prev) => !prev)}
              disabled={isLoading || isRecording}
              aria-haspopup="listbox"
              aria-expanded={isLangMenuOpen}
              aria-label={`Select voice language (currently ${
                VOICE_LANGUAGES.find((l) => l.code === selectedLanguage)?.label || "English"
              })`}
              className="h-[38px] px-2.5 rounded-xl bg-white/70 hover:bg-white text-[#121517] border border-[#121517]/12 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs disabled:opacity-50"
            >
              <Globe size={13} className="text-[#A8711A]" />
              <span className="font-sans font-semibold text-[11px] sm:text-xs">
                {VOICE_LANGUAGES.find((l) => l.code === selectedLanguage)?.nativeName || "English"}
              </span>
            </button>

            {isLangMenuOpen && (
              <div
                role="listbox"
                className="absolute bottom-full mb-1.5 left-0 w-36 py-1 rounded-xl bg-white/95 backdrop-blur-md border border-[#121517]/12 shadow-lg z-50 flex flex-col text-xs overflow-hidden"
              >
                {VOICE_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    role="option"
                    aria-selected={selectedLanguage === lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code);
                      sessionStorage.setItem("dipa_voice_lang", lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`px-3 py-1.5 text-left flex items-center justify-between transition-colors hover:bg-[#C89B3C]/12 cursor-pointer ${
                      selectedLanguage === lang.code
                        ? "text-[#A8711A] font-bold bg-[#C89B3C]/8"
                        : "text-[#121517]/85"
                    }`}
                  >
                    <span>{lang.nativeName}</span>
                    <span className="text-[10px] opacity-60 font-mono">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isRecording
                ? `Listening… (${recordingCountdown}s left)`
                : `Ask Dīpa about Deepak's metrics, case studies, work...`
            }
            disabled={isLoading || isRecording}
            className="flex-1 px-3.5 py-2 rounded-xl focus:outline-none focus:border-[#A8711A] focus:ring-1 focus:ring-[#A8711A] text-xs sm:text-sm text-[#121517] placeholder-[#121517]/40 h-[38px]"
            style={{
              background: "color-mix(in oklch, #FAF8F5 65%, transparent)",
              backdropFilter: "blur(10px) saturate(150%)",
              WebkitBackdropFilter: "blur(10px) saturate(150%)",
              border: "1px solid color-mix(in oklch, #121517 12%, transparent)",
            }}
          />

          {/* Voice Mic Button (hidden/disabled if isVoiceResting) */}
          {!isVoiceResting && (
            <button
              type="button"
              onClick={handleMicToggle}
              disabled={isLoading && !isRecording}
              aria-label={
                isRecording
                  ? `Stop recording (${recordingCountdown} seconds left)`
                  : `Talk to Dīpa in ${
                      VOICE_LANGUAGES.find((l) => l.code === selectedLanguage)?.label || "English"
                    }`
              }
              title={
                isRecording
                  ? `Stop recording (${recordingCountdown}s left)`
                  : `Talk to Dīpa in ${
                      VOICE_LANGUAGES.find((l) => l.code === selectedLanguage)?.label || "English"
                    }`
              }
              className={`h-[38px] px-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                isRecording
                  ? "bg-red-600 hover:bg-red-700 text-white shadow-md animate-pulse ring-2 ring-red-400 ring-offset-1"
                  : "bg-white/70 hover:bg-white text-[#121517]/80 hover:text-[#A8711A] border border-[#121517]/12 shadow-2xs"
              }`}
            >
              {isRecording ? (
                <>
                  <Square size={13} className="fill-current" />
                  <span className="font-mono text-[11px] font-bold">REC {recordingCountdown}s</span>
                </>
              ) : (
                <Mic size={16} />
              )}
            </button>
          )}

          {/* Send Button */}
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading || isRecording}
            className="h-[38px] w-[38px] flex items-center justify-center rounded-xl bg-[#121517] hover:bg-[#A8711A] disabled:bg-[#121517]/20 text-white disabled:text-white/40 transition-colors shrink-0 shadow-xs cursor-pointer disabled:cursor-not-allowed"
            aria-label="Send query to Dīpa"
          >
            <Send size={15} />
          </button>
        </div>

        {/* Small line under the mic: Voice and Indian languages powered by Sarvam AI. */}
        <div className="text-[10px] text-center text-[#121517]/45 pb-2 px-3 font-sans select-none">
          Voice and Indian languages powered by Sarvam AI.
        </div>
      </div>
    </div>
  );
}
