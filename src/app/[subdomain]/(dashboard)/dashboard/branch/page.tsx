import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns } from "./columns";
import { PostCreateButtonBranch } from "./post-create-button";

export default function BranchPage() {

  return (
    <DashboardShell>
      <DashboardHeader heading="Sucursales" text="Cree y gestione sucursales.">
        <div className="hidden md:lg:block">
          <PostCreateButtonBranch />
        </div>
      </DashboardHeader>

      <div className="block md:lg:hidden">
        <PostCreateButtonBranch className="w-full m-2" />
      </div>

      <div className="overflow-x-auto">
        <DataTable columns={columns} />
      </div>

    </DashboardShell>
  )
}

