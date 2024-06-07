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
import { DialogTrigger } from "@radix-ui/react-dialog"
import { DialogEditCategory } from "./edit-dialog"
import { AllCategory } from "@/lib/queries/interfaces/category.interface"
import { useCategories } from "@/hooks/use-category"
import { useParamsClient } from "@/hooks/use-params"

export const columns: ColumnDef<AllCategory>[] = [
    {
        accessorKey: "description",
        header: "Descripcion",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("description")}</div>
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

const ActionCell = ({ row }: { row: Row<AllCategory> }) => {
    const { subdomain, user } = useParamsClient();
    const { deleteCategory } = useCategories(subdomain as never, user?.token);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const categoryId = row.original.id;

    const deleteCategoryById = async (id: number) => {
        try {
            await deleteCategory.mutateAsync({
                subdomain: subdomain as never,
                serviceToken: user?.token!,
                id: id.toString()
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
                    <DropdownMenuItem >
                        Ver detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deleteCategoryById(categoryId)}>
                        Eliminar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {isDialogOpen && (
                <Dialog onOpenChange={() => setIsDialogOpen(false)} open={isDialogOpen}>
                    <DialogTrigger asChild>
                        <DialogEditCategory
                            setIsDialogOpen={setIsDialogOpen}
                            data={row.original}
                        />
                    </DialogTrigger>
                </Dialog>
            )}
        </>
    );
}