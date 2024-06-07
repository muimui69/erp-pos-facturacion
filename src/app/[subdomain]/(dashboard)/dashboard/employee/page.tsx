import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns } from "./columns";
import { PostCreateButtonEmployee } from "./post-create-button";

export default async function EmployeePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Empleados" text="Cree y gestione los empleados de su punto de venta.">
      </DashboardHeader>
      {/* <div className="flex justify-center md:lg:justify-end w-full md:w-auto p-5">
        <PostCreateButtonEmployee className="md:mr-0 w-full md:lg:w-auto" />
      </div> */}
      <div className="container overflow-x-auto">
        <DataTable columns={columns} />
      </div>
    </DashboardShell>
  )
}

