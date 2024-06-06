import { create } from 'zustand';

interface MenuState {
    isMenuExpanded: boolean;
    toggleMenu: () => void;
}

export const useMenuStore = create<MenuState>((set) => ({
    isMenuExpanded: false,
    toggleMenu: () => set((state) => ({ isMenuExpanded: !state.isMenuExpanded })),
}));
