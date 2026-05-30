'use server'

import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { calcSubtotal, calcTax, calcTotal } from '@/lib/invoices/calculate'
import type { Invoice, LineItem, InvoiceStatus } from '@/lib/types/db'

async function generateInvoiceId(supabase: Awaited<ReturnType<typeof createClient>>): Promise<string> {
  const year = new Date().getFullYear()
  const { count } = await supabase
    .from('invoices')
    .select('*', { count: 'exact', head: true })
    .like('id', `INV-${year}-%`)
  const seq = String((count ?? 0) + 1).padStart(3, '0')
  return `INV-${year}-${seq}`
}

export async function getInvoices(): Promise<Invoice[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getInvoice(id: string): Promise<Invoice | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return data
}

export async function getInvoiceByToken(token: string): Promise<Invoice | null> {
  const { data, error } = await supabaseAdmin
    .from('invoices')
    .select('*')
    .eq('public_token', token)
    .single()
  if (error) return null
  return data
}

export async function createInvoice(input: {
  customerId: string
  roId?: string
  lineItems: LineItem[]
  taxRate: number
  dueDate: string
  notes?: string
}): Promise<Invoice> {
  const supabase = await createClient()
  const subtotal = calcSubtotal(input.lineItems)
  const tax = calcTax(subtotal, input.taxRate)
  const total = calcTotal(subtotal, tax)

  const { data, error } = await supabase
    .from('invoices')
    .insert({
      id: await generateInvoiceId(supabase),
      customer_id: input.customerId,
      ro_id: input.roId ?? null,
      line_items: input.lineItems,
      subtotal,
      tax_rate: input.taxRate,
      tax,
      total,
      status: 'draft',
      due_date: input.dueDate,
      notes: input.notes ?? null,
    })
    .select()
    .single()
  if (error) throw new Error(error.message)
  revalidatePath('/admin/invoices')
  return data
}

export async function updateInvoice(id: string, input: {
  lineItems: LineItem[]
  taxRate: number
  dueDate?: string
  notes?: string
}): Promise<Invoice> {
  const supabase = await createClient()

  const subtotal = calcSubtotal(input.lineItems)
  const tax = calcTax(subtotal, input.taxRate)
  const total = calcTotal(subtotal, tax)

  const updates: Record<string, unknown> = {
    line_items: input.lineItems,
    subtotal,
    tax_rate: input.taxRate,
    tax,
    total,
  }
  if (input.dueDate !== undefined) updates.due_date = input.dueDate
  if (input.notes !== undefined) updates.notes = input.notes

  const { data, error } = await supabase
    .from('invoices')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  revalidatePath('/admin/invoices')
  revalidatePath(`/admin/invoices/${id}`)
  return data
}

export async function updateInvoiceStatus(id: string, status: InvoiceStatus): Promise<void> {
  const supabase = await createClient()
  const updates: Record<string, unknown> = { status }
  if (status === 'sent') updates.sent_at = new Date().toISOString()
  if (status === 'paid') updates.paid_at = new Date().toISOString()
  const { error } = await supabase.from('invoices').update(updates).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/invoices')
  revalidatePath(`/admin/invoices/${id}`)
}

export async function getCustomerInvoices(customerId: string): Promise<Invoice[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
}
