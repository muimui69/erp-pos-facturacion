import { DashboardShell } from "@/components/shell";
import CreateProduct from "./create-product";
import { DashboardHeader } from "@/components/header";


export default function ProductoAdd() {
    return (
        <>
            <DashboardShell>
                <DashboardHeader heading="Crear producto" text="Rellene los campos de manera correcta." />
                <CreateProduct />
            </DashboardShell>
        </>
    )

}