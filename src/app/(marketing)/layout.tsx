import Link from "next/link"
import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { UserAccountNav } from "@/components/user-account-nav"
import { getUserCredentials } from "@/lib/auth"
import { Icons } from "@/components/icons"


interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
  const user = await getUserCredentials();

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <header className="container z-40 bg-background">
          <div className="flex h-20 items-center justify-between py-6">
            <MainNav items={marketingConfig.mainNav} />

            {
              user ? (
                <UserAccountNav
                  user={{
                    name: user?.user.name!,
                    email: user?.user.email!,
                  }}
                />
              ) : (
                <nav>
                  <Link
                    href="/login"
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "sm" }),
                      "text-lg px-4 py-2 rounded-md"
                    )}
                  >
                    Iniciar sesión
                  </Link>
                </nav>
              )
            }

          </div>
        </header >
        <main className="flex-1">{children}</main>
      </div>
    </>
  )
}