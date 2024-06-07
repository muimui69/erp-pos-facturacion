import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns, Payment } from "./columns";
import { PostCreateButton } from "@/components/post-create-button";
// import { GetAtm } from "@/lib/queries/atm";
import { PostCreateButtonAtm } from "./post-create-buttton-atm";
import Maintenance from "@/src/app/error/maintenance";



export default async function BoxPage() {
  // const data = await GetAtm()

  return (
    // <DashboardShell>
    //   <DashboardHeader heading="Cajas" text="Cree y gestione apertura y cierre de cajas.">
    //   </DashboardHeader>
    //   <div className="flex justify-center md:lg:justify-end w-full md:w-auto p-5">
    //   <PostCreateButtonAtm className="md:mr-0 w-full md:lg:w-auto" />
    // </div>

    //   {/* <div className="container overflow-x-auto">
    //     <DataTable columns={columns} data={data.data.atms} />
    //   </div> */}
    // </DashboardShell>
    <Maintenance />
  )
}

