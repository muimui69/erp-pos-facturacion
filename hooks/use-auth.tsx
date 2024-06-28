"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/provider/ReactQueryClient';
import { patchPasswordTenantUser, postSigninTenantUser, postSigninUser, postSingupUser } from '@/lib/queries/auth';
import { PacthPasswordUserTenant, PostUserSigninParams } from '@/lib/queries/interfaces/auth.interface';

export function useAuth() {
    const queryKeyName = 'auth';

    const signinUserMutation = useMutation({
        mutationFn: postSigninUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })


    const signinTenantUserMutation = useMutation({
        mutationFn: async ({ user, subdomain }: { subdomain: string, user: PostUserSigninParams }) => {
            return postSigninTenantUser(user, subdomain);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })


    const signupUserMutation = useMutation({
        mutationFn: postSingupUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })


    const patchPasswordTenantUserMutation = useMutation({
        mutationFn: async ({ password, subdomain, serviceToken }: { subdomain: string, serviceToken: string, password: PacthPasswordUserTenant }) => {
            return patchPasswordTenantUser(subdomain, serviceToken, password);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })


    return {
        signinUser: signinUserMutation,
        signinTenantUser: signinTenantUserMutation,
        signupUser: signupUserMutation,
        patchPasswordTenantUser: patchPasswordTenantUserMutation
    };
}
