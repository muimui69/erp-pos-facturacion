import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { PostCreateButtonInvitation } from "./post-create-button";


export default async function InvitationPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Invitaciones" text="Cree y gestione los diferentes Invitaciones de su punto de venta.">
        <PostCreateButtonInvitation className="mr-6" />
      </DashboardHeader>
      <div className="container overflow-x-auto">
        <DataTable columns={columns} />
      </div>
    </DashboardShell>
  )
}
