import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns,  Provider } from "./columns";
import { getAllProviders } from "@/lib/queries/provider";
import { Params } from "@/lib/constants";
import { headers } from "next/headers"
import { PostCreateButtonInvitation } from "./post-create-button";


async function getData(): Promise<Provider[]> {
  return [
    {
      id: "m5gr84i9",
      name: "Ken Johnson",
      expiracion: "2022-12-31",
    },
    {
      id: "3u1reuv4",
      name: "Abe Smith",
      expiracion: "2023-06-30",
    },
    {
      id: "derv1ws0",
      name: "Monserrat Garcia",
      expiracion: "2023-09-15",
    },
    {
      id: "5kma53ae",
      name: "Silas Brown",
      expiracion: "2022-11-15",
    },
    {
      id: "bhqecj4p",
      name: "Carmella Rodriguez",
      expiracion: "2023-04-30",
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
      <DashboardHeader heading="Invitaciones" text="Cree y gestione los diferentes Invitaciones de su punto de venta.">
       <PostCreateButtonInvitation className="mr-6" /> 

      </DashboardHeader>
      <div className="container overflow-x-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </DashboardShell>
  )
}

