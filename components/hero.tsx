import { buttonVariants } from "./ui/button";
import HeroCards from "./hero-cards";
import "./css/hero.css"
import Link from "next/link";
import { cn } from "@/lib/utils";

const { POS_NAME } = process.env;

export default function Hero() {
    return (
        <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
            <div className="text-center lg:text-start space-y-6">
                <main className="text-5xl md:text-6xl font-bold">
                    <h1 className="inline">
                        <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
                            {POS_NAME}
                        </span>{" "}
                        SaaS de {" "} confianza
                    </h1>{" "}
                    para gestion de{" "}
                    <h2 className="inline">
                        <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                            Puntos de Venta
                        </span>{" "}
                    </h2>
                </main>

                <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
                    Configúralo en minutos, empieza a vender en segundos y ¡mantén satisfechos a tus empleados y clientes!
                </p>

                <div className="space-y-2 md:space-y-0 md:space-x-2">
                    <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
                        Comenzar
                    </Link>
                </div>

            </div>

            <div className="z-10">
                <HeroCards />
            </div>

            <div className="shadow-card"></div>
        </section>
    );
};