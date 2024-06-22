"use client"
import { dashboardConfig } from "@/config/dashboard"
import NavDasboard from "@/components/nav-dasboard"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <div className="relative flex flex-col min-h-screen">
                <div className="fixed top-0 w-full z-10" >
                    <NavDasboard items={dashboardConfig.sidebarNav} >
                        {children}
                    </NavDasboard>
                </div>
            </div>
        </>
    )
}