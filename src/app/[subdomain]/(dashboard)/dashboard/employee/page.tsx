import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns } from "./columns";
import { PostCreateButtonEmployee } from "./post-create-button";
import LayoutEmptyCustom from "@/components/layout-empty-custom";
import { getAllEmployees } from "@/lib/queries/employee";
import { getUserCredentials } from "@/lib/auth";
import { getCurrentSubdomain } from "@/lib/utils";
import { Params } from "@/lib/constants";

export default async function EmployeePage(req: Params) {

  const user = await getUserCredentials();
  const subdomain = getCurrentSubdomain(req)
  const empleados = await getAllEmployees(user?.token as never, subdomain)


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
        {
          empleados.data.data.total === 0 ?
            <LayoutEmptyCustom title="empleado" path="/dashboard/invitation" />
            :
            <DataTable columns={columns} />
        }
      </div>
    </DashboardShell>
  )
}

