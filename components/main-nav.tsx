"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { MainNavItem } from "@/types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"
import { useState } from "react"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)

  const setCloseMenu = () => {
    setShowMobileMenu(false);
  }

  return (
    <div className="flex items-center justify-center flex-grow ">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.store />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="flex items-center gap-6 md:flex-grow justify-center">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.store />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items} setCloseMenu={setCloseMenu}>{children}</MobileNav>
      )}
    </div>
  )
}
