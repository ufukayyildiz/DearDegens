import React from "react"
import { Image } from "lucide-react"

interface ImageSkeletonProps {
  images: string[]
}

export default function ImageSkeleton({ images }: ImageSkeletonProps) {
  return (
    <>
      {images.map((file: any, index: number) => (
        <div key={index}>
          <Image
            alt={`Image ${index}`}
            className="h-32 w-32 animate-pulse rounded-md object-contain text-muted"
          />
        </div>
      ))}
    </>
  )
}
