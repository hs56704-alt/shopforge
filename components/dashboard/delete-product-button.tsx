"use client";

import { useState } from "react";
import { deleteProduct } from "@/lib/actions/product.actions";
import { Trash2, Loader2 } from "lucide-react";

export default function DeleteProductButton({
  productId,
}: {
  productId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  async function handleDelete() {
    if (!confirm) {
      setConfirm(true);
      setTimeout(() => setConfirm(false), 3000);
      return;
    }
    setLoading(true);
    await deleteProduct(productId);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className={`flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl transition-all duration-200 ${
        confirm
          ? "bg-red-500 text-white hover:bg-red-600"
          : "border border-white/[0.08] text-white/40 hover:text-red-400 hover:border-red-500/30"
      }`}>
      {loading
        ? <Loader2 className="h-4 w-4 animate-spin" />
        : <Trash2 className="h-4 w-4" />}
      {loading ? "Deleting..." : confirm ? "Click again to confirm" : "Delete"}
    </button>
  );
}