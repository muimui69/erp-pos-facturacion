"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/provider/ReactQueryClient';
import { deleteCityById, getAllCities, getCityById, patchCityById, postCreateCity } from '@/lib/queries/city';

export function useCities(subdomain?: string, serviceToken?: string, id?: string) {
    const queryKeyName = 'cities'

    const { data: cities, isLoading: isLoadingCities, isError: isErrorCities } = useQuery({
        queryKey: [queryKeyName, subdomain, serviceToken],
        queryFn: () => getAllCities(serviceToken as never, subdomain as never),
        enabled: !!serviceToken
    });

    const { data: cityId, isLoading: isLoadingCityId, isError: isErrorCityId } = useQuery({
        queryKey: [queryKeyName, subdomain, serviceToken, id],
        queryFn: () => getCityById(serviceToken as never, subdomain as never, id as never),
        enabled: !!serviceToken && !!id
    });


    const createCityMutation = useMutation({
        mutationFn: async ({ subdomain, serviceToken, nombre }: { serviceToken: string, subdomain: string, nombre: string }) => {
            return postCreateCity(serviceToken, subdomain, nombre);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })


    const deleteCityMutation = useMutation({
        mutationFn: async ({ serviceToken, subdomain, id }: { serviceToken: string, subdomain: string, id: string }) => {
            return deleteCityById(serviceToken, subdomain, id);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    const patchCityMutation = useMutation({
        mutationFn: async ({ token, subdomain, nombre, id }: { token: string, subdomain: string, nombre: string, id: string }) => {
            return patchCityById(token, subdomain, nombre, id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    return {
        cities: cities?.data.data.citys || [],
        cityId: cityId?.data.data.city || {},
        isLoadingCities,
        isLoadingCityId,
        isErrorCities,
        isErrorCityId,
        createCity: createCityMutation,
        deleteCity: deleteCityMutation,
        patchCity: patchCityMutation
    };
}
