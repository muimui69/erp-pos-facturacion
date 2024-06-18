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
import { useState } from "react"
import { useAuthStore } from "@/context/auth-store"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "email">
}

export function UserAccountNav({ user }: UserAccountNavProps) {

  const { subdomain } = useParamsClient()

  const navigate = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { setUser } = useAuthStore();

  const signOut = () => {
    Cookie.remove('user');
    setIsOpen(false);
    if (!subdomain) {
      navigate.push('/');
    }
    navigate.push(`http://localhost:3001/`);
  };

  const pathToSubdomain = () => {
    if (!subdomain) {
      return '/tenants';
    }
    return `http://localhost:3001/tenants`;
  };

  const handleLogout = () => {
    signOut();
    setUser(null);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger>
        <UserAvatar user={{ name: user.name }} className="h-8 w-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={pathToSubdomain()}>Mis áreas de trabajo</Link>
        </DropdownMenuItem>
        {/* Aquí puedes agregar más elementos del menú según sea necesario */}
        <DropdownMenuItem className="cursor-pointer" onSelect={handleLogout}>
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
