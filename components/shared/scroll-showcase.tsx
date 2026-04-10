"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingBag, BarChart3, Zap, Shield, Globe, Palette } from "lucide-react";

const slides = [
  {
    id: 0,
    tag: "Product Management",
    icon: ShoppingBag,
    headline: "Your products.\nBeautifully organized.",
    sub: "Add unlimited products, manage inventory, set variants — all from one clean dashboard that just works.",
    gradient: "from-violet-600 to-purple-800",
    accent: "#7c3aed",
    ui: (
      <div className="w-full h-full flex flex-col gap-3 p-6">
        {[
          { name: "Air Jordan 1 Retro", price: "$180", stock: 42, color: "bg-violet-500" },
          { name: "Nike Dunk Low Panda", price: "$120", stock: 8, color: "bg-blue-500" },
          { name: "Adidas Ultraboost 23", price: "$190", stock: 31, color: "bg-cyan-500" },
          { name: "New Balance 990v5", price: "$185", stock: 0, color: "bg-pink-500" },
        ].map((p, i) => (
          <div key={i} className="flex items-center gap-4 rounded-xl bg-white/5 border border-white/8 px-4 py-3">
            <div className={`h-10 w-10 rounded-lg ${p.color} flex-shrink-0`} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{p.name}</div>
              <div className="text-xs text-white/40">{p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}</div>
            </div>
            <div className="text-sm font-semibold text-white">{p.price}</div>
            <div className={`text-xs px-2 py-0.5 rounded-full ${p.stock > 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
              {p.stock > 0 ? "Live" : "Sold out"}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 1,
    tag: "Real-time Analytics",
    icon: BarChart3,
    headline: "Data that drives\ndecisions.",
    sub: "Watch revenue, orders, and customer behavior update in real time. Know exactly what's working.",
    gradient: "from-blue-600 to-cyan-700",
    accent: "#2563eb",
    ui: (
      <div className="w-full h-full flex flex-col gap-4 p-6">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Revenue", value: "$24,829", change: "+18%" },
            { label: "Orders", value: "1,284", change: "+12%" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-white/5 border border-white/8 p-4">
              <div className="text-xs text-white/40 mb-1">{s.label}</div>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-green-400 mt-1">{s.change} this week</div>
            </div>
          ))}
        </div>
        {/* Fake bar chart */}
        <div className="flex-1 rounded-xl bg-white/5 border border-white/8 p-4 flex flex-col justify-end">
          <div className="flex items-end gap-2 h-24">
            {[40, 65, 45, 80, 60, 90, 75, 95, 70, 85, 65, 100].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-500 to-cyan-400"
                style={{ height: `${h}%`, opacity: 0.6 + i * 0.03 }} />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {["Jan","Feb","Mar","Apr","May","Jun"].map(m => (
              <span key={m} className="text-[10px] text-white/20">{m}</span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    tag: "Lightning Performance",
    icon: Zap,
    headline: "Blazing fast.\nEvery time.",
    sub: "Built on Next.js 15 with edge caching. Your storefront loads in under a second — anywhere in the world.",
    gradient: "from-amber-500 to-orange-600",
    accent: "#f59e0b",
    ui: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-6">
        <div className="relative flex items-center justify-center">
          <div className="h-40 w-40 rounded-full border border-amber-500/20 flex items-center justify-center">
            <div className="h-28 w-28 rounded-full border border-amber-500/30 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center">
                <span className="text-2xl font-bold text-amber-400">98</span>
              </div>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-medium">Excellent</div>
        </div>
        <div className="w-full space-y-3">
          {[
            { label: "First Contentful Paint", value: "0.4s", pct: 95 },
            { label: "Largest Contentful Paint", value: "0.8s", pct: 88 },
            { label: "Time to Interactive", value: "0.9s", pct: 92 },
          ].map((m) => (
            <div key={m.label}>
              <div className="flex justify-between text-xs text-white/50 mb-1">
                <span>{m.label}</span>
                <span className="text-amber-400 font-medium">{m.value}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-400"
                  style={{ width: `${m.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 3,
    tag: "Security",
    icon: Shield,
    headline: "Enterprise-grade\nsecurity.",
    sub: "SSL, fraud detection, PCI compliance, and automatic backups — all included. Sleep soundly.",
    gradient: "from-green-600 to-emerald-700",
    accent: "#16a34a",
    ui: (
      <div className="w-full h-full flex flex-col gap-3 p-6">
        {[
          { label: "SSL Certificate", status: "Active", icon: "🔒" },
          { label: "PCI Compliance", status: "Verified", icon: "✅" },
          { label: "Fraud Detection", status: "Running", icon: "🛡️" },
          { label: "Auto Backups", status: "Daily", icon: "💾" },
          { label: "DDoS Protection", status: "Enabled", icon: "🔐" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/8 px-4 py-3">
            <span className="text-lg">{item.icon}</span>
            <span className="flex-1 text-sm text-white/80">{item.label}</span>
            <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">{item.status}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 4,
    tag: "Global Reach",
    icon: Globe,
    headline: "Sell to anyone.\nAnywhere.",
    sub: "Multi-currency, multi-language storefronts with automatic tax calculation for 180+ countries.",
    gradient: "from-pink-600 to-rose-700",
    accent: "#db2777",
    ui: (
      <div className="w-full h-full flex flex-col gap-4 p-6 justify-center">
        <div className="grid grid-cols-3 gap-2">
          {[
            { country: "🇺🇸", name: "USD", sales: "$12.4k" },
            { country: "🇬🇧", name: "GBP", sales: "$8.1k" },
            { country: "🇪🇺", name: "EUR", sales: "$9.3k" },
            { country: "🇯🇵", name: "JPY", sales: "$5.7k" },
            { country: "🇨🇦", name: "CAD", sales: "$4.2k" },
            { country: "🇦🇺", name: "AUD", sales: "$3.8k" },
          ].map((c) => (
            <div key={c.name} className="rounded-xl bg-white/5 border border-white/8 p-3 text-center">
              <div className="text-2xl mb-1">{c.country}</div>
              <div className="text-xs text-white/50">{c.name}</div>
              <div className="text-xs font-semibold text-white mt-1">{c.sales}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 5,
    tag: "Customization",
    icon: Palette,
    headline: "Your brand.\nYour store.",
    sub: "Fully customizable storefronts. Change colors, fonts, layouts — no code needed. Launch in minutes.",
    gradient: "from-indigo-600 to-violet-700",
    accent: "#6366f1",
    ui: (
      <div className="w-full h-full flex flex-col gap-3 p-6">
        <div className="flex gap-2 mb-2">
          {["#7c3aed","#2563eb","#db2777","#16a34a","#f59e0b"].map((color) => (
            <div key={color} className="h-7 w-7 rounded-full border-2 border-white/20 cursor-pointer"
              style={{ backgroundColor: color }} />
          ))}
        </div>
        <div className="flex-1 rounded-xl bg-white/5 border border-white/8 overflow-hidden">
          <div className="bg-violet-600/30 px-4 py-2 flex items-center gap-2 border-b border-white/5">
            <div className="h-2 w-2 rounded-full bg-white/20" />
            <span className="text-xs text-white/40">yourstore.shopforge.com</span>
          </div>
          <div className="p-4 space-y-3">
            <div className="h-3 w-24 rounded bg-violet-500/50" />
            <div className="grid grid-cols-2 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square rounded-lg bg-white/5 border border-white/8" />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function ScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalScroll = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const pct = Math.max(0, Math.min(1, scrolled / totalScroll));
      setProgress(pct);
      const index = Math.min(
        slides.length - 1,
        Math.floor(pct * slides.length)
      );
      setActiveIndex(index);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const slide = slides[activeIndex];
  const Icon = slide.icon;

  return (
    <section ref={containerRef} style={{ height: `${slides.length * 100}vh` }} className="relative">

      {/* Sticky container — stays in view while you scroll */}
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">

        {/* Section label */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <Icon className="h-3.5 w-3.5" style={{ color: slide.accent }} />
            <span className="text-xs text-white/50 transition-all duration-500">{slide.tag}</span>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="mx-auto max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: Text */}
            <div key={activeIndex} className="animate-fadeIn">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6 whitespace-pre-line">
                {slide.headline}
              </h2>
              <p className="text-lg text-white/40 leading-relaxed max-w-md">
                {slide.sub}
              </p>

              {/* Progress dots */}
              <div className="flex items-center gap-2 mt-12">
                {slides.map((_, i) => (
                  <div key={i}
                    className="transition-all duration-500 rounded-full"
                    style={{
                      height: "6px",
                      width: i === activeIndex ? "24px" : "6px",
                      backgroundColor: i === activeIndex ? slide.accent : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right: UI mockup */}
            <div key={`ui-${activeIndex}`} className="animate-fadeIn">
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden"
                style={{ height: "420px" }}>
                {/* Gradient glow behind card */}
                <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-10`} />
                <div className="relative h-full">
                  {slide.ui}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="absolute bottom-0 inset-x-0 h-0.5 bg-white/5">
          <div className="h-full bg-white/30 transition-all duration-100"
            style={{ width: `${progress * 100}%` }} />
        </div>

        {/* Scroll hint */}
        {activeIndex === 0 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs text-white/20">Scroll to explore</span>
            <div className="h-8 w-5 rounded-full border border-white/10 flex items-start justify-center p-1">
              <div className="h-1.5 w-1 rounded-full bg-white/30" />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>
    </section>
  );
}