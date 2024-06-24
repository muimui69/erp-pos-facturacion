import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export default async  function InvitationPage() {

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
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font -bold">Aceptar Invitacion</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Ha sido invitado a unirse al equipo de {}. Haga clic en el botón de abajo para aceptar la invitación
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                        <Button className="w-full">Aceptar Invitacion</Button>
                        <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4" prefetch={false}>
                            Rechazar Invitacion
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
