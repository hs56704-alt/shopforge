import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/sidebar";
import DashboardHeader from "@/components/dashboard/dashboard-header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  const store = await prisma.store.findUnique({
    where: { ownerId: session.user.id },
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      <Sidebar storeSlug={store?.slug ?? ""} />
      <div className="flex-1 flex flex-col min-w-0">
        {/* ← add pt-14 for mobile header offset */}
        <div className="hidden lg:block">
          <DashboardHeader session={session} />
        </div>
        <main className="flex-1 p-4 md:p-6 overflow-auto pt-16 lg:pt-6">
          {children}
        </main>
      </div>
    </div>
  );
}