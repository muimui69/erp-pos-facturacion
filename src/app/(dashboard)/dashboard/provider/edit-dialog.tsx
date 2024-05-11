"use client"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { putUpdateCity } from "@/lib/queries/city";
import { Provider } from "./columns";


export const DialogEditProvider = ({data, setIsDialogOpen }: { setIsDialogOpen: Dispatch<SetStateAction<boolean>>, data: Provider }) => {

    const [ProviderData, setProviderData] = useState({
        
        name: data.name,
        email:data.email,
        phone:data.phone
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProviderData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditProvider= async () => {
        try {
            //Consumir Api Edit Provider
            // await putUpdateCity(cityData.name, cityData.id.toString());
            setIsDialogOpen(false)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Editar Proveedor</DialogTitle>
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
                        value={ProviderData.name}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        value={ProviderData.email}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Phone
                    </Label>
                    <Input
                        id="phone"
                        name="phone"
                        value={ProviderData.phone}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>
             
            </div>
            <DialogFooter>
                <Button
                    onClick={handleEditProvider}
                    type="button"
                >
                    Guardar cambios
                </Button>
            </DialogFooter>
        </DialogContent>
    );
};

