"use client";
import type { PaymentSettings } from "@/lib/types/db";

type Props = { settings: PaymentSettings; total: number };

export default function PayNow({ settings, total }: Props) {
  const fmtTotal = total.toFixed(2);

  return (
    <div className="space-y-2">
      {settings.zelle_number && (
        <a
          href={`zelle://payment?token=${encodeURIComponent(settings.zelle_number)}&amount=${fmtTotal}`}
          className="block bg-purple-700 text-white rounded-xl py-4 text-center font-extrabold text-sm"
        >
          💜 Pay with Zelle — {settings.zelle_number}
        </a>
      )}
      <div className="flex gap-2">
        {settings.venmo_handle && (
          <a
            href={`https://venmo.com/${settings.venmo_handle.replace('@', '')}?txn=pay&amount=${fmtTotal}&note=Auto+Repair`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-500 text-white rounded-xl py-3 text-center font-bold text-sm"
          >
            💙 Venmo
          </a>
        )}
        {settings.cashapp_handle && (
          <a
            href={`https://cash.app/${settings.cashapp_handle.replace('$', '')}/${fmtTotal}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 text-white rounded-xl py-3 text-center font-bold text-sm"
          >
            💚 Cash App
          </a>
        )}
      </div>
      <p className="text-center text-xs text-slate-400 pt-1">
        Paid? Reply to your email or call us — we&apos;ll mark it done.
      </p>
    </div>
  );
}
