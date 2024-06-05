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
import { Dispatch, SetStateAction } from "react";

interface SelectBranchProps {
  setRol: Dispatch<SetStateAction<{ idRol: string; }>>;
}

export default function SelectRoles({ setRol }: SelectBranchProps) {

  const { subdomain, user } = useParamsClient();
  const { rols, isLoadingRols } = useRols(subdomain as never, user?.token);

  const handleSelectBranch = (value: string) => {
    setRol({ idRol: value })
  };

  return (
    <Select onValueChange={handleSelectBranch}>

      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Selecciona un rol" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {rols?.map(({ id, desc }) => (
            <SelectItem className="capitalize" key={id} value={id.toString()}>
              {desc}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
