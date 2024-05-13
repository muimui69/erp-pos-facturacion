"use client"

import { Button } from "@/components/ui/button"
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, useState } from "react"
import SelectCategory from "./select-category"
import { CategoriesProduct } from "@/lib/queries/interfaces/product.interface"

interface DialogCreateProps {
    HandleSubmit: (name: string, description: string, price: string, photo: File, discount: string, categories?: CategoriesProduct) => Promise<void>,
}

interface Product {
    name: string;
    description: string;
    price: string;
    discount: string;
    photo?: File;
    categories?: CategoriesProduct
}

export function DialogCreate({ HandleSubmit }: DialogCreateProps) {

    const [productData, setProductData] = useState<Product>({
        name: '',
        description: '',
        price: '',
        discount: '',
        photo:undefined,
        categories:undefined
    });

    const [userCategory, setUserCategory] = useState<CategoriesProduct>({
        categories: [{ id: '' }], 
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Obtenemos el primer archivo seleccionado
        if (file) {
            setProductData(prevData => ({
                ...prevData,
                photo: file, // Actualizamos el estado con el archivo seleccionado
            }));
        }
    };

    const handleCreateEmployee = async () => {
        HandleSubmit(productData.name, productData.description, productData.price, productData.photo!, productData.discount,userCategory);
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Crear Producto</DialogTitle>
                <DialogDescription>
                    Cree un nuevo Producto aquí. Haga clic en crear Producto cuando haya terminado.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Nombre
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        placeholder="Yogurt"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                        Descripcion
                    </Label>
                    <Input
                        id="description"
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        placeholder="Yogurt de litro de Durazno"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                        Precio
                    </Label>
                    <Input
                        id="price"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        placeholder="0000000"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="discount" className="text-right">
                        Descuento
                    </Label>
                    <Input
                        id="discount"
                        name="discount"
                        value={productData.discount}
                        onChange={handleChange}
                        placeholder="0000000"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="picture" className="col-span-1 text-right">Foto</Label>
                    <div className="col-span-3">
                        <Input
                            id="picture"
                            type="file"
                            name="photo"
                            accept="image/*"
                            className="w-full"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                        Categoria
                    </Label>

                    <SelectCategory setUserCategory={setUserCategory} />
                </div>
            </div>
            <DialogFooter>
                <Button
                    onClick={handleCreateEmployee}
                    type="button"
                >
                    Crear Producto
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}
