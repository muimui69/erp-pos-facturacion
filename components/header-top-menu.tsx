"use client"

import { useEffect, useState } from "react";
import { MainNav } from "./main-nav"
import { UserAccountNav } from "./user-account-nav"
import { Data } from "@/lib/queries/interfaces/auth.interface";
import Cookie from 'js-cookie';
import { dashboardConfig } from "@/config/dashboard";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";


export const HeaderTopMenu = () => {
    const [user, setUser] = useState<Data>();
    const { topMenuColor, setTopMenuColor } = useTheme()
    const savedTopMenuColor = localStorage.getItem('topMenuColor');

    useEffect(() => {
        const savedTopMenuColor = localStorage.getItem('topMenuColor');
        if (savedTopMenuColor) {
            setTopMenuColor(savedTopMenuColor);
        }
    }, []);

    useEffect(() => {
        const fetchUser = () => {
            const userString = Cookie.get('user');
            if (!userString) return;
            const userData = JSON.parse(userString) as Data;
            setUser(userData);
        };
        fetchUser()
    }, []);

    return (
        <>
            <header className={cn("sticky top-0 z-40 border-b ",
            )}
                style={{ backgroundColor: savedTopMenuColor ? topMenuColor : "bg-background" }}
            >
                <div className="container flex h-16 items-center justify-between py-4">
                    <MainNav items={dashboardConfig.mainNav} />
                    <UserAccountNav
                        user={{
                            name: user?.user.name!,
                            email: user?.user.email!,
                        }}
                    />
                </div>
            </header>
        </>
    )
}
