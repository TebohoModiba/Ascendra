"use client";

import { useState } from "react";
import UserInputForm from "@/components/UserInputForm";
import LoadingOverlay from "@/components/LoadingOverlay";
import OfflineBanner from "@/components/OfflineBanner";
import InstallPrompt from "@/components/InstallPrompt";
import ReadinessCard from "@/components/SuggestionCards/ReadinessCard";
import UpskillingCard from "@/components/SuggestionCards/UpskillingCard";
import AssignmentCard from "@/components/SuggestionCards/AssignmentCard";
import JobCard from "@/components/SuggestionCards/JobCard";
import OutreachCard from "@/components/SuggestionCards/OutreachCard";
import { fetchSuggestions } from "@/lib/api";
import type { SuggestionResponse, Country } from "@/types/api";

export default function Page() {
  const [data, setData] = useState<SuggestionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [country, setCountry] = useState<Country>("us");

  async function handleSubmit(input: { resume: string; target_role: string }) {
    setLoading(true);
    setError(null);
    setData(null);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 90_000);

    try {
      const result = await fetchSuggestions(
        { ...input, country },
        controller.signal,
      );
      setData(result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg.includes("aborted") ? "Request timed out. Try again." : msg);
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  }

  return (
    <>
      <OfflineBanner />
      <main className="min-h-screen px-4 py-6 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ascendra Agentic
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Your AI career pathfinder
          </p>
        </header>

        <UserInputForm
          onSubmit={handleSubmit}
          disabled={loading}
          country={country}
          onCountryChange={setCountry}
        />

        {error && (
          <div className="mt-6 p-4 rounded-lg bg-red-900/40 border border-red-700 text-red-200 text-sm">
            <strong className="font-semibold">Error:</strong> {error}
          </div>
        )}

        {loading && <LoadingOverlay />}

        {data && (
          <div className="mt-8 space-y-4 sm:space-y-6">
            <ReadinessCard
              score={data.readiness_score}
              careerMove={data.career_move_type}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <UpskillingCard items={data.upskilling} />
              <AssignmentCard items={data.assignments} />
              <OutreachCard contacts={data.contacts} />
              <div className="md:col-span-2 lg:col-span-3">
                <JobCard jobs={data.jobs} country={country} />
              </div>
            </div>
          </div>
        )}
      </main>

      <InstallPrompt />
    </>
  );
}