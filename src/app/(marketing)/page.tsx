import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/src/components/ui/button"
const { POS_NAME } = process.env;


export default async function IndexPage() {

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">

          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Un punto de venta en el que puedes confiar.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            <strong>El punto de venta de {POS_NAME} </strong>  ofrece una amplia gama de opciones para satisfacer todas las necesidades de tu empresa. Configúralo en minutos, empieza a vender en segundos y ¡mantén satisfechos a tus empelados o a tus clientes!
          </p>
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Comenzar
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
