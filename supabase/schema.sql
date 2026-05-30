-- Run this in the Supabase SQL editor: Dashboard → SQL Editor → New Query

create extension if not exists "uuid-ossp";

-- CUSTOMERS
create table if not exists customers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text,
  email text,
  vehicles text[] default '{}',
  notes text,
  status text not null default 'active'
    check (status in ('active', 'inactive', 'due')),
  created_at timestamptz default now()
);

-- REPAIR ORDERS
create table if not exists repair_orders (
  id text primary key,
  customer_id uuid references customers(id) on delete set null,
  vehicle text,
  vin text,
  status text not null default 'pending'
    check (status in ('pending','in-progress','waiting-parts','ready','completed','invoiced')),
  services jsonb not null default '[]',
  mileage int,
  date_in date,
  date_out date,
  tech_notes text,
  total numeric(10,2) default 0,
  created_at timestamptz default now()
);

-- INVOICES
create table if not exists invoices (
  id text primary key,
  customer_id uuid references customers(id) on delete set null,
  ro_id text references repair_orders(id) on delete set null,
  line_items jsonb not null default '[]',
  subtotal numeric(10,2) not null default 0,
  tax_rate numeric(5,4) not null default 0.06,
  tax numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0,
  status text not null default 'draft'
    check (status in ('draft','sent','paid','overdue')),
  public_token uuid not null default uuid_generate_v4(),
  sent_at timestamptz,
  due_date date,
  paid_at timestamptz,
  payment_method text,
  notes text,
  created_at timestamptz default now()
);

-- PAYMENT SETTINGS (single row)
create table if not exists payment_settings (
  id int primary key default 1,
  zelle_number text,
  venmo_handle text,
  cashapp_handle text,
  stripe_enabled boolean default false,
  stripe_publishable_key text,
  tax_rate numeric(5,4) default 0.06,
  shop_name text default 'Junior''s Auto Repair',
  shop_address text default '417 Main Ave E, Twin Falls, ID',
  shop_phone text default '(208) 595-2101',
  updated_at timestamptz default now()
);

insert into payment_settings (id) values (1) on conflict do nothing;

-- PARTS INVENTORY
create table if not exists parts_inventory (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  part_number text,
  vendor text,
  qty int not null default 0,
  reorder_at int not null default 2,
  cost numeric(10,2) not null default 0,
  sell_price numeric(10,2) not null default 0,
  created_at timestamptz default now()
);

-- ROW LEVEL SECURITY
alter table customers enable row level security;
alter table repair_orders enable row level security;
alter table invoices enable row level security;
alter table payment_settings enable row level security;

-- Authenticated users (admins) can do everything
create policy "admin_customers" on customers for all to authenticated
  using (true) with check (true);

create policy "admin_repair_orders" on repair_orders for all to authenticated
  using (true) with check (true);

create policy "admin_invoices" on invoices for all to authenticated
  using (true) with check (true);

create policy "admin_settings" on payment_settings for all to authenticated
  using (true) with check (true);

alter table parts_inventory enable row level security;
create policy "admin_parts_inventory" on parts_inventory for all to authenticated
  using (true) with check (true);

-- Note: public invoice page uses the service role client server-side,
-- so no anon policy needed. The UUID public_token provides security.
