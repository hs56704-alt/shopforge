import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Shield, Truck, RotateCcw } from "lucide-react";
import { Metadata } from "next";
import BuyButton from "@/components/store/buy-button";

interface Props {
  params: Promise<{ slug: string; productId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description ?? undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug, productId } = await params;

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { store: true },
  });

  if (!product || !product.published) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">

      {/* Back link */}
      <Link href={`/store/${slug}`}
        className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors mb-8">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to store
      </Link>

      <div className="grid md:grid-cols-2 gap-12">

        {/* Product image */}
        <div className="aspect-square md:aspect-auto md:h-[500px] rounded-3xl bg-white/[0.03] border border-white/[0.06] overflow-hidden flex items-center justify-center">
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <ShoppingBag className="h-16 w-16 text-white/10" />
          )}
        </div>

        {/* Product details */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <p className="text-xs text-white/30 uppercase tracking-widest mb-3">
              {product.store.name}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {product.name}
            </h1>
            {product.description && (
              <p className="text-white/40 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          {/* Price + stock */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold">
              ${product.price.toFixed(2)}
            </span>
            {product.inventory > 0 ? (
              <span className="text-sm text-green-400 bg-green-500/10 px-3 py-1 rounded-full">
                {product.inventory} in stock
              </span>
            ) : (
              <span className="text-sm text-red-400 bg-red-500/10 px-3 py-1 rounded-full">
                Sold out
              </span>
            )}
          </div>

          {/* Buy button */}
          <BuyButton
            productId={product.id}
            storeSlug={slug}
            disabled={product.inventory === 0}
            price={product.price}
            name={product.name}
          />

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/[0.06]">
            {[
              { icon: Shield, label: "Secure checkout" },
              { icon: Truck, label: "Fast shipping" },
              { icon: RotateCcw, label: "Easy returns" },
            ].map((badge) => (
              <div key={badge.label}
                className="flex flex-col items-center gap-1.5 text-center">
                <badge.icon className="h-4 w-4 text-white/20" />
                <span className="text-[10px] text-white/20">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}