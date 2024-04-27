"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { formatTimeToNow } from "@/src/lib/utils"
import { listingsType } from "@/src/types/db"
import { Image } from "lucide-react"
import { MapPin } from "lucide-react"

import AdTags from "../adTags/AdTags"

interface MyMintsProps {
  listing: listingsType
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

  const formattedPrice = formatter.format(price!)

  const title = listing.title?.replace(/ /g, "-")
  const brand = listing.brand?.replace(/ /g, "-")
  const model = listing.model?.replace(/ /g, "-")
  const subCategory = listing.subCategory?.replace(/ /g, "-")
  const location = listing.location?.replace(/ /g, "-")

  return (
    <div className="group mx-auto w-full rounded-lg border border-background bg-background shadow-md transition duration-75 hover:scale-[0.99]">
      <Link
        href={`/${title}/${brand}/${model}/${subCategory}/${location}/${listing.id}`}
      >
        <div className="relative flex h-28 justify-between ">
          {/* IMAGE */}
          <div className="h-full w-4/12">
            {!adImage[0] ? (
              <div className="flex h-full w-full justify-center rounded-lg bg-muted align-middle">
                <Image
                  className="my-auto h-[50%] w-[50%] animate-pulse text-muted-foreground"
                  alst="imageLoader"
                />
              </div>
            ) : (
              <img
                src={adImage[0]}
                alt={adImage[0]}
                className="h-full w-full rounded-lg object-cover"
              />
            )}
          </div>

          {/* INFO */}
          <div className="relative w-8/12 p-3">
            <div>
              <h1 className="mb-2 max-h-20 truncate text-sm font-bold text-primary">
                {listing.title}
              </h1>
            </div>

            {/* <div className="relative mb-5 max-h-16 w-full truncate overflow-hidden text-clip whitespace-pre-line text-xs text-secondary lg:max-h-20">
              <p>{listing.description}</p>
            </div> */}

            <div className="absolute bottom-10 left-3">
              <h1 className="text-base font-semibold text-customAccent">
                R {formattedPrice}
              </h1>
              {/* <p className="text-xs italic text-secondary">
                <span className="font-bold">Category:</span> {listing.category} / {listing.subCategory}
              </p> */}
            </div>

            <div className="absolute bottom-6 left-3 flex gap-1 text-xs italic text-secondary">
              <MapPin className="h-4 w-4 justify-center text-primary" />
              <span className="text-xs font-bold text-primary">
                {listing.location}
              </span>
            </div>

            <div className="absolute bottom-1 left-3 flex gap-1 text-xs italic text-secondary">
              <span>Listed</span>
              {formatTimeToNow(new Date(listing.createdAt!))}
            </div>
          </div>

          {/* TAGS */}
          <div className=" absolute -right-3 -top-3">
            <AdTags listing={listing} />
          </div>
        </div>
      </Link>
    </div>
  )
}
