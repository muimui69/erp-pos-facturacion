import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns,  Provider } from "./columns";
import { getAllProviders } from "@/lib/queries/provider";
import { Params } from "@/lib/constants";
import { headers } from "next/headers"
import { PostCreateButtonProvider } from "./post-create-button";

async function getData(): Promise<Provider[]> {
  return [
    {
      id: "m5gr84i9",
      name: "Ken Johnson",
      email: "ken99@yahoo.com",
      phone: "123-456-7890",
    },
    {
      id: "3u1reuv4",
      name: "Abe Smith",
      email: "Abe45@gmail.com",
      phone: "987-654-3210",
    },
    {
      id: "derv1ws0",
      name: "Monserrat Garcia",
      email: "Monserrat44@gmail.com",
      phone: "555-123-4567",
    },
    {
      id: "5kma53ae",
      name: "Silas Brown",
      email: "Silas22@gmail.com",
      phone: "888-777-9999",
    },
    {
      id: "bhqecj4p",
      name: "Carmella Rodriguez",
      email: "carmella@hotmail.com",
      phone: "777-888-5555",
    },
  ];
}
export default async function ProviderPage() {

  // const headerList = headers();
  // const { subdomain } = req.params;

  // const hostname = headerList.get("host")

  const data =  await getData();

  return (
    <DashboardShell>
      <DashboardHeader heading="Proveedores" text="Cree y gestione los diferentes proveedores de su punto de venta.">
      <PostCreateButtonProvider className="mr-6" />

      </DashboardHeader>
      <div className="container overflow-x-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </DashboardShell>
  )
}
