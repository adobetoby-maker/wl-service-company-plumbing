'use server'

import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import type { PaymentSettings } from '@/lib/types/db'

export async function getPaymentSettings(): Promise<PaymentSettings> {
  const { data, error } = await supabaseAdmin
    .from('payment_settings')
    .select('*')
    .eq('id', 1)
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function updatePaymentSettings(input: Partial<Omit<PaymentSettings, 'id' | 'updated_at'>>): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('payment_settings')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', 1)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/settings')
}
