"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/provider/ReactQueryClient';
import { deleteProductById, getAllProducts, getBranchsInProduct, getProductById, patchProductById, postCreateBranchProduct, postCreateProduct } from '@/lib/queries/product';

export function useProducts(subdomain?: string, serviceToken?: string, id?: string) {
    const queryKeyName = 'products';

    const { data: products, isLoading, isError } = useQuery({
        queryKey: [queryKeyName, subdomain, serviceToken],
        queryFn: async () => getAllProducts(subdomain as never, serviceToken as never),
        enabled: !!subdomain && !!serviceToken
    });

    const { data: productId, isLoading: isLoadingProductId, isError: isErrorProductId } = useQuery({
        queryKey: [queryKeyName, subdomain, serviceToken, id],
        queryFn: async () => getProductById(subdomain as never, serviceToken as never, id as never),
        enabled: !!subdomain && !!serviceToken && !!id
    });

    // const { data: branchsInProduct, isLoading: isLoadingBranchInProduct, isError: isErrorBranchInProduct } = useQuery({
    //     queryKey: [queryKeyName, subdomain, serviceToken, id],
    //     queryFn: async () => getBranchsInProduct(subdomain as never, serviceToken as never, id as never),
    //     enabled: !!subdomain && !!serviceToken && !!id
    // });


    const createProductMutation = useMutation({
        mutationFn: async ({ subdomain, serviceToken, formData }: { subdomain: string, serviceToken: string, formData: FormData }) => {
            return postCreateProduct(subdomain, serviceToken, formData);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    // const createBranchProductMutation = useMutation({
    //     mutationFn: async ({ subdomain, serviceToken, branchIds, id }: { subdomain: string, serviceToken: string, branchIds: number[], id: string }) => {
    //         return postCreateBranchProduct(subdomain, serviceToken, branchIds, id);
    //     },

    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: [queryKeyName] });
    //     },
    // })

    const deleteProductMutation = useMutation({
        mutationFn: async ({ subdomain, id }: { subdomain: string, id: string }) => {
            return deleteProductById(subdomain, id);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    const patchProductMutation = useMutation({
        mutationFn: async ({ subdomain, serviceToken, formData, id, }: { subdomain: string, serviceToken: string, id: string, formData: FormData }) => {
            return patchProductById(subdomain, serviceToken, formData, id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })


    return {
        products: products?.data?.allProducts || [],
        // branchsInProduct: branchsInProduct?.data?.stock?.inventorys || [],
        isLoading,
        isError,
        createProduct: createProductMutation,
        deleteProduct: deleteProductMutation,
        patchProduct: patchProductMutation,
        productId,
        isLoadingProductId,
        isErrorProductId,
        // isLoadingBranchInProduct,
        // isErrorBranchInProduct,
        // createBranchProduct:createBranchProductMutation
    };
}
