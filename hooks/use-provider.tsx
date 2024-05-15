"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/provider/ReactQueryClient';
import { deleteProviderById, getAllProviders, patchProviderById, postCreateProvider } from '@/lib/queries/provider';
import { PatchProviderParams, PostProviderParams } from '@/lib/queries/interfaces/provider.intreface';

export function useProviders(subdomain?: string) {
    const queryKeyName = 'providers';

    const { data: providers, isLoading, isError } = useQuery({
        queryKey: [queryKeyName, subdomain],
        queryFn: async () => getAllProviders(subdomain as never)
    });


    const createProviderMutation = useMutation({
        mutationFn: async ({ subdomain, provider }: { subdomain: string, provider: PostProviderParams }) => {
            return postCreateProvider(subdomain, provider);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    const deleteProviderMutation = useMutation({
        mutationFn: async ({ subdomain, id }: { subdomain: string, id: string }) => {
            return deleteProviderById(subdomain, id);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    const patchProviderMutation = useMutation({
        mutationFn: async ({ subdomain, id, provider }: { subdomain: string, id: string, provider: PatchProviderParams }) => {
            return patchProviderById(subdomain, id, provider);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })


    return {
        providers: providers?.data?.data.allProviders || [],
        isLoading,
        isError,
        createProvider: createProviderMutation,
        deleteProvider: deleteProviderMutation,
        patchProvider: patchProviderMutation
    };
}
