import React from "react";
import { ArrowDown, ArrowRight } from "lucide-react";

/**
 * Story-driven architecture diagram for Dīpa:
 *
 * Canonical Portfolio Content
 *         ↓
 * Build-time Synchronization
 *         ↓
 * Gemini Embeddings (512 dimensions)
 *         ↓
 * ragKnowledgeBase.json
 *         ↓
 * User Question
 *         ↓
 * Query Embedding
 *         ↓
 * Cosine Similarity Retrieval
 *         ↓
 * 0.68 Confidence Gate
 *        ↙       ↘
 *    Enough      Not enough
 *       ↓            ↓
 * Gemini          Abstain
 * 3.1 Flash-Lite
 *       ↓
 * Grounded Answer
 */

export function DipaArchitectureDiagram() {
  return (
    <div className="w-full my-8 p-6 sm:p-8 rounded-[20px] bg-[#FAF8F5] border border-[#042718]/10 text-[#042718]">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Phase 1: Build-Time Knowledge Pipeline */}
        <div className="w-full flex items-center justify-between mb-4 pb-2 border-b border-[#042718]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A8711A]">
            Phase 1 · Build-Time Knowledge Pipeline
          </span>
          <span className="font-mono text-[10px] text-[#042718]/50">Prebuild / Deploy</span>
        </div>

        {/* Step 1: Canonical Content */}
        <div className="w-full sm:w-80 text-center p-3.5 rounded-xl bg-white border border-[#042718]/10 shadow-xs">
          <div className="font-onest text-sm font-bold text-[#042718]">Canonical Portfolio Content</div>
          <div className="font-mono text-[10.5px] text-[#042718]/60 mt-0.5">32 curated semantic chunks</div>
        </div>

        <ArrowDown size={16} className="my-2 text-[#042718]/40" />

        {/* Step 2: Build-time Synchronization */}
        <div className="w-full sm:w-80 text-center p-3.5 rounded-xl bg-white border border-[#042718]/10 shadow-xs">
          <div className="font-onest text-sm font-bold text-[#042718]">Build-time Synchronization</div>
          <div className="font-mono text-[10.5px] text-[#042718]/60 mt-0.5">Prebuild pipeline execution</div>
        </div>

        <ArrowDown size={16} className="my-2 text-[#042718]/40" />

        {/* Step 3: Gemini Embeddings */}
        <div className="w-full sm:w-80 text-center p-3.5 rounded-xl bg-white border border-[#042718]/10 shadow-xs">
          <div className="font-onest text-sm font-bold text-[#042718]">Gemini Embeddings</div>
          <div className="font-mono text-[10.5px] text-[#2F7A4F] font-semibold mt-0.5">
            gemini-embedding-2-preview · 512 dimensions
          </div>
        </div>

        <ArrowDown size={16} className="my-2 text-[#042718]/40" />

        {/* Step 4: ragKnowledgeBase.json */}
        <div className="w-full sm:w-80 text-center p-3.5 rounded-xl bg-[#042718]/[0.03] border border-[#042718]/15">
          <div className="font-mono text-xs font-bold text-[#042718]">ragKnowledgeBase.json</div>
          <div className="font-inter text-[11px] text-[#042718]/60 mt-0.5">Local deployment knowledge index</div>
        </div>

        {/* Phase 2: Runtime Query & Grounded Generation */}
        <div className="w-full flex items-center justify-between mt-8 mb-4 pb-2 border-b border-[#042718]/10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A8711A]">
            Phase 2 · Runtime Retrieval &amp; Generation
          </span>
          <span className="font-mono text-[10px] text-[#042718]/50">At Query Time</span>
        </div>

        {/* Step 5: User Question */}
        <div className="w-full sm:w-80 text-center p-3.5 rounded-xl bg-white border border-[#042718]/10 shadow-xs">
          <div className="font-onest text-sm font-bold text-[#042718]">User Question</div>
          <div className="font-inter text-[11px] text-[#042718]/60 mt-0.5">Recruiter / hiring manager inquiry</div>
        </div>

        <ArrowDown size={16} className="my-2 text-[#042718]/40" />

        {/* Step 6: Query Embedding */}
        <div className="w-full sm:w-80 text-center p-3.5 rounded-xl bg-white border border-[#042718]/10 shadow-xs">
          <div className="font-onest text-sm font-bold text-[#042718]">Query Embedding</div>
          <div className="font-mono text-[10.5px] text-[#042718]/60 mt-0.5">512-dim vector via gemini-embedding-2-preview</div>
        </div>

        <ArrowDown size={16} className="my-2 text-[#042718]/40" />

        {/* Step 7: Cosine Similarity Retrieval */}
        <div className="w-full sm:w-80 text-center p-3.5 rounded-xl bg-white border border-[#042718]/10 shadow-xs">
          <div className="font-onest text-sm font-bold text-[#042718]">Cosine Similarity Retrieval</div>
          <div className="font-inter text-[11px] text-[#042718]/60 mt-0.5">In-memory ranking across local index</div>
        </div>

        <ArrowDown size={16} className="my-2 text-[#042718]/40" />

        {/* Step 8: 0.68 Confidence Gate */}
        <div className="w-full sm:w-88 text-center p-3.5 rounded-xl bg-[#042718] text-white shadow-xs">
          <div className="font-mono text-xs uppercase tracking-wider text-[#A7F3D0] font-semibold">
            0.68 Confidence Gate
          </div>
          <div className="font-inter text-[11.5px] text-white/80 mt-1">
            Evaluates highest cosine similarity score against threshold
          </div>
        </div>

        {/* Branch: Enough vs Not Enough */}
        <div className="w-full sm:w-96 grid grid-cols-2 gap-3 mt-4">
          {/* Branch Left: Enough (≥ 0.68) */}
          <div className="flex flex-col items-center text-center p-3.5 rounded-xl bg-[#ECFDF5] border border-[#2F7A4F]/20">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#2F7A4F] mb-1">
              Score ≥ 0.68 · Verified
            </span>
            <ArrowDown size={14} className="my-1.5 text-[#2F7A4F]" />
            <div className="font-onest text-xs font-bold text-[#042718]">gemini-3.1-flash-lite</div>
            <div className="font-inter text-[11px] text-[#042718]/70 mt-0.5">Constrained generation</div>
            <ArrowDown size={14} className="my-1.5 text-[#2F7A4F]" />
            <div className="font-onest text-xs font-bold text-[#042718] bg-white px-2.5 py-1.5 rounded-lg border border-[#2F7A4F]/20 mt-1 w-full">
              Grounded Answer
            </div>
            <div className="font-mono text-[9.5px] text-[#2F7A4F] mt-1">With source citations</div>
          </div>

          {/* Branch Right: Not Enough (< 0.68) */}
          <div className="flex flex-col items-center text-center p-3.5 rounded-xl bg-[#FFFBEB] border border-[#A8711A]/20">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A8711A] mb-1">
              Score &lt; 0.68 · Thin Evidence
            </span>
            <ArrowDown size={14} className="my-1.5 text-[#A8711A]" />
            <div className="font-onest text-xs font-bold text-[#042718]">Honest Abstention</div>
            <div className="font-inter text-[11px] text-[#042718]/70 mt-0.5">Declines to guess or fabricate</div>
            <ArrowDown size={14} className="my-1.5 text-[#A8711A]" />
            <div className="font-onest text-xs font-bold text-[#042718] bg-white px-2.5 py-1.5 rounded-lg border border-[#A8711A]/20 mt-1 w-full">
              Fallback Response
            </div>
            <div className="font-mono text-[9.5px] text-[#A8711A] mt-1">Escalates to direct chat</div>
          </div>
        </div>
      </div>
    </div>
  );
}
