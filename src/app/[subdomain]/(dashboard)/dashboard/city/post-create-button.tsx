"use client"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { useState } from "react"
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog"
import { DialogCreate } from "./create-dialog"
import { useCities } from "@/hooks/use-city"
import { useParamsClient } from "@/hooks/use-params"

interface PostCreateButtonProps extends ButtonProps { }

export function PostCreateButtonCity({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { subdomain, user } = useParamsClient();
  const { createCity } = useCities();


  const handleSubmit = async (name: string) => {
    setIsLoading(true);

    try {
      setIsLoading(true);
      await createCity.mutateAsync({
        nombre: name,
        serviceToken: user?.token as never,
        subdomain: subdomain as never
      });
      setIsDialogOpen(false)
      setIsLoading(false);
      toast({
        description: "Ciudad creado correctamente",
        variant: "default"
      });

    } catch (err) {
      console.error("Error creando la ciudad", err);

      setIsDialogOpen(false);
      setIsLoading(false);

      toast({
        title: "Ha ocurrido un error.",
        description: "No se creo la ciudad. Intente de nuevo.",
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
        Crear Ciudad
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
