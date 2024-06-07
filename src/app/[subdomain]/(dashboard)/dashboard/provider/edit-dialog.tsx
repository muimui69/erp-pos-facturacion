"use client"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AllProvider } from "@/lib/queries/interfaces/provider.intreface";
import { useProviders } from "@/hooks/use-provider";
import { useParamsClient } from "@/hooks/use-params";


export const DialogEditProvider = ({ data, setIsDialogOpen }: { setIsDialogOpen: Dispatch<SetStateAction<boolean>>, data: AllProvider }) => {

    const { subdomain } = useParamsClient();
    const { patchProvider } = useProviders(subdomain as never);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [providerData, setProviderData] = useState({
        id:data.id,
        name: data.name,
        email: data.email,
        phone: data.phone
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProviderData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditProvider = async () => {
        try {
            setIsloading(true);
            await patchProvider.mutateAsync({
                subdomain: subdomain as never,
                id:providerData.id,
                provider: {
                    name: providerData.name,
                    email: providerData.email,
                    phone: providerData.phone
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
                <DialogTitle>Editar Proveedor</DialogTitle>
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
                        value={providerData.name}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        value={providerData.email}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Phone
                    </Label>
                    <Input
                        id="phone"
                        name="phone"
                        value={providerData.phone}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>

            </div>
            <DialogFooter>
                <Button
                    onClick={handleEditProvider}
                    type="button"
                >
                    Guardar cambios
                </Button>
            </DialogFooter>
        </DialogContent>
    );
};
