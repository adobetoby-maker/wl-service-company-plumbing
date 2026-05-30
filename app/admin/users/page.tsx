import Link from "next/link";
import { Users, ExternalLink } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Admin Users</h1>
        <p className="text-slate-500 text-sm">Manage who has access to this dashboard</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 max-w-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
            <Users size={20} className="text-slate-500" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-sm">Managed via Supabase</h2>
            <p className="text-xs text-slate-400">Add, remove, and reset passwords in the Supabase dashboard</p>
          </div>
        </div>
        <a
          href="https://supabase.com/dashboard/project/mxhhmcqxtwehffmyxvwv/auth/users"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700"
        >
          Open Supabase User Management <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}
