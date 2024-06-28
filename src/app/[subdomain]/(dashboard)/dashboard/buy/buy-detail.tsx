"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useParamsClient } from '../../../../../../hooks/use-params';
import { useBuys } from "@/hooks/use-buys";
import { Buy, RangeDate } from "@/lib/queries/interfaces/buys";
import { DatePickerWithRange } from "./data-range-picker";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import BuyDetailSkeleton from "@/components/buy-detail-skeleton";
import { useDateStore } from "@/context/data-range-store";

export default function BuyDetail() {
    const { rangeDate } = useDateStore();
    const { subdomain, user } = useParamsClient();

    const { buys, isLoading, isError } = useBuys(subdomain as never, user?.token!, rangeDate);

    const pageSize = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    }; 
 
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const startIndex = (currentPage - 1) * pageSize; 
    const endIndex = startIndex + pageSize; 

    const currentPageData = buys?.slice(startIndex, endIndex);

    if (isLoading) {
        return <BuyDetailSkeleton />
    }

    return (
        <>
            <DatePickerWithRange
                className="m-2 py-5"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">
                {
                    currentPageData?.map((buy) => (
                        <Card key={buy.id} className="bg-background shadow-lg rounded-lg overflow-hidden">
                            <CardContent className="p-6 grid gap-4">
                                <div className="text-left">
                                    <Badge variant="outline" className="bg-muted text-muted-foreground">
                                        <Icons.clock className=" w-4 h-4 text-primary mr-2" />
                                        {buy.createdAt}
                                    </Badge>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Icons.pyramid className="w-6 h-6 text-primary" />
                                        <span className="font-medium">{buy.provider.name}</span>
                                    </div>
                                    <Badge variant="outline" className="bg-muted text-muted-foreground">
                                        PROVEEDOR
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <h4 className="font-medium">{buy.user.name}</h4>
                                            <p className="text-sm text-muted-foreground">Comprador</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <h4 className="font-medium text-2xl">BS {buy.total}</h4>
                                        <p className="text-sm text-muted-foreground">Total</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                }

            </div>
            <div className="flex justify-end mt-4 mb-5">
                <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={handlePrevPage}
                    className="mr-2"
                >
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    // disabled={currentPage * pageSize >= buys.length}
                    disabled={!buys || currentPage * pageSize >= buys.length}
                    onClick={handleNextPage}
                >
                    Siguiente
                </Button>
            </div>
        </>
    );
}
