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
import { DialogEdit } from "./edit-dialog"
import { ATM } from "@/lib/queries/interfaces/box.interface"
import { useParamsClient } from "@/hooks/use-params"
import { useBoxes } from '../../../../../../hooks/use-box';



export const columns: ColumnDef<ATM>[] = [
    {
        accessorKey: "name",
        header: "Nombre",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "branch",
        header: "Sucursal",
        cell: ({ row }) => (
            <div className="capitalize">{row.original.branch.name}</div>
        ),
    },
    {
        accessorKey: "city",
        header: "Ciudad de la sucursal",
        cell: ({ row }) => (
            <div className="capitalize">{row.original.branch.city.name}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status") === false ? "Activo" : "Activo"}</div>
        ),
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original
            return <ActionCell row={row} />;
        },
    },
]

const ActionCell = ({ row }: { row: Row<ATM> }) => {
    const { subdomain, user } = useParamsClient();
    const { deleteAtm } = useBoxes(subdomain as never, user?.token);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const atmId = row.original.id;

    const deleteAtmById = async (id: number) => {
        try {
            await deleteAtm.mutateAsync({
                subdomain: subdomain as never,
                serviceToken: user?.token!,
                id: id.toString()
            });
        } catch (error) {
            console.error("Error al eliminar una caja: ", error);
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
                    <DropdownMenuItem onClick={() => deleteAtmById(atmId)}>
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