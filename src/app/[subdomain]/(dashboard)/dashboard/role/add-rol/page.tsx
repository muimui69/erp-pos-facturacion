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
                

                <div className="flex-grow overflow-y-auto md:pb-48 pb-64 max-h-screen scroll-smooth scroll-pt-px">
                    <DataTable columns={columns} />
                </div>
            </DashboardShell>
        </>
    )
}