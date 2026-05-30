'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Customer, CustomerStatus } from '@/lib/types/db'

export async function getCustomers(): Promise<Customer[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('name')
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getCustomer(id: string): Promise<Customer | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return data
}

export async function searchCustomers(query: string): Promise<Customer[]> {
  if (!query || query.length < 2) return []
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .ilike('name', `%${query}%`)
    .order('name')
    .limit(6)
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function createCustomer(input: {
  name: string
  phone: string
  email: string
  vehicle: string
}): Promise<Customer> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('customers')
    .insert({
      name: input.name.trim(),
      phone: input.phone.trim() || null,
      email: input.email.trim() || null,
      vehicles: input.vehicle.trim() ? [input.vehicle.trim()] : [],
      status: 'active',
    })
    .select()
    .single()
  if (error) throw new Error(error.message)
  revalidatePath('/admin/customers')
  revalidatePath('/admin/invoices')
  return data
}

export async function updateCustomer(id: string, input: {
  name?: string
  phone?: string
  email?: string
  vehicles?: string[]
  notes?: string
}): Promise<Customer> {
  const supabase = await createClient()
  const updates: Record<string, unknown> = {}
  if (input.name !== undefined) updates.name = input.name.trim()
  if (input.phone !== undefined) updates.phone = input.phone.trim() || null
  if (input.email !== undefined) updates.email = input.email.trim() || null
  if (input.vehicles !== undefined) updates.vehicles = input.vehicles.filter(v => v.trim())
  if (input.notes !== undefined) updates.notes = input.notes.trim() || null
  const { data, error } = await supabase
    .from('customers')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  revalidatePath('/admin/customers')
  return data
}

export async function updateCustomerStatus(id: string, status: CustomerStatus): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('customers')
    .update({ status })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/customers')
}

export async function deleteCustomer(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('customers').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/customers')
}
