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
  setUserCategory: Dispatch<SetStateAction<{ idCategory: string; }>>;
}

const category=[
    {
        id:1,
        name:"lacteos"

    },{
        id:2,
        name:"Chocolates"
    }
]
export default function SelectCategory({ setUserCategory }: SelectBranchProps) {
//   const { citys, isLoading, isError } = useCitys();   //Consumo de UseCategory

  const handleSelectCategory = (value: string) => {
    setUserCategory({ idCategory: value })
  };

  return (
    <Select onValueChange={handleSelectCategory}>
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Selecciona una Categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {category.map(({ id, name }) => (
            <SelectItem key={id} value={id.toString()}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
