import { supabaseAdmin } from '../lib/supabase/admin'
import { mockCustomers, mockRepairOrders, mockInvoices } from '../lib/data'

async function seed() {
  console.log('Seeding customers...')
  const { error: ce } = await supabaseAdmin.from('customers').upsert(
    mockCustomers.map(c => ({
      id: c.id,
      name: c.name,
      phone: c.phone,
      email: c.email,
      vehicles: c.vehicles,
      notes: c.notes ?? null,
      status: c.status,
    })),
    { onConflict: 'id' }
  )
  if (ce) { console.error('customers:', ce); process.exit(1) }
  console.log(`✓ ${mockCustomers.length} customers`)

  console.log('Seeding repair orders...')
  const { error: re } = await supabaseAdmin.from('repair_orders').upsert(
    mockRepairOrders.map(r => ({
      id: r.id,
      customer_id: r.customerId,
      vehicle: r.vehicle,
      vin: r.vin ?? null,
      status: r.status,
      services: r.services,
      mileage: r.mileage,
      date_in: r.dateIn,
      date_out: r.dateOut ?? null,
      tech_notes: r.techNotes ?? null,
      total: r.total,
    })),
    { onConflict: 'id' }
  )
  if (re) { console.error('repair_orders:', re); process.exit(1) }
  console.log(`✓ ${mockRepairOrders.length} repair orders`)

  console.log('Seeding invoices...')
  const { error: ie } = await supabaseAdmin.from('invoices').upsert(
    mockInvoices.map(inv => ({
      id: inv.id,
      customer_id: inv.customerId,
      ro_id: inv.roId,
      line_items: inv.services.map(s => ({
        description: s.description,
        labor: s.labor,
        parts: s.parts,
        total: s.labor + s.parts,
      })),
      subtotal: inv.subtotal,
      tax_rate: 0.06,
      tax: inv.tax,
      total: inv.total,
      status: inv.status,
      due_date: inv.dueDate,
    })),
    { onConflict: 'id' }
  )
  if (ie) { console.error('invoices:', ie); process.exit(1) }
  console.log(`✓ ${mockInvoices.length} invoices`)

  console.log('\n✅ Seed complete')
}

seed()
