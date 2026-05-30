"use client";
import { useState, useEffect, useTransition } from "react";
import { getPaymentSettings, updatePaymentSettings } from "@/app/actions/settings";
import { CheckCircle } from "lucide-react";
import type { PaymentSettings } from "@/lib/types/db";

export default function SettingsPage() {
  const [settings, setSettings] = useState<PaymentSettings | null>(null);
  const [saved, setSaved] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getPaymentSettings()
      .then(setSettings)
      .catch(err => setLoadError(err instanceof Error ? err.message : 'Failed to load settings'));
  }, []);

  function handleChange(field: keyof PaymentSettings, value: string | number) {
    setSettings(prev => prev ? { ...prev, [field]: value } : prev);
  }

  function handleSave() {
    if (!settings) return;
    setSaveError(null);
    startTransition(async () => {
      try {
        await updatePaymentSettings({
          zelle_number: settings.zelle_number,
          venmo_handle: settings.venmo_handle,
          cashapp_handle: settings.cashapp_handle,
          tax_rate: settings.tax_rate,
          shop_name: settings.shop_name,
          shop_address: settings.shop_address,
          shop_phone: settings.shop_phone,
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } catch (err) {
        setSaveError(err instanceof Error ? err.message : 'Failed to save settings');
      }
    });
  }

  if (loadError) return <div className="p-6 text-red-500 text-sm">{loadError}</div>;
  if (!settings) return <div className="p-6 text-slate-400">Loading…</div>;

  const fields: { label: string; key: keyof PaymentSettings; placeholder: string }[] = [
    { label: 'Zelle Number', key: 'zelle_number', placeholder: '(208) 595-2101' },
    { label: 'Venmo Handle', key: 'venmo_handle', placeholder: '@jrsauto' },
    { label: 'Cash App Handle', key: 'cashapp_handle', placeholder: '$jrsauto' },
    { label: 'Tax Rate (%)', key: 'tax_rate', placeholder: '6' },
    { label: 'Shop Name', key: 'shop_name', placeholder: "Junior's Auto Repair" },
    { label: 'Shop Address', key: 'shop_address', placeholder: '417 Main Ave E, Twin Falls, ID' },
    { label: 'Shop Phone', key: 'shop_phone', placeholder: '(208) 595-2101' },
  ];

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-extrabold text-slate-900 mb-6">Settings</h1>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h2 className="font-bold text-slate-700">Payment & Shop Info</h2>
        {fields.map(f => (
          <div key={String(f.key)}>
            <label className="block text-xs font-semibold text-slate-500 mb-1">{f.label}</label>
            <input
              value={f.key === 'tax_rate'
                ? ((settings[f.key] as number) * 100).toFixed(1)
                : (settings[f.key] as string) ?? ''}
              onChange={e => handleChange(f.key, f.key === 'tax_rate'
                ? parseFloat(e.target.value) / 100
                : e.target.value)}
              placeholder={f.placeholder}
              className="w-full bg-slate-50 rounded-xl px-3 py-2.5 text-sm border border-slate-200 outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
        ))}

        {saveError && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-sm text-red-700">
            {saveError}
          </div>
        )}
        <button
          onClick={handleSave}
          disabled={isPending}
          className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          {saved ? <><CheckCircle size={16} /> Saved!</> : (isPending ? 'Saving…' : 'Save Settings')}
        </button>
      </div>
    </div>
  );
}
