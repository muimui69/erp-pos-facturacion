import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table"
import { columns, Payment } from "./columns";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
    },
  ]
}

export default async function EmployeePage() {
  const data = await getData()

  return (
    <DashboardShell>
      <DashboardHeader heading="Categorias" text="Cree y gestione la categoria de sus productos.">
      </DashboardHeader>
      <div className="container overflow-x-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </DashboardShell>
  )
}

