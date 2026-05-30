import InvoiceBuilder from "@/components/admin/invoices/InvoiceBuilder";
import { getPaymentSettings } from "@/app/actions/settings";

export const dynamic = "force-dynamic";

export default async function NewInvoicePage() {
  const settings = await getPaymentSettings();
  return (
    <div className="p-4 pb-16">
      <h1 className="text-xl font-extrabold text-slate-900 mb-4">New Invoice</h1>
      <InvoiceBuilder settings={settings} />
    </div>
  );
}
