"use client"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useParamsClient } from "@/hooks/use-params";
import { useProducts } from "@/hooks/use-product";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { SelectCa } from "../../add/select-category";
import EditProductSkeleton from "@/components/edit-product-skeleton";
import { SelectCaEdit } from "./select-category";


interface Product {
    name: string;
    description: string;
    price: string;
    discount?: number;
}

interface Categories {
    id: number;
    description: string;
}

interface EditProductProps {
    params: {
        id: number;
    }
}

export default function EditProduct({ params: { id } }: EditProductProps) {
    const { subdomain, user } = useParamsClient();
    const { productId, isLoadingProductId, isErrorProductId, patchProduct } = useProducts(subdomain as never, user?.token, id.toString());
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedValues, setSelectedValues] = useState<Categories[]>([]);
    const navigate = useRouter()

    console.log(productId)

    const [productData, setProductData] = useState<Product>({
        name: '',
        description: '',
        price: '',
        discount: 0,
    });


    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedFile(undefined);
            setImagePreview(undefined);
        }
    };

    const handleRemoveImage = () => {
        setSelectedFile(undefined);
        setImagePreview(undefined);
    };


    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('name', productData.name);
            formData.append('description', productData.description);
            formData.append('price', productData.price);
            if (selectedFile) {
                formData.append('photo', selectedFile);
            }
            formData.append('discount', productData.discount as never);
            formData.append('categories', JSON.stringify(selectedValues));
            await patchProduct.mutateAsync({
                id: id.toString(),
                serviceToken: user?.token as never,
                subdomain: subdomain as never,
                formData
            });
            navigate.push("/dashboard/product")
            setIsLoading(false);
            toast({
                description: "Producto actualizado correctamente"
            })
        } catch (err) {
            console.error("Error actulizando el Producto", err);
            setIsLoading(false);
            toast({
                description: "No se actualizo el Producto. Intente de nuevo",
                variant: "destructive"
            })
        }
    }

    useEffect(() => {
        setProductData({
            name: productId?.data.product.name!,
            description: productId?.data.product.description!,
            price: productId?.data.product.price!,
            discount: +productId?.data.product.discount! || 0,
        });
        setImagePreview(productId?.data.product.images[0]!);
    }, [subdomain, id, user?.token, productId]);

    if (isLoadingProductId) {
        return <EditProductSkeleton />
    }

    return (
        <div className="flex-grow overflow-y-auto md:pb-48 pb-64 max-h-screen scroll-smooth scroll-pt-px">
            <div className="max-w-6xl px-4 mx-auto py-6">
                <div className="grid gap-6 lg:gap-12 items-start md:grid-cols-1 lg:grid-cols-2">
                    <div className="bg-background border rounded-lg p-6 flex flex-col items-center justify-center gap-4">
                        {imagePreview ? (
                            <>
                                <div className="relative w-full max-w-[400px]">
                                    <Image
                                        src={imagePreview}
                                        alt="Product Image"
                                        className="aspect-square object-cover w-full h-full overflow-hidden"
                                        layout="responsive"
                                        width={800}
                                        height={800}
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="absolute top-2 right-2"
                                        onClick={handleRemoveImage}
                                    >
                                        <Icons.close className="w-5 h-5" />
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-2">
                                <Icons.upload className="w-10 h-10 text-muted-foreground" />
                                <p className="text-muted-foreground">Haga click para cargar imagen</p>
                                <Input
                                    id="fileInput"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <Button
                                    size="sm"
                                    onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement).click()}
                                >
                                    Cargar imagen
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="bg-background border rounded-lg p-4">
                        <h2 className="text-xl font-bold mb-4">Detalles del Producto</h2>
                        <form className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-base">
                                    Nombre
                                </Label>
                                <Input
                                    name="name"
                                    placeholder="Introduzca el nombre del Producto"
                                    value={productData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description" className="text-base">
                                    Descripcion
                                </Label>
                                <Textarea
                                    name="description"
                                    placeholder="Introduzca la Descripcion del Producto"
                                    className="min-h-[100px]"
                                    value={productData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2 md:grid-cols-2">
                                <div className="grid">
                                    <Label htmlFor="price" className="text-base">
                                        Precio
                                    </Label>
                                    <Input
                                        name="price"
                                        type="number"
                                        placeholder="Introduzca el precio"
                                        value={productData.price}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid">
                                    <Label htmlFor="discount" className="text-base">
                                        Descuento
                                    </Label>
                                    <Input
                                        name="discount"
                                        type="number"
                                        placeholder="Introduzca el descuento"
                                        value={productData.discount}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="category" className="text-base">
                                    Categoria
                                </Label>
                                <SelectCaEdit setUserCategory={setSelectedValues} productId={productId!} />
                            </div>
                        </form>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline">Cancelar</Button>
                    <Button disabled={isLoading} onClick={handleSubmit} type="button">
                        Guardar
                    </Button>
                </div>
            </div>
        </div>
    );
};
