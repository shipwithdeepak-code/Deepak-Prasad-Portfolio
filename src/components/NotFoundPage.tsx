import React from "react";
import { ArrowLeft, ArrowRight, Home, Briefcase, Mail } from "lucide-react";

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export default function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="w-full min-h-[70vh] bg-[#FAFDFB] text-[#042718] flex items-center justify-center py-20 px-4 sm:px-6">
      <div className="max-w-xl w-full text-center flex flex-col items-center">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#042718]/5 text-xs font-mono font-semibold text-[#042718]/70 mb-6">
          <span>Error 404</span>
          <span>·</span>
          <span>Route Not Found</span>
        </div>

        {/* Heading */}
        <h1 className="font-onest text-4xl sm:text-5xl font-bold tracking-tight text-[#042718] leading-[1.15] mb-4">
          Looking for a project that moved?
        </h1>

        {/* Description */}
        <p className="font-inter text-base sm:text-lg text-[#042718]/70 leading-relaxed max-w-md mx-auto mb-10">
          The link or case study you requested doesn’t exist on this path. Check out Deepak&apos;s flagship product systems or head back home.
        </p>

        {/* Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full">
          <a
            href="/work"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/work");
            }}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#042718] text-white font-inter text-sm font-semibold hover:bg-[#042718]/90 transition-colors shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#188E39]"
          >
            <Briefcase size={16} />
            <span>Explore Selected Work</span>
          </a>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/");
            }}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white border border-[#042718]/15 hover:bg-[#042718]/5 text-[#042718] font-inter text-sm font-semibold transition-colors shadow-2xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#188E39]"
          >
            <Home size={16} />
            <span>Return Home</span>
          </a>

          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/contact");
            }}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white border border-[#042718]/15 hover:bg-[#042718]/5 text-[#042718] font-inter text-sm font-semibold transition-colors shadow-2xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#188E39]"
          >
            <Mail size={16} />
            <span>Contact</span>
          </a>
        </div>
      </div>
    </div>
  );
}
