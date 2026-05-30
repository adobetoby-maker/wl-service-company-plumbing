"use client";
import { useState, useRef, useEffect, useTransition } from "react";
import { Search, Plus } from "lucide-react";
import { searchCustomers, createCustomer } from "@/app/actions/customers";
import type { Customer } from "@/lib/types/db";

type Props = {
  onSelect: (customer: Customer) => void;
};

export default function CustomerSearch({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Customer[]>([]);
  const [showNew, setShowNew] = useState(false);
  const [newForm, setNewForm] = useState({ name: "", phone: "", email: "", vehicle: "" });
  const [isPending, startTransition] = useTransition();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.length < 2) { setResults([]); return; }
    debounceRef.current = setTimeout(() => {
      startTransition(async () => {
        const res = await searchCustomers(query);
        setResults(res);
      });
    }, 200);
  }, [query]);

  function handleSelect(customer: Customer) {
    setQuery(customer.name);
    setResults([]);
    onSelect(customer);
  }

  async function handleCreateNew() {
    if (!newForm.name.trim()) return;
    startTransition(async () => {
      const customer = await createCustomer(newForm);
      setQuery(customer.name);
      setResults([]);
      setShowNew(false);
      onSelect(customer);
    });
  }

  return (
    <div className="relative">
      <div className="bg-slate-100 rounded-xl flex items-center gap-2 px-3 py-2.5">
        <Search size={16} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search or add new customer…"
          className="bg-transparent w-full text-slate-800 text-sm outline-none placeholder:text-slate-400"
        />
      </div>

      {(results.length > 0 || (query.length >= 2 && !showNew)) && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
          {results.map(c => (
            <button
              key={c.id}
              onClick={() => handleSelect(c)}
              className="w-full text-left px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors"
            >
              <div className="font-semibold text-sm text-slate-900">{c.name}</div>
              <div className="text-xs text-slate-500">{c.vehicles[0] ?? "No vehicle on file"} · {c.phone ?? c.email ?? ""}</div>
            </button>
          ))}
          {!showNew && (
            <button
              onClick={() => { setShowNew(true); setNewForm(f => ({ ...f, name: query })); }}
              className="w-full text-left px-4 py-3 text-red-600 font-semibold text-sm flex items-center gap-2 hover:bg-red-50 transition-colors"
            >
              <Plus size={14} /> Add new customer
            </button>
          )}
        </div>
      )}

      {showNew && (
        <div className="mt-2 bg-white border border-slate-200 rounded-xl p-4 space-y-2 shadow-sm">
          <input value={newForm.name} onChange={e => setNewForm(f => ({ ...f, name: e.target.value }))}
            placeholder="Full name *" className="w-full bg-slate-50 rounded-lg px-3 py-2 text-sm border border-slate-100" />
          <input value={newForm.phone} onChange={e => setNewForm(f => ({ ...f, phone: e.target.value }))}
            placeholder="Phone" className="w-full bg-slate-50 rounded-lg px-3 py-2 text-sm border border-slate-100" />
          <input value={newForm.email} onChange={e => setNewForm(f => ({ ...f, email: e.target.value }))}
            placeholder="Email" className="w-full bg-slate-50 rounded-lg px-3 py-2 text-sm border border-slate-100" />
          <input value={newForm.vehicle} onChange={e => setNewForm(f => ({ ...f, vehicle: e.target.value }))}
            placeholder="Vehicle (e.g. 2019 Dodge Ram)" className="w-full bg-slate-50 rounded-lg px-3 py-2 text-sm border border-slate-100" />
          <div className="flex gap-2">
            <button onClick={() => setShowNew(false)}
              className="flex-1 border border-slate-200 text-slate-500 font-semibold py-2 rounded-lg text-sm">
              Cancel
            </button>
            <button onClick={handleCreateNew} disabled={isPending}
              className="flex-1 bg-red-600 text-white font-bold py-2 rounded-lg text-sm disabled:opacity-50">
              {isPending ? "Creating…" : "Create Customer"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
