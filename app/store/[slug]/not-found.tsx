import Link from "next/link";

export default function StoreNotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-6">🏪</div>
        <h1 className="text-3xl font-bold mb-3">Store not found</h1>
        <p className="text-white/40 mb-8">
          This store doesn&apos;t exist or has been removed.
        </p>
        <Link href="/"
          className="bg-white text-black font-medium px-6 py-3 rounded-xl hover:bg-white/90 transition-colors">
          Go to ShopForge
        </Link>
      </div>
    </div>
  );
}