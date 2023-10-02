"use client"

import React, { useEffect, useState } from "react"
import useMediaQuery from "@/src/hooks/useMediaQuery"
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide"

import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react"

import MiniMintCardComponent from "./MiniMintCardComponent"
import "@splidejs/react-splide/css/core"

export default function SwipperComponent({ listings }: { listings: any[] }) {
  const isBelowSmallScreens = useMediaQuery("(max-width:637px)")
  const isBelowXSScreens = useMediaQuery("(max-width:768px)")
  const isBelowLargeScreens = useMediaQuery("(max-width:1032px)")
  const isBelowXLScreens = useMediaQuery("(max-width:1200px)")

  const [slides, setSlides] = useState<number>(2)

  useEffect(() => {
    if (isBelowSmallScreens) {
      setSlides(2)
    } else if (isBelowLargeScreens) {
      setSlides(3)
    } else if (isBelowXLScreens) {
      setSlides(4)
    } else {
      setSlides(5)
    }
  }, [isBelowSmallScreens, isBelowLargeScreens, isBelowXLScreens])


  return (
    <div>
      <Splide
        hasTrack={false}
        aria-label="..."
        className="relative"
        options={{ perPage: slides, gap: '5rem', autoplay: true, type: "loop" }}
      >
        <SplideTrack>
          {listings.map((listing: any, index: any) => (
            <SplideSlide tabIndex={index} className="p-5">
              <MiniMintCardComponent listing={listing} />
            </SplideSlide>
          ))}
        </SplideTrack>

        <div className="splide__arrows">
          <div className="absolute top-[50%] -left-6">
            <button className="splide__arrow splide__arrow--prev">
              <ChevronLeftIcon />
            </button>
          </div>
          <div className="absolute top-[50%] -right-6">
            <button className="splide__arrow splide__arrow--next">
              <ChevronRightIcon/>
            </button>
          </div>
        </div>
      </Splide>
    </div>
  )
}
