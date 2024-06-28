"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BuyDetailSk = () => (
  <Card className="bg-background shadow-lg rounded-lg overflow-hidden animate-pulse">
    <CardContent className="p-6 grid gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          <span className="font-medium w-24 h-4 bg-gray-200 rounded"></span>
        </div>
        <Badge variant="outline" className="bg-muted text-muted-foreground w-24 h-6"></Badge>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>
            <div className="font-medium w-24 h-4 bg-gray-200 rounded"></div>
            <div className="text-sm text-muted-foreground w-16 h-4 bg-gray-200 rounded mt-1"></div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-medium text-2xl w-16 h-6 bg-gray-200 rounded"></div>
          <div className="text-sm text-muted-foreground w-12 h-4 bg-gray-200 rounded mt-1"></div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const BuyDetailSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">
    {[...Array(6)].map((_, index) => (
      <BuyDetailSk key={index} />
    ))}
  </div>
);

export default BuyDetailSkeleton;
