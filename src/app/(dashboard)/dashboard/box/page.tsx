import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { Atm, columns} from "./columns";
import { PostCreateButton } from "@/components/post-create-button";
// import { GetAtm } from "@/lib/queries/atm";
import { PostCreateButtonAtm } from "./post-create-buttton-atm";
import Maintenance from "@/src/app/error/maintenance";
async function getData(): Promise<any[]> {
  return [
    {
      id: "m5gr84i9",
      name: "Ken Johnson",
      branch: "ken-johnson"
    },
    {
      id: "3u1reuv4",
      name: "Abe Smith",
      branch: "abe-smithsss"
    },
    {
      id: "derv1ws0",
      name: "Monserrat Garcia",
      branch: "monserrat-garcia"
    },
    {
      id: "5kma53ae",
      name: "Silas Brown",
      branch: "silas-brown"
    },
    {
      id: "bhqecj4p",
      name: "Carmella Rodriguez",
      branch: "carmella-rodriguez"
    },  {
      id: "derv1ws0",
      name: "Monserrat Garcia",
      branch: "monserrat-garcia"
    },
    {
      id: "5kma53ae",
      name: "Silas Brown",
      branch: "silas-brown"
    },
    {
      id: "bhqecj4p",
      name: "Carmella Rodriguez",
      branch: "carmella-rodriguez"
    },
  ];
}

// Example usage:
getData().then(data => console.log(data));

export default async function BoxPage() {
  const data = await getData();

  return (
    <DashboardShell>
      <DashboardHeader heading="Cajas" text="Cree y gestione apertura y cierre de cajas.">
        <PostCreateButtonAtm className="mr-6" />
      </DashboardHeader>
      <div className="container overflow-x-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </DashboardShell>

  )
}

