"use client";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { SelectProvider } from "./select-provider";
import { SelectBranch } from "./select-branch";
import { SelectProduct } from "./select-product";
import { useRouter } from "next/navigation";
import { useParamsClient } from "@/hooks/use-params";
import { useProducts } from "@/hooks/use-product";
import { AllProduct } from "@/lib/queries/interfaces/product.interface";
import { Icons } from "@/components/icons";
import { useBuys } from "@/hooks/use-buys";
import { toast } from "@/components/ui/use-toast";


interface Branchs {
    id: number;
    name: string;
}

interface Provider {
    id: string;
    name: string;
}

interface ProductState {
    productId: string;
    cant: string;
    price: string;
}


export default function AddNotePage() {
    const [selectedValueBranch, setSelectedValueBranch] = useState<Branchs>()
    const [selectedValueProvicer, setSelectedValueProvider] = useState<Provider>()
    const [isLoadingSubmit, setIsLoading] = useState<boolean>(false)
    const [productState, setProducts] = useState<ProductState[]>([]);
    const navigate = useRouter();


    const { subdomain, user } = useParamsClient();
    const { createBuy } = useBuys(subdomain as never, user?.token);

    const handleProductChange = (index: number, key: keyof ProductState, value: string) => {
        const newProducts: ProductState[] = [...productState];
        newProducts[index] = {
            ...newProducts[index],
            [key]: value,
        };
        setProducts(newProducts);
    };

    const handleAddProduct = () => {
        setProducts([...productState, { productId: "", cant: "", price: "" }]);
    };

    const handleRemoveProduct = (index: number) => {
        const newProducts = productState.filter((_, i) => i !== index);
        setProducts(newProducts);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const buy = {
                branchId: selectedValueBranch?.id,
                providerId: selectedValueProvicer?.id,
                products: productState.map(product => ({
                    productId: parseInt(product.productId),
                    cant: parseInt(product.cant),
                    price: product.price
                }))
            };
            await createBuy.mutateAsync({
                subdomain: subdomain as never,
                serviceToken: user?.token as never,
                buy: buy as never,
            });
            setIsLoading(false);
            navigate.push('/dashboard/buy');
            toast({
                description: "Nota de ingreso creado correctamente",
                variant: "default"
            });
        } catch (err) {
            console.error("Error creando la sucursal", err);
            setIsLoading(false);
            let errorMessage = "Ocurrió un error inesperado. Intente de nuevo.";
            if (typeof err === "object" && err !== null && "response" in err && typeof err.response === "object" && "data" in err?.response!) {
                errorMessage = (err.response as { data: { message?: string } }).data.message || errorMessage;
            }

            toast({
                title: "Ha ocurrido un error.",
                description: `${errorMessage}. No se creó la nota de venta. Intente de nuevo.`,
                variant: "destructive",
            });
        }

    };

    const HandleCancel = () => {
        navigate.push('/dashboard/buy');
    }


    return (
        <div className="flex-grow overflow-y-auto md:pb-48 pb-64 max-h-screen scroll-smooth scroll-pt-px">
            <div className="mx-auto py-4 p-5">
                <form onSubmit={handleSubmit}>
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Proveedor y Sucursal</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Proveedor
                                    </label>
                                    <SelectProvider setUserProvider={setSelectedValueProvider as never} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Sucursal
                                    </label>
                                    <SelectBranch setUserBranch={setSelectedValueBranch as never} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Productos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {productState?.map((product, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                                    <div className="flex-grow">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Producto
                                        </label>
                                        <SelectProduct
                                            branchId={selectedValueBranch?.id as never}
                                            onChange={(value: string) => handleProductChange(index, "productId", value)}
                                        />
                                    </div> 
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Cantidad
                                        </label>
                                        <Input
                                            type="number"
                                            name="cant"
                                            value={product.cant}
                                            onChange={(e) => handleProductChange(index, "cant", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Precio
                                        </label>
                                        <Input
                                            type="number"
                                            name="price"
                                            step="0.01"
                                            value={product.price}
                                            onChange={(e) => handleProductChange(index, "price", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={() => handleRemoveProduct(index)}
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Eliminar
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={handleAddProduct}>
                                <Plus className="mr-2 h-4 w-4" />
                                Añadir Producto
                            </Button>
                        </CardContent>
                    </Card>
                    <div className="flex justify-end">
                        <Button type="submit" variant="default" disabled={isLoadingSubmit}>
                            {isLoadingSubmit && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Enviar Nota
                        </Button>
                        <Button variant="outline" type="submit" onClick={HandleCancel} className="ml-2 mr-2">
                            Cancelar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}