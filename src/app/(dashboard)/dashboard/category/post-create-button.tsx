"use client"
import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useState } from "react"
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog"
import { DialogCreate } from "./create-dialog"
import { postCreateAtm } from "@/lib/queries/employee"
import { toast } from "@/components/ui/use-toast"

interface PostCreateButtonProps extends ButtonProps { }

export function PostCreateButtonCategory({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const handleSubmit = async (  description: string): Promise<void> => {
    try {
      setIsLoading(true);
      //Consumo Api Crear Categoria
    //   const new_employee = await postCreateAtm(name,description,price,photo,cat);
    //   console.log('=-=========', new_employee)
      setIsDialogOpen(false)
      setIsLoading(false);
      toast({
        description: "Categoria creado correctamente"
      })
    } catch (err) {
      console.error("Error creando la Categoria", err);
      setIsDialogOpen(false);
      setIsLoading(false);
      toast({
        description: "No se creo la Categoria. Intente de nuevo"
      })
    }
  }


  return (
    <>
      <button
        type="button"
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
        Nueva Categoria
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
