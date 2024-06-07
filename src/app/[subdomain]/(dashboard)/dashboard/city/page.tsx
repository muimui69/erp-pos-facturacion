import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns } from "./columns";
import { PostCreateButtonCity } from "./post-create-button";

export default async function CityPage() {

  return (
    <DashboardShell>
      <DashboardHeader heading="Ciudades" text="Cree y gestione las ciudades">
      </DashboardHeader>
      {/* <div className="flex justify-center md:lg:justify-end w-full md:w-auto p-5">
        <PostCreateButtonCity className="md:mr-0 w-full md:lg:w-auto" />
      </div> */}
      <div className="container overflow-x-auto">
        <DataTable columns={columns} />
      </div>
    </DashboardShell>
  )
}

