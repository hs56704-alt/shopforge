export default function DashboardLoading() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-7 w-48 rounded-xl bg-white/5 animate-pulse" />
        <div className="h-4 w-72 rounded-lg bg-white/5 animate-pulse" />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 space-y-4">
            <div className="flex justify-between">
              <div className="h-10 w-10 rounded-xl bg-white/5 animate-pulse" />
              <div className="h-4 w-12 rounded-lg bg-white/5 animate-pulse" />
            </div>
            <div className="h-7 w-20 rounded-lg bg-white/5 animate-pulse" />
            <div className="h-3 w-16 rounded bg-white/5 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Content skeleton */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 h-80 animate-pulse" />
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 h-80 animate-pulse" />
      </div>
    </div>
  );
}