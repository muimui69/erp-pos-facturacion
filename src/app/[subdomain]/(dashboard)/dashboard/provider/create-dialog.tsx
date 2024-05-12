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


interface DialogCreateProps {
    HandleSubmit: (name: string, email: string, phone: string) => Promise<void>,
}

export function DialogCreate({ HandleSubmit }: DialogCreateProps) {

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
       
        
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
                        placeholder="Joaquin chumacero"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                        Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        placeholder="ejemplo@gmail.com"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                        Phone
                    </Label>
                    <Input
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        placeholder="67674256"
                        className="col-span-3"
                    />
                </div>
               
            </div>
            <DialogFooter>
                <Button
                    onClick={handleCreateEmployee}
                    type="button"
                >
                    Crear Proveedor
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}
