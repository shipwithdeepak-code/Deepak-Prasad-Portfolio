import React, { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Play } from "lucide-react";
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
    <div className="w-full bg-[#FAFDFB] text-[#042718]">
      {/* =========================================================================
          1. HERO — COMPACT EDITORIAL HERO WITH COMBINED VISUAL & METADATA
          ========================================================================= */}
      <header className="pt-6 pb-10 md:pt-8 md:pb-12 border-b border-[#042718]/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Work Link */}
          <button
            type="button"
            onClick={() => onNavigate("/work")}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-inter font-medium text-[#042718]/60 hover:text-[#188E39] mb-5 sm:mb-6 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to all work</span>
          </button>

          {/* COMBINED HERO CARD (Approx 16:7 / 16:8 desktop, max-h 480-520px, text on left ~42-48%, subtle dark green gradient) */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#042718]/12 shadow-sm bg-[#042718] min-h-[440px] sm:min-h-[480px] md:min-h-[500px] max-h-[540px] flex items-center">
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

            {/* Subtle dark green gradient overlay: stronger on left/bottom for readability, fading out to transparent on right */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#042718]/95 via-[#042718]/80 to-[#042718]/40 md:bg-gradient-to-r md:from-[#042718]/95 md:via-[#042718]/85 md:to-transparent"
              aria-hidden="true"
            />

            {/* Hero Text Content (Occupies left ~42-48% on desktop) */}
            <div className="relative z-10 p-6 sm:p-8 md:p-12 lg:p-14 max-w-xl md:max-w-[48%] flex flex-col justify-center h-full">
              {/* Eyebrow */}
              <div className="mb-3">
                <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#34D399]">
                  RESHAMANDI
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
              <div className="pt-4 border-t border-white/15 flex items-center gap-2 text-xs sm:text-sm font-inter text-white/75">
                <span className="font-medium text-white">Product Manager</span>
                <span className="text-white/40">·</span>
                <span>June 2021 – Sept 2023</span>
              </div>
            </div>
          </div>

          {/* Underneath the hero: Single strong thesis */}
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#042718]/8">
            <blockquote className="font-onest text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#042718] leading-snug">
              “The product wasn’t the app. The workflow was.”
            </blockquote>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2 & 3. SECTION — THE MARKETPLACE
          ========================================================================= */}
      <section className="py-14 md:py-20 border-b border-[#042718]/8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold text-[#188E39]">
              01 · Physical Reality
            </span>
          </div>
          <h2 className="font-onest text-2xl sm:text-3xl md:text-4xl font-bold text-[#042718] tracking-tight leading-tight mb-6">
            The marketplace was bigger than the software.
          </h2>

          <div className="space-y-4 font-inter text-base sm:text-[17px] text-[#042718]/80 leading-relaxed mb-10">
            <p>
              India is the world’s second-largest producer of silk, yet its raw materials supply chain historically operated as a deeply fragmented, informal economy. Sericulture farmers nurture fragile silkworms through tight 25-day rearing cycles, culminating in batches of silk cocoons that must be harvested, graded, and sold.
            </p>
            <p>
              A marketplace like this is not one app. It is a network of people, physical processes, operational tools and digital systems. Digitisation could not simply mean putting forms onto a smartphone screen; it meant understanding how custody, weight, price, and currency moved across physical trading grounds.
            </p>
          </div>

          {/* Clean Value-Chain Visual (Single editorial diagram, not six cards) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#042718]/10 shadow-2xs">
            <div className="text-center sm:text-left mb-6">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-[#042718]/50 block mb-1">
                The Physical-to-Commercial Value Chain
              </span>
              <p className="font-onest text-base sm:text-lg font-bold text-[#042718]">
                From Rearing to Downstream Weaving
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
                  <div className="flex-1 p-3 rounded-xl bg-[#FAFDFB] border border-[#042718]/8 text-center flex flex-col justify-center min-h-[72px]">
                    <span className="font-onest text-xs sm:text-sm font-bold text-[#042718] block leading-tight">
                      {node.step}
                    </span>
                    <span className="font-inter text-[11px] text-[#042718]/60 mt-1 block leading-tight">
                      {node.sub}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="flex items-center justify-center text-[#188E39] py-1 md:py-0">
                      <ChevronRight size={16} className="hidden md:block" />
                      <span className="md:hidden text-xs font-mono font-bold">↓</span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <p className="font-inter text-xs text-[#042718]/60 text-center mt-6">
              Each handoff represented a point of friction, delay, or subjective dispute where software had to establish trust.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SECTION — FIELD DISCOVERY
          ========================================================================= */}
      <section className="py-14 md:py-20 border-b border-[#042718]/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold text-[#188E39]">
              02 · Discovery
            </span>
            <h2 className="font-onest text-2xl sm:text-3xl md:text-4xl font-bold text-[#042718] tracking-tight leading-tight mt-2 mb-4">
              I started with the workflow, not the interface.
            </h2>
            <p className="font-inter text-base sm:text-[17px] text-[#042718]/80 leading-relaxed">
              Before writing specifications, I spent time on the ground in regional trading hubs observing how lots arrived, how weights were captured, and why informal record-keeping broke down during peak trading hours.
            </p>
          </div>

          {/* Field Photo + Genuine Field Notes Pair */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10">
            {/* Field Photograph */}
            <div className="md:col-span-6 flex flex-col">
              <div className="rounded-2xl overflow-hidden border border-[#042718]/10 bg-white shadow-2xs">
                <img
                  src="/images/reshamandi/04-reshamandi-field-visit-01.jpg"
                  alt="Field visit observing cocoon inspection and trading on ground"
                  className="w-full h-auto object-cover max-h-[460px]"
                  loading="lazy"
                />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#042718]/60 mt-3 block">
                Ground Reality · Regional Mandi Trading Hub
              </span>
            </div>

            {/* Field Notes Screenshot */}
            <div className="md:col-span-6 flex flex-col">
              <div className="rounded-2xl overflow-hidden border border-[#042718]/10 bg-white shadow-2xs">
                <img
                  src="/images/reshamandi/01-reshamandi-field-notes-feb-2022.jpg"
                  alt="Original handwritten field notes from February 2022"
                  className="w-full h-auto object-contain max-h-[460px] bg-[#FAF8F5]"
                  loading="lazy"
                />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#042718]/60 mt-3 block">
                FIELD NOTES · FEBRUARY 2022
              </span>
            </div>
          </div>

          {/* Editorial Callout: Strict observation list from Note */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#042718]/10 shadow-2xs">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#042718]/8">
              <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#188E39]">
                FIELD VISIT + FIELD NOTES = PRODUCT OPPORTUNITIES
              </span>
            </div>

            <p className="font-inter text-sm font-medium text-[#042718]/70 mb-4">
              Ground observations documented in the February 2022 field notes:
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-inter text-sm text-[#042718]/85">
              <li className="flex items-start gap-2.5">
                <span className="text-[#188E39] font-bold mt-0.5">•</span>
                <span>Cocoon sales were updated once in the evening</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#188E39] font-bold mt-0.5">•</span>
                <span>Farmers faced payment delays</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#188E39] font-bold mt-0.5">•</span>
                <span>Price-related queries were not resolved</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#188E39] font-bold mt-0.5">•</span>
                <span>Weight of each bag was not captured during procurement</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#188E39] font-bold mt-0.5">•</span>
                <span>Weight was recorded in books and updated later at the OCC</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#188E39] font-bold mt-0.5">•</span>
                <span>Market rates were not live</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#188E39] font-bold mt-0.5">•</span>
                <span>Lot IDs were written manually</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SECTION — THE REAL WORKFLOW
          ========================================================================= */}
      <section className="py-14 md:py-20 border-b border-[#042718]/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold text-[#188E39]">
              03 · The Informal Baseline
            </span>
            <h2 className="font-onest text-2xl sm:text-3xl md:text-4xl font-bold text-[#042718] tracking-tight leading-tight mt-2 mb-4">
              Before software, the marketplace ran on WhatsApp.
            </h2>
            <p className="font-inter text-base sm:text-[17px] text-[#042718]/80 leading-relaxed">
              When procurement happened in remote collection centers, teams naturally improvised with available consumer tools. Critical lot specifications and dispatch commitments were captured on notebook pages, photographed, and transmitted across chat threads.
            </p>
          </div>

          {/* WhatsApp Artifact (With Redaction & Crop Styling for Personal Info Protection) */}
          <div className="mb-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#042718]/10 bg-[#0F1E17] shadow-sm max-w-2xl mx-auto">
              {/* Image display */}
              <img
                src="/images/reshamandi/02-reshamandi-whatsapp-lot-workflow.jpg"
                alt="Handwritten lot record and dispatch communication over WhatsApp"
                className="w-full h-auto object-contain max-h-[580px]"
                loading="lazy"
              />

              {/* Redaction overlay bar to explicitly guard any sensitive contact header / phone details */}
              <div
                className="absolute top-0 left-0 right-0 h-14 bg-[#0F1E17]/95 backdrop-blur-sm border-b border-white/10 flex items-center px-4 justify-between"
                aria-hidden="true"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#188E39]" />
                  <span className="font-mono text-xs text-white/90 font-medium">
                    [Field Dispatch Channel · Redacted for Privacy]
                  </span>
                </div>
                <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider">
                  Operational Artifact
                </span>
              </div>
            </div>

            <p className="font-inter text-xs sm:text-sm text-[#042718]/70 text-center mt-4 max-w-2xl mx-auto italic">
              “An example of how lot and dispatch information moved through handwritten records, WhatsApp and calls.”
            </p>
          </div>

          {/* Visible Pattern Flow */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#042718]/10 max-w-3xl mx-auto">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-[#8A5A16] block mb-3 text-center sm:text-left">
              The Visible Informal Pattern
            </span>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm font-inter font-semibold text-[#042718]">
              <span className="px-3 py-1.5 rounded-lg bg-[#FAFDFB] border border-[#042718]/10">
                Notebook
              </span>
              <span className="text-[#042718]/30">→</span>
              <span className="px-3 py-1.5 rounded-lg bg-[#FAFDFB] border border-[#042718]/10">
                Photo
              </span>
              <span className="text-[#042718]/30">→</span>
              <span className="px-3 py-1.5 rounded-lg bg-[#FAFDFB] border border-[#042718]/10">
                WhatsApp
              </span>
              <span className="text-[#042718]/30">→</span>
              <span className="px-3 py-1.5 rounded-lg bg-[#FAFDFB] border border-[#042718]/10">
                Call
              </span>
              <span className="text-[#042718]/30">→</span>
              <span className="px-3 py-1.5 rounded-lg bg-[#FAFDFB] border border-[#042718]/10">
                Manual follow-up
              </span>
            </div>
            <p className="font-inter text-xs text-[#042718]/60 mt-4 leading-relaxed">
              This ad-hoc chain worked for small daily batches, but broke down during seasonal volume surges: photos went unread, bag weights were disputed, and settlement reconciliation took days.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SECTION — FROM RECORDS TO SYSTEM
          ========================================================================= */}
      <section className="py-14 md:py-20 border-b border-[#042718]/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold text-[#188E39]">
              04 · The Core System
            </span>
            <h2 className="font-onest text-2xl sm:text-3xl md:text-4xl font-bold text-[#042718] tracking-tight leading-tight mt-2 mb-4">
              I turned the workflow into a shared operational record.
            </h2>
            <p className="font-inter text-base sm:text-[17px] text-[#042718]/80 leading-relaxed">
              “What was once a handwritten operational record became a structured digital lot record that teams could search, filter, update and act on.”
            </p>
          </div>

          {/* PRIMARY ARTIFACT: Large & Editorial (Not crammed inside a tiny card) */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[#042718]/12 bg-white shadow-sm mb-8">
            <img
              src="/images/reshamandi/03-reshamandi-cocoon-purchases-system.jpg"
              alt="ReshaMandi Cocoon Purchases System Interface"
              className="w-full h-auto object-contain max-h-[640px] bg-slate-50"
              loading="lazy"
            />
            <div className="p-4 sm:p-5 bg-white border-t border-[#042718]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-mono text-xs text-[#042718]/70">
                PRIMARY ARTIFACT · Production Cocoon Purchases Management System
              </span>
              <span className="font-inter text-xs text-[#188E39] font-medium">
                Live Lot Tracking across Procure → Estimate → Sell → Dispatch
              </span>
            </div>
          </div>

          {/* Restrained Annotations: Supported Terminology Only */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-[#042718]/8 shadow-2xs">
              <span className="font-mono text-xs font-bold text-[#188E39] block mb-1">
                01 — LOT IDENTITY
              </span>
              <h3 className="font-onest text-sm font-bold text-[#042718] mb-1">
                RM Lot Code
              </h3>
              <p className="font-inter text-xs text-[#042718]/70 leading-relaxed">
                Unique identifier binding physical procurement crates to the centralized ledger.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#042718]/8 shadow-2xs">
              <span className="font-mono text-xs font-bold text-[#188E39] block mb-1">
                02 — INVENTORY
              </span>
              <h3 className="font-onest text-sm font-bold text-[#042718] mb-1">
                Procured / Received / Available
              </h3>
              <p className="font-inter text-xs text-[#042718]/70 leading-relaxed">
                Clear weight breakdown preventing stock discrepancy across collection centres.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#042718]/8 shadow-2xs">
              <span className="font-mono text-xs font-bold text-[#188E39] block mb-1">
                03 — COMMERCIAL STATE
              </span>
              <h3 className="font-onest text-sm font-bold text-[#042718] mb-1">
                Selling Price &amp; Status
              </h3>
              <p className="font-inter text-xs text-[#042718]/70 leading-relaxed">
                Recommended selling price, approved commercial rates, and real-time transaction state.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#042718]/8 shadow-2xs">
              <span className="font-mono text-xs font-bold text-[#188E39] block mb-1">
                04 — OPERATIONS
              </span>
              <h3 className="font-onest text-sm font-bold text-[#042718] mb-1">
                Receive → Estimate → Sell → Dispatch
              </h3>
              <p className="font-inter text-xs text-[#042718]/70 leading-relaxed">
                Structured operational stages guiding the physical lot from floor arrival to delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. SECTION — THE SYSTEM EXTENDED INTO THE FIELD
          ========================================================================= */}
      <section className="py-14 md:py-20 border-b border-[#042718]/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold text-[#188E39]">
              05 · Ground Presence
            </span>
            <h2 className="font-onest text-2xl sm:text-3xl md:text-4xl font-bold text-[#042718] tracking-tight leading-tight mt-2 mb-4">
              The system extended into the field.
            </h2>
            <p className="font-inter text-base sm:text-[17px] text-[#042718]/80 leading-relaxed">
              Software was paired with on-the-ground hardware and mobile touchpoints to bridge the gap between rural farms and centralized operations.
            </p>
          </div>

          {/* Editorial Field Image / Visual Divider */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[#042718]/10 bg-white shadow-sm mb-12">
            <img
              src="/images/reshamandi/06-reshamandi-field-visit-03.jpg"
              alt="Field operations and farmer interaction at ReshaMandi collection hub"
              className="w-full h-auto object-cover max-h-[500px]"
              loading="lazy"
            />
            <div className="p-3.5 bg-white border-t border-[#042718]/8 font-mono text-[11px] text-[#042718]/60">
              Field Operations · Bringing digital verification to rural silk trading hubs
            </div>
          </div>

          {/* Compact Two-Surface Section (Farmer App + ReshaSathi IoT) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Farmer App */}
            <div className="p-6 rounded-2xl bg-white border border-[#042718]/10 shadow-2xs">
              <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#188E39] block mb-2">
                Mobile Surface
              </span>
              <h3 className="font-onest text-xl font-bold text-[#042718] mb-3">
                Farmer-side access
              </h3>

              <div className="rounded-xl overflow-hidden border border-[#042718]/8 bg-[#FAFDFB] mb-4">
                <img
                  src="/images/reshamandi/09-reshamandi-farmer-app.jpg"
                  alt="ReshaMandi Farmer App Interface"
                  className="w-full h-auto object-contain max-h-[380px]"
                  loading="lazy"
                />
              </div>

              <p className="font-inter text-xs text-[#042718]/70 mb-3">
                Provided smallholder producers with simple vernacular touchpoints:
              </p>
              <ul className="space-y-1.5 font-inter text-xs text-[#042718]/85">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#188E39] shrink-0" />
                  <span><strong>Sell Cocoons</strong> — Schedule lot arrivals and track mandi bids</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#188E39] shrink-0" />
                  <span><strong>Buy Chawki</strong> — Procure certified silkworm batches</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#188E39] shrink-0" />
                  <span><strong>Improve Cocoon Quality</strong> — Rearing guidance and input advisories</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#188E39] shrink-0" />
                  <span><strong>Marketplace Rates</strong> — Live market price visibility across hubs</span>
                </li>
              </ul>
            </div>

            {/* Right: ReshaSathi IoT Device */}
            <div className="p-6 rounded-2xl bg-white border border-[#042718]/10 shadow-2xs">
              <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#8A5A16] block mb-2">
                Physical Hardware
              </span>
              <h3 className="font-onest text-xl font-bold text-[#042718] mb-3">
                Physical-world visibility
              </h3>

              <div className="rounded-xl overflow-hidden border border-[#042718]/8 bg-[#FAFDFB] mb-4">
                <img
                  src="/images/reshamandi/07-reshasathi-iot-device.jpg"
                  alt="Early ReshaSathi IoT device hardware"
                  className="w-full h-auto object-contain max-h-[380px]"
                  loading="lazy"
                />
              </div>

              <p className="font-inter text-xs text-[#042718]/70 italic leading-relaxed">
                “Early ReshaSathi IoT device used in the farmer rearing environment.”
              </p>
              <p className="font-inter text-xs text-[#042718]/80 mt-3 leading-relaxed">
                The marketplace extended beyond transactions and screens. Physical environmental monitoring supported farmers during sensitive rearing phases, establishing operational presence before harvest day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. SECTION — HIGH-VALUE PRODUCT INTERVENTIONS
          ========================================================================= */}
      <section className="py-14 md:py-20 border-b border-[#042718]/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold text-[#188E39]">
              06 · Product Interventions
            </span>
            <h2 className="font-onest text-2xl sm:text-3xl md:text-4xl font-bold text-[#042718] tracking-tight leading-tight mt-2 mb-4">
              Three focused product interventions
            </h2>
            <p className="font-inter text-base sm:text-[17px] text-[#042718]/80 leading-relaxed">
              Rather than attempting to rebuild every physical interaction at once, I focused product strategy on three critical points of operational leverage: settlement liquidity, price discovery, and quality appraisal.
            </p>
          </div>

          <div className="space-y-16">
            {/* -----------------------------------------------------------------
                8A. INSTANT PAYOUT
                ----------------------------------------------------------------- */}
            <article id="instant-payout" className="scroll-mt-24 pt-8 border-t border-[#042718]/8">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-[#188E39]">
                  CHAPTER 8A
                </span>
                <span className="text-[#042718]/20">•</span>
                <span className="font-inter text-xs uppercase tracking-wider text-[#042718]/60 font-semibold">
                  Payments &amp; Settlement
                </span>
              </div>

              <h3 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] tracking-tight mb-2">
                Instant Payout
              </h3>
              <p className="font-inter text-base sm:text-lg text-[#042718]/70 mb-8 font-medium">
                Removing payment friction from the transaction.
              </p>

              {/* PROBLEM → DECISION → PRODUCT → OUTCOME */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-white border border-[#042718]/8 shadow-2xs">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#8A5A16] block mb-1">
                    01 · PROBLEM
                  </span>
                  <p className="font-inter text-xs text-[#042718]/80 leading-relaxed">
                    Traditional payment could take days, with worst cases around 15 days, exposing farmers to debt cycles and brokers.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#042718]/8 shadow-2xs">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#188E39] block mb-1">
                    02 · DECISION
                  </span>
                  <p className="font-inter text-xs text-[#042718]/80 leading-relaxed">
                    Selected Razorpay for the payment integration and engineered a tiered payout approval pipeline locked to weighbridge verification.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#042718]/8 shadow-2xs">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#042718] block mb-1">
                    03 · PRODUCT
                  </span>
                  <p className="font-inter text-xs text-[#042718]/80 leading-relaxed">
                    Payouts below ₹5L were instant; payouts above ₹5L were completed within 2 hours with automated notifications.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#042718]/8 shadow-2xs">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#188E39] block mb-1">
                    04 · OUTCOME
                  </span>
                  <p className="font-inter text-xs text-[#042718]/80 leading-relaxed">
                    Achieved 99.9% payout success; Instant Payout was one product intervention that helped uplift marketplace transaction volume from ~₹10–15 Cr to ~₹20–25 Cr/month.
                  </p>
                </div>
              </div>

              {/* Simple Before / After Workflow */}
              <div className="p-6 rounded-2xl bg-white border border-[#042718]/10 shadow-2xs">
                <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#042718]/60 block mb-4">
                  Settlement Flow Comparison
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Before */}
                  <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5]/40">
                    <span className="font-mono text-xs font-bold text-[#DC2626] block mb-2">
                      BEFORE
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
                      AFTER (GOVERNED RAILS)
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
            </article>

            {/* -----------------------------------------------------------------
                8B. COCOON BIDDING
                ----------------------------------------------------------------- */}
            <article id="cocoon-bidding" className="scroll-mt-24 pt-8 border-t border-[#042718]/8">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-[#188E39]">
                  CHAPTER 8B
                </span>
                <span className="text-[#042718]/20">•</span>
                <span className="font-inter text-xs uppercase tracking-wider text-[#042718]/60 font-semibold">
                  Price Discovery
                </span>
              </div>

              <h3 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] tracking-tight mb-2">
                Cocoon Bidding
              </h3>
              <p className="font-inter text-base sm:text-lg text-[#042718]/70 mb-6 font-medium">
                Turning physical bidding into a structured digital workflow.
              </p>

              <p className="font-inter text-sm sm:text-base text-[#042718]/80 leading-relaxed mb-6 max-w-3xl">
                Traditional cocoon sales relied on closed physical negotiation where price discovery was opaque. We structured an auction loop that enabled certified buyers to participate in scheduled bidding windows against verified lot records.
              </p>

              {/* Simple Visual: SCAN → BID → WATCH → WIN */}
              <div className="p-6 rounded-2xl bg-white border border-[#042718]/10 shadow-2xs mb-8">
                <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#188E39] block mb-4 text-center sm:text-left">
                  Bidding Interaction Loop
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { step: "SCAN", desc: "Inspect lot & verify digital lot identity" },
                    { step: "BID", desc: "Submit compliant offer in live bidding window" },
                    { step: "WATCH", desc: "Monitor outbid alerts in real time" },
                    { step: "WIN", desc: "Lot awarded & transaction bound" },
                  ].map((s, idx) => (
                    <div key={s.step} className="p-3.5 rounded-xl bg-[#FAFDFB] border border-[#042718]/8 text-center sm:text-left">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[10px] text-[#188E39] font-bold">
                          0{idx + 1}
                        </span>
                        <span className="font-onest text-xs font-bold text-[#042718]">
                          {s.step}
                        </span>
                      </div>
                      <p className="font-inter text-xs text-[#042718]/70 leading-snug">
                        {s.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[#042718]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-inter text-xs font-semibold text-[#042718]">
                    Verified Pilot Outcome:
                  </span>
                  <span className="font-mono text-xs font-bold text-[#188E39] px-2.5 py-1 rounded-md bg-[#188E39]/10">
                    &gt;35% transaction-value uplift demonstrated in pilot auctions
                  </span>
                </div>
              </div>

              {/* Demo Asset Player */}
              <div className="p-6 rounded-2xl bg-white border border-[#042718]/10 shadow-2xs max-w-3xl">
                <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#042718]/60 block mb-2">
                  Transaction Demonstration Evidence
                </span>
                <p className="font-inter text-xs text-[#042718]/70 mb-4">
                  Recorded walk-through demonstrating the live transaction workflow.
                </p>

                {isPlayingDemo ? (
                  <div className="rounded-xl overflow-hidden border border-[#042718]/10 bg-black">
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
                  <div className="relative rounded-xl overflow-hidden border border-[#042718]/10 bg-slate-100 group">
                    <img
                      src="/images/reshamandi/10-reshamandi-cocoon-transaction-demo.jpg"
                      alt="Cocoon transaction demo preview"
                      className="w-full h-auto max-h-[380px] object-cover"
                    />
                    <div className="absolute inset-0 bg-[#042718]/40 flex items-center justify-center">
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
            </article>

            {/* -----------------------------------------------------------------
                8C. ML-ASSISTED COCOON PRICING
                ----------------------------------------------------------------- */}
            <article id="ml-pricing" className="scroll-mt-24 pt-8 border-t border-[#042718]/8">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-[#188E39]">
                  CHAPTER 8C
                </span>
                <span className="text-[#042718]/20">•</span>
                <span className="font-inter text-xs uppercase tracking-wider text-[#042718]/60 font-semibold">
                  Computer Vision &amp; Quality
                </span>
              </div>

              <h3 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] tracking-tight mb-2">
                ML-assisted Cocoon Pricing
              </h3>
              <p className="font-inter text-base sm:text-lg text-[#042718]/70 mb-6 font-medium">
                Helping structure a subjective physical quality assessment.
              </p>

              {/* Ownership statement */}
              <div className="p-4 rounded-xl bg-[#FAFDFB] border border-[#042718]/10 mb-8 max-w-3xl">
                <p className="font-inter text-sm sm:text-[15px] text-[#042718] font-medium leading-relaxed">
                  “I worked with the ML team to productize a computer-vision-assisted grading/pricing workflow.”
                </p>
              </div>

              {/* Prominent Visual: Real Quality Test Sheet Artifact */}
              <div className="rounded-2xl overflow-hidden border border-[#042718]/12 bg-white shadow-2xs mb-8 max-w-3xl">
                <img
                  src="/images/reshamandi/08-reshamandi-cocoon-quality-test-sheet.jpg"
                  alt="Original Cocoon Quality Testing Sheet and Defect Inspection"
                  className="w-full h-auto object-contain max-h-[500px] bg-[#FAF8F5]"
                  loading="lazy"
                />
                <div className="p-3.5 bg-white border-t border-[#042718]/8 font-mono text-[11px] text-[#042718]/60">
                  ARTIFACT · Physical Cocoon Quality Test Sheet
                </div>
              </div>

              {/* Restrained Flow: Physical sample → Assessment → Pricing guidance → Human review */}
              <div className="p-6 rounded-2xl bg-white border border-[#042718]/10 shadow-2xs max-w-3xl">
                <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#188E39] block mb-4">
                  The Decision-Support Pipeline
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {[
                    {
                      num: "01",
                      title: "Physical cocoon sample",
                      desc: "Batch sample placed on test tray at intake station",
                    },
                    {
                      num: "02",
                      title: "Image-based assessment",
                      desc: "Computer vision evaluates surface characteristics",
                    },
                    {
                      num: "03",
                      title: "Pricing guidance",
                      desc: "System computes advisory baseline price range",
                    },
                    {
                      num: "04",
                      title: "Human review",
                      desc: "Center manager validates against floor reality",
                    },
                  ].map((st) => (
                    <div key={st.num} className="p-3.5 rounded-xl bg-[#FAFDFB] border border-[#042718]/8">
                      <span className="font-mono text-[10px] text-[#188E39] font-bold block mb-1">
                        {st.num}
                      </span>
                      <h4 className="font-onest text-xs font-bold text-[#042718] mb-1">
                        {st.title}
                      </h4>
                      <p className="font-inter text-[11px] text-[#042718]/70 leading-snug">
                        {st.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="font-inter text-xs text-[#042718]/60 mt-4 leading-relaxed">
                  Machine learning was deliberately implemented as non-binding decision support rather than unchecked automation, keeping accountability with on-ground center operators.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. RESHASATHI (SUPPORTING EVIDENCE, SHORT & FRAMED)
          ========================================================================= */}
      <section className="py-12 border-b border-[#042718]/8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#042718]/10 shadow-2xs flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/3 shrink-0 rounded-xl overflow-hidden border border-[#042718]/8">
              <img
                src="/images/reshamandi/07-reshasathi-iot-device.jpg"
                alt="ReshaSathi IoT Device"
                className="w-full h-auto object-cover max-h-[220px]"
                loading="lazy"
              />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#8A5A16] block mb-1">
                Ecosystem Breadth
              </span>
              <h3 className="font-onest text-xl font-bold text-[#042718] mb-2">
                “The marketplace extended beyond transactions and screens.”
              </h3>
              <p className="font-inter text-sm text-[#042718]/80 leading-relaxed">
                By maintaining hardware touchpoints like ReshaSathi for rearing tracking and downstream traceability with weavers, the platform maintained physical trust points that software alone could not substitute.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. WHAT CHANGED (RESTRAINED EDITORIAL OUTCOME SECTION)
          ========================================================================= */}
      <section className="py-14 md:py-20 border-b border-[#042718]/8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:text-left">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold text-[#188E39]">
              07 · Outcomes
            </span>
            <h2 className="font-onest text-2xl sm:text-3xl md:text-4xl font-bold text-[#042718] tracking-tight leading-tight mt-2">
              What Changed
            </h2>
            <p className="font-inter text-base text-[#042718]/70 mt-2">
              Verified operational results and marketplace business context.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
            {/* 80K+ farmers */}
            <div className="p-6 rounded-2xl bg-white border border-[#042718]/8 shadow-2xs">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#042718]/50 block mb-1">
                Platform Scale
              </span>
              <div className="font-onest text-3xl font-bold text-[#042718] mb-1">
                80K+
              </div>
              <p className="font-inter text-xs text-[#042718]/75 leading-relaxed">
                Farmers engaged across rearing advisory on ReshaFarms.
              </p>
            </div>

            {/* <₹5L Instant */}
            <div className="p-6 rounded-2xl bg-white border border-[#042718]/8 shadow-2xs">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#188E39] block mb-1">
                Product Outcome
              </span>
              <div className="font-onest text-3xl font-bold text-[#188E39] mb-1">
                &lt;₹5L Instant
              </div>
              <p className="font-inter text-xs text-[#042718]/75 leading-relaxed">
                Disbursements under ₹5 Lakh settled instantly upon gatepass clearance.
              </p>
            </div>

            {/* >₹5L <2h */}
            <div className="p-6 rounded-2xl bg-white border border-[#042718]/8 shadow-2xs">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#042718] block mb-1">
                Product Outcome
              </span>
              <div className="font-onest text-3xl font-bold text-[#042718] mb-1">
                &gt;₹5L &lt;2h
              </div>
              <p className="font-inter text-xs text-[#042718]/75 leading-relaxed">
                Disbursements over ₹5 Lakh completed within 2 hours.
              </p>
            </div>

            {/* 99.9% Payout Success */}
            <div className="p-6 rounded-2xl bg-white border border-[#042718]/8 shadow-2xs">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#188E39] block mb-1">
                Reliability
              </span>
              <div className="font-onest text-3xl font-bold text-[#188E39] mb-1">
                99.9%
              </div>
              <p className="font-inter text-xs text-[#042718]/75 leading-relaxed">
                Payout success rate across automated banking partner rails.
              </p>
            </div>

            {/* >35% Uplift */}
            <div className="p-6 rounded-2xl bg-white border border-[#042718]/8 shadow-2xs">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#8A5A16] block mb-1">
                Pilot Outcome
              </span>
              <div className="font-onest text-3xl font-bold text-[#8A5A16] mb-1">
                &gt;35%
              </div>
              <p className="font-inter text-xs text-[#042718]/75 leading-relaxed">
                Cocoon Bidding pilot transaction-value uplift demonstrated in pilot centers.
              </p>
            </div>

            {/* Volume Context */}
            <div className="p-6 rounded-2xl bg-white border border-[#042718]/8 shadow-2xs">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#042718]/50 block mb-1">
                Business Context
              </span>
              <div className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] mb-1">
                ₹10–15 → ₹20–25 Cr
              </div>
              <p className="font-inter text-xs text-[#042718]/75 leading-relaxed">
                Monthly marketplace transaction-volume context scaled during this operational period.
              </p>
            </div>
          </div>

          <p className="font-inter text-xs text-[#042718]/55 italic text-center max-w-xl mx-auto">
            Note: Instant Payout was one key product intervention that contributed to this marketplace volume growth alongside broader business, field, and commercial operations.
          </p>
        </div>
      </section>

      {/* =========================================================================
          11. REFLECTION (QUIET EDITORIAL CLOSING, NOT A CARD GRID)
          ========================================================================= */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold text-[#8A5A16]">
              08 · Reflection
            </span>
          </div>

          <blockquote className="font-onest text-xl sm:text-2xl md:text-[26px] font-medium text-[#042718] leading-relaxed mb-8">
            “The hardest part of digitising a marketplace isn’t building the software. It’s understanding the physical system well enough to know what should change, what should stay human, and where technology can remove friction without breaking trust.”
          </blockquote>

          <div className="pt-6 border-t border-[#042718]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="font-onest text-lg font-bold text-[#188E39]">
              “The product wasn’t the app. The workflow was.”
            </span>
            <span className="font-inter text-xs text-[#042718]/60">
              Deepak Prasad · Product Manager
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PREVIOUS / NEXT CASE STUDY PAGINATION
          ========================================================================= */}
      <section className="py-12 border-t border-[#042718]/8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-[#042718]/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <a
              href={`/work/${prevStudy.slug}`}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                onNavigate(`/work/${prevStudy.slug}`);
              }}
              className="flex items-center gap-3 text-left p-3 rounded-xl hover:bg-[#FAFDFB] border border-transparent hover:border-[#042718]/10 transition-colors cursor-pointer w-full sm:w-auto"
            >
              <ArrowLeft size={20} className="text-[#188E39]" />
              <div>
                <span className="text-[11px] font-inter font-semibold uppercase tracking-wider text-[#042718]/40 block">
                  Previous project
                </span>
                <span className="font-onest font-bold text-sm text-[#042718]">
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
              className="text-xs font-inter font-semibold text-[#042718]/60 hover:text-[#042718] transition-colors"
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
              className="flex items-center justify-end gap-3 text-right p-3 rounded-xl hover:bg-[#FAFDFB] border border-transparent hover:border-[#042718]/10 transition-colors cursor-pointer w-full sm:w-auto"
            >
              <div>
                <span className="text-[11px] font-inter font-semibold uppercase tracking-wider text-[#042718]/40 block">
                  Next project
                </span>
                <span className="font-onest font-bold text-sm text-[#042718]">
                  {nextStudy.title}
                </span>
              </div>
              <ArrowRight size={20} className="text-[#188E39]" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
