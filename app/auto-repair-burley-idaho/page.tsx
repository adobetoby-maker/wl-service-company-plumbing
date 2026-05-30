import type { Metadata } from "next";
import CityPage from "@/components/CityPage";
import { getCity } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Auto Repair Near Burley, Idaho | Junior's Auto Repair",
  description: "Junior's Auto Repair in Twin Falls serves Burley and Cassia County drivers. Engine, transmission, brakes & full-service repair. 4.8 stars · honest mechanics · Magic Valley.",
  alternates: { canonical: "https://jrs.worker-bee.app/auto-repair-burley-idaho" },
};

export default function BurleyPage() {
  const city = getCity("auto-repair-burley-idaho")!;
  return <CityPage city={city} />;
}
