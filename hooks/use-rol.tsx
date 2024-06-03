"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/provider/ReactQueryClient';
import { deleteRoleById, getAllPermissions, getAllRoles, postCreateRole } from '@/lib/queries/rol';
import { PostRoleParams } from '@/lib/queries/interfaces/rol.interface';

export function useCategories(subdomain?: string, serviceToken?: string, search?: string) {
    const queryKeyName = 'rols';

    const { data: rols, isLoading: isLoadingRols, isError: isErrorRols } = useQuery({
        queryKey: [queryKeyName, subdomain, serviceToken],
        queryFn: () => getAllRoles(serviceToken as never, subdomain as never)
    });


    const { data: permissions, isLoading: isLoadingPermissions, isError: isErrorPermissions } = useQuery({
        queryKey: [queryKeyName, subdomain, serviceToken, search],
        queryFn: () => getAllPermissions(serviceToken as never, subdomain as never, search as never)
    });

    const createRolMutation = useMutation({
        mutationFn: async ({ subdomain, serviceToken, role }: { serviceToken: string, subdomain: string, role: PostRoleParams }) => {
            return postCreateRole(serviceToken, subdomain, role);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    const deleteRoleMutation = useMutation({
        mutationFn: async ({ serviceToken, subdomain, id }: { serviceToken: string, subdomain: string, id: string }) => {
            return deleteRoleById(serviceToken, subdomain, id);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })



    return {
        permissions: permissions?.data?.data.allPermission || [],
        rols: rols?.data?.data || [],
        isLoadingPermissions,
        isLoadingRols,
        isErrorPermissions,
        isErrorRols,
        createRol: createRolMutation,
        deleteRol: deleteRoleMutation,
    };
}
