export type RepairOrder = {
  id: string;
  customerId: string;
  customerName: string;
  vehicle: string;
  vin?: string;
  status: "pending" | "in-progress" | "waiting-parts" | "ready" | "completed" | "invoiced";
  services: { description: string; labor: number; parts: number }[];
  mileage: number;
  dateIn: string;
  dateOut?: string;
  techNotes?: string;
  total: number;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicles: string[];
  lastService: string;
  totalSpent: number;
  status: "active" | "inactive" | "due";
  notes?: string;
};

export type Invoice = {
  id: string;
  customerId: string;
  customerName: string;
  roId: string;
  date: string;
  dueDate: string;
  services: { description: string; labor: number; parts: number }[];
  subtotal: number;
  tax: number;
  total: number;
  status: "draft" | "sent" | "paid" | "overdue";
  paymentMethod?: string;
};

export type Part = {
  id: string;
  name: string;
  partNumber: string;
  vendor: string;
  qty: number;
  reorderAt: number;
  cost: number;
  sellPrice: number;
};

export type CronJob = {
  id: string;
  name: string;
  description: string;
  schedule: string;
  lastRun?: string;
  nextRun: string;
  status: "active" | "paused" | "error";
  agent: string;
};

export const mockRepairOrders: RepairOrder[] = [
  {
    id: "RO-2026-044",
    customerId: "c1",
    customerName: "Carlos V.",
    vehicle: "2019 Dodge Ram 1500",
    vin: "1C6RR7LT5KS123456",
    status: "in-progress",
    mileage: 68420,
    dateIn: "May 3, 2026",
    services: [
      { description: "Full synthetic oil change (5W-30)", labor: 20, parts: 45 },
      { description: "Cabin air filter replacement", labor: 15, parts: 28 },
      { description: "Brake inspection", labor: 25, parts: 0 },
    ],
    techNotes: "Front pads at 3mm — recommend replacement at next visit",
    total: 133,
  },
  {
    id: "RO-2026-043",
    customerId: "c2",
    customerName: "Linda H.",
    vehicle: "2017 Nissan Altima",
    status: "waiting-parts",
    mileage: 94100,
    dateIn: "May 2, 2026",
    services: [
      { description: "Water pump replacement", labor: 180, parts: 95 },
      { description: "Thermostat replacement", labor: 40, parts: 35 },
      { description: "Coolant flush", labor: 30, parts: 25 },
    ],
    techNotes: "Waiting on water pump from Parts Plus — expected May 4",
    total: 405,
  },
  {
    id: "RO-2026-042",
    customerId: "c3",
    customerName: "Mark K.",
    vehicle: "2020 Ford F-150",
    status: "ready",
    mileage: 42300,
    dateIn: "May 1, 2026",
    dateOut: "May 2, 2026",
    services: [
      { description: "Tire rotation", labor: 25, parts: 0 },
    ],
    total: 114,
  },
  {
    id: "RO-2026-041",
    customerId: "c4",
    customerName: "Sarah M.",
    vehicle: "2018 Honda Pilot",
    status: "invoiced",
    mileage: 77800,
    dateIn: "Apr 28, 2026",
    dateOut: "Apr 29, 2026",
    services: [
      { description: "Transmission fluid service", labor: 60, parts: 45 },
      { description: "Drain and fill (ATF)", labor: 40, parts: 55 },
    ],
    total: 200,
  },
  {
    id: "RO-2026-040",
    customerId: "c5",
    customerName: "David R.",
    vehicle: "2015 Chevy Silverado",
    status: "completed",
    mileage: 118900,
    dateIn: "Apr 22, 2026",
    dateOut: "Apr 23, 2026",
    services: [
      { description: "Front brake pads & rotors", labor: 120, parts: 185 },
      { description: "Brake fluid flush", labor: 35, parts: 20 },
    ],
    total: 360,
  },
];

export const mockCustomers: Customer[] = [
  { id: "c1", name: "Carlos V.", phone: "(208) 555-0505", email: "carlos@email.com", vehicles: ["2019 Dodge Ram 1500"], lastService: "May 3, 2026", totalSpent: 2100, status: "active" },
  { id: "c2", name: "Linda H.", phone: "(208) 555-0606", email: "linda@email.com", vehicles: ["2017 Nissan Altima"], lastService: "May 2, 2026", totalSpent: 455, status: "active" },
  { id: "c3", name: "Mark K.", phone: "(208) 555-0101", email: "mark@email.com", vehicles: ["2020 Ford F-150"], lastService: "May 1, 2026", totalSpent: 620, status: "active" },
  { id: "c4", name: "Sarah M.", phone: "(208) 555-0202", email: "sarah@email.com", vehicles: ["2018 Honda Pilot"], lastService: "Apr 28, 2026", totalSpent: 1240, status: "active" },
  { id: "c5", name: "David R.", phone: "(208) 555-0303", email: "david@email.com", vehicles: ["2015 Chevy Silverado"], lastService: "Apr 22, 2026", totalSpent: 890, status: "due" },
  { id: "c6", name: "Jessica T.", phone: "(208) 555-0404", email: "jessica@email.com", vehicles: ["2022 Toyota RAV4"], lastService: "Jan 15, 2026", totalSpent: 340, status: "inactive" },
];

export const mockInvoices: Invoice[] = [
  {
    id: "INV-2026-041",
    customerId: "c4",
    customerName: "Sarah M.",
    roId: "RO-2026-041",
    date: "Apr 29, 2026",
    dueDate: "May 29, 2026",
    services: [
      { description: "Transmission fluid service", labor: 60, parts: 45 },
      { description: "Drain and fill (ATF)", labor: 40, parts: 55 },
    ],
    subtotal: 200,
    tax: 14,
    total: 214,
    status: "sent",
  },
  {
    id: "INV-2026-040",
    customerId: "c5",
    customerName: "David R.",
    roId: "RO-2026-040",
    date: "Apr 23, 2026",
    dueDate: "May 23, 2026",
    services: [
      { description: "Front brake pads & rotors", labor: 120, parts: 185 },
      { description: "Brake fluid flush", labor: 35, parts: 20 },
    ],
    subtotal: 360,
    tax: 25.20,
    total: 385.20,
    status: "overdue",
  },
  {
    id: "INV-2026-038",
    customerId: "c1",
    customerName: "Carlos V.",
    roId: "RO-2026-038",
    date: "Apr 10, 2026",
    dueDate: "May 10, 2026",
    services: [{ description: "Engine diagnostic + tune-up", labor: 180, parts: 95 }],
    subtotal: 275,
    tax: 19.25,
    total: 294.25,
    status: "paid",
    paymentMethod: "Credit Card",
  },
];

export const mockParts: Part[] = [
  { id: "p1", name: "Oil Filter (Universal)", partNumber: "PH3506", vendor: "Parts Plus", qty: 24, reorderAt: 8, cost: 4.50, sellPrice: 9.99 },
  { id: "p2", name: "5W-30 Full Synthetic (1qt)", partNumber: "MOB15000", vendor: "NAPA", qty: 48, reorderAt: 16, cost: 7.25, sellPrice: 14.99 },
  { id: "p3", name: "Brake Pads - Front (ceramic)", partNumber: "BP7823C", vendor: "Parts Plus", qty: 6, reorderAt: 4, cost: 38, sellPrice: 72 },
  { id: "p4", name: "Brake Rotor (front, 12\")", partNumber: "R5512", vendor: "NAPA", qty: 4, reorderAt: 2, cost: 42, sellPrice: 89 },
  { id: "p5", name: "Air Filter (cabin)", partNumber: "CF11669", vendor: "Parts Plus", qty: 12, reorderAt: 4, cost: 11, sellPrice: 28 },
  { id: "p6", name: "Serpentine Belt (standard)", partNumber: "K061035", vendor: "Gates", qty: 3, reorderAt: 2, cost: 22, sellPrice: 48 },
  { id: "p7", name: "Water Pump (universal)", partNumber: "WP9412", vendor: "Gates", qty: 1, reorderAt: 2, cost: 58, sellPrice: 95 },
  { id: "p8", name: "Coolant (50/50 premix, 1gal)", partNumber: "AF3300", vendor: "NAPA", qty: 8, reorderAt: 4, cost: 14, sellPrice: 28 },
];

export const mockCronJobs: CronJob[] = [
  {
    id: "cron-1",
    name: "Analytics Pull",
    description: "Pull Google Analytics visit data, top pages, traffic sources, and bounce rate. Store in RAG memory.",
    schedule: "0 8 * * 1",
    lastRun: "Apr 28, 2026 8:00 AM",
    nextRun: "May 5, 2026 8:00 AM",
    status: "active",
    agent: "ruflo-analytics-agent",
  },
  {
    id: "cron-2",
    name: "Review Monitor",
    description: "Scrape Google & Facebook for new reviews. Alert Pablo on any negative reviews within 1 hour.",
    schedule: "0 * * * *",
    lastRun: "May 3, 2026 10:00 AM",
    nextRun: "May 3, 2026 11:00 AM",
    status: "active",
    agent: "ruflo-review-agent",
  },
  {
    id: "cron-3",
    name: "Oil Change Reminders",
    description: "Check customer last service dates. Send SMS/email to anyone due for oil change (3+ months).",
    schedule: "0 9 * * 2",
    lastRun: "Apr 29, 2026 9:00 AM",
    nextRun: "May 6, 2026 9:00 AM",
    status: "active",
    agent: "ruflo-marketing-agent",
  },
  {
    id: "cron-4",
    name: "Invoice Follow-up",
    description: "Find overdue invoices (14+ days). Send friendly payment reminder to customer via email.",
    schedule: "0 10 * * *",
    lastRun: "May 3, 2026 10:00 AM",
    nextRun: "May 4, 2026 10:00 AM",
    status: "active",
    agent: "ruflo-billing-agent",
  },
  {
    id: "cron-5",
    name: "SEO Rank Tracker",
    description: "Check Google ranking for top 10 target keywords (\"Twin Falls auto repair\", etc). Log weekly trend.",
    schedule: "0 7 * * 1",
    lastRun: "Apr 28, 2026 7:00 AM",
    nextRun: "May 5, 2026 7:00 AM",
    status: "active",
    agent: "ruflo-seo-agent",
  },
  {
    id: "cron-6",
    name: "Inventory Reorder Check",
    description: "Scan parts inventory. Flag any parts at or below reorder threshold. Email Pablo a restock list.",
    schedule: "0 8 * * 1,4",
    lastRun: "May 1, 2026 8:00 AM",
    nextRun: "May 5, 2026 8:00 AM",
    status: "active",
    agent: "ruflo-inventory-agent",
  },
  {
    id: "cron-7",
    name: "Weekly Revenue Report",
    description: "Compile weekly revenue, invoice totals, new customers, and top services. Email summary to Pablo.",
    schedule: "0 18 * * 5",
    lastRun: "May 2, 2026 6:00 PM",
    nextRun: "May 9, 2026 6:00 PM",
    status: "active",
    agent: "ruflo-reporting-agent",
  },
  {
    id: "cron-8",
    name: "Inactive Customer Win-Back",
    description: "Find customers with no visit in 90+ days. Send personalized win-back offer via SMS.",
    schedule: "0 10 1 * *",
    lastRun: "May 1, 2026 10:00 AM",
    nextRun: "Jun 1, 2026 10:00 AM",
    status: "paused",
    agent: "ruflo-marketing-agent",
  },
];
