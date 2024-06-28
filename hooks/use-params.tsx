"use client"

import { useParams } from "next/navigation";
import Cookie from 'js-cookie';
import { useEffect, useState } from "react";

export function useParamsClient() {
    const { subdomain } = useParams();
    // const [user, setUser] = useState<Data>();
    const [user, setUserToken] = useState<{ token: string }>({
        token: ""
    });

    useEffect(() => {
        const fetchUser = () => {
            // const userString = Cookie.get('user') ;
            const userString = Cookie.get('tenant-user-token');
            if (!userString) return;
            // const userData = JSON.parse(userString) as Data;
            const userData = JSON.parse(userString);

            let test = {
                "token": userData
            }
            setUserToken(test);
        };
        fetchUser()
    }, []);

    return {
        subdomain,
        user
    }
}
