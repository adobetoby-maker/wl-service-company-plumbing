"use client";
import { useState, useTransition } from "react";
import { Mail, MessageSquare, FileText, CheckCircle } from "lucide-react";
import { updateInvoiceStatus } from "@/app/actions/invoices";
import { sendInvoiceEmail } from "@/app/actions/email";
import type { Invoice, Customer, PaymentSettings } from "@/lib/types/db";

type Props = {
  invoice: Invoice;
  customer: Customer;
  settings: PaymentSettings;
};

export default function SendOptions({ invoice, customer, settings }: Props) {
  const [sent, setSent] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const invoiceUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/invoice/${invoice.public_token}`;

  function handleEmail() {
    startTransition(async () => {
      await sendInvoiceEmail(invoice, customer, settings);
      await updateInvoiceStatus(invoice.id, 'sent');
      setSent('email');
    });
  }

  function handleSMS() {
    const msg = encodeURIComponent(
      `Hi ${customer.name.split(' ')[0]}, your invoice from ${settings.shop_name} for $${invoice.total.toFixed(2)} is ready: ${invoiceUrl}`
    );
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title: `Invoice ${invoice.id}`, url: invoiceUrl })
        .then(() => {
          startTransition(async () => {
            await updateInvoiceStatus(invoice.id, 'sent');
            setSent('sms');
          });
        })
        .catch(() => {});
    } else if (typeof navigator !== 'undefined' && /Mobi/i.test(navigator.userAgent)) {
      window.open(`sms:?&body=${msg}`);
      startTransition(async () => {
        await updateInvoiceStatus(invoice.id, 'sent');
      });
    } else {
      navigator.clipboard?.writeText(invoiceUrl);
      setSent('sms');
      startTransition(async () => {
        await updateInvoiceStatus(invoice.id, 'sent');
      });
    }
  }

  function handlePDF() {
    window.open(`/api/invoice-pdf/${invoice.id}`, '_blank');
  }

  return (
    <div>
      <div className="text-xs font-bold text-slate-500 uppercase mb-2">Send via</div>
      <div className="flex gap-2">
        <button
          onClick={handleEmail}
          disabled={isPending || !customer.email}
          title={!customer.email ? 'No email on file' : undefined}
          className="flex-1 flex items-center justify-center gap-1.5 bg-slate-900 text-white rounded-xl py-3 text-xs font-bold disabled:opacity-40"
        >
          {sent === 'email' ? <CheckCircle size={14} className="text-green-400" /> : <Mail size={14} />}
          Email
        </button>
        <button
          onClick={handleSMS}
          disabled={isPending}
          className="flex-1 flex items-center justify-center gap-1.5 bg-green-600 text-white rounded-xl py-3 text-xs font-bold disabled:opacity-40"
        >
          {sent === 'sms' ? <CheckCircle size={14} /> : <MessageSquare size={14} />}
          SMS Link
        </button>
        <button
          onClick={handlePDF}
          className="flex-1 flex items-center justify-center gap-1.5 bg-slate-100 text-slate-700 rounded-xl py-3 text-xs font-bold"
        >
          <FileText size={14} /> PDF
        </button>
      </div>
      {sent === 'sms' && (
        <p className="text-xs text-slate-500 mt-2 text-center">Invoice link copied to clipboard</p>
      )}
    </div>
  );
}
