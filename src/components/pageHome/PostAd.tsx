import React from "react"
import Link from "next/link"
export default function PostAd() {
  return (
    <div className="group relative flex h-9 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-customAccent bg-background object-cover shadow-lg hover:bg-customAccent hover:text-zinc-50">
      <Link className="text-sm font-semibold" href="/ad/create">
        Post Ad
      </Link>
    </div>
  )
}
