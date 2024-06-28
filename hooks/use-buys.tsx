"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/provider/ReactQueryClient';
import { getAllBuys, postCreateBuy } from '@/lib/queries/buys';
import { PostBuyParams, RangeDate } from '@/lib/queries/interfaces/buys';

export function useBuys(subdomain?: string, serviceToken?: string, rangeDate?: RangeDate) {
    const queryKeyName = 'buys';

    const { data: buys, isLoading, isError } = useQuery({
        queryKey: [queryKeyName, subdomain, serviceToken],
        queryFn: () => getAllBuys(serviceToken as never, subdomain as never, rangeDate as never),
        enabled: !!serviceToken && !!subdomain && !!rangeDate
    });

    const createBuyMutation = useMutation({
        mutationFn: async ({ subdomain, buy, serviceToken }: { subdomain: string, serviceToken: string, buy: PostBuyParams }) => {
            return postCreateBuy(subdomain, serviceToken, buy);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    // const deleteCategoryMutation = useMutation({
    //     mutationFn: async ({ subdomain, id, serviceToken }: { subdomain: string, serviceToken: string, id: string }) => {
    //         return deleteCategoryById(subdomain, serviceToken, id);
    //     },

    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: [queryKeyName] });
    //     },
    // })

    // const patchCategoryMutation = useMutation({
    //     mutationFn: async ({ subdomain, id, category }: { subdomain: string, id: string, category: PatchCategoryParams }) => {
    //         return patchCategoryById(subdomain, id, category);
    //     },
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: [queryKeyName] });
    //     },
    // })


    return {
        buys: buys?.data?.data.buys || [],
        isLoading,
        isError,
        createBuy: createBuyMutation,
        // deleteCategory: deleteCategoryMutation,
        // patchCategory: patchCategoryMutation
    };
}
