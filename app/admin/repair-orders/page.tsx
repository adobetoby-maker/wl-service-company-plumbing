import { getRepairOrders } from "@/app/actions/repair-orders";
import RepairOrdersClient from "@/components/admin/repair-orders/RepairOrdersClient";

export default async function RepairOrdersPage() {
  const ros = await getRepairOrders();
  return <RepairOrdersClient ros={ros} />;
}
