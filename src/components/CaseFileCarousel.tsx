import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  X,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Lock,
} from "lucide-react";
import {
  RESHAMANDI_CASE_STUDY,
  AI_COACH_CASE_STUDY,
  SUBSCRIPTION_CASE_STUDY,
  PERFORMANCE_SCORE_CASE_STUDY,
  AI_LOCALIZATION_CASE_STUDY,
} from "../data/caseStudies";
import { CaseStudyDetail } from "../types";

export interface CaseFileCarouselProps {
  onNavigate: (path: string) => void;
  onSelectCaseStudy: (caseStudy: CaseStudyDetail) => void;
}

interface CaseFileItem {
  caseStudy: CaseStudyDetail;
  number: string;
  spineLabel: string;
  title: string;
  subtitle: string;
  slug: string;
  coverImage?: string;
  category: string;
  proofPoints: string[];
  keyStats?: Array<{ label: string; value: string }>;
  thesis?: string;
}

const CASE_FILE_ITEMS: CaseFileItem[] = [
  {
    caseStudy: RESHAMANDI_CASE_STUDY,
    number: "01",
    spineLabel: "ReshaMandi",
    title: RESHAMANDI_CASE_STUDY.title,
    subtitle: RESHAMANDI_CASE_STUDY.subtitle,
    slug: RESHAMANDI_CASE_STUDY.slug,
    coverImage: "/images/reshamandi-lifecycle.jpg",
    category: RESHAMANDI_CASE_STUDY.category,
    proofPoints: RESHAMANDI_CASE_STUDY.proofPoints,
    keyStats: RESHAMANDI_CASE_STUDY.keyStats?.slice(0, 3),
    thesis: RESHAMANDI_CASE_STUDY.thesis,
  },
  {
    caseStudy: AI_COACH_CASE_STUDY,
    number: "02",
    spineLabel: "AI Coach",
    title: AI_COACH_CASE_STUDY.title,
    subtitle: AI_COACH_CASE_STUDY.subtitle,
    slug: AI_COACH_CASE_STUDY.slug,
    coverImage: "/images/ai-coach-hero.jpg",
    category: AI_COACH_CASE_STUDY.category,
    proofPoints: AI_COACH_CASE_STUDY.proofPoints,
    keyStats: AI_COACH_CASE_STUDY.keyStats?.slice(0, 3),
    thesis: AI_COACH_CASE_STUDY.thesis,
  },
  {
    caseStudy: SUBSCRIPTION_CASE_STUDY,
    number: "03",
    spineLabel: "Subscription",
    title: SUBSCRIPTION_CASE_STUDY.title,
    subtitle: SUBSCRIPTION_CASE_STUDY.subtitle,
    slug: SUBSCRIPTION_CASE_STUDY.slug,
    coverImage: "/images/subscription-hero.jpg",
    category: SUBSCRIPTION_CASE_STUDY.category,
    proofPoints: SUBSCRIPTION_CASE_STUDY.proofPoints,
    keyStats: SUBSCRIPTION_CASE_STUDY.keyStats?.slice(0, 3),
    thesis: SUBSCRIPTION_CASE_STUDY.thesis,
  },
  {
    caseStudy: PERFORMANCE_SCORE_CASE_STUDY,
    number: "04",
    spineLabel: "Performance Score",
    title: PERFORMANCE_SCORE_CASE_STUDY.title,
    subtitle: PERFORMANCE_SCORE_CASE_STUDY.subtitle,
    slug: PERFORMANCE_SCORE_CASE_STUDY.slug,
    coverImage: "/images/performance-score-hero.jpg",
    category: PERFORMANCE_SCORE_CASE_STUDY.category,
    proofPoints: PERFORMANCE_SCORE_CASE_STUDY.proofPoints,
    keyStats: [
      { label: "Architecture", value: "P0 Strategy" },
      { label: "Ecosystem Platforms", value: "5 Surface Types" },
      { label: "Sensor Gating", value: "0 Hardware Gating" },
    ],
    thesis: PERFORMANCE_SCORE_CASE_STUDY.thesis,
  },
  {
    caseStudy: AI_LOCALIZATION_CASE_STUDY,
    number: "05",
    spineLabel: "AI Localization",
    title: AI_LOCALIZATION_CASE_STUDY.title,
    subtitle: AI_LOCALIZATION_CASE_STUDY.subtitle,
    slug: AI_LOCALIZATION_CASE_STUDY.slug,
    coverImage: "/images/ai-localization-hero.jpg",
    category: AI_LOCALIZATION_CASE_STUDY.category,
    proofPoints: AI_LOCALIZATION_CASE_STUDY.proofPoints,
    keyStats: AI_LOCALIZATION_CASE_STUDY.keyStats?.slice(0, 3),
    thesis: AI_LOCALIZATION_CASE_STUDY.thesis,
  },
];

const getCoverSources = (imagePath: string) => {
  const base = imagePath.replace(/\.(jpg|jpeg|png|webp)$/i, "");
  return {
    webpSrcSet: `${base}-480.webp 480w, ${base}.webp 800w`,
    jpgSrcSet: `${base}-480.jpg 480w, ${imagePath} 800w`,
    fallback: imagePath,
  };
};

const FoilEdge = () => (
  <>
    <div
      className="absolute top-0 left-0 right-0 h-[2px] z-20 pointer-events-none"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(201,162,75,0.85), transparent)",
      }}
      aria-hidden="true"
    />
    <div
      className="absolute inset-0 rounded-xl pointer-events-none z-20"
      style={{
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 0 1px rgba(201,162,75,0.16)",
      }}
      aria-hidden="true"
    />
  </>
);

/**
 * Shared gradient overlay for cover photos on both closed card faces and the opened dossier view.
 * 3-stop formula: subtle top shadow for pills/tags, transparent mid-zone preserving photo depth,
 * and deep rich green base for crisp typography and thesis legibility.
 */
const COVER_PHOTO_GRADIENT_OVERLAY =
  "linear-gradient(to bottom, rgba(4,39,24,0.55) 0%, rgba(4,39,24,0.2) 40%, rgba(4,39,24,0.92) 100%)";

export const CaseFileCarousel: React.FC<CaseFileCarouselProps> = ({
  onNavigate,
  onSelectCaseStudy,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);

  // Animation values stored in refs for the 60fps rAF loop
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const isIntersectingRef = useRef<boolean>(true);
  const prefersReducedMotionRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  // Drag & wheel interaction tracking
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartYRef = useRef<number>(0);
  const dragStartProgressRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive stage width configuration
  const [stageWidth, setStageWidth] = useState<number>(1100);

  // Helper to compute circular shortest offset of card `idx` relative to continuous `progress`
  const getCircularOffset = useCallback((idx: number, progress: number, n = 5): number => {
    const normProgress = ((progress % n) + n) % n;
    let diff = idx - normProgress;
    while (diff > n / 2) diff -= n;
    while (diff < -n / 2) diff += n;
    return diff;
  }, []);

  // Update DOM transform styles with mathematically exact container-centering and circular infinite loop
  const applyTransforms = useCallback(
    (progress: number) => {
      const container = containerRef.current;
      const containerWidth = container ? container.clientWidth : stageWidth;
      const isMobile = containerWidth < 640;
      const isTablet = containerWidth < 1024;
      const cardWidth = isMobile ? 220 : 260;
      const cardHeight = isMobile ? 340 : 390;
      const spacing = isMobile ? 120 : isTablet ? 160 : 190;

      // Base left coordinate that places any card with offset 0 in the exact horizontal middle of the container
      const baseLeft = (containerWidth - cardWidth) / 2;
      const n = CASE_FILE_ITEMS.length;

      CASE_FILE_ITEMS.forEach((_, idx) => {
        const el = cardRefs.current[idx];
        if (!el) return;

        const offset = getCircularOffset(idx, progress, n);
        const x = baseLeft + offset * spacing;
        const z = -Math.abs(offset) * 100;

        let rotY = 0;
        if (Math.abs(offset) < 0.15) {
          // Centered active book: slight -14deg turn showing spine + cover together
          rotY = -14;
        } else if (offset > 0) {
          // Cards to the right: tilted inward showing their left spines
          rotY = -24 - Math.min(offset * 6, 18);
        } else {
          // Cards to the left: angled inward
          rotY = 24 + Math.min(Math.abs(offset) * 6, 18);
        }

        const absOffset = Math.abs(offset);
        const scale = Math.max(0.72, 1 - absOffset * 0.08);

        // Active card centered with up to 2 neighbor cards visible on left and right; beyond 2.2 smoothly hidden
        let opacity = 0;
        let visibility: "visible" | "hidden" = "visible";
        if (absOffset <= 2.2) {
          opacity = Math.max(0, 1 - absOffset * 0.28);
          visibility = "visible";
        } else {
          opacity = 0;
          visibility = "hidden";
        }

        const zIndex = Math.round(50 - absOffset * 10);

        el.style.width = `${cardWidth}px`;
        el.style.height = `${cardHeight}px`;
        el.style.left = "0px";
        el.style.top = "50%";
        el.style.transform = `translateX(${x}px) translateY(-50%) translateZ(${z}px) rotateY(${rotY}deg) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.visibility = visibility;
        el.style.zIndex = `${zIndex}`;
        // While a dossier is opened, disable pointer events on background cards so clicks hit backdrop
        el.style.pointerEvents = openedIndex === null && absOffset <= 2.2 ? "auto" : "none";
      });

      // Synchronize activeIndex state with modulo wrapping
      const rounded = Math.round(progress);
      const normalizedActive = ((rounded % n) + n) % n;
      setActiveIndex((prev) => (prev !== normalizedActive ? normalizedActive : prev));
    },
    [openedIndex, stageWidth, getCircularOffset]
  );

  // Measure container's actual clientWidth via ResizeObserver to ensure robust centering on all screen sizes
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setStageWidth(width);
        applyTransforms(currentProgressRef.current);
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(el);

    window.addEventListener("resize", updateDimensions);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, [applyTransforms]);

  // The requestAnimationFrame tick loop
  const tick = useCallback(() => {
    if (!isIntersectingRef.current) {
      rafIdRef.current = null;
      return;
    }

    if (prefersReducedMotionRef.current) {
      const n = CASE_FILE_ITEMS.length;
      const normalized = ((targetProgressRef.current % n) + n) % n;
      currentProgressRef.current = normalized;
      targetProgressRef.current = normalized;
      applyTransforms(currentProgressRef.current);
      rafIdRef.current = null;
      return;
    }

    const diff = targetProgressRef.current - currentProgressRef.current;
    if (Math.abs(diff) > 0.0008) {
      currentProgressRef.current += diff * 0.12;
      applyTransforms(currentProgressRef.current);
      rafIdRef.current = requestAnimationFrame(tick);
    } else {
      currentProgressRef.current = targetProgressRef.current;
      applyTransforms(currentProgressRef.current);
      rafIdRef.current = null;

      // When settled, normalize progress to [0, n) so values never grow unbounded
      const n = CASE_FILE_ITEMS.length;
      const normalized = ((targetProgressRef.current % n) + n) % n;
      currentProgressRef.current = normalized;
      targetProgressRef.current = normalized;
    }
  }, [applyTransforms]);

  const requestTick = useCallback(() => {
    if (rafIdRef.current === null && isIntersectingRef.current) {
      rafIdRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  // Navigate to target case study index (infinite loop supported)
  const goToIndex = useCallback(
    (index: number) => {
      targetProgressRef.current = index;
      requestTick();
    },
    [requestTick]
  );

  const handlePrev = useCallback(() => {
    goToIndex(Math.round(targetProgressRef.current) - 1);
  }, [goToIndex]);

  const handleNext = useCallback(() => {
    goToIndex(Math.round(targetProgressRef.current) + 1);
  }, [goToIndex]);

  // IntersectionObserver to pause the animation loop when scrolled off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          requestTick();
        } else if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [requestTick]);

  // Initial transform render and re-render on openedIndex change
  useEffect(() => {
    applyTransforms(currentProgressRef.current);
  }, [openedIndex, applyTransforms]);

  // Scoped pointer drag and wheel interaction listeners on containerRef only
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - dragStartXRef.current;
      if (Math.abs(deltaX) > 6 || hasDraggedRef.current) {
        hasDraggedRef.current = true;
        const sensitivity = stageWidth < 640 ? 0.005 : 0.0035;
        const newProgress = dragStartProgressRef.current - deltaX * sensitivity;
        targetProgressRef.current = newProgress;
        requestTick();
      }
    };

    const onPointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;

      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);

      if (hasDraggedRef.current) {
        // Snap to nearest integer index
        const nearest = Math.round(targetProgressRef.current);
        goToIndex(nearest);
        setTimeout(() => {
          hasDraggedRef.current = false;
        }, 70);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      // If reading view is open or user clicked an interactive control, do not initiate drag
      if (openedIndex !== null) return;
      if ((e.target as HTMLElement)?.closest("button, a")) return;

      isDraggingRef.current = true;
      hasDraggedRef.current = false;
      dragStartXRef.current = e.clientX;
      dragStartYRef.current = e.clientY;
      dragStartProgressRef.current = targetProgressRef.current;

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);
    };

    // Wheel listener: works with mouse wheel (deltaY) and trackpad (deltaX/deltaY)
    // strictly scoped to containerRef, loops infinitely without clamping
    const onWheel = (e: WheelEvent) => {
      // Allow standard scrolling inside the opened reading dossier
      if (openedIndex !== null) return;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 4) return;

      e.preventDefault();

      const sensitivity = 0.0032;
      targetProgressRef.current = targetProgressRef.current + delta * sensitivity;
      requestTick();

      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
      wheelTimeoutRef.current = setTimeout(() => {
        goToIndex(Math.round(targetProgressRef.current));
      }, 120);
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    };
  }, [stageWidth, goToIndex, requestTick, openedIndex]);

  // Keyboard navigation on container as a secondary path alongside primary mouse interaction
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // If inside an open reading view and user presses Escape, close reading view
    if (e.key === "Escape") {
      if (openedIndex !== null) {
        e.preventDefault();
        setOpenedIndex(null);
      }
      return;
    }

    // Don't intercept if user is typing in an input
    if (
      (e.target as HTMLElement)?.tagName === "INPUT" ||
      (e.target as HTMLElement)?.tagName === "TEXTAREA"
    ) {
      return;
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = Math.round(targetProgressRef.current) - 1;
      goToIndex(prev);
      if (openedIndex !== null) {
        setOpenedIndex((openedIndex - 1 + CASE_FILE_ITEMS.length) % CASE_FILE_ITEMS.length);
      }
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = Math.round(targetProgressRef.current) + 1;
      goToIndex(next);
      if (openedIndex !== null) {
        setOpenedIndex((openedIndex + 1) % CASE_FILE_ITEMS.length);
      }
    } else if (e.key === "Enter" || e.key === " ") {
      if ((e.target as HTMLElement)?.closest("button, a")) return;
      e.preventDefault();
      if (openedIndex === null) {
        setOpenedIndex(activeIndex);
      } else {
        setOpenedIndex(null);
      }
    }
  };

  const handleCardClick = (idx: number) => {
    if (hasDraggedRef.current) return;
    if (openedIndex !== null) return;

    const offset = getCircularOffset(idx, targetProgressRef.current, CASE_FILE_ITEMS.length);
    if (Math.abs(offset) < 0.25) {
      // Centered/active card clicked: open the reading view
      setOpenedIndex(idx);
    } else {
      // Non-centered card clicked: smoothly rotate to center this card
      goToIndex(Math.round(targetProgressRef.current) + offset);
    }
  };

  const currentOpenedItem = openedIndex !== null ? CASE_FILE_ITEMS[openedIndex] : null;

  return (
    <div
      ref={containerRef}
      id="case-file-carousel-container"
      tabIndex={0}
      role="region"
      aria-label="Flagship Case Studies 3D Carousel"
      aria-roledescription="carousel"
      onKeyDown={handleKeyDown}
      className="relative w-full select-none focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#188E39] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAFDFB] py-6 sm:py-10"
      style={{ touchAction: "pan-y" }}
    >
      {/* Soft atmospheric radial gradient centered behind active card fading to 100% transparent at edges — zero hard box boundary */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 50%, rgba(24, 142, 57, 0.04) 0%, rgba(4, 39, 24, 0.012) 45%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* 3D PERSPECTIVE STAGE */}
      <div
        ref={stageRef}
        className="relative w-full h-[460px] sm:h-[500px] flex items-center justify-center overflow-visible"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* CARDS LIST IN 3D SPACE */}
        {CASE_FILE_ITEMS.map((item, idx) => {
          const isCurrentActive = activeIndex === idx;
          const isCurrentOpened = openedIndex === idx;

          return (
            <div
              key={item.slug}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              id={`case-card-${item.slug}`}
              tabIndex={0}
              role="button"
              aria-label={`Case ${item.number}: ${item.spineLabel} — ${item.title}`}
              aria-expanded={isCurrentOpened}
              onClick={() => handleCardClick(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCardClick(idx);
                }
              }}
              className={`absolute top-1/2 left-0 w-[220px] sm:w-[260px] h-[330px] sm:h-[380px] cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#188E39] focus-visible:ring-offset-4 rounded-r-2xl rounded-l-xs ${
                isCurrentOpened ? "cursor-default" : "cursor-pointer"
              }`}
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
              }}
            >
              {/* CLOSED 3D BOOK PRESENTATION */}
              {!isCurrentOpened && (
                <div
                  className="relative w-full h-full rounded-r-2xl rounded-l-xs shadow-[0_20px_45px_rgba(4,39,24,0.16)] transition-[box-shadow,border-color] duration-300 hover:shadow-[0_28px_60px_rgba(4,39,24,0.24)] border border-[#042718]/15 group overflow-visible"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* 3D BOOK SPINE (LEFT FACE, ROTATED -90 DEG IN 3D) */}
                  <div
                    className="absolute top-0 left-0 w-[30px] sm:w-[34px] h-full bg-[#042718] border-r border-[#188E39]/30 flex flex-col justify-between items-center py-4 px-1 rounded-l-xs shadow-inner"
                    style={{
                      transformOrigin: "left center",
                      transform: "rotateY(-90deg)",
                    }}
                    aria-hidden="true"
                  >
                    {/* Spine Top: Status Dot */}
                    <div className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />

                    {/* Spine Middle: Company / Product Name (Vertical orientation) */}
                    <div className="flex-1 flex items-center justify-center my-2 overflow-hidden">
                      <span
                        className="font-onest font-semibold text-[11px] sm:text-xs tracking-wider uppercase text-white/90 whitespace-nowrap select-none"
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                        }}
                      >
                        {item.spineLabel}
                      </span>
                    </div>

                    {/* Spine Bottom: Status Dot */}
                    <div className="w-1.5 h-1.5 rounded-full bg-[#188E39] shadow-xs" />
                  </div>

                  {/* 3D BOOK PAGE EDGES (RIGHT SIDE THICKNESS) */}
                  <div
                    className="absolute top-1 right-0 bottom-1 w-[20px] bg-[#FAFDFB] border-l border-[#042718]/10 rounded-r-xs shadow-inner"
                    style={{
                      transformOrigin: "right center",
                      transform: "rotateY(90deg) translateZ(-10px)",
                      backgroundImage:
                        "repeating-linear-gradient(to bottom, #FAFDFB 0px, #FAFDFB 2px, #E5EFEA 3px)",
                    }}
                    aria-hidden="true"
                  />

                  {/* FRONT COVER (FACE A) */}
                  <div className="absolute inset-0 rounded-r-2xl rounded-l-xs overflow-hidden flex flex-col justify-between p-5 bg-[#042718] text-white">
                    {/* Spine crease shadow simulation */}
                    <div
                      className="absolute inset-y-0 left-0 w-4 pointer-events-none z-20"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)",
                      }}
                      aria-hidden="true"
                    />

                    {/* PATH A: PHOTO COVER (When coverImage exists: 01, 02, 03) */}
                    {item.coverImage ? (
                      <>
                        {/* Background Photo with Responsive WebP/JPG SrcSet */}
                        <picture className="absolute inset-0 w-full h-full">
                          <source
                            type="image/webp"
                            srcSet={getCoverSources(item.coverImage).webpSrcSet}
                            sizes="(max-width: 640px) 240px, 300px"
                          />
                          <source
                            type="image/jpeg"
                            srcSet={getCoverSources(item.coverImage).jpgSrcSet}
                            sizes="(max-width: 640px) 240px, 300px"
                          />
                          <img
                            src={item.coverImage}
                            alt={item.title}
                            loading="lazy"
                            width="260"
                            height="380"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-center brightness-85 group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                        </picture>
                        {/* Dark green overlay for high legibility */}
                        <div
                          className="absolute inset-0 pointer-events-none z-10"
                          style={{
                            background: COVER_PHOTO_GRADIENT_OVERLAY,
                          }}
                          aria-hidden="true"
                        />
                        <FoilEdge />

                        {/* Top Row: Spine Label Pill */}
                        <div className="relative z-20 flex items-center justify-start">
                          <span className="font-inter text-[11px] font-semibold text-white/90 bg-[#042718]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                            {item.spineLabel}
                          </span>
                        </div>

                        {/* Bottom Row: Category, Title & Open Cue */}
                        <div className="relative z-20 flex flex-col gap-1.5 mt-auto">
                          <span className="font-inter text-[10px] font-semibold text-[#34D399] uppercase tracking-wider break-words">
                            {item.category}
                          </span>
                          <h3 className="font-onest font-bold text-white text-sm sm:text-base md:text-lg leading-snug drop-shadow-sm group-hover:text-[#34D399] transition-colors break-words">
                            {item.title}
                          </h3>

                          {isCurrentActive && (
                            <div className="mt-2 flex items-center gap-1.5 text-[11px] font-inter font-medium text-white/80 group-hover:text-white transition-colors">
                              <BookOpen size={12} className="text-[#34D399]" />
                              <span>Open</span>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      /* PATH B: SOLID-COLOR COVER (Performance Score 04 & AI Localization 05) */
                      <div className="relative z-10 w-full h-full flex flex-col justify-between p-1">
                        {/* Elegant subtle geometric foil border */}
                        <FoilEdge />

                        {/* Header: Spine Label */}
                        <div className="flex items-center justify-start">
                          <span className="font-inter text-[11px] font-semibold text-white/80 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                            {item.spineLabel}
                          </span>
                        </div>

                        {/* Center: Title Typeset Directly on Solid Cover */}
                        <div className="my-auto py-3">
                          <span className="font-inter text-[10px] font-semibold text-[#34D399] uppercase tracking-wider block mb-1.5 break-words">
                            {item.category}
                          </span>
                          <h3 className="font-onest font-bold text-white text-base sm:text-lg md:text-xl leading-snug tracking-tight group-hover:text-[#34D399] transition-colors break-words">
                            {item.title}
                          </h3>
                          <p className="font-inter text-xs text-white/65 mt-2 leading-relaxed break-words">
                            {item.subtitle}
                          </p>
                        </div>

                        {/* Bottom: Open Dossier Cue */}
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                          <span className="font-inter text-[10px] text-white/50 uppercase tracking-wider">
                            Verified Strategy
                          </span>
                          {isCurrentActive && (
                            <div className="flex items-center gap-1.5 text-[11px] font-inter font-medium text-[#34D399]">
                              <BookOpen size={12} />
                              <span>Open</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* OPENED READING VIEW: TWO-PAGE EXPANDED DOSSIER SPREAD WITH LIGHTENED BACKDROP */}
        {openedIndex !== null && currentOpenedItem && (
          <div
            className="absolute inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-label={`Case study: ${currentOpenedItem.title}`}
          >
            {/* Fully transparent backdrop allowing outside-click close without any colored tint or wash */}
            <div
              className="absolute inset-0 backdrop-blur-sm cursor-pointer transition-opacity"
              onClick={() => setOpenedIndex(null)}
              aria-label="Close case study"
            />

            <div
              id="case-file-reading-view"
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-[760px] max-h-[95%] bg-white rounded-[24px] border border-[#042718]/15 shadow-[0_32px_80px_rgba(4,39,24,0.35)] overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200"
              style={{
                maxHeight: "490px",
              }}
            >
              {/* LEFT PAGE: CASE BRIEF & DOSSIER OVERVIEW (Full-bleed case photo background) */}
              <div className="w-full md:w-[42%] bg-[#042718] text-white p-6 sm:p-7 flex flex-col relative overflow-hidden shrink-0">
                {/* Full-bleed background photo if available */}
                {currentOpenedItem.coverImage && (
                  <>
                    <picture className="absolute inset-0 w-full h-full">
                      <source
                        type="image/webp"
                        srcSet={getCoverSources(currentOpenedItem.coverImage).webpSrcSet}
                        sizes="(max-width: 768px) 100vw, 360px"
                      />
                      <source
                        type="image/jpeg"
                        srcSet={getCoverSources(currentOpenedItem.coverImage).jpgSrcSet}
                        sizes="(max-width: 768px) 100vw, 360px"
                      />
                      <img
                        src={currentOpenedItem.coverImage}
                        alt={currentOpenedItem.title}
                        width="360"
                        height="490"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center brightness-85"
                      />
                    </picture>
                    {/* Dark green gradient overlay matching closed card face treatment */}
                    <div
                      className="absolute inset-0 pointer-events-none z-10"
                      style={{
                        background: COVER_PHOTO_GRADIENT_OVERLAY,
                      }}
                      aria-hidden="true"
                    />
                  </>
                )}

                {/* Localized scrim behind the header text block only — dark at top fading to transparent by ~40% */}
                <div
                  className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-black/70 via-black/25 to-transparent pointer-events-none z-10"
                  aria-hidden="true"
                />

                <div className="relative z-20">
                  {/* Header: Spine label (CASE numeral badge removed) */}
                  <div className="flex items-center justify-start mb-3">
                    <span className="font-inter text-[11px] font-semibold text-white/90 uppercase tracking-wider drop-shadow-sm">
                      {currentOpenedItem.spineLabel}
                    </span>
                  </div>

                  <span className="font-inter text-xs text-[#34D399] font-semibold uppercase tracking-wider block mb-1.5 drop-shadow-sm">
                    {currentOpenedItem.category}
                  </span>

                  <h3 className="font-onest font-bold text-lg sm:text-xl text-white leading-snug drop-shadow-md">
                    {currentOpenedItem.title}
                  </h3>
                </div>
              </div>

              {/* CENTER GUTTER BINDING LINE */}
              <div
                className="hidden md:block w-px bg-gradient-to-b from-[#042718]/20 via-[#042718]/40 to-[#042718]/20 shrink-0"
                aria-hidden="true"
              />

              {/* RIGHT PAGE: THE READING VIEW */}
              <div className="flex-1 bg-[#FAFDFB] flex flex-col min-h-0">
                {/* Scrollable content — only this part scrolls if it overflows */}
                <div className="p-6 sm:p-8 pb-0 flex-1 min-h-0 overflow-y-auto">
                  {/* Header row with Close button */}
                  <div className="flex items-center justify-between mb-4">
                    <div />

                    {/* Close button */}
                    <button
                      type="button"
                      id="close-case-file-reading-view"
                      onClick={() => setOpenedIndex(null)}
                      className="h-8 w-8 rounded-full bg-white border border-[#042718]/15 hover:bg-[#FAFDFB] text-[#042718] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                      aria-label="Close reading view"
                      title="Close (Esc)"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  {/* THE CASE'S REAL SUBTITLE TEXT */}
                  <div className="mb-5">
                    <p className="font-inter text-sm sm:text-base text-[#042718] leading-relaxed font-medium">
                      {currentOpenedItem.subtitle}
                    </p>
                  </div>

                  {/* Key stats / proof points (Single authoritative place for metrics) */}
                  {currentOpenedItem.keyStats && currentOpenedItem.keyStats.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                      {currentOpenedItem.keyStats.map((stat, sIdx) => (
                        <div
                          key={sIdx}
                          className="bg-white p-2.5 rounded-xl border border-[#042718]/10 shadow-2xs"
                        >
                          <div className="font-onest font-bold text-sm sm:text-base text-[#188E39]">
                            {stat.value}
                          </div>
                          <div className="font-inter text-[10px] text-[#042718]/60 font-medium leading-tight break-words">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action row — pinned, always visible, never requires scrolling */}
                <div className="p-6 sm:p-8 pt-4 shrink-0 border-t border-[#042718]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <span className="font-inter text-xs text-[#042718]/50 hidden sm:inline">
                    Esc to close
                  </span>

                  <button
                    type="button"
                    id={`read-full-case-study-${currentOpenedItem.slug}`}
                    onClick={() => {
                      onSelectCaseStudy(currentOpenedItem.caseStudy);
                      onNavigate(`/work/${currentOpenedItem.slug}`);
                    }}
                    className="px-6 py-3 rounded-full bg-[#042718] hover:bg-[#063b25] text-white font-inter text-sm font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow transition-[background-color,box-shadow] cursor-pointer group"
                  >
                    <span>Read how I built it</span>
                    <ArrowRight
                      size={16}
                      className="text-[#34D399] group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CAROUSEL CONTROLS BAR: CENTERED PREV/NEXT ROUND BUTTONS */}
      <div className="mt-6 flex items-center justify-center gap-3 px-2 sm:px-6">
        {/* Prev button */}
        <button
          type="button"
          id="carousel-prev-btn"
          onClick={handlePrev}
          className="h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white border border-[#042718]/15 hover:bg-[#188E39]/10 hover:border-[#188E39]/40 text-[#042718] transition-colors flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
          aria-label="Previous case study"
          title="Previous case study"
        >
          <ChevronLeft size={20} className="text-[#042718]" />
        </button>

        {/* Next button */}
        <button
          type="button"
          id="carousel-next-btn"
          onClick={handleNext}
          className="h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white border border-[#042718]/15 hover:bg-[#188E39]/10 hover:border-[#188E39]/40 text-[#042718] transition-colors flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
          aria-label="Next case study"
          title="Next case study"
        >
          <ChevronRight size={20} className="text-[#042718]" />
        </button>
      </div>
    </div>
  );
};
