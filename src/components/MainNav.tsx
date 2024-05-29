import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import Logo from "@/src/assets/deardegens2.png"
import { NavItem } from "@/src/types/nav"
import DarkLogo from "@/src/assets/DearDegens_Dark.svg"
import LightLogo from "@/src/assets/DearDegens_Light.svg"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <div className="h-12">
          <Image
            className="hidden h-full w-full object-contain dark:block"
            src={DarkLogo}
            alt="DearDegensDark"
          />
          <Image
            className="h-full w-full object-contain dark:hidden"
            src={LightLogo}
            alt="DearDegensLight"
          />
        </div>
      </Link>
    </div>
  )
}
