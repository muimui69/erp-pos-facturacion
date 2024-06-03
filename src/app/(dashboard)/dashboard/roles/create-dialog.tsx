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



interface DialogCreateProps {
    HandleSubmit: (name: string, email: string, phone: string) => Promise<void>,
    availablePermissions: string[] | undefined;
}
export function DialogCreate({ HandleSubmit, availablePermissions }: DialogCreateProps) {
    const [userData, setUserData] = useState({
        name: '',
    });
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePermissionChange = (permission: string) => {
        if (selectedPermissions.includes(permission)) {
            setSelectedPermissions(selectedPermissions.filter(p => p !== permission));
        } else {
            setSelectedPermissions([...selectedPermissions, permission]);
        }
    };

    const filteredPermissions = availablePermissions?.filter(permission =>
        permission.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateEmployee = async () => {
        // HandleSubmit(userData.email, userData.name, userData.phone, userBranch.idBranch);
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Crear Producto</DialogTitle>
                <DialogDescription>
                    Cree un nuevo Rol aquí. Haga clic en crear Rol cuando haya terminado.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Descripcion
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        placeholder="Vendedor"
                        className="col-span-3"
                    />
                </div>
                <div className="ml-3">
                    <h3 className="mb-3 font-bold">Lista de Permisos</h3>
                    <Input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar permisos..."
                        className="mb-2"
                    />
                    {filteredPermissions?.map(permission => (
                        <div key={permission} className="flex items-center">
                            <input
                                type="checkbox"
                                id={permission}
                                checked={selectedPermissions.includes(permission)}
                                onChange={() => handlePermissionChange(permission)}
                                className="mr-4"
                            />
                            <label htmlFor={permission}>{permission}</label>
                        </div>
                    ))}
                </div>
            </div>
            <DialogFooter>
                <Button
                    onClick={handleCreateEmployee}
                    type="button"
                >
                    Crear Rol
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}