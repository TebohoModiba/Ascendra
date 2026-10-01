import type { CareerMoveType } from "@/types/api";

interface Props {
  score: number;
  careerMove: CareerMoveType;
}

const CAREER_LABELS: Record<CareerMoveType, string> = {
  vertical: "Vertical progression",
  horizontal: "Horizontal pivot",
  "cross-industry": "Cross-industry transition",
};

export default function ReadinessCard({ score, careerMove }: Props) {
  const barColor =
    score >= 80
      ? "bg-green-500"
      : score >= 60
        ? "bg-blue-500"
        : score >= 40
          ? "bg-yellow-500"
          : "bg-orange-500";

  const verdict =
    score >= 80
      ? "Strong fit — ready to apply"
      : score >= 60
        ? "Close — a few gaps to close"
        : score >= 40
          ? "Meaningful gaps to bridge"
          : "Significant preparation needed";

  return (
    <div className="bg-slate-800/60 backdrop-blur rounded-2xl border border-slate-700 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          <h2 className="text-lg font-semibold text-slate-100">
            Readiness score
          </h2>
        </div>
        <div className="text-3xl font-bold text-slate-100 tabular-nums">
          {score}
          <span className="text-base text-slate-500 font-normal">/100</span>
        </div>
      </div>

      <div className="h-3 rounded-full bg-slate-700 overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-700`}
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-slate-400">{verdict}</span>
        <span className="px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
          {CAREER_LABELS[careerMove]}
        </span>
      </div>
    </div>
  );
}