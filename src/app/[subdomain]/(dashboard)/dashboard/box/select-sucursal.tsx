"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBranchs } from "@/hooks/use-branch";
import { useParamsClient } from "@/hooks/use-params";

import { Dispatch, SetStateAction } from "react";

interface SelectBranchProps {
  setUserBranch: Dispatch<SetStateAction<{ idBranch: string; }>>;
}

export default function SelectSucursal({ setUserBranch }: SelectBranchProps) {
  const { subdomain, user } = useParamsClient();
  const { branchsAtm, isLoadingBranchsAtm } = useBranchs(subdomain as never, user?.token);

  const handleSelectBranch = (value: string) => {
    setUserBranch({ idBranch: value })
  };

  if (isLoadingBranchsAtm) {
    return <span>Cargando ...</span>
  }

  return (
    <Select onValueChange={handleSelectBranch}>
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Selecciona una sucursal" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {branchsAtm.map(({ id, name }) => (
            <SelectItem key={id} value={id.toString()}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

