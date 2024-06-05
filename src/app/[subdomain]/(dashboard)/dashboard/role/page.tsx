import { DashboardShell } from "@/components/shell";
import { DashboardHeader } from "@/components/header";
import { columns } from "./columns";
import { PostCreateButtonRoles } from "./post-create-button";
import { DataTable } from "./data-table";


export default async function Roles() {
    return (
        <>
            <DashboardShell>
                <DashboardHeader heading="Roles" text="Cree y gestione los diferentes Roles de su punto de venta.">
                    <PostCreateButtonRoles />
                </DashboardHeader>
                <div className="container overflow-x-auto">
                    <DataTable columns={columns} />
                </div>
            </DashboardShell>
        </>
    )
}