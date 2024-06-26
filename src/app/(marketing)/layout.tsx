"use client"
import { marketingConfig } from "@/config/marketing"
import { MainNav } from "@/components/main-nav"
import { UserAccountNavClient } from "@/components/user-acount-nav-client"
import { Notificacionesnav } from "@/components/notification-nav"


interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <header className="ticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
          <div className="container flex h-20 items-center justify-between py-6">
            <MainNav items={marketingConfig.mainNav} />
            <div className="flex items-center space-x-4">
              <Notificacionesnav />
              <UserAccountNavClient />
            </div>
          </div>
        </header >
        <main className="flex-1">{children}</main>
      </div>
    </>
  )
}