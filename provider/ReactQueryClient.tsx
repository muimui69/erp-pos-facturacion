'use client'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const queryClient = new QueryClient();

export default function ProviderUseReactQuery({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <>{children}</>
        </QueryClientProvider>
    );
}