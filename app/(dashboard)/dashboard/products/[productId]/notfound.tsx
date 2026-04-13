import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="text-5xl mb-4">📦</div>
      <h2 className="text-xl font-bold mb-2">Product not found</h2>
      <p className="text-sm text-white/30 mb-6">
        This product doesn&apos;t exist or has been deleted.
      </p>
      <Link href="/dashboard/products"
        className="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors">
        Back to products
      </Link>
    </div>
  );
}