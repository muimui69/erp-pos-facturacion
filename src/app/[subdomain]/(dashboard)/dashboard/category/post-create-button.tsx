"use client"
import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useState } from "react"
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog"
import { DialogCreate } from "./create-dialog"
import { toast } from "@/components/ui/use-toast"
import { useCategories } from "@/hooks/use-category"
import { useParamsClient } from "@/hooks/use-params"

interface PostCreateButtonProps extends ButtonProps { }

export function PostCreateButtonCategory({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const { subdomain } = useParamsClient();
  const { createCategory } = useCategories(subdomain as never);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (description: string): Promise<void> => {
    try {
      setIsLoading(true);
      await createCategory.mutateAsync({
        subdomain: subdomain as never,
        category: {
          description
        },
      });
      setIsDialogOpen(false)
      setIsLoading(false);
      toast({
        description: "Categoria creada correctamente"
      })
    } catch (err) {
      console.error("Error creando la Categoria", err);
      setIsDialogOpen(false);
      setIsLoading(false);
      toast({
        description: "No se creo la Categoria. Intente de nuevo",
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
