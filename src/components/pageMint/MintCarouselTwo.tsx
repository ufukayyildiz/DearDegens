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

  if (imageUrls.length === 0) {
    return (
      <div className="flex items-center justify-center mt-16">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-6/12 h-full"
        >
          <CarouselContent className="flex">
            <CarouselItem className="flex items-center justify-center">
              <div className="flex w-full min-h-[40vh] justify-center bg-muted rounded-lg">
                <Image className="w-[50%] h-[50%] my-auto text-muted-foreground animate-pulse" />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious variant="icon" />
          <CarouselNext variant="icon" />
        </Carousel>
      </div>
    )
  }

  if (imageUrls.length !== 0) {
    return (
      <div className="flex items-center justify-center mt-16">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-6/12 h-full min-h-[30vh]"
        >
          <CarouselContent className="flex">
            {imageUrls.map((images: any, index: any) => (
              <CarouselItem
                key={index}
                className="flex items-center justify-center shadow-lg"
              >
                <div className="flex max-h-[40vh] rounded-md overflow-hidden">
                  <img src={images} alt={images} className="object-cover" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious variant="icon" />
          <CarouselNext variant="icon" />
        </Carousel>
      </div>
    )
  }
}
