"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  BarChart3,
  Settings,
  Store,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/dashboard/products", icon: ShoppingBag },
  { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 border-r border-white/[0.06] bg-black flex flex-col h-screen sticky top-0">

      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-xs font-bold">
            S
          </div>
          <span className="font-semibold tracking-tight">ShopForge</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                isActive
                  ? "bg-white/10 text-white font-medium"
                  : "text-white/40 hover:text-white hover:bg-white/5"
              }`}>
              <Icon className="h-4 w-4 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Store link */}
      <div className="px-3 py-3 border-t border-white/[0.06]">
        <Link href="/store"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200">
          <Store className="h-4 w-4" />
          View your store
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200">
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}