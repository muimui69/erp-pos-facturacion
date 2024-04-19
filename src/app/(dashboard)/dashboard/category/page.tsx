import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns, Payment } from "./columns";
import { GetAtm } from "@/lib/queries/Atm";


 
export default async function CategoryPage() {
  const data = await GetAtm()

  return (
    <DashboardShell>
      <DashboardHeader heading="Cajeros Automaticos" text="Cree y gestione los Cajeros Automaticos.">
      </DashboardHeader>
      <div className="container overflow-x-auto">
        <DataTable columns={columns} data={data.data.atms} />
      </div>
    </DashboardShell>
  )
}

