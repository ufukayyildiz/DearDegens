import { Image } from "lucide-react"
import React from "react"

interface PlaceholderImagesProps {
  images: string | null | undefined
}

export default function PlaceholderImages({ images }: PlaceholderImagesProps) {

  const imageUrls = JSON.parse(images!)

  if (imageUrls[0] === undefined) {
    return (
      <div className="flex h-full w-full justify-center rounded-lg bg-muted p-10 md:p-5">
        <Image
          className="my-auto h-[50%] w-[50%] animate-pulse text-muted-foreground"
          alt="imagePlaceholder"
        />
      </div>
    )
  }
}
