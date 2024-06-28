import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import BuyDetail from "./buy-detail";
import { PostCreateButtonBuy } from "./post-create-button";

export default async function BuyPage() {

    return (
        <DashboardShell>
            <DashboardHeader heading="Notas de entrada" text="Cree y gestione las compras de insumos.">
                <div className="hidden md:lg:block">
                    <PostCreateButtonBuy />
                </div>
            </DashboardHeader>

            <div className="block md:lg:hidden">
                <PostCreateButtonBuy className="w-full m-2" />
            </div>

            <div className="flex-grow overflow-y-auto md:pb-48 pb-64 max-h-screen scroll-smooth scroll-pt-px">
                <BuyDetail />
            </div>
        </DashboardShell>
    )
}
