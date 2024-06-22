import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns } from "./columns";
import { PostCreateButtonProduct } from "./post-create-button";

export default async function ProductPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Productos" text="Cree y gestione los diferentes productos en su Punto de Venta.">
        <div className="hidden md:lg:block">
          <PostCreateButtonProduct />
        </div>
      </DashboardHeader>

      <div className="block md:lg:hidden">
        <PostCreateButtonProduct className="w-full m-2" />
      </div>

      <div className="overflow-x-auto">
        {/* <DataTable columns={columns} /> */}
      </div>

    </DashboardShell>
  )
}

