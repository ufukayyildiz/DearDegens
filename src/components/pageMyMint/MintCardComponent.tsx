"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { formatTimeToNow } from "@/src/lib/utils"
import { listingsGeneralType } from "@/src/types/db"
import { Image } from "lucide-react"

interface MyMintsProps {
  listing: listingsGeneralType
}

export default function MintCardComponent({ listing }: MyMintsProps) {
  const [adImage, setAdImage] = useState([])
  const jsonImage = listing.images

  useEffect(() => {
    if (jsonImage) {
      const images = JSON.parse(jsonImage)
      setAdImage(images)
    }
  }, [jsonImage])

  const price = listing.price
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0, 
  });
  
  const formattedPrice = formatter.format(price);

  return (
    <div className="mx-auto w-full rounded-lg border border-l-4 border-background border-l-customColorTwo bg-background shadow-md transition duration-500 hover:scale-[0.99]">
      <Link href={`/fs/post/${listing.id}`}>
        <div className="relative h-48 flex justify-between ">
          {/* INFO */}
          <div className="relative w-8/12 p-3">
            <div>
              <h1 className="text-primary font-bold hover:text-customColorTwo md:text-xl mb-2">
                {listing.title}
              </h1>
            </div>

            <div className="relative max-h-20 overflow-hidden w-full mb-5 text-clip text-secondary">
              <p>{listing.description}</p>
            </div>

            <div className="absolute bottom-6">
              <h1 className="text-primary font-semibold text-lg">
                R {formattedPrice}
              </h1>
            </div>

            <div className="absolute bottom-2 left-3 flex max-h-40 gap-1 text-xs italic text-secondary">
              <span>Listed</span>
              {formatTimeToNow(new Date(listing.createdAt))}
              <span>in</span>
              <span className="text-primary font-bold">{listing.location}</span>
            </div>
          </div>

          {/* IMAGE */}
          <div className="h-full w-4/12">
            {!adImage[0] ? (
              <div className="flex w-full h-full justify-center align-middle bg-muted rounded-lg">
                <Image className='w-[50%] h-[50%] my-auto text-muted-foreground animate-pulse'/>
              </div>
            ):(
              <img
                src={adImage[0]}
                alt={adImage[0]}
                className="h-full w-full object-cover rounded-lg"
              />
            )}
          </div>

          {/* TAGS */}
          <div className=" absolute -bottom-3 -right-3">
            {listing.isAvailable === true ? (
              <div className="h-6 w-20 text-xs text-center text-customColorFou justify-center italic bg-gradient-to-br from-customColorOne via-customColorTwo to-customColorThr rounded-full p-1 shadow-lg z-30">
                Available!
              </div>
            ) : (
              <div className="h-6 w-20 text-xs text-center text-customColorFou justify-center italic bg-amber-300 rounded-full p-1 shadow-lg z-30">
                Sold
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
