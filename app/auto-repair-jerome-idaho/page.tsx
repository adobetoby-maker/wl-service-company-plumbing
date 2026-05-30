import type { Metadata } from "next";
import CityPage from "@/components/CityPage";
import { getCity } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Auto Repair in Jerome, Idaho | Junior's Auto Repair",
  description: "Trusted auto repair serving Jerome, ID — 17 miles from our shop in Twin Falls. Oil changes, brakes, engine, transmission & more. 4.8 stars, 13 years in Magic Valley.",
  alternates: { canonical: "https://jrs.worker-bee.app/auto-repair-jerome-idaho" },
};

export default function JeromePage() {
  const city = getCity("auto-repair-jerome-idaho")!;
  return <CityPage city={city} />;
}
