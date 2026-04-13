"use client";

import { useState } from "react";
import { ShoppingBag, Zap, BarChart3, Shield, Globe } from "lucide-react";
import Image from "next/image";

const highlights = [
  {
    id: "products",
    label: "Products",
    icon: ShoppingBag,
    headline: "Manage everything\nfrom one place.",
    sub: "Add products, set prices, track inventory. Your entire catalog — beautifully organized.",
    visual: (
  <div className="grid grid-cols-2 gap-4 p-4 py-24">  
    {[
      {
        name: "Air Jordan 1",
        price: "$180",
        stock: "42 left",
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
      },
      {
        name: "Nike Dunk Low",
        price: "$120",
        stock: "8 left",
        img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200&h=200&fit=crop",
      },
      {
        name: "Ultraboost 23",
        price: "$190",
        stock: "31 left",
        img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=200&fit=crop",
      },
      {
        name: "New Balance",
        price: "$185",
        stock: "Sold out",
        img: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=200&h=200&fit=crop",
      },
    ].map((p) => (
      <div key={p.name} className="rounded-xl bg-white/5 border border-white/[0.06] p-3 flex items-center gap-3">
        {/* ← horizontal layout instead of vertical */}
        <div className="relative h-12 w-12 rounded-xl overflow-hidden flex-shrink-0">
          <Image src={p.img} alt={p.name} fill className="object-cover" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-medium text-white truncate">{p.name}</div>
          <div className="text-[10px] text-white/30 mt-0.5">{p.stock}</div>
          <div className="text-sm font-bold text-white mt-1">{p.price}</div>
        </div>
      </div>
    ))}
  </div>
),
  },
  {
    id: "performance",
    label: "Performance",
    icon: Zap,
    headline: "Blazing fast.\nEvery single time.",
    sub: "Under 1 second load time. Built on Next.js 15 with edge caching globally.",
    visual: (
      <div className="flex flex-col items-center justify-center h-full gap-6 p-8">
        <div className="relative">
          <div className="h-44 w-44 rounded-full border border-amber-500/20 flex items-center justify-center">
            <div className="h-32 w-32 rounded-full border border-amber-500/30 flex items-center justify-center">
              <div className="h-20 w-20 rounded-full bg-amber-500/10 border border-amber-500/40 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-amber-400">98</span>
                <span className="text-[10px] text-amber-400/60">score</span>
              </div>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full font-semibold">
            Excellent
          </div>
        </div>
        <div className="w-full space-y-2.5">
          {[
            { label: "FCP", value: "0.4s", pct: 95 },
            { label: "LCP", value: "0.8s", pct: 88 },
            { label: "TTI", value: "0.9s", pct: 92 },
          ].map((m) => (
            <div key={m.label} className="flex items-center gap-3">
              <span className="text-xs text-white/30 w-8">{m.label}</span>
              <div className="flex-1 h-1 rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-400"
                  style={{ width: `${m.pct}%` }}
                />
              </div>
              <span className="text-xs text-amber-400 font-medium w-8 text-right">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    headline: "Data you can\nactually use.",
    sub: "Real-time revenue, order trends, and customer insights — all in one beautiful dashboard.",
    visual: (
     
      <div className="p-6 space-y-4 py-12">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Revenue", value: "$24,829" },
            { label: "Orders", value: "1,284" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-white/5 border border-white/[0.06] p-4">
              <div className="text-xs text-white/30 mb-1">{s.label}</div>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-green-400 mt-1">↑ This week</div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/[0.06] p-4">
          <div className="text-xs text-white/30 mb-3">Revenue over time</div>
          <div className="flex items-end gap-1.5 h-20">
            {[30, 50, 40, 70, 55, 85, 65, 95, 70, 88, 75, 100].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-blue-600 to-cyan-400"
                style={{ height: `${h}%`, opacity: 0.5 + i * 0.04 }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {["Jan","Feb","Mar","Apr","May","Jun"].map((m) => (
              <span key={m} className="text-[10px] text-white/20">{m}</span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    headline: "Enterprise-grade\nprotection.",
    sub: "SSL, PCI compliance, fraud detection, and daily backups. All included, always on.",
    visual: (
      <div className="flex flex-col gap-2.5 p-6 justify-center h-full">
        {[
          { label: "SSL Certificate", status: "Active", icon: "🔒" },
          { label: "PCI Compliance", status: "Verified", icon: "✅" },
          { label: "Fraud Detection", status: "Running", icon: "🛡️" },
          { label: "Auto Backups", status: "Daily", icon: "💾" },
          { label: "DDoS Protection", status: "Enabled", icon: "🔐" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/[0.06] px-4 py-3"
          >
            <span>{item.icon}</span>
            <span className="flex-1 text-sm text-white/70">{item.label}</span>
            <span className="text-[10px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full font-medium">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "global",
    label: "Global",
    icon: Globe,
    headline: "Sell to anyone.\nAnywhere on earth.",
    sub: "180+ currencies, automatic tax calculation, and multi-language storefronts built in.",
    visual: (
      <div className="grid grid-cols-3 gap-2.5 p-6 py-18">
        {[
          { country: "🇺🇸", name: "USD", sales: "$12.4k" },
          { country: "🇬🇧", name: "GBP", sales: "$8.1k" },
          { country: "🇪🇺", name: "EUR", sales: "$9.3k" },
          { country: "🇯🇵", name: "JPY", sales: "$5.7k" },
          { country: "🇨🇦", name: "CAD", sales: "$4.2k" },
          { country: "🇦🇺", name: "AUD", sales: "$3.8k" },
        ].map((c) => (
          <div
            key={c.name}
            className="rounded-2xl bg-white/5 border border-white/[0.06] p-3 text-center"
          >
            <div className="text-3xl mb-1">{c.country}</div>
            <div className="text-[10px] text-white/30 uppercase tracking-wider">{c.name}</div>
            <div className="text-xs font-bold text-white mt-1">{c.sales}</div>
          </div>
        ))}
      </div>
    ),
  },
];

export default function HighlightsTabs() {
  const [active, setActive] = useState("products");
  const current = highlights.find((h) => h.id === active)!;

  return (
    <section className="bg-[#f5f5f7] text-black py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs tracking-widest text-black/30 uppercase text-center mb-4">
          Highlights
        </p>
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-center mb-16">
          Get the full picture.
        </h2>

        {/* Tab strip */}
        <div className="flex items-center justify-center gap-1 bg-black/5 rounded-2xl p-1.5 mb-12 flex-wrap">
          {highlights.map((h) => {
            const Icon = h.icon;
            return (
              <button
                key={h.id}
                onClick={() => setActive(h.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active === h.id
                    ? "bg-white text-black shadow-sm"
                    : "text-black/40 hover:text-black/70"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {h.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div
          key={active}
          className="grid lg:grid-cols-2 gap-12 items-center"
          style={{ animation: "fadeUp 0.4s ease forwards" }}
        >
          <div>
            <h3 className="text-4xl font-bold tracking-tight leading-tight mb-4 whitespace-pre-line">
              {current.headline}
            </h3>
            <p className="text-black/40 text-lg leading-relaxed">{current.sub}</p>
          </div>

          <div
            className="rounded-3xl bg-black border border-black/[0.06] overflow-hidden"
            style={{ height: "420px" }}
          >
            {current.visual}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}