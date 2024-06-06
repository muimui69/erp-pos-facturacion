"use client"
import { dashboardConfig } from "@/config/dashboard"
import { DashboardNav } from "@/components/nav"
import { HeaderTopMenu } from "@/components/header-top-menu"
import { useMenuStore } from "@/context/menu-store"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const isMenuExpanded = useMenuStore(state => state.isMenuExpanded);

    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <HeaderTopMenu />
            <div className={`container grid flex-1 ${isMenuExpanded ? "grid-cols-[200px_1fr]" : "md:lg:grid-cols-[230px_1fr] grid-cols-[50px_1fr]"} mt-10`}>
                <aside className={`${isMenuExpanded ? "w-[200px]" : "md:lg:w-[200px] w-[40px]"} flex-col flex`}>
                    <DashboardNav items={dashboardConfig.sidebarNav} />
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    )
}