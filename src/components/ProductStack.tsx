"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  Compass,
  Brain,
  Rocket,
  Users,
  Layers,
  Database,
} from "lucide-react";

interface SkillItem {
  id: string;
  number: string;
  name: string;
  description: string;
  iconBg: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  translateY: string;
  rotate: string;
  delay: string;
  cardClass: string;
}

const CORE_SKILLS: SkillItem[] = [
  {
    id: "strategy",
    number: "01",
    name: "Strategy & Discovery",
    description:
      "Customer research, roadmapping, prioritization, 0→1 development",
    iconBg: "bg-[#188E39]/10 text-[#188E39]",
    icon: Compass,
    translateY: "0px",
    rotate: "-1.5deg",
    delay: "0s",
    cardClass: "skills-card-01",
  },
  {
    id: "data-ai",
    number: "02",
    name: "Data & AI Fluency",
    description:
      "Product analytics, funnel/retention analysis, A/B testing, AI product development",
    iconBg: "bg-[#7856FF]/10 text-[#7856FF]",
    icon: Brain,
    translateY: "24px",
    rotate: "1deg",
    delay: "0.8s",
    cardClass: "skills-card-02",
  },
  {
    id: "execution",
    number: "03",
    name: "Execution & Delivery",
    description:
      "Cross-functional shipping, PRDs, Agile/Scrum, operating in ambiguity",
    iconBg: "bg-[#00758F]/10 text-[#00758F]",
    icon: Rocket,
    translateY: "-12px",
    rotate: "-0.5deg",
    delay: "1.6s",
    cardClass: "skills-card-03",
  },
  {
    id: "leadership",
    number: "04",
    name: "Cross-Functional Leadership",
    description:
      "Stakeholder management, influence without authority, OKRs, mentoring",
    iconBg: "bg-[#E8A33D]/10 text-[#D97706]",
    icon: Users,
    translateY: "16px",
    rotate: "1.5deg",
    delay: "2.4s",
    cardClass: "skills-card-04",
  },
  {
    id: "product-ai-tools",
    number: "05",
    name: "Product & AI Tools",
    description:
      "Figma & Design Systems, Lovable AI, n8n, Claude Code & Google AI Studio",
    iconBg: "bg-[#5E6AD2]/10 text-[#5E6AD2]",
    icon: Layers,
    translateY: "-8px",
    rotate: "-1deg",
    delay: "3.2s",
    cardClass: "skills-card-05",
  },
  {
    id: "data-analytics-tools",
    number: "06",
    name: "Data & Analytics Tools",
    description: "Power BI, Google Analytics, Amplitude, SQL",
    iconBg: "bg-[#00758F]/10 text-[#00758F]",
    icon: Database,
    translateY: "20px",
    rotate: "0.5deg",
    delay: "4s",
    cardClass: "skills-card-06",
  },
];

export default function ProductStack({ className }: { className?: string }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return (
    <section
      id="competencies"
      className={
        "w-full bg-transparent py-20 lg:py-32 overflow-hidden relative flex justify-center " +
        (className || "")
      }
    >
      <div className="w-full max-w-[1440px] px-6 lg:px-[96px]">
        <div className="w-full max-w-[1248px] mx-auto">
          {/* Header Content */}
          <div className="flex flex-col items-center text-center mb-12 md:mb-[64px]">
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
              execution, and cross-functional leadership, from 0→1 builds to
              scaled enterprise systems.
            </motion.p>
          </div>

          {/* Staggered Natural Layout (No Center Hub, No Connecting Lines) */}
          <div className="w-full max-w-[1200px] mx-auto py-4">
            <div className="skills-scatter">
              {CORE_SKILLS.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: idx * 0.08 }}
                    viewport={{ once: true }}
                    className={`skills-card-item ${item.cardClass} w-[340px] min-h-[88px] bg-white rounded-[20px] p-3.5 lg:p-4 flex items-center gap-3.5 shadow-[0_4px_20px_rgba(4,39,24,0.02)] group hover:shadow-[0_12px_40px_rgba(4,39,24,0.06)] transition-shadow cursor-default border border-[#042619]/10`}
                    style={{
                      translate: isDesktop ? `0px ${item.translateY}` : undefined,
                      rotate: isDesktop ? item.rotate : undefined,
                      animationDelay: item.delay,
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

          {/* Footer Info */}
          <div className="flex flex-col items-center mt-12 md:mt-16 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
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
