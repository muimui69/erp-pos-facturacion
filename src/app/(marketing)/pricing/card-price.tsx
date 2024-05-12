"use client"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Data } from "@/lib/queries/interfaces/auth.interface"
import { SuscriptionElement } from "@/lib/queries/interfaces/suscription.interface"
import { createSubdomainUrl, createUrl, createUrlParams } from "@/lib/utils"
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
        <ul className="flex items-start justify-between gap-8 mt-10 md:flex-row flex-col">
            {
                data.map((subscription, index) => (
                    <li key={index}
                        className="w-full lg:w-[32%] px-10 pt-16 pb-8 bg-white rounded-lg self-stretch hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in border border-gray-300">
                        <h2
                            className="text-center font-semibold text-lg tracking-wider mb-3">
                            Plan {subscription.name}</h2>
                        <p className="text-center tracking-tighter block mb-14">
                            <span className="text-4xl font-bold">Bs {subscription.price}</span>
                            <span className="text-black/40 text-center"></span>
                        </p>
                        <div className="w-full text-center mb-8">
                            <Button
                                onClick={() => onClick(subscription)}
                                className="w-full p-2 bg-[#13181f] text-white rounded-md font-semibold hover:bg-[#ff2865] transition-all duration-150 ease-in border-[#13181f]">
                                Comprar ahora
                            </Button>
                        </div>

                        <ol className="list-disc text-[#ff2865] w-[80%] mx-auto">
                            <li><span className="text-black text-xs font-semibold">439,000 Est. Impressions</span></li>
                            <li><span className="text-black text-xs font-semibold">180 x 150</span></li>
                            <li><span className="text-black text-xs font-semibold">Middle Right</span></li>
                        </ol>
                    </li>
                ))
            }

        </ul>
    )
}
