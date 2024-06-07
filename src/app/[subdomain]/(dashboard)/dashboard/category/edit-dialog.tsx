"use client"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AllCategory } from "@/lib/queries/interfaces/category.interface";
import { Icons } from "@/components/icons";
import { useCategories } from "@/hooks/use-category";
import { useParamsClient } from "@/hooks/use-params";

interface CategoryData {
    id: string;
    description: string;
}

export const DialogEditCategory = ({ data, setIsDialogOpen }: { setIsDialogOpen: Dispatch<SetStateAction<boolean>>, data: AllCategory }) => {

    const { subdomain } = useParamsClient();
    const { patchCategory } = useCategories(subdomain as never);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [categoryData, setCategoryData] = useState<CategoryData>({
        id: data.id.toString(),
        description: data.description
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCategoryData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditCategory = async () => {
        try {
            setIsloading(true);
            await patchCategory.mutateAsync({
                subdomain: subdomain as never,
                id: categoryData.id,
                category: {
                    description: categoryData.description
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
                <DialogTitle>Editar Categoria</DialogTitle>
                <DialogDescription>
                    Realice cambios aquí. Haga clic en guardar cambios cuando haya terminado.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                        Descripcion
                    </Label>
                    <Input
                        id="description"
                        name="description"
                        value={categoryData.description}
                        onChange={handleChange}
                        className="col-span-3 capitalize"
                    />
                </div>
            </div>

            <DialogFooter>
                <Button
                    onClick={handleEditCategory}
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
};

