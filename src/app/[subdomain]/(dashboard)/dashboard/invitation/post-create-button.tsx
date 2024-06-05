"use client"
import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useState } from "react"
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog"
// import { DialogCreate } from "./create-dialog"
import { postCreateAtm } from "@/lib/queries/employee"
import { toast } from "@/components/ui/use-toast"
import { DialogCreate } from "./dialog-create"
import { useParamsClient } from "@/hooks/use-params"
import { useInvitations } from "@/hooks/user-invitation"
import Link from "next/link"

interface PostCreateButtonProps extends ButtonProps { }

export function PostCreateButtonInvitation({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const { subdomain, user } = useParamsClient();
  // const { createInvitation } = useInvitations(subdomain as never, user?.token);

  // const handleSubmit = async (email: string, name: string, phone: string, idBranch: string): Promise<void> => {
  //   try {
  //     setIsLoading(true);
  //     await createInvitation.mutateAsync({
  //       subdomain: subdomain as never,
  //       serviceToken: user?.token!,
  //       invitation: {
  //         rolId: 1,
  //         userId: "s",
  //       }
  //     })
  //     setIsDialogOpen(false)
  //     setIsLoading(false);
  //     toast({
  //       description: "Invitacion enviada Correctamente"
  //     })
  //   } catch (err) {
  //     console.error("Error creando el usuario", err);
  //     setIsDialogOpen(false);
  //     setIsLoading(false);
  //     toast({
  //       description: "No se creo la Invitacion. Intente de nuevo"
  //     })
  //   }
  // }


  return (
    <>
      <Link href="/dashboard/invitation/add-invitation">
        <button
          type="button"
          // onClick={() => setIsDialogOpen(true)}
          className={cn(
            buttonVariants({ variant }),
            {
              "cursor-not-allowed opacity-60": isLoading,
            },
            className
          )}
          disabled={isLoading}
          {...props}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.add className="mr-2 h-4 w-4" />
          )}
          Nueva Invitacion
        </button>
      </Link>
      {/* {isDialogOpen && (
        <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
          <DialogTrigger asChild>
            <DialogCreate HandleSubmit={handleSubmit} />
          </DialogTrigger>
        </Dialog>
      )} */}
    </>
  )
}