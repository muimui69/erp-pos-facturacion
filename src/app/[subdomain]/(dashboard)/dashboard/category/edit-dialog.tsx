"use client"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { putUpdateCity } from "@/lib/queries/city";
import { Category } from "./columns";

export const DialogEditCategory = ({data, setIsDialogOpen }: { setIsDialogOpen: Dispatch<SetStateAction<boolean>>, data: Category}) => {

    const [ProductData, setProductData] = useState({
        
     
        description:data.description,
      
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditCategory = async () => {
        try {
            //Consumir Api Edit Category
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
              
                
            </div>
            <DialogFooter>
                <Button
                    onClick={handleEditCategory}
                    type="button"
                >
                    Guardar cambios
                </Button>
            </DialogFooter>
        </DialogContent>
    );
};

