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
const roles = [
    { id: 1, name: "Administrador" },
    { id: 2, name: "Gerente" },
    { id: 3, name: "Supervisor" },
    { id: 4, name: "Empleado" },
    // Puedes añadir más roles según sea necesario
  ];
export default function SelectRol({ setRol }: SelectBranchProps) {
//   const { branchs, isLoading, isError } = useBranchs();

  const handleSelectBranch = (value: string) => {
    setRol({ idRol: value })
  };

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

