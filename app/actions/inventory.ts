'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Part } from '@/lib/types/db'

export async function getParts(): Promise<Part[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('parts_inventory')
    .select('*')
    .order('name')
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getLowStockParts(): Promise<Part[]> {
  const parts = await getParts()
  return parts.filter(p => p.qty <= p.reorder_at)
}

export async function createPart(input: {
  name: string
  partNumber?: string
  vendor?: string
  qty: number
  reorderAt: number
  cost: number
  sellPrice: number
}): Promise<Part> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('parts_inventory')
    .insert({
      name: input.name.trim(),
      part_number: input.partNumber?.trim() || null,
      vendor: input.vendor?.trim() || null,
      qty: input.qty,
      reorder_at: input.reorderAt,
      cost: input.cost,
      sell_price: input.sellPrice,
    })
    .select()
    .single()
  if (error) throw new Error(error.message)
  revalidatePath('/admin/inventory')
  return data
}

export async function updatePart(id: string, input: {
  name?: string
  partNumber?: string
  vendor?: string
  qty?: number
  reorderAt?: number
  cost?: number
  sellPrice?: number
}): Promise<Part> {
  const supabase = await createClient()
  const updates: Record<string, unknown> = {}
  if (input.name !== undefined) updates.name = input.name.trim()
  if (input.partNumber !== undefined) updates.part_number = input.partNumber.trim() || null
  if (input.vendor !== undefined) updates.vendor = input.vendor.trim() || null
  if (input.qty !== undefined) updates.qty = input.qty
  if (input.reorderAt !== undefined) updates.reorder_at = input.reorderAt
  if (input.cost !== undefined) updates.cost = input.cost
  if (input.sellPrice !== undefined) updates.sell_price = input.sellPrice
  const { data, error } = await supabase
    .from('parts_inventory')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  revalidatePath('/admin/inventory')
  return data
}

export async function deletePart(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('parts_inventory').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/inventory')
}
