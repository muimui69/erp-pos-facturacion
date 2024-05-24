"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllTenantsUser } from '@/lib/queries/tenant';
import { queryClient } from '@/provider/ReactQueryClient';

export function useBranchs() {
    const queryKeyName = 'tenants';

    const { data: tenants, isLoading, isError } = useQuery({
        queryKey: [queryKeyName],
        // queryFn: async (token: string) => getAllTenantsUser(token)
    });



    // return {
    //     branchs: tenants?.data?.allTenants || [],
    //     isLoading,
    //     isError,
    // };
}
