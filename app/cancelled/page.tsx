import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";

export default function CancelledPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[120px]" />
      </div>

      <div className="relative text-center max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="h-24 w-24 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <XCircle className="h-12 w-12 text-red-400" />
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Payment cancelled
        </h1>
        <p className="text-white/40 text-lg mb-8">
          Your payment was cancelled. No charges were made.
        </p>

        <Link href="/marketplace"
          className="inline-flex items-center gap-2 bg-white text-black font-medium px-6 py-3 rounded-xl hover:bg-white/90 transition-colors text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back to marketplace
        </Link>
      </div>
    </div>
  );
}