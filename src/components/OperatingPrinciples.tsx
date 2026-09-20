import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { CaseStudyDetail } from "../types";

interface PrincipleNote {
  id: string;
  num: string;
  category: string;
  title: string;
  summary: string;
  body: string;
  bg: string;
  rotation: string;
  pinGradient: string;
  // Desktop grid coordinates (≥1025px)
  desktopCol: number;
  desktopRow: number;
}

const PRINCIPLES: PrincipleNote[] = [
  {
    id: "01",
    num: "01",
    category: "EVIDENCE & DISCOVERY",
    title: "Start with the real problem.",
    summary: "Field research over dashboards, every time.",
    body: "I've travelled to cocoon collection centres in Ramanagara and Sidlaghatta before writing a single spec. Aggregate analytics don't show you why a buyer walks away mid-negotiation. Being on the floor at 4:30 AM does.",
    bg: "#F6F1E4",
    rotation: "-1.6deg",
    pinGradient: "radial-gradient(circle at 34% 30%, #EE9184, #A2382B)",
    desktopCol: 1,
    desktopRow: 1,
  },
  {
    id: "02",
    num: "02",
    category: "SYSTEMS & WORKFLOWS",
    title: "Make complexity usable.",
    summary: "Five disconnected systems, one governed workflow.",
    body: "Farmers, buyers, finance and five separate systems (CRM, SAP, Camunda, Razorpay) ran on fragmented offline processes. I turned that into one connected flow: Scan → Bid → Watch → Win → Pay.",
    bg: "#EFCBB9",
    rotation: "1.4deg",
    pinGradient: "radial-gradient(circle at 34% 30%, #EE9184, #A2382B)",
    desktopCol: 3,
    desktopRow: 1,
  },
  {
    id: "04",
    num: "04",
    category: "SIGNALS & IMPACT",
    title: "Measure what changed.",
    summary: "Decide from signals, not assumptions.",
    body: "A 35% uplift in pilot is not a 35% uplift. I wrote it unqualified once and had to walk it back in a review. Every number on this site now carries the conditions it was measured under.",
    bg: "#C6DADC",
    rotation: "1deg",
    pinGradient: "radial-gradient(circle at 34% 30%, #8FCBCB, #2E7476)",
    desktopCol: 1,
    desktopRow: 2,
  },
  {
    id: "03",
    num: "03",
    category: "0→1 & SCALE",
    title: "Build the smallest useful system.",
    summary: "Prove it with 100 users before you scale to thousands.",
    body: "Before opening the AI Coach to everyone I shipped it to a 100-user beta, then A/B tested voice input against text-only, to learn what people actually wanted rather than assume it.",
    bg: "#D2E0D5",
    rotation: "-1.2deg",
    pinGradient: "radial-gradient(circle at 34% 30%, #A3CFAE, #3C7A50)",
    desktopCol: 3,
    desktopRow: 2,
  },
  {
    id: "05",
    num: "05",
    category: "AI & LEVERAGE",
    title: "Use technology where it creates leverage.",
    summary: "Adapt fast, or get left behind.",
    body: "I shipped a conversational AI feature while the models were still maturing. The AI Coach runs on Gemini but falls back to ChatGPT when confidence is low. Waiting for the perfect model is how you lose to whoever shipped an imperfect one first.",
    bg: "#F0BCAC",
    rotation: "-1deg",
    pinGradient: "radial-gradient(circle at 34% 30%, #EE9184, #A2382B)",
    desktopCol: 1,
    desktopRow: 3,
  },
  {
    id: "06",
    num: "06",
    category: "DECISIONS & ALIGNMENT",
    title: "Stay close to people and the business.",
    summary: "You can't build something great alone.",
    body: "I managed a 6-person cross-functional pod at Sportstech: three PMs, a growth manager, a content manager. I built shared ownership sprint after sprint until the priorities felt like theirs. A roadmap without a team that grows alongside it is just a document.",
    bg: "#E9E5D8",
    rotation: "1.5deg",
    pinGradient: "radial-gradient(circle at 34% 30%, #EDEDED, #8A8A8A)",
    desktopCol: 3,
    desktopRow: 3,
  },
];

interface OperatingPrinciplesProps {
  onNavigate?: (path: string) => void;
  onSelectCaseStudy?: (caseStudy: CaseStudyDetail) => void;
}

export const OperatingPrinciples: React.FC<OperatingPrinciplesProps> = ({
  onNavigate,
}) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleNote = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="principles"
      className="relative overflow-x-clip min-h-0 min-[1025px]:min-h-screen flex flex-col justify-center bg-[#F7F3EA] py-[clamp(52px,7vw,96px)]"
    >
      <style>{`
        .principles-pin-card {
          position: relative;
          z-index: 2;
          text-align: left;
          width: 100%;
          padding: 17px 18px 14px;
          border-radius: 3px;
          color: #241F19;
          box-shadow: 0 9px 24px rgba(80, 66, 44, 0.14), 0 2px 5px rgba(80, 66, 44, 0.1);
          transition: transform 420ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 420ms cubic-bezier(0.23, 1, 0.32, 1);
          cursor: pointer;
        }

        @media (hover: hover) and (pointer: fine) {
          .principles-pin-card:hover {
            transform: translateY(-7px) rotate(0deg) !important;
            box-shadow: 0 16px 36px rgba(80, 66, 44, 0.2), 0 3px 8px rgba(80, 66, 44, 0.12) !important;
          }
          .principles-pin-card:hover .note-arrow {
            transform: translate(2px, -2px);
          }
        }

        .principles-pin-card.is-open {
          transform: rotate(0deg) !important;
          box-shadow: 0 16px 36px rgba(80, 66, 44, 0.22), 0 4px 10px rgba(80, 66, 44, 0.14) !important;
        }

        .principles-grid-board {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(16px, 2.2vw, 34px);
          align-items: center;
          position: relative;
          width: 100%;
          max-width: 1140px;
          margin-inline: auto;
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .principles-grid-board {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: clamp(16px, 2.2vw, 34px) clamp(18px, 3.4vw, 36px);
          }
        }

        @media (min-width: 1025px) {
          .principles-grid-board {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr) minmax(0, 1fr);
            gap: clamp(16px, 2.2vw, 34px) clamp(26px, 4.6vw, 76px);
          }
        }

        @media (max-width: 1440px) {
          .principles-scrawl-gutter {
            display: none !important;
          }
        }

        @media (max-width: 1180px) {
          .principles-marginalia {
            display: none !important;
          }
        }

        .principles-hub-heading .principles-hub-em,
        .hub-cell h2 em {
          font-family: "Playfair Display", Georgia, serif;
          font-style: italic;
          font-weight: 400;
          letter-spacing: -0.01em;
          color: rgba(4, 39, 24, 0.76);
          font-size: 1.03em;
        }
      `}</style>

      {/* ───────────────────────────────────────────────────────────────────────
          FOUR ABSOLUTE LAYERS INSIDE (pointer-events-none)
         ─────────────────────────────────────────────────────────────────────── */}

      {/* a) Drafting grid, opacity .34 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.34]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(4,39,24,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(4,39,24,0.045) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden="true"
      />

      {/* b) Paper grain — inline SVG feTurbulence, baseFrequency .85, numOctaves 4, opacity .4, mix-blend-mode: multiply */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <filter id="principles-board-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#principles-board-grain)" />
      </svg>

      {/* c) TOP fade, 130px tall, anchored top: seamless blend with Capabilities */}
      <div
        className="absolute top-0 inset-x-0 h-[130px] pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, #FAF8F5 0%, rgba(250,248,245,0.55) 46%, rgba(250,248,245,0) 100%)",
        }}
        aria-hidden="true"
      />

      {/* d) BOTTOM fade, 130px tall, anchored bottom: seamless blend with Footer */}
      <div
        className="absolute bottom-0 inset-x-0 h-[130px] pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to top, #FAF8F5 0%, rgba(250,248,245,0.55) 46%, rgba(250,248,245,0) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ───────────────────────────────────────────────────────────────────────
          BOARD CONTENT CONTAINER
         ─────────────────────────────────────────────────────────────────────── */}
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-[2]">
        {/* ───────────────────────────────────────────────────────────────────
            5. CONNECTORS AND MARGINALIA (Hidden in stages)
           ─────────────────────────────────────────────────────────────────── */}
        <div className="principles-marginalia absolute inset-0 pointer-events-none z-0 select-none">
          {/* Absolutely positioned SVG behind the notes: inset 0, viewBox 0 0 1000 620 */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1000 620"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Six dashed curves, each from a note toward the hub */}
            <path
              d="M250,110 C360,150 400,220 452,268"
              fill="none"
              stroke="rgba(4,39,24,0.2)"
              strokeWidth="1.4"
              strokeDasharray="6 7"
              strokeLinecap="round"
            />
            <path
              d="M750,110 C640,150 600,220 548,268"
              fill="none"
              stroke="rgba(4,39,24,0.2)"
              strokeWidth="1.4"
              strokeDasharray="6 7"
              strokeLinecap="round"
            />
            <path
              d="M250,310 C340,310 380,310 440,310"
              fill="none"
              stroke="rgba(4,39,24,0.2)"
              strokeWidth="1.4"
              strokeDasharray="6 7"
              strokeLinecap="round"
            />
            <path
              d="M750,310 C660,310 620,310 560,310"
              fill="none"
              stroke="rgba(4,39,24,0.2)"
              strokeWidth="1.4"
              strokeDasharray="6 7"
              strokeLinecap="round"
            />
            <path
              d="M250,512 C360,472 400,400 452,352"
              fill="none"
              stroke="rgba(4,39,24,0.2)"
              strokeWidth="1.4"
              strokeDasharray="6 7"
              strokeLinecap="round"
            />
            <path
              d="M750,512 C640,472 600,400 548,352"
              fill="none"
              stroke="rgba(4,39,24,0.2)"
              strokeWidth="1.4"
              strokeDasharray="6 7"
              strokeLinecap="round"
            />
          </svg>

          {/* Six handwritten scrawls, Caveat, colour rgba(4,39,24,.46) with emphasised line in #A8711A */}
          {/* Top centre, above the hub */}
          <div
            className="absolute text-center whitespace-nowrap"
            style={{
              top: "-3.5%",
              left: "50%",
              transform: "translateX(-50%) rotate(-1deg)",
              maxWidth: "46ch",
              fontFamily: "'Caveat', cursive",
              fontSize: "1.08rem",
              color: "rgba(4,39,24,0.46)",
            }}
          >
            Better problems.{" "}
            <span style={{ color: "#A8711A" }}>Better products.</span> More useful systems.
          </div>

          {/* Far left gutter */}
          <div
            className="absolute whitespace-nowrap principles-scrawl-gutter"
            style={{
              top: "31%",
              left: "calc(50% - 660px)",
              transform: "rotate(-4deg)",
              fontFamily: "'Caveat', cursive",
              fontSize: "1.15rem",
              color: "rgba(4,39,24,0.46)",
              lineHeight: 1.2,
            }}
          >
            Adoption? / <span style={{ color: "#A8711A" }}>Retention?</span> / Real impact?
          </div>

          {/* Far right gutter */}
          <div
            className="absolute whitespace-nowrap principles-scrawl-gutter"
            style={{
              bottom: "29%",
              left: "calc(50% + 590px)",
              transform: "rotate(3deg)",
              fontFamily: "'Caveat', cursive",
              fontSize: "1.15rem",
              color: "rgba(4,39,24,0.46)",
              lineHeight: 1.2,
            }}
          >
            Users. / <span style={{ color: "#A8711A" }}>Operators.</span> / Business.
          </div>

          {/* Bottom centre, below the hub */}
          <div
            className="absolute text-center whitespace-nowrap"
            style={{
              bottom: "-4.5%",
              left: "50%",
              transform: "translateX(-50%) rotate(1deg)",
              fontFamily: "'Caveat', cursive",
              fontSize: "1.22rem",
              color: "rgba(4,39,24,0.46)",
            }}
          >
            Scan → <span style={{ color: "#A8711A" }}>Bid → Watch → Win</span> → Pay
          </div>

          {/* Left column gap */}
          <div
            className="absolute whitespace-nowrap"
            style={{
              top: "19%",
              left: "50%",
              marginLeft: "-330px",
              transform: "rotate(-2deg)",
              fontFamily: "'Caveat', cursive",
              fontSize: "0.92rem",
              color: "rgba(4,39,24,0.46)",
            }}
          >
            <span style={{ color: "#A8711A" }}>4:30 AM.</span> / Ramanagara.
          </div>

          {/* Right column gap */}
          <div
            className="absolute whitespace-nowrap"
            style={{
              bottom: "20%",
              left: "50%",
              marginLeft: "330px",
              transform: "rotate(1.5deg)",
              fontFamily: "'Caveat', cursive",
              fontSize: "0.92rem",
              color: "rgba(4,39,24,0.46)",
            }}
          >
            <span style={{ color: "#A8711A" }}>100 users</span> / before thousands.
          </div>

          {/* Two small inline SVG doodles at opacity .38 */}
          {/* Three-bar chart in amber and green */}
          <svg
            width="32"
            height="28"
            viewBox="0 0 32 28"
            fill="none"
            className="absolute pointer-events-none opacity-[0.38]"
            style={{ top: "8%", left: "calc(50% - 300px)", transform: "rotate(-4deg)" }}
            aria-hidden="true"
          >
            <rect x="4" y="14" width="5" height="11" rx="1" fill="#A8711A" />
            <rect x="13" y="8" width="5" height="17" rx="1" fill="#3C7A50" />
            <rect x="22" y="3" width="5" height="22" rx="1" fill="#D9A94C" />
            <line
              x1="1"
              y1="26"
              x2="30"
              y2="26"
              stroke="#042718"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>

          {/* Curved arrow in amber */}
          <svg
            width="38"
            height="26"
            viewBox="0 0 38 26"
            fill="none"
            className="absolute pointer-events-none opacity-[0.38]"
            style={{ bottom: "7%", left: "calc(50% + 268px)", transform: "rotate(8deg)" }}
            aria-hidden="true"
          >
            <path
              d="M4 20C13 6 25 7 34 14M34 14L27 11M34 14L29 20"
              stroke="#A8711A"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* ───────────────────────────────────────────────────────────────────
            THE GRID: 6 NOTES AROUND CENTRE HUB
           ─────────────────────────────────────────────────────────────────── */}
        <div className="principles-grid-board">
          {/* 3. HUB (centre cell, text-centre, z-3, padding-inline 6px) */}
          <div
            className="hub-cell z-[3] text-center px-[6px] col-span-1 min-[641px]:col-span-2 min-[1025px]:col-span-1 min-[1025px]:col-start-2 min-[1025px]:row-start-2 mb-3 min-[1025px]:mb-0 flex flex-col items-center justify-center"
          >
            {/* eyebrow "How I work" — mono, 10px, uppercase, #A8711A, tracking .24em */}
            <span className="font-mono text-[10px] uppercase text-[#A8711A] tracking-[0.24em] font-semibold block">
              How I work
            </span>

            {/* h2 "Six principles I keep coming back to." */}
            <h2 className="font-onest font-bold text-[clamp(1.45rem,2.9vw,2.35rem)] leading-[1.08] text-[#042718] mt-3 tracking-tight principles-hub-heading">
              Six principles I keep coming{" "}
              <em className="principles-hub-em not-italic">back to.</em>
            </h2>

            {/* p "Not a framework I downloaded. A working set of rules shaped by shipping real products." */}
            <p className="font-inter text-[14.2px] text-[#042718]/[0.76] max-w-[34ch] mx-auto mt-3 leading-normal">
              Not a framework I downloaded. A working set of rules shaped by shipping real products.
            </p>

            {/* p Caveat, 1.22rem, #A8711A, margin-top 14px: "Things I write down before I ship." */}
            <p
              className="mt-[14px] text-[1.22rem] text-[#A8711A]"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              Things I write down before I ship.
            </p>
          </div>

          {/* 4. THE SIX NOTES */}
          {PRINCIPLES.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`w-full ${
                  item.desktopCol === 1
                    ? "min-[1025px]:col-start-1"
                    : "min-[1025px]:col-start-3"
                } ${
                  item.desktopRow === 1
                    ? "min-[1025px]:row-start-1"
                    : item.desktopRow === 2
                    ? "min-[1025px]:row-start-2"
                    : "min-[1025px]:row-start-3"
                }`}
              >
                <button
                  type="button"
                  id={`principle-note-${item.num}`}
                  aria-expanded={isOpen}
                  onClick={() => toggleNote(item.id)}
                  className={`principles-pin-card ${isOpen ? "is-open" : ""}`}
                  style={{
                    backgroundColor: item.bg,
                    transform: isOpen ? "rotate(0deg)" : `rotate(${item.rotation})`,
                  }}
                >
                  {/* Pin: 14px circle, top:-8px, left:50%, translate:-50% 0 */}
                  <div
                    className="absolute -top-[8px] left-1/2 -translate-x-1/2 w-[14px] h-[14px] rounded-full pointer-events-none z-10"
                    style={{
                      background: item.pinGradient,
                      boxShadow: "0 3px 6px rgba(80,66,44,0.36)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Row: number in mono 12px #5A5044 | category mono 8px uppercase #7E7365, right */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[12px] text-[#5A5044] font-medium leading-none">
                      {item.num}
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-[#7E7365] font-semibold leading-none">
                      {item.category}
                    </span>
                  </div>

                  {/* h3: Caveat 1.42rem 700, #1E1A14, line-height 1.1, margin-top 10px, border-bottom 1px rgba(80,66,44,.2), padding-bottom 9px */}
                  <h3
                    className="text-[1.42rem] font-bold text-[#1E1A14] leading-[1.1] mt-[10px] pb-[9px] border-b border-[rgba(80,66,44,0.2)]"
                    style={{ fontFamily: "'Caveat', cursive" }}
                  >
                    {item.title}
                  </h3>

                  {/* span: one-line summary, 12.8px, #544B40, margin-top 9px */}
                  <span className="block text-[12.8px] text-[#544B40] mt-[9px] leading-snug">
                    {item.summary}
                  </span>

                  {/* div: full paragraph — max-height 0, overflow hidden, expanding to 300px with margin-top 9px when open */}
                  <div
                    className={`overflow-hidden transition-[max-height,opacity,margin-top] duration-[420ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
                      isOpen
                        ? "max-h-[300px] opacity-100 mt-[9px]"
                        : "max-h-0 opacity-0 mt-0"
                    }`}
                  >
                    <p className="font-inter text-[12.8px] text-[#241F19]/90 leading-[1.55]">
                      {item.body}
                    </p>
                  </div>

                  {/* foot: "Explore" / "Close" mono 8.5px uppercase tracking .16em #6E6458, and a ↗ on the right */}
                  <div className="flex items-center justify-between pt-[10px] mt-[12px] border-t border-[rgba(80,66,44,0.16)]">
                    <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-[#6E6458] font-medium whitespace-nowrap">
                      {isOpen ? "Close" : "Explore"}
                    </span>
                    <span className="note-arrow text-[12px] text-[#6E6458] font-mono transition-transform duration-[420ms] ease-[cubic-bezier(0.23,1,0.32,1)] inline-block">
                      ↗
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Optional navigation link to About */}
        {onNavigate && (
          <div className="mt-8 md:mt-12 text-center relative z-[2]">
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
