"use client"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { putUpdateCity } from "@/lib/queries/city";

export const DialogEditCity = ({ cityId, cityName, setIsDialogOpen }: { cityId: number, cityName: string, setIsDialogOpen: Dispatch<SetStateAction<boolean>>; }) => {

    const [cityData, setCityData] = useState({
        id: cityId,
        name: cityName,
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCityData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditCity = async () => {
        try {
            await putUpdateCity(cityData.name, cityData.id.toString());
            setIsDialogOpen(false)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Editar ciudad</DialogTitle>
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
                        value={cityData.name}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>
            </div>
            <DialogFooter>
                <Button
                    onClick={handleEditCity}
                    type="button"
                >
                    Guardar cambios
                </Button>
            </DialogFooter>
        </DialogContent>
    );
};

