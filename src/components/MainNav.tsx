import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import Logo from "@/src/assets/deardegens2.png"
import { cn } from "@/src/lib/utils"
import { NavItem } from "@/src/types/nav"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <div className="h-14 w-20 rounded-xl bg-zinc-100 p-1">
          <Image
            className="h-full w-full object-contain"
            src={Logo}
            alt="pepperMintLogo"
          />
        </div>
      </Link>
    </div>
  )
}
