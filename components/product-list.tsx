"use client"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { useParamsClient } from "@/hooks/use-params"
import { useProducts } from "@/hooks/use-product"
import ProductListSkeleton from "./product-list-skeleton"
import LayoutEmptyCustom from "./layout-empty-custom"
import { Icons } from "./icons"
import { useRouter } from "next/navigation"

export default function ProductList() {
    const { subdomain, user } = useParamsClient();
    const { products, isLoading } = useProducts(subdomain as never, user?.token);
    const navigate = useRouter();


    if (products.length === 0) {
        return <LayoutEmptyCustom title="productos" subtitle="producto" />
    }

    return (
        <>
            {
                isLoading ?
                    <ProductListSkeleton />
                    :
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                            {products.map((product) => (
                                <>
                                    <div className="bg-background rounded-lg shadow-xl overflow-hidden border">
                                        <div className="relative h-48 w-full">
                                            <Image
                                                src={product.images[0]}
                                                alt={product.name}
                                                width={300}
                                                height={400}
                                                className="object-scale-down w-full h-full"
                                                priority
                                            />

                                            <div className="absolute top-2 right-2">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 rounded-full">
                                                            <DotsHorizontalIcon className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={()=>navigate.push(`/dashboard/product/edit/${product.id}`)}>
                                                            <Icons.filePenIcon className="h-4 w-4 mr-2" />
                                                            Editar
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem >
                                                            <Icons.eye className="h-4 w-4 mr-2" />
                                                            Ver
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-500">
                                                            <Icons.trash className="h-4 w-4 mr-2" />
                                                            Eliminar
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            <h3 className="text-lg font-bold">{product.name}</h3>
                                            <p className="text-primary font-sans">BS {product.price}</p>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </>
            }
        </>
    )
}





