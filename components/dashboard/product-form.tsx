"use client";

import { useState } from "react";
import { createProduct, updateProduct } from "@/lib/actions/product.actions";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ProductFormProps {
  product?: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    inventory: number;
    published: boolean;
  };
}

export default function ProductForm({ product }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [published, setPublished] = useState(product?.published ?? false);

  const isEditing = !!product;

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    formData.set("published", published.toString());

    const result = isEditing
      ? await updateProduct(product.id, formData)
      : await createProduct(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-5">

      {/* Back link */}
      <Link href="/dashboard/products"
        className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to products
      </Link>

      {/* Card */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 space-y-5">

        {/* Name */}
        <div>
          <label className="text-xs text-white/40 mb-1.5 block">
            Product name *
          </label>
          <input
            name="name"
            type="text"
            required
            defaultValue={product?.name}
            placeholder="e.g. Air Jordan 1 Retro"
            className="w-full bg-white/5 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-xs text-white/40 mb-1.5 block">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            defaultValue={product?.description ?? ""}
            placeholder="Describe your product..."
            className="w-full bg-white/5 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors resize-none"
          />
        </div>

        {/* Price + Inventory */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">
              Price ($) *
            </label>
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              required
              defaultValue={product?.price}
              placeholder="0.00"
              className="w-full bg-white/5 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">
              Inventory *
            </label>
            <input
              name="inventory"
              type="number"
              min="0"
              required
              defaultValue={product?.inventory}
              placeholder="0"
              className="w-full bg-white/5 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>
        </div>

        {/* Published toggle */}
        <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <div>
            <p className="text-sm font-medium text-white">Publish product</p>
            <p className="text-xs text-white/30 mt-0.5">
              Make this product visible on your store
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPublished(!published)}
            className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
              published ? "bg-violet-500" : "bg-white/10"
            }`}>
            <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200 ${
              published ? "translate-x-5" : "translate-x-0"
            }`} />
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-white text-black text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading
            ? "Saving..."
            : isEditing
            ? "Save changes"
            : "Add product"}
        </button>
        <Link href="/dashboard/products"
          className="text-sm text-white/30 hover:text-white transition-colors px-4 py-2.5">
          Cancel
        </Link>
      </div>
    </form>
  );
}