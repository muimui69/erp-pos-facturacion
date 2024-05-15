import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { UserSigninForm } from "@/components/user-signin-form"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
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
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.store className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Bienvenido de vuelta
          </h1>
          <p className="text-sm text-muted-foreground">
            Por favor rellena los siguientes campos
          </p>
        </div>
        <UserSigninForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Todavia no tienes una cuenta? {" "}
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Registrate
          </Link>
        </p>
      </div>
    </div>
  )
}
