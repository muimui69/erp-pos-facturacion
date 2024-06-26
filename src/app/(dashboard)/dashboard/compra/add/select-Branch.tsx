"use client"

import * as React from "react"
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

const branches = [
  {
    value: "1",
    label: "Branch 1",
  },
  {
    value: "2",
    label: "Branch 2",
  },
  {
    value: "3",
    label: "Branch 3",
  },
]

export function SelectBranch({ value, onChange }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? branches.find((b) => b.value === value)?.label : "Select branch..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 max-h-[200px] overflow-auto">
        <Command>
          <CommandInput placeholder="Search branches..." />
          <CommandList>
            <CommandEmpty>No branches found.</CommandEmpty>
            <CommandGroup>
              {branches.map((branch) => (
                <CommandItem
                  key={branch.value}
                  value={branch.value}
                  onSelect={() => {
                    onChange(branch.value)
                    setOpen(false)
                  }}
                >
                  {branch.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
