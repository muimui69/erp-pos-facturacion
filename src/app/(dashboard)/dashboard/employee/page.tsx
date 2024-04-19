import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns } from "./columns";
import { getEmployees } from "@/lib/queries/employee";
import { PostCreateButton } from "./post-create-button";

export default async function EmployeePage() {
  const data = await getEmployees()
  console.log(data.data.employees)
  return (
    <DashboardShell>
      <DashboardHeader heading="Empleados" text="Cree y gestione los empleados de su punto de venta.">
        <PostCreateButton className="mr-6" />
      </DashboardHeader>
      <div className="container overflow-x-auto">
        <DataTable columns={columns} data={data.data.employees} />
      </div>
    </DashboardShell>
  )
}

