import type { UserInput, SuggestionResponse } from "@/types/api";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function fetchSuggestions(
  input: UserInput,
  signal?: AbortSignal,
): Promise<SuggestionResponse> {
  const r = await fetch(`${API}/api/suggest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
    signal,
  });

  if (!r.ok) {
    const text = await r.text().catch(() => "");
    throw new Error(`API ${r.status}: ${text.slice(0, 200)}`);
  }

  return r.json();
}

export function formatSalary(
  min: number | null,
  max: number | null,
  country: string = "us",
): string | null {
  if (min == null) return null;
  const currency = country === "za" ? "ZAR" : country === "gb" ? "GBP" : "USD";
  const symbol = currency === "ZAR" ? "R" : currency === "GBP" ? "£" : "$";

  const fmt = (n: number) => `${symbol}${Math.round(n / 1000)}k`;

  if (max == null || Math.abs(max - min) < 1) return `~${fmt(min)}`;
  return `${fmt(min)} – ${fmt(max)}`;
}