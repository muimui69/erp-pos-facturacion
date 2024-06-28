"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/provider/ReactQueryClient';
import { getBranchsInNotProduct } from '@/lib/queries/product';

export function useStocksSection(subdomain?: string, serviceToken?: string, id?: string) {
    const queryKeyName = 'products';

    const { data: branchsNotInProductTest, isLoading: isLoadingBranchInNotProduct, isError: isErrorBranchNotInProduct } = useQuery({
        queryKey: [queryKeyName, subdomain, serviceToken, id],
        queryFn: async () => getBranchsInNotProduct(subdomain as never, serviceToken as never, id as never),
        enabled: !!subdomain && !!serviceToken && !!id
    });


    return {
        branchsNotInProductTest: branchsNotInProductTest?.data?.branchs || [],
        isLoadingBranchInNotProduct,
        isErrorBranchNotInProduct
    };
}
