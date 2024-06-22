import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns } from "./columns";
import { PostCreateButtonProvider } from "./post-create-button";

export default async function ProviderPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Proveedores" text="Cree y gestione los diferentes proveedores de su punto de venta.">
        <div className="hidden md:lg:block">
          <PostCreateButtonProvider />
        </div>
      </DashboardHeader>

      <div className="block md:lg:hidden">
        <PostCreateButtonProvider className="w-full m-2" />
      </div>


      <div className="overflow-x-auto">
        <DataTable columns={columns} />
      </div>

    </DashboardShell>
  )
}
