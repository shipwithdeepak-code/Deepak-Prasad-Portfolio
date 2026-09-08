import React, { useState, useEffect } from "react";
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

export default function Footer({}: FooterProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <footer className="relative w-full overflow-hidden flex flex-col items-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {isMounted && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source
              src="https://cdn.jiro.build/Amox/All%20Images/P01-Header-01-BG.mp4"
              type="video/mp4"
            />
          </video>
        )}
        <div className="absolute inset-0 bg-[#FAFDFB]/55" />
        <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-white/5 backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black_40%,transparent)]" />
      </div>

      {/* CTA SECTION */}
      <section className="w-full relative pt-20 lg:pt-32 pb-0 overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FAFDFB] via-[#FAFDFB]/60 to-transparent pointer-events-none" />

        <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-[96px] relative z-10 flex flex-col items-center">
          <div className="max-w-[1248px] w-full flex flex-col items-center">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E4F2EB] border border-[#188E39]/15 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#188E39]" />
              <span className="text-[#188E39] text-xs font-inter font-bold uppercase tracking-wider">
                Open for High-Impact Roles
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="w-full max-w-[820px] text-center text-[#042718] font-semibold text-[38px] md:text-[60px] leading-[1.1] tracking-tight md:tracking-[-2px] mb-4 font-onest"
            >
              Let’s build something{" "}
              <span className="font-playfair italic font-medium text-black/40">
                extraordinary
              </span>{" "}
              together
            </motion.h2>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full max-w-[660px] text-center text-[#042718]/80 font-inter text-base md:text-lg leading-relaxed mb-10"
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
                <span>Book Strategy Chat</span>
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

      {/* FOOTER WATERMARK & COPYRIGHT SECTION */}
      <div className="relative w-full flex flex-col items-center">
        <div className="relative z-10 w-full max-w-[1440px] px-6 lg:px-[96px] pt-12 sm:pt-16 pb-8 flex flex-col items-center bg-transparent">
          {/* Big Watermark: DEEPAK PRASAD */}
          <div className="w-full max-w-full flex justify-center items-center select-none py-4 sm:py-6 px-4 overflow-hidden">
            <motion.h1
              initial={{ y: "60%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                ease: [0.21, 0.45, 0.32, 0.9] as const,
              }}
              className="w-full text-center text-[#042718]/12 font-onest text-[clamp(38px,10vw,150px)] font-bold leading-none tracking-tighter whitespace-nowrap select-none"
            >
              Deepak Prasad
            </motion.h1>
          </div>

          {/* Bottom Copyright Row */}
          <motion.div
            className="w-full max-w-[1248px] pt-6 pb-4 border-t border-[#042718]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#042718]/60 font-inter"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>
              &copy; {new Date().getFullYear()} Deepak Prasad. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Senior Product Manager</span>
              <span>•</span>
              <span>Bengaluru / Remote</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
