"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarNavItem } from "@/types"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { useThemeLocal } from '@/context/theme-context';
import { useEffect } from "react"
// import { useMenuStore } from "@/context/menu-store"


interface DashboardNavProps {
  items: SidebarNavItem[]
}

export function DashboardNav({ items }: DashboardNavProps) {
  // const toggleMenu = useMenuStore(state => state.toggleMenu);
  // const isMenuExpanded = useMenuStore(state => state.isMenuExpanded);

  const { menuColor, setMenuColor } = useThemeLocal()
  const path = usePathname()
  const savedMenuColor = localStorage.getItem('menuColor');

  useEffect(() => {
    const savedMenuColor = localStorage.getItem('menuColor');
    if (savedMenuColor) {
      setMenuColor(savedMenuColor);
    }

  }, []);

  if (!items?.length) {
    return null
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"]
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href && !savedMenuColor ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
                style={{ backgroundColor: path === item.href ? menuColor : "transparent" }}
              >
                {/* <Icon className={`${isMenuExpanded ? "mr-2 h-4 w-4" : "md:lg:mr-2 h-4 w-4"}`} /> */}
                {/* <span className={` ${isMenuExpanded ? "block" : "hidden md:lg:block"}`}>{item.title} </span> */}
              </span>
            </Link>
          ) ||
          !item.href && (
            <button
              key={index}
              // onClick={toggleMenu}
              className={cn(
                "group flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium hover:text-accent-foreground",
                item.disabled && "cursor-not-allowed opacity-80",
                "block md:lg:hidden"
              )}
            >
              {/* {
                isMenuExpanded ?
                  <Icons.colapse className="md:lg:mr-2 h-4 w-4" />
                  :
                  <Icons.show className="md:lg:mr-2 h-4 w-4" />
              } */}
            </button>
          )
        )
      })}
    </nav >
  )
}

