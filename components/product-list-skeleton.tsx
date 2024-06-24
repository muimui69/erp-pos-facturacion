import { Skeleton } from "./ui/skeleton";

export default function ProductListSkeleton() {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-6">
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-background rounded-lg overflow-hidden shadow-xl relative border animate-pulse">
                    <div className="flex flex-col space-y-3">
                        <Skeleton className="h-[200px] w-full" />
                        <div className="space-y-2 p-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}
