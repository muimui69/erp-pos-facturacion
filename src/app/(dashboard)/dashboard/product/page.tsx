import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns, Payment } from "./columns";
import { GetCity } from "@/lib/queries/city";
import {  PostCreateCiudad } from "./post-createCity";



export default async function ProductPage() {
  const data = await GetCity()
  console.log(data)
  return (
    <DashboardShell>
      <DashboardHeader heading="Ciudades" text="Cree y gestione las ciudades">
        <PostCreateCiudad className="mr-6"/>
      </DashboardHeader>
      <div className="container overflow-x-auto">
        <DataTable columns={columns} data={data.data.citys} />
      </div>
    </DashboardShell>
  )
}

