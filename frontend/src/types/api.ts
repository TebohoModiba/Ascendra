export interface UserInput {
  resume: string;
  target_role: string;
  country?: string;
}

export type CareerMoveType = "vertical" | "horizontal" | "cross-industry";

// ---- AI reasoning ----

export interface TransferableSkill {
  has: string;
  maps_to: string;
}

export interface MissingSkill {
  skill: string;
  importance: "high" | "medium" | "low";
  difficulty: "easy" | "medium" | "hard";
  priority: number;
}

export interface GapAnalysis {
  matched_skills: string[];
  transferable_skills: TransferableSkill[];
  missing_skills: MissingSkill[];
  seniority_delta: string;
}

export interface UpskillingItem {
  skill: string;
  why_it_matters: string;
  suggested_steps: string[];
  estimated_weeks: number;
}

// ---- External data ----

export interface Contact {
  name: string | null;
  email: string;
  position: string | null;
  confidence: number | null;
  company: string | null;
}

export interface Job {
  title: string;
  company: string;
  location: string | null;
  url: string;
  salary_min: number | null;
  salary_max: number | null;
}

// ---- Trend analysis ----

export interface EmergingSkill {
  skill: string;
  why: string;
  demand: "high" | "medium";
}

export interface DecliningSkill {
  skill: string;
  why: string;
  timeline: string;
}

export interface HotLocation {
  city: string;
  count: number | null;
}

export interface SalaryRange {
  min: number | null;
  max: number | null;
  median: number | null;
}

export interface TrendAnalysis {
  market_outlook: string;
  demand_trend: "rising" | "stable" | "cooling";
  emerging_skills: EmergingSkill[];
  declining_skills: DecliningSkill[];
  salary_trend: string;
  hot_locations: HotLocation[];
  top_companies: string[];
  salary_range: SalaryRange | null;
  sample_size: number;
  confidence: "high" | "medium" | "low";
}

// ---- API response ----

export interface SuggestionResponse {
  readiness_score: number;
  career_move_type: CareerMoveType;
  gap_analysis: GapAnalysis;
  upskilling: UpskillingItem[];
  assignments: string[];
  jobs: Job[];
  contacts: Contact[];
  trend_analysis: TrendAnalysis;
}

export type Country = "us" | "za" | "gb" | "ca" | "au";