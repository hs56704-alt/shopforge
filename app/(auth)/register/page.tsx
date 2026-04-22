import { Metadata } from "next";
import RegisterForm from "@/components/auth/register-form";
import Link from "next/link";
import Logo from "@/components/shared/logo";
export const metadata: Metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* Left — branding */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 border-r border-white/[0.04]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-violet-600/10 blur-[100px]" />
        </div>

        <Logo size="md" />

        {/* Steps */}
        <div className="relative space-y-6">
          <p className="text-2xl font-semibold text-white/80 mb-8">
            Get your store live in 3 steps
          </p>
          {[
            { step: "01", title: "Create account", desc: "Sign up in seconds, no credit card needed" },
            { step: "02", title: "Add products", desc: "Upload your products with images and pricing" },
            { step: "03", title: "Start selling", desc: "Share your store link and start making money" },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4">
              <div className="text-[10px] font-semibold text-white/20 tracking-widest mt-1 w-6 flex-shrink-0">
                {item.step}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="text-xs text-white/30 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative glass rounded-2xl p-5">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-3 w-3 rounded-sm bg-amber-400/80" />
            ))}
          </div>
          <p className="text-sm text-white/60 leading-relaxed">
            "Easiest platform I've used. Had my store running before lunch!"
          </p>
          <p className="text-xs text-white/25 mt-3">— Priya M., Jewelry store</p>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">

          <Link href="/" className="flex lg:hidden items-center gap-2 mb-10">
            <Logo size="sm" href="" />
          </Link>

          <h1 className="text-3xl font-semibold tracking-tight mb-1">
            Create account
          </h1>
          <p className="text-sm text-white/30 mb-10">
            Launch your store in minutes
          </p>

          <RegisterForm />

          <p className="text-center text-xs text-white/25 mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-white/50 hover:text-white transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}