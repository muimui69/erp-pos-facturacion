import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { Branch, columns } from "./columns";
import { getAllBranchs } from "@/lib/queries/branch-office";
import { PostCreateButtonBranch } from "./post-create-button";
import Maintenance from "@/src/app/error/maintenance";


async function getData(): Promise<Branch[]> {
  return [
    {
        "address": "C/Avaroa",
        "name": "Imprenta",
        "lat": 20.66,
        "lng": 18.15,
        "city": "Santa cruz"
    },
    {
        "address": "C/Reforma",
        "name": "Librería Central",
        "lat": 21.45,
        "lng": 17.30,
        "city": "La paz"
    },
    {
        "address": "C/Palma",
        "name": "Papelería Rápida",
        "lat": 19.85,
        "lng": 16.90,
        "city": "Cochabamba"

    },
    {
        "address": "C/San Martín",
        "name": "Copistería Veloz",
        "lat": 22.10,
        "lng": 19.05,
        "city": "Cochabamba"
    }
]
}

export default async function BranchPage() {
   const data = getData();
 

  return (
    // <DashboardShell>
    //   <DashboardHeader heading="Sucursales" text="Cree y gestione sucursales.">
    //     <PostCreateButtonBranch className="mr-6" />
    //   </DashboardHeader>
    //   <div className="container overflow-x-auto">
    //     <DataTable columns={columns} data={data} />
     
    //   </div>
    // </DashboardShell>
     <Maintenance/>
  )
}

