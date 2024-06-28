// "use client"
// import { cn } from "@/lib/utils"
// import { ButtonProps, buttonVariants } from "@/components/ui/button"
// import { Icons } from "@/components/icons"
// import { useState } from "react"
// import { Dialog, DialogTrigger } from "@radix-ui/react-dialog"
// import { DialogCreate } from "./create-dialog"
// import { toast } from "@/components/ui/use-toast"
// import { useParamsClient } from "@/hooks/use-params"
// import { useProducts } from "@/hooks/use-product"
// import { CategoriesProduct } from "@/lib/queries/interfaces/product.interface"

// interface PostCreateButtonProps extends ButtonProps { }

// export function PostCreateButtonProduct({
//   className,
//   variant,
//   ...props
// }: PostCreateButtonProps) {
//   const { subdomain } = useParamsClient();
//   const { createProduct } = useProducts(subdomain as never);
//   const [isLoading, setIsLoading] = useState<boolean>(false)
//   const [isDialogOpen, setIsDialogOpen] = useState(false);


//   const handleSubmit = async (name: string, description: string, price: string, photo: File, discount: string, categories?: CategoriesProduct): Promise<void> => {
//     try {
//       setIsLoading(true);
//       const formData = new FormData();
//       formData.append('name', name);
//       formData.append('description', description);
//       formData.append('price', price);
//       formData.append('photo', photo);
//       formData.append('discount', discount);
//       formData.append('categories', JSON.stringify(categories?.categories));
//       await createProduct.mutateAsync({
//         subdomain: subdomain as never,
//         formData,
//       });
//       setIsDialogOpen(false)
//       setIsLoading(false);
//       toast({
//         description: "Producto creado correctamente"
//       })
//     } catch (err) {
//       console.error("Error creando el Producto", err);
//       setIsDialogOpen(false);
//       setIsLoading(false);
//       toast({
//         description: "No se creo el Producto. Intente de nuevo",
//         variant: "destructive"
//       })
//     }
//   }


//   return (
//     <>
//       <button
//         type="button"
//         onClick={() => setIsDialogOpen(true)}
//         className={cn(
//           buttonVariants({ variant }),
//           {
//             "cursor-not-allowed opacity-60": isLoading,
//           },
//           className
//         )}
//         disabled={isLoading}
//         {...props}
//       >
//         {isLoading ? (
//           <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
//         ) : (
//           <Icons.add className="mr-2 h-4 w-4" />
//         )}
//         Nuevo Producto
//       </button>

//       {isDialogOpen && (
//         <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
//           <DialogTrigger asChild>
//             <DialogCreate HandleSubmit={handleSubmit} />
//           </DialogTrigger>
//         </Dialog>
//       )}
//     </>
//   )
// }

"use client";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";

interface PostCreateButtonProps extends ButtonProps { }

export function PostCreateButtonProduct({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {

  const navigate = useRouter();

  const handleClick = () => {
    navigate.push("/dashboard/product/add")
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        buttonVariants({ variant }),
        className
      )}
      {...props}
    >
      <Icons.add className="mr-2 h-4 w-4" />
      Nuevo Producto
    </button>
  );
}