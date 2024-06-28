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
import { useBranchs } from "@/hooks/use-branch"

interface Branchs {
  id: number;
  name: string;
}

interface SelectBranchProps {
  setUserBranch: Dispatch<SetStateAction<Branchs>>;
}


export function SelectBranch({ setUserBranch }: SelectBranchProps) {
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<Branchs>()

  const { subdomain, user } = useParamsClient();
  const { branchs, isLoading } = useBranchs(subdomain as never, user?.token);

  const handleToggleOption = (branch: Branchs) => {
    setSelectedValue({
      id: branch.id,
      name: branch.name
    });
    setUserBranch({
      id: branch.id,
      name: branch.name
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
            <CommandEmpty>No se encontro la sucursal.</CommandEmpty>
            <CommandGroup>
              {branchs.map((branch) => (
                <CommandItem
                  key={branch.id}
                  value={branch.name}
                  onSelect={() => handleToggleOption({
                    id: branch.id,
                    name: branch.name
                  })}
                >
                  {branch.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}