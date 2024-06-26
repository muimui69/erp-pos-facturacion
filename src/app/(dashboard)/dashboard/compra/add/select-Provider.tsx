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

const providers = [
  {
    value: "f5019355-bc15-43d5-b338-2d4363f93d5a",
    label: "Provider 1",
  },
  {
    value: "another-provider-id",
    label: "Provider 2",
  },
]

export function SelectProvider({ value, onChange }) {
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
          {value ? providers.find((p) => p.value === value)?.label : "Select provider..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 max-h-[200px] overflow-auto">
        <Command>
          <CommandInput placeholder="Search providers..." />
          <CommandList>
            <CommandEmpty>No providers found.</CommandEmpty>
            <CommandGroup>
              {providers.map((provider) => (
                <CommandItem
                  key={provider.value}
                  value={provider.value}
                  onSelect={() => {
                    onChange(provider.value)
                    setOpen(false)
                  }}
                >
                  {provider.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
