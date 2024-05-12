import { notFound } from "next/navigation"

import { dashboardConfig } from "@/config/dashboard"
import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/nav"
import { UserAccountNav } from "@/components/user-account-nav"
import { getUserCredentials } from "@/lib/auth"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const user = await getUserCredentials()

    // if (!user) {
    //     return notFound()
    // }

    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">
                    <MainNav items={dashboardConfig.mainNav} />
                    <UserAccountNav
                        user={{
                            name: user?.user.name!,
                            email: user?.user.email!,
                        }}
                    />
                </div>
            </header>
            <div className="container grid flex-1 gap-12 md:lg:grid-cols-[200px_1fr] grid-cols-[40px_1fr]  mt-10">
                <aside className="md:lg:w-[200px] w-[40px] flex-col flex">
                    <DashboardNav items={dashboardConfig.sidebarNav} />
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
            {/* <SiteFooter className="border-t" /> */}
        </div>
    )
}