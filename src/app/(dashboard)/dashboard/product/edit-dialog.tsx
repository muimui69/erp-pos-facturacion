"use client"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { putUpdateCity } from "@/lib/queries/city";
import { Product } from "./columns";
import { Category } from '../category/columns';

export const DialogEditProducto = ({data, setIsDialogOpen }: { setIsDialogOpen: Dispatch<SetStateAction<boolean>>, data: Product }) => {

    const [ProductData, setProductData] = useState({
        
        name: data.name,
        description:data.description,
        price:data.price,
        photo:data.photo,
        Category:data.categories
    });
    const [previewImage, setPreviewImage] = useState<string>(data.photo);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target;

        if (name === "photo" && files && files[0]) {
            const file = files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };

            reader.readAsDataURL(file);
            setSelectedFile(file);
        } else {
            setProductData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleEditProduct = async () => {
        try {
            //Consumir Api Edit Product
            // await putUpdateCity(cityData.name, cityData.id.toString());
            setIsDialogOpen(false)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Editar Producto</DialogTitle>
                <DialogDescription>
                    Realice cambios aquí. Haga clic en guardar cambios cuando haya terminado.
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
                        value={ProductData.name}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Descripcion
                    </Label>
                    <Input
                        id="description"
                        name="description"
                        value={ProductData.description}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Price
                    </Label>
                    <Input
                        id="price"
                        name="price"
                        value={ProductData.price}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="photo" className="text-right">
                        Imagen
                    </Label>
                    <div className="col-span-3">
                        {previewImage && <img src={previewImage} alt="Preview" className="mb-2 w-full h-48 object-cover" />}
                        <Input
                            name="photo"
                            id="photo"
                            type="file"
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Categoria
                    </Label>
                    
                    <div className="col-span-3">
                    <Input 
                           name="Category"
                           value={ProductData.Category}
                           id="Category" 
                           onChange={handleChange}
                            className="w-full" 
                    />
        
                    </div>
                </div>
            </div>
            <DialogFooter>
                <Button
                    onClick={handleEditProduct}
                    type="button"
                >
                    Guardar cambios
                </Button>
            </DialogFooter>
        </DialogContent>
    );
};
