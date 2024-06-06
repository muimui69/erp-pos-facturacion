import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns } from "./columns";
import { PostCreateButtonEmployee } from "./post-create-button";

export default async function EmployeePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Empleados" text="Cree y gestione los empleados de su punto de venta.">
        {/* <PostCreateButtonEmployee className="mr-6" /> */}
      </DashboardHeader>
      <div className="container overflow-x-auto">
        <DataTable columns={columns} />
      </div>
    </DashboardShell>
  )
}

