"use client";
import { theme } from '@/config/theme';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextProps {
    menuColor: string;
    topMenuColor: string;
    setMenuColor: (color: string) => void;
    setTopMenuColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProviderPos = ({ children }: { children: ReactNode }) => {
    const [menuColor, setMenuColor] = useState(theme.colors.defaultAccentBackground );
    const [topMenuColor, setTopMenuColor] = useState('#fff');

    return (
        <ThemeContext.Provider value={{ menuColor, topMenuColor, setMenuColor, setTopMenuColor }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeLocal = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
