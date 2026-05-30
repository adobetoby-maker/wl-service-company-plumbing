import type { Metadata } from "next";
import CityPage from "@/components/CityPage";
import { getCity } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Auto Repair Near Gooding, Idaho | Junior's Auto Repair",
  description: "Serving Gooding County drivers from our Twin Falls shop — 28 miles away. Honest auto repair: oil changes, brakes, engine diagnostics & more. 4.8 stars · 13 years in Magic Valley.",
  alternates: { canonical: "https://jrs.worker-bee.app/auto-repair-gooding-idaho" },
};

export default function GoodingPage() {
  const city = getCity("auto-repair-gooding-idaho")!;
  return <CityPage city={city} />;
}
