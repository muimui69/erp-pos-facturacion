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
import { useProducts } from "@/hooks/use-product"

interface Product {
    id: string;
    name: string;
}

interface SelectProductProps {
    selectedProductId: string;
    onChange: (value: string) => void;
}


export function SelectProduct({ selectedProductId, onChange }: SelectProductProps) {
    const [open, setOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState<Product>()

    const { subdomain, user } = useParamsClient();
    const { products, isLoading } = useProducts(subdomain as never, user?.token);

    const handleToggleOption = (product: Product) => {
        setSelectedValue({
            id: product.id,
            name: product.name
        });
        onChange(product.id);
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
                    {selectedValue ? selectedValue.name : "Seleccionar producto..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 max-h-[200px] overflow-auto">
                <Command>
                    <CommandInput placeholder="Search branches..." />
                    <CommandList>
                        <CommandEmpty>No se encontro el producto.</CommandEmpty>
                        <CommandGroup>
                            {products.map((product) => (
                                <CommandItem
                                    key={product.id}
                                    value={product.name}
                                    onSelect={() => handleToggleOption({
                                        id: product.id.toString(),
                                        name: product.name
                                    })}
                                >
                                    {product.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}