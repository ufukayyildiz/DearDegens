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

interface MintCarouselProps {
  images: string | null | undefined
}

export default function MintCarousel({ images }: MintCarouselProps) {
  const imageUrls = JSON.parse(images!)

  if (imageUrls[0] !== undefined) {
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
                className="flex w-full items-center justify-center shadow-lg"
              >
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg">
                  <img
                    src={images}
                    alt={images}
                    className="h-full w-full object-cover"
                  />
                </div>
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
