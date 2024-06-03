import { DashboardShell } from "@/components/shell";
import { DashboardHeader } from "@/components/header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { PostCreateButtonRoles } from "./post-create-button";


export default async function addroles() {
    return (
        <>
            <DashboardShell>
                <DashboardHeader heading="Roles" text="Cree y gestione los diferentes Roles de su punto de venta.">
                    {/* <PostCreateButtonRoles className="mr-6" /> */}
                </DashboardHeader>
                <div className="container overflow-x-auto">
                    <DataTable columns={columns} />
                </div>
            </DashboardShell>
        </>
    )
}