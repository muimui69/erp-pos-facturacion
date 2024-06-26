"use client"
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import SelectBranch from "./select-sucursal";

interface DialogCreateProps {
    HandleSubmit: (name: string, branchId: string) => Promise<void>;
}

export const DialogCreate: React.FC<DialogCreateProps> = ({ HandleSubmit }) => {
    const [userData, setUserData] = useState<{
        name: string;
    }>({
        name: "",
    });

    const [UserBranch, setUserBranch] = useState({
        idBranch: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateBox = async () => {
        await HandleSubmit(userData.name, UserBranch.idBranch);
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Crear Caja </DialogTitle>
                <DialogDescription>
                    Cree una nueva Caja aquí. Haga clic en crear Caja cuando haya terminado.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
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

                    <Label htmlFor="email" className="text-right">
                        Sucursal
                    </Label>
                    <SelectBranch setUserBranch={setUserBranch} />
                </div>
            </div>
            <DialogFooter>
                <Button onClick={handleCreateBox} type="button">
                    Crear Caja
                </Button>
            </DialogFooter>
        </DialogContent>
    );
};