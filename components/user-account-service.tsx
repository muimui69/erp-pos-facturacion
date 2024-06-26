"use client";

import Cookie from 'js-cookie';
import { UserAccountNav } from "@/components/user-account-nav";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { useAuthStore } from "@/context/auth-store";
import { useEffect } from "react";

export const UserAccountService = () => {

    const { userTenant, setUserTenant, loadingUserTenant, setLoadingUserTenant } = useAuthStore((state) => ({
        userTenant: state.userTenant,
        loadingUserTenant: state.loadingUserTenant,
        setLoadingUserTenant: state.setLoadingUserTenant,
        setUserTenant: state.setUserTenant,
    }));
    

    useEffect(() => {
        const fetchUser = () => {
            // const userString = Cookie.get('user');
            const userString = Cookie.get('tenant-user');

            if (!userString) {
                setUserTenant(null);
                setLoadingUserTenant(false);
                return;
            }
            const userData = JSON.parse(userString);
            setUserTenant(userData);
            setLoadingUserTenant(false);
        };

        fetchUser();
    }, [setUserTenant, setLoadingUserTenant]);


    if (!userTenant && !loadingUserTenant) {
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
        );
    }

    if (loadingUserTenant) {
        return (
            <>
                <div className="flex-1">
                    {""}
                </div>
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-9 w-9 rounded-full" />
                </div>
            </>
        )
    }

    return (
        <>
            <div className="flex-1">
                {""}
            </div>
            <UserAccountNav
                user={{
                    name: userTenant?.name!,
                    email: userTenant?.email!,
                }}
            />
        </>
    );
};
