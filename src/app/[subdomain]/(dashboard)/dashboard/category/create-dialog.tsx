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

interface DialogCreateProps {
    HandleSubmit: (description: string) => Promise<void>,
}

export function DialogCreate({ HandleSubmit }: DialogCreateProps) {

    const [categoryData, setCategoryData] = useState({
        description: '',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCategoryData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateCategoria = async () => {
        HandleSubmit(categoryData.description);
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Crear Categoria</DialogTitle>
                <DialogDescription>
                    Cree un nueva Categoria aquí. Haga clic en crear Categoria cuando haya terminado.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Descripcion
                    </Label>
                    <Input
                        id="description"
                        name="description"
                        value={categoryData.description}
                        onChange={handleChange}
                        placeholder="Introduzca la categoria"
                        className="col-span-3"
                    />
                </div>
            </div>
            <DialogFooter>
                <Button
                    onClick={handleCreateCategoria}
                    type="button"
                >
                    Crear Categoria
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}
