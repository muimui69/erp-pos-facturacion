"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/provider/ReactQueryClient';
import { deleteInvitationById, getAllInvitations, getInvitationById, getUserInvitation, patchAcceptInvitationById, patchResendInvitationById, postCreateInvitation } from '@/lib/queries/invitation';
import { PatchInvitationParams, PostInvitationParams } from '@/lib/queries/interfaces/invitation.interface';

export function useInvitations(subdomain?: string, serviceToken?: string, search?: string, id?: string, token?: string) {
    const queryKeyName = 'invitations';

    const { data: invitations, isLoading: isLoadingInvitations, isError: isErrorInvitations } = useQuery({
        queryKey: [queryKeyName, subdomain, serviceToken],
        queryFn: () => getAllInvitations(serviceToken as never, subdomain as never),
        enabled: !!serviceToken
    });


    const { data: userInvitations, isLoading: isLoadingUserInvitation, isError: isErrorUserInvitation } = useQuery({
        queryKey: [queryKeyName, subdomain, serviceToken, id],
        queryFn: () => getUserInvitation(serviceToken as never, subdomain as never, search as never),
        enabled: !!serviceToken && search != ''
    });

    const { data: invitationId, isLoading: isLoadingInvitationId, isError: isErrorInvitationId } = useQuery({
        queryKey: [queryKeyName, token, id],
        queryFn: () => getInvitationById(token as never, id as never),
        enabled: !!token && !!id
    });


    const createInvitationMutation = useMutation({
        mutationFn: async ({ subdomain, serviceToken, invitation }: { serviceToken: string, subdomain: string, invitation: PostInvitationParams }) => {
            return postCreateInvitation(serviceToken, subdomain, invitation);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    const deleteInvitationMutation = useMutation({
        mutationFn: async ({ serviceToken, subdomain, id }: { serviceToken: string, subdomain: string, id: string }) => {
            return deleteInvitationById(serviceToken, subdomain, id);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    const patchAcceptInvitationMutation = useMutation({
        mutationFn: async ({ token, subdomain, id, invitation }: { token: string, subdomain: string, id: string, invitation: PatchInvitationParams }) => {
            return patchAcceptInvitationById(token, subdomain, id, invitation);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    const patchResendInvitationMutation = useMutation({
        mutationFn: async ({ serviceToken, subdomain, id }: { serviceToken: string, subdomain: string, id: string }) => {
            return patchResendInvitationById(serviceToken, subdomain, id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })


    return {
        invitations: invitations?.data?.data.allInvitations || [],
        userInvitations: userInvitations?.data?.allUsers || [],
        isLoadingInvitations,
        isLoadingUserInvitation,
        isErrorInvitations,
        isErrorUserInvitation,
        createInvitation: createInvitationMutation,
        deleteInvitation: deleteInvitationMutation,
        patchAcceptInvitation: patchAcceptInvitationMutation,
        patchResendInvitation: patchResendInvitationMutation,
        invitationId,
        isErrorInvitationId,
        isLoadingInvitationId
        // search:setSearch,
        // searchValue:search
    };
}
