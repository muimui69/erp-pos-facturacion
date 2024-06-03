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
import { CarouselDemo } from "./carrousel"
import SelectUser from "./select-Users"
import SelectRoles from "./select-roles"

interface DialogCreateProps {
    HandleSubmit: (email: string, name: string, phone: string, idBranch: string) => Promise<void>,
}

export function DialogCreate({ HandleSubmit }: DialogCreateProps) {

    const [userData, setUserData] = useState({
        correo: '',
       
    });

    const [Rol, setRol] = useState({
        idRol: '',
    });
    const [User, setUser] = useState({
        idUser: '',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // const handleCreateEmployee = async () => { para Crear Invitaciones 
    //     HandleSubmit(userData.email, userData.name, userData.phone, userBranch.idBranch);
    // };

    return (

                <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Crear empleado</DialogTitle>
                <DialogDescription>
                    Cree un nueva Invitacion aquí. Haga clic en crear Invitacion cuando haya terminado.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Correo
                    </Label>
                    <Input
                        id="correo"
                        name="correo"
                        value={userData.correo}
                        onChange={handleChange}
                        placeholder="Joaquin356@gmail.com"
                        className="col-span-3"
                    />
                </div>
                <div className="items-center gap-4">
                    <Label  className="text-center">
                        o Seleccione los Empleados
                    </Label>
                   
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label  className="text-right">
                        Empleados
                    </Label>
                    <SelectUser setUser={setUser}/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label  className="text-right">
                        Selecciona el Rol asignar
                    </Label>
                    <SelectRoles setRol={setRol}/>
                </div>
            </div>
            <DialogFooter>
                <Button
                    // onClick={handleCreateEmployee}
                    type="button"
                >
                    Crear Invitacion
                </Button>
            </DialogFooter>
        </DialogContent>


        
    )
}
