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

    const { user, setUser, loading, setLoading } = useAuthStore((state) => ({
        user: state.user,
        loading: state.loading,
        setLoading: state.setLoading,
        setUser: state.setUser,
    }));

    useEffect(() => {
        const fetchUser = () => {
            const userString = Cookie.get('user');
            if (!userString) {
                setUser(null);
                setLoading(false);
                return;
            }
            const userData = JSON.parse(userString);
            setUser(userData);
            setLoading(false);
        };

        fetchUser();
    }, [setUser, setLoading]);


    if (!user && !loading) {
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

    if (loading) {
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
                    name: user?.user.name!,
                    email: user?.user.email!,
                }}
            />
        </>
    );
};
