"use client"
import {
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
import { DialogEdit } from "./edit-dialog"
import {  BranchElement } from "@/lib/queries/interfaces/branch.interface"
import { useBranchs } from "@/hooks/use-branch"

export const columns: ColumnDef<BranchElement>[] = [
    {
        accessorKey: "name",
        header: "Nombre",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    }, {
        accessorKey: "address",
        header: "Direccion",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("address")}</div>
        ),
    }, {
        accessorKey: "city",
        header: "Ciudad",
        cell: ({ row }) => (
            // row.getValue("city")?.name
            <div className="capitalize">{row.getValue("city")}</div>
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
        header: "Acciones",
        cell: ({ row }) => {
            return <ActionCell row={row} />;
        },
    },
]

const ActionCell = ({ row }: { row: Row<BranchElement> }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { deleteBranch } = useBranchs();
    const branchId = row.original.id;
   
    const deleteBranchById = async (id: number) => {
        try {
            deleteBranch.mutateAsync(id);
        } catch (err) {
            console.error("Error al eliminar una sucursal: ", err);
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
                    <DropdownMenuItem >
                        Ver detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deleteBranchById(branchId)}>
                        Eliminar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {isDialogOpen && (
                <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
                    <DialogTrigger asChild>
                        <DialogEdit
                            setIsDialogOpen={setIsDialogOpen}
                            data={row.original}
                        />
                    </DialogTrigger>
                </Dialog>
            )}
        </>
    );
}