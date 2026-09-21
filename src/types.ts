export interface CaseStudyStat {
  label: string;
  value: string;
  detail?: string;
}

export interface EvaluationRow {
  id: number;
  query: string;
  category: string;
  groundTruthSource: string;
  retrievalHitTop3: boolean;
  similarity: number;
  status: 'Pass' | 'Fallback (Pass)' | 'Fail';
  notes: string;
}

export interface CaseStudyDecision {
  title?: string;
  decision: string;
  why: string;
  tradeoff: string;
  result: string;
}

export interface OutcomeItem {
  category: 'Business Outcome' | 'Product Outcome' | 'User Outcome' | 'Operational Outcome';
  metric?: string;
  desc: string;
}

export interface CaseStudyQuickContext {
  problem: string;
  whyItMattered: string;
  myOwnership: string;
  whatChanged: string;
}

export interface CaseStudySection {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  content: string[];
  highlights?: { title: string; desc: string }[];
  quote?: string;
  tag?: string;
  diagramType?: 'workflow' | 'comparison' | 'bidding' | 'funnel' | 'architecture' | 'safety' | 'evaluation';
  workflowSteps?: { label: string; desc?: string }[];
  comparison?: {
    before: { title: string; steps: string[] };
    after: { title: string; steps: string[] };
  };
  evaluationTable?: EvaluationRow[];
  decision?: CaseStudyDecision;
  outcomeHierarchy?: OutcomeItem[];
  reflection?: string;
}

export interface CaseStudyDetail {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  thesis: string;
  centralQuestion?: string;
  productPhilosophy?: string;
  category: string;
  role: string;
  timeline: string;
  tags: string[];
  proofPoints: string[];
  isStrategyOnly?: boolean;
  statusNotice?: string;
  url?: string;
  label?: string;
  keyStats: CaseStudyStat[];
  quickContext?: CaseStudyQuickContext;
  tradeOff?: {
    considered: string;
    chose: string;
    why: string;
    gaveUp: string;
    outcome: string;
  };
  artifacts?: {
    title: string;
    subtitle?: string;
    type: 'spec' | 'schema' | 'telemetry' | 'decision';
    items: { label: string; value: string; desc?: string; code?: string }[];
  };
  outcomeHierarchy?: OutcomeItem[];
  reflection?: string;
  sections: CaseStudySection[];
}

export interface MoreWorkItem {
  title: string;
  description: string;
  tags: string[];
  scope: string;
}

export interface MoreWorkCategory {
  category: string;
  description: string;
  items: MoreWorkItem[];
}

export type MoreWorkCategoryType =
  | 'B2B & Platforms'
  | 'AI & Data'
  | 'Growth & Monetization'
  | 'Connected Products'
  | 'Operations & Automation';

export interface MoreProductWorkItem {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  storyAngle: string;
  company: string;
  period?: string;
  role: string;
  primaryCategory: MoreWorkCategoryType;
  tags: string[];
  metrics?: {
    value: string;
    label: string;
    context?: string;
  }[];
  problem: string;
  whyItMattered: string;
  myRole?: string;
  myOwnership: string;
  keyDecision: {
    title: string;
    decision: string;
    tradeoff?: string;
    why?: string;
  } | string;
  solution: {
    summary: string;
    steps?: { label: string; desc?: string }[];
    details?: string[];
  };
  outcome: {
    summary: string;
    type?: string;
    metrics?: { label: string; value: string }[];
  };
  reflection: string;
  heroImage?: string;
  relatedProjects: {
    title: string;
    slug: string;
    category: string;
    route: string;
  }[];
  route: string;
}

export interface ExperienceRole {
  title: string;
  company: string;
  period: string;
  type: string;
  description: string;
  focus?: string[];
  highlights: string[];
  skills: string[];
}

export interface LeadershipInfo {
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

export interface HowIWorkPrinciple {
  number: string;
  title: string;
  description: string;
  detail: string;
  aphorism?: string;
  evidence?: string;
  evidenceLink?: string;
}

export interface CapabilityGroup {
  category: string;
  skills: string[];
}
