"use client";
import { useState, useTransition } from "react";
import { Plus, Search, Wrench, Trash2, FileText, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ROWithCustomer } from "@/app/actions/repair-orders";
import { createRepairOrder, updateROStatus, deleteRepairOrder } from "@/app/actions/repair-orders";
import CustomerSearch from "@/components/admin/invoices/CustomerSearch";
import type { Customer, ROService, ROStatus } from "@/lib/types/db";

const statusColors: Record<string, string> = {
  "pending": "bg-slate-100 text-slate-600",
  "in-progress": "bg-blue-100 text-blue-700",
  "waiting-parts": "bg-orange-100 text-orange-700",
  "ready": "bg-green-100 text-green-700",
  "completed": "bg-slate-100 text-slate-500",
  "invoiced": "bg-purple-100 text-purple-700",
};

const statusFlow: ROStatus[] = ["pending", "in-progress", "waiting-parts", "ready", "completed", "invoiced"];

const emptyService = (): ROService => ({ description: "", labor: 0, parts: 0 });

export default function RepairOrdersClient({ ros }: { ros: ROWithCustomer[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // New RO form state
  const [newCustomer, setNewCustomer] = useState<Customer | null>(null);
  const [newVehicle, setNewVehicle] = useState("");
  const [newVin, setNewVin] = useState("");
  const [newMileage, setNewMileage] = useState("");
  const [newDateIn, setNewDateIn] = useState(today());
  const [newServices, setNewServices] = useState<ROService[]>([emptyService()]);
  const [newTechNotes, setNewTechNotes] = useState("");

  function today() {
    return new Date().toISOString().split("T")[0];
  }

  const filtered = ros.filter(ro => {
    const name = ro.customers?.name ?? "";
    const matchSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      (ro.vehicle ?? "").toLowerCase().includes(search.toLowerCase()) ||
      ro.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || ro.status === filter;
    return matchSearch && matchFilter;
  });

  const selectedRO = ros.find(r => r.id === selected);

  function openNew() {
    setShowNew(true);
    setSelected(null);
    setSaveError(null);
    setNewCustomer(null);
    setNewVehicle("");
    setNewVin("");
    setNewMileage("");
    setNewDateIn(today());
    setNewServices([emptyService()]);
    setNewTechNotes("");
  }

  function handleSubmitNewRO() {
    if (!newCustomer || !newVehicle.trim()) return;
    setSaveError(null);
    startTransition(async () => {
      try {
        const ro = await createRepairOrder({
          customerId: newCustomer.id,
          vehicle: newVehicle,
          vin: newVin || undefined,
          mileage: newMileage ? parseInt(newMileage) : undefined,
          dateIn: newDateIn,
          services: newServices.filter(s => s.description.trim()),
          techNotes: newTechNotes || undefined,
        });
        router.refresh();
        setShowNew(false);
        setSelected(ro.id);
      } catch (e) {
        setSaveError(e instanceof Error ? e.message : "Failed to create repair order");
      }
    });
  }

  function handleStatusChange(id: string, status: ROStatus) {
    setSaveError(null);
    startTransition(async () => {
      try {
        await updateROStatus(id, status);
        router.refresh();
      } catch (e) {
        setSaveError(e instanceof Error ? e.message : "Failed to update status");
      }
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this repair order? This cannot be undone.")) return;
    setSaveError(null);
    startTransition(async () => {
      try {
        await deleteRepairOrder(id);
        setSelected(null);
        router.refresh();
      } catch (e) {
        setSaveError(e instanceof Error ? e.message : "Failed to delete repair order");
      }
    });
  }

  function updateService(i: number, field: keyof ROService, value: string | number) {
    setNewServices(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  }

  const roTotal = newServices.reduce((sum, s) => sum + (Number(s.labor) || 0) + (Number(s.parts) || 0), 0);
  const inProgress = ros.filter(r => r.status === "in-progress").length;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Repair Orders</h1>
          <p className="text-slate-500 text-sm">{ros.length} total · {inProgress} in progress</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm"
        >
          <Plus size={16} /> New RO
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
            placeholder="Search ROs…"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {["all", "pending", "in-progress", "waiting-parts", "ready", "completed", "invoiced"].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors capitalize ${filter === s ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
            >
              {s === "all" ? "All" : s.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        {/* List panel */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-50">
            {filtered.map(ro => (
              <button
                key={ro.id}
                onClick={() => { setSelected(ro.id); setShowNew(false); }}
                className={`w-full text-left px-4 py-3.5 hover:bg-slate-50 transition-colors ${selected === ro.id ? "bg-red-50 border-l-2 border-red-600" : ""}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-slate-900">{ro.customers?.name ?? "Unknown"}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[ro.status]}`}>
                    {ro.status.replace(/-/g, " ")}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{ro.vehicle ?? "—"}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-slate-400">{ro.id} · {ro.date_in ?? "—"}</span>
                  <span className="text-xs font-bold text-slate-700">${ro.total.toFixed(2)}</span>
                </div>
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="py-12 text-center text-slate-400 text-sm">No repair orders found</div>
            )}
          </div>
        </div>

        {/* Detail / New RO panel */}
        <div className="lg:col-span-3">
          {showNew ? (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-extrabold text-slate-900 text-lg">New Repair Order</h2>
                <button onClick={() => setShowNew(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Customer *</label>
                  <CustomerSearch onSelect={c => { setNewCustomer(c); setNewVehicle(c.vehicles[0] ?? ""); }} />
                  {newCustomer && (
                    <p className="text-xs text-green-600 mt-1">✓ {newCustomer.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Vehicle *</label>
                    <input
                      value={newVehicle}
                      onChange={e => setNewVehicle(e.target.value)}
                      placeholder="2019 Dodge Ram"
                      className="w-full bg-slate-50 rounded-xl px-3 py-2.5 text-sm border border-slate-100 focus:outline-none focus:border-red-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">VIN</label>
                    <input
                      value={newVin}
                      onChange={e => setNewVin(e.target.value)}
                      placeholder="Optional"
                      className="w-full bg-slate-50 rounded-xl px-3 py-2.5 text-sm border border-slate-100 focus:outline-none focus:border-red-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Mileage</label>
                    <input
                      type="number"
                      value={newMileage}
                      onChange={e => setNewMileage(e.target.value)}
                      placeholder="Optional"
                      className="w-full bg-slate-50 rounded-xl px-3 py-2.5 text-sm border border-slate-100 focus:outline-none focus:border-red-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Date In</label>
                    <input
                      type="date"
                      value={newDateIn}
                      onChange={e => setNewDateIn(e.target.value)}
                      className="w-full bg-slate-50 rounded-xl px-3 py-2.5 text-sm border border-slate-100 focus:outline-none focus:border-red-400"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-slate-600">Services</label>
                    <button
                      onClick={() => setNewServices(s => [...s, emptyService()])}
                      className="text-xs text-red-600 font-semibold hover:text-red-700 flex items-center gap-1"
                    >
                      <Plus size={12} /> Add line
                    </button>
                  </div>
                  <div className="space-y-2">
                    {newServices.map((s, i) => (
                      <div key={i} className="grid grid-cols-[1fr_80px_80px_24px] gap-1.5 items-center">
                        <input
                          value={s.description}
                          onChange={e => updateService(i, "description", e.target.value)}
                          placeholder="Description"
                          className="bg-slate-50 rounded-lg px-2.5 py-2 text-sm border border-slate-100 focus:outline-none focus:border-red-400"
                        />
                        <input
                          type="number"
                          value={s.labor || ""}
                          onChange={e => updateService(i, "labor", parseFloat(e.target.value) || 0)}
                          placeholder="Labor"
                          className="bg-slate-50 rounded-lg px-2.5 py-2 text-sm border border-slate-100 focus:outline-none focus:border-red-400"
                        />
                        <input
                          type="number"
                          value={s.parts || ""}
                          onChange={e => updateService(i, "parts", parseFloat(e.target.value) || 0)}
                          placeholder="Parts"
                          className="bg-slate-50 rounded-lg px-2.5 py-2 text-sm border border-slate-100 focus:outline-none focus:border-red-400"
                        />
                        <button
                          onClick={() => setNewServices(s => s.filter((_, idx) => idx !== i))}
                          className="text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  {roTotal > 0 && (
                    <p className="text-xs text-slate-500 mt-2 text-right font-semibold">
                      Total: ${roTotal.toFixed(2)}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Tech Notes</label>
                  <textarea
                    value={newTechNotes}
                    onChange={e => setNewTechNotes(e.target.value)}
                    placeholder="Optional internal notes…"
                    rows={2}
                    className="w-full bg-slate-50 rounded-xl px-3 py-2.5 text-sm border border-slate-100 focus:outline-none focus:border-red-400 resize-none"
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => setShowNew(false)}
                    className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-xl text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitNewRO}
                    disabled={isPending || !newCustomer || !newVehicle.trim()}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
                  >
                    {isPending ? "Saving…" : "Save RO"}
                  </button>
                </div>
              </div>
            </div>
          ) : selectedRO ? (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-extrabold text-slate-900 text-lg">{selectedRO.id}</h2>
                  <p className="text-slate-500 text-sm">
                    {selectedRO.customers?.name ?? "Unknown"} · {selectedRO.vehicle ?? "—"}
                  </p>
                </div>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full capitalize ${statusColors[selectedRO.status]}`}>
                  {selectedRO.status.replace(/-/g, " ")}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Mileage</p>
                  <p className="font-bold text-slate-900">{selectedRO.mileage?.toLocaleString() ?? "—"}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Date In</p>
                  <p className="font-bold text-slate-900">{selectedRO.date_in ?? "—"}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Total</p>
                  <p className="font-bold text-slate-900">${selectedRO.total.toFixed(2)}</p>
                </div>
              </div>

              {selectedRO.services.length > 0 && (
                <>
                  <h3 className="font-bold text-slate-900 mb-2 text-sm">Services</h3>
                  <div className="space-y-2 mb-5">
                    {selectedRO.services.map((s, i) => (
                      <div key={i} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3 text-sm">
                        <span className="text-slate-700">{s.description}</span>
                        <div className="flex gap-4 text-xs text-slate-500">
                          <span>Labor: ${s.labor.toFixed(2)}</span>
                          <span>Parts: ${s.parts.toFixed(2)}</span>
                          <span className="font-bold text-slate-900">${(s.labor + s.parts).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {selectedRO.tech_notes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-5">
                  <p className="text-xs font-semibold text-yellow-800 mb-1">Tech Notes</p>
                  <p className="text-sm text-yellow-900">{selectedRO.tech_notes}</p>
                </div>
              )}

              <div className="mb-5">
                <p className="text-xs font-medium text-slate-600 mb-2">Update Status</p>
                <div className="flex flex-wrap gap-1.5">
                  {statusFlow.map(s => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(selectedRO.id, s)}
                      disabled={isPending || selectedRO.status === s}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-colors disabled:cursor-default ${
                        selectedRO.status === s
                          ? "bg-slate-900 text-white"
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                      }`}
                    >
                      {s.replace(/-/g, " ")}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => router.push("/admin/invoices/new")}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
                >
                  <FileText size={14} /> Create Invoice
                </button>
                <button
                  onClick={() => handleDelete(selectedRO.id)}
                  disabled={isPending}
                  className="flex items-center gap-2 border border-slate-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-slate-500 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-40"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center text-slate-400 flex flex-col items-center gap-3">
              <Wrench size={32} className="text-slate-200" />
              <p className="text-sm">Select a repair order to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
