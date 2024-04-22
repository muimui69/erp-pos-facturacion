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
import { DialogTrigger } from "@radix-ui/react-dialog"
import { DialogEditCity } from "./edit-dialog"
import { CityElement } from "@/lib/queries/interfaces/city.interface"
import { deleteCityId, putUpdateCity } from "@/lib/queries/city"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "@/provider/ReactQueryClient"

export const columns: ColumnDef<CityElement>[] = [
    {
        accessorKey: "name",
        header: "City",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
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

const ActionCell = ({ row }: { row: Row<CityElement> }) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const cityName = row.original.name;
    const cityId = row.original.id;

    const mutation = useMutation({
        mutationFn: deleteCityId,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['citys'] });
        },
    })

    const deleteCityById = async (id: number) => {
        try {
            await mutation.mutateAsync(id);
        } catch (err) {
            console.error("Error al eliminar una ciudad: ", err);
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
                    <DropdownMenuItem onClick={() => deleteCityById(cityId)}>
                        Eliminar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {isDialogOpen && (
                <Dialog onOpenChange={() => setIsDialogOpen(false)} open={isDialogOpen}>
                    <DialogTrigger asChild>
                        <DialogEditCity
                            setIsDialogOpen={setIsDialogOpen}
                            cityName={cityName}
                            cityId={cityId}
                        />
                    </DialogTrigger>
                </Dialog>
            )}
        </>
    );
}