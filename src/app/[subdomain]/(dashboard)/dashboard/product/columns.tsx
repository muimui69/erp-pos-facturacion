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
import { Avatar } from "@files-ui/react";
import { DialogEditProducto } from "./edit-dialog"
import { AllProduct, CategoryElement } from "@/lib/queries/interfaces/product.interface"
import { useParamsClient } from "@/hooks/use-params"
import { useProducts } from "@/hooks/use-product"

export const columns: ColumnDef<AllProduct>[] = [
    {
        accessorKey: "name",
        header: "Nombre",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "description",
        header: "Descripcion",
        cell: ({ row }) => (
            <div >{row.getValue("description")}</div>
        ),
    },
    {
        accessorKey: "price",
        header: "Precio",
        cell: ({ row }) => (
            <div >{"Bs " + row.getValue(`price`)}</div>
        ),
    },
    {
        accessorKey: "images",
        header: "Foto",
        cell: ({ row }) => {
            const product = row.getValue('images');
            return (
                <Avatar src={`${product}`} readOnly
                    style={{ width: "100px", height: "100px" }}
                />
            );
        },
    },
    {
        accessorKey: "categories",
        header: "Categorias",
        cell: ({ row }) => {
            const categories: CategoryElement[] = row.getValue("categories");
            const categoriesString = categories.map(category => category.category.description).join(", ");
            return <div className="capitalize">{categoriesString}</div>
        },
    },
    // {
    //     accessorKey: "status",
    //     header: "Estado",
    //     cell: ({ row }) => (
    //         <div className="capitalize">{row.getValue("status") === false ? "Inactivo" : "Activo"}</div>
    //     ),
    // },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return <ActionCell row={row} />;
        },
    },
]

const ActionCell = ({ row }: { row: Row<AllProduct> }) => {
    const { subdomain } = useParamsClient();
    const { deleteProduct } = useProducts(subdomain as never);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const productId = row.original.id;

    const deleteCategoryById = async (id: number) => {
        try {
            await deleteProduct.mutateAsync({
                subdomain: subdomain as never,
                id: id.toString()
            });
        } catch (error) {
            console.error("Error al eliminar un producto: ", error);
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
                    <DropdownMenuItem onClick={() => deleteCategoryById(productId)}>
                        Eliminar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {isDialogOpen && (
                <Dialog onOpenChange={() => setIsDialogOpen(false)} open={isDialogOpen}>
                    <DialogTrigger asChild>
                        <DialogEditProducto
                            setIsDialogOpen={setIsDialogOpen}
                            data={row.original}
                        />
                    </DialogTrigger>
                </Dialog>
            )}
        </>
    );
}