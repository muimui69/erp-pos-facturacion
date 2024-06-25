"use client"
import { Skeleton } from "./ui/skeleton";

export default function EditProductSkeleton() {
    return (
        <div className="max-w-6xl px-4 mx-auto py-6">
            <div className="grid gap-6 lg:gap-12 items-start md:grid-cols-2">
                <div className="bg-background border rounded-lg p-6 flex flex-col items-center justify-center gap-4">
                    <Skeleton className="h-[250px] w-[250px] rounded-xl md:h-[250px] md:w-[250px] lg:h-[400px] lg:w-[400px]" />
                </div>
                <div className="bg-background border rounded-lg p-4">
                    <div className="grid gap-4">
                        <Skeleton className="h-6 w-f" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};
