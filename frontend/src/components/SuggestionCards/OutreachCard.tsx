"use client";

import { useState } from "react";
import type { Contact } from "@/types/api";

interface Props {
  contacts: Contact[];
}

export default function OutreachCard({ contacts }: Props) {
  const [copied, setCopied] = useState<string | null>(null);

  const grouped = contacts.reduce<Record<string, Contact[]>>((acc, c) => {
    const key = c.company ?? "Unknown";
    if (!acc[key]) acc[key] = [];
    acc[key].push(c);
    return acc;
  }, {});

  async function copyEmail(email: string) {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(email);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // clipboard unavailable
    }
  }

  if (contacts.length === 0) {
    return (
      <div className="bg-slate-800/60 backdrop-blur rounded-2xl border border-slate-700 p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">📧</span>
          <h2 className="text-lg font-semibold text-slate-100">
            Outreach contacts
          </h2>
        </div>
        <p className="text-sm text-slate-400">
          No contacts found for these companies yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/60 backdrop-blur rounded-2xl border border-slate-700 p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">📧</span>
        <h2 className="text-lg font-semibold text-slate-100">
          Outreach contacts
        </h2>
      </div>

      <div className="space-y-4">
        {Object.entries(grouped).map(([company, list]) => (
          <div key={company}>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
              {company}
            </div>
            <div className="space-y-2">
              {list.map((c, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-slate-900/60 border border-slate-700 hover:border-slate-600 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-slate-100 truncate">
                        {c.name ?? "(no name)"}
                      </div>
                      {c.position && (
                        <div className="text-xs text-slate-400 truncate">
                          {c.position}
                        </div>
                      )}
                      <div className="text-xs text-blue-400 truncate mt-1">
                        {c.email}
                      </div>
                    </div>
                    <button
                      onClick={() => copyEmail(c.email)}
                      className="flex-shrink-0 text-xs px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 transition"
                      title="Copy email"
                    >
                      {copied === c.email ? "✓" : "Copy"}
                    </button>
                  </div>
                  {c.confidence != null && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1 rounded-full bg-slate-700 overflow-hidden">
                        <div
                          className={`h-full ${
                            c.confidence >= 90
                              ? "bg-green-500"
                              : c.confidence >= 75
                                ? "bg-yellow-500"
                                : "bg-orange-500"
                          }`}
                          style={{ width: `${c.confidence}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 tabular-nums">
                        {c.confidence}%
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}