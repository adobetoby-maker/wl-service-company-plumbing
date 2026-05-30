import type { Metadata } from "next";
import CityPage from "@/components/CityPage";
import { getCity } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Auto Repair in Wendell, Idaho | Junior's Auto Repair",
  description: "Trusted auto repair serving Wendell, ID — 28 minutes from Twin Falls. Full-service shop: oil changes, transmissions, brakes, engines. Honest mechanics, fair prices. 4.8 stars.",
  alternates: { canonical: "https://jrs.worker-bee.app/auto-repair-wendell-idaho" },
};

export default function WendellPage() {
  const city = getCity("auto-repair-wendell-idaho")!;
  return <CityPage city={city} />;
}
