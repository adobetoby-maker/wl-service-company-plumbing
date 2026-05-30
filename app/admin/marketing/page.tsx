import MarketingClient from "./MarketingClient";
import { getCustomers } from "@/app/actions/customers";

export default async function MarketingPage() {
  const customers = await getCustomers();
  return <MarketingClient customers={customers} />;
}
