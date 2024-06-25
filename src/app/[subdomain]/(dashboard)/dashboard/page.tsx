import { CardCustom } from "@/components/card"
import { DashboardHeader } from "@/components/header"
import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"
import { DashboardShell } from "@/components/shell"
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Card from "@mui/joy/Card"
import CardContent from "@mui/joy/CardContent"


export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {

  return (
    <DashboardShell>
      <DashboardHeader heading="Panel de control" text="Vea un resumen general de su punto de venta. " />
      <div className="flex-grow overflow-y-auto md:pb-48 pb-64 max-h-screen scroll-smooth scroll-pt-px">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mr-5">
          <CardCustom
            title="Total ventas"
            description="+20.1% el ultimo mes"
            value="20"
          />
          <CardCustom
            title="Total ventas"
            description="+20.1% el ultimo mes"
            value="20"
          />
          <CardCustom
            title="Total ventas"
            description="+20.1% el ultimo mes"
            value="20"
          />
          <CardCustom
            title="Total ventas"
            description="+20.1% el ultimo mes"
            value="20"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-5 mr-5">
          <Card className="col-span-4 rounded-lg border bg-card text-card-foreground shadow-sm">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-3 rounded-lg border bg-card text-card-foreground shadow-sm">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>
                You made 265 sales this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
