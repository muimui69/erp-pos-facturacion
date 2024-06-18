import { Data } from '@/lib/queries/interfaces/auth.interface';
import { create } from 'zustand';

interface AuthState {
    user: Data | null;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    setUser: (user: Data | null) => void;
    login: (userData: Data) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    login: (userData) => set({ user: userData }),
    logout: () => set({ user: null }),
    setLoading: (loading) => set({ loading }),
    loading: true, 
}));
