import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns, } from "./columns";
import { PostCreateButtonCategory } from "./post-create-button";
import { Params } from "@/lib/constants";
import { getCurrentSubdomain } from "@/lib/utils";
import { getAllCategories } from "@/lib/queries/category";

export default async function CategoryPage(params: Params) {
  const subdomain = getCurrentSubdomain(params);
  console.log('>>>>>>>>>>>>>>>>>>>',subdomain)
  const data = await getAllCategories(subdomain)

  return (
    <DashboardShell>
      <DashboardHeader heading="Categorias" text="Cree y gestione las diferentes Categorias en su Punto de Venta.">
        <PostCreateButtonCategory className="mr-6" />
      </DashboardHeader>
      <div className="container overflow-x-auto">
        <DataTable columns={columns} data={data.data.data.allCategories} />
      </div>
    </DashboardShell>
  )
}
