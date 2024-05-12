"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBranchs } from '@/hooks/use-branch';
import { Dispatch, SetStateAction } from "react";

interface SelectBranchProps {
  setUserBranch: Dispatch<SetStateAction<{ idBranch: string; }>>;
}

export default function SelectBranch({ setUserBranch }: SelectBranchProps) {
  const { branchs, isLoading, isError } = useBranchs();

  const handleSelectBranch = (value: string) => {
    setUserBranch({ idBranch: value })
  };

  return (
    <Select onValueChange={handleSelectBranch}>
    
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Selecciona una sucursal" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {branchs.map(({ id, name }) => (
            <SelectItem key={id} value={id.toString()}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

