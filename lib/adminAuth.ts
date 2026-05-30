// Admin session verification — shared helper for API route auth guards
// The current design uses ADMIN_SECRET as the session token.
// TODO before first client deploy: replace with per-user signed JWT or 
//   session-id stored in Supabase sessions table (see security-review.md)
import { NextRequest } from 'next/server'

const ADMIN_SECRET = process.env.ADMIN_SECRET

export function verifyAdminSession(req: NextRequest): boolean {
  if (!ADMIN_SECRET) return false  // fail closed if env var missing
  const session = req.cookies.get('admin_session')?.value
  return session === ADMIN_SECRET
}

export function unauthorizedResponse() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 })
}
