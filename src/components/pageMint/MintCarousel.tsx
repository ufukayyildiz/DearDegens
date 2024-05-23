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

export default function MintCarousel(listing: any) {
  const imageUrls = JSON.parse(listing.listing)

  if (imageUrls.length !== 0) {
    return (
      <div className="flex items-center justify-center">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
        >
          <CarouselContent className="flex">
            {imageUrls.map((images: any, index: any) => (
              <CarouselItem
                key={index}
                className="flex h-[50vh] w-full items-center justify-center shadow-lg"
              >
                {imageUrls.length !== 0 ? (
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg">
                    <img
                      src={images}
                      alt={images}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-full w-full justify-center rounded-lg bg-muted">
                    <Image
                      className="my-auto h-[50%] w-[50%] animate-pulse text-muted-foreground"
                      alt="imageLoader"
                    />
                  </div>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            variant="icon"
            className="left-2 bg-background md:left-1"
          />
          <CarouselNext
            variant="icon"
            className="right-2 bg-background md:right-1"
          />
        </Carousel>
      </div>
    )
  }
}
