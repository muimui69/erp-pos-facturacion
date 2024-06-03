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
  setRol: Dispatch<SetStateAction<{ idRol: string; }>>;
}

export default function SelectRoles({ setRol }: SelectBranchProps) {
  const { branchs, isLoading, isError } = useBranchs(); //pero para roles

  const handleSelectBranch = (value: string) => {
    setRol({ idRol: value })
  };


  const roles = [
    { id: 1, name: "Administrador" },
    { id: 2, name: "Usuario Regular" },
    { id: 3, name: "Invitado" },
    
    // Agrega más roles según sea necesario
];

  return (
    <Select onValueChange={handleSelectBranch}>
    
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Selecciona una sucursal" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {roles.map(({ id, name }) => (
            <SelectItem key={id} value={id.toString()}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

