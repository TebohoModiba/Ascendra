export interface UserInput {
  resume: string;
  target_role: string;
  country?: string;
}

export type CareerMoveType = "vertical" | "horizontal" | "cross-industry";

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

export interface SuggestionResponse {
  readiness_score: number;
  career_move_type: CareerMoveType;
  gap_analysis: GapAnalysis;
  upskilling: UpskillingItem[];
  assignments: string[];
  jobs: Job[];
  contacts: Contact[];
}

export type Country = "us" | "za" | "gb" | "ca" | "au";