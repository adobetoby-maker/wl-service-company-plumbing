import type { Metadata } from "next";
import CityPage from "@/components/CityPage";
import { getCity } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Auto Repair in Hagerman, Idaho | Junior's Auto Repair",
  description: "Trusted auto repair serving Hagerman, ID — 38 minutes from Twin Falls. Honest diagnostics, fair prices for Gooding County drivers. Oil changes, brakes, full repairs. 4.8 stars.",
  alternates: { canonical: "https://jrs.worker-bee.app/auto-repair-hagerman-idaho" },
};

export default function HagermanPage() {
  const city = getCity("auto-repair-hagerman-idaho")!;
  return <CityPage city={city} />;
}
