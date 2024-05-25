"use client"

import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
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

import { toast } from "@/src/hooks/use-toast"
import {
  OfferCreationRequest,
  validateOffer,
} from "@/src/lib/validators/validateOffer"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import { useGetOffersUser } from "@/src/server/services"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Checkbox } from "../components-ui/Checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components-ui/Form"
import { Input } from "../components-ui/Input"
import { Label } from "../components-ui/Label"
import { listingsType, offerType } from "@/src/types/db"
import { cn } from "@/src/lib/utils"

interface MintProps {
  listing: listingsType
}

type FormData = z.infer<typeof validateOffer>

export default function MintOffer({ listing }: MintProps) {
  const [disabled, setDisabled] = useState<boolean>(true)
  const [offerLimit, setOfferLimit] = useState<boolean>(false)
  const [hover, setHover] = useState<boolean>(false)
  const [newData, setNewData] = useState<OfferCreationRequest>()
  const queryClient = useQueryClient()
  const { data: session } = useSession()

  const offers = useGetOffersUser(listing.id).data || []
  const isFetching = useGetOffersUser(listing.id).isFetching

  useEffect(() => {
    if (offers && offers.length >= 2) {
      setOfferLimit(true)
    }
  }, [offers])

  useEffect(() => {
    const element: Element | null = document.querySelector("#button")
    if (!offerLimit && element) {
      element.addEventListener("mouseover", (event) => {
        setHover(true)
      })

      element.addEventListener("mouseout", (event) => {
        setHover(false)
      })
    }
  }, [])

  const form = useForm<FormData>({
    resolver: zodResolver(validateOffer),
    defaultValues: {
      offerPrice: 0,
      askPrice: listing.price || 0,
      adId: listing.id,
      sellerId: listing.authorId,
      title: listing.title,
    },
  })

  const { mutate: createOffer } = useMutation({
    // PAYLOAD
    mutationFn: async ({
      offerPrice,
      askPrice,
      adId,
      sellerId,
      title,
    }: OfferCreationRequest) => {
      const payload: OfferCreationRequest = {
        offerPrice,
        askPrice,
        adId,
        sellerId,
        title,
      }

      const { data } = await axios.post("/api/createOffer", payload)

      return data
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "There was an error sending your offer. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      form.reset()
      return toast({
        description: "Your offer is on the way to the seller.",
      })
    },
    onSettled: async (_, error, data) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["userOffers", listing.id],
        })
        // await queryClient.refetchQueries({
        //   queryKey: ["userOffers", listing.id],
        //   type: "all",
        //   exact: true,
        // })
      }
    },
  })

  async function onSubmit(data: FormData) {
    const payload: OfferCreationRequest = {
      offerPrice: data.offerPrice,
      askPrice: listing.price || 0,
      adId: listing.id,
      sellerId: listing.authorId,
      title: listing.title || "",
    }
    setNewData(payload)
    setDisabled(true)
    console.log("Submit Payload:", payload)
    createOffer(payload)
  }

  return (
    <div>
      <AlertDialog>
        {isFetching ? (
          <AlertDialogTrigger className="relative h-10 w-32 rounded-lg border-2 border-customAccentTwo font-bold text-muted-foreground shadow-lg">
            <p>SEND OFFER</p>
          </AlertDialogTrigger>
        ) : (
          <AlertDialogTrigger
            disabled={offerLimit}
            className={cn(
              "relative h-10 w-32 rounded-lg border-2 border-customAccent font-bold shadow-lg",
              offerLimit && "border-customAccentTwo text-muted-foreground"
            )}
          >
            <div
              id="button"
              className="absolute left-0 top-0 flex h-full w-full"
            />
            {offerLimit && (
              <div
                className={cn(
                  "absolute -left-3 top-12 flex h-10 w-40 rounded-lg border border-muted bg-background p-1 text-center text-xs font-normal text-primary opacity-0 shadow-md",
                  hover && " opacity-1 transition duration-75"
                )}
              >
                You have reached your offer limit for this ad.
              </div>
            )}
            <>
              <p>SEND OFFER</p>
            </>
          </AlertDialogTrigger>
        )}

        <AlertDialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <AlertDialogHeader>
                <AlertDialogTitle className="mb-5 font-bold">
                  Your one step closer to the deal of a lifetime!
                </AlertDialogTitle>
                <div>
                  <div className="mb-5 grid grid-cols-1 gap-2">
                    {/* PRICE */}
                    <FormField
                      control={form.control}
                      name="offerPrice"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex h-5 w-full justify-between">
                            <FormLabel className="py-1 text-primary">
                              Offer amount:
                            </FormLabel>
                            <FormLabel className="py-1 text-xs italic text-rose-400">
                              (required)
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              className="w-full text-primary"
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <p className="text-xs italic">
                      (Note: Once the seller has accepted your offer, you will
                      gain access to the chat area where you&apos;ll make
                      contact with the seller to make arrangments regarding
                      completing the transaction.)
                    </p>
                  </div>
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <div className="flex w-full flex-col justify-between gap-5 md:flex-row">
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
                  <div className="space-x-5">
                    <AlertDialogAction
                      type="submit"
                      disabled={disabled}
                      className="w-20"
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
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
