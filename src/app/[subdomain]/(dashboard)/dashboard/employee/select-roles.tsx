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
import { useParamsClient } from "@/hooks/use-params";
import { useRols } from "@/hooks/use-rol";
import { AllUser } from "@/lib/queries/interfaces/employee.interface";
import { Dispatch, SetStateAction } from "react";

interface SelectBranchProps {
  setRol: Dispatch<SetStateAction<{ idRol: string; }>>;
  data: AllUser
}

export default function SelectRoles({ data, setRol }: SelectBranchProps) {

  const { subdomain, user } = useParamsClient();
  const { rols, isLoadingRols } = useRols(subdomain as never, user?.token);

  const handleSelectBranch = (value: string) => {
    setRol({ idRol: value })
  };

  if (isLoadingRols) {
    return <span>Cargando ...</span>
  }

  return (
    <Select onValueChange={handleSelectBranch} defaultValue={data.rol.id.toString()} >

      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Selecciona un rol" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {rols?.map(({ id, desc }) => (
            <SelectItem className="capitalize" key={id} value={id?.toString()}>
              {desc}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
