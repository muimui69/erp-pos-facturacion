import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns, Payment } from "./columns";
// import { GetAtm } from "@/lib/queries/atm";


 
export default async function CategoryPage() {
  // const data = await GetAtm()

  return (
    <DashboardShell>
      <DashboardHeader heading="Sucursales" text="Cree y gestione las Sucursales.">
      </DashboardHeader>
      {/* <div className="container overflow-x-auto">
        <DataTable columns={columns} data={data.data.atms} />
      </div> */}
    </DashboardShell>
  )
}

