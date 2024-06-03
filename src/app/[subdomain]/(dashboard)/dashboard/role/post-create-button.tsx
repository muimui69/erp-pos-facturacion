"use client"
import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Link from 'next/link';
interface PostCreateButtonProps extends ButtonProps { }


export function PostCreateButtonRoles({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  return (
    <>
      <Link href="/dashboard/role/add-rol">
        <button
          type="button"
          className={cn(
            buttonVariants({ variant }),
            className
          )}
          {...props}
        >
          <Icons.add className="mr-2 h-4 w-4" />
          Nuevo Rol
        </button>
      </Link>
    </>
  )
}