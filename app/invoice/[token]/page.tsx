import { notFound } from "next/navigation";
import InvoiceView from "@/components/invoice/InvoiceView";
import { getInvoiceByToken } from "@/app/actions/invoices";
import { getPaymentSettings } from "@/app/actions/settings";
import { supabaseAdmin } from "@/lib/supabase/admin";

export default async function PublicInvoicePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const [invoice, settings] = await Promise.all([
    getInvoiceByToken(token),
    getPaymentSettings(),
  ]);

  if (!invoice) notFound();

  let customer = null;
  if (invoice.customer_id) {
    const { data } = await supabaseAdmin
      .from('customers')
      .select('id, name, phone, email, vehicles, notes, status, created_at') // keep full type; InvoiceView uses name only
      .eq('id', invoice.customer_id)
      .single();
    customer = data;
  }

  return <InvoiceView invoice={invoice} customer={customer} settings={settings} />;
}
