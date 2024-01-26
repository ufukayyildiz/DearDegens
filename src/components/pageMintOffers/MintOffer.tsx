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
  OfferCreationRequest,
  validateOffer,
} from "@/src/lib/validators/validateOffer"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
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

interface MintProps {
  askPrice: number
  adId: string
  sellerId: string
  title: string | null
}

type FormData = z.infer<typeof validateOffer>

export default function MintOffer({
  askPrice,
  sellerId,
  title,
  adId,
}: MintProps) {
  const queryClient = useQueryClient()
  const [disabled, setDisabled] = useState<boolean>(true)

  const form = useForm<FormData>({
    resolver: zodResolver(validateOffer),
    defaultValues: {
      offerPrice: 0,
      askPrice: askPrice,
      adId: adId,
      sellerId: sellerId,
      title: title,
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
      return toast({
        description: "Your offer is on the way to the seller.",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ["notify"] })
      }
    },
  })

  async function onSubmit(data: FormData) {
    const payload: OfferCreationRequest = {
      offerPrice: data.offerPrice,
      askPrice: askPrice,
      adId: adId,
      sellerId: sellerId,
      title: title,
    }
    setDisabled(true)
    console.log("Submit Payload:", payload)
    createOffer(payload)
  }

  return (
    <div className="">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outlinebold">SEND OFFER</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-bold mb-5">
                  Your one step closer to the deal of a lifetime!
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <div className="grid grid-cols-1 gap-2 mb-5">
                    {/* PRICE */}
                    <FormField
                      control={form.control}
                      name="offerPrice"
                      render={({ field }) => (
                        <FormItem>
                          <div className="w-60 h-5 flex justify-between">
                            <FormLabel className="py-1 text-primary">
                              Offer amount:
                            </FormLabel>
                            <FormLabel className="text-xs italic text-rose-400 py-1">
                              (required)
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              className="w-60 text-primary"
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <p className="italic text-xs">
                      (Note: Once the seller has accepted your offer, you will
                      gain access to the chat area where you&apos;ll make contact
                      with the seller to make arrangments regarding completing
                      the transaction.)
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
                    <AlertDialogAction type="submit" disabled={disabled}>
                      Send
                    </AlertDialogAction>
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
