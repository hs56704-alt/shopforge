"use client";

import { useState } from "react";
import { registerUser } from "@/lib/actions/auth.actions";
import { Loader2 } from "lucide-react";

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await registerUser(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">

      {/* Name */}
      <div>
        <label className="text-xs text-white/40 mb-1.5 block">Full name</label>
        <input
          name="name"
          type="text"
          required
          placeholder="John Doe"
          className="w-full bg-white/5 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
        />
      </div>

      {/* Email */}
      <div>
        <label className="text-xs text-white/40 mb-1.5 block">Email</label>
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full bg-white/5 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
        />
      </div>

      {/* Password */}
      <div>
        <label className="text-xs text-white/40 mb-1.5 block">Password</label>
        <input
          name="password"
          type="password"
          required
          placeholder="••••••••"
          className="w-full bg-white/5 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
        />
        <p className="text-[10px] text-white/20 mt-1.5">Minimum 6 characters</p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-white text-black font-medium py-3 rounded-xl hover:bg-white/90 transition-all duration-200 text-sm flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? "Creating account..." : "Create account"}
      </button>

      <p className="text-[10px] text-white/20 text-center">
        By signing up you agree to our{" "}
        <span className="text-white/40">Terms of Service</span> and{" "}
        <span className="text-white/40">Privacy Policy</span>
      </p>
    </form>
  );
}