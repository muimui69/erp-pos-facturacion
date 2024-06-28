"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/provider/ReactQueryClient';
import { deleteCategoryById, getAllCategories, getAllCategoriesProd, patchCategoryById, postCreateCategory } from '@/lib/queries/category';
import { PatchCategoryParams, PostCategoryParams } from '@/lib/queries/interfaces/category.interface';

export function useCategories(subdomain?: string, serviceToken?: string) {
    const queryKeyName = 'categories';

    const { data: categories, isLoading, isError } = useQuery({
        queryKey: [queryKeyName, subdomain, serviceToken],
        queryFn: () => getAllCategories(serviceToken as never, subdomain as never),
        enabled:!!serviceToken
    });
    
    const { data: categoriesProd, isLoading:isLoadingProd, isError:isErrorProd } = useQuery({
        queryKey: [queryKeyName, subdomain, serviceToken],
        queryFn: () => getAllCategoriesProd(serviceToken as never, subdomain as never),
        enabled:!!serviceToken
    });


    const createCategoryMutation = useMutation({
        mutationFn: async ({ subdomain, category, serviceToken }: { subdomain: string, serviceToken: string, category: PostCategoryParams }) => {
            return postCreateCategory(subdomain, serviceToken, category);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    const deleteCategoryMutation = useMutation({
        mutationFn: async ({ subdomain, id, serviceToken }: { subdomain: string, serviceToken: string, id: string }) => {
            return deleteCategoryById(subdomain, serviceToken, id);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    const patchCategoryMutation = useMutation({
        mutationFn: async ({ subdomain, id, category }: { subdomain: string, id: string, category: PatchCategoryParams }) => {
            return patchCategoryById(subdomain, id, category);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })


    return {
        categories: categories?.data?.data.allCategories || [],
        isLoading,
        isError,
        createCategory: createCategoryMutation,
        deleteCategory: deleteCategoryMutation,
        patchCategory: patchCategoryMutation,
        categoriesProd:categoriesProd?.data.data.allCategories || [],
        isLoadingProd,
        isErrorProd
    };
}
