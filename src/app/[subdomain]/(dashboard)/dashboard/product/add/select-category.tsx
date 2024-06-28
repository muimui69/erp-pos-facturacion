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
import { useCategories } from "@/hooks/use-category"
import { Dispatch, SetStateAction, useState } from "react"


interface Categories {
  id: number;
  description: string;
}

interface SelectBranchProps {
  setUserCategory: Dispatch<SetStateAction<Categories[]>>;
}

export function SelectCa({ setUserCategory }: SelectBranchProps) {
  const [open, setOpen] = useState(false)
  const [selectedValues, setSelectedValues] = useState<Categories[]>([])

  const { subdomain, user } = useParamsClient();
  const { categoriesProd,isLoadingProd } = useCategories(subdomain as never, user?.token);

  const handleToggleOption = (value: Categories) => {
    const isSelected = selectedValues.some((v) => v.id === value.id);
    const newSelectedValues = isSelected
      ? selectedValues.filter((v) => v.id !== value.id)
      : [...selectedValues, value];

    setSelectedValues(newSelectedValues);
    setUserCategory(newSelectedValues);
  }

  if(isLoadingProd){
    return <span>Cargando ...</span>
  }

  return (
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
              categoriesProd.find((fw) => fw.id === value.id)?.description
            ).join(", ")
            : "Seleccione las categorias ..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 max-h-min overflow-auto">
        <Command>
          <CommandInput placeholder="Buscar categorias..." />
          <CommandList>
            <CommandEmpty>Categoria no encontrada.</CommandEmpty>
            <CommandGroup>
              {categoriesProd.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.description}
                  onSelect={() => handleToggleOption({
                    id: category.id,
                    description: category.description
                  })}
                >
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 mr-2"
                      checked={selectedValues.some((v) => v.id === category.id)}
                    />
                    {category.description}
                  </label>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}