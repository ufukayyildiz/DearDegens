"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { formatTimeToNow } from "@/src/lib/utils"
import { listingsGeneralType } from "@/src/types/db"
import { Image, MapPin } from "lucide-react"
import AdTagsMini from "../adTags/AdTagsMini"

interface MyMintsProps {
  listing: listingsGeneralType
}

export default function MiniMintCardComponent({ listing }: MyMintsProps) {
  const [adImage, setAdImage] = useState([])
  const jsonImage = listing.images

  useEffect(() => {
    if (jsonImage) {
      const images = JSON.parse(jsonImage)
      setAdImage(images)
    }
  }, [jsonImage])

  const price = listing.price
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
  })

  const formattedPrice = formatter.format(price)

  return (
    <div className="w-40 h-60 rounded-lg border border-muted bg-background shadow-md transition duration-500 hover:scale-[0.99]">
      <Link href={`/p/mint/${listing.id}`}>
        <div className="w-full h-full relative flex flex-col">
          <div className="w-full">
            {/* IMAGE */}
            <div className="h-28 w-full">
              {!adImage[0] ? (
                <div className="flex w-full h-full justify-center align-middle bg-muted rounded-lg">
                  <Image className="w-[50%] h-[50%] my-auto text-muted-foreground animate-pulse" />
                </div>
              ) : (
                <img
                  src={adImage[0]}
                  alt={adImage[0]}
                  className="h-full w-full object-cover rounded-tl-lg rounded-tr-lg"
                />
              )}
            </div>

            {/* TAGS */}
            <div className="absolute w-full -top-3 -left-3">
              <AdTagsMini listing={listing}/>
            </div>
          </div>

          {/* INFO */}
          <div className="h-full w-full p-1">
            <div>
              <h1 className="text-primary font-bold hover:text-customColorTwo text-sm mb-2 truncate">
                {listing.title}
              </h1>
            </div>

            <div className="">
              <h1 className="text-primary font-bold text-lg">
                R {formattedPrice}
              </h1>
            </div>
            
            <div className="absolute bottom-6 left-1 flex gap-1 text-xs italic text-secondary">
              <MapPin className="h-4 w-4 justify-center"/>
              <span className="text-primary font-bold text-xs">{listing.location}</span>
            </div>

            <div className="absolute bottom-1 left-2 flex gap-1 text-xs italic text-secondary">
              <span>Listed</span>
              {formatTimeToNow(new Date(listing.createdAt))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
