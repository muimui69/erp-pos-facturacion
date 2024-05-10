"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/provider/ReactQueryClient';
import { postSigninUser } from '@/lib/queries/auth';

export function useAuth() {
    const queryKeyName = 'auth';

    const signinUserMutation = useMutation({
        mutationFn: postSigninUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })


    return {
        signinUser: signinUserMutation,
        // patchBranch: patchBranchMutation
    };
}
