import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns, Payment } from "./columns";
import { getAllBranchs, PostCreateBranch } from "@/lib/queries/branch-office";
import { PostCreateSucursal } from "./PostCreateSucursal";

export default async function BranchPage() {
  const data = await getAllBranchs()

  return (
    <DashboardShell>
      <DashboardHeader heading="Sucursales" text="Cree y gestione sucursales.">
        <PostCreateSucursal className="mr-6"/>
        </DashboardHeader>
      <div className="container overflow-x-auto">
        <DataTable columns={columns} data={data.data.branchs} />
      </div>
    </DashboardShell>
  )
}

