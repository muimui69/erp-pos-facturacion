"use client"
import {
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
    ColumnDef,
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
import { DialogTrigger } from "@radix-ui/react-dialog"
import { DialogEdit } from "./edit-dialog"
import { EmployeeElement } from "@/lib/queries/interfaces/employee.interface"

export const columns: ColumnDef<EmployeeElement>[] = [
    {
        accessorKey: "email",
        header: "Correo",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("email")}</div>
        ),
    },
    {
        accessorKey: "phone",
        header: "Telefono",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("phone")}</div>
        ),
    },
    {
        accessorKey: "rol",
        header: "Rol",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("rol")}</div>
        ),
    },
    {
        id: "actions",
        header: "Accion",
        enableHiding: false,
        cell: () => {
            return <ActionCell />;
        },
    },
]

const ActionCell = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
                    <DropdownMenuItem >
                        Ver detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Eliminar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {isDialogOpen && (
                <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
                    <DialogTrigger asChild>
                        <DialogEdit />
                    </DialogTrigger>
                </Dialog>
            )}
        </>
    );
}