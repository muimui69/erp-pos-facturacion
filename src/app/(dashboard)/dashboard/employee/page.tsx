import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns } from "./columns";
import { getEmployees } from "@/lib/queries/employee";
import { PostCreateButtonEmployee } from "./post-create-button";
import Maintenance from "@/src/app/error/maintenance";

export default async function EmployeePage() {
  //  const employee = await getEmployees()

  return (
    <DashboardShell>
      <DashboardHeader heading="Empleados" text="Cree y gestione los empleados de su punto de venta.">
        <PostCreateButtonEmployee className="mr-6" />
      </DashboardHeader>
      <div className="container overflow-x-auto">
        
      </div>
    </DashboardShell>
    // <Maintenance/>
  )
}

