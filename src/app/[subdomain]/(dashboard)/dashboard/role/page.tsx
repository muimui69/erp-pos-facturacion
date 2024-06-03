import { DashboardShell } from "@/components/shell";


import { DashboardHeader } from "@/components/header";
import { Rol, columns } from "./columns";
import { PostCreateButtonRoles } from "./post-create-button";
import { DataTable } from "./data-table";


async function getData(): Promise<Rol[]> {
    return [
        {
            id: "m5gr84i9",
            desc: "Ken Johnson",

        },
        {
            id: "3u1reuv4",
            desc: "Abe Smith",

        },
        {
            id: "derv1ws0",
            desc: "Monserrat Garcia",

        },
        {
            id: "5kma53ae",
            desc: "Silas Brown",

        },
        {
            id: "bhqecj4p",
            desc: "Carmella Rodriguez",

        }, {
            id: "m5gr84i9",
            desc: "Ken Johnson",

        },
        {
            id: "3u1reuv4",
            desc: "Abe Smith",

        },
        {
            id: "derv1ws0",
            desc: "Monserrat Garcia",

        },
        {
            id: "5kma53ae",
            desc: "Silas Brown",

        },
        {
            id: "bhqecj4p",
            desc: "Carmella Rodriguez",

        }, {
            id: "m5gr84i9",
            desc: "Ken Johnson",

        },
        {
            id: "3u1reuv4",
            desc: "Abe Smith",

        },
        {
            id: "derv1ws0",
            desc: "Monserrat Garcia",

        },
        {
            id: "5kma53ae",
            desc: "Silas Brown",

        },
        {
            id: "bhqecj4p",
            desc: "Moyra Rodriguez",

        },
    ];
}

export default async function Roles() {

    const data = await getData();
    return (
        <>
            <DashboardShell>
                <DashboardHeader heading="Roles" text="Cree y gestione los diferentes Roles de su punto de venta.">
                    <PostCreateButtonRoles />

                </DashboardHeader>
                <div className="container overflow-x-auto">
                    <DataTable columns={columns} data={data} />
                </div>
            </DashboardShell>
        </>
    )

}