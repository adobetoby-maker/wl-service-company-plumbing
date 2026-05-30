import Link from "next/link";
import { DollarSign, Users, ClipboardList, AlertCircle, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const statusColors: Record<string, string> = {
  "pending": "bg-slate-100 text-slate-600",
  "in-progress": "bg-blue-100 text-blue-700",
  "waiting-parts": "bg-orange-100 text-orange-700",
  "ready": "bg-green-100 text-green-700",
  "completed": "bg-slate-100 text-slate-500",
  "invoiced": "bg-purple-100 text-purple-700",
};

export default async function AdminDashboard() {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const [
    { data: openROs },
    { data: overdueInvoices },
    { count: customerCount },
    { data: revenueData },
  ] = await Promise.all([
    supabaseAdmin
      .from('repair_orders')
      .select('id, customer_id, vehicle, status, total')
      .not('status', 'in', '(completed,invoiced)')
      .order('created_at', { ascending: false })
      .limit(8),
    supabaseAdmin
      .from('invoices')
      .select('id, customer_id, total, due_date')
      .eq('status', 'overdue')
      .order('due_date'),
    supabaseAdmin
      .from('customers')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active'),
    supabaseAdmin
      .from('invoices')
      .select('total')
      .eq('status', 'paid')
      .gte('paid_at', monthStart),
  ]);

  const monthRevenue = (revenueData ?? []).reduce((sum: number, i: any) => sum + i.total, 0);

  // Resolve customer names for open ROs
  const customerIds = [...new Set((openROs ?? []).map((r: any) => r.customer_id).filter(Boolean))];
  let customerMap: Record<string, string> = {};
  if (customerIds.length > 0) {
    const { data: customers } = await supabaseAdmin
      .from('customers')
      .select('id, name')
      .in('id', customerIds as string[]);
    customerMap = Object.fromEntries((customers ?? []).map((c: any) => [c.id, c.name]));
  }

  // Same for overdue invoices
  const overdueCustomerIds = [...new Set((overdueInvoices ?? []).map((i: any) => i.customer_id).filter(Boolean))];
  let overdueCustomerMap: Record<string, string> = {};
  if (overdueCustomerIds.length > 0) {
    const { data: oc } = await supabaseAdmin
      .from('customers')
      .select('id, name')
      .in('id', overdueCustomerIds as string[]);
    overdueCustomerMap = Object.fromEntries((oc ?? []).map((c: any) => [c.id, c.name]));
  }

  const stats = [
    { label: "Open Repair Orders", value: openROs?.length ?? 0, icon: ClipboardList, color: "text-blue-600", bg: "bg-blue-50", href: "/admin/repair-orders" },
    { label: "Revenue This Month", value: `$${monthRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, icon: DollarSign, color: "text-green-600", bg: "bg-green-50", href: "/admin/invoices" },
    { label: "Overdue Invoices", value: overdueInvoices?.length ?? 0, icon: AlertCircle, color: "text-red-600", bg: "bg-red-50", href: "/admin/invoices" },
    { label: "Active Customers", value: customerCount ?? 0, icon: Users, color: "text-purple-600", bg: "bg-purple-50", href: "/admin/marketing" },
    { label: "Avg Ticket (30d)", value: revenueData && revenueData.length > 0 ? `$${(monthRevenue / revenueData.length).toFixed(0)}` : "—", icon: TrendingUp, color: "text-teal-600", bg: "bg-teal-50", href: "/admin/analytics" },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Good morning, Pablo 👋</h1>
        <p className="text-slate-500 text-sm mt-0.5">Here&apos;s what&apos;s happening at Junior&apos;s today.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map(s => (
          <Link key={s.label} href={s.href} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-red-200 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center`}>
                <s.icon size={18} className={s.color} />
              </div>
              <span className="text-sm text-slate-500">{s.label}</span>
            </div>
            <p className="text-3xl font-extrabold text-slate-900">{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Open Repair Orders</h2>
            <Link href="/admin/repair-orders" className="text-xs text-red-600 hover:underline">View all →</Link>
          </div>
          {(openROs ?? []).length === 0 ? (
            <div className="px-5 py-8 text-center text-slate-400 text-sm">No open repair orders</div>
          ) : (
            <div className="divide-y divide-slate-50">
              {(openROs ?? []).map((ro: any) => (
                <div key={ro.id} className="px-5 py-3.5 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm text-slate-900">
                        {ro.customer_id ? customerMap[ro.customer_id] ?? "Unknown" : "Walk-in"}
                      </p>
                      <span className="text-xs text-slate-400">{ro.id}</span>
                    </div>
                    <p className="text-xs text-slate-500">{ro.vehicle ?? "—"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${statusColors[ro.status] ?? "bg-slate-100 text-slate-500"}`}>
                      {ro.status.replace("-", " ")}
                    </span>
                    <span className="text-sm font-bold text-slate-900">${ro.total}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="bg-white rounded-2xl border border-red-100 shadow-sm mb-4">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-900 flex items-center gap-2">
                <AlertCircle size={16} className="text-red-500" />
                Overdue Invoices
              </h2>
              <Link href="/admin/invoices" className="text-xs text-red-600 hover:underline">View all →</Link>
            </div>
            {(overdueInvoices ?? []).length === 0 ? (
              <div className="px-5 py-6 text-center text-slate-400 text-sm flex items-center justify-center gap-2">
                <CheckCircle size={16} className="text-green-500" /> All invoices current
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {(overdueInvoices ?? []).map((inv: any) => (
                  <div key={inv.id} className="px-5 py-3.5 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm text-slate-900">
                        {inv.customer_id ? overdueCustomerMap[inv.customer_id] ?? "Unknown" : "—"}
                      </p>
                      <p className="text-xs text-slate-500">{inv.id} · Due {inv.due_date ?? "—"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-red-600">${inv.total.toFixed(2)}</span>
                      <span className="text-xs bg-red-100 text-red-700 font-semibold px-2 py-0.5 rounded-full">Overdue</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-900 flex items-center gap-2">
                <Clock size={16} className="text-blue-500" />
                Quick Actions
              </h2>
            </div>
            <div className="p-4 grid grid-cols-2 gap-2">
              {[
                { label: "New Repair Order", href: "/admin/repair-orders" },
                { label: "Create Invoice", href: "/admin/invoices/new" },
                { label: "View Customers", href: "/admin/marketing" },
                { label: "Send Campaign", href: "/admin/marketing" },
                { label: "Check Inventory", href: "/admin/inventory" },
                { label: "View Analytics", href: "/admin/analytics" },
              ].map(a => (
                <Link
                  key={a.label}
                  href={a.href}
                  className="text-sm bg-slate-50 hover:bg-red-50 hover:text-red-700 text-slate-600 font-medium px-3 py-2.5 rounded-xl transition-colors"
                >
                  {a.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
