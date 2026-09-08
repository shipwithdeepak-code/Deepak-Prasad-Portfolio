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
  delayIndex: number;
  className: string;
}

const PRINCIPLES_DATA: PrincipleItem[] = [
  {
    id: "01",
    number: "01",
    title: "Start with the real problem",
    hook: "Field research over dashboards, every time.",
    body: "I've traveled to cocoon collection centres in Ramanagara and Sidlaghatta before writing a single spec. Aggregate analytics don't show you why a buyer walks away mid-negotiation — being on the floor at 4:30 AM does.",
    icon: Compass,
    iconColor: "#16a34a",
    group: "left",
    translateX: "-60px",
    translateY: "-5px",
    rotate: "-1deg",
    delayIndex: 0,
    className: "principles-card-01",
  },
  {
    id: "02",
    number: "02",
    title: "Make complexity usable",
    hook: "Five disconnected systems, one governed workflow.",
    body: "At ReshaMandi, farmers, buyers, finance, and five separate systems — CRM, SAP, Camunda, Razorpay — ran on fragmented offline processes. I turned that into one connected flow: Scan → Bid → Watch → Win → Pay.",
    icon: Layers,
    iconColor: "#0ea5e9",
    group: "left",
    translateX: "-30px",
    translateY: "12px",
    rotate: "1deg",
    delayIndex: 1,
    className: "principles-card-02",
  },
  {
    id: "03",
    number: "03",
    title: "Build toward the smallest useful system",
    hook: "Prove it with 100 users before you scale it to thousands.",
    body: "Before opening the AI Coach to everyone, I shipped it to a 100-user beta first, then ran an A/B test — voice input vs. text-only — to learn what people actually wanted rather than assume it.",
    icon: Target,
    iconColor: "#f59e0b",
    group: "left",
    translateX: "-10px",
    translateY: "-2px",
    rotate: "-0.5deg",
    delayIndex: 2,
    className: "principles-card-03",
  },
  {
    id: "04",
    number: "04",
    title: "Distribution is the real skill",
    hook: "In the AI era, building is easy. Getting seen is the hard part.",
    body: "I designed an AI-assisted content-localisation workflow that took video production from a 3–4 month manual process down to under 3 weeks — shipping the same content across Italian, French, and Spanish markets simultaneously. Building one good version is easy now. The real discipline is making sure it reaches everyone who needs it.",
    icon: Radio,
    iconColor: "#8b5cf6",
    group: "right",
    translateX: "60px",
    translateY: "8px",
    rotate: "1deg",
    delayIndex: 3,
    className: "principles-card-04",
  },
  {
    id: "05",
    number: "05",
    title: "Use technology where it creates leverage",
    hook: "Adapt fast, or get left behind.",
    body: "I shipped a conversational AI feature while the underlying models were still maturing, not after they'd become standard. The AI Coach runs on Gemini but falls back to ChatGPT when confidence is low — waiting for the \"perfect\" model is how you fall behind the competitor who shipped an imperfect one first.",
    icon: Zap,
    iconColor: "#ec4899",
    group: "right",
    translateX: "30px",
    translateY: "-10px",
    rotate: "-1.5deg",
    delayIndex: 4,
    className: "principles-card-05",
  },
  {
    id: "06",
    number: "06",
    title: "Grow the team, not just the roadmap",
    hook: "You can't build something great alone.",
    body: "I directly managed a 6-person cross-functional pod at Sportstech — three PMs, a growth manager, a content manager. I didn't hand down a roadmap and check it off; I built shared ownership sprint after sprint, until the priorities felt like theirs as much as mine. A roadmap without a team that grows alongside it is just a document.",
    icon: Users,
    iconColor: "#14b8a6",
    group: "right",
    translateX: "10px",
    translateY: "14px",
    rotate: "0.5deg",
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
        initial={{ opacity: 0, y: isMobile ? 16 : 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: isMobile ? item.delayIndex * 0.06 : 0.1 }}
        style={
          !isMobile
            ? ({
                "--x": item.translateX,
                "--y": item.translateY,
                "--rot": item.rotate,
              } as React.CSSProperties)
            : undefined
        }
        className={
          isMobile
            ? "principle-card w-full max-w-md flex flex-col"
            : `principle-card ${item.className} w-[380px] flex flex-col`
        }
      >
        {/* 1. Icon + Title (inline, no box/badge, colored icon glyph) */}
        <div className="flex items-center gap-2.5 mb-2">
          <Icon
            size={22}
            strokeWidth={2}
            style={{ color: item.iconColor }}
            className="shrink-0"
          />
          <h3 className="font-onest font-bold text-[#042619] text-[16px] sm:text-[17px] leading-snug tracking-tight">
            {item.title}
          </h3>
        </div>

        {/* 2. Subtitle hook — italic, one short line */}
        <p className="font-inter italic text-[13px] text-[#042619]/65 leading-snug mb-2.5">
          {item.hook}
        </p>

        {/* 3. Body paragraph — 2–3 sentences, proof embedded naturally */}
        <p className="font-inter text-[13px] text-[#042619]/80 leading-[1.45]">
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
      className="py-20 md:py-28 bg-transparent scroll-mt-24 relative overflow-x-clip"
    >
      <div className="principles-section relative z-10">
        {/* =========================================================================
            1. SECTION HEADING (Unchanged)
            ========================================================================= */}
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E4F2EB] border border-[#188E39]/15 mb-5 sm:mb-6"
          >
            <Compass className="w-4 h-4 text-[#188E39]" />
            <span className="text-[#188E39] text-[13px] font-inter font-bold uppercase tracking-wider">
              OPERATING PRINCIPLES
            </span>
          </motion.div>

          {/* Headline with italic accent styling */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-[34px] sm:text-[44px] md:text-[54px] font-onest font-semibold text-[#042619] leading-[1.12] tracking-tight md:tracking-[-2px] mb-5 sm:mb-6 max-w-3xl text-center"
          >
            The real thinking behind{" "}
            <span className="font-playfair italic font-medium text-black/40">
              7+ years in the field
            </span>
          </motion.h2>

          {/* Subcopy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[15px] md:text-[18px] text-[#042619]/80 leading-relaxed max-w-[640px] font-inter font-normal text-center"
          >
            Six consistent principles, refined by doing the work, not writing about it.
          </motion.p>
        </div>

        {/* =========================================================================
            2. MOBILE FALLBACK (< lg): Orb first (centered), then 6 cards stacked
            ========================================================================= */}
        <div className="lg:hidden flex flex-col items-center gap-8 w-full max-w-md mx-auto mt-8">
          {/* Centered compact orb */}
          <div className="flex items-center justify-center py-2">
            <ShaderOrb />
          </div>

          {/* All 6 cards in numeric order 01 → 06 */}
          <div className="flex flex-col gap-5 w-full">
            {PRINCIPLES_DATA.map((item) =>
              renderItem(item, true)
            )}
          </div>
        </div>

        {/* =========================================================================
            3. DESKTOP 3-LEFT / 3-RIGHT STAGGERED CARDS AROUND THE ORB (lg and up)
            grid-template-columns: 380px auto 380px
            gap: 64px, max-width: 1240px
            ========================================================================= */}
        <div className="hidden lg:grid principles-layout">
          {/* Left column (top to bottom): 01, 02, 03 */}
          <div className="principles-left">
            {leftItems.map((item) => renderItem(item, false))}
          </div>

          {/* Center column: the orb wrapper, vertically centered with no excess height */}
          <div className="principles-orb-wrapper flex items-center justify-center">
            <ShaderOrb />
          </div>

          {/* Right column (top to bottom): 04, 05, 06 */}
          <div className="principles-right">
            {rightItems.map((item) => renderItem(item, false))}
          </div>
        </div>

        {/* Footer Link to About */}
        {onNavigate && (
          <div className="mt-14 md:mt-20 text-center">
            <button
              type="button"
              onClick={() => onNavigate("/about")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/90 backdrop-blur-md border border-[#042718]/10 shadow-xs hover:bg-white text-sm font-inter font-semibold text-[#042718] hover:text-[#188E39] transition-colors cursor-pointer"
            >
              <span>Learn more about my background and leadership approach</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
