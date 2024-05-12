import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { UserPaynamentForm } from "@/components/user-paynament-form"

export const metadata: Metadata = {
  title: "Pago",
  description: "Formulario pre-pago membresia",
}

export default function PaynamentPage({ params: { id }, searchParams }: { params: { id: string }; searchParams?: { [key: string]: string | string[] | undefined }}){

  const { name } = searchParams as { [key: string]: string };
  console.log(':::::::::::::::::',id,name)

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/pricing"
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
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.handshake className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Pago de membresia
          </h1>
          <p className="text-sm text-muted-foreground">
            Por favor rellena los siguientes campos
          </p>
        </div>
        <UserPaynamentForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Todavia no tienes una cuenta? Registrate
          </Link>
        </p>
      </div>
    </div>
  )
}
