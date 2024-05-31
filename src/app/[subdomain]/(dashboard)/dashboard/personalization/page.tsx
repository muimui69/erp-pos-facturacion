import { DashboardHeader } from "@/components/header";
import { PersonalizationBody } from "@/components/personalization";
import { DashboardShell } from "@/components/shell";

export default function PersonalizationPage() {
    return (
        <DashboardShell className="px-2">
            <DashboardHeader heading="Personalizacion" text="Cambia los colores de tu punto de venta." />
            <p className="leading-7 px-2">
                Personaliza los colores de los diferentes componentes de tu punto de venta que se muestran a continuacion.
            </p>
            <PersonalizationBody />
        </DashboardShell>
    )
}
