"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  Compass,
  Rocket,
  Brain,
  Users,
  Database,
  Layers,
} from "lucide-react";

interface CompetencyItem {
  id: string;
  name: string;
  description: string;
  iconBg: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const leftCompetencies: CompetencyItem[] = [
  {
    id: "strategy",
    name: "Strategy & Discovery",
    description:
      "Customer research, roadmapping, prioritization, 0→1 development",
    iconBg: "bg-[#188E39]/10 text-[#188E39]",
    icon: Compass,
  },
  {
    id: "execution",
    name: "Execution & Delivery",
    description:
      "Cross-functional shipping, PRDs, Agile/Scrum, operating in ambiguity",
    iconBg: "bg-[#00758F]/10 text-[#00758F]",
    icon: Rocket,
  },
  {
    id: "product-ai-tools",
    name: "Product & AI Tools",
    description:
      "Figma & Design Systems, Lovable AI, n8n, Claude Code & Google AI Studio",
    iconBg: "bg-[#5E6AD2]/10 text-[#5E6AD2]",
    icon: Layers,
  },
];

const rightCompetencies: CompetencyItem[] = [
  {
    id: "data-ai",
    name: "Data & AI Fluency",
    description:
      "Product analytics, funnel/retention analysis, A/B testing, AI product development",
    iconBg: "bg-[#7856FF]/10 text-[#7856FF]",
    icon: Brain,
  },
  {
    id: "leadership",
    name: "Cross-Functional Leadership",
    description:
      "Stakeholder management, influence without authority, OKRs, mentoring",
    iconBg: "bg-[#E8A33D]/10 text-[#D97706]",
    icon: Users,
  },
  {
    id: "data-analytics-tools",
    name: "Data & Analytics Tools",
    description: "Power BI, Google Analytics, Amplitude, SQL",
    iconBg: "bg-[#00758F]/10 text-[#00758F]",
    icon: Database,
  },
];

const competencyTopValues: Record<number, string> = {
  0: "0px",
  1: "132px",
  2: "264px",
};

// SVG connector geometry for 3 cards per side around center circle (cx: 620, cy: 176, r: 84)
const leftPaths = [
  // Card 0 (top): angle 205° -> card midpoint y: 44
  `M ${620 + 84 * Math.cos((205 * Math.PI) / 180)} ${
    176 + 84 * Math.sin((205 * Math.PI) / 180)
  } Q ${620 + 84 * Math.cos((205 * Math.PI) / 180) - 110} ${
    176 + 84 * Math.sin((205 * Math.PI) / 180)
  } 340 44`,
  // Card 1 (middle): angle 180° -> horizontal line to card midpoint y: 176
  `M ${620 - 84} 176 L 340 176`,
  // Card 2 (bottom): angle 155° -> card midpoint y: 308
  `M ${620 + 84 * Math.cos((155 * Math.PI) / 180)} ${
    176 + 84 * Math.sin((155 * Math.PI) / 180)
  } Q ${620 + 84 * Math.cos((155 * Math.PI) / 180) - 110} ${
    176 + 84 * Math.sin((155 * Math.PI) / 180)
  } 340 308`,
];

const rightPaths = [
  // Card 0 (top): angle -25° -> card midpoint y: 44
  `M ${620 + 84 * Math.cos((-25 * Math.PI) / 180)} ${
    176 + 84 * Math.sin((-25 * Math.PI) / 180)
  } Q ${620 + 84 * Math.cos((-25 * Math.PI) / 180) + 110} ${
    176 + 84 * Math.sin((-25 * Math.PI) / 180)
  } 900 44`,
  // Card 1 (middle): angle 0° -> horizontal line to card midpoint y: 176
  `M ${620 + 84} 176 L 900 176`,
  // Card 2 (bottom): angle 25° -> card midpoint y: 308
  `M ${620 + 84 * Math.cos((25 * Math.PI) / 180)} ${
    176 + 84 * Math.sin((25 * Math.PI) / 180)
  } Q ${620 + 84 * Math.cos((25 * Math.PI) / 180) + 110} ${
    176 + 84 * Math.sin((25 * Math.PI) / 180)
  } 900 308`,
];

const sealAngles = [205, 180, 155, -25, 0, 25];

export default function ProductStack({ className }: { className?: string }) {
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
      setWindowWidth(window.innerWidth);
    }, 0);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isLargeScreen = isMounted && windowWidth >= 1024;

  return (
    <section
      id="competencies"
      className={
        "w-full bg-[#FAFDFB] py-20 lg:py-32 overflow-hidden relative flex justify-center border-t border-[#042718]/5 " +
        (className || "")
      }
    >
      <div className="w-full max-w-[1440px] px-6 lg:px-[96px]">
        <div className="w-full max-w-[1248px] mx-auto">
          {/* Header Content */}
          <div className="flex flex-col items-center text-center mb-12 md:mb-[80px]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E4F2EB] border border-[#188E39]/15 mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#188E39]" />
              <span className="text-[#188E39] text-[13px] font-inter font-bold uppercase tracking-wider">
                CORE COMPETENCIES
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-[34px] sm:text-[44px] md:text-[54px] font-onest font-semibold text-[#042619] leading-[1.12] tracking-tight md:tracking-[-2px] mb-6 max-w-3xl text-center"
            >
              Product skills built for{" "}
              <span className="font-playfair italic font-medium text-black/40">
                strategy, delivery & influence
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-[15px] md:text-[18px] text-[#042619]/80 leading-relaxed max-w-[640px] font-inter font-normal text-center"
            >
              The skills, tools, and platforms Deepak applies across discovery,
              execution, and cross-functional leadership — from 0→1 builds to
              scaled enterprise systems.
            </motion.p>
          </div>

          {/* Competencies Hub Visualization */}
          <div className="relative w-full max-w-[1240px] mx-auto min-h-[420px] lg:h-[352px] flex items-center justify-center">
            {/* Desktop Only SVG Visualization */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
              viewBox="0 0 1240 352"
            >
              <defs>
                <linearGradient
                  id="comp-gradient-left"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#188E39" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#188E39" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient
                  id="comp-gradient-right"
                  x1="100%"
                  y1="0%"
                  x2="0%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#188E39" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#188E39" stopOpacity="0.5" />
                </linearGradient>
              </defs>

              {/* Left Connection Paths */}
              {leftPaths.map((dPath, i) => (
                <React.Fragment key={`comp-path-left-${i}`}>
                  <path
                    d={dPath}
                    stroke="url(#comp-gradient-left)"
                    fill="none"
                    strokeWidth="1.8"
                    strokeDasharray="4 4"
                    opacity="0.9"
                  />
                  <motion.circle r="3.5" fill="#188E39">
                    <animateMotion
                      dur="3.5s"
                      repeatCount="indefinite"
                      path={dPath}
                      begin={`${i * 0.4}s`}
                    />
                  </motion.circle>
                </React.Fragment>
              ))}

              {/* Right Connection Paths */}
              {rightPaths.map((dPath, i) => (
                <React.Fragment key={`comp-path-right-${i}`}>
                  <path
                    d={dPath}
                    stroke="url(#comp-gradient-right)"
                    fill="none"
                    strokeWidth="1.8"
                    strokeDasharray="4 4"
                    opacity="0.9"
                  />
                  <motion.circle r="3.5" fill="#188E39">
                    <animateMotion
                      dur="3.5s"
                      repeatCount="indefinite"
                      path={dPath}
                      begin={`${i * 0.4 + 0.2}s`}
                    />
                  </motion.circle>
                </React.Fragment>
              ))}

              {/* Static Connection Dots at Seal */}
              {sealAngles.map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                return (
                  <motion.circle
                    key={`comp-seal-dot-${i}`}
                    cx={620 + 84 * Math.cos(rad)}
                    cy={176 + 84 * Math.sin(rad)}
                    r="4"
                    fill="#188E39"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity as number,
                      delay: i * 0.2,
                    }}
                  />
                );
              })}
            </svg>

            {/* Visualization Container */}
            <div className="w-full flex flex-col lg:block relative z-10 lg:h-full">
              {/* Left column items */}
              <div className="flex flex-wrap lg:grid justify-center gap-4 lg:absolute lg:left-0 lg:top-0 lg:h-full lg:w-[340px] mb-8 lg:mb-0">
                {leftCompetencies.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
                      viewport={{ once: true }}
                      className="w-[280px] sm:w-[320px] lg:w-[340px] min-h-[80px] lg:h-[88px] bg-white rounded-[20px] p-3.5 lg:p-4 flex items-center gap-3.5 shadow-[0_4px_20px_rgba(4,39,24,0.02)] group hover:shadow-[0_12px_40px_rgba(4,39,24,0.06)] transition-all cursor-default border border-[#042619]/10 lg:absolute"
                      style={{
                        top: isLargeScreen
                          ? competencyTopValues[idx]
                          : undefined,
                      }}
                    >
                      <div
                        className={
                          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 " +
                          item.iconBg
                        }
                      >
                        <IconComponent size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#042619] font-onest font-bold text-[14px] lg:text-[15px] leading-tight">
                          {item.name}
                        </span>
                        <span className="text-[#042619]/60 text-[11px] lg:text-[12px] font-inter mt-0.5 leading-snug">
                          {item.description}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Center Seal */}
              <div className="flex items-center justify-center py-8 lg:py-0 lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
                <div className="relative w-[110px] lg:w-[130px] h-[110px] lg:h-[130px] flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity as number,
                      ease: "easeInOut" as const,
                    }}
                    className="absolute inset-0 -m-8 lg:-m-[58px] rounded-full bg-[#E5F2EB]/60 shadow-[inset_0_0_40px_rgba(24,142,57,0.05)]"
                  />
                  <div className="absolute inset-0 -m-4 lg:-m-[32px] rounded-full bg-white/40 backdrop-blur-[1px]" />

                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      type: "spring" as const,
                      stiffness: 260,
                      damping: 22,
                    }}
                    viewport={{ once: true }}
                    className="w-full h-full rounded-full bg-[#042718] shadow-[0_12px_48px_rgba(24,142,57,0.2)] flex flex-col items-center justify-center relative z-10 text-white"
                  >
                    <span className="font-onest font-black text-2xl tracking-tight">
                      DP
                    </span>
                    <span className="font-inter text-[9px] font-bold text-[#34D399] uppercase tracking-wider">
                      Core Skills
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Right column items */}
              <div className="flex flex-wrap lg:grid justify-center gap-4 lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-[340px] mt-8 lg:mt-0">
                {rightCompetencies.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
                      viewport={{ once: true }}
                      className="w-[280px] sm:w-[320px] lg:w-[340px] min-h-[80px] lg:h-[88px] bg-white rounded-[20px] p-3.5 lg:p-4 flex items-center gap-3.5 shadow-[0_4px_20px_rgba(4,39,24,0.02)] group hover:shadow-[0_12px_40px_rgba(4,39,24,0.06)] transition-all cursor-default border border-[#042619]/10 lg:absolute"
                      style={{
                        top: isLargeScreen
                          ? competencyTopValues[idx]
                          : undefined,
                      }}
                    >
                      <div
                        className={
                          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 " +
                          item.iconBg
                        }
                      >
                        <IconComponent size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#042619] font-onest font-bold text-[14px] lg:text-[15px] leading-tight">
                          {item.name}
                        </span>
                        <span className="text-[#042619]/60 text-[11px] lg:text-[12px] font-inter mt-0.5 leading-snug">
                          {item.description}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="flex flex-col items-center mt-12 md:mt-[80px] gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#188E39]/15 bg-white/70 shadow-xs"
            >
              <ShieldCheck className="w-5 h-5 text-[#188E39]" />
              <p className="text-[13px] md:text-[14px] font-inter text-[#042619]/80">
                <span className="text-[#188E39] font-bold">
                  Outcome-Driven Leadership:
                </span>{" "}
                Balancing high-velocity shipping with rigorous user empathy and
                strategic alignment.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
