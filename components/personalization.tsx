"use client";
import { useState } from 'react';
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { SliderPicker } from 'react-color';
import { Button } from './ui/button';
import { dashboardConfig } from '@/config/dashboard';
import { MainNav } from './main-nav';
import { UserAvatar } from './user-avatar';
import { useThemeLocal } from '@/context/theme-context';  // Importa el contexto
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { PcCaseIcon } from 'lucide-react';

export const PersonalizationBody = () => {
    const { setTheme } = useTheme()
    const { menuColor, setMenuColor, topMenuColor, setTopMenuColor } = useThemeLocal();
    const [tempMenuColor, setTempMenuColor] = useState(menuColor);
    const [tempTopMenuColor, setTempTopMenuColor] = useState(topMenuColor);

    const applyChangesMenuColor = () => {
        setMenuColor(tempMenuColor);
        localStorage.setItem('menuColor', tempMenuColor);
    };

    const applyChangesTopMenuColor = () => {
        setTopMenuColor(tempTopMenuColor);
        localStorage.setItem('topMenuColor', tempTopMenuColor);
    };


    return (
        <>
            {/* <p className="px-2 mt-5 scroll-m-20  pb-1 text-3xl font-semibold tracking-tight first:mt-0">
                Menu lateral
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="px-2">
                    <span
                        className={cn(
                            "group flex items-center rounded-md px-3 py-5 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                            !tempMenuColor ? "bg-accent" : ""
                        )}
                        style={{ backgroundColor: tempMenuColor }}
                    >
                        <Icons.brush className="md:lg:mr-5 ml-4 h-6 w-6" />
                        <span className="block capitalize text-xl">opcion de menu</span>
                    </span>
                </div>

                <div className="px-2 p-2">
                    <SliderPicker
                        color={tempMenuColor}
                        onChangeComplete={newColor => setTempMenuColor(newColor.hex)}
                    />
                </div>
            </div>

            <div className="flex px-2 justify-end ">
                <Button
                    className="px-4 py-2  rounded-md"
                    onClick={() => applyChangesMenuColor()}
                    variant="outline"
                >
                    Aplicar cambios
                </Button>
            </div>

            <p className="px-2 mt-5 scroll-m-20  pb-1 text-3xl font-semibold tracking-tight first:mt-0">
                Menu superior
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
                <header
                    className={cn("sticky top-0 z-40 border-b",
                        !tempTopMenuColor ? "" : ""
                    )}
                    style={{ backgroundColor: tempTopMenuColor }}
                >
                    <div className="container flex h-16 items-center justify-between py-4">
                        <MainNav items={dashboardConfig.mainNav} />
                        <UserAvatar
                            user={{ name: "example" }}
                            className="h-8 w-8"
                        />
                    </div>
                </header>
                <div className="px-2 p-2">
                    <SliderPicker
                        color={tempTopMenuColor}
                        onChangeComplete={newColor => setTempTopMenuColor(newColor.hex)}
                    />
                </div>
            </div>
            <div className="flex px-2 justify-end ">
                <Button
                    className="px-4 py-2  rounded-md"
                    onClick={() => applyChangesTopMenuColor()}
                    variant="outline"
                >
                    Aplicar cambios
                </Button>
            </div> */}

            <p className="px-2 mt-5 scroll-m-20  pb-1 text-3xl font-semibold tracking-tight first:mt-0">
                Seleccionar tema global
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
                <button className="group relative flex justify-between items-center rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg text-xl font-semibold tracking-tight"
                    onClick={() => setTheme("light")}
                >
                    Modo claro
                    <SunIcon className="h-[2rem] w-[2rem]  " />
                </button>
                <button className="group relative flex justify-between items-center rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg text-xl font-semibold tracking-tight"
                    onClick={() => setTheme("dark")}
                >
                    Modo oscuro
                    <MoonIcon className="h-[2rem] w-[2rem]" />
                </button>

                <button className="group relative flex justify-between items-center rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg text-xl font-semibold tracking-tight"
                    onClick={() => setTheme("system")}
                >
                    Tema del sistema
                    <PcCaseIcon className="h-[2rem] w-[2rem]" />
                </button>
            </div>
        </>
    );
};
