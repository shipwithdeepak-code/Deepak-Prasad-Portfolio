# Product Jury

> **A decision workspace that argues back.**  
> Challenge the product. Defend the decision.

[![Author](https://img.shields.io/badge/Built%20by-Deepak%20Prasad-amber.svg)](https://deepak-prasad.ai.studio/)
[![Case Study](https://img.shields.io/badge/Article-Product%20Jury%20Architecture-10b981.svg)](https://deepak-prasad.ai.studio/writing/product-jury)

Product Jury is an adversarial product review workspace designed to counter confirmation bias in product decision-making. Instead of acting as a passive generative assistant, Product Jury organizes structured cross-examinations of product proposals, user flows, and screenshots—auditing the empirical evidence behind every claim and identifying unvalidated assumptions before engineering cycles are committed.

---

## Core Architecture & Review Engine

### 1. Deliberation Panel (`AgentRole`)
Product Jury models review perspectives across distinct agent personas that evaluate proposals from first principles:
- **UX Researcher (`UX_RESEARCHER`):** Audits user journey friction, usability risks, and cognitive overhead, surfacing critical research questions.
- **Product Manager (`PRODUCT_MANAGER`):** Evaluates business goal alignment, value hypotheses, strategic risks, and required validation steps.
- **Design Critic (`DESIGN_CRITIC`):** Analyzes visual hierarchy, affordances, and interface clarity against stated user outcomes.
- **Evidence Auditor (`EVIDENCE_AUDITOR`):** Cross-checks claims across all agent positions to enforce evidentiary consistency.

### 2. Evidence Auditing & Status
Claims across reviews and proposals are categorized into concrete evidence states (`EvidenceStatus`):
- **FACT:** Directly verifiable via uploaded artifacts, screenshots, or explicit production telemetry.
- **INFERENCE:** Logical deductions supported by observable context.
- **ASSUMPTION:** Unvalidated hypotheses requiring empirical confirmation.
- **UNKNOWN:** Critical gaps in context, data, or user behavior.

The audit synthesizes these classifications into an overall evaluation (`overallEvidenceQuality`):  
`STRONG` · `MODERATE` · `WEAK` · `INSUFFICIENT`

### 3. Verdict Synthesis (`Verdict`)
The deliberative review culminates in an authoritative verdict:
- **SHIP:** Clear evidentiary support, low friction, and validated value hypothesis.
- **ITERATE:** Viable direction but requires refinement of user flow or core assumptions.
- **TEST:** High upside paired with critical unknowns that require experimental validation.
- **KILL:** Severe unmitigated strategic risks, fundamental friction, or unverified claims.

### 4. Interactive Red-Teaming
Beyond static verdicts, the workspace includes a dedicated **Red-Team interaction mode (`RedTeamModal`)** that simulates adversarial scenarios, edge cases, and failure modes to stress-test defended decisions.

---

## Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide React
- **Backend / Server:** Node.js, Express
- **AI & Model Layer:** Google Gen AI SDK (`@google/genai`) with Gemini models
- **Build Tooling:** Vite, tsx, esbuild

---

## Getting Started

### Prerequisites
- Node.js 18+
- Gemini API Key

### Setup & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/shipwithdeepak-code/product-jury.git
   cd product-jury
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Add your GEMINI_API_KEY in .env
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Author & Case Study

Product Jury was designed and engineered by **Deepak Prasad**, Senior Product Manager.

- **Portfolio:** [https://deepak-prasad.ai.studio/](https://deepak-prasad.ai.studio/)
- **Architecture Writeup:** [https://deepak-prasad.ai.studio/writing/product-jury](https://deepak-prasad.ai.studio/writing/product-jury)
- **LinkedIn:** [https://www.linkedin.com/in/deepakprasad96/](https://www.linkedin.com/in/deepakprasad96/)
