import { Metadata } from "next";
import RegisterForm from "@/components/auth/register-form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create your ShopForge account",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[20%] w-[500px] h-[500px] rounded-full bg-blue-700/20 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] rounded-full bg-violet-700/15 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-sm">

        <Link href="/" className="flex items-center justify-center gap-2 mb-10">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-sm font-bold">
            S
          </div>
          <span className="font-semibold text-lg">ShopForge</span>
        </Link>

        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-8">
          <h1 className="text-2xl font-bold tracking-tight mb-1">Create account</h1>
          <p className="text-sm text-white/40 mb-8">Launch your store in minutes</p>

          <RegisterForm />
        </div>

        <p className="text-center text-sm text-white/30 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-white/60 hover:text-white transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}