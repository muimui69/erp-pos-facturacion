"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllSuscriptions, postCreateSuscription } from '@/lib/queries/suscription';
import { queryClient } from '@/provider/ReactQueryClient';
import { PostSuscriptionParams } from '@/lib/queries/interfaces/suscription.interface';

export function useSuscriptions() {
    const queryKeyName = 'suscriptions';

    const { data: suscriptions, isLoading, isError } = useQuery({
        queryKey: [queryKeyName],
        queryFn: getAllSuscriptions
    });

    const createSuscriptionMutation = useMutation({
        mutationFn: async ({ token, suscription }: { token: string, suscription: PostSuscriptionParams }) => {
            return postCreateSuscription(token, suscription);
        },
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
        createSuscription: createSuscriptionMutation,
        deleteSucription: deleteSuscriptionMutation,
        patchSuscription: patchSuscriptionMutation
    };
}
