"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/provider/ReactQueryClient';
import { getAllUserInvitations } from '@/lib/queries/invitation';

export function useNotificationInvitations(token?: string) {
    const queryKeyName = 'notifications';

    const { data: notifications, isLoading: isLoadingNotification, isError: isErrorNotifications } = useQuery({
        queryKey: [queryKeyName, token],
        queryFn: () => getAllUserInvitations(token as never),
        enabled: !!token
    });



    return {
        notifications: notifications?.data.data.invitations || [],
        isLoadingNotification,
        isErrorNotifications
    };
}
