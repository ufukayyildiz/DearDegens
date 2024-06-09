"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import Splash from "@/src/assets/DearDegens_Banner.png"
import { useSession } from "next-auth/react"
export default function Banner() {
  const { data: session } = useSession()

  return (
    <div className="group relative mb-10 flex w-full items-center justify-center overflow-hidden rounded-2xl border-none object-cover shadow-lg">
      <Image
        src={Splash}
        alt="deardegens"
        className="w-full object-cover transition duration-200 group-hover:scale-[1.1]"
      />

      <div className="absolute flex h-[100vh] w-[100vw] flex-col items-center justify-center rounded-lg border-none bg-background/50 p-8 text-center shadow-lg backdrop-blur-sm">
        {session?.user ? (
          <Link
            href="/ad/create"
            className="absolute text-3xl font-bold italic text-customAccent transition duration-200 group-hover:scale-[1.1]"
          >
            POST A FREE AD
          </Link>
        ) : (
          <Link
            href="/signin"
            className="text-3xl font-bold italic text-customAccent transition duration-200 group-hover:scale-[1.1]"
          >
            SIGN IN TO POST A FREE AD
          </Link>
        )}
      </div>
    </div>
  )
}
