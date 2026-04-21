import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const store = await prisma.store.findUnique({
    where: { slug },
  });

  if (!store) notFound();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Storefront Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/70 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <Link href={`/store/${slug}`} className="font-semibold tracking-tight">
            {store.name}
          </Link>
          <Link href="/" className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white transition-colors">
            <Logo size="sm" href="" showText={false} />
            <span>Powered by ShopForge</span>
          </Link>
        </div>
      </header>

      {/* Page content */}
      {children}

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 mt-16">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
          <p className="text-xs text-white/20">
            © 2025 {store.name}. All rights reserved.
          </p>
          <Link href="/" className="flex items-center gap-1.5 text-xs text-white/20 hover:text-white/50 transition-colors">
            <Logo size="sm" href="" showText={false} />
            <span>Powered by ShopForge</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}