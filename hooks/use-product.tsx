"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/provider/ReactQueryClient';
import { deleteProductById, getAllProducts, patchProviderById, postCreateProduct } from '@/lib/queries/product';
import { PatchProductParams } from '@/lib/queries/interfaces/product.interface';

export function useProducts(subdomain?: string) {
    const queryKeyName = 'products';

    const { data: products, isLoading, isError } = useQuery({
        queryKey: [queryKeyName, subdomain],
        queryFn: async () => getAllProducts(subdomain as never)
    });

    const createProductMutation = useMutation({
        mutationFn: async ({ subdomain, formData }: { subdomain: string, formData: FormData }) => {
            return postCreateProduct(subdomain, formData);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    const deleteProductMutation = useMutation({
        mutationFn: async ({ subdomain, id }: { subdomain: string, id: string }) => {
            return deleteProductById(subdomain, id);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    const patchProductMutation = useMutation({
        mutationFn: async ({ subdomain, id, product }: { subdomain: string, id: string, product: PatchProductParams }) => {
            return patchProviderById(subdomain, id, product);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })


    return {
        products: products?.data?.allProducts || [],
        isLoading,
        isError,
        createProduct: createProductMutation,
        deleteProduct: deleteProductMutation,
        patchProduct: patchProductMutation
    };
}
