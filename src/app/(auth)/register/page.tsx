import Link from "next/link"
import { Icons } from "@/components/icons"
import { UserSignupForm } from "@/components/user-signup-form"

export const metadata = {
  title: "Registrate",
  description: "Create una cuenta para poder comenzar",
}

export default function RegisterPage() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="hidden h-full bg-muted lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.user className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Crear una cuenta
            </h1>
            <p className="text-sm text-muted-foreground">
              Por favor rellena los siguientes campos
            </p>
          </div>
          <UserSignupForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Ya tienes una cuenta? {" "}
            <Link
              href="/login"
              className="hover:text-brand underline underline-offset-4"
            >
              Inicia sesion
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
