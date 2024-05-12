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
import SelectBranch from "@/src/app/(dashboard)/dashboard/employee/select-branch"
import SelectCategory from "./select-category"

interface DialogCreateProps {
    HandleSubmit: (name: string, description: string, price: string, photo: string,IdCategories:string) => Promise<void>,
}

export function DialogCreate({ HandleSubmit }: DialogCreateProps) {

    const [userData, setUserData] = useState({
        name: '',
        description: '',
        price: '',
        photo:'',
        
    });

    const [userCategory, setUserCategory] = useState({
        idCategory: '',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateEmployee = async () => {
        // HandleSubmit(userData.email, userData.name, userData.phone, userBranch.idBranch);
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
                        value={userData.name}
                        onChange={handleChange}
                        placeholder="Yogurt"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                        Description
                    </Label>
                    <Input
                        id="description"
                        name="description"
                        value={userData.description}
                        onChange={handleChange}
                        placeholder="Yogurt de litro de Durazno"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                        Price
                    </Label>
                    <Input
                        id="price"
                        name="price"
                        value={userData.price}
                        onChange={handleChange}
                        placeholder="0000000"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="picture" className="col-span-1 text-right">Photo</Label>
                    <div className="col-span-3">
                    <Input id="picture" type="file" className="w-full" />
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
