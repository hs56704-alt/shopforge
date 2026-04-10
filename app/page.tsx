import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import ScrollShowcase from "@/components/shared/scroll-showcase";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white ">

      {/* ── Ambient background glows ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[600px] h-[600px] rounded-full bg-indigo-600/15 blur-[120px]" />
      </div>

      {/* ── Navbar ── */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-xs font-bold">S</div>
            <span className="font-semibold tracking-tight">ShopForge</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-white/50">
            {["Pricing", "Features", "Docs", "Blog"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`}
                className="hover:text-white transition-colors duration-200">
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login"
              className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2">
              Log in
            </Link>
            <Link href="/register"
              className="text-sm bg-white text-black font-medium px-4 py-2 rounded-lg hover:bg-white/90 transition-all duration-200">
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="relative pt-40 pb-32 px-6">
          <div className="mx-auto max-w-5xl text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/60 mb-10 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              Now in public beta — free for 30 days
            </div>

            {/* Headline */}
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.95] mb-8">
              <span className="block text-white">Launch your</span>
              <span className="block bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                store today.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed">
              ShopForge gives merchants everything they need to build,
              launch, and scale their online store — in minutes, not months.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register"
                className="group flex items-center gap-2 bg-white text-black font-medium px-6 py-3 rounded-xl hover:bg-white/90 transition-all duration-200 text-sm">
                Start for free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/demo"
                className="flex items-center gap-2 border border-white/10 text-white/70 hover:text-white hover:border-white/20 px-6 py-3 rounded-xl transition-all duration-200 text-sm backdrop-blur-sm bg-white/5">
                Watch demo
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
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-sm text-white/40 ml-2">from 2,000+ merchants</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <section className="border-y border-white/5 bg-white/[0.02] py-12 px-6">
          <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "$2.4M+", label: "Merchant revenue" },
              { value: "12,000+", label: "Active stores" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "< 1s", label: "Page load time" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-white/30 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Apple-style Scroll Showcase ── */}
        <ScrollShowcase />

        {/* ── Pricing ── */}
        <section className="py-32 px-6 border-t border-white/5">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Simple pricing
              </h2>
              <p className="text-white/40 text-lg">No hidden fees. Cancel anytime.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div key={plan.name}
                  className={`relative rounded-2xl p-8 transition-all duration-300 ${
                    plan.featured
                      ? "bg-white text-black"
                      : "border border-white/8 bg-white/[0.03] hover:bg-white/[0.06]"
                  }`}>
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-500 to-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Most popular
                    </div>
                  )}
                  <div className={`text-sm font-medium mb-2 ${plan.featured ? "text-black/50" : "text-white/40"}`}>
                    {plan.name}
                  </div>
                  <div className={`text-4xl font-bold mb-1 ${plan.featured ? "text-black" : "text-white"}`}>
                    {plan.price}
                    <span className={`text-sm font-normal ${plan.featured ? "text-black/40" : "text-white/30"}`}>/mo</span>
                  </div>
                  <p className={`text-sm mb-8 ${plan.featured ? "text-black/50" : "text-white/30"}`}>
                    {plan.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <span className={`text-lg ${plan.featured ? "text-black" : "text-violet-400"}`}>✓</span>
                        <span className={plan.featured ? "text-black/70" : "text-white/50"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/register"
                    className={`block text-center text-sm font-medium py-2.5 px-4 rounded-xl transition-all duration-200 ${
                      plan.featured
                        ? "bg-black text-white hover:bg-black/80"
                        : "border border-white/10 text-white hover:bg-white/10"
                    }`}>
                    Get started
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-32 px-6">
          <div className="mx-auto max-w-3xl text-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-blue-600/20 blur-3xl rounded-full" />
            <div className="relative">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Start selling
                <span className="block bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  today.
                </span>
              </h2>
              <p className="text-white/40 text-lg mb-10">
                Join 12,000+ merchants who trust ShopForge to power their stores.
              </p>
              <Link href="/register"
                className="group inline-flex items-center gap-2 bg-white text-black font-medium px-8 py-4 rounded-xl hover:bg-white/90 transition-all duration-200">
                Create your store — it&apos;s free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-xs font-bold">S</div>
            <span className="font-medium text-sm">ShopForge</span>
          </div>
          <p className="text-sm text-white/20">© 2025 ShopForge. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-white/30">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`}
                className="hover:text-white/60 transition-colors">
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