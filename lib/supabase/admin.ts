import { createClient } from '@supabase/supabase-js'

// Service role client — bypasses RLS. Never expose to browser.
// Only initialize if we have the required env vars (i.e., not at build time)
const initSupabaseAdmin = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('Supabase environment variables not configured')
  }

  return createClient(url, key)
}

// Create a lazy proxy that only initializes when accessed
let _cached: any = null
export const supabaseAdmin = new Proxy({}, {
  get(target, prop) {
    if (!_cached) {
      _cached = initSupabaseAdmin()
    }
    return Reflect.get(_cached, prop)
  },
}) as any
