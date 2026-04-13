import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import {
  ShoppingBag,
  ShoppingCart,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  Package,
} from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  // Fetch store data directly — no API needed! (Server Component magic)
  const store = await prisma.store.findUnique({
    where: { ownerId: session.user.id },
    include: {
      products: true,
      orders: {
        include: { items: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  if (!store) redirect("/onboarding");

  // Calculate stats
  const totalRevenue = store.orders
    .filter((o) => o.status === "PAID")
    .reduce((acc, o) => acc + o.total, 0);

  const totalOrders = store.orders.length;
  const totalProducts = store.products.length;
  const publishedProducts = store.products.filter((p) => p.published).length;

  const stats = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      change: "+12.5%",
      up: true,
      icon: DollarSign,
      color: "from-violet-500 to-purple-600",
    },
    {
      label: "Total Orders",
      value: totalOrders.toString(),
      change: "+8.2%",
      up: true,
      icon: ShoppingCart,
      color: "from-blue-500 to-cyan-600",
    },
    {
      label: "Products",
      value: totalProducts.toString(),
      change: `${publishedProducts} live`,
      up: true,
      icon: ShoppingBag,
      color: "from-amber-500 to-orange-600",
    },
    {
      label: "Customers",
      value: "0",
      change: "0 this month",
      up: false,
      icon: Users,
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{store.name}</h1>
        <p className="text-sm text-white/40 mt-1">
          Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 hover:bg-white/[0.05] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-xs ${stat.up ? "text-green-400" : "text-red-400"}`}>
                  {stat.up
                    ? <ArrowUpRight className="h-3 w-3" />
                    : <ArrowDownRight className="h-3 w-3" />}
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-white/30">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent orders + Quick actions */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Recent orders */}
        <div className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold">Recent Orders</h2>
            <a href="/dashboard/orders"
              className="text-xs text-white/30 hover:text-white transition-colors">
              View all →
            </a>
          </div>

          {store.orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingCart className="h-8 w-8 text-white/10 mb-3" />
              <p className="text-sm text-white/30">No orders yet</p>
              <p className="text-xs text-white/20 mt-1">
                Orders will appear here once customers start buying
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {store.orders.map((order) => (
                <div key={order.id}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center">
                    <Package className="h-4 w-4 text-white/40" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      Order #{order.id.slice(-6).toUpperCase()}
                    </p>
                    <p className="text-xs text-white/30">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      ${order.total.toFixed(2)}
                    </p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      order.status === "PAID"
                        ? "bg-green-500/10 text-green-400"
                        : order.status === "PENDING"
                        ? "bg-amber-500/10 text-amber-400"
                        : "bg-white/5 text-white/30"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="font-semibold mb-6">Quick Actions</h2>
          <div className="space-y-3">
            {[
              {
                label: "Add new product",
                href: "/dashboard/products/new",
                icon: ShoppingBag,
                color: "from-violet-500 to-purple-600",
              },
              {
                label: "View orders",
                href: "/dashboard/orders",
                icon: ShoppingCart,
                color: "from-blue-500 to-cyan-600",
              },
              {
                label: "Store settings",
                href: "/dashboard/settings",
                icon: Settings,
                color: "from-amber-500 to-orange-600",
              },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <a key={action.href} href={action.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                  <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-white/60 group-hover:text-white transition-colors">
                    {action.label}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-white/20 group-hover:text-white/60 ml-auto transition-colors" />
                </a>
              );
            })}
          </div>

          {/* Store status */}
          <div className="mt-6 pt-6 border-t border-white/[0.06]">
            <p className="text-xs text-white/30 mb-3">Store Status</p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-white/60">Live at</span>
            </div>
            <p className="text-xs text-violet-400 mt-1 truncate">
              /store/{store.slug}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}