import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns } from "./columns";
import { PostCreateButtonAtm } from "./post-create-buttton-atm";

export default function BoxPage() {

  return (
    <DashboardShell>
      <DashboardHeader heading="Cajas" text="Cree y gestione cajas.">
        <div className="hidden md:lg:block">
          <PostCreateButtonAtm />
        </div>
      </DashboardHeader>

      <div className="block md:lg:hidden">
        <PostCreateButtonAtm className="w-full m-2" />
      </div>

      <div className="overflow-x-auto">
        <DataTable columns={columns} />
      </div>

    </DashboardShell>
  )
}

