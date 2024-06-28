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
import { Dispatch, SetStateAction, useState } from "react"
import { useParamsClient } from "@/hooks/use-params"
import { useProviders } from "@/hooks/use-provider"

interface Provider {
    id: string;
    name: string;
}

interface SelectProviderProps {
    setUserProvider: Dispatch<SetStateAction<Provider>>;
}


export function SelectProvider({ setUserProvider }: SelectProviderProps) {
    const [open, setOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState<Provider>()

    const { subdomain, user } = useParamsClient();
    const { providers, isLoading } = useProviders(subdomain as never, user?.token);

    const handleToggleOption = (provider: Provider) => {
        setSelectedValue({
            id: provider.id,
            name: provider.name
        });
        setUserProvider({
            id: provider.id,
            name: provider.name
        });
        setOpen(false);
    };

    if (isLoading) {
        return <span>Cargando ... </span>
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {selectedValue ? selectedValue.name : "Seleccionar sucursal..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 max-h-[200px] overflow-auto">
                <Command>
                    <CommandInput placeholder="Search branches..." />
                    <CommandList>
                        <CommandEmpty>No se encontro el proveedor.</CommandEmpty>
                        <CommandGroup>
                            {providers.map((provider) => (
                                <CommandItem
                                    key={provider.id}
                                    value={provider.name}
                                    onSelect={() => handleToggleOption({
                                        id: provider.id,
                                        name: provider.name
                                    })}
                                >
                                    {provider.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}