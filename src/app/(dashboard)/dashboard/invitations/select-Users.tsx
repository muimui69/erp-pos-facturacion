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
  setUser: Dispatch<SetStateAction<{ idUser: string; }>>;
}

export default function SelectUser({ setUser }: SelectBranchProps) {
  const { branchs, isLoading, isError } = useBranchs(); //pero para usuario

  const handleSelectBranch = (value: string) => {
    setUser({ idUser: value })
  };
  const users = [
    { id: 1, name: "Juan" },
    { id: 2, name: "María" },
    { id: 3, name: "Pedro" },
    
    // Agrega más usuarios según sea necesario
];

  return (
    <Select onValueChange={handleSelectBranch}>
    
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Selecciona una sucursal" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {users.map(({ id, name }) => (
            <SelectItem key={id} value={id.toString()}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

