"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Wrench, LogOut } from "lucide-react";

export default function PortalShell({ children, email }: { children: React.ReactNode; email: string }) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/portal/login');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wrench size={16} className="text-red-500" />
          <span className="text-white text-sm font-bold">Junior&apos;s Auto Repair</span>
        </div>
        <button onClick={handleSignOut} className="flex items-center gap-1 text-slate-400 text-xs hover:text-white">
          <LogOut size={13} /> Sign out
        </button>
      </div>
      <div className="px-4 py-2 bg-slate-800">
        <p className="text-slate-400 text-xs">{email}</p>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
