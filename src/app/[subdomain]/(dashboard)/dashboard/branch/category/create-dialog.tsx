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

export function DialogCreate({ HandleSubmit }: { HandleSubmit:(address: string, name: string, lat: number,lng:number) => Promise<void> }) {

    const [userData, setUserData] = useState<{
        address: string;
        name: string;
        lat: number;
        lng: number;
    }>({
        address: '',
        name: '',
        lat: 0,
        lng: 0,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateEmployee = async () => {
        HandleSubmit(userData.address,userData.name,userData.lat,userData.lng);
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Crear Sucursal</DialogTitle>
                <DialogDescription>
                    Cree una nueva sucursal aquí. Haga clic en crear  sucursal cuando haya terminado.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
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
                </div>
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
                        latitud
                    </Label>
                    <Input
                        id="lat"
                        name="lat"
                        value={userData.lat}
                        onChange={handleChange}
                        placeholder="00.00"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                        longitud
                    </Label>
                    <Input
                        id="lng"
                        name="lng"
                        value={userData.lng}
                        onChange={handleChange}
                        placeholder="00.00"
                        className="col-span-3"
                    />
                </div>
            </div>
            <DialogFooter>
                <Button
                    onClick={handleCreateEmployee}
                    type="button"
                >
                    Crear Sucursal
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}
