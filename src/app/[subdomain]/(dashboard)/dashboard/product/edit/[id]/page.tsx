import { DashboardShell } from "@/components/shell";
import { DashboardHeader } from "@/components/header";
import EditProduct from "./edit-product";


interface EditProductProps {
    params: {
        id: number;
    }
}

export default function EditPage({params}:EditProductProps) {
    return (
        <>
            <DashboardShell>
                <DashboardHeader heading="Editar producto" text="Rellene los campos de manera correcta." />
                <EditProduct params={params}/>
            </DashboardShell>
        </>
    )

}