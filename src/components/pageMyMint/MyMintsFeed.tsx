"use client"

import MyMintsComponent from "./MyMintsComponent"
import { GeneralListing } from "@/src/types/db"

interface GeneralListingProps {
  generalListing: GeneralListing
}

export default function MyMintsFeed({ generalListing }: GeneralListingProps) {

  return (
    <div className="z-20 mx-auto w-11/12 min-w-[280px] overflow-hidden md:w-9/12">
      <ul className="mx-5 mb-44 mt-36 flex h-full flex-col space-y-8">
        {generalListing.map((listing: GeneralListingProps) => {
          return (
            <MyMintsComponent
              key={listing.id}
              generalListing={listing}
            />
          )
        })}
      </ul>
    </div>
  )
}
