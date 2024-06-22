import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { PostCreateButtonInvitation } from "./post-create-button";


export default async function InvitationPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Invitaciones" text="Cree y gestione los diferentes Invitaciones de su punto de venta.">
        <div className="hidden md:lg:block">
          <PostCreateButtonInvitation />
        </div>
      </DashboardHeader>

      <div className="block md:lg:hidden">
        <PostCreateButtonInvitation className="w-full m-2" />
      </div>

      <div className="overflow-x-auto">
        <DataTable columns={columns} />
      </div>
    </DashboardShell>
  )
}
