import { getCustomers } from "@/app/actions/customers";
import CustomersClient from "@/components/admin/customers/CustomersClient";

export default async function CustomersPage() {
  const customers = await getCustomers();
  return <CustomersClient customers={customers} />;
}
