import type { Job } from "@/types/api";
import { formatSalary } from "@/lib/api";

interface Props {
  jobs: Job[];
  country?: string;
}

export default function JobCard({ jobs, country = "us" }: Props) {
  if (jobs.length === 0) {
    return (
      <div className="bg-slate-800/60 backdrop-blur rounded-2xl border border-slate-700 p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">💼</span>
          <h2 className="text-lg font-semibold text-slate-100">
            Matching jobs
          </h2>
        </div>
        <p className="text-sm text-slate-400">
          No jobs found for this role right now.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/60 backdrop-blur rounded-2xl border border-slate-700 p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">💼</span>
        <h2 className="text-lg font-semibold text-slate-100">
          Matching jobs
          <span className="ml-2 text-xs font-normal text-slate-400">
            ({jobs.length})
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {jobs.map((j, i) => {
          const salary = formatSalary(j.salary_min, j.salary_max, country);
          return (
            <a
              key={i}
              href={j.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded-lg bg-slate-900/60 border border-slate-700 hover:border-blue-600 hover:bg-slate-900 transition group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-slate-100 group-hover:text-blue-400 transition truncate">
                    {j.title}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 truncate">
                    {j.company}
                    {j.location && ` · ${j.location}`}
                  </div>
                </div>
                <span className="flex-shrink-0 text-slate-500 group-hover:text-blue-400 transition">
                  ↗
                </span>
              </div>
              {salary && (
                <div className="mt-3 text-sm font-medium text-green-400">
                  {salary}
                </div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}