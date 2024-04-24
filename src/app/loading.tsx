import React from "react"
import { Loader } from "lucide-react"

export default function loading() {
  return (
    <div className="global">
      <div className="flex min-h-screen w-full text-zinc-400 items-center justify-center">
        <Loader className="flex h-[10vh] w-[10vw] animate-spin" />
      </div>
    </div>
  )
}
