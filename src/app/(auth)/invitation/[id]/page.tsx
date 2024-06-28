"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { toast } from "@/components/ui/use-toast"
import { useInvitations } from "@/hooks/user-invitation"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { useParamsSaas } from "@/hooks/use-params-saas"

interface InvitationProps {
    params: {
        id: number;
    }
}

export default function InvitationPage({ params: { id } }: InvitationProps) {

    const { user } = useParamsSaas()
    const { invitationId, patchAcceptInvitation, isLoadingInvitationId, isErrorInvitationId } = useInvitations(undefined, undefined, undefined, id.toString(), user?.token!);
    const navigate = useRouter();

    const handleSubmit = async () => {
        try {
            await patchAcceptInvitation.mutateAsync({
                token: user?.token!,
                subdomain: invitationId?.data.tenant.hosting!,
                id: invitationId?.data.id!.toString()!,
                invitation: {
                    rolId: invitationId?.data?.rol.id!,
                    userId: invitationId?.data?.user.id!
                }
            })
            navigate.push("/tenants")
            return toast({
                title: `Bienvenido a PointSync ${invitationId?.data.user.name} ${String.fromCodePoint(128079)}!`,
            })
        } catch (err) {
            console.error(err);
            return toast({
                title: "Ha ocurrido un error",
                description: "Verifique que lleno todos los campos correctamente",
                variant: "destructive"
            })
        }
    }


    if (isLoadingInvitationId) {
        return (
            <div className="container flex h-screen w-screen flex-col items-center justify-center">
                <Link
                    href="/"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute left-4 top-4 md:left-8 md:top-8"
                    )}
                >
                    <>
                        <Icons.chevronLeft className="mr-2 h-4 w-4" />
                        Atras
                    </>
                </Link>
                <div className="flex flex-col items-center justify-center h-[100dvh] bg-background px-4 md:px-6">
                    <Card className="w-full max-w-md shadow-xl">
                        <CardContent className="flex flex-col items-start gap-4 w-[400px] h-[150px]">
                            <Skeleton className="h-10 w-full mt-5" />
                            <div className="space-y-2 ">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }


    if (isErrorInvitationId && !isLoadingInvitationId) {
        return (
            <div className="container flex h-screen w-screen flex-col items-center justify-center">
                <Link
                    href="/"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute left-4 top-4 md:left-8 md:top-8"
                    )}
                >
                    <>
                        <Icons.chevronLeft className="mr-2 h-4 w-4" />
                        Atras
                    </>
                </Link>
                <div className="flex flex-col items-center justify-center h-[100dvh] bg-background px-4 md:px-6">
                    <Card className="w-full max-w-md shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl font -bold">La invitacion ya expiro</CardTitle>
                            <CardDescription className="text-muted-foreground">
                                La invitacion ha expirado, por favor solicita una nueva invitacion de ser necesario.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <Link
                href="/"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute left-4 top-4 md:left-8 md:top-8"
                )}
            >
                <>
                    <Icons.chevronLeft className="mr-2 h-4 w-4" />
                    Atras
                </>
            </Link>
            <div className="flex flex-col items-center justify-center h-[100dvh] bg-background px-4 md:px-6">
                <Card className="w-full max-w-md shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font -bold">Aceptar Invitacion</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Ha sido invitado a unirse al equipo de {invitationId?.data.tenant.name}. Haga clic en el botón de abajo para aceptar la invitación
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                        <Button disabled={isLoadingInvitationId} onClick={handleSubmit} className="w-full">Aceptar Invitacion</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )

}
