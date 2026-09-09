import React from "react";
import { motion } from "framer-motion";
import {
  Compass,
  Layers,
  Target,
  Radio,
  Zap,
  Users,
  ArrowRight,
} from "lucide-react";
import { CaseStudyDetail } from "../types";
import { ShaderOrb } from "./ShaderOrb";

interface PrincipleItem {
  id: string;
  number: string;
  title: string;
  hook: string;
  body: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
    strokeWidth?: number;
    style?: React.CSSProperties;
  }>;
  iconColor: string;
  group: "left" | "right";
  translateX: string;
  translateY: string;
  rotate: string;
  zIndex: number;
  delayIndex: number;
  className: string;
}

const PRINCIPLES_DATA: PrincipleItem[] = [
  {
    id: "01",
    number: "01",
    title: "Start with the real problem",
    hook: "Field research over dashboards, every time.",
    body: "I've traveled to cocoon collection centres in Ramanagara and Sidlaghatta before writing a single spec. Aggregate analytics don't show you why a buyer walks away mid-negotiation. Being on the floor at 4:30 AM does.",
    icon: Compass,
    iconColor: "#f59e0b",
    group: "left",
    translateX: "0px",
    translateY: "0px",
    rotate: "-3deg",
    zIndex: 1,
    delayIndex: 0,
    className: "principles-card-01",
  },
  {
    id: "02",
    number: "02",
    title: "Make complexity usable",
    hook: "Five disconnected systems, one governed workflow.",
    body: "At ReshaMandi, farmers, buyers, finance, and five separate systems (CRM, SAP, Camunda, Razorpay) ran on fragmented offline processes. I turned that into one connected flow: Scan → Bid → Watch → Win → Pay.",
    icon: Layers,
    iconColor: "#14b8a6",
    group: "left",
    translateX: "0px",
    translateY: "0px",
    rotate: "2deg",
    zIndex: 3,
    delayIndex: 1,
    className: "principles-card-02",
  },
  {
    id: "03",
    number: "03",
    title: "Build toward the smallest useful system",
    hook: "Prove it with 100 users before you scale it to thousands.",
    body: "Before opening the AI Coach to everyone, I shipped it to a 100-user beta first, then ran an A/B test comparing voice input to text-only, to learn what people actually wanted rather than assume it.",
    icon: Target,
    iconColor: "#0ea5e9",
    group: "left",
    translateX: "0px",
    translateY: "0px",
    rotate: "-1.5deg",
    zIndex: 2,
    delayIndex: 2,
    className: "principles-card-03",
  },
  {
    id: "04",
    number: "04",
    title: "Distribution is the real skill",
    hook: "In the AI era, building is easy. Getting seen is the hard part.",
    body: "I designed an AI-assisted content-localisation workflow that took video production from a 3-4 month manual process down to under 3 weeks, shipping the same content across Italian, French, and Spanish markets simultaneously. Building one good version is easy now. The real discipline is making sure it reaches everyone who needs it.",
    icon: Radio,
    iconColor: "#6366f1",
    group: "right",
    translateX: "0px",
    translateY: "0px",
    rotate: "3deg",
    zIndex: 1,
    delayIndex: 3,
    className: "principles-card-04",
  },
  {
    id: "05",
    number: "05",
    title: "Use technology where it creates leverage",
    hook: "Adapt fast, or get left behind.",
    body: "I shipped a conversational AI feature while the underlying models were still maturing, not after they'd become standard. The AI Coach runs on Gemini but falls back to ChatGPT when confidence is low. Waiting for the \"perfect\" model is how you fall behind the competitor who shipped an imperfect one first.",
    icon: Zap,
    iconColor: "#a855f7",
    group: "right",
    translateX: "0px",
    translateY: "0px",
    rotate: "-2deg",
    zIndex: 3,
    delayIndex: 4,
    className: "principles-card-05",
  },
  {
    id: "06",
    number: "06",
    title: "Grow the team, not just the roadmap",
    hook: "You can't build something great alone.",
    body: "I directly managed a 6-person cross-functional pod at Sportstech: three PMs, a growth manager, a content manager. I didn't hand down a roadmap and check it off. I built shared ownership sprint after sprint, until the priorities felt like theirs as much as mine. A roadmap without a team that grows alongside it is just a document.",
    icon: Users,
    iconColor: "#fb7185",
    group: "right",
    translateX: "0px",
    translateY: "0px",
    rotate: "1.5deg",
    zIndex: 2,
    delayIndex: 5,
    className: "principles-card-06",
  },
];

interface OperatingPrinciplesProps {
  onNavigate?: (path: string) => void;
  onSelectCaseStudy?: (caseStudy: CaseStudyDetail) => void;
}

export const OperatingPrinciples: React.FC<OperatingPrinciplesProps> = ({
  onNavigate,
}) => {
  // Render a single principle card
  const renderItem = (
    item: PrincipleItem,
    isMobile = false
  ) => {
    const Icon = item.icon;

    return (
      <motion.div
        key={item.id}
        initial={isMobile ? { opacity: 0, y: 16 } : { opacity: 0 }}
        whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: isMobile ? item.delayIndex * 0.06 : 0.1 }}
        style={
          !isMobile
            ? ({
                "--x": item.translateX,
                "--y": item.translateY,
                "--rot": item.rotate,
                zIndex: item.zIndex,
              } as React.CSSProperties)
            : undefined
        }
        className={
          isMobile
            ? "principle-card w-full max-w-sm flex flex-col"
            : `principle-card card-${item.number} ${item.className} flex flex-col`
        }
      >
        {/* 1. Icon + Title (inline, colored icon glyph) */}
        <div className="flex items-center gap-2 mb-1">
          <Icon
            size={16}
            strokeWidth={2.2}
            style={{ color: item.iconColor }}
            className="shrink-0"
          />
          <h3 className="font-onest font-bold text-[#042619] text-[13.5px] sm:text-[14px] leading-snug tracking-tight">
            {item.title}
          </h3>
        </div>

        {/* 2. Subtitle hook — italic, one short line */}
        <p className="font-inter italic text-[11px] sm:text-[11.5px] text-[#042619]/65 leading-snug mb-1">
          {item.hook}
        </p>

        {/* 3. Body paragraph — full original copy, clear line-height */}
        <p className="font-inter text-[11px] sm:text-[11.5px] text-[#042619]/80 leading-[1.38]">
          {item.body}
        </p>
      </motion.div>
    );
  };

  const leftItems = PRINCIPLES_DATA.slice(0, 3);
  const rightItems = PRINCIPLES_DATA.slice(3, 6);

  return (
    <section
      id="principles"
      className="py-6 md:py-8 lg:py-8 bg-transparent scroll-mt-20 relative overflow-x-clip w-full"
    >
      <div className="principles-section relative z-10">
        {/* =========================================================================
            1. SECTION HEADING (Tightened vertical spacing for 800px+ laptop viewports)
            ========================================================================= */}
        <div className="flex flex-col items-center text-center mb-6 md:mb-8">
          {/* Headline with italic accent styling */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            viewport={{ once: true }}
            className="text-[34px] sm:text-[44px] md:text-[54px] font-onest font-semibold text-[#042718] leading-[1.12] tracking-tight md:tracking-[-2px] max-w-3xl text-center"
          >
            The real thinking behind{" "}
            <span className="font-playfair italic font-medium text-black/60">
              7+ years in the field
            </span>
          </motion.h2>

          {/* Subcopy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            viewport={{ once: true }}
            className="font-inter text-[15px] md:text-[18px] text-[#042718]/80 leading-relaxed max-w-[640px] font-normal mt-4 text-center"
          >
            Six consistent principles, refined by doing the work, not writing about it.
          </motion.p>
        </div>

        {/* =========================================================================
            2. MOBILE FALLBACK (< lg): Orb first (centered), then 6 cards stacked
            ========================================================================= */}
        <div className="lg:hidden flex flex-col items-center gap-6 w-full max-w-md mx-auto mt-6">
          {/* Centered compact orb with interactive caption */}
          <div className="flex flex-col items-center justify-center py-1">
            <ShaderOrb />
            <p className="font-inter text-[11px] text-[#042619]/70 text-center select-none mt-4">
              A shader I hand-built. Click to cycle through the principles.
            </p>
          </div>

          {/* All 6 cards in numeric order 01 → 06 */}
          <div className="flex flex-col gap-3.5 w-full items-center">
            {PRINCIPLES_DATA.map((item) =>
              renderItem(item, true)
            )}
          </div>
        </div>

        {/* =========================================================================
            3. DESKTOP 3-LEFT / 3-RIGHT FANNED CLUSTER AROUND THE ORB (lg and up)
            ========================================================================= */}
        <div className="hidden lg:grid principles-layout">
          {/* Left column (overlapping fanned stack: 01, 02 in front, 03) */}
          <div className="principles-left principles-cluster">
            {leftItems.map((item) => renderItem(item, false))}
          </div>

          {/* Center column: the orb wrapper with interactive caption */}
          <div className="principles-orb-wrapper flex flex-col items-center justify-center">
            <ShaderOrb />
            <p className="font-inter text-[11px] text-[#042619]/70 text-center select-none max-w-[220px] mt-4 sm:mt-5">
              A shader I hand-built. Click to cycle through the principles.
            </p>
          </div>

          {/* Right column (overlapping fanned stack: 04, 05 in front, 06) */}
          <div className="principles-right principles-cluster">
            {rightItems.map((item) => renderItem(item, false))}
          </div>
        </div>

        {/* Footer Link to About */}
        {onNavigate && (
          <div className="mt-8 md:mt-10 text-center">
            <button
              type="button"
              onClick={() => onNavigate("/about")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-[#042718]/10 shadow-xs hover:bg-white text-[13px] font-inter font-semibold text-[#042718] hover:text-[#188E39] transition-colors cursor-pointer"
            >
              <span>Learn more about my background and leadership approach</span>
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
