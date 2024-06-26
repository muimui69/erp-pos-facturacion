import { Icons } from "@/components/icons"
import { UserSigninSubdomainForm } from "@/components/user-signin-subdomain-form"

export const metadata = {
  title: "Iniciar sesion",
  description: "Inicia sesion en tu saas",
}

export default function SiginSubdomainPage() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.store className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Bienvenido de vuelta
            </h1>
            <p className="text-sm text-muted-foreground">
              Por favor rellena los siguientes campos,para iniciar sesion en tu punto de venta.
            </p>
          </div>
          <UserSigninSubdomainForm />
        </div>
      </div>

      <div className="hidden h-full bg-muted lg:block" />

    </div>
  )
}
