"use client";
import { useState, useTransition } from "react";
import { Plus, Save } from "lucide-react";
import CustomerSearch from "./CustomerSearch";
import LineItemCard from "./LineItem";
import ROImportBanner from "./ROImportBanner";
import SendOptions from "./SendOptions";
import { getUninvoicedROsForCustomer } from "@/app/actions/repair-orders";
import { createInvoice, updateInvoice } from "@/app/actions/invoices";
import { calcSubtotal, calcTax, calcTotal } from "@/lib/invoices/calculate";
import type { Customer, Invoice, LineItem, RepairOrder, PaymentSettings } from "@/lib/types/db";
import { useRouter } from "next/navigation";

type Props = {
  existingInvoice?: Invoice;
  existingCustomer?: Customer;
  settings: PaymentSettings;
};

export default function InvoiceBuilder({ existingInvoice, existingCustomer, settings }: Props) {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(existingCustomer ?? null);
  const [availableROs, setAvailableROs] = useState<RepairOrder[]>([]);
  const [importedRO, setImportedRO] = useState<string | null>(null);
  const [lineItems, setLineItems] = useState<LineItem[]>(existingInvoice?.line_items ?? []);
  const [dueDate, setDueDate] = useState(existingInvoice?.due_date ?? '');
  const [notes, setNotes] = useState(existingInvoice?.notes ?? '');
  const [savedInvoice, setSavedInvoice] = useState<Invoice | null>(existingInvoice ?? null);
  const [isPending, startTransition] = useTransition();
  const [saveError, setSaveError] = useState<string | null>(null);

  const subtotal = calcSubtotal(lineItems);
  const tax = calcTax(subtotal, settings.tax_rate);
  const total = calcTotal(subtotal, tax);

  async function handleCustomerSelect(c: Customer) {
    setCustomer(c);
    try {
      const ros = await getUninvoicedROsForCustomer(c.id);
      setAvailableROs(ros);
    } catch {
      setAvailableROs([]);
    }
  }

  function handleImport(items: LineItem[], roId: string) {
    setLineItems(items);
    setImportedRO(roId);
    setAvailableROs([]);
  }

  function addLineItem() {
    setLineItems(prev => [...prev, { description: '', labor: 0, parts: 0, total: 0 }]);
  }

  function updateItem(index: number, updated: LineItem) {
    setLineItems(prev => prev.map((item, i) => i === index ? updated : item));
  }

  function removeItem(index: number) {
    setLineItems(prev => prev.filter((_, i) => i !== index));
  }

  function handleSave() {
    if (!customer) return;
    setSaveError(null);
    startTransition(async () => {
      try {
        let invoice: Invoice;
        if (savedInvoice) {
          invoice = await updateInvoice(savedInvoice.id, {
            lineItems,
            taxRate: settings.tax_rate,
            dueDate,
            notes,
          });
        } else {
          invoice = await createInvoice({
            customerId: customer.id,
            roId: importedRO ?? undefined,
            lineItems,
            taxRate: settings.tax_rate,
            dueDate,
            notes,
          });
        }
        setSavedInvoice(invoice);
        if (!existingInvoice) {
          router.push(`/admin/invoices/${invoice.id}`);
        }
      } catch (err) {
        setSaveError(err instanceof Error ? err.message : 'Failed to save invoice');
      }
    });
  }

  return (
    <div className="max-w-lg mx-auto space-y-4">
      {/* Customer */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
        <div className="text-xs font-bold text-slate-500 uppercase mb-2">Customer</div>
        {customer ? (
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900">{customer.name}</div>
              <div className="text-xs text-slate-500">
                {customer.vehicles[0] ?? 'No vehicle'} · {customer.phone ?? customer.email ?? ''}
              </div>
            </div>
            <button
              onClick={() => { setCustomer(null); setAvailableROs([]); setImportedRO(null); }}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Change
            </button>
          </div>
        ) : (
          <CustomerSearch onSelect={handleCustomerSelect} />
        )}
      </div>

      {/* RO Import banners */}
      {availableROs.map(ro => (
        <ROImportBanner
          key={ro.id}
          ro={ro}
          onImport={handleImport}
        />
      ))}

      {/* Line Items */}
      <div>
        <div className="text-xs font-bold text-slate-500 uppercase mb-2">Services</div>
        <div className="space-y-2">
          {lineItems.map((item, i) => (
            <LineItemCard
              key={i}
              item={item}
              onChange={updated => updateItem(i, updated)}
              onRemove={() => removeItem(i)}
            />
          ))}
          <button
            onClick={addLineItem}
            className="w-full border-2 border-dashed border-slate-200 rounded-xl py-3 text-sm text-slate-400 font-semibold flex items-center justify-center gap-1.5 hover:border-red-300 hover:text-red-400 transition-colors"
          >
            <Plus size={14} /> Add Line Item
          </button>
        </div>
      </div>

      {/* Totals */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-1">
        <div className="flex justify-between text-sm text-slate-500">
          <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-slate-500">
          <span>Tax ({(settings.tax_rate * 100).toFixed(0)}%)</span><span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-extrabold text-slate-900 border-t border-slate-100 pt-2 mt-1">
          <span>Total</span><span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Due Date + Notes */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="w-full bg-slate-50 rounded-xl px-3 py-2.5 text-sm border border-slate-100"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={2}
            className="w-full bg-slate-50 rounded-xl px-3 py-2.5 text-sm resize-none border border-slate-100"
          />
        </div>
      </div>

      {/* Error */}
      {saveError && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {saveError}
        </div>
      )}

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={isPending || !customer || lineItems.length === 0}
        className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-extrabold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors"
      >
        <Save size={16} />
        {isPending ? 'Saving…' : (savedInvoice ? 'Update Invoice' : 'Save Invoice')}
      </button>

      {/* Send options — shown after invoice is saved */}
      {savedInvoice && customer && (
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <SendOptions invoice={savedInvoice} customer={customer} settings={settings} />
        </div>
      )}
    </div>
  );
}
