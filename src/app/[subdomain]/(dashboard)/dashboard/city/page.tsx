import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns } from "./columns";
import { PostCreateButtonCity } from "./post-create-button";

export default async function CityPage() {

  return (
    <DashboardShell>
      <DashboardHeader heading="Ciudades" text="Cree y gestione las ciudades">
        <div className="hidden md:lg:block">
          <PostCreateButtonCity />
        </div>
      </DashboardHeader>

      <div className="block md:lg:hidden">
        <PostCreateButtonCity className="w-full m-2"/>
      </div>

      <div className="overflow-x-auto">
        <DataTable columns={columns} />
      </div>
    </DashboardShell>
  )
}

