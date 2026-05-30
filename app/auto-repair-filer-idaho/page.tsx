import type { Metadata } from "next";
import CityPage from "@/components/CityPage";
import { getCity } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Auto Repair in Filer, Idaho | Junior's Auto Repair",
  description: "Trusted auto repair serving Filer, ID — 12 minutes from our shop in Twin Falls. Honest mechanics, fair prices. Oil changes, brakes, engine & more. 4.8 stars, 13 years in Magic Valley.",
  alternates: { canonical: "https://jrs.worker-bee.app/auto-repair-filer-idaho" },
};

export default function FilerPage() {
  const city = getCity("auto-repair-filer-idaho")!;
  return <CityPage city={city} />;
}
