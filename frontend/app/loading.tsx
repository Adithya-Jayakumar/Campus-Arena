export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-48 rounded-2xl bg-slate-900 border border-slate-800" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-80 rounded-2xl bg-slate-900 border border-slate-800" />
        ))}
      </div>
    </div>
  );
}
