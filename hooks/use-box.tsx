"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/provider/ReactQueryClient';
import { deleteAtmById, getAllAtms, getAtmId, postCreateAtm } from '@/lib/queries/box';
import { PostAtmParams } from '@/lib/queries/interfaces/box.interface';

export function useBoxes(subdomain?: string, serviceToken?: string, id?: string) {
    const queryKeyName = 'boxes';

    const { data: atms, isLoading, isError } = useQuery({
        queryKey: [queryKeyName, subdomain, serviceToken],
        queryFn: () => getAllAtms(serviceToken as never, subdomain as never),
        enabled: !!serviceToken && !!subdomain
    });

    const { data: atmId, isLoading: IsLoadingAtmId, isError: isErrorAtmId } = useQuery({
        queryKey: [queryKeyName, subdomain, serviceToken, id],
        queryFn: () => getAtmId(serviceToken as never, subdomain as never, id as never),
        enabled: !!serviceToken && !!subdomain && !!id
    });


    const createAtmMutation = useMutation({
        mutationFn: async ({ subdomain, atm, serviceToken }: { subdomain: string, serviceToken: string, atm: PostAtmParams }) => {
            return postCreateAtm(serviceToken, subdomain, atm);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    const deleteAtmMutation = useMutation({
        mutationFn: async ({ subdomain, id, serviceToken }: { subdomain: string, serviceToken: string, id: string }) => {
            return deleteAtmById(subdomain, serviceToken, id);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    const patchAtmMutation = useMutation({
        // mutationFn: async ({ subdomain, id, category }: { subdomain: string, id: string, category: PatchCategoryParams }) => {
            // return patchCategoryById(subdomain, id, category);
        // },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })


    return {
        atms: atms?.data?.data.atms || [],
        isLoading,
        isError,
        atmId: atmId?.data.data.atm || [],
        IsLoadingAtmId,
        isErrorAtmId,
        createAtm: createAtmMutation,
        deleteAtm: deleteAtmMutation,
        patchAtm: patchAtmMutation
    };
}
