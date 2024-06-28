"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/provider/ReactQueryClient';
import { getAllBuys, getProductForBuysById, postCreateBuy } from '@/lib/queries/buys';
import { PostBuyParams, RangeDate } from '@/lib/queries/interfaces/buys';

export function useBuys(subdomain?: string, serviceToken?: string, rangeDate?: RangeDate,id?:string,search?:string) {
    const queryKeyName = 'buys';

    const { data: buys, isLoading, isError } = useQuery({
        queryKey: [queryKeyName, subdomain, serviceToken],
        queryFn: () => getAllBuys(serviceToken as never, subdomain as never, rangeDate as never),
        enabled: !!serviceToken && !!subdomain && !!rangeDate
    });

    const { data: productForBuys, isLoading:isLoadingProductForBuys, isError:isErrorProductForBuys } = useQuery({
        queryKey: [queryKeyName, subdomain, serviceToken,id,search],
        queryFn: () => getProductForBuysById(serviceToken as never, subdomain as never, id as never,search as never),
        enabled: !!serviceToken && !!subdomain && !!id && !!search
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
        productForBuys:productForBuys?.data.product || {},
        isLoadingProductForBuys,
        isErrorProductForBuys
        // deleteCategory: deleteCategoryMutation,
        // patchCategory: patchCategoryMutation
    };
}
