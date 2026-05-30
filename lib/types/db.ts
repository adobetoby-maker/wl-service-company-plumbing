export type CustomerStatus = 'active' | 'inactive' | 'due'
export type ROStatus = 'pending' | 'in-progress' | 'waiting-parts' | 'ready' | 'completed' | 'invoiced'
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue'

export type Customer = {
  id: string
  name: string
  phone: string | null
  email: string | null
  vehicles: string[]
  notes: string | null
  status: CustomerStatus
  created_at: string
}

export type ROService = {
  description: string
  labor: number
  parts: number
}

export type RepairOrder = {
  id: string
  customer_id: string | null
  vehicle: string | null
  vin: string | null
  status: ROStatus
  services: ROService[]
  mileage: number | null
  date_in: string | null
  date_out: string | null
  tech_notes: string | null
  total: number
  created_at: string
}

export type LineItem = {
  description: string
  labor: number
  parts: number
  total: number
}

export type Invoice = {
  id: string
  customer_id: string | null
  ro_id: string | null
  line_items: LineItem[]
  subtotal: number
  tax_rate: number
  tax: number
  total: number
  status: InvoiceStatus
  public_token: string
  sent_at: string | null
  due_date: string | null
  paid_at: string | null
  payment_method: string | null
  notes: string | null
  created_at: string
}

export type Part = {
  id: string
  name: string
  part_number: string | null
  vendor: string | null
  qty: number
  reorder_at: number
  cost: number
  sell_price: number
  created_at: string
}

export type PaymentSettings = {
  id: number
  zelle_number: string | null
  venmo_handle: string | null
  cashapp_handle: string | null
  stripe_enabled: boolean
  stripe_publishable_key: string | null
  tax_rate: number
  shop_name: string
  shop_address: string
  shop_phone: string
  updated_at: string
}
