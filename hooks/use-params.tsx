"use client"

import { useParams } from "next/navigation";

export function useParamsClient() {
    const { subdomain } = useParams();

    return {
        subdomain
    }
}
