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



interface DialogCreateProps {
    HandleSubmit: ( description: string) => Promise<void>,
}

export function DialogCreate({ HandleSubmit }: DialogCreateProps) {

    const [userData, setUserData] = useState({
    
        description: '',

    });

    // const [userCategory, setUserCategory] = useState({
    //     idCategory: '',
    // });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateCategoria = async () => {
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
                        Description
                    </Label>
                    <Input
                        id="description"
                        name="description"
                        value={userData.description}
                        onChange={handleChange}
                        placeholder="Introduzca la categoria"
                        className="col-span-3"
                    />
                </div>
                
               
            </div>
            <DialogFooter>
                <Button
                    onClick={handleCreateCategoria}
                    type="button"
                >
                    Crear Categoria
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}
