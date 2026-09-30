export interface UserInput {
  resume: string;
  target_role: string;
  country?: string;
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
  upskilling: string[];
  assignments: string[];
  jobs: Job[];
  contacts: Contact[];
}

export type Country = "us" | "za" | "gb" | "ca" | "au";