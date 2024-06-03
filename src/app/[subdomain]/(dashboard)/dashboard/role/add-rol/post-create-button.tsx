"use client"
import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface PostCreateButtonProps extends ButtonProps {
  handleSubmit: () => Promise<void>
}

export function PostCreateButtonRolesPermission({
  className,
  variant,
  handleSubmit,
  ...props
}: PostCreateButtonProps) {

  return (
    <>
      {/* <Link href="/dashboard/roles/AddRol"> */}
      <button
        type="button"
        onClick={handleSubmit}
        className={cn(
          buttonVariants({ variant }),
          className
        )}
        {...props}

      >
        <Icons.add className="mr-2 h-4 w-4" />
        Guardar Rol
      </button>
      {/* </Link> */}
    </>
  )
}