import React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components-ui/Carousel"


import MiniMintCardComponent from "./MiniMintCardComponent"

import "@splidejs/react-splide/css/core"

export default async function HomeCarousel({ listings }: { listings: any[] }) {


  return (
    <div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
        }}
        className="h-full w-full"
      >
        <CarouselContent className="ml-0 flex">
          {listings.map((listing: any, index: any) => (
            <CarouselItem
              key={index}
              tabIndex={index}
              className="basis-auto p-5"
            >
              <MiniMintCardComponent listing={listing} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant="icon" className="-left-8" />
        <CarouselNext variant="icon" className="-right-8" />
      </Carousel>
    </div>
  )
}
