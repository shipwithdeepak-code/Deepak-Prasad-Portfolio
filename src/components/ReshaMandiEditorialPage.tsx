import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Play,
  Layers,
  Zap,
  Target,
  FileText,
  Smartphone,
  Cpu,
  TrendingUp,
  ShieldCheck,
  Scale,
  Camera,
} from "lucide-react";
import { CaseStudyDetail } from "../types";
import { ALL_FLAGSHIP_CASE_STUDIES, ALL_CASE_STUDIES } from "../data/caseStudies";
import GlassButton from "./ui/GlassButton";

interface ReshaMandiEditorialPageProps {
  caseStudy: CaseStudyDetail;
  onNavigate: (path: string) => void;
}

export default function ReshaMandiEditorialPage({
  caseStudy,
  onNavigate,
}: ReshaMandiEditorialPageProps) {
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);

  // Pagination safely
  const studyList = ALL_FLAGSHIP_CASE_STUDIES.some((c) => c.id === caseStudy.id)
    ? ALL_FLAGSHIP_CASE_STUDIES
    : ALL_CASE_STUDIES;
  const foundIndex = studyList.findIndex((c) => c.id === caseStudy.id);
  const currentIndex = foundIndex >= 0 ? foundIndex : 0;
  const nextStudy = studyList[(currentIndex + 1) % studyList.length];
  const prevStudy =
    studyList[(currentIndex - 1 + studyList.length) % studyList.length];

  return (
    <div className="w-full bg-[#FAF8F5] text-[#121517]">
      {/* =========================================================================
          1. HERO — COMPACT EDITORIAL HERO WITH COMBINED VISUAL & METADATA
          ========================================================================= */}
      <header className="pt-6 pb-10 md:pt-8 md:pb-12 border-b border-[#121517]/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Work Link */}
          <button
            type="button"
            onClick={() => onNavigate("/work")}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-inter font-medium text-[#121517]/60 hover:text-[#A8711A] mb-5 sm:mb-6 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to all work</span>
          </button>

          {/* COMBINED HERO CARD */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#121517]/12 shadow-sm bg-[#121517] min-h-[380px] sm:min-h-[440px] md:min-h-[500px] md:max-h-[540px] flex items-center">
            {/* Background Picture with Existing ReshaMandi Hero Asset */}
            <picture className="absolute inset-0 w-full h-full">
              <source
                type="image/webp"
                srcSet="/images/reshamandi-hero-480.webp 480w, /images/reshamandi-hero-800.webp 800w, /images/reshamandi-hero.webp 1600w"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
              />
              <img
                src="/images/reshamandi-hero.webp"
                alt="Digitising a Complex Silk Marketplace - ReshaMandi"
                className="w-full h-full object-cover object-right md:object-center"
                loading="eager"
                fetchPriority="high"
                width={1200}
                height={630}
              />
            </picture>

            {/* Charcoal gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#121517]/95 via-[#121517]/80 to-[#121517]/40 md:bg-gradient-to-r md:from-[#121517]/95 md:via-[#121517]/85 md:to-transparent"
              aria-hidden="true"
            />

            {/* Hero Text Content */}
            <div className="relative z-10 p-6 sm:p-8 md:p-12 lg:p-14 max-w-xl md:max-w-[48%] flex flex-col justify-center h-full">
              {/* Eyebrow */}
              <div className="mb-3">
                <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#FDE68A]">
                  RESHAMANDI · B2B MARKETPLACE
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-onest text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-[1.15] mb-3 sm:mb-4">
                Digitising a Complex Silk Marketplace
              </h1>

              {/* Supporting Line */}
              <p className="font-inter text-sm sm:text-base md:text-[17px] font-normal text-white/85 leading-relaxed mb-6">
                From fragmented field workflows to connected digital products.
              </p>

              {/* Metadata */}
              <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-inter text-white/75">
                <span className="font-medium text-white">Product Manager</span>
                <span className="text-white/40">·</span>
                <span>June 2021 – Sept 2023</span>
                <span className="text-white/40">·</span>
                <span>Bengaluru, India</span>
              </div>
            </div>
          </div>

          {/* Underneath the hero: Single strong thesis */}
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#121517]/8">
            <blockquote className="font-onest text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#121517] leading-snug">
              “The product wasn’t the app. The workflow was.”
            </blockquote>
          </div>

          {/* =========================================================================
              EXECUTIVE SCANNING MATRIX / RECRUITER AT A GLANCE
              Answers the 7 key recruiter questions in 30 seconds before scrolling into visual depth
              ========================================================================= */}
          <div className="mt-8 p-6 sm:p-7 rounded-2xl bg-white border border-[#121517]/10 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-[#121517]/8">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A8711A]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#A8711A]">
                  Case Study At A Glance · Executive Summary
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#121517]/50">
                Visual &amp; Artifact-Led Build Story
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
              {/* Problem */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#121517]/8">
                <div className="flex items-center gap-1.5 text-[#8A5A16] font-mono text-[11px] font-bold uppercase tracking-wider mb-1.5">
                  <Target size={13} />
                  <span>The Problem</span>
                </div>
                <p className="font-inter text-[#121517]/80 leading-relaxed">
                  80,000+ sericulture farmers trapped in opaque physical trading: multi-day broker settlements (3–15 days), manual pocket notebooks, and unverified subjective quality deductions.
                </p>
              </div>

              {/* What Deepak Personally Owned */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#121517]/8">
                <div className="flex items-center gap-1.5 text-[#A8711A] font-mono text-[11px] font-bold uppercase tracking-wider mb-1.5">
                  <Layers size={13} />
                  <span>What I Personally Owned</span>
                </div>
                <p className="font-inter text-[#121517]/85 leading-relaxed font-medium">
                  End-to-end marketplace operations digitization across collection hubs: digital lot ledger, instant Razorpay settlement rails, 0→1 cocoon bidding system, and ML pricing integration. (Scope strictly excluded credit/ReshaMudra).
                </p>
              </div>

              {/* What Was Built */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#121517]/8">
                <div className="flex items-center gap-1.5 text-[#121517] font-mono text-[11px] font-bold uppercase tracking-wider mb-1.5">
                  <Zap size={13} />
                  <span>What Was Built</span>
                </div>
                <p className="font-inter text-[#121517]/80 leading-relaxed">
                  Central desktop Purchases System console, tiered instant payment engine (&lt;₹5L instant, &gt;₹5L &lt;2h), timed buyer auction loop (Scan → Bid → Watch → Win), and CV sample grading decision support.
                </p>
              </div>

              {/* Verified Impact */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#121517]/8">
                <div className="flex items-center gap-1.5 text-[#A8711A] font-mono text-[11px] font-bold uppercase tracking-wider mb-1.5">
                  <TrendingUp size={13} />
                  <span>What Changed</span>
                </div>
                <p className="font-inter text-[#121517] leading-relaxed font-semibold">
                  99.9% payout reliability, helping expand monthly volume context from ₹10–15 Cr to ₹20–25 Cr; &gt;35% auction value uplift in pilot centers; 80K+ farmers engaged.
                </p>
              </div>
            </div>

            {/* Direct Artifact Index */}
            <div className="mt-4 pt-3.5 border-t border-[#121517]/6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-inter text-[#121517]/65">
              <span className="font-semibold text-[#121517]">Artifacts documented below:</span>
              <span>• Feb 2022 Field Notes</span>
              <span>• Raw WhatsApp Dispatch Thread</span>
              <span>• Production Purchases Console UI</span>
              <span>• Farmer Mobile App</span>
              <span>• ReshaSathi IoT Device</span>
              <span>• Live Bidding Video Demo</span>
              <span>• QC Testing Sheet</span>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2 & 3. SECTION 01 — THE PHYSICAL REALITY & VALUE CHAIN
          ========================================================================= */}
      <section className="py-14 md:py-20 border-b border-[#121517]/8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold text-[#A8711A]">
              CHAPTER 01 · PHYSICAL REALITY
            </span>
          </div>
          <h2 className="font-onest text-2xl sm:text-3xl md:text-4xl font-bold text-[#121517] tracking-tight leading-tight mb-4">
            The marketplace was bigger than the software.
          </h2>
          <p className="font-inter text-base sm:text-lg text-[#121517]/70 mb-8 font-medium">
            Understanding why an agrarian supply chain cannot be digitized with forms alone.
          </p>

          <div className="space-y-4 font-inter text-base sm:text-[17px] text-[#121517]/80 leading-relaxed mb-10">
            <p>
              India is the world’s second-largest producer of silk, yet its raw materials supply chain historically operated as a deeply fragmented, informal economy. Sericulture farmers nurture fragile silkworms through tight 25-day rearing cycles, culminating in batches of silk cocoons that must be harvested, graded, and sold within a 48-to-72-hour window before pupae pierce the shells and destroy the filament.
            </p>
            <p>
              A marketplace like this is not one mobile app. It is a physical-to-digital network of farmers, transport agents, rural collection hubs, weighbridge operators, commercial reelers, and banking rails. Digitisation could not simply mean putting forms onto a smartphone screen; it meant understanding how custody, physical weight, market price, and bank currency moved across trading floors.
            </p>
          </div>

          {/* Clean Value-Chain Visual */}
          <div className="p-4 sm:p-6 md:p-8 rounded-2xl bg-white border border-[#121517]/10 shadow-2xs">
            <div className="text-center sm:text-left mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-[#121517]/50">
                  SYSTEM MAP · THE PHYSICAL-TO-COMMERCIAL VALUE CHAIN
                </span>
              </div>
              <p className="font-onest text-base sm:text-lg font-bold text-[#121517]">
                7 Operational Nodes: From Rearing to Downstream Weaving
              </p>
            </div>

            {/* Stepper Chain */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
              {[
                { step: "Farmer", sub: "Rearing & Harvest" },
                { step: "Agent", sub: "Floor Transport" },
                { step: "Collection Centre", sub: "Weighbridge Intake" },
                { step: "Pricing / Purchase", sub: "Quality & Valuation" },
                { step: "Payment", sub: "Disbursement Rail" },
                { step: "Logistics", sub: "Dispatch & Custody" },
                { step: "Buyer / Reeler / Weaver", sub: "Yarn & Processing" },
              ].map((node, i, arr) => (
                <React.Fragment key={node.step}>
                  <div className="flex-1 p-3 rounded-xl bg-[#FAF8F5] border border-[#121517]/8 text-center flex flex-col justify-center min-h-[72px]">
                    <span className="font-onest text-xs sm:text-sm font-bold text-[#121517] block leading-tight">
                      {node.step}
                    </span>
                    <span className="font-inter text-[11px] text-[#121517]/60 mt-1 block leading-tight">
                      {node.sub}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="flex items-center justify-center text-[#A8711A] py-1 md:py-0">
                      <ChevronRight size={16} className="hidden md:block" />
                      <span className="md:hidden text-xs font-mono font-bold">↓</span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#121517]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-inter text-[#121517]/70">
              <span>
                <strong>Deepak’s Scope:</strong> Intake capture, automated pricing governance, instant payout rails, and buyer bidding.
              </span>
              <span className="text-[#A8711A] font-medium">
                Each node represented a friction point where software had to build trust.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SECTION 02 — FIELD DISCOVERY & AUTHENTIC ARTIFACTS
          ========================================================================= */}
      <section className="py-14 md:py-20 border-b border-[#121517]/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold text-[#A8711A]">
              CHAPTER 02 · FIELD DISCOVERY
            </span>
            <h2 className="font-onest text-2xl sm:text-3xl md:text-4xl font-bold text-[#121517] tracking-tight leading-tight mt-2 mb-3">
              I started with the workflow, not the interface.
            </h2>
            <p className="font-inter text-base sm:text-lg text-[#121517]/70 mb-4 font-medium">
              Ground observations in rural Karnataka trading mandis.
            </p>
            <p className="font-inter text-base sm:text-[17px] text-[#121517]/80 leading-relaxed">
              Before writing a single product specification, I spent weeks on the ground in regional trading hubs observing how lots arrived in jute sacks, how weights were transcribed onto pocket sheets, and why informal record-keeping inevitably collapsed during peak trading windows.
            </p>
          </div>

          {/* Visual Pair: Field Photos + Genuine Field Notes */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10">
            {/* Field Photographs Side-by-Side */}
            <div className="md:col-span-6 flex flex-col space-y-4">
              <div className="rounded-2xl overflow-hidden border border-[#121517]/10 bg-white shadow-2xs">
                <img
                  src="/images/reshamandi/04-reshamandi-field-visit-01.jpg"
                  alt="Field visit observing cocoon inspection and trading on ground"
                  className="w-full h-auto object-cover max-h-[300px]"
                  loading="lazy"
                />
                <div className="p-3 bg-white border-t border-[#121517]/8">
                  <div className="flex items-center gap-1.5 text-[#A8711A] font-mono text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    <Camera size={12} />
                    <span>WHAT YOU’RE LOOKING AT · FIELD ARTIFACT</span>
                  </div>
                  <p className="font-inter text-xs text-[#121517]/75 leading-snug">
                    Collection hub floor in Ramanagara, Karnataka. Farmers gather around open sorting crates as operators inspect cocoon moisture, bag tare weight, and filament health.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-[#121517]/10 bg-white shadow-2xs">
                <img
                  src="/images/reshamandi/05-reshamandi-field-visit-02.jpg"
                  alt="Weighbridge and collection centre intake station"
                  className="w-full h-auto object-cover max-h-[220px]"
                  loading="lazy"
                />
                <div className="p-3 bg-white border-t border-[#121517]/8">
                  <div className="flex items-center gap-1.5 text-[#A8711A] font-mono text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    <Scale size={12} />
                    <span>PHYSICAL MEASUREMENT POINT</span>
                  </div>
                  <p className="font-inter text-xs text-[#121517]/75 leading-snug">
                    The electronic weighbridge at hub intake. Weighing accuracy was the single greatest source of disputes between sellers and intermediaries.
                  </p>
                </div>
              </div>
            </div>

            {/* Field Notes Screenshot */}
            <div className="md:col-span-6 flex flex-col">
              <div className="rounded-2xl overflow-hidden border border-[#121517]/10 bg-white shadow-2xs">
                <img
                  src="/images/reshamandi/01-reshamandi-field-notes-feb-2022.jpg"
                  alt="Original handwritten field notes from February 2022"
                  className="w-full h-auto object-contain max-h-[460px] bg-[#FAF8F5]"
                  loading="lazy"
                />
                <div className="p-4 bg-white border-t border-[#121517]/8">
                  <div className="flex items-center gap-1.5 text-[#8A5A16] font-mono text-[10px] font-bold uppercase tracking-wider mb-1">
                    <FileText size={12} />
                    <span>PRIMARY DISCOVERY ARTIFACT · FEBRUARY 2022</span>
                  </div>
                  <p className="font-inter text-xs text-[#121517]/80 leading-relaxed font-medium">
                    Original handwritten field notebook page capturing operational pain points directly from on-ground staff interviews.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown List from Field Notes */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#121517]/10 shadow-2xs mb-8">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#121517]/8">
              <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#A8711A]">
                SYNTHESIS · 7 OPERATIONAL BREAKDOWNS IDENTIFIED IN NOTEBOOK
              </span>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-inter text-xs sm:text-sm text-[#121517]/85">
              <li className="flex items-start gap-2.5 p-2 rounded-lg bg-[#FAF8F5] border border-[#121517]/5">
                <span className="text-[#A8711A] font-bold mt-0.5">•</span>
                <span><strong>Delayed sales logging:</strong> Cocoon sales updated only once in the evening after market close.</span>
              </li>
              <li className="flex items-start gap-2.5 p-2 rounded-lg bg-[#FAF8F5] border border-[#121517]/5">
                <span className="text-[#A8711A] font-bold mt-0.5">•</span>
                <span><strong>Payment waiting cycles:</strong> Farmers faced 3–15 days of uncertainty before bank clearance.</span>
              </li>
              <li className="flex items-start gap-2.5 p-2 rounded-lg bg-[#FAF8F5] border border-[#121517]/5">
                <span className="text-[#A8711A] font-bold mt-0.5">•</span>
                <span><strong>Unresolved pricing disputes:</strong> Quality deductions were arbitrary with no benchmark transparency.</span>
              </li>
              <li className="flex items-start gap-2.5 p-2 rounded-lg bg-[#FAF8F5] border border-[#121517]/5">
                <span className="text-[#A8711A] font-bold mt-0.5">•</span>
                <span><strong>Missing bag weights:</strong> Individual bag weight wasn’t captured during intake procurement.</span>
              </li>
              <li className="flex items-start gap-2.5 p-2 rounded-lg bg-[#FAF8F5] border border-[#121517]/5">
                <span className="text-[#A8711A] font-bold mt-0.5">•</span>
                <span><strong>Dual transcription errors:</strong> Weights entered into paper books and transcribed later into computers.</span>
              </li>
              <li className="flex items-start gap-2.5 p-2 rounded-lg bg-[#FAF8F5] border border-[#121517]/5">
                <span className="text-[#A8711A] font-bold mt-0.5">•</span>
                <span><strong>No live rate signals:</strong> Mandi rates were static and disconnected across regional clusters.</span>
              </li>
              <li className="flex items-start gap-2.5 p-2 rounded-lg bg-[#FAF8F5] border border-[#121517]/5 sm:col-span-2">
                <span className="text-[#A8711A] font-bold mt-0.5">•</span>
                <span><strong>Manual lot IDs:</strong> Handwritten chalk codes rubbed off during floor loading, causing lost lot custody.</span>
              </li>
            </ul>
          </div>

          {/* KEY PRODUCT DECISION ANCHOR */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#ECFDF5] border border-[#A8711A]/25">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#A8711A]">
                KEY PRODUCT DECISION #1
              </span>
              <span className="text-[#121517]/30">•</span>
              <span className="font-onest text-sm font-bold text-[#121517]">
                Digitize the collection center, not just the farmer’s phone
              </span>
            </div>
            <p className="font-inter text-xs sm:text-sm text-[#121517]/85 leading-relaxed">
              <strong>The Rationale:</strong> Rather than assuming rural farmers with low smartphone penetration would download an app to input complicated batch data, we focused first on digitizing the collection hub operator’s intake station. By connecting electronic weighbridges directly to internal lot software, the farmer received an immediate SMS weight confirmation without needing an app, establishing immediate institutional trust.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SECTION 03 — THE INFORMAL BASELINE (WHATSAPP ARTIFACT)
          ========================================================================= */}
      <section className="py-14 md:py-20 border-b border-[#121517]/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold text-[#A8711A]">
              CHAPTER 03 · THE INFORMAL BASELINE
            </span>
            <h2 className="font-onest text-2xl sm:text-3xl md:text-4xl font-bold text-[#121517] tracking-tight leading-tight mt-2 mb-3">
              Before software, the marketplace ran on WhatsApp.
            </h2>
            <p className="font-inter text-base sm:text-lg text-[#121517]/70 mb-4 font-medium">
              Why consumer chat tools collapse under enterprise marketplace volume.
            </p>
            <p className="font-inter text-base sm:text-[17px] text-[#121517]/80 leading-relaxed">
              When procurement occurred in remote mandi hubs, operational teams naturally improvised with available consumer tools. Critical lot weights, dispatch schedules, and payment approvals were scribbled onto notebooks, photographed, and posted across dozens of ad-hoc chat threads.
            </p>
          </div>

          {/* WhatsApp Artifact Display */}
          <div className="mb-8">
            <div className="relative rounded-2xl overflow-hidden border border-[#121517]/10 bg-[#0F1E17] shadow-sm max-w-2xl mx-auto">
              <img
                src="/images/reshamandi/02-reshamandi-whatsapp-lot-workflow.jpg"
                alt="Handwritten lot record and dispatch communication over WhatsApp"
                className="w-full h-auto object-contain max-h-[580px]"
                loading="lazy"
              />

              {/* Redaction overlay bar */}
              <div
                className="absolute top-0 left-0 right-0 h-14 bg-[#0F1E17]/95 backdrop-blur-sm border-b border-white/10 flex items-center px-4 justify-between"
                aria-hidden="true"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A8711A]" />
                  <span className="font-mono text-xs text-white/90 font-medium">
                    [Field Dispatch Channel · Redacted for Privacy]
                  </span>
                </div>
                <span className="font-mono text-[10px] text-white/75 uppercase tracking-wider">
                  Authentic Operational Artifact
                </span>
              </div>
            </div>

            {/* Context Caption */}
            <div className="mt-4 p-4 rounded-xl bg-white border border-[#121517]/8 max-w-2xl mx-auto">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#A8711A] block mb-1">
                WHAT YOU’RE LOOKING AT · OPERATIONAL BREAKDOWN EVIDENCE
              </span>
              <p className="font-inter text-xs sm:text-sm text-[#121517]/80 leading-relaxed">
                A real WhatsApp field dispatch thread: note the handwritten slip photographed on a wooden table detailing farmer name, bag count, gross weight, and vehicle number. If an image failed to load or got buried in the group chat, reconciliation was delayed by days.
              </p>
            </div>
          </div>

          {/* Visible Pattern Flow */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#121517]/10 max-w-3xl mx-auto mb-8">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-[#8A5A16] block mb-3 text-center sm:text-left">
              The Fragile Informal Hand-Off Loop
            </span>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm font-inter font-semibold text-[#121517]">
              <span className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#121517]/10">
                1. Notebook
              </span>
              <span className="text-[#121517]/30">→</span>
              <span className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#121517]/10">
                2. Phone Photo
              </span>
              <span className="text-[#121517]/30">→</span>
              <span className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#121517]/10">
                3. WhatsApp Chat
              </span>
              <span className="text-[#121517]/30">→</span>
              <span className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#121517]/10">
                4. Voice Call
              </span>
              <span className="text-[#121517]/30">→</span>
              <span className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#121517]/10">
                5. Evening Excel Entry
              </span>
            </div>
            <p className="font-inter text-xs text-[#121517]/65 mt-4 leading-relaxed">
              This ad-hoc chain worked for small daily batches, but broke down during seasonal volume surges: photos went unread, bag weights were disputed, and settlement reconciliation took days.
            </p>
          </div>

          {/* KEY PRODUCT DECISION ANCHOR */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#ECFDF5] border border-[#A8711A]/25 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#A8711A]">
                KEY PRODUCT DECISION #2
              </span>
              <span className="text-[#121517]/30">•</span>
              <span className="font-onest text-sm font-bold text-[#121517]">
                Replace chat messages with an immutable digital lot record
              </span>
            </div>
            <p className="font-inter text-xs sm:text-sm text-[#121517]/85 leading-relaxed">
              <strong>The Rationale:</strong> Rather than attempting to "manage" chat threads with chatbots or bot scrapers, we eliminated chat from the core custody path entirely. The instant a lot arrived, the system assigned a scannable RM Lot Code that bound weight, grade, moisture, and farmer bank identity into a single immutable ledger entry.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SECTION 04 — THE CORE SYSTEM (PRIMARY ERP ARTIFACT)
          ========================================================================= */}
      <section className="py-14 md:py-20 border-b border-[#121517]/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold text-[#A8711A]">
              CHAPTER 04 · THE CORE SYSTEM
            </span>
            <h2 className="font-onest text-2xl sm:text-3xl md:text-4xl font-bold text-[#121517] tracking-tight leading-tight mt-2 mb-3">
              I turned the workflow into a shared operational record.
            </h2>
            <p className="font-inter text-base sm:text-lg text-[#121517]/70 mb-4 font-medium">
              The internal enterprise console that powered procurement across regional hubs.
            </p>
            <p className="font-inter text-base sm:text-[17px] text-[#121517]/80 leading-relaxed">
              “What was once a handwritten operational record became a structured digital lot record that teams across procurement, quality inspection, finance, and logistics could search, filter, update, and act on simultaneously.”
            </p>
          </div>

          {/* PRIMARY ARTIFACT: Large & Editorial */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[#121517]/12 bg-white shadow-sm mb-6">
            <div className="p-3.5 bg-[#FAF8F5] border-b border-[#121517]/8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#A8711A]" />
                <span className="font-mono text-xs font-bold text-[#121517]">
                  PRIMARY SYSTEM ARTIFACT · Internal ERP Purchases &amp; Lot Console
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#A8711A] font-medium">
                Live Production Screen
              </span>
            </div>

            <img
              src="/images/reshamandi/03-reshamandi-cocoon-purchases-system.jpg"
              alt="ReshaMandi Cocoon Purchases System Interface"
              className="w-full h-auto object-contain max-h-[640px] bg-slate-50"
              loading="lazy"
            />

            <div className="p-4 sm:p-5 bg-white border-t border-[#121517]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="font-inter text-[#121517]/80 leading-relaxed max-w-xl">
                <strong>What You’re Looking At:</strong> The central desktop console built for procurement center managers and finance teams, showing live lot tracking across <em>Procure → Estimate → Sell → Dispatch</em> with RM Lot codes, bag tare breakdown, and approved selling price.
              </span>
              <span className="font-mono text-[11px] text-[#A8711A] font-semibold shrink-0">
                Digitized ₹20–25 Cr Monthly Flow
              </span>
            </div>
          </div>

          {/* System Structure Annotations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-white border border-[#121517]/8 shadow-2xs">
              <span className="font-mono text-xs font-bold text-[#A8711A] block mb-1">
                01 — LOT IDENTITY
              </span>
              <h3 className="font-onest text-sm font-bold text-[#121517] mb-1">
                RM Lot Code
              </h3>
              <p className="font-inter text-xs text-[#121517]/70 leading-relaxed">
                Unique barcode identifier binding physical procurement crates to the centralized inventory ledger.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#121517]/8 shadow-2xs">
              <span className="font-mono text-xs font-bold text-[#A8711A] block mb-1">
                02 — INVENTORY ACCURACY
              </span>
              <h3 className="font-onest text-sm font-bold text-[#121517] mb-1">
                Procured vs Received
              </h3>
              <p className="font-inter text-xs text-[#121517]/70 leading-relaxed">
                Explicit gross/tare weight breakdown preventing stock leakage between weighbridge and floor.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#121517]/8 shadow-2xs">
              <span className="font-mono text-xs font-bold text-[#A8711A] block mb-1">
                03 — COMMERCIAL GOVERNANCE
              </span>
              <h3 className="font-onest text-sm font-bold text-[#121517] mb-1">
                Approved Selling Price
              </h3>
              <p className="font-inter text-xs text-[#121517]/70 leading-relaxed">
                Clear margin parameters ensuring center managers traded within calibrated daily rate corridors.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#121517]/8 shadow-2xs">
              <span className="font-mono text-xs font-bold text-[#A8711A] block mb-1">
                04 — LIFECYCLE PROGRESSION
              </span>
              <h3 className="font-onest text-sm font-bold text-[#121517] mb-1">
                Stage Transition Gates
              </h3>
              <p className="font-inter text-xs text-[#121517]/70 leading-relaxed">
                Strict sequential milestones: lots cannot be sold before weight verification is locked.
              </p>
            </div>
          </div>

          {/* KEY PRODUCT DECISION ANCHOR */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#ECFDF5] border border-[#A8711A]/25">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#A8711A]">
                KEY PRODUCT DECISION #3
              </span>
              <span className="text-[#121517]/30">•</span>
              <span className="font-onest text-sm font-bold text-[#121517]">
                Enforce physical milestone gates inside software state transitions
              </span>
            </div>
            <p className="font-inter text-xs sm:text-sm text-[#121517]/85 leading-relaxed">
              <strong>The Rationale:</strong> Rather than allowing unverified evening batch entries, the system required explicit weight and quality verification at intake before a lot could transition to bidding or payout, establishing an auditable custody chain between physical lots and digital records.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. SECTION 05 — GROUND PRESENCE (MOBILE APP & RESHASATHI IOT)
          ========================================================================= */}
      <section className="py-14 md:py-20 border-b border-[#121517]/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold text-[#A8711A]">
              CHAPTER 05 · GROUND PRESENCE
            </span>
            <h2 className="font-onest text-2xl sm:text-3xl md:text-4xl font-bold text-[#121517] tracking-tight leading-tight mt-2 mb-3">
              The system extended into the field.
            </h2>
            <p className="font-inter text-base sm:text-lg text-[#121517]/70 mb-4 font-medium">
              Connecting rural farming sheds to the digital marketplace.
            </p>
            <p className="font-inter text-base sm:text-[17px] text-[#121517]/80 leading-relaxed">
              Software was paired with on-the-ground hardware sensors and lightweight mobile touchpoints to bridge the gap between rural farms and centralized operations.
            </p>
          </div>

          {/* Editorial Field Image */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[#121517]/10 bg-white shadow-sm mb-12">
            <img
              src="/images/reshamandi/06-reshamandi-field-visit-03.jpg"
              alt="Field operations and farmer interaction at ReshaMandi collection hub"
              className="w-full h-auto object-cover max-h-[480px]"
              loading="lazy"
            />
            <div className="p-3.5 bg-white border-t border-[#121517]/8 flex items-center justify-between text-xs">
              <span className="font-inter text-[#121517]/75">
                <strong>Field Operations in Action:</strong> Center managers verifying lot samples alongside local sericulture farmers.
              </span>
              <span className="font-mono text-[11px] text-[#A8711A] font-medium">
                Mandya Hub · Karnataka
              </span>
            </div>
          </div>

          {/* Two-Surface Section: Farmer App + ReshaSathi IoT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
            {/* Left: Farmer App */}
            <div className="p-6 rounded-2xl bg-white border border-[#121517]/10 shadow-2xs">
              <div className="flex items-center gap-1.5 text-[#A8711A] font-mono text-[11px] font-bold uppercase tracking-wider mb-2">
                <Smartphone size={13} />
                <span>MOBILE TOUCHPOINT · FARMER APP</span>
              </div>
              <h3 className="font-onest text-xl font-bold text-[#121517] mb-2">
                Vernacular Farmer Interface
              </h3>
              <p className="font-inter text-xs text-[#121517]/70 mb-4">
                What you’re looking at: ReshaFarms mobile surface providing price transparency and lot scheduling in regional languages.
              </p>

              <div className="rounded-xl overflow-hidden border border-[#121517]/8 bg-[#FAF8F5] mb-4">
                <img
                  src="/images/reshamandi/09-reshamandi-farmer-app.jpg"
                  alt="ReshaMandi Farmer App Interface"
                  className="w-full h-auto object-contain max-h-[380px]"
                  loading="lazy"
                />
              </div>

              <ul className="space-y-2 font-inter text-xs text-[#121517]/85">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#A8711A] shrink-0" />
                  <span><strong>Sell Cocoons:</strong> Schedule arrival times to avoid multi-hour mandi queues</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#A8711A] shrink-0" />
                  <span><strong>Buy Chawki:</strong> Order certified silkworm batches with guaranteed survival rates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#A8711A] shrink-0" />
                  <span><strong>Improve Cocoon Quality:</strong> Vernacular rearing advisories across 25-day cycles</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#A8711A] shrink-0" />
                  <span><strong>Marketplace Rates:</strong> Real-time price visibility across regional hubs</span>
                </li>
              </ul>
            </div>

            {/* Right: ReshaSathi IoT Device */}
            <div className="p-6 rounded-2xl bg-white border border-[#121517]/10 shadow-2xs">
              <div className="flex items-center gap-1.5 text-[#8A5A16] font-mono text-[11px] font-bold uppercase tracking-wider mb-2">
                <Cpu size={13} />
                <span>HARDWARE SENSING · RESHASATHI IOT</span>
              </div>
              <h3 className="font-onest text-xl font-bold text-[#121517] mb-2">
                Physical-World Rearing Visibility
              </h3>
              <p className="font-inter text-xs text-[#121517]/70 mb-4">
                What you’re looking at: Early ReshaSathi IoT monitoring unit deployed inside rearing sheds to track environmental parameters.
              </p>

              <div className="rounded-xl overflow-hidden border border-[#121517]/8 bg-[#FAF8F5] mb-4">
                <img
                  src="/images/reshamandi/07-reshasathi-iot-device.jpg"
                  alt="Early ReshaSathi IoT device hardware"
                  className="w-full h-auto object-contain max-h-[380px]"
                  loading="lazy"
                />
              </div>

              <p className="font-inter text-xs text-[#121517]/80 leading-relaxed mb-3">
                Silkworms are hyper-sensitive to temperature and humidity spikes during the 4th and 5th instars. A 2°C fluctuation can cause cocoon flaccidity and destroy crop yield.
              </p>
              <p className="font-inter text-xs text-[#121517]/70 italic leading-relaxed">
                By maintaining hardware touchpoints like ReshaSathi, the marketplace extended into pre-harvest advisory, creating deep farmer loyalty before harvest day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. SECTION 06 — THREE FOCUSED PRODUCT INTERVENTIONS
          ========================================================================= */}
      <section className="py-14 md:py-20 border-b border-[#121517]/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold text-[#A8711A]">
              CHAPTER 06 · PRODUCT INTERVENTIONS
            </span>
            <h2 className="font-onest text-2xl sm:text-3xl md:text-4xl font-bold text-[#121517] tracking-tight leading-tight mt-2 mb-3">
              Three focused product interventions
            </h2>
            <p className="font-inter text-base sm:text-lg text-[#121517]/70 mb-4 font-medium">
              Targeting settlement liquidity, price discovery, and quality appraisal.
            </p>
            <p className="font-inter text-base sm:text-[17px] text-[#121517]/80 leading-relaxed">
              Rather than attempting to rebuild every physical interaction at once, I focused product strategy on three critical points of operational leverage where technology solved trust breakdowns.
            </p>
          </div>

          <div className="space-y-16">
            {/* -----------------------------------------------------------------
                8A. INSTANT PAYOUT
                ----------------------------------------------------------------- */}
            <article id="instant-payout" className="scroll-mt-24 pt-8 border-t border-[#121517]/8">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-[#A8711A]">
                  INTERVENTION 6A
                </span>
                <span className="text-[#121517]/20">•</span>
                <span className="font-inter text-xs uppercase tracking-wider text-[#121517]/60 font-semibold">
                  Payments &amp; Settlement Architecture
                </span>
              </div>

              <h3 className="font-onest text-2xl sm:text-3xl font-bold text-[#121517] tracking-tight mb-2">
                Instant Payout Engine
              </h3>
              <p className="font-inter text-base sm:text-lg text-[#121517]/70 mb-8 font-medium">
                Removing payment friction and predatory credit cycles from the transaction.
              </p>

              {/* PROBLEM → DECISION → PRODUCT → OUTCOME */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-white border border-[#121517]/8 shadow-2xs">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#8A5A16] block mb-1">
                    01 · THE PROBLEM
                  </span>
                  <p className="font-inter text-xs text-[#121517]/80 leading-relaxed">
                    Traditional payment could take days, with worst cases around 15 days, forcing farmers into borrowing from predatory middlemen brokers just to buy input feeds.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#121517]/8 shadow-2xs">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#A8711A] block mb-1">
                    02 · THE DECISION
                  </span>
                  <p className="font-inter text-xs text-[#121517]/80 leading-relaxed">
                    Integrated Razorpay banking API rails with our internal ledger; instituted a tiered approval protocol: disbursements under ₹5 Lakh cleared immediately upon weighbridge gatepass lock.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#121517]/8 shadow-2xs">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#121517] block mb-1">
                    03 · THE PRODUCT
                  </span>
                  <p className="font-inter text-xs text-[#121517]/80 leading-relaxed">
                    Payouts below ₹5L were instant; payouts above ₹5L completed within 2 hours via dual manager confirmation with automated real-time SMS alerts to farmers.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#121517]/8 shadow-2xs">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#A8711A] block mb-1">
                    04 · THE OUTCOME
                  </span>
                  <p className="font-inter text-xs text-[#121517]/80 leading-relaxed font-semibold">
                    Achieved 99.9% payout success reliability; scaled monthly disbursement volume context from ₹10–15 Cr to ₹20–25 Cr per month across 80K+ farmers.
                  </p>
                </div>
              </div>

              {/* Settlement Flow Comparison */}
              <div className="p-6 rounded-2xl bg-white border border-[#121517]/10 shadow-2xs mb-6">
                <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#121517]/75 block mb-4">
                  Settlement Flow Comparison: Informal Baseline vs Governed Rails
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Before */}
                  <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5]/40">
                    <span className="font-mono text-xs font-bold text-[#DC2626] block mb-2">
                      BEFORE (TRADITIONAL BROKER MANDI)
                    </span>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-inter text-[#7F1D1D] font-medium">
                      <span>Transaction</span>
                      <span>→</span>
                      <span>manual payment process</span>
                      <span>→</span>
                      <span>waiting</span>
                      <span>→</span>
                      <span>uncertainty (3–15 days)</span>
                    </div>
                  </div>

                  {/* After */}
                  <div className="p-4 rounded-xl bg-[#ECFDF5] border border-[#6EE7B7]/50">
                    <span className="font-mono text-xs font-bold text-[#059669] block mb-2">
                      AFTER (AUTOMATED BANKING RAILS)
                    </span>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-inter text-[#065F46] font-medium">
                      <span>Transaction</span>
                      <span>→</span>
                      <span>approval</span>
                      <span>→</span>
                      <span>payout</span>
                      <span>→</span>
                      <span>confirmation (&lt;₹5L instant, &gt;₹5L &lt;2h)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Product Decision */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8F5] border border-[#121517]/10">
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#A8711A] block mb-1">
                  KEY PRODUCT DECISION #4 · TIERED BANKING THRESHOLD
                </span>
                <p className="font-inter text-xs text-[#121517]/80 leading-relaxed">
                  By establishing an automated threshold at ₹5 Lakh, disbursements under ₹5L settled immediately upon lot weighing and quality confirmation on the weighbridge, while transactions over ₹5 Lakh cleared within 2 hours under internal approval governance, balancing liquidity for farmers with enterprise financial controls.
                </p>
              </div>
            </article>

            {/* -----------------------------------------------------------------
                8B. COCOON BIDDING
                ----------------------------------------------------------------- */}
            <article id="cocoon-bidding" className="scroll-mt-24 pt-8 border-t border-[#121517]/8">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-[#A8711A]">
                  INTERVENTION 6B
                </span>
                <span className="text-[#121517]/20">•</span>
                <span className="font-inter text-xs uppercase tracking-wider text-[#121517]/60 font-semibold">
                  Price Discovery &amp; Auctions
                </span>
              </div>

              <h3 className="font-onest text-2xl sm:text-3xl font-bold text-[#121517] tracking-tight mb-2">
                Cocoon Bidding System
              </h3>
              <p className="font-inter text-base sm:text-lg text-[#121517]/70 mb-6 font-medium">
                Turning physical haggling into a structured digital auction workflow.
              </p>

              <p className="font-inter text-sm sm:text-base text-[#121517]/80 leading-relaxed mb-6 max-w-3xl">
                Traditional cocoon sales relied on closed, secretive physical negotiation where price discovery was opaque and small syndicates of buyers dictated prices. We structured an auction loop that enabled certified reelers and downstream weavers to participate in scheduled bidding windows against verified digital lot records.
              </p>

              {/* Interaction Loop: SCAN → BID → WATCH → WIN */}
              <div className="p-6 rounded-2xl bg-white border border-[#121517]/10 shadow-2xs mb-8">
                <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#A8711A] block mb-4 text-center sm:text-left">
                  Bidding Interaction Loop · 4 Structured Stages
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { step: "SCAN", desc: "Inspect lot & verify digital lot identity at sample tray" },
                    { step: "BID", desc: "Submit compliant offer in live 15-minute bidding window" },
                    { step: "WATCH", desc: "Monitor outbid alerts in real time with counter-offer option" },
                    { step: "WIN", desc: "Lot awarded to top bidder & settlement triggered immediately" },
                  ].map((s, idx) => (
                    <div key={s.step} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#121517]/8 text-center sm:text-left">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[10px] text-[#A8711A] font-bold">
                          0{idx + 1}
                        </span>
                        <span className="font-onest text-xs font-bold text-[#121517]">
                          {s.step}
                        </span>
                      </div>
                      <p className="font-inter text-xs text-[#121517]/70 leading-snug">
                        {s.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[#121517]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-inter text-xs font-semibold text-[#121517]">
                    Verified Pilot Outcome:
                  </span>
                  <span className="font-mono text-xs font-bold text-[#A8711A] px-2.5 py-1 rounded-md bg-[#A8711A]/10">
                    &gt;35% transaction-value uplift demonstrated in pilot auctions
                  </span>
                </div>
              </div>

              {/* Video Player Artifact */}
              <div className="p-6 rounded-2xl bg-white border border-[#121517]/10 shadow-2xs max-w-3xl mb-6">
                <div className="flex items-center gap-1.5 text-[#A8711A] font-mono text-[11px] font-bold uppercase tracking-wider mb-2">
                  <Play size={13} className="fill-current" />
                  <span>TRANSACTION DEMONSTRATION ARTIFACT · SCREEN RECORDING</span>
                </div>
                <h4 className="font-onest text-base font-bold text-[#121517] mb-1">
                  Live Cocoon Bidding Demonstration
                </h4>
                <p className="font-inter text-xs text-[#121517]/70 mb-4">
                  What you’re looking at: Screen recording showing the real-time buyer bidding workflow, bid increment validation, and automated lot settlement.
                </p>

                {isPlayingDemo ? (
                  <div className="rounded-xl overflow-hidden border border-[#121517]/10 bg-black">
                    <video
                      controls
                      autoPlay
                      className="w-full h-auto max-h-[460px]"
                      src="/images/reshamandi/11-reshamandi-cocoon-transaction-demo.mp4"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border border-[#121517]/10 bg-slate-100 group">
                    <img
                      src="/images/reshamandi/10-reshamandi-cocoon-transaction-demo.jpg"
                      alt="Cocoon transaction demo preview"
                      className="w-full h-auto max-h-[380px] object-cover"
                    />
                    <div className="absolute inset-0 bg-[#121517]/40 flex items-center justify-center">
                      <GlassButton
                        type="button"
                        onClick={() => setIsPlayingDemo(true)}
                        variant="secondary"
                        size="md"
                        icon={<Play size={14} className="fill-current" />}
                        iconPosition="left"
                      >
                        Watch Transaction Demo Video
                      </GlassButton>
                    </div>
                  </div>
                )}
              </div>

              {/* Key Product Decision */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8F5] border border-[#121517]/10 max-w-3xl">
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#A8711A] block mb-1">
                  KEY PRODUCT DECISION #5 · STRUCTURED AUCTION WINDOWS
                </span>
                <p className="font-inter text-xs text-[#121517]/80 leading-relaxed">
                  Replaced private, unrecorded haggling with structured, timed auction windows and real-time outbid notifications. Opening transparent bidding to verified buyers in the hub and downstream weaving clusters demonstrated a &gt;35% transaction-value uplift for high-quality lots in pilot sessions.
                </p>
              </div>
            </article>

            {/* -----------------------------------------------------------------
                8C. ML-ASSISTED COCOON PRICING
                ----------------------------------------------------------------- */}
            <article id="ml-pricing" className="scroll-mt-24 pt-8 border-t border-[#121517]/8">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-[#A8711A]">
                  INTERVENTION 6C
                </span>
                <span className="text-[#121517]/20">•</span>
                <span className="font-inter text-xs uppercase tracking-wider text-[#121517]/60 font-semibold">
                  Computer Vision &amp; Quality Appraisal
                </span>
              </div>

              <h3 className="font-onest text-2xl sm:text-3xl font-bold text-[#121517] tracking-tight mb-2">
                ML-assisted Cocoon Pricing
              </h3>
              <p className="font-inter text-base sm:text-lg text-[#121517]/70 mb-6 font-medium">
                Helping structure a subjective physical quality assessment into transparent decision support.
              </p>

              {/* Ownership statement */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#121517]/10 mb-8 max-w-3xl">
                <p className="font-inter text-sm sm:text-[15px] text-[#121517] font-medium leading-relaxed">
                  “I worked with the machine learning team to productize a computer-vision-assisted grading and pricing workflow (&gt;90% accuracy), translating complex physical appraisal parameters into a guided digital recommendation.”
                </p>
              </div>

              {/* Prominent Visual: Real Quality Test Sheet Artifact */}
              <div className="rounded-2xl overflow-hidden border border-[#121517]/12 bg-white shadow-2xs mb-8 max-w-3xl">
                <img
                  src="/images/reshamandi/08-reshamandi-cocoon-quality-test-sheet.jpg"
                  alt="Original Cocoon Quality Testing Sheet and Defect Inspection"
                  className="w-full h-auto object-contain max-h-[500px] bg-[#FAF8F5]"
                  loading="lazy"
                />
                <div className="p-4 bg-white border-t border-[#121517]/8">
                  <div className="flex items-center gap-1.5 text-[#8A5A16] font-mono text-[10px] font-bold uppercase tracking-wider mb-1">
                    <ShieldCheck size={12} />
                    <span>AUTHENTIC PHYSICAL ARTIFACT · QUALITY TESTING SHEET</span>
                  </div>
                  <p className="font-inter text-xs text-[#121517]/80 leading-relaxed">
                    <strong>What You’re Looking At:</strong> Standard physical quality testing sheet used across testing hubs to evaluate cocoon defect count, shell weight, pupa weight, and estimated filament yield. The CV model learned from thousands of labeled test sheets like this one.
                  </p>
                </div>
              </div>

              {/* Decision-Support Pipeline */}
              <div className="p-6 rounded-2xl bg-white border border-[#121517]/10 shadow-2xs max-w-3xl mb-6">
                <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#A8711A] block mb-4">
                  The Decision-Support Pipeline · 4 Governed Steps
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {[
                    {
                      num: "01",
                      title: "Physical Sample",
                      desc: "Calibrated 1kg sample placed evenly across standardized test tray",
                    },
                    {
                      num: "02",
                      title: "CV Assessment",
                      desc: "Computer vision detects discoloration, urinated cocoons, and shell ratio",
                    },
                    {
                      num: "03",
                      title: "Advisory Band",
                      desc: "Model suggests fair benchmark price corridor based on day’s demand",
                    },
                    {
                      num: "04",
                      title: "Manager Review",
                      desc: "Human center operator confirms or overrides with recorded reason",
                    },
                  ].map((st) => (
                    <div key={st.num} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#121517]/8">
                      <span className="font-mono text-[10px] text-[#A8711A] font-bold block mb-1">
                        {st.num}
                      </span>
                      <h4 className="font-onest text-xs font-bold text-[#121517] mb-1">
                        {st.title}
                      </h4>
                      <p className="font-inter text-[11px] text-[#121517]/70 leading-snug">
                        {st.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="font-inter text-xs text-[#121517]/75 mt-4 leading-relaxed">
                  Machine learning was deliberately implemented as non-binding decision support rather than unchecked automation, keeping accountability with on-ground center operators.
                </p>
              </div>

              {/* Key Product Decision */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8F5] border border-[#121517]/10 max-w-3xl">
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#A8711A] block mb-1">
                  KEY PRODUCT DECISION #6 · DECISION SUPPORT, NOT AUTONOMOUS VERDICT
                </span>
                <p className="font-inter text-xs text-[#121517]/80 leading-relaxed">
                  Crucially, the computer-vision pricing workflow was designed as decision support, not an unreviewable automated verdict: the on-ground centre manager always reviewed the recommendation and retained authority to adjust for local lot characteristics, preserving operator accountability and building trust with skeptical farmers.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. SECTION 07 — RESHASATHI & ECOSYSTEM BREADTH
          ========================================================================= */}
      <section className="py-14 border-b border-[#121517]/8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#121517]/10 shadow-2xs flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/3 shrink-0 rounded-xl overflow-hidden border border-[#121517]/8">
              <img
                src="/images/reshamandi/07-reshasathi-iot-device.jpg"
                alt="ReshaSathi IoT Device"
                className="w-full h-auto object-cover max-h-[220px]"
                loading="lazy"
              />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#8A5A16] block mb-1">
                ECOSYSTEM BREADTH · HARDWARE TO CLOUD
              </span>
              <h3 className="font-onest text-xl font-bold text-[#121517] mb-2">
                “The marketplace extended beyond transactions and screens.”
              </h3>
              <p className="font-inter text-sm text-[#121517]/80 leading-relaxed mb-3">
                By maintaining hardware touchpoints like ReshaSathi for rearing tracking and downstream traceability with weavers, the platform maintained physical trust points that pure software could never substitute.
              </p>
              <span className="font-mono text-[11px] text-[#A8711A] font-medium block">
                Integrated Across 5 Business Verticals &amp; ~1.1 Lakh Total Stakeholders
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. SECTION 08 — MEASURABLE OUTCOMES
          ========================================================================= */}
      <section className="py-14 md:py-20 border-b border-[#121517]/8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:text-left">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold text-[#A8711A]">
              CHAPTER 08 · MEASURABLE OUTCOMES
            </span>
            <h2 className="font-onest text-2xl sm:text-3xl md:text-4xl font-bold text-[#121517] tracking-tight leading-tight mt-2">
              What Changed as a Result
            </h2>
            <p className="font-inter text-base text-[#121517]/70 mt-2">
              Verified operational results, platform reliability, and business scale.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
            {/* 80K+ farmers */}
            <div className="p-6 rounded-2xl bg-white border border-[#121517]/8 shadow-2xs">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#121517]/70 block mb-1">
                FARMER ENGAGEMENT
              </span>
              <div className="font-onest text-3xl font-bold text-[#121517] mb-1">
                80K+
              </div>
              <p className="font-inter text-xs text-[#121517]/75 leading-relaxed">
                Farmers engaged across rearing advisory on ReshaFarms platform.
              </p>
            </div>

            {/* <₹5L Instant */}
            <div className="p-6 rounded-2xl bg-white border border-[#121517]/8 shadow-2xs">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#A8711A] block mb-1">
                LIQUIDITY LATENCY
              </span>
              <div className="font-onest text-3xl font-bold text-[#A8711A] mb-1">
                &lt;₹5L Instant
              </div>
              <p className="font-inter text-xs text-[#121517]/75 leading-relaxed">
                Disbursements under ₹5 Lakh settled instantly upon gatepass clearance.
              </p>
            </div>

            {/* >₹5L <2h */}
            <div className="p-6 rounded-2xl bg-white border border-[#121517]/8 shadow-2xs">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#121517] block mb-1">
                HIGH-VALUE CLEARANCE
              </span>
              <div className="font-onest text-3xl font-bold text-[#121517] mb-1">
                &gt;₹5L &lt;2h
              </div>
              <p className="font-inter text-xs text-[#121517]/75 leading-relaxed">
                Disbursements over ₹5 Lakh completed within 2 hours with dual approval.
              </p>
            </div>

            {/* 99.9% Payout Success */}
            <div className="p-6 rounded-2xl bg-white border border-[#121517]/8 shadow-2xs">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#A8711A] block mb-1">
                SETTLEMENT RELIABILITY
              </span>
              <div className="font-onest text-3xl font-bold text-[#A8711A] mb-1">
                99.9%
              </div>
              <p className="font-inter text-xs text-[#121517]/75 leading-relaxed">
                Payout success rate maintained across automated banking partner rails.
              </p>
            </div>

            {/* >35% Uplift */}
            <div className="p-6 rounded-2xl bg-white border border-[#121517]/8 shadow-2xs">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#8A5A16] block mb-1">
                PRICE DISCOVERY UPLIFT
              </span>
              <div className="font-onest text-3xl font-bold text-[#8A5A16] mb-1">
                &gt;35%
              </div>
              <p className="font-inter text-xs text-[#121517]/75 leading-relaxed">
                Cocoon Bidding pilot transaction-value uplift demonstrated in pilot centers.
              </p>
            </div>

            {/* Volume Context */}
            <div className="p-6 rounded-2xl bg-white border border-[#121517]/8 shadow-2xs">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#121517]/70 block mb-1">
                MARKETPLACE VOLUME
              </span>
              <div className="font-onest text-2xl sm:text-3xl font-bold text-[#121517] mb-1">
                ₹10–15 → ₹20–25 Cr
              </div>
              <p className="font-inter text-xs text-[#121517]/75 leading-relaxed">
                Monthly marketplace transaction-volume context scaled during this operational period.
              </p>
            </div>
          </div>

          <p className="font-inter text-xs text-[#121517]/75 italic text-center max-w-xl mx-auto">
            Note: Instant Payout was one key product intervention that contributed to this marketplace volume growth alongside broader business, field, and commercial operations.
          </p>
        </div>
      </section>

      {/* =========================================================================
          11. SECTION 09 — REFLECTION & LEARNINGS
          ========================================================================= */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold text-[#8A5A16]">
              CHAPTER 09 · PRODUCT REFLECTION
            </span>
          </div>

          <blockquote className="font-onest text-xl sm:text-2xl md:text-[26px] font-medium text-[#121517] leading-relaxed mb-8">
            “The hardest part of digitising a marketplace isn’t building the software. It’s understanding the physical system well enough to know what should change, what should stay human, and where technology can remove friction without breaking trust.”
          </blockquote>

          <div className="pt-6 border-t border-[#121517]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="font-onest text-lg font-bold text-[#A8711A]">
              “The product wasn’t the app. The workflow was.”
            </span>
            <span className="font-inter text-xs text-[#121517]/75">
              Deepak Prasad · Product Manager
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PREVIOUS / NEXT CASE STUDY PAGINATION
          ========================================================================= */}
      <section className="py-12 border-t border-[#121517]/8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-[#121517]/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <a
              href={`/work/${prevStudy.slug}`}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                onNavigate(`/work/${prevStudy.slug}`);
              }}
              className="flex items-center gap-3 text-left p-3 rounded-xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#121517]/10 transition-colors cursor-pointer w-full sm:w-auto"
            >
              <ArrowLeft size={20} className="text-[#A8711A]" />
              <div>
                <span className="text-[11px] font-inter font-semibold uppercase tracking-wider text-[#121517]/65 block">
                  Previous project
                </span>
                <span className="font-onest font-bold text-sm text-[#121517]">
                  {prevStudy.title}
                </span>
              </div>
            </a>

            <a
              href="/work"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                onNavigate("/work");
              }}
              className="text-xs font-inter font-semibold text-[#121517]/60 hover:text-[#121517] transition-colors"
            >
              All work
            </a>

            <a
              href={`/work/${nextStudy.slug}`}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                onNavigate(`/work/${nextStudy.slug}`);
              }}
              className="flex items-center justify-end gap-3 text-right p-3 rounded-xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#121517]/10 transition-colors cursor-pointer w-full sm:w-auto"
            >
              <div>
                <span className="text-[11px] font-inter font-semibold uppercase tracking-wider text-[#121517]/65 block">
                  Next project
                </span>
                <span className="font-onest font-bold text-sm text-[#121517]">
                  {nextStudy.title}
                </span>
              </div>
              <ArrowRight size={20} className="text-[#A8711A]" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
