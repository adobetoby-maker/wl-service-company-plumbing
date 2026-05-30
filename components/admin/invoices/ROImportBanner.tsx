"use client";
import { useTransition } from "react";
import { calcLineTotal } from "@/lib/invoices/calculate";
import type { RepairOrder, LineItem } from "@/lib/types/db";

type Props = {
  ro: RepairOrder;
  onImport: (items: LineItem[], roId: string) => void;
};

export default function ROImportBanner({ ro, onImport }: Props) {
  const [isPending, startTransition] = useTransition();
  const partsTotal = ro.services.reduce((s, svc) => s + svc.parts, 0);

  function handleImport() {
    startTransition(() => {
      const items: LineItem[] = ro.services.map(svc => ({
        description: svc.description,
        labor: svc.labor,
        parts: svc.parts,
        total: calcLineTotal(svc.labor, svc.parts),
      }));
      onImport(items, ro.id);
    });
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-center justify-between">
      <div>
        <div className="text-xs font-bold text-blue-700">{ro.id} available</div>
        <div className="text-xs text-blue-500 mt-0.5">
          {ro.services.length} service{ro.services.length !== 1 ? 's' : ''} · ${partsTotal.toFixed(2)} parts logged
        </div>
      </div>
      <button
        onClick={handleImport}
        disabled={isPending}
        className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg disabled:opacity-50"
      >
        {isPending ? "Importing…" : "Import"}
      </button>
    </div>
  );
}
