"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface DialogCreateProps {
    HandleSubmit: (email: string, name: string, phone: string) => Promise<void>;
}

export function DialogCreate({ HandleSubmit }: { HandleSubmit:(email: string, name: string, phone: string) => Promise<void> }) {

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateEmployee = async () => {
        HandleSubmit(userData.email, userData.name, userData.phone);
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Crear empleado</DialogTitle>
                <DialogDescription>
                    Cree un nuevo empleado aquí. Haga clic en crear empleado cuando haya terminado.
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
                        Correo
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
                        Telefono
                    </Label>
                    <Input
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        placeholder="0000000"
                        className="col-span-3"
                    />
                </div>
            </div>
            <DialogFooter>
                <Button
                    onClick={handleCreateEmployee}
                    type="button"
                >
                    Crear empleado
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}
