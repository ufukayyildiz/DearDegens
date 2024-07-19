import React from "react"
import Image from "next/image"
import Fish from "@/src/assets/fish.svg"

interface PlaceholderFishProps {
  text: string
}

export default function PlaceholderFish({ text }: PlaceholderFishProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="w-full pt-10 text-center italic">{text}</div>
      <Image src={Fish} alt="fish" width={100} className="mt-10 text-primary" />
    </div>
  )
}
