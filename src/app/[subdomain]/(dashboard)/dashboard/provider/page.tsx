import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns } from "./columns";
import { getAllProviders } from "@/lib/queries/provider";
import { Params } from "@/lib/constants";
import { headers } from "next/headers"
import { PostCreateButtonProvider } from "./post-create-button";
import { getCurrentSubdomain } from "@/lib/utils";

export default async function ProviderPage(params:Params) {

  // const subdomain = getCurrentSubdomain(params);
  // const data = await getAllProviders(subdomain)

  return (
    <DashboardShell>
      <DashboardHeader heading="Proveedores" text="Cree y gestione los diferentes proveedores de su punto de venta.">
      <PostCreateButtonProvider className="mr-6" />

      </DashboardHeader>
      <div className="container overflow-x-auto">
        {/* <DataTable columns={columns} data={data.data.data.allProviders} /> */}
        <DataTable columns={columns} />
      </div>
    </DashboardShell>
  )
}
