"use client"

import Link from "next/link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/user-avatar"
import { User } from "@/lib/queries/interfaces/auth.interface"
import Cookie from 'js-cookie';
import { usePathname, useRouter } from "next/navigation"
import { useParamsClient } from "@/hooks/use-params"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "email">
}

export function UserAccountNav({ user }: UserAccountNavProps) {

  const { subdomain } = useParamsClient()

  const navigate = useRouter();


  const signOut = async () => {
    Cookie.remove('user');
    if (!subdomain) {
      navigate.push('/tenants');
    }
    navigate.push(`http://localhost:3001/tenants`);
  }

  const pathToSubdomain = () => {
    if (!subdomain) {
      return '/tenants'
    }
    return `http://localhost:3001/tenants`;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild
          className="cursor-pointer"
        >
          <Link href={pathToSubdomain()}>Mis areas de trabajo</Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem asChild>
          <Link href="/dashboard/billing">Billing</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault()
            signOut()
          }}
        >
          Cerrar sesion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
