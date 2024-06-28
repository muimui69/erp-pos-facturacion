"use client";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";

interface PostCreateButtonProps extends ButtonProps { }

export function PostCreateButtonBuy({
    className,
    variant,
    ...props
}: PostCreateButtonProps) {

    const navigate = useRouter();

    const handleClick = () => {
        navigate.push("/dashboard/buy/add")
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={cn(
                buttonVariants({ variant }),
                className
            )}
            {...props}
        >
            <Icons.add className="mr-2 h-4 w-4" />
            Crear una nueva Entrada de Nota
        </button>
    );
}