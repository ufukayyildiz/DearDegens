import React from "react"
import Link from "next/link"

import { Car, Home, Zap, Gamepad2, Laptop2, Bike } from "lucide-react"

export default function CategoryTags() {
  return (
    <div className="mb-10 flex w-full flex-wrap items-center justify-center gap-3">
      <Link
        href="/find-vehicles"
        className="flex items-center justify-center gap-3 rounded-full border border-muted bg-background px-3 py-2 text-primary shadow-lg transition duration-75 hover:scale-[0.99] hover:border-customAccent hover:text-customAccent"
      >
        <Car />
        <p>Vehicles</p>
      </Link>
      <Link
        href="/find-home-and-garden"
        className="flex items-center justify-center gap-3 rounded-full border border-muted bg-background px-3 py-2 text-primary shadow-lg transition duration-75 hover:scale-[0.99] hover:border-customAccent hover:text-customAccent"
      >
        <Home className="h-5 w-5" />
        <p>Home & Garden</p>
      </Link>
      <Link
        href="/find-gaming"
        className="flex items-center justify-center gap-3 rounded-full border border-muted bg-background px-3 py-2 text-primary shadow-lg transition duration-75 hover:scale-[0.99] hover:border-customAccent hover:text-customAccent"
      >
        <Gamepad2 className="h-5 w-5" />
        <p>Gaming</p>
      </Link>
      <Link
        href="/find-computers"
        className="flex items-center justify-center gap-3 rounded-full border border-muted bg-background px-3 py-2 text-primary shadow-lg transition duration-75 hover:scale-[0.99] hover:border-customAccent hover:text-customAccent"
      >
        <Laptop2 className="h-5 w-5" />
        <p>Computers</p>
      </Link>
      <Link
        href="/find-sports-and-outdoors"
        className="flex items-center justify-center gap-3 rounded-full border border-muted bg-background px-3 py-2 text-primary shadow-lg transition duration-75 hover:scale-[0.99] hover:border-customAccent hover:text-customAccent"
      >
        <Bike className="h-5 w-5" />
        <p>Sports & Outdoors</p>
      </Link>
      <Link
        href="/find-electronics"
        className="flex items-center justify-center gap-3 rounded-full border border-muted bg-background px-3 py-2 text-primary shadow-lg transition duration-75 hover:scale-[0.99] hover:border-customAccent hover:text-customAccent"
      >
        <Zap className="h-5 w-5" />
        <p>Electronics</p>
      </Link>
    </div>
  )
}
