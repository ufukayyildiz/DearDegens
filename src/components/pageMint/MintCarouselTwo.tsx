"use client"

import React from "react"
import { Image } from "lucide-react"

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
      <div className="mt-16 flex items-center justify-center">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="h-full w-full md:w-6/12"
        >
          <CarouselContent className="flex">
            <CarouselItem className="flex items-center justify-center">
              <div className="flex h-full min-h-[40vh] w-full justify-center rounded-lg bg-muted">
                <Image
                  className="my-auto h-[50%] w-[50%] animate-pulse text-muted-foreground"
                  alt="imageLoader"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious variant="icon" className="left-2 md:left-0" />
          <CarouselNext variant="icon" className="right-2 md:right-0" />
        </Carousel>
      </div>
    )
  }

  if (imageUrls.length !== 0) {
    return (
      <div className="mt-16 flex items-center justify-center">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
          className="h-full min-h-[30vh] w-full md:w-6/12"
        >
          <CarouselContent className="flex">
            {imageUrls.map((images: any, index: any) => (
              <CarouselItem
                key={index}
                className="flex items-center justify-center shadow-lg"
              >
                <div className="flex h-full max-h-[40vh] overflow-hidden rounded-md">
                  <img src={images} alt={images} className="object-cover" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious variant="icon" className="left-2 md:left-0" />
          <CarouselNext variant="icon" className="right-2 md:right-0" />
        </Carousel>
      </div>
    )
  }
}
