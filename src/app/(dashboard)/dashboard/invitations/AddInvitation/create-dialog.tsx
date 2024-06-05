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
import SelectRol from "./select-rol"

interface DialogCreateProps {
    HandleSubmit: (email: string, name: string, phone: string, idBranch: string) => Promise<void>,
}

export function DialogCreate({ HandleSubmit }: DialogCreateProps) {

    const [userData, setUserData] = useState({
        name: '',
       
    });

    const [Rol, setRol] = useState({
        idRol: '',
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
                <DialogTitle>Crear empleado</DialogTitle>
                <DialogDescription>
                    Termine de enviar su invitacion aquí. Haga clic en enviar invitacion cuando haya terminado.
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
                    <Label htmlFor="phone" className="text-right">
                        Rol
                    </Label>
                    <SelectRol setRol={setRol} />
                </div>
            </div>
            <DialogFooter>
                <Button
                    onClick={handleCreateEmployee}
                    type="button"
                >
                    Enviar Invitacion
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}
