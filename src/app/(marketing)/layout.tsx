import Link from "next/link"

import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import AvatarDemo from "../(auth)/login/Avatar"
import { SelectOptions } from "../(auth)/login/Select.Options.Avatar"

// import { SiteFooter } from "@/components/site-footer"


interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />


          {/* Perfil Dinamico */}
          <div className="px-6 flex items-center justify-center">  
      {/* AvatarDemo a la izquierda */}
      <AvatarDemo />

      {/* Separador entre AvatarDemo y SelectOptions */}
      <div className="mx-0.1"></div>

      {/* SelectOptions a la derecha */}
      <SelectOptions />
    </div>
        
          <nav>
           
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "text-lg px-4 py-2 rounded-md"
              )}
            >
              Iniciar sesion
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      {/* <SiteFooter /> */}
    </div>
  )
}