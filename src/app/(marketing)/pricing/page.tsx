import { getAllSuscriptions } from "@/lib/queries/suscription"
import { getUserCredentials } from "@/lib/auth";
import CardPrice from "./card-price";

export default async function PricingPage() {

    const suscriptions = await getAllSuscriptions()
    const data = suscriptions.data.allSuscription;
    const user = await getUserCredentials()

    return (
        <>
            <section className="flex items-center justify-center relative z-10">
                <div
                    className="w-full max-w-[1190px] px-6 sm:px-8 md:px-16 py-10 md:py-20 rounded-xl min-h-[300px]">
                    <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem] justify-center">
                        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-5xl text-center">
                            Accede a tu suscripcion de PointSync
                        </h1>
                        <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7 text-center">
                            Desbloquea todas las funciones para tu punto de venta ahora.
                        </p>
                    </div>
                    <CardPrice data={data} user={user!}/>
                </div>
            </section>
        </>
    )
}
