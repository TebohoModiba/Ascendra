"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [evt, setEvt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setEvt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!evt || dismissed) return null;

  async function install() {
    if (!evt) return;
    await evt.prompt();
    const { outcome } = await evt.userChoice;
    if (outcome === "accepted") setEvt(null);
    else setDismissed(true);
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-40 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl p-4 flex items-start gap-3">
      <div className="flex-1">
        <div className="text-sm font-medium text-slate-100">
          Install Ascendra
        </div>
        <div className="text-xs text-slate-400 mt-0.5">
          Add to home screen for faster access
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-slate-200 text-sm px-2"
        >
          Later
        </button>
        <button
          onClick={install}
          className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-1.5 rounded-md"
        >
          Install
        </button>
      </div>
    </div>
  );
}