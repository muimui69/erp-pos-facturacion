import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { PostCreateButtonProduct } from "./post-create-button";
import ProductList from "@/components/product-list";

export default async function ProductPage() {

  return (
    <DashboardShell>
      <DashboardHeader heading="Productos" text="Cree y gestione los diferentes productos en su Punto de Venta.">
        <div className="hidden md:lg:block">
          <PostCreateButtonProduct />
        </div>
      </DashboardHeader>

      <div className="block md:lg:hidden">
        <PostCreateButtonProduct className="w-full m-2" />
      </div>

      <div className="flex-grow overflow-y-auto md:pb-48 pb-64 max-h-screen scroll-smooth scroll-pt-px">
        <ProductList />
      </div>
    </DashboardShell>
  )
}
