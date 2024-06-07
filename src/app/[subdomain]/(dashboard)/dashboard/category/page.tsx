import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns, } from "./columns";
import { PostCreateButtonCategory } from "./post-create-button";
import { DataTableBlocker } from "@/components/utils/data-table-block";

export default async function CategoryPage() {

  return (
    <DashboardShell>
      <DashboardHeader heading="Categorias" text="Cree y gestione las diferentes categorias de su punto de venta.">
      </DashboardHeader>
      <div className="flex justify-center md:lg:justify-end w-full md:w-auto p-5">
        <PostCreateButtonCategory className="md:mr-0 w-full md:lg:w-auto" />
      </div>
      <div className="container overflow-x-auto">
        {/* <DataTable columns={columns} /> */}
        {/* <DataTableBlocker /> */}
      </div>
    </DashboardShell>
  )
}

