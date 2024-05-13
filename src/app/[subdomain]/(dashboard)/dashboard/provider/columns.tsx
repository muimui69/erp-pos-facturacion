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
import { DialogEditProvider } from "./edit-dialog"
import { AllProvider } from "@/lib/queries/interfaces/provider.intreface"
import { useParamsClient } from "@/hooks/use-params"
import { useProviders } from "@/hooks/use-provider"


export const columns: ColumnDef<AllProvider>[] = [
    {
        accessorKey: "name",
        header: "Nombre",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: "Correo",
        cell: ({ row }) => (
            <div    >{row.getValue("email")}</div>
        ),
    },
    {
        accessorKey: "phone",
        header: "Telefono",
        cell: ({ row }) => (
            <div >{row.getValue("phone")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status") === false ? "Inactivo" : "Activo"}</div>
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

const ActionCell = ({ row }: { row: Row<AllProvider> }) => {
    const { subdomain } = useParamsClient();
    const { deleteProvider } = useProviders(subdomain as never);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const providerId = row.original.id;

    const deleteProviderById = async (id: string) => {
        try {
            await deleteProvider.mutateAsync({
                subdomain: subdomain as never,
                id: id.toString()
            });
        } catch (error) {
            console.error("Error al eliminar un proveedor: ", error);
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
                    <DropdownMenuItem onClick={() => deleteProviderById(providerId)}>
                        Eliminar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>


            {isDialogOpen && (
                <Dialog onOpenChange={() => setIsDialogOpen(false)} open={isDialogOpen}>
                    <DialogTrigger asChild>
                        <DialogEditProvider
                            setIsDialogOpen={setIsDialogOpen}
                            data={row.original}
                        />
                    </DialogTrigger>
                </Dialog>
            )}
        </>
    );
}