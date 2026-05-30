import type { Metadata } from "next";
import CityPage from "@/components/CityPage";
import { getCity } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Auto Repair in Rupert, Idaho | Junior's Auto Repair",
  description: "Trusted auto repair serving Rupert & Minidoka County — 45 minutes from Twin Falls. Honest mechanics for major repairs: transmissions, engines, AC. 4.8 stars, 13 years in Magic Valley.",
  alternates: { canonical: "https://jrs.worker-bee.app/auto-repair-rupert-idaho" },
};

export default function RupertPage() {
  const city = getCity("auto-repair-rupert-idaho")!;
  return <CityPage city={city} />;
}
