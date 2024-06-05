"use client"
import { DashboardShell } from "@/components/shell";


import { DashboardHeader } from "@/components/header";


import { DataTable } from "./data-table";
import { DataTableRole } from "../rol/data-table";
import { columns as columnsRole } from "../rol/columns";
import { columns } from "./columns";
import { PostAddButtonRol } from "./post-create-button";
import { useState } from "react";

export default function AddInvitation() {

    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
    const [selectedRolId, setSelectedRolId] = useState<number>(0);

    const handleUserSelect = (userIds: string[]) => {
        setSelectedUserIds(userIds);
    };

    const handleRolSelect = (rolId: number) => {
        setSelectedRolId(rolId);
    };

    return (
        <>
            <DashboardShell>
                <DashboardHeader heading="Invitaciones" text="Seleccione un Empleado para enviar la Invitacion">
                    <PostAddButtonRol userIds={selectedUserIds} rolId={selectedRolId} />
                </DashboardHeader>
                <div className="hidden items-start justify-center gap-6 rounded-lg md:grid lg:grid-cols-2">
                    <div className="container overflow-x-auto">
                        <DataTable columns={columns} onUserSelect={handleUserSelect} />
                    </div>
                    <div className="container overflow-x-auto">
                        <DataTableRole columns={columnsRole} onRolSelect={handleRolSelect} />
                    </div>
                </div >
            </DashboardShell>
        </>
    )

}