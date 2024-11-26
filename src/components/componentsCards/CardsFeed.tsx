"use client"
import React, { useEffect } from "react"
import Lenis from "@studio-freight/lenis"
import { listingsType } from "@/src/types/db"
import MidiMintCardComponent from "./MidiMintCardComponent"
import MiniMintCardComponent from "./MiniMintCardComponent"
import useMediaQuery from "@/src/hooks/useMediaQuery"

interface CardFeedProps {
  listings: listingsType[]
}

export default function CardsFeed({ listings }: CardFeedProps) {
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)")
  const isAboveSmallScreens = useMediaQuery("(min-width: 465px)")

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: any) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return isAboveSmallScreens ? (
    <div className="mb-32 flex flex-wrap justify-center gap-5 p-5">
      {listings &&
        listings.map((listing) => <MidiMintCardComponent listing={listing} />)}
    </div>
  ) : (
    <div className="flex flex-col justify-center gap-5 p-5">
      {listings &&
        listings.map((listing) => <MiniMintCardComponent listing={listing} />)}
    </div>
  )
}
