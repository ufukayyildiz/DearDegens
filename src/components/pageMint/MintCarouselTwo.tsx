"use client"

import React from "react"
import { ChevronLeftIcon, ChevronRightIcon, Image } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components-ui/Carousel"

export default function MintCarouselTwo(listing: any) {
  const imageUrls = JSON.parse(listing.listing)
  return (
    <div className="flex items-center justify-center">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-6/12 h-full"
      >
        <CarouselContent className="flex">
          {imageUrls.map((images: any, index: any) => (
            <CarouselItem
              key={index}
              className="flex items-center justify-center p-5"
            >
              {imageUrls.length === 0 ? (
                <div className="flex justify-center align-middle bg-muted rounded-lg">
                  <Image className="w-[50%] h-[50%] my-auto text-muted-foreground animate-pulse" />
                </div>
              ) : (
                <div className="flex rounded-md aspect-square object-cover shadow-lg overflow-hidden">
                  <img src={images} alt={images} />
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant='icon' />
        <CarouselNext variant='icon' />
      </Carousel>
    </div>
  )
}
