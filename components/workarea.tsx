import { GetTenantsUserResponse } from "@/lib/queries/interfaces/tenant.interface";
import { Icons } from "./icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

export default function WorkAreaTenants({ tenants, pathToSubdomain }: { tenants: GetTenantsUserResponse, pathToSubdomain: (hosting: string) => string }) {
    return (
        <section className="w-full py-12 md:py-16 lg:py-20">
            <div className="container grid gap-8 px-4 md:px-6">
                <div className="space-y-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Tus areas de trabajo</h2>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Aqui encontraras las diferentes areas de trabajo que has creado o que perteneces.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {
                        tenants.data.allTenants.map(({ tenant: { hosting, createdAt, name }, rol }, index) => (
                            <>
                                <div key={index} className="rounded-lg border bg-background p-6 shadow-xl transition-all hover:shadow-md ">
                                    <div className="mb-4 flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-muted/50 p-2">
                                            <Icons.billing />
                                        </div>
                                        <div>
                                            <h1 className="text-lg font-bold uppercase">{name}</h1>
                                            <h2 className="text-xs font-medium uppercase">mi ROL : {rol.desc}</h2>
                                            <h3 className="text-xm font-semibold">{hosting}</h3>
                                            <p className="text-xs text-muted-foreground">{createdAt}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        <Link href={pathToSubdomain(hosting)} className={cn(buttonVariants({ size: "lg" }))}>
                                            Empezar
                                        </Link>
                                    </p>
                                </div>
                            </>
                        ))
                    }
                </div>
                {
                    tenants.data.allTenants.length === 0 &&
                    <div className="mx-auto flex w-full flex-col gap-4 justify-center text-center">
                        <p className="leading-normal text-muted-foreground sm:leading-7">
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
            </div>
        </section>
    )
}
