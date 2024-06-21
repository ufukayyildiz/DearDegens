import React from "react"
import { IoSparklesSharp } from "react-icons/io5"

export default function IsNew() {
  return (
    <div className="z-30 flex h-8 w-8 items-center justify-center rounded-full bg-background italic text-cyan-500">
      <IoSparklesSharp className="h-5 w-5" />
    </div>
  )
}
