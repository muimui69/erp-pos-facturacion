"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const CardCustomSkeleton = () => {
    return (
        <>
            <Card className="animate-pulse">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                    <div className="h-4 w-4 bg-gray-300 rounded"></div>
                </CardHeader>
                <CardContent>
                    <div className="h-8 w-32 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 w-full bg-gray-300 rounded"></div>
                </CardContent>
            </Card>
        </>
    );
};
