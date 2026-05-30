import type { Metadata } from "next";
import CityPage from "@/components/CityPage";
import { getCity } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Auto Repair in Hansen, Idaho | Junior's Auto Repair",
  description: "Trusted auto repair serving Hansen, ID — 15 minutes from our Twin Falls shop. Honest diagnostics, fair prices. Oil changes, brakes, check engine & more. 4.8 stars, 13+ years in Magic Valley.",
  alternates: { canonical: "https://jrs.worker-bee.app/auto-repair-hansen-idaho" },
};

export default function HansenPage() {
  const city = getCity("auto-repair-hansen-idaho")!;
  return <CityPage city={city} />;
}
