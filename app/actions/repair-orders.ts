'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { RepairOrder, ROService, ROStatus } from '@/lib/types/db'

export type ROWithCustomer = RepairOrder & {
  customers: { name: string; phone: string | null } | null
}

async function generateROId(supabase: Awaited<ReturnType<typeof createClient>>): Promise<string> {
  const year = new Date().getFullYear()
  const { count } = await supabase
    .from('repair_orders')
    .select('*', { count: 'exact', head: true })
    .like('id', `RO-${year}-%`)
  const seq = String((count ?? 0) + 1).padStart(3, '0')
  return `RO-${year}-${seq}`
}

export async function getRepairOrders(): Promise<ROWithCustomer[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('repair_orders')
    .select('*, customers(name, phone)')
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return (data ?? []) as ROWithCustomer[]
}

export async function getRepairOrder(id: string): Promise<ROWithCustomer | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('repair_orders')
    .select('*, customers(name, phone)')
    .eq('id', id)
    .single()
  if (error) return null
  return data as ROWithCustomer
}

export async function getRepairOrdersByCustomer(customerId: string): Promise<RepairOrder[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('repair_orders')
    .select('*')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function createRepairOrder(input: {
  customerId: string
  vehicle: string
  vin?: string
  mileage?: number
  dateIn: string
  services: ROService[]
  techNotes?: string
}): Promise<RepairOrder> {
  const supabase = await createClient()
  const total = input.services.reduce((sum, s) => sum + s.labor + s.parts, 0)
  const { data, error } = await supabase
    .from('repair_orders')
    .insert({
      id: await generateROId(supabase),
      customer_id: input.customerId,
      vehicle: input.vehicle.trim(),
      vin: input.vin?.trim() || null,
      mileage: input.mileage ?? null,
      date_in: input.dateIn,
      services: input.services,
      total,
      status: 'pending',
    })
    .select()
    .single()
  if (error) throw new Error(error.message)
  revalidatePath('/admin/repair-orders')
  return data
}

export async function updateROStatus(id: string, status: ROStatus): Promise<void> {
  const supabase = await createClient()
  const updates: Record<string, unknown> = { status }
  if (status === 'completed' || status === 'invoiced') {
    updates.date_out = new Date().toISOString().split('T')[0]
  }
  const { error } = await supabase.from('repair_orders').update(updates).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/repair-orders')
}

export async function updateRepairOrder(id: string, input: {
  vehicle?: string
  vin?: string
  mileage?: number | null
  services?: ROService[]
  techNotes?: string
}): Promise<RepairOrder> {
  const supabase = await createClient()
  const updates: Record<string, unknown> = {}
  if (input.vehicle !== undefined) updates.vehicle = input.vehicle.trim()
  if (input.vin !== undefined) updates.vin = input.vin.trim() || null
  if (input.mileage !== undefined) updates.mileage = input.mileage
  if (input.services !== undefined) {
    updates.services = input.services
    updates.total = input.services.reduce((sum, s) => sum + s.labor + s.parts, 0)
  }
  if (input.techNotes !== undefined) updates.tech_notes = input.techNotes.trim() || null
  const { data, error } = await supabase
    .from('repair_orders')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  revalidatePath('/admin/repair-orders')
  return data
}

export async function deleteRepairOrder(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('repair_orders').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/repair-orders')
}

export async function getUninvoicedROsForCustomer(customerId: string): Promise<RepairOrder[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('repair_orders')
    .select('*')
    .eq('customer_id', customerId)
    .not('status', 'in', '(completed,invoiced)')
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function markROInvoiced(roId: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('repair_orders')
    .update({ status: 'invoiced' })
    .eq('id', roId)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/repair-orders')
}
