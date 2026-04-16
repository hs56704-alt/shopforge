import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ShoppingBag, Search, Store } from "lucide-react";
import { Metadata } from "next";
import MarketplaceSearch from "@/components/marketplace/marketplace-search";
import SortSelect from "@/components/marketplace/sort-select";

export const metadata: Metadata = {
  title: "Marketplace — ShopForge",
  description: "Discover products from thousands of stores",
};

interface Props {
  searchParams: Promise<{ q?: string; min?: string; max?: string; sort?: string }>;
}

export default async function MarketplacePage({ searchParams }: Props) {
  const { q, min, max, sort } = await searchParams;

  // Fetch all published products across ALL stores
  const products = await prisma.product.findMany({
    where: {
      published: true,
      ...(q && {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      }),
      ...(min && { price: { gte: parseFloat(min) } }),
      ...(max && { price: { lte: parseFloat(max) } }),
    },
    orderBy:
      sort === "price_asc"
        ? { price: "asc" }
        : sort === "price_desc"
        ? { price: "desc" }
        : { createdAt: "desc" },
    include: {
      store: {
        select: { name: true, slug: true },
      },
    },
  });

  // Fetch all stores for sidebar
  const stores = await prisma.store.findMany({
    select: { name: true, slug: true, _count: { select: { products: true } } },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/70 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-violet-500 to-blue-500" />
            <span className="font-semibold text-sm">ShopForge</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm text-white/40">
            <Link href="/marketplace"
              className="text-white font-medium">
              Marketplace
            </Link>
            <Link href="/"
              className="hover:text-white transition-colors">
              Home
            </Link>
          </nav>
          <Link href="/login"
            className="text-sm bg-white text-black font-medium px-4 py-1.5 rounded-full hover:bg-white/90 transition-colors">
            Sell on ShopForge
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-white/[0.06] bg-black py-16 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs tracking-widest text-white/30 uppercase mb-4">
            Marketplace
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Discover amazing products
          </h1>
          <p className="text-white/40 mb-8">
            Shop from thousands of independent stores — all in one place.
          </p>

          {/* Search */}
          <MarketplaceSearch initialQuery={q ?? ""} />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex gap-8">

          {/* Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">

            {/* Filters */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 mb-5">
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">
                Price Range
              </h3>
              <form className="space-y-3">
                <div>
                  <label className="text-xs text-white/30 mb-1 block">Min price</label>
                  <input
                    name="min"
                    type="number"
                    defaultValue={min}
                    placeholder="$0"
                    className="w-full bg-white/5 border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/30 mb-1 block">Max price</label>
                  <input
                    name="max"
                    type="number"
                    defaultValue={max}
                    placeholder="$999"
                    className="w-full bg-white/5 border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium py-2 rounded-lg transition-colors">
                  Apply filters
                </button>
              </form>
            </div>

            {/* Stores */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">
                Stores
              </h3>
              <div className="space-y-2">
                {stores.map((store) => (
                  <Link key={store.slug}
                    href={`/store/${store.slug}`}
                    className="flex items-center justify-between py-1.5 text-sm text-white/50 hover:text-white transition-colors group">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-md bg-gradient-to-br from-violet-500/50 to-blue-500/50 flex items-center justify-center text-[10px] font-bold">
                        {store.name[0]}
                      </div>
                      <span className="truncate max-w-[100px]">{store.name}</span>
                    </div>
                    <span className="text-xs text-white/20">
                      {store._count.products}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-white/40">
                {products.length === 0
                  ? "No products found"
                  : `${products.length} product${products.length !== 1 ? "s" : ""} found`}
                {q && (
                  <span className="text-white/60"> for &quot;{q}&quot;</span>
                )}
              </p>

              {/* Sort */}
              <SortSelect currentSort={sort ?? "newest"} />
            </div>

            {/* Products grid */}
            {products.length === 0 ? (
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-16 text-center">
                <ShoppingBag className="h-10 w-10 text-white/10 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-sm text-white/30 max-w-sm mx-auto">
                  {q
                    ? `No products match "${q}". Try a different search.`
                    : "No products available yet. Check back soon!"}
                </p>
                {q && (
                  <Link href="/marketplace"
                    className="inline-block mt-4 text-sm text-violet-400 hover:text-violet-300 transition-colors">
                    Clear search
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <Link key={product.id}
                    href={`/store/${product.store.slug}/${product.id}`}
                    className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300">

                    {/* Image */}
                    <div className="aspect-square bg-white/5 flex items-center justify-center overflow-hidden">
                      {product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <ShoppingBag className="h-8 w-8 text-white/10" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      {/* Store badge */}
                      <div className="flex items-center gap-1 mb-2">
                        <Store className="h-3 w-3 text-white/20" />
                        <span className="text-[10px] text-white/20 truncate">
                          {product.store.name}
                        </span>
                      </div>

                      <h3 className="text-sm font-medium text-white truncate">
                        {product.name}
                      </h3>

                      {product.description && (
                        <p className="text-xs text-white/30 mt-1 truncate">
                          {product.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <span className="text-base font-bold text-white">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          product.inventory > 0
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}>
                          {product.inventory > 0 ? "In stock" : "Sold out"}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}