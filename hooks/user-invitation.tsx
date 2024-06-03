"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/provider/ReactQueryClient';
import { deleteInvitationById, getAllInvitations, getUserInvitation, patchAcceptInvitationById, patchResendInvitationById, postCreateInvitation } from '@/lib/queries/invitation';
import { PostInvitationParams } from '@/lib/queries/interfaces/invitation.interface';

export function useCategories(subdomain?: string, serviceToken?: string, search?: string) {
    const queryKeyName = 'invitations';

    const { data: invitations, isLoading: isLoadingInvitations, isError: isErrorInvitations } = useQuery({
        queryKey: [queryKeyName, subdomain, serviceToken],
        queryFn: () => getAllInvitations(serviceToken as never, subdomain as never)
    });


    const { data: userInvitations, isLoading: isLoadingUserInvitation, isError: isErrorUserInvitation } = useQuery({
        queryKey: [queryKeyName, subdomain, serviceToken, search],
        queryFn: () => getUserInvitation(serviceToken as never, subdomain as never, search as never)
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
        mutationFn: async ({ token, subdomain, id, invitation }: { token: string, subdomain: string, id: string, invitation: PostInvitationParams }) => {
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
        patchResendInvitation: patchResendInvitationMutation
    };
}
