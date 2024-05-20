"use client"
import React, { useState, useEffect } from "react"
import { Input } from "./components-ui/Input"
import { Button } from "./components-ui/Button"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import useKeyPress from "../hooks/useKeyPress"
import { useQueryClient } from "@tanstack/react-query"
import { specialCharsRegex } from "../lib/regex"
import { toast } from "../hooks/use-toast"

export default function SearchbarTop() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [input, setInput] = useState<string>("")
  const [disabled, setDisabled] = useState<boolean>(false)
  const enterKey = useKeyPress("Enter")
  const searchParams = input.replace(/ /g, "-")

  const handleSearch = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["results"],
    })
    if (searchParams !== "") {
      router.push(`/find-ads/${searchParams}`)
    } else {
      router.push(`/find-ads/no-result`)
    }
  }

  const specialCharacterDetected = () => {
    if (specialCharsRegex.test(input)) {
      return toast({
        title: "No special characters allowed.",
        description: "Please refrain from using spacial characters.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    if (specialCharsRegex.test(input)) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
    specialCharacterDetected()
  }, [input])

  useEffect(() => {
    if (enterKey) {
      handleSearch()
    }
  }, [enterKey])

  return (
    <div className="flex w-full items-center justify-center">
      <Input
        className="z-40 w-full rounded-full border border-transparent bg-background placeholder:text-customAccent dark:border-muted"
        placeholder="Your search begins here.."
        value={input}
        onChange={(event: any) => setInput(event.target.value)}
      />
      <Button
        disabled={disabled}
        className="relative z-30 -ml-8 flex h-10 w-[85px] items-center justify-end rounded-full bg-customAccent text-zinc-100 hover:text-customAccent"
        onClick={() => {
          handleSearch()
        }}
      >
        <Search />
      </Button>
    </div>
  )
}
