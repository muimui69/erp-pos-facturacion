import Link from "next/link"
import { getAllSuscriptions } from "@/lib/queries/suscription"
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { getUserCredentials } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function PricingPage(req: NextRequest) {

    
    const suscriptions = await getAllSuscriptions()

    const headerList = headers();
    const hostname = headerList.get("host")

    // console.log('::::::::::::::::::::', req,hostname) 

    const data = suscriptions.data.allSuscription;

    const user = await getUserCredentials()

    // if (!user) {
    //   return notFound()
    // }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen relative z-10">
                <div
                    className="w-full max-w-[1190px] px-6 sm:px-8 md:px-16 py-10 md:py-20 rounded-xl min-h-[300px]">
                    <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem] justify-center">
                        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-5xl text-center">
                            Acceda a tu suscripcion de PointSync
                        </h1>
                        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 text-center">
                            Desbloquea todas las funciones para tu punto de venta ahora.
                        </p>
                    </div>
                    <ul className="flex items-start justify-between gap-8 mt-10 md:flex-row flex-col">
                        <li
                            className="w-full lg:w-[32%] px-10 pt-16 pb-8 bg-white rounded-lg self-stretch hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in border border-gray-300">
                            <h2
                                className="text-center font-semibold text-lg tracking-wider mb-3">
                                Plan Mensual</h2>
                            <p className="text-center tracking-tighter block mb-14">
                                <span className="text-4xl font-bold">Bs {data[0].price}</span>
                                <span className="text-black/40 text-center"></span>
                            </p>
                            <div className="w-full text-center mb-8">
                                <Link href="/pricing/pay" >
                                    <div className="w-full p-2 bg-[#13181f] text-white rounded-md font-semibold hover:bg-[#ff2865] transition-all duration-150 ease-in border-[#13181f]">
                                        Comprar ahora
                                    </div>
                                </Link>
                            </div>

                            <ol className="list-disc text-[#ff2865] w-[80%] mx-auto">
                                <li><span className="text-black text-xs font-semibold">439,000 Est. Impressions</span></li>
                                <li><span className="text-black text-xs font-semibold">180 x 150</span></li>
                                <li><span className="text-black text-xs font-semibold">Middle Right</span></li>
                            </ol>
                        </li>
                        <li
                            className="w-full lg:w-[32%] px-10 pt-16 pb-8 bg-white rounded-lg self-stretch hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in relative group border border-gray-300">
                            <h2
                                className="text-center font-semibold text-lg tracking-wider mb-3 ">
                                Plan Trimestral</h2>
                            <p className="text-center tracking-tighter block mb-14">
                                <span className="text-4xl font-bold">Bs {data[1].price}</span>
                                <span className="text-black/40 text-center"></span>
                            </p>
                            <div className="w-full text-center mb-8">
                                <Link href="/pricing/pay" >
                                    <div className="w-full p-2 bg-[#13181f] text-white rounded-md font-semibold hover:bg-[#ff2865] transition-all duration-150 ease-in border-[#13181f]">
                                        Comprar ahora
                                    </div>
                                </Link>
                            </div>

                            <ol className="list-disc text-[#ff2865] w-[80%] mx-auto">
                                <li><span className="text-black text-xs font-semibold">439,000 Est. Impressions</span></li>
                                <li><span className="text-black text-xs font-semibold">300 x 250</span></li>
                                <li><span className="text-black text-xs font-semibold">Middle Right</span></li>
                            </ol>
                        </li>
                        <li
                            className="w-full lg:w-[32%] px-10 pt-16 pb-8 bg-white rounded-lg self-stretch hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in relative group border border-gray-300">
                            <h2
                                className="text-center font-semibold text-lg tracking-wider mb-3 ">
                                Premium Anual</h2>
                            <p className="text-center tracking-tighter block mb-14">
                                <span className="text-4xl font-bold">Bs {data[2].price}</span>
                                <span className="text-black/40 text-center"></span>
                            </p>
                            <div className="w-full text-center mb-8">
                                <Link href="/pricing/pay" >
                                    <div className="w-full p-2 bg-[#13181f] text-white rounded-md font-semibold hover:bg-[#ff2865] transition-all duration-150 ease-in border-[#13181f]">
                                        Comprar ahora
                                    </div>
                                </Link>
                            </div>


                            <ol className="list-disc text-[#ff2865] w-[80%] mx-auto">
                                <li><span className="text-black text-xs font-semibold">2,000,000 Est. Impressions</span></li>
                                <li><span className="text-black text-xs font-semibold">300 x 250</span></li>
                                <li><span className="text-black text-xs font-semibold">Top Right</span></li>
                            </ol>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
