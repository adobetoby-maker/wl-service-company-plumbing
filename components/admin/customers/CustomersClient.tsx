"use client";
import { useState, useTransition } from "react";
import { Plus, Search, Users, Phone, Mail, Car, X, Pencil, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Customer, CustomerStatus, Invoice, RepairOrder } from "@/lib/types/db";
import { createCustomer, updateCustomer, updateCustomerStatus, deleteCustomer } from "@/app/actions/customers";
import { getCustomerInvoices } from "@/app/actions/invoices";
import { getRepairOrdersByCustomer } from "@/app/actions/repair-orders";

const statusColors: Record<CustomerStatus, string> = {
  active: "bg-green-100 text-green-700",
  due: "bg-yellow-100 text-yellow-700",
  inactive: "bg-slate-100 text-slate-500",
};

const invoiceStatusColors: Record<string, string> = {
  draft: "bg-slate-100 text-slate-600",
  sent: "bg-blue-100 text-blue-700",
  paid: "bg-green-100 text-green-700",
  overdue: "bg-red-100 text-red-700",
};

const roStatusColors: Record<string, string> = {
  "pending": "bg-slate-100 text-slate-600",
  "in-progress": "bg-blue-100 text-blue-700",
  "waiting-parts": "bg-orange-100 text-orange-700",
  "ready": "bg-green-100 text-green-700",
  "completed": "bg-slate-100 text-slate-500",
  "invoiced": "bg-purple-100 text-purple-700",
};

type NewForm = { name: string; phone: string; email: string; vehicle: string };
const emptyForm = (): NewForm => ({ name: "", phone: "", email: "", vehicle: "" });

export default function CustomersClient({ customers }: { customers: Customer[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | CustomerStatus>("all");
  const [selected, setSelected] = useState<Customer | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // New customer form
  const [newForm, setNewForm] = useState<NewForm>(emptyForm());

  // Edit mode for selected customer
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Customer>>({});

  // History data for selected customer
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [repairOrders, setRepairOrders] = useState<RepairOrder[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const filtered = customers.filter(c => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone ?? "").includes(search) ||
      (c.email ?? "").toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.status === filter;
    return matchSearch && matchFilter;
  });

  function selectCustomer(c: Customer) {
    setSelected(c);
    setShowNew(false);
    setEditing(false);
    setSaveError(null);
    setInvoices([]);
    setRepairOrders([]);
    setHistoryLoading(true);
    startTransition(async () => {
      const [invs, ros] = await Promise.all([
        getCustomerInvoices(c.id),
        getRepairOrdersByCustomer(c.id),
      ]);
      setInvoices(invs.slice(0, 5));
      setRepairOrders(ros.slice(0, 5));
      setHistoryLoading(false);
    });
  }

  function openNew() {
    setShowNew(true);
    setSelected(null);
    setSaveError(null);
    setNewForm(emptyForm());
  }

  function handleCreate() {
    if (!newForm.name.trim()) return;
    setSaveError(null);
    startTransition(async () => {
      try {
        const c = await createCustomer(newForm);
        router.refresh();
        setShowNew(false);
        selectCustomer(c);
      } catch (e) {
        setSaveError(e instanceof Error ? e.message : "Failed to create customer");
      }
    });
  }

  function startEdit() {
    if (!selected) return;
    setEditForm({
      name: selected.name,
      phone: selected.phone ?? "",
      email: selected.email ?? "",
      vehicles: selected.vehicles,
      notes: selected.notes ?? "",
    });
    setEditing(true);
  }

  function handleSaveEdit() {
    if (!selected || !editForm.name?.trim()) return;
    setSaveError(null);
    startTransition(async () => {
      try {
        await updateCustomer(selected.id, {
          name: editForm.name,
          phone: editForm.phone as string,
          email: editForm.email as string,
          vehicles: editForm.vehicles,
          notes: editForm.notes as string,
        });
        router.refresh();
        setEditing(false);
      } catch (e) {
        setSaveError(e instanceof Error ? e.message : "Failed to save");
      }
    });
  }

  function handleStatusChange(id: string, status: CustomerStatus) {
    setSaveError(null);
    startTransition(async () => {
      try {
        await updateCustomerStatus(id, status);
        router.refresh();
      } catch (e) {
        setSaveError(e instanceof Error ? e.message : "Failed to update status");
      }
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this customer? This cannot be undone.")) return;
    setSaveError(null);
    startTransition(async () => {
      try {
        await deleteCustomer(id);
        setSelected(null);
        router.refresh();
      } catch (e) {
        setSaveError(e instanceof Error ? e.message : "Failed to delete customer");
      }
    });
  }

  const active = customers.filter(c => c.status === "active").length;
  const due = customers.filter(c => c.status === "due").length;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Customers</h1>
          <p className="text-slate-500 text-sm">{customers.length} total · {active} active · {due} due</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm"
        >
          <Plus size={16} /> New Customer
        </button>
      </div>

      {saveError && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {saveError}
        </div>
      )}

      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-400 w-64"
            placeholder="Search customers…"
          />
        </div>
        <div className="flex gap-1.5">
          {(["all", "active", "due", "inactive"] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors capitalize ${filter === s ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        {/* List panel */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-50">
            {filtered.map(c => (
              <button
                key={c.id}
                onClick={() => selectCustomer(c)}
                className={`w-full text-left px-4 py-3.5 hover:bg-slate-50 transition-colors ${selected?.id === c.id ? "bg-red-50 border-l-2 border-red-600" : ""}`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-semibold text-sm text-slate-900">{c.name}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${statusColors[c.status]}`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{c.vehicles[0] ?? "No vehicle on file"}</p>
                <p className="text-xs text-slate-400 mt-0.5">{c.phone ?? c.email ?? "—"}</p>
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="py-12 text-center text-slate-400 text-sm">No customers found</div>
            )}
          </div>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-3">
          {showNew ? (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-extrabold text-slate-900 text-lg">New Customer</h2>
                <button onClick={() => setShowNew(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={18} />
                </button>
              </div>
              <div className="space-y-3">
                <input
                  value={newForm.name}
                  onChange={e => setNewForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Full name *"
                  className="w-full bg-slate-50 rounded-xl px-3 py-2.5 text-sm border border-slate-100 focus:outline-none focus:border-red-400"
                />
                <input
                  value={newForm.phone}
                  onChange={e => setNewForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="Phone"
                  className="w-full bg-slate-50 rounded-xl px-3 py-2.5 text-sm border border-slate-100 focus:outline-none focus:border-red-400"
                />
                <input
                  value={newForm.email}
                  onChange={e => setNewForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="Email"
                  className="w-full bg-slate-50 rounded-xl px-3 py-2.5 text-sm border border-slate-100 focus:outline-none focus:border-red-400"
                />
                <input
                  value={newForm.vehicle}
                  onChange={e => setNewForm(f => ({ ...f, vehicle: e.target.value }))}
                  placeholder="Vehicle (e.g. 2019 Dodge Ram)"
                  className="w-full bg-slate-50 rounded-xl px-3 py-2.5 text-sm border border-slate-100 focus:outline-none focus:border-red-400"
                />
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => setShowNew(false)}
                    className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-xl text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreate}
                    disabled={isPending || !newForm.name.trim()}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
                  >
                    {isPending ? "Saving…" : "Add Customer"}
                  </button>
                </div>
              </div>
            </div>
          ) : selected ? (
            <div className="space-y-4">
              {/* Customer info card */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    {editing ? (
                      <input
                        value={editForm.name ?? ""}
                        onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                        className="text-lg font-extrabold bg-slate-50 rounded-xl px-3 py-1.5 border border-slate-200 focus:outline-none focus:border-red-400 w-full mb-1"
                      />
                    ) : (
                      <h2 className="font-extrabold text-slate-900 text-lg">{selected.name}</h2>
                    )}
                    <div className="flex gap-1.5 mt-1">
                      {(["active", "due", "inactive"] as const).map(s => (
                        <button
                          key={s}
                          onClick={() => handleStatusChange(selected.id, s)}
                          disabled={isPending || selected.status === s}
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize transition-colors disabled:cursor-default ${
                            selected.status === s ? statusColors[s] : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {editing ? (
                      <>
                        <button onClick={() => setEditing(false)} className="text-slate-400 hover:text-slate-600">
                          <X size={16} />
                        </button>
                        <button
                          onClick={handleSaveEdit}
                          disabled={isPending}
                          className="flex items-center gap-1 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg disabled:opacity-40"
                        >
                          <Check size={12} /> Save
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={startEdit}
                        className="flex items-center gap-1 text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Pencil size={12} /> Edit
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  {editing ? (
                    <>
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-slate-400 shrink-0" />
                        <input
                          value={editForm.phone as string ?? ""}
                          onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))}
                          placeholder="Phone"
                          className="flex-1 bg-slate-50 rounded-lg px-2.5 py-1.5 text-sm border border-slate-100 focus:outline-none focus:border-red-400"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-slate-400 shrink-0" />
                        <input
                          value={editForm.email as string ?? ""}
                          onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))}
                          placeholder="Email"
                          className="flex-1 bg-slate-50 rounded-lg px-2.5 py-1.5 text-sm border border-slate-100 focus:outline-none focus:border-red-400"
                        />
                      </div>
                      <div className="flex items-start gap-2">
                        <Car size={14} className="text-slate-400 shrink-0 mt-1.5" />
                        <textarea
                          value={(editForm.vehicles ?? []).join("\n")}
                          onChange={e => setEditForm(f => ({ ...f, vehicles: e.target.value.split("\n").filter(Boolean) }))}
                          placeholder="One vehicle per line"
                          rows={2}
                          className="flex-1 bg-slate-50 rounded-lg px-2.5 py-1.5 text-sm border border-slate-100 focus:outline-none focus:border-red-400 resize-none"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {selected.phone && (
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <Phone size={14} className="text-slate-400" /> {selected.phone}
                        </div>
                      )}
                      {selected.email && (
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <Mail size={14} className="text-slate-400" /> {selected.email}
                        </div>
                      )}
                      {selected.vehicles.length > 0 && (
                        <div className="flex items-start gap-2">
                          <Car size={14} className="text-slate-400 mt-0.5" />
                          <div className="text-sm text-slate-700 space-y-0.5">
                            {selected.vehicles.map((v, i) => <div key={i}>{v}</div>)}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {!editing && (
                  <div className="mt-4 pt-4 border-t border-slate-50">
                    <button
                      onClick={() => handleDelete(selected.id)}
                      disabled={isPending}
                      className="text-xs text-slate-400 hover:text-red-500 transition-colors disabled:opacity-40"
                    >
                      Delete customer
                    </button>
                  </div>
                )}
              </div>

              {/* History */}
              {historyLoading ? (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center text-slate-400 text-sm">
                  Loading history…
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                  <h3 className="font-bold text-slate-900 text-sm mb-3">Recent Activity</h3>

                  {repairOrders.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Repair Orders</p>
                      <div className="space-y-1.5">
                        {repairOrders.map(ro => (
                          <div key={ro.id} className="flex items-center justify-between text-sm">
                            <span className="text-slate-700">{ro.id} · {ro.vehicle ?? "—"}</span>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${roStatusColors[ro.status]}`}>
                              {ro.status.replace(/-/g, " ")}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {invoices.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Invoices</p>
                      <div className="space-y-1.5">
                        {invoices.map(inv => (
                          <div key={inv.id} className="flex items-center justify-between text-sm">
                            <span className="text-slate-700">{inv.id} · ${inv.total.toFixed(2)}</span>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${invoiceStatusColors[inv.status]}`}>
                              {inv.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {repairOrders.length === 0 && invoices.length === 0 && (
                    <p className="text-sm text-slate-400">No activity yet</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center text-slate-400 flex flex-col items-center gap-3">
              <Users size={32} className="text-slate-200" />
              <p className="text-sm">Select a customer to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
