import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import ScrollShowcase from "@/components/shared/scroll-showcase";
import HeroSection from "@/components/shared/hero-section";
import HighlightsTabs from "@/components/shared/highlights-tabs";
import SuperStat from "@/components/shared/super-stat";

export default function HomePage() {
  return (
    <div className="bg-black text-white">

      {/* ── Navbar ── */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-black/70 backdrop-blur-2xl">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-[10px] font-bold">S</div>
            <span className="text-sm font-medium tracking-tight">ShopForge</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-xs text-white/40">
            {["Marketplace", "Pricing", "Features", "Docs", "Blog"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`}
                className="hover:text-white transition-colors duration-200 tracking-wide">
                {item}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-xs text-white/50 hover:text-white transition-colors">
              Log in
            </Link>
            <Link href="/register"
              className="text-xs bg-white text-black font-medium px-3.5 py-1.5 rounded-full hover:bg-white/90 transition-all duration-200">
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main>

        {/* ── 1. CINEMATIC HERO ── */}
        <HeroSection />

        {/* ── 2. HIGHLIGHTS TABS (Apple-style) ── */}
        <HighlightsTabs />

        {/* ── 3. SUPER STAT — Stores ── */}
        <SuperStat
          eyebrow="Scale"
          stat="12,000+"
          label="stores launched on ShopForge"
          sub="From solo sellers to enterprise brands — all on one platform."
          dark={false}
        />

        {/* ── 4. APPLE-STYLE SCROLL SHOWCASE ── */}
        <div className="bg-black">
          <div className="text-center pt-32 pb-4 px-6">
            <p className="text-xs tracking-widest text-white/30 uppercase mb-4">Everything you need</p>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              Built for serious sellers.
            </h2>
          </div>
          <ScrollShowcase />
        </div>

        {/* ── 5. SUPER STAT — Revenue ── */}
        <SuperStat
          eyebrow="Revenue"
          stat="$2.4M+"
          label="earned by merchants last month"
          sub="Real money, real stores, real growth."
          dark={true}
        />

        {/* ── 6. PRICING ── */}
        <section className="bg-[#f5f5f7] text-black py-32 px-6">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs tracking-widest text-black/30 uppercase text-center mb-4">Pricing</p>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-center mb-4">
              Simple. Honest. Fair.
            </h2>
            <p className="text-black/40 text-center text-lg mb-16">No hidden fees. No surprises. Cancel anytime.</p>

            <div className="grid md:grid-cols-3 gap-5">
              {plans.map((plan) => (
                <div key={plan.name}
                  className={`relative rounded-3xl p-8 transition-all duration-300 ${
                    plan.featured
                      ? "bg-black text-white"
                      : "bg-white border border-black/[0.06]"
                  }`}>
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-500 to-blue-500 text-white text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
                      Most popular
                    </div>
                  )}
                  <div className={`text-xs font-medium tracking-widest uppercase mb-3 ${plan.featured ? "text-white/40" : "text-black/30"}`}>
                    {plan.name}
                  </div>
                  <div className={`text-5xl font-bold mb-1 tracking-tight ${plan.featured ? "text-white" : "text-black"}`}>
                    {plan.price}
                    <span className={`text-base font-normal ${plan.featured ? "text-white/30" : "text-black/30"}`}>/mo</span>
                  </div>
                  <p className={`text-sm mb-8 ${plan.featured ? "text-white/40" : "text-black/40"}`}>
                    {plan.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <div className={`h-4 w-4 rounded-full flex items-center justify-center flex-shrink-0 ${plan.featured ? "bg-white/10" : "bg-black/5"}`}>
                          <div className={`h-1.5 w-1.5 rounded-full ${plan.featured ? "bg-white" : "bg-black"}`} />
                        </div>
                        <span className={plan.featured ? "text-white/60" : "text-black/50"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/register"
                    className={`block text-center text-sm font-medium py-3 px-4 rounded-2xl transition-all duration-200 ${
                      plan.featured
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-black text-white hover:bg-black/80"
                    }`}>
                    Get started
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. SUPER STAT — Speed ── */}
        <SuperStat
          eyebrow="Performance"
          stat="< 1s"
          label="average storefront load time"
          sub="Next.js 15 edge caching. Fast everywhere, for everyone."
          dark={true}
        />

        {/* ── 8. FINAL CTA ── */}
        <section className="bg-black py-40 px-6 text-center">
          <p className="text-xs tracking-widest text-white/20 uppercase mb-8">Get started today</p>
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-10">
            Your store.<br />
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Your rules.
            </span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register"
              className="group flex items-center gap-2 bg-white text-black font-medium px-8 py-3.5 rounded-full hover:bg-white/90 transition-all duration-200 text-sm">
              Create your store — it&apos;s free
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/pricing"
              className="text-sm text-white/40 hover:text-white transition-colors px-4 py-3.5">
              See pricing →
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-16 flex flex-col items-center gap-3">
            <div className="flex -space-x-2">
              {["bg-violet-500","bg-blue-500","bg-cyan-500","bg-pink-500","bg-amber-500"].map((c, i) => (
                <div key={i} className={`h-8 w-8 rounded-full border-2 border-black ${c}`} />
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs text-white/30 ml-2">Loved by 2,000+ merchants</span>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] py-10 px-6 bg-black">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-md bg-gradient-to-br from-violet-500 to-blue-500" />
            <span className="text-xs font-medium text-white/40">ShopForge</span>
          </div>
          <p className="text-xs text-white/20">© 2025 ShopForge Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-white/20">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`}
                className="hover:text-white/50 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

const plans = [
  {
    name: "Starter",
    price: "$0",
    description: "Perfect for getting started",
    featured: false,
    features: ["1 store", "Up to 10 products", "Basic analytics", "Community support"],
  },
  {
    name: "Pro",
    price: "$29",
    description: "For growing businesses",
    featured: true,
    features: ["3 stores", "Unlimited products", "Advanced analytics", "Priority support", "Custom domain"],
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "For large scale operations",
    featured: false,
    features: ["Unlimited stores", "Unlimited products", "Custom analytics", "Dedicated support", "SLA guarantee"],
  },
];