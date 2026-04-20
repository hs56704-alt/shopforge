import Link from "next/link";
import { ArrowRight, Star, Zap, Shield, Globe, BarChart3, ShoppingBag } from "lucide-react";
import ScrollShowcase from "@/components/shared/scroll-showcase";

export default function HomePage() {
  return (
    <div className="bg-black text-white min-h-screen">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 inset-x-0 z-50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mt-4 rounded-2xl border border-white/[0.06] bg-black/60 backdrop-blur-2xl px-5 h-12 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-md bg-gradient-to-br from-violet-500 to-blue-500" />
              <span className="text-sm font-semibold tracking-tight">ShopForge</span>
            </Link>

            <div className="hidden md:flex items-center gap-6 text-xs text-white/40">
              {[
                { label: "Marketplace", href: "/marketplace" },
                { label: "Pricing", href: "/pricing" },
                { label: "Docs", href: "/docs" },
              ].map((item) => (
                <Link key={item.label} href={item.href}
                  className="hover:text-white transition-colors duration-300">
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Link href="/login"
                className="text-xs text-white/40 hover:text-white transition-colors px-3 py-1.5">
                Sign in
              </Link>
              <Link href="/register"
                className="text-xs bg-white text-black font-medium px-4 py-1.5 rounded-full hover:bg-white/90 transition-all duration-200 hover:scale-105 active:scale-95">
                Get started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* ── Hero ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">

          {/* Background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Grid */}
            <div className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "60px 60px"
              }} />
            {/* Glows */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[160px] animate-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[120px] animate-glow" style={{ animationDelay: "1.5s" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-600/5 blur-[200px]" />
          </div>

          <div className="relative text-center max-w-5xl mx-auto">

            {/* Badge */}
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-white/50 mb-10 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              Now in public beta — free for 30 days
            </div>

            {/* Main headline */}
            <h1 className="animate-fade-up-delay-1 text-[clamp(48px,10vw,120px)] font-semibold tracking-[-0.04em] leading-[0.9] mb-8">
              <span className="block text-white">The future of</span>
              <span className="block shimmer-text">eCommerce.</span>
            </h1>

            <p className="animate-fade-up-delay-2 text-base md:text-lg text-white/30 max-w-xl mx-auto mb-12 leading-relaxed font-light">
              Launch your store in minutes. Reach customers everywhere.
              Built for the next generation of sellers.
            </p>

            <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/register"
                className="group flex items-center gap-2 bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-white/90 transition-all duration-200 hover:scale-105 active:scale-95">
                Start for free
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/marketplace"
                className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors px-4 py-3">
                Browse marketplace →
              </Link>
            </div>

            {/* Social proof */}
            <div className="animate-fade-up-delay-4 mt-16 flex flex-col items-center gap-3">
              <div className="flex -space-x-2">
                {["bg-violet-500","bg-blue-500","bg-cyan-500","bg-pink-500","bg-amber-500"].map((c, i) => (
                  <div key={i} className={`h-7 w-7 rounded-full border-2 border-black ${c} ring-1 ring-white/10`} />
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs text-white/30 ml-1">Trusted by 2,000+ merchants</span>
              </div>
            </div>
          </div>

          {/* Floating dashboard preview */}
          <div className="animate-fade-up-delay-4 relative mt-20 w-full max-w-4xl animate-float">
            <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.04] bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 mx-6 bg-white/[0.04] rounded-md h-5 flex items-center justify-center">
                  <span className="text-[10px] text-white/20">dashboard.shopforge.com</span>
                </div>
              </div>

              {/* Dashboard UI */}
              <div className="p-5 grid grid-cols-4 gap-3">
                {[
                  { label: "Revenue", value: "$48,291", change: "+24%", color: "from-violet-500 to-purple-600" },
                  { label: "Orders", value: "2,847", change: "+18%", color: "from-blue-500 to-cyan-600" },
                  { label: "Products", value: "142", change: "+8%", color: "from-amber-500 to-orange-600" },
                  { label: "Customers", value: "12,093", change: "+31%", color: "from-green-500 to-emerald-600" },
                ].map((stat) => (
                  <div key={stat.label}
                    className="rounded-2xl border border-white/[0.05] bg-white/[0.03] p-4">
                    <div className={`h-7 w-7 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                      <div className="h-3 w-3 bg-white/30 rounded" />
                    </div>
                    <div className="text-lg font-semibold text-white">{stat.value}</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-white/30">{stat.label}</span>
                      <span className="text-[10px] text-green-400">{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="px-5 pb-5">
                <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
                  <div className="flex items-end gap-1 h-14">
                    {[20,35,25,50,40,65,55,80,60,75,70,100].map((h, i) => (
                      <div key={i}
                        className="flex-1 rounded-sm bg-gradient-to-t from-violet-600/60 to-blue-400/60"
                        style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Glow under card */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-16 bg-violet-600/20 blur-3xl rounded-full" />
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="h-10 w-6 rounded-full border border-white/10 flex items-start justify-center p-1.5">
              <div className="h-2 w-1 rounded-full bg-white/20" />
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="py-20 px-6 border-y border-white/[0.04]">
          <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "$2.4M+", label: "Merchant revenue" },
              { value: "12,000+", label: "Active stores" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "< 1s", label: "Load time" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-white/25 tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Scroll showcase ── */}
        <div className="bg-black">
          <div className="text-center pt-32 pb-8 px-6">
            <p className="text-[10px] tracking-[0.3em] text-white/20 uppercase mb-5">
              Everything you need
            </p>
            <h2 className="text-5xl md:text-6xl font-semibold tracking-tight">
              Built different.
            </h2>
          </div>
          <ScrollShowcase />
        </div>

        {/* ── Features grid ── */}
        <section className="py-32 px-6 bg-black">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-20">
              <p className="text-[10px] tracking-[0.3em] text-white/20 uppercase mb-5">Features</p>
              <h2 className="text-5xl md:text-6xl font-semibold tracking-tight mb-4">
                Why ShopForge?
              </h2>
              <p className="text-white/30 text-lg max-w-lg mx-auto">
                Every feature designed with intention. Nothing excess.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {features.map((feature, i) => (
                <div key={feature.title}
                  className={`glass glass-hover rounded-3xl p-8 ${i === 1 ? "md:mt-8" : ""}`}>
                  <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}>
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-base font-semibold mb-3">{feature.title}</h3>
                  <p className="text-sm text-white/35 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section className="py-32 px-6 border-t border-white/[0.04]">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <p className="text-[10px] tracking-[0.3em] text-white/20 uppercase mb-5">Pricing</p>
              <h2 className="text-5xl md:text-6xl font-semibold tracking-tight mb-4">
                Simple pricing.
              </h2>
              <p className="text-white/30">No surprises. Cancel anytime.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div key={plan.name}
                  className={`relative rounded-3xl p-8 transition-all duration-300 ${
                    plan.featured
                      ? "bg-white text-black"
                      : "glass glass-hover"
                  }`}>
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-500 to-blue-500 text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                      Popular
                    </div>
                  )}
                  <div className={`text-[10px] font-semibold tracking-widest uppercase mb-4 ${plan.featured ? "text-black/40" : "text-white/25"}`}>
                    {plan.name}
                  </div>
                  <div className={`text-5xl font-semibold tracking-tight mb-1 ${plan.featured ? "text-black" : "text-white"}`}>
                    {plan.price}
                    <span className={`text-sm font-normal ${plan.featured ? "text-black/30" : "text-white/20"}`}>/mo</span>
                  </div>
                  <p className={`text-sm mb-8 mt-2 ${plan.featured ? "text-black/40" : "text-white/25"}`}>
                    {plan.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <div className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${plan.featured ? "bg-black" : "bg-violet-400"}`} />
                        <span className={plan.featured ? "text-black/60" : "text-white/40"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/register"
                    className={`block text-center text-sm font-medium py-3 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                      plan.featured
                        ? "bg-black text-white hover:bg-black/80"
                        : "border border-white/10 text-white hover:bg-white/5"
                    }`}>
                    Get started
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-40 px-6 text-center">
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-blue-600/10 blur-3xl" />
            <div className="relative">
              <p className="text-[10px] tracking-[0.3em] text-white/20 uppercase mb-8">
                Get started today
              </p>
              <h2 className="text-6xl md:text-8xl font-semibold tracking-tight leading-none mb-10">
                Your store.
                <span className="block gradient-text">Your way.</span>
              </h2>
              <Link href="/register"
                className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-8 py-4 rounded-full hover:bg-white/90 transition-all duration-200 hover:scale-105 active:scale-95 group">
                Create your store — free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.04] py-10 px-6">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-md bg-gradient-to-br from-violet-500 to-blue-500" />
            <span className="text-xs font-medium text-white/30">ShopForge</span>
          </div>
          <p className="text-xs text-white/15">© 2025 ShopForge Inc.</p>
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

const features = [
  {
    title: "Instant store setup",
    description: "Go from zero to live store in under 5 minutes. No technical knowledge required.",
    icon: Zap,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "Enterprise security",
    description: "SSL, PCI compliance, fraud detection. Bank-level security included for every store.",
    icon: Shield,
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    title: "Global by default",
    description: "Sell in 180+ countries. Multi-currency, automatic tax, and localization built in.",
    icon: Globe,
    gradient: "from-green-500 to-emerald-600",
  },
  {
    title: "Real-time analytics",
    description: "Know exactly what's working. Revenue, orders, and customer insights live.",
    icon: BarChart3,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    title: "Unlimited products",
    description: "Add as many products as you want. Images, variants, inventory — all included.",
    icon: ShoppingBag,
    gradient: "from-pink-500 to-rose-600",
  },
  {
    title: "Lightning fast",
    description: "Sub-second load times everywhere. Built on Next.js 15 with edge caching.",
    icon: Zap,
    gradient: "from-indigo-500 to-violet-600",
  },
];

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
    description: "For large operations",
    featured: false,
    features: ["Unlimited stores", "Unlimited products", "Custom analytics", "Dedicated support", "SLA guarantee"],
  },
];