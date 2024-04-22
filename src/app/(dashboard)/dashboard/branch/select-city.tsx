"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCitys } from "@/hooks/use-city";
import { Dispatch, SetStateAction } from "react";

interface SelectBranchProps {
  setUserCity: Dispatch<SetStateAction<{ idCity: string; }>>;
}

export default function SelectCity({ setUserCity }: SelectBranchProps) {
  const { citys, isLoading, isError } = useCitys();

  const handleSelectBranch = (value: string) => {
    setUserCity({ idCity: value })
  };

  return (
    <Select onValueChange={handleSelectBranch}>
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Selecciona una sucursal" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {citys.map(({ id, name }) => (
            <SelectItem key={id} value={id.toString()}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

