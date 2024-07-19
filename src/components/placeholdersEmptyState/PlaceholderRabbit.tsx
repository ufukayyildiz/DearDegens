import React from "react"
import Image from "next/image"
import Rabbit from "@/src/assets/rabbit.svg"

interface PlaceholderRabbitProps {
  text: string
}

export default function PlaceholderRabbit({ text }: PlaceholderRabbitProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="w-full pt-10 text-center italic">{text}</div>
      <Image
        src={Rabbit}
        alt="rabbit"
        width={100}
        className="mt-10 text-primary"
      />
    </div>
  )
}
