"use client";
import { Trash2 } from "lucide-react";
import { calcLineTotal } from "@/lib/invoices/calculate";
import type { LineItem as TLineItem } from "@/lib/types/db";

type Props = {
  item: TLineItem;
  onChange: (updated: TLineItem) => void;
  onRemove: () => void;
};

export default function LineItem({ item, onChange, onRemove }: Props) {
  function update(field: keyof TLineItem, raw: string) {
    const value = field === 'description' ? raw : parseFloat(raw) || 0;
    const next = { ...item, [field]: value } as TLineItem;
    if (field === 'labor' || field === 'parts') {
      next.total = calcLineTotal(
        field === 'labor' ? (value as number) : item.labor,
        field === 'parts' ? (value as number) : item.parts
      );
    }
    onChange(next);
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3">
      <div className="flex items-start gap-2 mb-2">
        <input
          value={item.description}
          onChange={e => update('description', e.target.value)}
          placeholder="Service description"
          className="flex-1 bg-slate-50 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 outline-none border border-slate-100"
        />
        <button onClick={onRemove} className="text-slate-300 hover:text-red-500 transition-colors pt-2">
          <Trash2 size={15} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Labor', field: 'labor' as const, value: item.labor },
          { label: 'Parts', field: 'parts' as const, value: item.parts },
          { label: 'Total', field: null, value: item.total },
        ].map(col => (
          <div key={col.label} className="bg-slate-50 rounded-lg p-2 text-center border border-slate-100">
            <div className="text-[10px] text-slate-400 mb-0.5">{col.label}</div>
            {col.field ? (
              <input
                type="number"
                min="0"
                step="0.01"
                value={col.value}
                onChange={e => update(col.field!, e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-slate-800 text-center outline-none"
              />
            ) : (
              <div className="text-sm font-bold text-red-600">${col.value.toFixed(2)}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
