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
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useParamsClient } from "@/hooks/use-params"
import { useProducts } from "@/hooks/use-product"
import { useBuys } from "@/hooks/use-buys"

interface Product {
    id: string;
    name: string;
}

interface SelectProductProps {
    branchId: string;
    onChange: (value: string) => void;
}


export function SelectProduct({ branchId, onChange }: SelectProductProps) {
    const [inputValue, setInputValue] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searched, setSearched] = useState(false);

    const { subdomain, user } = useParamsClient();
    const { productForBuys, isLoading } = useBuys(subdomain as never, user?.token, undefined, inputValue as never, branchId as never);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSearch = () => {
        onChange(inputValue);
        if (productForBuys) {
            setSelectedProduct(productForBuys as never);
            setSearched(true);
        } else {
            setSearched(false);
            setSelectedProduct(null);
        }
    };

    if (isLoading) {
        return <span>Cargando ... </span>;
    }

    return (
        <>
            <div className="flex items-center mb-4 space-x-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Ingrese ID de producto"
                    className="border border-gray-300 rounded px-2 py-1 flex-grow"
                />
            </div>
            <Button type="button" className="flex-shrink-0" onClick={handleSearch}>Buscar</Button>
            {selectedProduct ? (
                <div>
                    <p>Producto encontrado:</p>
                    <p>ID: {selectedProduct.id} </p>
                    <p>Nombre: {selectedProduct.name}</p>
                </div>
            ) : (
                inputValue && !searched && <p>No se encontró el producto.</p>
            )}
        </>
    )
}