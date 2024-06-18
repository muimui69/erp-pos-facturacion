"use client"
import { marketingConfig } from "@/config/marketing"
import { MainNav } from "@/components/main-nav"
import { UserAccountNavClient } from "@/components/user-acount-nav-client"


interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <header className="container z-40 bg-background">
          <div className="flex h-20 items-center justify-between py-6">
            <MainNav items={marketingConfig.mainNav} />
            <UserAccountNavClient />
          </div>
        </header >
        <main className="flex-1">{children}</main>
      </div>
    </>
  )
}