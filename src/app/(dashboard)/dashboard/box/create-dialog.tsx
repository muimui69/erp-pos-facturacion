"use client"

import MapComponent from "@/components/map-box"
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
import { useState } from "react"
import SelectSucursal from "./select-sucursal"

interface DialogCreateProps {
    // HandleSubmit: (email: string, name: string, phone: string) => Promise<void>;
}

export function DialogCreate({ HandleSubmit }: { HandleSubmit: ( name: string, branchId: string) => Promise<void> }) {

    const [userData, setUserData] = useState<{
       
        name: string;
        
    }>({
       
        name: '',
        
    });



    const [UserBranch, setUserBranch] = useState({
        idBranch: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateEmployee = async () => {
        HandleSubmit( userData.name,  UserBranch.idBranch);
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Crear Sucursal</DialogTitle>
                <DialogDescription>
                    Cree una nueva Caja aquí. Haga clic en crear  Caja cuando haya terminado.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                {/* <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Direccion
                    </Label>
                    <Input
                        id="address"
                        name="address"
                        value={userData.address}
                        onChange={handleChange}
                        placeholder="Calle beijing "
                        className="col-span-3"
                    />
                </div> */}
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                        Nombre
                    </Label>
                    <Input
                        id="nombre"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        placeholder="Juan de la Rosa"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                        Sucursal
                    </Label>
                    <SelectSucursal setUserBranch={setUserBranch} />
                </div>
                {/* <MapComponent setCoords={setCoords} /> */}
            </div>
            <DialogFooter>
                <Button
                    onClick={handleCreateEmployee}
                    type="button"
                >
                    Crear Caja
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}
