import Link from "next/link"
import {
    Bell,
    CircleUser,
    Home,
    LineChart,
    Menu,
    Package,
    Package2,
    Search,
    ShoppingCart,
    Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { HeaderTopMenu } from "./header-top-menu"
import { Icons } from "./icons"
import { UserAccountService } from "./user-account-service"
import { SidebarNavItem } from "@/types"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"


interface NavProps {
    items: SidebarNavItem[]
    children: React.ReactNode
}

export default function NavDasboard({ items, children }: NavProps) {
    const path = usePathname()

    return (
        <>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="hidden border-r bg-muted/40 md:block">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex p-4 items-center border-b px-4 lg:px-6">
                            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                                <Icons.store className="h-6 w-6" />
                                <span className="">PointSync</span>
                            </Link>
                        </div>
                        <div className="flex-1">
                            <nav className="grid items-start px-2 gap-2 text-sm font-medium lg:px-4 ">
                                {items.map((item, index) => {
                                    const Icon = Icons[item.icon || "arrowRight"]
                                    return (
                                        item.href && (
                                            <Link key={index} href={item.disabled ? "/" : item.href}>
                                                <span
                                                    className={cn(
                                                        "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                                        path === item.href ? "bg-accent" : "transparent",
                                                        item.disabled && "cursor-not-allowed opacity-80"
                                                    )}
                                                >
                                                    <Icon className="md:lg:mr-2 h-4 w-4" />
                                                    <span className="block">{item.title} </span>
                                                </span>
                                            </Link>
                                        )
                                    )
                                })}
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col ">
                    <header className="flex p-3 items-center gap-4 border-b bg-muted/40 px-4 lg:px-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="shrink-0 md:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col">
                                <Link href="/dashboard" className="flex items-center gap-2 font-semibold py-2 border-b-[1px] mb-2">
                                    <Icons.store className="h-6 w-6" />
                                    <span className="">PointSync</span>
                                </Link>
                                <nav className="grid gap-2 text-lg font-medium overflow-y-auto flex-grow">
                                    {items.map((item, index) => {
                                        const Icon = Icons[item.icon || "arrowRight"]
                                        return (
                                            item.href && (
                                                <Link key={index} href={item.disabled ? "/" : item.href}>
                                                    <span
                                                        className={cn(
                                                            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                                            path === item.href ? "bg-accent" : "transparent",
                                                            item.disabled && "cursor-not-allowed opacity-80"
                                                        )}
                                                    >
                                                        <Icon className="mr-2 h-4 w-4" />
                                                        <span className="block">{item.title} </span>
                                                    </span>
                                                </Link>
                                            )
                                        )
                                    })}
                                </nav>
                            </SheetContent>
                        </Sheet>
                        <UserAccountService />
                    </header>
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 container">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}
