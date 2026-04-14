import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const store = await prisma.store.findUnique({
    where: { ownerId: session.user.id },
  });

  if (!store) redirect("/dashboard");

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-white/40 mt-1">Manage your store settings</p>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 space-y-5">
        <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider">
          Store Details
        </h2>

        <div>
          <label className="text-xs text-white/40 mb-1.5 block">Store name</label>
          <input
            defaultValue={store.name}
            className="w-full bg-white/5 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/20 transition-colors"
          />
        </div>

        <div>
          <label className="text-xs text-white/40 mb-1.5 block">Store URL</label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/20">shopforge.com/store/</span>
            <input
              defaultValue={store.slug}
              className="flex-1 bg-white/5 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-white/40 mb-1.5 block">Description</label>
          <textarea
            defaultValue={store.description ?? ""}
            rows={3}
            placeholder="Tell customers about your store..."
            className="w-full bg-white/5 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors resize-none"
          />
        </div>

        <button className="bg-white text-black text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-white/90 transition-colors">
          Save changes
        </button>
      </div>

      {/* Danger zone */}
      <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-6 space-y-4">
        <h2 className="text-sm font-semibold text-red-400 uppercase tracking-wider">
          Danger Zone
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white">Delete store</p>
            <p className="text-xs text-white/30 mt-0.5">
              Permanently delete your store and all products
            </p>
          </div>
          <button className="text-sm text-red-400 border border-red-500/30 px-4 py-2 rounded-xl hover:bg-red-500/10 transition-colors">
            Delete store
          </button>
        </div>
      </div>
    </div>
  );
}