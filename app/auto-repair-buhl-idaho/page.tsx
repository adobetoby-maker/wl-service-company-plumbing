import type { Metadata } from "next";
import CityPage from "@/components/CityPage";
import { getCity } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Auto Repair in Buhl, Idaho | Junior's Auto Repair",
  description: "Serving Buhl, ID drivers with honest auto repair in Twin Falls — 19 miles away. Oil changes, brakes, transmission, AC & more. 4.8 stars · 13 years serving Magic Valley.",
  alternates: { canonical: "https://jrs.worker-bee.app/auto-repair-buhl-idaho" },
};

export default function BuhlPage() {
  const city = getCity("auto-repair-buhl-idaho")!;
  return <CityPage city={city} />;
}
