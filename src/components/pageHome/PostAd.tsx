import React from "react"
import Link from "next/link"
export default function PostAd() {
  return (
    <div className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-full border-2 border-customAccent bg-background object-cover shadow-lg hover:bg-customAccent hover:text-zinc-50 md:w-auto md:px-5">
      <Link className="flex font-semibold" href="/ad/create">
        CREATE A NEW LISTING
      </Link>
    </div>
  )
}
