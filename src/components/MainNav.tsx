import * as React from "react"
import Link from "next/link"
import { siteConfig } from "@/src/config/site"
import { cn } from "@/src/lib/utils"
import { NavItem } from "@/src/types/nav"
import Logo from "@/src/assets/PepperMint.png"
import { Icons } from "./components-ui/Icons"
import Image from "next/image"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <div className="h-16 w-auto bg-white p-1 rounded">
          <Image className="w-full h-full object-contain" src={Logo} alt="pepperMintLogo"/>
        </div>
      </Link>
      {items?.length ? (
        <div className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </div>
      ) : null}
    </div>
  )
}
