"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="h-16 w-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
        <span className="text-2xl">⚠️</span>
      </div>
      <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
      <p className="text-sm text-white/40 mb-6 max-w-sm">{error.message}</p>
      <button onClick={reset}
        className="bg-white text-black text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-white/90 transition-colors">
        Try again
      </button>
    </div>
  );
}