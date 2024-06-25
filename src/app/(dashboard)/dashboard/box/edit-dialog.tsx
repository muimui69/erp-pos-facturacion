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
import { patchBranchOffice } from "@/lib/queries/branch-office";
import { Dispatch, SetStateAction, useState } from "react";
import SelectBranch from "./select-sucursal";
 // Asegúrate de que la ruta sea correcta

export function DialogEdit({ setIsDialogOpen, data }: { setIsDialogOpen: Dispatch<SetStateAction<boolean>>, data: any }) {
    const [userData, setUserData] = useState({
        name: data.name,
        sucursalName: data.branch,
    });

    const [selectedBranch, setSelectedBranch] = useState(data.branchId);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditBranch = async () => {
        try {
            //api para editar ATM
            // await patchBranchOffice(data.id.toString(), {
            //     name: userData.name,
            //     branchId: selectedBranch,
            //     status: true
            // });
            setIsDialogOpen(false);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Editar datos</DialogTitle>
                <DialogDescription>
                    Realice cambios en el perfil de la Caja. Haga clic en guardar cambios cuando haya terminado.
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
                    <Label htmlFor="sucursalName" className="text-right">
                        Sucursal
                    </Label>
                    <div className="col-span-3">
                        <SelectBranch  setUserBranch={setSelectedBranch} />
                    </div>
                </div>
            </div>
            <DialogFooter>
                <Button type="submit" onClick={handleEditBranch}>Guardar cambios</Button>
            </DialogFooter>
        </DialogContent>
    );
}
