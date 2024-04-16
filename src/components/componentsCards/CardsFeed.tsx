"use client"
import React from "react"
import { listingsType } from "@/src/types/db"
import MintCardComponent from "./MintCardComponent"
import MidiMintCardComponent from "./MidiMintCardComponent"
import useMediaQuery from "@/src/hooks/useMediaQuery"

interface CardFeedProps {
  listings: listingsType[]
}

export default function CardsFeed({ listings }: CardFeedProps) {
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)")
  return isAboveMediumScreens ? (
    <div className="mb-32 flex flex-col justify-center gap-5 px-5 py-5">
      {listings &&
        listings.map((listing) => <MintCardComponent listing={listing} />)}
    </div>
  ) : (
    <div className="mb-32 flex flex-wrap justify-center gap-5 px-5 py-5">
      {listings &&
        listings.map((listing) => <MidiMintCardComponent listing={listing} />)}
    </div>
  )
}
