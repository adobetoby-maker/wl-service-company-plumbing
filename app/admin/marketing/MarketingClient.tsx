"use client";
import { useState } from "react";
import { Users, Send, Search, Phone, Mail, Car, Megaphone, MessageSquare, Star } from "lucide-react";
import type { Customer } from "@/lib/types/db";

type Tab = "clients" | "campaigns" | "reviews";
type Props = { customers: Customer[] };

export default function MarketingClient({ customers }: Props) {
  const [tab, setTab] = useState<Tab>("clients");
  const [search, setSearch] = useState("");
  const [msgTarget, setMsgTarget] = useState("all");
  const [msgText, setMsgText] = useState("");
  const [sent, setSent] = useState(false);

  const active = customers.filter(c => c.status === "active").length;
  const due = customers.filter(c => c.status === "due").length;
  const inactive = customers.filter(c => c.status === "inactive").length;

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.vehicles[0] ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Marketing & CRM</h1>
          <p className="text-slate-500 text-sm">{customers.length} customers</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm text-center">
          <Users size={20} className="text-blue-500 mx-auto mb-1" />
          <p className="text-2xl font-extrabold text-slate-900">{customers.length}</p>
          <p className="text-xs text-slate-500">Total Customers</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm text-center">
          <MessageSquare size={20} className="text-green-500 mx-auto mb-1" />
          <p className="text-2xl font-extrabold text-slate-900">{active}</p>
          <p className="text-xs text-slate-500">Active</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm text-center">
          <Star size={20} className="text-yellow-500 mx-auto mb-1" />
          <p className="text-2xl font-extrabold text-slate-900">4.8★</p>
          <p className="text-xs text-slate-500">Google Rating</p>
        </div>
      </div>

      <div className="flex gap-2 mb-5 border-b border-slate-200">
        {(["clients", "campaigns", "reviews"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 px-1 text-sm font-semibold capitalize border-b-2 transition-colors ${tab === t ? "border-red-600 text-red-600" : "border-transparent text-slate-500 hover:text-slate-900"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "clients" && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-400"
                placeholder="Search customers..."
              />
            </div>
          </div>
          {customers.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
              <Users size={24} className="text-slate-300 mx-auto mb-3" />
              <p className="font-semibold text-slate-700">No customers yet</p>
              <p className="text-sm text-slate-400 mt-1">Customers appear here once added via the invoicing system.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 text-left">
                    <th className="px-4 py-3 font-semibold text-slate-600">Customer</th>
                    <th className="px-4 py-3 font-semibold text-slate-600">Vehicle</th>
                    <th className="px-4 py-3 font-semibold text-slate-600">Status</th>
                    <th className="px-4 py-3 font-semibold text-slate-600">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(c => (
                    <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-slate-900">{c.name}</p>
                        <p className="text-xs text-slate-400">{c.email ?? "—"}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-slate-600 text-xs">
                          <Car size={11} />{c.vehicles[0] ?? "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.status === "active" ? "bg-green-100 text-green-700" : c.status === "due" ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-500"}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          {c.phone && <a href={`tel:${c.phone}`} className="w-6 h-6 bg-slate-100 hover:bg-red-100 hover:text-red-600 rounded-lg flex items-center justify-center transition-colors"><Phone size={11} /></a>}
                          {c.email && <a href={`mailto:${c.email}`} className="w-6 h-6 bg-slate-100 hover:bg-blue-100 hover:text-blue-600 rounded-lg flex items-center justify-center transition-colors"><Mail size={11} /></a>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === "campaigns" && (
        <div className="max-w-xl">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Megaphone size={16} className="text-red-500" /> Send Campaign
          </h3>
          {sent ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
              <p className="text-3xl mb-2">✅</p>
              <p className="font-bold text-green-900">Campaign queued!</p>
              <p className="text-sm text-green-700 mt-1">SMS/email integration required to deliver messages.</p>
              <button onClick={() => { setSent(false); setMsgText(""); }} className="mt-4 text-sm text-green-700 hover:underline">Send Another</button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Send To</label>
                <select value={msgTarget} onChange={e => setMsgTarget(e.target.value)} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-400">
                  <option value="all">All Customers ({customers.length})</option>
                  <option value="active">Active ({active})</option>
                  <option value="due">Balance Due ({due})</option>
                  <option value="inactive">Inactive ({inactive})</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Message</label>
                <textarea value={msgText} onChange={e => setMsgText(e.target.value)} rows={4} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-400 resize-none" placeholder="Hi! It's Pablo at Junior's Auto Repair..." />
                <p className="text-xs text-slate-400 mt-1">{msgText.length}/160</p>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  "Oil change reminder — mention this text for $10 off",
                  "Seasonal special — $20 off any service over $100",
                  "Thank you for your recent visit!",
                ].map(t => (
                  <button key={t} onClick={() => setMsgText(`Hi! It's Pablo at Junior's Auto Repair. ${t}. Call (208) 595-2101 or stop by 417 Main Ave E!`)} className="text-xs bg-slate-50 hover:bg-red-50 hover:text-red-700 text-slate-600 px-3 py-2 rounded-lg text-left transition-colors">
                    {t}
                  </button>
                ))}
              </div>
              <button onClick={() => { if (msgText) setSent(true); }} disabled={!msgText} className="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                <Send size={15} /> Send Campaign
              </button>
            </div>
          )}
        </div>
      )}

      {tab === "reviews" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 max-w-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-5xl font-extrabold text-slate-900">4.8</div>
            <div>
              <div className="flex text-yellow-400 mb-1">
                {"★★★★★".split("").map((s, i) => <span key={i} className="text-xl">{s}</span>)}
              </div>
              <p className="text-slate-500 text-sm">Based on 146 reviews · Google</p>
            </div>
          </div>
          <a
            href="https://www.google.com/search?q=junior%27s+auto+repair+twin+falls"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700"
          >
            View on Google →
          </a>
        </div>
      )}
    </div>
  );
}
