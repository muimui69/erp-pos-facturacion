"use client"
import { useMemo } from "react";

const translationMap = {
    description: "Descripcion",
    status: "Estado",
    phone: "Telefono",
    name: "Nombre",
    email: "Correo",
    price: "Precio",
    discount: "descuento",
    categories: "Categorias",
    desc:"Descripcion",
    rol:"Rol",
    state: "Estado",
    address:"Direccion",
    city:"Ciudad",
    branch:"Sucursal",
};

export function useTranslation() {
    const translation = useMemo(() => translationMap, []);
    return {
        translation
    };
};
