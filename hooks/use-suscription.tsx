"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllSuscriptions } from '@/lib/queries/suscription';
import { queryClient } from '@/provider/ReactQueryClient';

export function useSuscriptions() {
    const queryKeyName = 'suscriptions';

    const { data: suscriptions, isLoading, isError } = useQuery({
        queryKey: [queryKeyName],
        queryFn: getAllSuscriptions
    });

    const createSuscriptionMutation = useMutation({
        // mutationFn: postCreateSuscription,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    const deleteSuscriptionMutation = useMutation({
        // mutationFn: deleteSuscriptionId,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    const patchSuscriptionMutation = useMutation({
        // mutationFn: patchSuscriptionId,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })


    return {
        suscriptions: suscriptions?.data?.allSuscription || [],
        isLoading,
        isError,
        createBranch: createSuscriptionMutation,
        deleteBranch: deleteSuscriptionMutation,
        patchBranch: patchSuscriptionMutation
    };
}
