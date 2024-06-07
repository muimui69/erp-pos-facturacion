import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns } from "./columns";
import { PostCreateButtonProvider } from "./post-create-button";

export default async function ProviderPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Proveedores" text="Cree y gestione los diferentes proveedores de su punto de venta.">
      </DashboardHeader>
      <div className="flex justify-center md:lg:justify-end w-full md:w-auto">
        <PostCreateButtonProvider className="md:mr-0 w-full md:lg:w-auto" />
      </div>
      <div className="container overflow-x-auto">
        {/* <DataTable columns={columns} /> */}
      </div>
    </DashboardShell>
  )
}
