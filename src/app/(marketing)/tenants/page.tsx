import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { getUserCredentials } from "@/lib/auth"
import { getAllTenantsUser } from "@/lib/queries/tenant"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Areas de trabajo",
}

export default async function TenantsPage() {
  const user = await getUserCredentials();

  if(!user){
    return notFound() 
  }

  const tenants = await getAllTenantsUser(user?.token!)
  const tenantsData = tenants.data.allTenants;
  console.log(tenantsData)

  const pathToSubdomain = (hosting:string) => {
    return `http://${hosting}.localhost:3001?email=${user?.user.email}&workspace=${hosting}&oauth=${user?.token}`;
  }

  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-2xl leading-[1.1] sm:text-2xl md:text-5xl">
          Areas te trabajo
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Aqui puede ver sus diferentes areas de trabajo que ha adquirido.
        </p>
      </div>
      {
        user && tenantsData.map(({ tenants: { hosting } }, index) => (
          <>
            <div className="flex justify-center">
              <div key={index} className="grid w-1/2 items-start gap-10 rounded-lg border p-5 md:grid-cols-[1fr_200px]">
                <div className="grid gap-6">
                  <p className="text-xs sm:text-xl ">
                    {hosting}

                  </p>
                </div>
                <Link href={pathToSubdomain(hosting)} className={cn(buttonVariants({ size: "lg" }))}>
                  Empezar
                </Link>
              </div>
            </div>
          </>
        ))
      }

      {
        tenantsData.length === 0 &&
        <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-4">
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
            No tiene areas de trabajo.{" "}
            <strong>Adquiera uno para su punto de venta,vea nuestras{" "}
              <Link
                href='/pricing'
                className="hover:text-brand underline underline-offset-4"
              >
                membresias.
              </Link>
            </strong>
          </p>
        </div>
      }

    </section>
  )
}
