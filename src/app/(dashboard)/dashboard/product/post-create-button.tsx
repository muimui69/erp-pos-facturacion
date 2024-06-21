"use client";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useState } from "react";

interface PostCreateButtonProps extends ButtonProps {}

export function PostCreateButtonProduct({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = () => {
    if (!isLoading) {
      window.location.href = "/dashboard/product/add";
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      Nuevo Producto
    </button>
  );
}
