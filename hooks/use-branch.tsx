"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteBranchId, getAllBranchs, postCreateBranch } from '@/lib/queries/branch-office';
import { queryClient } from '@/provider/ReactQueryClient';

export function useBranchs() {
    const queryKeyName = 'branchs';

    const { data: branchs, isLoading, isError } = useQuery({
        queryKey: [queryKeyName],
        queryFn: getAllBranchs
    });

    const createBranchMutation = useMutation({
        mutationFn: postCreateBranch,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    const deleteBranchMutation = useMutation({
        mutationFn: deleteBranchId,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    const patchBranchMutation = useMutation({
        // mutationFn: patchBranchId,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })


    return {
        branchs: branchs?.data?.branchs || [],
        isLoading,
        isError,
        createBranch: createBranchMutation,
        deleteBranch: deleteBranchMutation,
        patchBranch: patchBranchMutation
    };
}
