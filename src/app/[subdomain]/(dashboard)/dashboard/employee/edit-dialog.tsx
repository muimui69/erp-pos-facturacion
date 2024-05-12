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
import { useState } from "react";

export function DialogEdit() {
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditEmployee = async () => {
        
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Editar datos</DialogTitle>
                <DialogDescription>
                    Realice cambios en el perfil del empleado aquí. Haga clic en guardar cuambios cuando haya terminado.
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
                        placeholder="Joaquin chumacero"
                        onChange={handleChange}
                        value={userData.name}
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
                        placeholder="0000000"
                        onChange={handleChange}
                        value={userData.phone}
                        className="col-span-3"
                    />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit" >Guardar cambios</Button>
            </DialogFooter>
        </DialogContent>
    )
}