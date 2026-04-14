import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ShoppingCart, Package } from "lucide-react";

export default async function OrdersPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const store = await prisma.store.findUnique({
    where: { ownerId: session.user.id },
    include: {
      orders: {
        include: { items: { include: { product: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!store) redirect("/dashboard");

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <p className="text-sm text-white/40 mt-1">
          {store.orders.length} total orders
        </p>
      </div>

      {/* Orders */}
      {store.orders.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-16 text-center">
          <ShoppingCart className="h-10 w-10 text-white/10 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
          <p className="text-sm text-white/30 max-w-sm mx-auto">
            Orders will appear here once customers start purchasing from your store.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/[0.06] text-xs text-white/30 uppercase tracking-wider">
            <div className="col-span-3">Order</div>
            <div className="col-span-3">Items</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2 text-right">Total</div>
            <div className="col-span-2 text-right">Status</div>
          </div>

          <div className="divide-y divide-white/[0.04]">
            {store.orders.map((order) => (
              <div key={order.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors">

                {/* Order ID */}
                <div className="col-span-3 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Package className="h-4 w-4 text-white/30" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      #{order.id.slice(-6).toUpperCase()}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="col-span-3">
                  <p className="text-sm text-white/60 truncate">
                    {order.items.map((item) => item.product.name).join(", ")}
                  </p>
                  <p className="text-xs text-white/30 mt-0.5">
                    {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </p>
                </div>

                {/* Date */}
                <div className="col-span-2">
                  <p className="text-sm text-white/40">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* Total */}
                <div className="col-span-2 text-right">
                  <p className="text-sm font-semibold text-white">
                    ${order.total.toFixed(2)}
                  </p>
                </div>

                {/* Status */}
                <div className="col-span-2 text-right">
                  <span className={`inline-flex items-center text-xs px-2.5 py-1 rounded-full font-medium ${
                    order.status === "PAID"
                      ? "bg-green-500/10 text-green-400"
                      : order.status === "PENDING"
                      ? "bg-amber-500/10 text-amber-400"
                      : order.status === "SHIPPED"
                      ? "bg-blue-500/10 text-blue-400"
                      : order.status === "DELIVERED"
                      ? "bg-violet-500/10 text-violet-400"
                      : "bg-red-500/10 text-red-400"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}