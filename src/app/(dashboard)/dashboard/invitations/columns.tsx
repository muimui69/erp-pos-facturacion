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
import { Icons } from "@/components/icons"
// import { DialogEditProvider } from "./edit-dialog"

export type Provider = {
    id: string
    name: string
    expiracion: string
    
}


export const columns: ColumnDef<Provider>[] = [
    {
        accessorKey: "name",
        header: "Usuario",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "expiracion",
        header: "Expiracion",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("expiracion")}</div>
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
            const payment = row.original
            return <ActionCell row={row} />;
        },
    },
]

const handleCancel = async ( ): Promise<void> => {
   
     
      //Consumo Api Cancelar invitacion
   
   
      
    
  }

  const handleReset=async():Promise<void>=>{
//Consumo Api Reenviar Invitacion

  }
const ActionCell = ({ row}: { row: Row<Provider>}) => {


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
                    <DropdownMenuItem onClick={handleReset}>
                          <Icons.reset className="mr-2 h-4 w-4" /> Reenviar Invitacion
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCancel}>
                    <Icons.cancel className="mr-2 h-4 w-4" /> Cancelar Invitacion
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            
            
        </>
    );
}