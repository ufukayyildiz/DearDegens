"use client"
import React, { useState } from "react"
import { Input } from "./components-ui/Input"
import { Button } from "./components-ui/Button"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import useMediaQuery from "../hooks/useMediaQuery"

export default function SearchbarTop() {
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)")
  const router = useRouter()
  const [input, setInput] = useState<string>("")
  const searchParams = input.replace(/ /g, "-")
  return (
    <div className="flex w-full items-center justify-center">
      <Input
        className="z-40 w-full rounded-full border border-transparent bg-background placeholder:text-customAccent dark:border-muted"
        placeholder="Your search begins here.."
        value={input}
        onChange={(event: any) => setInput(event.target.value)}
      />
      <Button
        className="relative z-30 -ml-8 flex h-10 w-[85px] items-center justify-end rounded-full bg-customAccent text-zinc-100 hover:text-customAccent"
        onClick={() => {
          router.push(`/find-ads/${searchParams}`)
        }}
      >
        <Search />
      </Button>
    </div>
  )
}
