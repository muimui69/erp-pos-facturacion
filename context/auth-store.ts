import { Data, User } from '@/lib/queries/interfaces/auth.interface';
import { create } from 'zustand';

interface AuthState {
    user: Data | null;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    setUser: (user: Data | null) => void;
    login: (userData: Data) => void;
    logout: () => void;

    userTenant: User | null;
    setUserTenant: (user: User | null) => void;
    logoutTenant: () => void;
    setLoadingUserTenant: (loading: boolean) => void;
    loadingUserTenant: boolean;

}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    login: (userData) => set({ user: userData }),
    logout: () => set({ user: null }),
    setLoading: (loading) => set({ loading }),
    loading: true,

    userTenant: null,
    setUserTenant: (userTenant) => set({ userTenant }),
    logoutTenant: () => set({ userTenant: null }), 
    setLoadingUserTenant: (loadingUserTenant) => set({ loadingUserTenant }),
    loadingUserTenant: true, 

}));
