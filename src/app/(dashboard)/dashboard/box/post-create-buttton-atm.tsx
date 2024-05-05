"use client"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { useState } from "react"
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog" 
import {CreateAtm} from '@/lib/queries/Atm'

import { useMutation } from "@tanstack/react-query"
import { queryClient } from "@/provider/ReactQueryClient"
import { DialogCreate } from "./create-dialog"

interface PostCreateButtonProps extends ButtonProps { }

export function PostCreateButtonAtm({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: CreateAtm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['branchs'] });
    },
  })

  const handleSubmit = async ( name: string, branchId: string) => {
    try {
      setIsLoading(true);
      await mutation.mutateAsync({  name, branchId });
      setIsDialogOpen(false)
      setIsLoading(false);
      toast({
        description: "Sucursal creado correctamente",
        variant: "default"
      });
    } catch (err) {
      console.error("Error creando la sucursal", err);
      setIsDialogOpen(false);
      setIsLoading(false);
      toast({
        title: "Ha ocurrido un error.",
        description: "No se creo la sucursal. Intente de nuevo.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
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
        Nueva Caja
      </button>

      {isDialogOpen && (
        <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
          <DialogTrigger asChild>
            <DialogCreate HandleSubmit={handleSubmit} />
          </DialogTrigger>
        </Dialog>
      )}
    </>
  )
}
