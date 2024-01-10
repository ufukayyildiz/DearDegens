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
import {
  CounterOfferCreationRequest,
  validateCounterOffer,
} from "@/src/lib/validators/validateCounterOffer"
import { offerType } from "@/src/types/db"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { RotateCcw } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Checkbox } from "../components-ui/Checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components-ui/Form"
import { Input } from "../components-ui/Input"
import { Label } from "../components-ui/Label"

interface CounterProps {
  adOffer: offerType
}

type FormData = z.infer<typeof validateCounterOffer>

export default function MintCounter({ adOffer }: CounterProps) {
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

      const { data } = await axios.put("/api/offerCounter", payload)

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
        await queryClient.invalidateQueries({ queryKey: ["adOffers"] })
      }
    },
  })

  async function onSubmit() {
    const payload: CounterOfferCreationRequest = {
      counterPrice: counterPrice,
      userId: adOffer.userId,
      offerId: adOffer.id,
      sellerId: adOffer.sellerId,
      adId: adOffer.adId,
      adTitle: adOffer.adTitle,
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
              <AlertDialogTitle className="font-bold mb-5">
                The buyers offer was not good enough?
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="grid grid-cols-1 gap-2 mb-5">
                  {/* PRICE */}

                  <div className="w-60 h-5 flex justify-between">
                    <label className="py-1 text-primary">Counter amount:</label>
                    <label className="text-xs italic text-rose-400 py-1">
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
                  <p className="italic text-xs">
                    (Note: Once the buyer has accepted your counter offer, you
                    will gain access to the chat area where you'll make contact
                    with the buyer to make arrangments regarding completing the
                    transaction.)
                  </p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <div className="w-full flex justify-between">
                <div className="flex items-center space-x-2 justify-start">
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
                  <AlertDialogCancel onClick={() => setDisabled(true)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onSubmit()}
                    disabled={disabled}
                  >
                    Send
                  </AlertDialogAction>
                </div>
              </div>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
