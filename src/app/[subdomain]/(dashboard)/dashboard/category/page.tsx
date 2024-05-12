import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { Category, columns, } from "./columns";
import { PostCreateButtonCategory } from "./post-create-button";
import { getAllProviders } from "@/lib/queries/provider";
import { NextRequest } from "next/server";
import { Params } from "@/lib/constants";
import { getCurrentSubdomain } from "@/lib/utils";

async function getData(): Promise<Category[]> {
  return [
    {
      id: "m5gr84i9",
      description: "Lacteos",

    },
    {
      id: "3u1reuv4",
      description: "Limpieza",

    },
    {
      id: "derv1ws0",
      description: "Dulces",

    },

  ]
}

export default async function ProviderPage(params: Params) {
  const subdomain = getCurrentSubdomain(params);
  console.log('????????????', subdomain)

  const data = await getAllProviders(subdomain)

  return (
    <DashboardShell>
      <DashboardHeader heading="Categorias" text="Cree y gestione las diferentes Categorias en su Punto de Venta.">
        <PostCreateButtonCategory className="mr-6" />
      </DashboardHeader>
      <div className="container overflow-x-auto">
        {/* <DataTable columns={columns} data={data.data.data.allProviders} /> */}
      </div>
    </DashboardShell>
  )
}

