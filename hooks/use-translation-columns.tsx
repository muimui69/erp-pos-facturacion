"use client"
import { useMemo } from "react";

const translationMap = {
    description: "Descripcion",
    status:"Estado"
};

export function useTranslation() {
    const translation = useMemo(() => translationMap, []);
    return {
        translation
    };
};
