import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns } from "./columns";
import { getAllBranchs } from "@/lib/queries/branch-office";
import { PostCreateButtonBranch } from "./post-create-button";
import Maintenance from "@/src/app/error/maintenance";

export default async function BranchPage() {
  // const data = await getAllBranchs()


  return (
    // <DashboardShell>
    //   <DashboardHeader heading="Sucursales" text="Cree y gestione sucursales.">
    //   </DashboardHeader>
    
  //   <div className="flex justify-center md:lg:justify-end w-full md:w-auto p-5">
  //   <PostCreateButtonBranch className="md:mr-0 w-full md:lg:w-auto" />
  // </div>
    //   <div className="container overflow-x-auto">
    //     <DataTable columns={columns} data={data.data.branchs} />
    //   </div>
    // </DashboardShell>
    <Maintenance />
  )
}

