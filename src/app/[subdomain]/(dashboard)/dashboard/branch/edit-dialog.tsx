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
import { useBranchs } from "@/hooks/use-branch";
import { useParamsClient } from "@/hooks/use-params";
import { PatchBranchParams } from "@/lib/queries/interfaces/branch.interface";
import { Dispatch, SetStateAction, useState } from "react";

export function DialogEdit({ setIsDialogOpen, data }: { setIsDialogOpen: Dispatch<SetStateAction<boolean>>, data: PatchBranchParams }) {
    const { subdomain, user } = useParamsClient();
    const { patchBranch } = useBranchs(subdomain as never, user?.token);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [userData, setUserData] = useState({
        name: data.name,
        address: data.address,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditBranch = async () => {
        try {
            setIsloading(true);
            await patchBranch.mutateAsync({
                subdomain: subdomain as never,
                id: data?.id!.toString(),
                serviceToken: user?.token! as never,
                branch: {
                    address: userData.address,
                    name:userData.name,
                    cityId: data.cityId,
                    // lat:,
                    // lng:,
                }
            });
            setIsloading(false);
            setIsDialogOpen(false)
        } catch (e) {
            setIsloading(false);
            setIsDialogOpen(false);
            console.error(e)
        }
    }

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
                        Direccion
                    </Label>
                    <Input
                        id="Address"
                        name="Address"
                        placeholder="C/ Guatemala..."
                        onChange={handleChange}
                        value={userData.address}
                        className="col-span-3"
                    />
                </div>
               

            </div>
            <DialogFooter>
                <Button
                    disabled={isLoading}
                    type="submit" onClick={handleEditBranch}>Guardar cambios</Button>
            </DialogFooter>
        </DialogContent>
    )
}
