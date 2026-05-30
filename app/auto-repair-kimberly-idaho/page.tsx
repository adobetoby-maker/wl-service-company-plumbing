import type { Metadata } from "next";
import CityPage from "@/components/CityPage";
import { getCity } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Auto Repair in Kimberly, Idaho | Junior's Auto Repair",
  description: "Trusted auto repair serving Kimberly, ID — just 10 minutes from our shop in Twin Falls. Oil changes, brakes, engine, transmission & more. 4.8 stars, 13 years in Magic Valley.",
  alternates: { canonical: "https://jrs.worker-bee.app/auto-repair-kimberly-idaho" },
};

export default function KimberlyPage() {
  const city = getCity("auto-repair-kimberly-idaho")!;
  return <CityPage city={city} />;
}
