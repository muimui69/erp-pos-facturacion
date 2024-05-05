"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteCityId, getAllCity, postCreateCity } from '@/lib/queries/city';
import { queryClient } from '@/provider/ReactQueryClient';

export function useCitys() {
    const queryKeyName = 'citys'

    const { data: citys, isLoading, isError } = useQuery({
        queryKey: [queryKeyName],
        queryFn: getAllCity
    });

    const createCityMutation = useMutation({
        mutationFn: postCreateCity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['citys'] });
        },
    })

    const deleteCityMutation = useMutation({
        mutationFn: deleteCityId,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyName] });
        },
    })

    return {
        citys: citys?.data?.citys || [],
        isLoading,
        isError,
        createCity: createCityMutation,
        deleteCity: deleteCityMutation
    };
}
