"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCities } from "@/hooks/use-city";
import { useParamsClient } from "@/hooks/use-params";
import { Dispatch, SetStateAction } from "react";

interface SelectBranchProps {
  setUserCity: Dispatch<SetStateAction<{ idCity: string; }>>;
}

export default function SelectCity({ setUserCity }: SelectBranchProps) {
  const { subdomain, user } = useParamsClient();
  const { cities, isLoadingCities } = useCities(subdomain as never, user?.token);

  const handleSelectBranch = (value: string) => {
    setUserCity({ idCity: value })
  };

  return (
    <Select onValueChange={handleSelectBranch}>
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Selecciona una ciudad" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {cities.map(({ id, name }) => (
            <SelectItem key={id} value={id.toString()}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

