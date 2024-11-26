"use client"

import { formatTimeToNow } from "@/src/lib/utils"
import { Image, MapPin } from "lucide-react"

export default function CarouselMintCardSkeleton() {
  return (
    <div className="group h-60 w-40 rounded-lg border border-muted bg-background shadow-md transition duration-100 hover:scale-[0.99]">
      <div className="relative flex h-full w-full flex-col">
        <div className="w-full">
          {/* IMAGE */}
          <div className="h-28 w-full">
            <div className="flex h-full w-full justify-center rounded-lg bg-muted align-middle">
              <Image
                className="my-auto h-[50%] w-[50%] animate-pulse text-muted-foreground"
                alt="imageLoad"
              />
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className="h-full w-full p-1">
          <h1 className="mb-2 mt-1 h-5 w-full animate-pulse rounded-full bg-muted"></h1>
          <h1 className="h-5 w-20 animate-pulse rounded-full bg-muted"></h1>
          <div className="absolute bottom-6 left-1 flex gap-1 text-xs italic text-secondary">
            <MapPin className="h-4 w-4 animate-pulse justify-center text-muted-foreground" />
            <span className="h-5 w-20 animate-pulse  rounded-full bg-muted text-xs"></span>
          </div>

          <div className="absolute bottom-1 left-2 flex animate-pulse gap-1 text-xs italic text-muted-foreground">
            <span>Listed</span>
            {formatTimeToNow(new Date())}
          </div>
        </div>
      </div>
    </div>
  )
}
