import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const store = await prisma.store.findUnique({ where: { slug } });
  if (!store) return { title: "Store not found" };
  return {
    title: `${store.name} — ShopForge`,
    description: store.description ?? `Shop at ${store.name}`,
  };
}

export default async function StorefrontPage({ params }: Props) {
  const { slug } = await params;

  const store = await prisma.store.findUnique({
    where: { slug },
    include: {
      products: {
        where: { published: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!store) notFound();

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">

      {/* Store hero */}
      <div className="text-center mb-16">
        <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-3xl font-bold mx-auto mb-6">
          {store.name[0].toUpperCase()}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          {store.name}
        </h1>
        {store.description && (
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            {store.description}
          </p>
        )}
        <div className="flex items-center justify-center gap-1 mt-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
          ))}
          <span className="text-sm text-white/30 ml-2">Verified Store</span>
        </div>
      </div>

      {/* Products grid */}
      {store.products.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag className="h-12 w-12 text-white/10 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No products yet</h2>
          <p className="text-white/30">
            This store hasn&apos;t added any products yet. Check back soon!
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold">
              All Products
              <span className="text-white/30 font-normal ml-2 text-base">
                ({store.products.length})
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {store.products.map((product) => (
              <Link key={product.id}
                href={`/store/${slug}/${product.id}`}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300">

                {/* Product image */}
                <div className="aspect-square bg-white/5 flex items-center justify-center overflow-hidden">
                  {product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <ShoppingBag className="h-10 w-10 text-white/10" />
                  )}
                </div>

                {/* Product info */}
                <div className="p-4">
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
        </>
      )}
    </main>
  );
}