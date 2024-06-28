"use client"

import { useParamsClient } from "@/hooks/use-params"
import { useProviders } from "@/hooks/use-provider";
import { CardCustomSkeleton } from "./card-custom-skeleton";
import { CardCustom } from "./card";
import { useEffect, useState } from "react";

export default function CardTotalBuysDashboard() {

    // const { subdomain, user } = useParamsClient();
    // const { total } = useProviders(subdomain as never, user?.token!);
    const [totalS, setTotal] = useState("");
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    // setTotal(total.toString());
    // setLoading(false);
    // }, [setTotal, setLoading]);


    // if (loading) {
    // return <CardCustomSkeleton />
    // }

    return (
        <CardCustom
            title="Compras"
            description="Monto total de compras realizadas."
            value="0"
            nameIcon="shoppingCart"
        />
    )
}
