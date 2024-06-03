"use client"
import {
    CaretSortIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"

import {
    ColumnDef,
    Row,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog } from "@/components/ui/dialog"
import { useState } from "react"
import { DialogDemo } from "@/components/dialog"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { AllRole } from "@/lib/queries/interfaces/rol.interface"
import { useParamsClient } from "@/hooks/use-params"
import { useRols } from "@/hooks/use-rol"

export const columns: ColumnDef<AllRole>[] = [
    {
        accessorKey: "desc",
        header: "Descripcion",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("desc")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status") === true ? "Activo" : "Inactivo"}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return <ActionCell row={row} />;
        },
    },
]

const ActionCell = ({ row }: { row: Row<AllRole> }) => {
    const { subdomain, user } = useParamsClient();
    const { deleteRol } = useRols(subdomain as never);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const roleId = row.original.id;

    const deleteRoleById = async (id: number) => {
        try {
            await deleteRol.mutateAsync({
                subdomain: subdomain as never,
                id: id.toString(),
                serviceToken: user?.token!
            });
        } catch (error) {
            console.error("Error al eliminar una categoria: ", error);
        }
    }
    
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* <DropdownMenuItem >
                        Ver detalles
                    </DropdownMenuItem> */}
                    {/* <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                        Editar
                    </DropdownMenuItem> */}
                    <DropdownMenuItem onClick={() => deleteRoleById(roleId)}>
                        Eliminar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>


            {isDialogOpen && (
                <Dialog onOpenChange={() => setIsDialogOpen(false)} open={isDialogOpen}>
                    <DialogTrigger asChild>
                        {/* <DialogEditProvider
                            setIsDialogOpen={setIsDialogOpen}
                            data={row.original}
                        /> */}
                    </DialogTrigger>
                </Dialog>
            )}
        </>
    );
}