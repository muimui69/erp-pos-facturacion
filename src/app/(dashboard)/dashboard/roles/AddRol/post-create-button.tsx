"use client"
import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useState } from "react"
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog"
// import { DialogCreate } from "./create-dialog"
import { postCreateAtm } from "@/lib/queries/employee"
import { toast } from "@/components/ui/use-toast"

import Link from 'next/link';
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



export function PostCreateButtonRoles({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {

    const handleSubmit = async ( name: string, email: string, phone: string): Promise<void> => {
        try {
         
          //Consumo Api Crear Proveedor
        //   const new_employee = await postCreateAtm(name,description,price,photo,cat);
        //   console.log('=-=========', new_employee)
       
          toast({
            description: " creado correctamente"
          })
        } catch (err) {
          console.error("Error creando el Proveedor", err);
       
          toast({
            description: "No se creo el Proveedor. Intente de nuevo"
          })
        }
      }
  return (
    <>
      <Link href="/dashboard/roles/AddRol">
        <button 
          type="button"
          className={cn(
            buttonVariants({ variant }),
            className
          )}
          {...props}
          
        >
          <Icons.add className="mr-2 h-4 w-4" />
          Guardar Rol
        </button>
      </Link>
    </>
  )
}
