import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns } from "./columns";
import { getAllBranchs } from "@/lib/queries/branch-office";
import { PostCreateButtonBranch } from "./post-create-button";

export default async function BranchPage() {
  const data = await getAllBranchs()
 

  return (
    <DashboardShell>
      <DashboardHeader heading="Sucursales" text="Cree y gestione sucursales.">
        <PostCreateButtonBranch className="mr-6" />
      </DashboardHeader>
      <div className="container overflow-x-auto">
        <DataTable columns={columns} data={data.data.branchs} />
      </div>
    </DashboardShell>
  )
}

