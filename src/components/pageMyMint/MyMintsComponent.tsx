"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { formatTimeToNow } from "@/src/lib/utils"
import { GeneralListing } from "@/src/types/db"

interface GeneralListingProps {
  generalListing: GeneralListing
}

export default function MyMintsComponent({ generalListing}: GeneralListingProps) {

  const [adImage, setAdImage] = useState([])
  const jsonImage = generalListing.images
  
  useEffect(() => {
    if (jsonImage) {
      const images = JSON.parse(jsonImage);
      console.log('images:', images);
      setAdImage(images);
    }
  }, [jsonImage])


  return (
    <div className="mx-auto w-full max-w-[800px] rounded-lg border border-l-4 border-secondary border-l-teal-400 bg-background p-3 shadow-md">
      <div className="relative flex justify-between">

        {/* INFO */}
        <div className="relative w-8/12">
          
          <div>
            <a href={`/fs/post/${generalListing.id}`}>
              <h1 className="text-primary group-hover:text-teal-400 md:text-xl mb-2">
                {generalListing.title}
              </h1>
            </a>
          </div>

          <div className="relative max-h-20 overflow-hidden w-full mb-5 text-clip text-xs text-zinc-500">
            <p>{generalListing.description}</p>
          </div>

            <h1 className="text-primary group-hover:text-teal-400 font-semibold text-lg">
              R {generalListing.price}
            </h1>
          <div className="absolute bottom-0 left-0 flex max-h-40 gap-1 text-xs italic text-capecod-500">
            <span>Listed</span>
            {formatTimeToNow(new Date(generalListing.createdAt))}
            <span>in</span>
            <span className="text-red-400 font-bold">{generalListing.location}</span>
          </div>
        </div>

        {/* IMAGE */}
        <img src={adImage[0]} alt={adImage[0]} className=" w-36 h-36 object-cover rounded-lg"/>

        {/* TAGS */}
        <div className=" absolute -bottom-5 -right-5">
          {generalListing.isAvailable === true ? (
            <div className="h-6 w-20 text-xs text-center justify-center italic bg-cyan-300 rounded-full p-1 shadow-lg z-30">
              Available!
            </div>
          ) : (
            <div className="h-6 w-20 text-xs text-center justify-center italic bg-amber-300 rounded-full p-1 shadow-lg z-30">
              Sold
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
