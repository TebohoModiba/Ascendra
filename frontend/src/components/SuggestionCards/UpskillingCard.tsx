interface Props {
  items: string[];
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
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm text-slate-300">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-900/60 border border-blue-700 text-blue-300 text-xs flex items-center justify-center font-medium">
              {i + 1}
            </span>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}