"use client";

import { useState } from "react";
import type { Country } from "@/types/api";

const COUNTRIES: { code: Country; label: string; flag: string }[] = [
  { code: "us", label: "USA", flag: "🇺🇸" },
  { code: "za", label: "South Africa", flag: "🇿🇦" },
  { code: "gb", label: "UK", flag: "🇬🇧" },
  { code: "ca", label: "Canada", flag: "🇨🇦" },
  { code: "au", label: "Australia", flag: "🇦🇺" },
];

interface Props {
  onSubmit: (input: { resume: string; target_role: string }) => void;
  disabled?: boolean;
  country: Country;
  onCountryChange: (c: Country) => void;
}

export default function UserInputForm({
  onSubmit,
  disabled,
  country,
  onCountryChange,
}: Props) {
  const [resume, setResume] = useState("");
  const [targetRole, setTargetRole] = useState("");

  const canSubmit =
    resume.trim().length >= 20 && targetRole.trim().length >= 2 && !disabled;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({ resume: resume.trim(), target_role: targetRole.trim() });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800/60 backdrop-blur rounded-2xl border border-slate-700 p-4 sm:p-6 space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Job market
        </label>
        <div className="flex flex-wrap gap-2">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => onCountryChange(c.code)}
              disabled={disabled}
              className={`px-3 py-2 rounded-lg text-sm transition border ${
                country === c.code
                  ? "bg-blue-600 border-blue-500 text-white"
                  : "bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700"
              } disabled:opacity-50`}
            >
              <span className="mr-1">{c.flag}</span>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          Target role
        </label>
        <input
          id="role"
          type="text"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          placeholder="e.g. Senior Backend Engineer"
          maxLength={200}
          disabled={disabled}
          className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
        />
      </div>

      <div>
        <label
          htmlFor="resume"
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          Your resume / background
        </label>
        <textarea
          id="resume"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          placeholder="Paste your resume or describe your experience..."
          rows={8}
          maxLength={20000}
          disabled={disabled}
          className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y disabled:opacity-50"
        />
        <div className="mt-1 text-xs text-slate-500 text-right">
          {resume.length} / 20000
        </div>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full min-h-[48px] px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium transition hover:from-blue-500 hover:to-purple-500 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        {disabled ? "Analyzing..." : "Find my path"}
      </button>
    </form>
  );
}