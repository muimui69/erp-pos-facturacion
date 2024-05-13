"use client"
import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useState } from "react"
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog"
import { DialogCreate } from "./create-dialog"
import { postCreateAtm } from "@/lib/queries/employee"
import { toast } from "@/components/ui/use-toast"
import { useParamsClient } from "@/hooks/use-params"
import { useProviders } from "@/hooks/use-provider"

interface PostCreateButtonProps extends ButtonProps { }

export function PostCreateButtonProvider({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const { subdomain } = useParamsClient();
  const { createProvider } = useProviders(subdomain as never);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const handleSubmit = async ( name: string, email: string, phone: string): Promise<void> => {
    try {
      setIsLoading(true);
      await createProvider.mutateAsync({
        subdomain: subdomain as never,
        provider: {
          name,
          email,
          phone
        },
      });
      setIsDialogOpen(false)
      setIsLoading(false);
      toast({
        description: "Proveedor creado correctamente"
      })
    } catch (err) {
      console.error("Error creando el Proveedor", err);
      setIsDialogOpen(false);
      setIsLoading(false);
      toast({
        description: "No se creo el Proveedor. Intente de nuevo",
        variant:"destructive"
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
        Nuevo Proveedor
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