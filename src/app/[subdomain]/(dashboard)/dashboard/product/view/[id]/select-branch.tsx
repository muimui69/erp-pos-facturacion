"use client"

import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useParamsClient } from "@/hooks/use-params"
import { Dispatch, SetStateAction, useState } from "react"
import { useStocksSection } from "@/hooks/use-stock-section"


interface Branchs {
    id: number;
    name: string;
}

interface SelectBranchProps {
    setUserCategory: Dispatch<SetStateAction<Branchs[]>>;
    params: {
        id: number;
    }
}

export function SelectBranch({ setUserCategory, params: { id } }: SelectBranchProps) {
    const [open, setOpen] = useState(false)
    const [selectedValues, setSelectedValues] = useState<Branchs[]>([])

    const { subdomain, user } = useParamsClient();
    const { branchsNotInProductTest, isLoadingBranchInNotProduct } = useStocksSection(subdomain as never, user?.token, id.toString());


    const handleToggleOption = (value: Branchs) => {
        const isSelected = selectedValues.some((v) => v.id === value.id);
        const newSelectedValues = isSelected
            ? selectedValues.filter((v) => v.id !== value.id)
            : [...selectedValues, value];

        setSelectedValues(newSelectedValues);
        setUserCategory(newSelectedValues);
    }

    if (isLoadingBranchInNotProduct) {
        return <span>Cargando ... </span>
    }

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {selectedValues.length > 0
                            ? selectedValues.map((value) =>
                                branchsNotInProductTest.find((fw: any) => fw.id === value.id)?.name
                            ).join(", ")
                            : "Seleccione las sucursales ..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 max-h-min overflow-auto">
                    <Command>
                        <CommandInput placeholder="Buscar categorias..." />
                        <CommandList>
                            <CommandEmpty>Sucursal no encontrada.</CommandEmpty>
                            <CommandGroup>
                                {branchsNotInProductTest?.map((branch: any) => (
                                    <CommandItem
                                        key={branch.id}
                                        value={branch.name}
                                        onSelect={() => handleToggleOption({
                                            id: branch.id,
                                            name: branch.name
                                        })}
                                    >
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-4 w-4 mr-2"
                                                checked={selectedValues.some((v) => v.id === branch.id)}
                                            />
                                            {branch.name}
                                        </label>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    )
}