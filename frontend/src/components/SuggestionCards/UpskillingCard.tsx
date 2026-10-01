import type { UpskillingItem } from "@/types/api";

interface Props {
  items: UpskillingItem[];
}

export default function UpskillingCard({ items }: Props) {
  return (
    <div className="bg-slate-800/60 backdrop-blur rounded-2xl border border-slate-700 p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">📚</span>
        <h2 className="text-lg font-semibold text-slate-100">
          Skills to learn
        </h2>
      </div>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm text-slate-300">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-900/60 border border-blue-700 text-blue-300 text-xs flex items-center justify-center font-medium">
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-slate-100">{item.skill}</div>
              <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                {item.why_it_matters}
              </div>
              {item.suggested_steps?.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {item.suggested_steps.map((step, j) => (
                    <li
                      key={j}
                      className="text-xs text-slate-400 pl-3 relative before:content-['›'] before:absolute before:left-0 before:text-slate-500"
                    >
                      {step}
                    </li>
                  ))}
                </ul>
              )}
              {item.estimated_weeks > 0 && (
                <div className="mt-2 text-[10px] text-slate-500 uppercase tracking-wide">
                  ~{item.estimated_weeks} weeks
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}