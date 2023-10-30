"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/components-ui/AlertDialog"
import { Button } from "@/src/components/components-ui/Button"
import { toast } from "@/src/hooks/use-toast"
import {
  OfferCreationRequest,
  validateOffer,
} from "@/src/lib/validators/validateOffer"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Input } from "../components-ui/Input"
import { Label } from "../components-ui/Label"

export default function MintOffer() {
  const router = useRouter()
  const [input, setInput] = useState<string>("")

  const { mutate: createPost } = useMutation({
    // PAYLOAD
    mutationFn: async ({ price }: OfferCreationRequest) => {
      const payload: OfferCreationRequest = {
        price,
      }
      const { data } = await axios.post("/api/", payload)

      return data
    },

    // ERROR
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not published. Please try again.",
        variant: "destructive",
      })
    },

    // SUCCESS
    onSuccess: () => {
      return toast({
        description: "Your post has been published.",
      })
    },
  })

  return (
    <div className="">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outlinebold">MAKE OFFER</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold">
              Your one step closer to the deal of a lifetime!
            </AlertDialogTitle>
            <AlertDialogDescription>
              <p className="mb-5 text-primary">
                Not happy with the asking price? Send the seller an offer and
                let's see if they'll take the bait!
              </p>

              <div className="grid grid-cols-1 gap-2 mb-5">
                {/* PRICE */}

                <div className="w-6/12 h-5 flex justify-between">
                  <Label className="py-1">Price </Label>
                  <Label className="text-xs italic text-rose-400 py-1">
                    (required)
                  </Label>
                </div>
                <Input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  type="number"
                  className="w-60"
                  required
                />
              </div>

              <p className="italic text-xs">
                (Note: Once the seller has accepted your offer, you will gain
                access to the chat area where you'll make contact with the
                seller and make arrangments to complete the transaction.)
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={input.length === 0}>
              Send
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
