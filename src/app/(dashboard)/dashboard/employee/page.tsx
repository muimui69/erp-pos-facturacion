import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns } from "./columns";
import { getEmployees } from "@/lib/queries/employee";
import { PostCreateButtonEmployee } from "./post-create-button";
import Maintenance from "@/src/app/error/maintenance";
async function getData(): Promise<any[]> {
  return [
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "email": "juan.perez@example.com",
      "roles": ["Desarrollador", "Diseñador"]
    },
    {
      "id": 2,
      "nombre": "María García",
      "email": "maria.garcia@example.com",
      "roles": ["Gerente de Proyecto"]
    },
    {
      "id": 3,
      "nombre": "Pedro Rodríguez",
      "email": "pedro.rodriguez@example.com",
      "roles": ["Analista de Datos", "Desarrollador"]
    }
  ]
}
export default async function EmployeePage() {
  const data= await getData();
  
  return (
    <DashboardShell>
      <DashboardHeader heading="Empleados" text="Cree y gestione los empleados de su punto de venta.">
        <PostCreateButtonEmployee className="mr-6" />
      </DashboardHeader>
      <div className="container overflow-x-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </DashboardShell>
    // <Maintenance/>
  )
}

