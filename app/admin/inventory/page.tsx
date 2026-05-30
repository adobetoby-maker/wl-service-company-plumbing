import { getParts } from "@/app/actions/inventory";
import InventoryClient from "@/components/admin/inventory/InventoryClient";

export default async function InventoryPage() {
  const parts = await getParts();
  return <InventoryClient parts={parts} />;
}
