"use client";

import { useState } from "react";
import { ShoppingCart, Loader2 } from "lucide-react";

interface BuyButtonProps {
  productId: string;
  storeSlug: string;
  disabled: boolean;
  price: number;
  name: string;
}

export default function BuyButton({
  productId,
  storeSlug,
  disabled,
  price,
  name,
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, storeSlug, price, name }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout failed. Please try again.");
        setLoading(false);
      }
    } catch {
      alert("Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleBuy}
      disabled={disabled || loading}
      className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-4 rounded-2xl hover:bg-white/90 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-base">
      {loading
        ? <Loader2 className="h-5 w-5 animate-spin" />
        : <ShoppingCart className="h-5 w-5" />}
      {loading
        ? "Redirecting to checkout..."
        : disabled
        ? "Sold out"
        : `Buy now — $${price.toFixed(2)}`}
    </button>
  );
}