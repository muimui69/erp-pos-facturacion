"use client"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { useState } from "react"
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog"
import { DialogCreate } from "./create-dialog"
import { postCreateAtm } from "@/lib/queries"

interface PostCreateButtonProps extends ButtonProps { }

export function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (email: string, name: string, phone: string) => {
    try {
      setIsLoading(true);
      const new_employee = await postCreateAtm(email, name, phone);
      setIsDialogOpen(false)
      setIsLoading(false);
      console.log('++++++++++++++++++++++++++++++++++++++', new_employee)

      return toast({
        description: "Usuario creado correctamente",
        variant: "default"
      });

    } catch (err) {
      console.error("Error creando el usuario", err);

      setIsDialogOpen(false);
      setIsLoading(false);

      return toast({
        title: "Ha ocurrido un error.",
        description: "No se creo el empleado. Intente de nuevo.",
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
        Nuevo empleado
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
