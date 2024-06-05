import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"


export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {

  return (
    <DashboardShell>
      <DashboardHeader heading="Panel de control" text="Vea un resumen general de su punto de venta. "/>
    </DashboardShell>
  )
}
