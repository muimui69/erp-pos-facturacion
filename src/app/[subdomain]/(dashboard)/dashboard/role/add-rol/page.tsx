import { DashboardShell } from "@/components/shell";
import { DashboardHeader } from "@/components/header";
import { DataTable } from "./data-table";
import { columns } from "./columns";


export default async function addroles() {
    return (
        <>
            <DashboardShell>
                <DashboardHeader heading="Roles" text="Cree y gestione los diferentes Roles de su punto de venta.">
                </DashboardHeader>
                <div className="container overflow-x-auto">
                    <DataTable columns={columns} />
                </div>
            </DashboardShell>
        </>
    )
}