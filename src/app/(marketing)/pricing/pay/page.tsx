import { Icons } from "@/components/icons";
import Cart from "./Cart";
import Payment from "./paymentMethod";
import Link from "next/link";

export default function PagePay() {
  return (
    <>
       <div className="min-h-screen flex flex-col justify-start items-center p-4">
      <div className="w-full mb-8 flex justify-between items-start">
        {/* Botón de retroceso */}
        <Link href="/pricing" className="text-gray-700 self-start ml-10">
          <Icons.back/>
        </Link>
        {/* Título de la membresía */}
        <h1 className="text-2xl font-bold">Membership Plan</h1>
        {/* Espacio adicional si es necesario */}
        <div></div>
      </div>

      <div className="flex flex-col md:flex-row w-full justify-center">
        {/* Componente Cart */}
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 md:mb-0 md:order-1">
          <Cart />
        </div>
        {/* Componente Payment */}
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 md:order-2">
          <Payment />
        </div>
      </div>
    </div>
    </>
  )
}
