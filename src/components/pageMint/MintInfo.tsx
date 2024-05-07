import React from "react"
import { listingsType } from "@/src/types/db"

interface InfoGeneralProps {
  listing: listingsType
}

export default function MintInfo({ listing }: InfoGeneralProps) {
  return (
    <div className="flex w-full min-w-[270px] flex-col gap-2 pt-5 text-sm md:pl-10 md:pt-0 md:text-base">
      <div className="flex w-full">
        <p className="w-32 font-bold">Brand:</p>
        <h3>{listing.brand}</h3>
      </div>
      <div className="flex w-full">
        <p className="min-w-32 font-bold">Model:</p>
        <h3 className="">{listing.model}</h3>
      </div>
      {listing.tab === "Vehicles" && (
        <>
          <div className="flex w-full">
            <p className="min-w-32 font-bold">Year:</p>
            <h3 className="">{listing.year}</h3>
          </div>
          <div className="flex w-full">
            <p className="w-32 font-bold">Mileage:</p>
            <h3>{listing.mileage}</h3>
          </div>
          <div className="flex w-full">
            <p className="min-w-32 font-bold">Transmission:</p>
            <h3 className="">{listing.transmission}</h3>
          </div>
        </>
      )}

      <div className="flex w-full">
        <p className="min-w-32 font-bold">Category:</p>
        <h3>{listing.subCategory}</h3>
      </div>
      <div className="flex w-full">
        <p className="min-w-32 font-bold">Condition:</p>
        <h3>{listing.condition}</h3>
      </div>
    </div>
  )
}
