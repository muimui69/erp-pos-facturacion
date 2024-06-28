"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/provider/ReactQueryClient';
import { deleteProductById, getAllProducts, getBranchsInProduct, getProductById, patchProductById, postCreateBranchProduct, postCreateProduct } from '@/lib/queries/product';
import { BranchIdsPayload } from '@/lib/queries/interfaces/product.interface';

export function useStocks(subdomain?: string, serviceToken?: string, id?: string) {
    const queryKeyName = 'products';

    const { data: branchsInProduct, isLoading: isLoadingBranchInProduct, isError: isErrorBranchInProduct } = useQuery({
        queryKey: [queryKeyName, subdomain, serviceToken, id],
        queryFn: async () => getBranchsInProduct(subdomain as never, serviceToken as never, id as never),
        enabled: !!subdomain && !!serviceToken && !!id
    });

    const createBranchProductMutation = useMutation({
        mutationFn: async ({ subdomain, serviceToken, branchIds, id }: { subdomain: string, serviceToken: string, branchIds: BranchIdsPayload, id: string }) => {
            return postCreateBranchProduct(subdomain, serviceToken, branchIds, id);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    return {
        branchsInProduct: branchsInProduct?.data?.stock?.inventorys || [],
        isLoadingBranchInProduct,
        isErrorBranchInProduct,
        createBranchProduct:createBranchProductMutation
    };
}
