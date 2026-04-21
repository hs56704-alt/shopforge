"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, ShoppingBag, ShoppingCart,
  BarChart3, Settings, Store, LogOut, Menu, X
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/dashboard/products", icon: ShoppingBag },
  { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar({ storeSlug }: { storeSlug: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavContent = () => (
    <>
      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all duration-200 ${
                isActive
                  ? "bg-white/[0.08] text-white font-medium"
                  : "text-white/35 hover:text-white hover:bg-white/[0.04]"
              }`}>
              <Icon className="h-3.5 w-3.5 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 py-3 border-t border-white/[0.04] space-y-0.5">
        <Link href={`/store/${storeSlug}`} target="_blank"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-white/35 hover:text-white hover:bg-white/[0.04] transition-all duration-200">
          <Store className="h-3.5 w-3.5" />
          View store
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-white/35 hover:text-red-400 hover:bg-red-500/[0.04] transition-all duration-200">
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex w-56 border-r border-white/[0.04] bg-black flex-col h-screen sticky top-0">
        {/* Logo */}
        <div className="h-14 flex items-center px-5 border-b border-white/[0.04]">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-violet-500 to-blue-500" />
            <span className="text-sm font-semibold tracking-tight">ShopForge</span>
          </Link>
        </div>
        <NavContent />
      </aside>

      {/* ── Mobile header ── */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-50 h-14 border-b border-white/[0.04] bg-black/90 backdrop-blur-xl flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-violet-500 to-blue-500" />
          <span className="text-sm font-semibold">ShopForge</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="h-8 w-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/[0.08]">
          {mobileOpen
            ? <X className="h-4 w-4 text-white/60" />
            : <Menu className="h-4 w-4 text-white/60" />}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-black border-r border-white/[0.04] flex flex-col pt-14">
            <NavContent />
          </div>
        </div>
      )}
    </>
  );
}