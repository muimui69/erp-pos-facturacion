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
import { Dispatch, SetStateAction, useState } from "react";
import SelectBranch from "./select-sucursal";
import { useParamsClient } from "@/hooks/use-params";
import { useBoxes } from "@/hooks/use-box";
import { Icons } from "@/components/icons";

export function DialogEdit({ setIsDialogOpen, data }: { setIsDialogOpen: Dispatch<SetStateAction<boolean>>, data: any }) {
    const { subdomain } = useParamsClient();
    const { patchAtm } = useBoxes(subdomain as never);
    const [isLoading, setIsloading] = useState<boolean>(false);
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

   
    const handleEditAtm = async () => {
        try {
            setIsloading(true);
            // await patchAtm.mutateAsync({
            //     subdomain: subdomain as never,
            //     id: categoryData.id,
            //     category: {
            //         description: categoryData.description
            //     }
            // });
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
                        <SelectBranch setUserBranch={setSelectedBranch} />
                    </div>
                </div>
            </div>
            <DialogFooter>
                <Button
                    onClick={handleEditAtm}
                    disabled={isLoading}
                    type="button"
                >
                    {isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Guardar cambios
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}