"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import Splash from "@/src/assets/DearDegens_Banner.png"
import { useSession } from "next-auth/react"
export default function Banner() {
  const { data: session } = useSession()

  return (
    <div className="group relative mb-10 flex h-40 w-full items-center justify-center overflow-hidden rounded-2xl object-cover shadow-lg">
      <Image
        src={Splash}
        alt="deardegens"
        className="w-full object-cover transition duration-200 group-hover:scale-[1.1]"
      />

      <div className="h-8/12 absolute flex w-11/12 flex-col items-center justify-center rounded-lg bg-background/70 p-8 shadow-lg backdrop-blur-sm">
        {session?.user ? (
          <Link
            href="/ad/create"
            className="text-3xl font-bold text-customAccent transition duration-75 group-hover:scale-[1.2]"
          >
            POST A FREE AD
          </Link>
        ) : (
          <Link
            href="/ad/create"
            className="text-3xl font-bold text-customAccent transition duration-75 group-hover:scale-[1.2]"
          >
            SIGN IN TO POST A FREE AD
          </Link>
        )}
      </div>
    </div>
  )
}
