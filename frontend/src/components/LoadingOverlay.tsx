export default function LoadingOverlay() {
  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-center gap-3 text-slate-400">
        <div className="flex gap-1">
          <span
            className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-pink-400 animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
        <span className="text-sm">Agent is thinking...</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-slate-800/60 rounded-2xl border border-slate-700 p-6 space-y-3 animate-pulse-soft"
          >
            <div className="h-4 w-1/2 bg-slate-700 rounded" />
            <div className="h-3 w-full bg-slate-700 rounded" />
            <div className="h-3 w-5/6 bg-slate-700 rounded" />
            <div className="h-3 w-4/6 bg-slate-700 rounded" />
            <div className="h-3 w-full bg-slate-700 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}