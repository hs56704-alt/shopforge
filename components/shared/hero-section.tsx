"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black px-6">

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[15%] w-[500px] h-[500px] rounded-full bg-violet-700/25 blur-[140px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-blue-700/20 blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] rounded-full bg-cyan-700/15 blur-[100px]" />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }} />

      <div className={`relative text-center transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/50 mb-10 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          Now in public beta — free for 30 days
        </div>

        {/* Giant headline — Apple style */}
        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.9] mb-6">
          <span className="block text-white">Sell more.</span>
          <span className="block bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Stress less.
          </span>
        </h1>

        {/* Subtitle — short like Apple */}
        <p className="text-lg md:text-xl text-white/35 max-w-lg mx-auto mb-12 leading-relaxed font-light">
          The eCommerce platform built for speed, scale, and simplicity.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/register"
            className="group flex items-center gap-2 bg-white text-black font-medium px-7 py-3 rounded-full hover:bg-white/90 transition-all duration-200 text-sm">
            Start for free
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link href="/demo"
            className="text-sm text-white/40 hover:text-white transition-colors px-4 py-3">
            Watch the demo →
          </Link>
        </div>
      </div>

      {/* Mock dashboard floating below hero text */}
      <div className={`relative mt-20 w-full max-w-4xl transition-all duration-1000 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm overflow-hidden shadow-2xl">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
            </div>
            <div className="flex-1 mx-4 bg-white/5 rounded-md h-5 flex items-center px-3">
              <span className="text-[10px] text-white/20">dashboard.shopforge.com</span>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-6 grid grid-cols-4 gap-4">
            {[
              { label: "Revenue", value: "$48,291", change: "+24%", color: "text-green-400" },
              { label: "Orders", value: "2,847", change: "+18%", color: "text-green-400" },
              { label: "Customers", value: "12,093", change: "+31%", color: "text-green-400" },
              { label: "Conversion", value: "4.8%", change: "+0.6%", color: "text-green-400" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/5 border border-white/[0.06] p-4">
                <div className="text-xs text-white/30 mb-2">{stat.label}</div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className={`text-xs mt-1 ${stat.color}`}>{stat.change} this month</div>
              </div>
            ))}
          </div>

          {/* Fake chart row */}
          <div className="px-6 pb-6">
            <div className="rounded-xl bg-white/5 border border-white/[0.06] p-4">
              <div className="text-xs text-white/30 mb-4">Revenue over time</div>
              <div className="flex items-end gap-1.5 h-16">
                {[30,45,38,60,52,75,68,85,72,90,82,100].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-violet-600 to-blue-400"
                    style={{ height: `${h}%`, opacity: 0.5 + i * 0.04 }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Glow below dashboard */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-violet-600/20 blur-3xl rounded-full" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="h-10 w-6 rounded-full border border-white/10 flex items-start justify-center p-1.5">
          <div className="h-2 w-1 rounded-full bg-white/20" />
        </div>
      </div>
    </section>
  );
}