"use client"

import { useParamsClient } from "@/hooks/use-params"
import { useProviders } from "@/hooks/use-provider";
import { CardCustomSkeleton } from "./card-custom-skeleton";
import { CardCustom } from "./card";
import { useEffect, useState } from "react";
import { useEmployees } from "@/hooks/use-employee";

export default function CardTotalEmployeesDashboard() {

    const { subdomain, user } = useParamsClient();
    const { total } = useEmployees(subdomain as never, user?.token!);
    const [totalS, setTotal] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTotal(total.toString());
        setLoading(false);
    }, [setTotal, setLoading]);


    if (loading) {
        return <CardCustomSkeleton />
    }

    return (
        <CardCustom
            title="Empleados"
            description="Numero total de empleados en el sistema."
            value={total.toString()}
            nameIcon="user"
        />
    )
}
