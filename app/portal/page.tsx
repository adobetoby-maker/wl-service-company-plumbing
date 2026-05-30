import { redirect } from "next/navigation";
import Link from "next/link";
import PortalShell from "@/components/portal/PortalShell";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

const statusColors: Record<string, string> = {
  draft: "bg-slate-100 text-slate-600",
  sent: "bg-blue-100 text-blue-700",
  paid: "bg-green-100 text-green-700",
  overdue: "bg-red-100 text-red-700",
};

export default async function PortalPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/portal/login');

  const { data: customer } = await supabaseAdmin
    .from('customers')
    .select('id, name')
    .eq('email', user.email)
    .single();

  if (!customer) {
    return (
      <PortalShell email={user.email ?? ''}>
        <div className="text-center py-16">
          <p className="text-slate-500 text-sm">No account found for this email.</p>
          <p className="text-slate-400 text-xs mt-2">Contact us at (208) 595-2101 to link your account.</p>
        </div>
      </PortalShell>
    );
  }

  const { data: invoices } = await supabaseAdmin
    .from('invoices')
    .select('*')
    .eq('customer_id', customer.id)
    .order('created_at', { ascending: false });

  return (
    <PortalShell email={user.email ?? ''}>
      <h1 className="text-xl font-extrabold text-slate-900 mb-4">Your Invoices</h1>
      <div className="space-y-3">
        {(invoices ?? []).map((inv: any) => (
          <Link
            key={inv.id}
            href={`/invoice/${inv.public_token}`}
            className="block bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-4 hover:border-red-200 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-slate-900">{inv.id}</div>
                <div className="text-xs text-slate-500 mt-0.5">Due {inv.due_date ?? '—'}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${statusColors[inv.status]}`}>
                  {inv.status}
                </span>
                <span className="font-bold text-slate-900">${inv.total.toFixed(2)}</span>
              </div>
            </div>
          </Link>
        ))}
        {(!invoices || invoices.length === 0) && (
          <div className="text-center py-12 text-slate-400 text-sm">No invoices yet</div>
        )}
      </div>
    </PortalShell>
  );
}
