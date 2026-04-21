import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  ShoppingBag,
  Search,
  MoreHorizontal,
  Eye,
  EyeOff,
} from "lucide-react";

export default async function ProductsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const store = await prisma.store.findUnique({
    where: { ownerId: session.user.id },
    include: {
      products: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!store) redirect("/dashboard");

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-sm text-white/40 mt-1">
            {store.products.length} products in your store
          </p>
        </div>
        <Link href="/dashboard/products/new"
          className="flex items-center gap-2 bg-white text-black text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-white/90 transition-colors">
          <Plus className="h-4 w-4" />
          Add product
        </Link>
      </div>

      {/* Products table */}
      {store.products.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-16 text-center">
          <ShoppingBag className="h-10 w-10 text-white/10 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No products yet</h3>
          <p className="text-sm text-white/30 mb-6 max-w-sm mx-auto">
            Add your first product to start selling on your store.
          </p>
          <Link href="/dashboard/products/new"
            className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors">
            <Plus className="h-4 w-4" />
            Add your first product
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/[0.06] text-xs text-white/30 uppercase tracking-wider">
            <div className="col-span-5">Product</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">Inventory</div>
            <div className="col-span-2 text-right">Status</div>
            <div className="col-span-1" />
          </div>

          {/* Table rows */}
          <div className="divide-y divide-white/[0.04]">
            {store.products.map((product) => (
              <div key={product.id}
                className="flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4 px-4 md:px-6 py-4 hover:bg-white/[0.02] transition-colors border-b border-white/[0.02]">

                {/* Product info */}
                <div className="md:col-span-5 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                    {product.images[0] ? (
                      <img src={product.images[0]} alt={product.name}
                        className="h-full w-full object-cover rounded-xl" />
                    ) : (
                      <ShoppingBag className="h-5 w-5 text-white/20" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{product.name}</p>
                    <p className="text-xs text-white/30 truncate mt-0.5">{product.description ?? "No description"}</p>
                  </div>
                </div>

               {/* Mobile: show price + status in a row */}
                <div className="flex items-center justify-between md:contents">
                  <span className="md:col-span-2 text-sm font-semibold text-white md:text-right">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className={`md:col-span-2 text-sm md:text-right ${
                    product.inventory === 0 ? "text-red-400"
                    : product.inventory < 10 ? "text-amber-400"
                    : "text-white/60"
                  }`}>
                    {product.inventory} left
                  </span>
                  <span className={`md:col-span-2 inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium md:ml-auto ${
                    product.published
                      ? "bg-green-500/10 text-green-400"
                      : "bg-white/5 text-white/30"
                  }`}>
                    {product.published ? "Live" : "Draft"}
                  </span>
                  <Link href={`/dashboard/products/${product.id}`}
                    className="md:col-span-1 h-8 w-8 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors">
                    <MoreHorizontal className="h-4 w-4 text-white/30" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}