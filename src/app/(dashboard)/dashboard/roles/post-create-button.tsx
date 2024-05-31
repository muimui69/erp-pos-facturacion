"use client"
import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useState } from "react"
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog"
// import { DialogCreate } from "./create-dialog"
import { postCreateAtm } from "@/lib/queries/employee"
import { toast } from "@/components/ui/use-toast"
import { DialogCreate } from "./create-dialog"

interface PostCreateButtonProps extends ButtonProps { }

// useEffect(() => { //Ejemplo de get Permisos
//   async function fetchPermissions() {
//     try {

//       const response = await fetch("URL_DE_TU_API/getPermisos");
//       if (!response.ok) {
//         throw new Error("No se pudieron obtener los permisos");
//       }
//       const data = await response.json();

//       setAvailablePermissions(data.permissions);
//     } catch (error) {
//       console.error("Error al obtener los permisos:", error);
//     }
//   }

//   fetchPermissions();
// }, []);

const availablePermissions = [
  "Crear producto",
  "Editar producto",
  "Eliminar producto",
  "Ver informes",
  "Gestionar usuarios",
  // Agrega más permisos según las necesidades de tu aplicación
];
export function PostCreateButtonRoles({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const handleSubmit = async ( name: string, email: string, phone: string): Promise<void> => {
    try {
      setIsLoading(true);
    // Consumo Api Crear Rol
    //   const new_employee = await postCreateAtm(name,description,price,photo,cat);
    //   console.log('=-=========', new_employee)
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
        description: "No se creo el Proveedor. Intente de nuevo"
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
        Nuevo Rol
      </button>

      {isDialogOpen && (
        <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
          <DialogTrigger asChild>
            <DialogCreate HandleSubmit={handleSubmit} availablePermissions={availablePermissions}/>
          </DialogTrigger>
        </Dialog>
      )}
    </>
  )
}
