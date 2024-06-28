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
import { useEmployees } from "@/hooks/use-employee";
import { useParamsClient } from "@/hooks/use-params";
import { Dispatch, SetStateAction, useState } from "react";
import SelectRoles from "./select-roles";
import { AllUser } from "@/lib/queries/interfaces/employee.interface";


interface DialogEditProps {
    data: AllUser;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

interface RolData {
    id: string;
    desc: string;
}


export function DialogEdit({ data, setIsDialogOpen }: DialogEditProps) {

    const { subdomain, user } = useParamsClient();
    const { patchEmployee } = useEmployees(subdomain as never, user?.token);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [rolData, setRolData] = useState<RolData>({
        id: data.id.toString(),
        desc: data.rol.desc
    });

    const [rol, setRol] = useState({
        idRol: '',
    });

    const handleEditEmployee = async () => {
        try {
            setIsloading(true);
            await patchEmployee.mutateAsync({
                serviceToken: user?.token!,
                subdomain: subdomain as never,
                id: data?.id.toString(),
                rolId: rol.idRol
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
                    <Label className="text-right">
                        Asignar:
                    </Label>
                    <SelectRoles setRol={setRol} data={data} />
                </div>
            </div>
            <DialogFooter>
                <Button
                    onClick={handleEditEmployee}
                    disabled={isLoading}
                    type="submit"
                >
                    Guardar cambios
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}
