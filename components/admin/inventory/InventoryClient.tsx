"use client";
import { useState, useTransition } from "react";
import { Plus, Search, Package, AlertTriangle, X, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Part } from "@/lib/types/db";
import { createPart, updatePart, deletePart } from "@/app/actions/inventory";

type PartForm = {
  name: string;
  partNumber: string;
  vendor: string;
  qty: string;
  reorderAt: string;
  cost: string;
  sellPrice: string;
};

const emptyForm = (): PartForm => ({
  name: "", partNumber: "", vendor: "",
  qty: "0", reorderAt: "2", cost: "0", sellPrice: "0",
});

function partToForm(p: Part): PartForm {
  return {
    name: p.name,
    partNumber: p.part_number ?? "",
    vendor: p.vendor ?? "",
    qty: String(p.qty),
    reorderAt: String(p.reorder_at),
    cost: String(p.cost),
    sellPrice: String(p.sell_price),
  };
}

export default function InventoryClient({ parts }: { parts: Part[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [selected, setSelected] = useState<Part | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<PartForm>(emptyForm());
  const [saveError, setSaveError] = useState<string | null>(null);

  const lowStock = parts.filter(p => p.qty <= p.reorder_at);

  const filtered = parts.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.part_number ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (p.vendor ?? "").toLowerCase().includes(search.toLowerCase());
    const matchLow = !lowStockOnly || p.qty <= p.reorder_at;
    return matchSearch && matchLow;
  });

  function openNew() {
    setShowNew(true);
    setSelected(null);
    setEditing(false);
    setSaveError(null);
    setForm(emptyForm());
  }

  function selectPart(p: Part) {
    setSelected(p);
    setShowNew(false);
    setEditing(false);
    setSaveError(null);
  }

  function startEdit() {
    if (!selected) return;
    setForm(partToForm(selected));
    setEditing(true);
  }

  function handleCreate() {
    if (!form.name.trim()) return;
    setSaveError(null);
    startTransition(async () => {
      try {
        await createPart({
          name: form.name,
          partNumber: form.partNumber || undefined,
          vendor: form.vendor || undefined,
          qty: parseInt(form.qty) || 0,
          reorderAt: parseInt(form.reorderAt) || 2,
          cost: parseFloat(form.cost) || 0,
          sellPrice: parseFloat(form.sellPrice) || 0,
        });
        router.refresh();
        setShowNew(false);
      } catch (e) {
        setSaveError(e instanceof Error ? e.message : "Failed to create part");
      }
    });
  }

  function handleSaveEdit() {
    if (!selected || !form.name.trim()) return;
    setSaveError(null);
    startTransition(async () => {
      try {
        await updatePart(selected.id, {
          name: form.name,
          partNumber: form.partNumber || undefined,
          vendor: form.vendor || undefined,
          qty: parseInt(form.qty) || 0,
          reorderAt: parseInt(form.reorderAt) || 2,
          cost: parseFloat(form.cost) || 0,
          sellPrice: parseFloat(form.sellPrice) || 0,
        });
        router.refresh();
        setEditing(false);
      } catch (e) {
        setSaveError(e instanceof Error ? e.message : "Failed to save");
      }
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this part? This cannot be undone.")) return;
    setSaveError(null);
    startTransition(async () => {
      try {
        await deletePart(id);
        setSelected(null);
        router.refresh();
      } catch (e) {
        setSaveError(e instanceof Error ? e.message : "Failed to delete");
      }
    });
  }

  const f = (key: keyof PartForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }));

  const inputCls = "w-full bg-slate-50 rounded-xl px-3 py-2.5 text-sm border border-slate-100 focus:outline-none focus:border-red-400";

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Parts Inventory</h1>
          <p className="text-slate-500 text-sm">
            {parts.length} parts · {lowStock.length > 0 && (
              <span className="text-orange-500 font-semibold">{lowStock.length} low stock</span>
            )}
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm"
        >
          <Plus size={16} /> Add Part
        </button>
      </div>

      {saveError && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {saveError}
        </div>
      )}

      <div className="flex gap-3 mb-4 flex-wrap items-center">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-400 w-64"
            placeholder="Search parts…"
          />
        </div>
        <button
          onClick={() => setLowStockOnly(v => !v)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            lowStockOnly ? "bg-orange-500 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          <AlertTriangle size={12} /> Low stock only
        </button>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        {/* List panel */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-50">
            {filtered.map(p => {
              const isLow = p.qty <= p.reorder_at;
              return (
                <button
                  key={p.id}
                  onClick={() => selectPart(p)}
                  className={`w-full text-left px-4 py-3.5 hover:bg-slate-50 transition-colors ${selected?.id === p.id ? "bg-red-50 border-l-2 border-red-600" : ""}`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-semibold text-sm text-slate-900">{p.name}</span>
                    {isLow ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                        <AlertTriangle size={10} /> Low
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        In stock
                      </span>
                    )}
                  </div>
                  {p.part_number && <p className="text-xs text-slate-400">#{p.part_number}</p>}
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-slate-500">{p.vendor ?? "—"}</span>
                    <span className="text-xs font-bold text-slate-700">
                      {p.qty} / {p.reorder_at} · ${p.sell_price.toFixed(2)}
                    </span>
                  </div>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div className="py-12 text-center text-slate-400 text-sm">No parts found</div>
            )}
          </div>
        </div>

        {/* Detail / Form panel */}
        <div className="lg:col-span-3">
          {showNew || (selected && editing) ? (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-extrabold text-slate-900 text-lg">
                  {showNew ? "Add Part" : "Edit Part"}
                </h2>
                <button
                  onClick={() => { setShowNew(false); setEditing(false); }}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Part Name *</label>
                  <input value={form.name} onChange={f("name")} placeholder="e.g. Oil Filter" className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Part Number</label>
                    <input value={form.partNumber} onChange={f("partNumber")} placeholder="Optional" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Vendor</label>
                    <input value={form.vendor} onChange={f("vendor")} placeholder="Optional" className={inputCls} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Qty on Hand</label>
                    <input type="number" value={form.qty} onChange={f("qty")} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Reorder At</label>
                    <input type="number" value={form.reorderAt} onChange={f("reorderAt")} className={inputCls} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Cost ($)</label>
                    <input type="number" step="0.01" value={form.cost} onChange={f("cost")} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Sell Price ($)</label>
                    <input type="number" step="0.01" value={form.sellPrice} onChange={f("sellPrice")} className={inputCls} />
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => { setShowNew(false); setEditing(false); }}
                    className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-xl text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={showNew ? handleCreate : handleSaveEdit}
                    disabled={isPending || !form.name.trim()}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
                  >
                    {isPending ? "Saving…" : showNew ? "Add Part" : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          ) : selected ? (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h2 className="font-extrabold text-slate-900 text-lg">{selected.name}</h2>
                  {selected.part_number && (
                    <p className="text-xs text-slate-400">#{selected.part_number}</p>
                  )}
                </div>
                <button
                  onClick={startEdit}
                  className="flex items-center gap-1 text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Pencil size={12} /> Edit
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Qty on Hand</p>
                  <p className={`font-bold text-lg ${selected.qty <= selected.reorder_at ? "text-orange-600" : "text-slate-900"}`}>
                    {selected.qty}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Reorder At</p>
                  <p className="font-bold text-lg text-slate-900">{selected.reorder_at}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Cost</p>
                  <p className="font-bold text-slate-900">${selected.cost.toFixed(2)}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Sell Price</p>
                  <p className="font-bold text-slate-900">${selected.sell_price.toFixed(2)}</p>
                </div>
              </div>

              {selected.vendor && (
                <div className="bg-slate-50 rounded-xl p-3 mb-5">
                  <p className="text-xs text-slate-400">Vendor</p>
                  <p className="text-sm font-semibold text-slate-900">{selected.vendor}</p>
                </div>
              )}

              {selected.qty <= selected.reorder_at && (
                <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 mb-5">
                  <AlertTriangle size={16} className="text-orange-500 shrink-0" />
                  <p className="text-sm text-orange-700 font-medium">
                    Low stock — only {selected.qty} remaining (reorder at {selected.reorder_at})
                  </p>
                </div>
              )}

              <button
                onClick={() => handleDelete(selected.id)}
                disabled={isPending}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-500 transition-colors disabled:opacity-40"
              >
                <Trash2 size={12} /> Delete part
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center text-slate-400 flex flex-col items-center gap-3">
              <Package size={32} className="text-slate-200" />
              <p className="text-sm">Select a part to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
