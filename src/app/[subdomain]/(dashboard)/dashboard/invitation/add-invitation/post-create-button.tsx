"use client"
import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useState } from "react"
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog"

import { postCreateAtm } from "@/lib/queries/employee"
import { toast } from "@/components/ui/use-toast"
import { DialogCreate } from "./create-dialog"
import { columns } from './columns';
import { useParamsClient } from "@/hooks/use-params"
import { useRols } from "@/hooks/use-rol"
import { useInvitations } from "@/hooks/user-invitation"
import { useRouter } from "next/navigation"

interface PostCreateButtonProps extends ButtonProps {
  userIds: string[];
  rolId: number;
}

export function PostAddButtonRol({
  className,
  variant,
  rolId,
  userIds,
  ...props

}: PostCreateButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { subdomain, user } = useParamsClient();
  const { createInvitation } = useInvitations(subdomain as never, user?.token);
  const navigate = useRouter();

  const handleSubmit = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await createInvitation.mutateAsync({
        subdomain: subdomain as never,
        serviceToken: user?.token!,
        invitation: {
          rolId: rolId,
          users: userIds
        }
      });
      navigate.push('http://rog.zephyrus.uagrm.localhost:3001/dashboard/invitation');
      setIsLoading(false);
      toast({
        description: "Invitacion enviada correctamente"
      })
    } catch (err) {
      console.error("Error creando el rol", err);
      setIsLoading(false);
      toast({
        description: "No se ha podido enviar la invitacion. Intente de nuevo"
      })
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleSubmit}
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
        Enviar invitacion
      </button>

    </>
  )



}