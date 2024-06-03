import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselDemo({children}:any) {
  return (
    <Carousel className="w-full max-w-xs">
        <CarouselContent>
        <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                        {children}
                </CardContent>
              </Card>
    </CarouselContent>
      
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
