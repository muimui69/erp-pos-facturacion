import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns } from "./columns";
import { PostCreateButtonProduct } from "./post-create-button";
import { getCurrentSubdomain } from "@/lib/utils";
import { getAllProducts } from "@/lib/queries/product";
import { Params } from "@/lib/constants";


export default async function ProductPage(params: Params) {
  // const subdomain = getCurrentSubdomain(params);
  // const data = await getAllProducts(subdomain)

  return (
    <DashboardShell>
      <DashboardHeader heading="Productos" text="Cree y gestione los diferentes productos en su Punto de Venta.">
        <PostCreateButtonProduct className="mr-6" />
      </DashboardHeader>
      <div className="container overflow-x-auto">
        {/* <DataTable columns={columns} data={data.data.allProducts} /> */}
        <DataTable columns={columns}/>
      </div>
    </DashboardShell>
  )
}

