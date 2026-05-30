"use client";

import { useEffect } from "react";

export default function PageTracker() {
  useEffect(() => {
    // Only track once per session, avoid duplicates on rerenders
    const trackingKey = `pv-${window.location.pathname}-${Date.now() % 60000}`;
    if (typeof window !== "undefined" && !sessionStorage.getItem(trackingKey)) {
      sessionStorage.setItem(trackingKey, "1");

      fetch("/api/pv", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          path: window.location.pathname,
          referrer: document.referrer,
        }),
      }).catch(() => {
        // Silently fail
      });
    }
  }, []);

  return null;
}
