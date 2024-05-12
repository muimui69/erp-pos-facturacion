import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns } from "./columns";
import { getAllCity } from "@/lib/queries/city";
import { PostCreateButtonCity } from "./post-create-button";

export default async function CityPage() {
  const data = await getAllCity()
  return (
    <DashboardShell>
      <DashboardHeader heading="Ciudades" text="Cree y gestione las ciudades">
        <PostCreateButtonCity className="mr-6" />
      </DashboardHeader>
      <div className="container overflow-x-auto">
        <DataTable columns={columns} data={data.data.citys} />
      </div>
    </DashboardShell>
  )
}

