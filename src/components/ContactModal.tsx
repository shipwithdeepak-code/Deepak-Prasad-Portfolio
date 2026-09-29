"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Calendar, Mail, Linkedin, Github, Send, CheckCircle2 } from "lucide-react";
import GlassButton from "./ui/GlassButton";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [subject, setSubject] = useState("Senior Product Leadership (Full-Time)");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mailtoSubject = encodeURIComponent(`[Portfolio] ${subject} — from ${name || "Visitor"}`);
  const mailtoBody = encodeURIComponent(
    `Hi Deepak,\n\n${message}\n\n---\nSender: ${name}\nEmail: ${email}\nContext: ${subject}`
  );
  const mailtoUrl = `mailto:shipwithdeepak@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Attempt launching mail client directly
    if (typeof window !== "undefined") {
      window.location.href = mailtoUrl;
    }
    setSent(true);
  };

  const handleCopyNote = () => {
    const textToCopy = `To: shipwithdeepak@gmail.com\nSubject: [Portfolio] ${subject} — from ${name}\n\nHi Deepak,\n\n${message}\n\n---\nSender: ${name}\nEmail: ${email}`;
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const subjectOptions = [
    "Senior Product Leadership (Full-Time)",
    "0→1 Product Discovery & MVP Sprint",
    "Marketplace & Payout Systems Advisory",
    "Coffee / Casual Strategy Chat",
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md cursor-pointer"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl border border-[#121517]/10 relative text-left cursor-default"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#121517]/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#C89B3C]/12 flex items-center justify-center text-[#A8711A]">
              <Calendar size={20} />
            </div>
            <div>
              <h3 className="font-onest text-xl font-bold text-[#121517]">
                Get in Touch with Deepak
              </h3>
              <p className="font-inter text-xs text-[#121517]/60">
                Usually responds within 24 hours
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#121517]/5 text-[#121517]/60 hover:text-[#121517] transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {sent ? (
          <div className="py-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#C89B3C]/12 flex items-center justify-center text-[#A8711A] mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h4 className="font-onest text-2xl font-bold text-[#121517] mb-2">
              Note Prepared for Deepak
            </h4>
            <p className="font-inter text-sm text-[#121517]/80 max-w-md mb-6 leading-relaxed">
              Your default email client was triggered with your note addressed to{" "}
              <strong className="text-[#121517] font-semibold">shipwithdeepak@gmail.com</strong>.
              If your client didn&apos;t open automatically, use the buttons below:
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm mb-6">
              <a
                href={mailtoUrl}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-[#121517] text-white font-inter text-xs font-semibold hover:bg-[#A8711A] transition-colors flex items-center justify-center gap-2"
              >
                <Mail size={14} />
                <span>Open in Email App</span>
              </a>

              <button
                type="button"
                onClick={handleCopyNote}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl border border-[#121517]/15 bg-[#FAF8F5] hover:bg-[#FAF8F5]/80 text-[#121517] font-inter text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{copied ? "Copied to Clipboard!" : "Copy Note"}</span>
              </button>
            </div>

            <div className="pt-4 border-t border-[#121517]/10 w-full flex items-center justify-between text-xs font-inter text-[#121517]/60">
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                }}
                className="hover:text-[#121517] underline cursor-pointer"
              >
                Edit message
              </button>
              <button
                type="button"
                onClick={onClose}
                className="hover:text-[#121517] font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Subject Selector */}
            <div>
              <label className="block font-inter text-xs font-bold uppercase tracking-wider text-[#121517]/70 mb-2">
                Collaboration Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {subjectOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSubject(opt)}
                    className={
                      "p-2.5 rounded-xl font-inter text-xs text-left transition-[background-color,color,border-color,box-shadow] cursor-pointer border " +
                      (subject === opt
                        ? "bg-[#121517] text-white border-[#121517] font-semibold shadow-xs"
                        : "bg-[#FAF8F5] text-[#121517]/80 border-[#121517]/10 hover:border-[#A8711A]/40")
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Email Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
              <div>
                <label className="block font-inter text-xs font-semibold text-[#121517]/70 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#121517]/15 font-inter text-sm text-[#121517] outline-none focus:border-[#A8711A]"
                />
              </div>

              <div>
                <label className="block font-inter text-xs font-semibold text-[#121517]/70 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#121517]/15 font-inter text-sm text-[#121517] outline-none focus:border-[#A8711A]"
                />
              </div>
            </div>

            {/* Message Area */}
            <div>
              <label className="block font-inter text-xs font-semibold text-[#121517]/70 mb-1">
                Project Context / Message
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell Deepak about your product vision, challenges, or timeline..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#121517]/15 font-inter text-sm text-[#121517] outline-none focus:border-[#A8711A] resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-[#121517]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#121517]/70 font-inter">
                <a
                  href="https://www.linkedin.com/in/prasad-deepak/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#A8711A] flex items-center gap-1 font-medium"
                >
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                </a>
                <span>•</span>
                <a
                  href="https://github.com/shipwithdeepak-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#A8711A] flex items-center gap-1 font-medium"
                >
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
                <span>•</span>
                <a
                  href="mailto:shipwithdeepak@gmail.com"
                  className="hover:text-[#A8711A] flex items-center gap-1 font-medium text-[#A8711A]"
                >
                  <Mail size={14} />
                  <span>shipwithdeepak@gmail.com</span>
                </a>
              </div>

              <GlassButton
                type="submit"
                variant="primary"
                size="sm"
                icon={<Send size={13} />}
                className="w-full sm:w-auto"
              >
                Send Message
              </GlassButton>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
