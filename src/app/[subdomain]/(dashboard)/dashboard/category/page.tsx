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
        <div className="hidden md:lg:block">
          <PostCreateButtonCategory />
        </div>
      </DashboardHeader>

      <div className="block md:lg:hidden">
        <PostCreateButtonCategory className="w-full m-2" />
      </div>

      <div className="overflow-x-auto">
        <DataTable columns={columns} />
      </div>
    </DashboardShell>
  )
}

