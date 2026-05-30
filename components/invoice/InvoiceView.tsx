import PayNow from "./PayNow";
import type { Invoice, Customer, PaymentSettings } from "@/lib/types/db";

type Props = { invoice: Invoice; customer: Customer | null; settings: PaymentSettings };

export default function InvoiceView({ invoice, customer, settings }: Props) {
  const isPaid = invoice.status === 'paid';

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <div className="bg-slate-900 px-5 py-5 text-center">
        <div className="text-red-500 text-xs font-bold tracking-widest uppercase mb-1">{settings.shop_name}</div>
        <div className="text-white text-xl font-extrabold">Invoice {invoice.id}</div>
        <div className="text-slate-500 text-xs mt-1">
          {invoice.created_at ? new Date(invoice.created_at).toLocaleDateString() : ''} · Due {invoice.due_date ?? 'upon receipt'}
        </div>
      </div>

      {/* Status / Amount */}
      {isPaid ? (
        <div className="bg-green-50 border-b border-green-200 px-5 py-3 flex items-center justify-between">
          <div className="text-green-700 font-bold text-sm">✅ Paid — Thank you!</div>
          <div className="text-green-700 font-extrabold text-lg">${invoice.total.toFixed(2)}</div>
        </div>
      ) : (
        <div className="bg-red-50 border-b border-red-200 px-5 py-3 flex items-center justify-between">
          <div className="text-red-700 font-bold text-sm">⚠ Payment Due</div>
          <div className="text-red-700 font-extrabold text-lg">${invoice.total.toFixed(2)}</div>
        </div>
      )}

      {/* Customer */}
      {customer && (
        <div className="bg-white border-b border-slate-100 px-5 py-3">
          <div className="font-bold text-sm text-slate-900">{customer.name}</div>
          <div className="text-xs text-slate-500">{settings.shop_address} · {settings.shop_phone}</div>
        </div>
      )}

      {/* Line Items */}
      <div className="bg-white border-b border-slate-100 px-5 py-4">
        <div className="text-xs font-bold text-slate-400 uppercase mb-3">Services</div>
        <div className="space-y-3">
          {invoice.line_items.map((item, i) => (
            <div key={i}>
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-slate-900">{item.description}</span>
                <span className="text-sm font-bold text-slate-900">${item.total.toFixed(2)}</span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">Labor ${item.labor.toFixed(2)} · Parts ${item.parts.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="bg-white border-b border-slate-100 px-5 py-4 space-y-1">
        <div className="flex justify-between text-sm text-slate-500"><span>Subtotal</span><span>${invoice.subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between text-sm text-slate-500"><span>Tax ({(invoice.tax_rate * 100).toFixed(0)}%)</span><span>${invoice.tax.toFixed(2)}</span></div>
        <div className="flex justify-between text-base font-extrabold text-slate-900 border-t border-slate-100 pt-2 mt-1">
          <span>Total</span><span>${invoice.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Pay Now */}
      {!isPaid && (
        <div className="px-5 py-4 bg-white border-b border-slate-100">
          <div className="text-xs font-bold text-slate-400 uppercase mb-3">Pay Now</div>
          <PayNow settings={settings} total={invoice.total} />
        </div>
      )}

      {/* PDF Download */}
      <div className="px-5 py-4 text-center">
        <a
          href={`/api/invoice-pdf/${invoice.id}?token=${invoice.public_token}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-slate-500 underline"
        >
          Download PDF
        </a>
      </div>

      {/* Footer */}
      <div className="px-5 pb-8 text-center">
        <p className="text-xs text-slate-400">{settings.shop_phone} · Mon–Sat 9AM–5PM</p>
        <p className="text-xs text-slate-400">{settings.shop_address}</p>
      </div>
    </div>
  );
}
