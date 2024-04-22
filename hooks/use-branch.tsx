"use client"
import { useQuery } from '@tanstack/react-query';
import { getAllBranchs } from '@/lib/queries/branch-office';

export function useBranchs() {
    const { data: branchs, isLoading, isError } = useQuery({
        queryKey: ['branchs'],
        queryFn: getAllBranchs
    });

    return { branchs: branchs?.data?.branchs  || [], isLoading, isError };
}
