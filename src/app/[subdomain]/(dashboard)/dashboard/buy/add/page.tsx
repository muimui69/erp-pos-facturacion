import { DashboardShell } from "@/components/shell";
import { DashboardHeader } from "@/components/header";
import AddNotePage from "./create-nota-ingreso";

export default function NotaIngresoAdd() {
    return (
        <DashboardShell>
            <DashboardHeader heading="Crear una nueva nota de entrada" text="Rellene los campos de manera correcta." />
            <AddNotePage/>
        </DashboardShell>
    )
}