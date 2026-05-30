import type { Metadata } from "next";
import CityPage from "@/components/CityPage";
import { getCity } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Auto Repair in Shoshone, Idaho | Junior's Auto Repair",
  description: "Trusted auto repair serving Shoshone, ID — 38 minutes from Twin Falls. Full-service shop for Lincoln County drivers. Oil changes, brakes, engine diagnostics & more. 4.8 stars.",
  alternates: { canonical: "https://jrs.worker-bee.app/auto-repair-shoshone-idaho" },
};

export default function ShoshonePage() {
  const city = getCity("auto-repair-shoshone-idaho")!;
  return <CityPage city={city} />;
}
