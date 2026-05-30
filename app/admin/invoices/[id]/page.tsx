import { notFound } from "next/navigation";
import InvoiceBuilder from "@/components/admin/invoices/InvoiceBuilder";
import { getInvoice } from "@/app/actions/invoices";
import { getPaymentSettings } from "@/app/actions/settings";
import { supabaseAdmin } from "@/lib/supabase/admin";

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [invoice, settings] = await Promise.all([
    getInvoice(id),
    getPaymentSettings(),
  ]);

  if (!invoice) notFound();

  let customer = null;
  if (invoice.customer_id) {
    const { data } = await supabaseAdmin
      .from('customers')
      .select('*')
      .eq('id', invoice.customer_id)
      .single();
    customer = data;
  }

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-extrabold text-slate-900">{invoice.id}</h1>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
          invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
          invoice.status === 'overdue' ? 'bg-red-100 text-red-700' :
          invoice.status === 'sent' ? 'bg-blue-100 text-blue-700' :
          'bg-slate-100 text-slate-600'
        }`}>{invoice.status}</span>
      </div>
      <InvoiceBuilder existingInvoice={invoice} existingCustomer={customer ?? undefined} settings={settings} />
    </div>
  );
}
