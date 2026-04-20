"use client";

import { useState } from "react";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface BuyButtonProps {
  productId: string;
  storeSlug: string;
  disabled: boolean;
  price: number;
  name: string;
}

function loadRazorpay(): Promise<boolean>{
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function BuyButton({
  productId,
  storeSlug,
  disabled,
  price,
  name,
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleBuy() {
    setLoading(true);
    try {

      const loaded = await loadRazorpay();
      if (!loaded) {
        alert("Failed to load payment gateway. Please try again.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, storeSlug, price, name }),
      });

      const data = await res.json();

      if(!res.ok) {
        alert(data.error ?? "Failed to create order");
        setLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "ShopForge",
        description: data.productName,
        order_id: data.orderId,
        handler: function (response: any) {
          router.push(`/success?orderId=${response.razorpay_order_id}&storeSlug=${data.storeSlug}`);
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#7c3aed",
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
      setLoading(false);
    }
      catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong. Please try again.");
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
        ? "Loading Payment..."
        : disabled
        ? "Sold out"
        : `Buy now — \u20B9 ${price.toFixed(2)}`}
    </button>
  );
}