import type { TrendAnalysis } from "@/types/api";

interface Props {
  trend: TrendAnalysis;
}

const TREND_META = {
  rising: {
    icon: "📈",
    label: "Rising demand",
    color: "bg-green-900/40 border-green-700 text-green-300",
  },
  stable: {
    icon: "➡️",
    label: "Stable demand",
    color: "bg-blue-900/40 border-blue-700 text-blue-300",
  },
  cooling: {
    icon: "📉",
    label: "Cooling demand",
    color: "bg-orange-900/40 border-orange-700 text-orange-300",
  },
};

const CONFIDENCE_META = {
  high: { label: "High confidence", color: "text-green-400" },
  medium: { label: "Medium confidence", color: "text-yellow-400" },
  low: { label: "Low confidence", color: "text-orange-400" },
};

export default function TrendCard({ trend }: Props) {
  const meta = TREND_META[trend.demand_trend];
  const conf = CONFIDENCE_META[trend.confidence];

  if (trend.sample_size === 0) {
    return (
      <div className="bg-slate-800/60 backdrop-blur rounded-2xl border border-slate-700 p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">📊</span>
          <h2 className="text-lg font-semibold text-slate-100">Market trends</h2>
        </div>
        <p className="text-sm text-slate-400">
          Not enough live listings to analyze trends for this role.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/60 backdrop-blur rounded-2xl border border-slate-700 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          <h2 className="text-lg font-semibold text-slate-100">Market trends</h2>
        </div>
        <span className={`px-2 py-1 rounded-full border text-xs font-medium ${meta.color}`}>
          {meta.icon} {meta.label}
        </span>
      </div>

      <p className="text-sm text-slate-300 leading-relaxed mb-4">
        {trend.market_outlook}
      </p>

      {trend.emerging_skills.length > 0 && (
        <div className="mb-4">
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
            📈 Emerging skills
          </div>
          <div className="space-y-2">
            {trend.emerging_skills.map((s, i) => (
              <div
                key={i}
                className="p-2 rounded-lg bg-slate-900/60 border border-green-900/40"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-green-300">{s.skill}</span>
                  <span className="text-[10px] uppercase tracking-wide text-green-500">
                    {s.demand}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{s.why}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {trend.declining_skills.length > 0 && (
        <div className="mb-4">
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
            📉 Declining skills
          </div>
          <div className="space-y-2">
            {trend.declining_skills.map((s, i) => (
              <div
                key={i}
                className="p-2 rounded-lg bg-slate-900/60 border border-red-900/40"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-red-300">{s.skill}</span>
                  <span className="text-[10px] uppercase tracking-wide text-red-500">
                    {s.timeline}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{s.why}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {trend.hot_locations.length > 0 && (
        <div className="mb-4">
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
            📍 Top hiring locations
          </div>
          <div className="flex flex-wrap gap-1.5">
            {trend.hot_locations.map((loc, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded-md bg-slate-700/60 border border-slate-600 text-xs text-slate-300"
              >
                {loc.city}
                {loc.count != null && (
                  <span className="ml-1.5 text-slate-500">{loc.count}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {trend.salary_trend && (
        <div className="pt-3 border-t border-slate-700">
          <div className="text-xs text-slate-400">{trend.salary_trend}</div>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500">
        <span>Based on {trend.sample_size} live listings</span>
        <span className={conf.color}>{conf.label}</span>
      </div>
    </div>
  );
}