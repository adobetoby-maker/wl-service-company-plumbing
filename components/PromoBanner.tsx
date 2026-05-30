"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function PromoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-red-600 text-white text-sm font-medium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        <p className="flex-1 text-center">
          <span className="font-bold">$10 off your first oil change</span>
          {" "}— mention this offer when you call.{" "}
          <a href="tel:2085952101" className="underline underline-offset-2 hover:no-underline whitespace-nowrap">
            (208) 595-2101
          </a>
        </p>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss offer"
          className="shrink-0 rounded p-0.5 hover:bg-red-700 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
