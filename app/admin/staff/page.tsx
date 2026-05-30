import Link from "next/link";
import { Users, ExternalLink } from "lucide-react";

export default function StaffPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Staff Portal</h1>
        <p className="text-slate-500 text-sm">Team access and customer-facing portal</p>
      </div>

      <div className="grid gap-4 max-w-xl">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center">
              <Users size={18} className="text-slate-500" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm">Customer Portal</h2>
              <p className="text-xs text-slate-400">Customers view invoices and pay online</p>
            </div>
          </div>
          <Link
            href="/portal"
            target="_blank"
            className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700"
          >
            Open portal <ExternalLink size={13} />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h2 className="font-bold text-slate-900 text-sm mb-1">Staff accounts</h2>
          <p className="text-sm text-slate-500">
            Staff login uses the same admin credentials. Additional staff accounts can be created in the Supabase dashboard under Authentication → Users.
          </p>
          <a
            href="https://supabase.com/dashboard/project/mxhhmcqxtwehffmyxvwv/auth/users"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 mt-3"
          >
            Manage users in Supabase <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
