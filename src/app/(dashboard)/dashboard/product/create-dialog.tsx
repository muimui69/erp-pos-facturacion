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

export function DialogCreate({ HandleSubmit }: { HandleSubmit:( name: string) => Promise<void> }) {

    const [userData, setUserData] = useState({
        name: '',
       
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateEmployee = async () => {
        HandleSubmit( userData.name);
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Crear Ciudad</DialogTitle>
                <DialogDescription>
                    Cree una nueva Ciudad aquí. Haga clic en crear Ciudad cuando haya terminado.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Nombre de la Ciudad
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        placeholder="Santa Cruz..."
                        className="col-span-3"
                    />
                </div>
               
            </div>
            <DialogFooter>
                <Button
                    onClick={handleCreateEmployee}
                    type="button"
                >
                    Crear Ciudad
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}
