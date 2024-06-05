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
import { Icons } from "@/components/icons"
import { AllInvitation } from "@/lib/queries/interfaces/invitation.interface"
import { useInvitations } from "@/hooks/user-invitation"
import { useParamsClient } from "@/hooks/use-params"

export const columns: ColumnDef<AllInvitation>[] = [
    {
        accessorKey: "rol",
        header: "Rol",
        cell: ({ row }) => (
            <div className="capitalize">{row.original.rol.desc}</div>
        ),
    },
    {
        accessorKey: "email",
        header: "Correo",
        cell: ({ row }) => (
            <div >{row.original.user.email}</div>

        ),
    },
    {
        accessorKey: "phone",
        header: "Telefono",
        cell: ({ row }) => (
            <div >{row.original.user.phone}</div>

        ),
    },
    {
        accessorKey: "state",
        header: "Estado",
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("state") === "ESPERA" ? "ESPERA" : "ACEPTADO"}</div>

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


const ActionCell = ({ row }: { row: Row<AllInvitation> }) => {

    const { subdomain, user } = useParamsClient();
    const { deleteInvitation, patchResendInvitation } = useInvitations(subdomain as never, user?.token);
    const invitationId = row.original.id;

    console.log(subdomain)

    const deleteInvitationById = async (id: number) => {
        try {
            await deleteInvitation.mutateAsync({
                subdomain: subdomain as never,
                id: id.toString(),
                serviceToken: user?.token!
            });
        } catch (error) {
            console.error("Error al eliminar invitacion: ", error);
        }
    }

    const patchResendInvitationById = async (id: number) => {
        try {
            await patchResendInvitation.mutateAsync({
                subdomain: subdomain as never,
                id: id.toString(),
                serviceToken: user?.token!
            });
        } catch (error) {
            console.error("Error al reenviar invitacion: ", error);
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
                    <DropdownMenuItem onClick={() => patchResendInvitationById(invitationId)}>
                        <Icons.reset className="mr-2 h-4 w-4" /> Reenviar Invitacion
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deleteInvitationById(invitationId)}>
                        <Icons.cancel className="mr-2 h-4 w-4" /> Cancelar Invitacion
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    );
}