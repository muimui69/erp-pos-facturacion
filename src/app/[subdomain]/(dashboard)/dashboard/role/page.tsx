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
                    <div className="hidden md:lg:block">
                        <PostCreateButtonRoles />
                    </div>
                </DashboardHeader>

                <div className="block md:lg:hidden">
                    <PostCreateButtonRoles className="w-full m-2" />
                </div>

                <div className="overflow-x-auto">
                    <DataTable columns={columns} />
                </div>
            </DashboardShell>
        </>
    )
}