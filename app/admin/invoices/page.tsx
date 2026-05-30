import Link from "next/link";
import { Plus } from "lucide-react";
import { getInvoices } from "@/app/actions/invoices";

const statusColors: Record<string, string> = {
  draft: "bg-slate-100 text-slate-600",
  sent: "bg-blue-100 text-blue-700",
  paid: "bg-green-100 text-green-700",
  overdue: "bg-red-100 text-red-700",
};

export default async function InvoicesPage() {
  const invoices = await getInvoices();
  const totalOutstanding = invoices.filter(i => i.status !== 'paid').reduce((s, i) => s + i.total, 0);
  const totalOverdue = invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.total, 0);
  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Invoices</h1>
          <p className="text-slate-500 text-sm">{invoices.length} total</p>
        </div>
        <Link
          href="/admin/invoices/new"
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm"
        >
          <Plus size={16} /> New Invoice
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Outstanding</p>
          <p className="text-2xl font-extrabold text-slate-900">${totalOutstanding.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-red-100 shadow-sm">
          <p className="text-xs text-red-500 mb-1">Overdue</p>
          <p className="text-2xl font-extrabold text-red-600">${totalOverdue.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-green-100 shadow-sm">
          <p className="text-xs text-green-500 mb-1">Paid</p>
          <p className="text-2xl font-extrabold text-green-600">${totalPaid.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50">
        {invoices.map(inv => (
          <Link
            key={inv.id}
            href={`/admin/invoices/${inv.id}`}
            className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
          >
            <div>
              <p className="font-semibold text-sm text-slate-900">{inv.id}</p>
              <p className="text-xs text-slate-500">Due {inv.due_date ?? '—'}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${statusColors[inv.status]}`}>
                {inv.status}
              </span>
              <span className="text-sm font-bold text-slate-900">${inv.total.toFixed(2)}</span>
            </div>
          </Link>
        ))}
        {invoices.length === 0 && (
          <div className="px-5 py-12 text-center text-slate-400 text-sm">No invoices yet</div>
        )}
      </div>
    </div>
  );
}
