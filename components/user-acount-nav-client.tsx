"use client";

import { useEffect, useState } from "react";
import { UserAccountNav } from "@/components/user-account-nav";
import { Data } from "@/lib/queries/interfaces/auth.interface";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Cookie from 'js-cookie';
import Link from "next/link";

export const UserAccountNavClient = () => {
    const [user, setUser] = useState<Data>();

    useEffect(() => {
        const fetchUser = () => {
            const userString = Cookie.get('user');
            if (!userString) return;
            const userData = JSON.parse(userString) as Data;
            setUser(userData);
        };
        fetchUser()
    }, []);

    if (!user) {
        return (
            <nav>
                <Link
                    href="/login"
                    className={cn(
                        buttonVariants({ variant: "secondary", size: "sm" }),
                        "text-lg px-4 py-2 rounded-md"
                    )}
                >
                    Iniciar sesión
                </Link>
            </nav>
        )
    }

    return (
        <UserAccountNav
            user={{
                name: user.user.name,
                email: user.user.email,
            }}
        />
    );

}
