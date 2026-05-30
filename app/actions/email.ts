'use server'

import { Resend } from 'resend'
import type { Invoice, Customer, PaymentSettings } from '@/lib/types/db'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendInvoiceEmail(invoice: Invoice, customer: Customer, settings: PaymentSettings): Promise<void> {
  if (!customer.email) throw new Error('Customer has no email address')

  const invoiceUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/invoice/${invoice.public_token}`

  await resend.emails.send({
    from: 'invoices@resend.dev',
    to: customer.email,
    subject: `Invoice ${invoice.id} from ${settings.shop_name} — $${invoice.total.toFixed(2)} due`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:24px">
        <h2 style="color:#0f172a">Hi ${customer.name.split(' ')[0]},</h2>
        <p>Your invoice from ${settings.shop_name} is ready.</p>
        <div style="background:#f8fafc;border-radius:12px;padding:16px;margin:20px 0">
          <div style="font-size:13px;color:#64748b">Invoice ${invoice.id}</div>
          <div style="font-size:28px;font-weight:900;color:#0f172a">$${invoice.total.toFixed(2)}</div>
          <div style="font-size:13px;color:#64748b">Due ${invoice.due_date ?? 'upon receipt'}</div>
        </div>
        <a href="${invoiceUrl}" style="display:block;background:#ef4444;color:white;text-align:center;padding:14px;border-radius:12px;font-weight:700;text-decoration:none;font-size:16px">
          View Invoice &amp; Pay
        </a>
        <p style="color:#64748b;font-size:13px;margin-top:20px">
          Questions? Call us at ${settings.shop_phone} — Mon–Sat 9AM–5PM
        </p>
      </div>
    `,
  })
}
