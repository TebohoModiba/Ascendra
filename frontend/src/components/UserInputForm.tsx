"use client";

import { useState } from "react";
import FileUploader from "@/components/FileUploader";
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
  const [mode, setMode] = useState<"upload" | "paste">("upload");
  const [resume, setResume] = useState("");
  const [targetRole, setTargetRole] = useState("");

  const canSubmit =
    resume.trim().length >= 20 && targetRole.trim().length >= 2 && !disabled;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({ resume: resume.trim(), target_role: targetRole.trim() });
  }

  function switchMode(next: "upload" | "paste") {
    setMode(next);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800/60 backdrop-blur rounded-2xl border border-slate-700 p-4 sm:p-6 space-y-4"
    >
      {/* Country selector */}
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

      {/* Target role */}
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

      {/* Mode toggle */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-slate-300">
            Your CV
          </label>
          <div className="flex gap-1 bg-slate-900/60 rounded-lg p-0.5 border border-slate-700">
            <button
              type="button"
              onClick={() => switchMode("upload")}
              disabled={disabled}
              className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                mode === "upload"
                  ? "bg-slate-700 text-slate-100"
                  : "text-slate-400 hover:text-slate-200"
              } disabled:opacity-50`}
            >
              📎 Upload
            </button>
            <button
              type="button"
              onClick={() => switchMode("paste")}
              disabled={disabled}
              className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                mode === "paste"
                  ? "bg-slate-700 text-slate-100"
                  : "text-slate-400 hover:text-slate-200"
              } disabled:opacity-50`}
            >
              ✏️ Paste
            </button>
          </div>
        </div>

        {mode === "upload" ? (
          <FileUploader
            onExtracted={(text) => setResume(text)}
            disabled={disabled}
          />
        ) : (
          <>
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
          </>
        )}

        {/* Preview of extracted text */}
        {mode === "upload" && resume.length > 0 && (
          <div className="mt-3">
            <div className="text-xs text-slate-500 mb-1">
              Extracted preview ({resume.length} chars):
            </div>
            <div className="max-h-32 overflow-y-auto text-xs text-slate-400 bg-slate-900/60 border border-slate-700 rounded-lg p-3 leading-relaxed whitespace-pre-wrap">
              {resume.slice(0, 600)}
              {resume.length > 600 && "..."}
            </div>
          </div>
        )}
      </div>

      {/* Submit — sticky on mobile, normal on desktop */}
      <div className="sticky bottom-3 sm:static z-10 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 bg-gradient-to-t from-slate-900 via-slate-800/95 to-transparent sm:bg-none sm:from-transparent sm:via-transparent">
        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full min-h-12 px-6 py-3 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium transition hover:from-blue-500 hover:to-purple-500 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lg shadow-black/40 sm:shadow-none"
        >
          {disabled ? "Analyzing..." : "Find my path"}
        </button>
      </div>
    </form>
  );
}