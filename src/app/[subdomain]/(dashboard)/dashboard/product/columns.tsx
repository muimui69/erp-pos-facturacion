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
import { Avatar } from "@files-ui/react";
import { DialogEditProducto } from "./edit-dialog"

export interface Product {
    name: string;
    description: string;
    price: number;
    categories: string;
    photo: string;
  }


export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("description")}</div>
        ),
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue(`price`) + " "+ "bs"}</div>
        ),
    },
   {
        accessorKey: "photo",
        header: "Image",
        cell: ({ row }) => {
            const product = row.getValue('photo');
            console.log(product)
            return (
                <Avatar src={`${product}`} readOnly 
                style={{ width: "200px", height: "200px" }}
                />
            );
        },
    },
{
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }) => (
        <div className="capitalize">{row.getValue("categories")}</div>
    ),
},
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const product = row.original
            return <ActionCell row={row}/>;
        },
    },
]

const ActionCell = ({ row }: { row: Row<Product> }) => {
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
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
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