import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns } from "./columns";
import { PostCreateButtonEmployee } from "./post-create-button";

export default async function EmployeePage() {

  return (
    <DashboardShell>
      <DashboardHeader heading="Empleados" text="Cree y gestione los empleados de su punto de venta.">
        {/* <div className="hidden md:lg:block">
          <PostCreateButtonEmployee />
        </div> */}
      </DashboardHeader>

      {/* <div className="block md:lg:hidden">
        <PostCreateButtonEmployee className="w-full m-2"/>
      </div> */}

      <div className="overflow-x-auto">
        <DataTable columns={columns} />
      </div>
    </DashboardShell>
  )
}

