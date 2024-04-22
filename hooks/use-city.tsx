"use client"
import { useQuery } from '@tanstack/react-query';
import { getAllCity } from '@/lib/queries/city';
import { CityElement } from '@/lib/queries/interfaces/city.interface';

export function useCitys() {
    const { data: citys, isLoading, isError } = useQuery({
        queryKey: ['citys'],
        queryFn: getAllCity
    });

    return { citys: citys?.data?.citys  || [], isLoading, isError };
}
