"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProductStock from "./stock-product";
import Image from "next/image";
import { useParamsClient } from "@/hooks/use-params";
import { useProducts } from "@/hooks/use-product";


interface EditProductProps {
    params: {
        id: number;
    }
}

export default function ViewProduct({ params}: EditProductProps) {

    const { subdomain, user } = useParamsClient();
    const { productId, isLoadingProductId, isErrorProductId } = useProducts(subdomain as never, user?.token, params.id.toString());

    if (isLoadingProductId) {
        return <span>cargando ... </span>
    }

    return (
        <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto py-8 px-4">
            <div className="flex justify-center items-center">
                <div className="relative w-full max-w-[400px] ">
                    <Image
                        src={productId?.data?.product?.images[0] as never}
                        alt="Product Image"
                        className="aspect-square object-cover w-full h-full overflow-hidden"
                        layout="responsive"
                        width={800}
                        height={800}
                        priority
                    />
                </div>
            </div>
            <div className="grid gap-6">
                <Tabs defaultValue="details">
                    <TabsList>
                        <TabsTrigger value="details">Detalles del Producto</TabsTrigger>
                        <TabsTrigger value="stock">Stock del Producto</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" >
                        <div className="mt-6 bg-background rounded-lg shadow-lg overflow-hidden w-full max-w-full md:max-w-sm">
                            <div className="p-6">
                                <div className="flex flex-wrap gap-2">
                                    {productId?.data?.product?.categories.map((item, index) => (
                                        <span
                                            key={index}
                                            className="bg-secondary px-3 py-1 rounded-full text-xs font-medium text-secondary-foreground"
                                        >
                                            {item.category.description}
                                        </span>
                                    ))}
                                </div>

                                <h2 className="text-2xl font-bold mt-4">{productId?.data?.product?.name}</h2>
                                <p className="text-muted-foreground text-sm mt-2">
                                    {productId?.data?.product?.description}
                                </p>
                                <div className="flex items-center justify-between mt-6">
                                    <span className="text-3xl font-bold">{productId?.data?.product?.price} Bs</span>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="stock">
                        <div className="grid gap-4">
                            <ProductStock params={params}/>
                        </div>
                    </TabsContent>
                    
                </Tabs>
            </div>
        </div>
    );
}