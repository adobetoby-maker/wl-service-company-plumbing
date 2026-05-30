"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard, ClipboardList, FileText, Package,
  Megaphone, BarChart2, Timer, Settings, Wrench, ChevronRight, LogOut, Users, MessageSquare
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/repair-orders", label: "Repair Orders", icon: ClipboardList },
  { href: "/admin/invoices", label: "Invoices", icon: FileText },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/inventory", label: "Parts Inventory", icon: Package },
  { href: "/admin/marketing", label: "Marketing & CRM", icon: Megaphone },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/admin/feedback", label: "Feedback", icon: MessageSquare },
  { href: "/admin/crons", label: "Agent Cron Jobs", icon: Timer },
  { href: "/admin/staff", label: "Staff Portal", icon: Users },
] as const;

type CurrentUser = { email: string } | null;

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setCurrentUser({ email: user.email ?? '' });
    });
  }, []);

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-56 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="px-4 py-5 border-b border-slate-800">
          <div className="flex items-center gap-2 font-bold text-sm">
            <Wrench size={16} className="text-red-500" />
            <span>Junior&apos;s Admin</span>
          </div>
          <p className="text-slate-500 text-xs mt-0.5 truncate">
            {currentUser?.email ?? "Loading…"}
          </p>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-0.5">
          {nav.map((item) => {
            const active = path === item.href || (item.href !== "/admin" && path.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-red-600 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <item.icon size={16} />
                {item.label}
                {active && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="px-2 pb-4 border-t border-slate-800 pt-4 space-y-0.5">
          <Link
            href="/admin/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              path === "/admin/settings"
                ? "bg-red-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Settings size={16} />
            Settings
            {path === "/admin/settings" && <ChevronRight size={14} className="ml-auto" />}
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            ← View Site
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
