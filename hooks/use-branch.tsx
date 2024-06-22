"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteBranchId, getAllBranchs, patchBranchById, postCreateBranch } from '@/lib/queries/branch-office';
import { queryClient } from '@/provider/ReactQueryClient';
import { PatchBranchParams, PostBranchParams } from '@/lib/queries/interfaces/branch.interface';

export function useBranchs(subdomain?: string, serviceToken?: string) {
    const queryKeyName = 'branchs';

    const { data: branchs, isLoading, isError } = useQuery({
        queryKey: [queryKeyName],
        queryFn: () => getAllBranchs(serviceToken as never, subdomain as never),
        enabled: !!serviceToken
    });

    const createBranchMutation = useMutation({
        mutationFn: async ({ subdomain, branch, serviceToken }: { subdomain: string, serviceToken: string, branch: PostBranchParams }) => {
            return postCreateBranch(subdomain, serviceToken, branch);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    const deleteBranchMutation = useMutation({
        mutationFn: async ({ subdomain, id, serviceToken }: { subdomain: string, serviceToken: string, id: string }) => {
            return deleteBranchId(subdomain, serviceToken, id);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    const patchBranchMutation = useMutation({
        mutationFn: async ({ subdomain, id, branch, serviceToken }: { subdomain: string, serviceToken: string, id: string, branch: PatchBranchParams }) => {
            return patchBranchById(subdomain, serviceToken, id, branch);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })


    return {
        branchs: branchs?.data?.data.branchs || [],
        isLoading,
        isError,
        createBranch: createBranchMutation,
        deleteBranch: deleteBranchMutation,
        patchBranch: patchBranchMutation
    };
}
