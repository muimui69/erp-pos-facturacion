import { DashboardShell } from "@/components/shell";
import { DashboardHeader } from "@/components/header";
import ViewProduct from "./view-product";


interface ViewProductProps {
  params: {
    id: number;
  }
}

export default function ViewPage({ params }: ViewProductProps) {
  return (
    <>
      <DashboardShell>
        <DashboardHeader heading="Detalles del producto" text="Aqui puede visualizar mas a detalle sobre un producto." />
        <div className="flex-grow overflow-y-auto md:pb-48 pb-64 max-h-screen scroll-smooth scroll-pt-px">
          <ViewProduct params={params} />
        </div>
      </DashboardShell>
    </>
  )

}