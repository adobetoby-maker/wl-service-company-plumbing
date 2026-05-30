import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { createElement } from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { getInvoice } from '@/app/actions/invoices'
import { getPaymentSettings } from '@/app/actions/settings'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 10, color: '#1e293b' },
  header: { marginBottom: 24 },
  shopName: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#ef4444' },
  invoiceId: { fontSize: 14, fontFamily: 'Helvetica-Bold', marginTop: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  label: { color: '#64748b' },
  divider: { borderBottomWidth: 1, borderBottomColor: '#e2e8f0', marginVertical: 8 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  totalLabel: { fontSize: 12, fontFamily: 'Helvetica-Bold' },
  totalValue: { fontSize: 12, fontFamily: 'Helvetica-Bold' },
  footer: { marginTop: 40, color: '#94a3b8', fontSize: 9, textAlign: 'center' },
})

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Auth check: valid admin session OR matching public_token query param
  const tokenParam = req.nextUrl.searchParams.get('token')
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    // Allow access via matching public_token
    if (!tokenParam) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { data: tokenCheck } = await supabaseAdmin
      .from('invoices')
      .select('id')
      .eq('id', id)
      .eq('public_token', tokenParam)
      .single()
    if (!tokenCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const [invoice, settings] = await Promise.all([
    getInvoice(id),
    getPaymentSettings(),
  ])

  if (!invoice) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  let customerName = 'Customer'
  if (invoice.customer_id) {
    const { data } = await supabaseAdmin.from('customers').select('name').eq('id', invoice.customer_id).single()
    if (data) customerName = data.name
  }

  const doc = createElement(Document, null,
    createElement(Page, { size: 'A4', style: styles.page },
      createElement(View, { style: styles.header },
        createElement(Text, { style: styles.shopName }, settings.shop_name),
        createElement(Text, { style: styles.invoiceId }, `Invoice ${invoice.id}`),
        createElement(Text, { style: { color: '#64748b', marginTop: 2 } }, `${settings.shop_address} · ${settings.shop_phone}`),
      ),
      createElement(View, { style: styles.divider }),
      createElement(View, { style: styles.row },
        createElement(Text, { style: styles.label }, 'Customer'),
        createElement(Text, null, customerName),
      ),
      createElement(View, { style: styles.row },
        createElement(Text, { style: styles.label }, 'Due Date'),
        createElement(Text, null, invoice.due_date ?? 'Upon receipt'),
      ),
      createElement(View, { style: styles.divider }),
      ...invoice.line_items.map((item, idx) =>
        createElement(View, { style: styles.row, key: String(idx) },
          createElement(Text, null, item.description),
          createElement(Text, null, `$${item.total.toFixed(2)}`),
        )
      ),
      createElement(View, { style: styles.divider }),
      createElement(View, { style: styles.row },
        createElement(Text, { style: styles.label }, 'Subtotal'),
        createElement(Text, null, `$${invoice.subtotal.toFixed(2)}`),
      ),
      createElement(View, { style: styles.row },
        createElement(Text, { style: styles.label }, `Tax (${(invoice.tax_rate * 100).toFixed(0)}%)`),
        createElement(Text, null, `$${invoice.tax.toFixed(2)}`),
      ),
      createElement(View, { style: styles.totalRow },
        createElement(Text, { style: styles.totalLabel }, 'Total Due'),
        createElement(Text, { style: styles.totalValue }, `$${invoice.total.toFixed(2)}`),
      ),
      createElement(Text, { style: styles.footer },
        `${settings.shop_name} · ${settings.shop_phone} · Mon–Sat 9AM–5PM`,
      ),
    )
  )

  const buffer = await renderToBuffer(doc)

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="invoice-${invoice.id}.pdf"`,
    },
  })
}
