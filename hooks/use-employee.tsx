"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/provider/ReactQueryClient';
import { getAllEmployees, getEmployeeById, patchEmployeeById } from '@/lib/queries/employee';

export function useEmployees(subdomain?: string, serviceToken?: string, id?: string) {
    const queryKeyName = 'employee'

    const { data: employee, isLoading: isLoadingEmpleyoee, isError: isErrorEmployee } = useQuery({
        queryKey: [queryKeyName, subdomain, serviceToken],
        queryFn: () => getAllEmployees(serviceToken as never, subdomain as never),
        enabled: !!serviceToken
    });

    const { data: employeeId, isLoading: isLoadingEmpleyoeeId, isError: isErrorEmployeeId } = useQuery({
        queryKey: [queryKeyName, subdomain, serviceToken, id],
        queryFn: () => getEmployeeById(serviceToken as never, subdomain as never, id as never),
        enabled: !!serviceToken && !!id
    });


    // const createCityMutation = useMutation({
    //     mutationFn: postCreateCity,
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: [queryKeyName] });
    //     },
    // })

    // const deleteCityMutation = useMutation({
    //     mutationFn: deleteCityId,
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: [queryKeyName] });
    //     },
    // })


    const patchEmployeeMutation = useMutation({
        mutationFn: async ({ serviceToken, subdomain, id, rolId }: { serviceToken: string, subdomain: string, id: string, rolId: string }) => {
            return patchEmployeeById(serviceToken, subdomain, id, rolId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })


    return {
        employee: employee?.data?.data.allUsers || [],
        employeeId: employeeId?.data.data.employee || {},
        isErrorEmployee,
        isErrorEmployeeId,
        isLoadingEmpleyoee,
        isLoadingEmpleyoeeId,
        // createCity: createCityMutation,
        // deleteCity: deleteCityMutation,
        patchEmployee: patchEmployeeMutation
    };
}
