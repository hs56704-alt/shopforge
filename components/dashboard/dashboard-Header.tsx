import { Session } from "next-auth";
import { Bell } from "lucide-react";

interface Props {
  session: Session;
}

export default function DashboardHeader({ session }: Props) {
  return (
    <header className="h-16 border-b border-white/[0.06] bg-black/50 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-10">

      {/* Left — page context */}
      <div>
        <p className="text-xs text-white/30">Welcome back,</p>
        <p className="text-sm font-medium text-white">
          {session.user?.name ?? session.user?.email}
        </p>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative h-9 w-9 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center hover:bg-white/[0.06] transition-colors">
          <Bell className="h-4 w-4 text-white/40" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-violet-500" />
        </button>

        {/* Avatar */}
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-sm font-bold">
          {session.user?.name?.[0]?.toUpperCase() ?? "U"}
        </div>
      </div>
    </header>
  );
}