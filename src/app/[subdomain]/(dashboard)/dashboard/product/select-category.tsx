"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/use-category";
import { useParamsClient } from "@/hooks/use-params";
import { CategoriesProduct } from "@/lib/queries/interfaces/product.interface";
import { Dispatch, SetStateAction } from "react";

interface SelectBranchProps {
  setUserCategory: Dispatch<SetStateAction<CategoriesProduct>>;
}

export default function SelectCategory({ setUserCategory }: SelectBranchProps) {
  const { subdomain } = useParamsClient();
  const { categories } = useCategories(subdomain as never);

  const handleSelectCategory = (value: string) => {
    setUserCategory({ categories: [{ id: value }] }); 
  };

  return (
    <Select onValueChange={handleSelectCategory}>
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Selecciona una Categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories.map(({ id, description }) => (
            <SelectItem key={id} value={id.toString()}>
              {description}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
