import { Metadata } from "next";
import LoginForm from "@/components/auth/login-form";
import Link from "next/link";
import Logo from "@/components/shared/logo";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* Left — branding panel */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 border-r border-white/[0.04]">

        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-600/10 blur-[100px]" />
        </div>

        {/* Logo */}
        <Logo size="md" />

        {/* Quote */}
        <div className="relative">
          <p className="text-3xl font-semibold tracking-tight leading-tight text-white/80 mb-6">
            &quot;ShopForge helped me launch my store in a single afternoon. Sales started the same day.&quot;
          </p>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-sm font-bold flex-shrink-0">
              R
            </div>
            <div>
              <p className="text-sm font-medium text-white">Rahul Sharma</p>
              <p className="text-xs text-white/30">Fashion store owner, Mumbai</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative grid grid-cols-3 gap-4">
          {[
            { value: "12k+", label: "Stores" },
            { value: "$2.4M", label: "Revenue" },
            { value: "99.9%", label: "Uptime" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-4 text-center">
              <div className="text-2xl font-semibold text-white">{s.value}</div>
              <div className="text-xs text-white/30 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <Link href="/" className="flex lg:hidden items-center gap-2 mb-10">
            <Logo size="sm" href="" />
          </Link>

          <h1 className="text-3xl font-semibold tracking-tight mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-white/30 mb-10">
            Sign in to your account
          </p>

          <LoginForm />

          <p className="text-center text-xs text-white/25 mt-8">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-white/50 hover:text-white transition-colors">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}