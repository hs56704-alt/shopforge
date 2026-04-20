import Link from "next/link";
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";

interface Props {
  searchParams: Promise<{ orderId?: string; storeSlug?: string }>;
}

export default async function SuccessPage({ searchParams }: Props) {
  const { orderId, storeSlug } = await searchParams;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-green-600/10 blur-[120px]" />
      </div>

      <div className="relative text-center max-w-md">

        {/* Success icon */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-24 w-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-400" />
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Payment successful!
        </h1>
        <p className="text-white/40 text-lg mb-3">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {orderId && (
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/[0.08] rounded-xl px-4 py-2 mb-8">
            <span className="text-xs text-white/30">Order ID:</span>
            <span className="text-xs text-white/60 font-mono">
              {orderId.slice(-12).toUpperCase()}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {storeSlug && (
            <Link href={`/store/${storeSlug}`}
              className="flex items-center gap-2 bg-white text-black font-medium px-6 py-3 rounded-xl hover:bg-white/90 transition-colors text-sm">
              <ShoppingBag className="h-4 w-4" />
              Continue shopping
            </Link>
          )}
          <Link href="/marketplace"
            className="flex items-center gap-2 border border-white/[0.08] text-white/60 hover:text-white px-6 py-3 rounded-xl transition-colors text-sm">
            Browse marketplace
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}