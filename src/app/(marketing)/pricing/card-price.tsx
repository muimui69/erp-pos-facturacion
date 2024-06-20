"use client"
import { Button } from "@/components/ui/button"
import { CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Data } from "@/lib/queries/interfaces/auth.interface"
import { SuscriptionElement } from "@/lib/queries/interfaces/suscription.interface"
import { createSubdomainUrl, createUrl, createUrlParams } from "@/lib/utils"
import Card from "@mui/joy/Card"
import { Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CardPrice({ data, user }: { data: SuscriptionElement[], user: Data }) {

    const navigate = useRouter()

    const onClick = (subscription: SuscriptionElement) => {
        if (!user) {
            window.location.href = '/login';
            // return toast({
            //     title: `Antes de comprar una suscripcion debe iniciar sesion ${String.fromCodePoint(128079)}!`
            // })
        }
        const { id, name } = subscription;
        const path = createUrlParams('paynament', { id, name });
        navigate.push(path)
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 bg-background ">
            {
                data.map((subscription, index) => (
                    <Card key={index}
                        className="w-full bg-card drop-shadow-xl shadow-black/10 dark:shadow-white/10 dark:text-white">
                        <CardHeader>
                            <CardTitle className="flex item-center justify-center p-5">
                                Plan {subscription.name}
                            </CardTitle>
                            <div className="flex items-center justify-center">
                                <span className="text-3xl font-bold">Bs {subscription.price}</span>
                            </div>
                            {/* <CardDescription>{pricing.description}</CardDescription> */}
                        </CardHeader>

                        <div className="w-full text-center mb-8">
                            <Button
                                onClick={() => onClick(subscription)}
                                className="w-full p-2 rounded-md font-semibold transition-all duration-150 ease-in border-[#13181f]">
                                Comprar ahora
                            </Button>
                        </div>

                        <CardFooter className="flex">
                            <div className="space-y-4">
                                {["4 Miembros de equipo", "4 GB de espacio", "Acceso a modulos basicos"].map(
                                    (benefit: string) => (
                                        <span
                                            key={benefit}
                                            className="flex"
                                        >
                                            <Check className="text-green-500" />{" "}
                                            <h3 >{benefit}</h3>
                                        </span>
                                    )
                                )}
                            </div>
                        </CardFooter>
                    </Card>
                ))
            }

        </div>
    )
}
