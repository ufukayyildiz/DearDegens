"use client"

import React, { useState } from "react"
import Link from "next/link"
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
import { CounterOfferCreationRequest } from "@/src/lib/validators/validateCounterOffer"
import { offerType } from "@/src/types/db"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { RotateCcw } from "lucide-react"

import { Checkbox } from "../components-ui/Checkbox"
import { Input } from "../components-ui/Input"
import { Label } from "../components-ui/Label"

interface CounterProps {
  adOffer: offerType
}

export default function MintCounterTwo({ adOffer }: CounterProps) {
  const queryClient = useQueryClient()
  const [counterPrice, setCounterPrice] = useState<number>(0)
  const [disabled, setDisabled] = useState<boolean>(true)

  const { mutate: counterOffer } = useMutation({
    // PAYLOAD
    mutationFn: async ({
      offerId,
      counterPrice,
      userId,
      sellerId,
      adId,
      adTitle,
    }: CounterOfferCreationRequest) => {
      const payload: CounterOfferCreationRequest = {
        offerId,
        counterPrice,
        userId,
        sellerId,
        adId,
        adTitle,
      }
      const { data } = await axios.put("/api/offerCounterTwo", payload)
      return data
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description:
          "There was an error sending your counter offer. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      return toast({
        description: "Your counter offer is on the way to the buyer.",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ["authorOffers"] })
      }
    },
  })

  async function onSubmit() {
    const payload: CounterOfferCreationRequest = {
      counterPrice: counterPrice,
      userId: adOffer.userId,
      offerId: adOffer.id,
      sellerId: adOffer.sellerId || "",
      adId: adOffer.adId,
      adTitle: adOffer.adTitle || "",
    }
    setDisabled(true)
    console.log("Submit Payload:", payload)
    counterOffer(payload)
  }

  return (
    <div className="">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="icon" size="icon">
            <RotateCcw size={20} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <form className="space-y-8">
            <AlertDialogHeader>
              <AlertDialogTitle className="mb-5 font-bold">
                The buyers offer was not good enough?
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="mb-5 grid grid-cols-1 gap-2">
                  {/* PRICE */}

                  <div className="flex h-5 w-60 justify-between">
                    <label className="py-1 text-primary">Counter amount:</label>
                    <label className="py-1 text-xs italic text-rose-400">
                      (required)
                    </label>
                  </div>
                  <Input
                    value={counterPrice}
                    onChange={(event) =>
                      setCounterPrice(parseInt(event.target.value))
                    }
                    type="number"
                    className="w-60 text-primary"
                    required
                  />
                </div>

                <div>
                  <p className="text-xs italic">
                    (Note: Once the buyer has accepted your counter offer, you
                    will gain access to the chat area where you&apos;ll make
                    contact with the buyer to make arrangments regarding
                    completing the transaction.)
                  </p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <div className="flex w-full justify-between">
                <div className="flex items-center justify-start space-x-2">
                  <Checkbox
                    id="disable"
                    checked={!disabled}
                    onCheckedChange={() => setDisabled(!disabled)}
                  />
                  <Label
                    htmlFor="disable"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <Link href="/termsofservice" className="underline">
                      Agree to terms of service.
                    </Link>
                  </Label>
                </div>
                <div className="flex gap-5">
                  <AlertDialogAction
                    onClick={() => onSubmit()}
                    disabled={disabled}
                  >
                    Send
                  </AlertDialogAction>
                  <AlertDialogCancel onClick={() => setDisabled(true)}>
                    Cancel
                  </AlertDialogCancel>
                </div>
              </div>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
