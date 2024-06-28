"use client"

import Cookie from 'js-cookie';
import { Data } from "@/lib/queries/interfaces/auth.interface";
import { useEffect, useState } from "react";

export function useParamsSaas() {
    const [user, setUser] = useState<Data>();

    useEffect(() => {
        const fetchUser = () => {
            const userString = Cookie.get('user') ;
            if (!userString) return;
            const userData = JSON.parse(userString) as Data;
            setUser(userData);
        };
        fetchUser()
    }, []);

    return {
        user
    }
}
