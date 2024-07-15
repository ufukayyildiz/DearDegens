"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { listingsType, userType } from "@/src/types/db"
import { useGetUserSubscription } from "@/src/server/services"
import axios, { AxiosError } from "axios"
import React from "react"
import { Button } from "../components-ui/Button"
import { Loader2 } from "lucide-react"
import { products } from "@/src/lib/categories/Products"
import { payfastAPI, productType } from "@/src/types/subscription"
import { formatDateFromTimestamp, formatPrice } from "@/src/lib/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "@/src/hooks/use-toast"
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
import { Label } from "../components-ui/Label"
import { Checkbox } from "../components-ui/Checkbox"

type imageArray = string[] | undefined
interface ProfileAccountProps {
  user: userType[]
  isFetching: boolean
  listings: listingsType[]
  images: imageArray
}

export default function ProfileAccount({
  user,
  isFetching,
  listings,
  images,
}: ProfileAccountProps) {
  const queryClient = useQueryClient()
  const [disabled, setDisabled] = useState<boolean>(true)
  const [isPending, setIsPending] = useState<boolean>(false)
  const [subscription, setSubscription] = useState<any>({
    id: products[0].id,
    name: products[0].name,
    images: products[0].images,
    ads: products[0].ads,
    price: products[0].price,
  })

  console.log("subscription", subscription)

  let token: string = ""
  let maxImages: number = products[0].images
  let maxAds: number = products[0].ads

  if (user && user[0].subscriptionToken !== (undefined || "")) {
    token = user[0].subscriptionToken
  }

  if (user && user[0].subscription !== (undefined || "")) {
    console.log("max", user, user[0].maxImages)
    maxImages = user[0].maxImages
    maxAds = user[0].maxAds
  }

  const payfastData = useGetUserSubscription(token).data as payfastAPI
  const subAmt = (payfastData && JSON.stringify(payfastData.amount)) || "none"
  const subPrice = payfastData && subAmt.substring(0, subAmt.length - 2)

  const setUserSubscription = () => {
    switch (user && user[0].subscription) {
      case products[0].id:
        setSubscription({
          id: products[0].id,
          name: products[0].name,
          images: maxImages,
          ads: maxAds,
          price: products[0].price,
        })
        break
      case products[1].id:
        setSubscription({
          id: products[0].id,
          name: products[0].name,
          images: maxImages,
          ads: maxAds,
          price: products[0].price,
        })
        break
      case products[2].id:
        setSubscription({
          id: products[2].id,
          name: products[2].name,
          images: products[2].images,
          ads: products[2].ads,
          price: products[2].price,
        })
        break
      case products[3].id:
        setSubscription({
          id: products[3].id,
          name: products[3].name,
          images: products[3].images,
          ads: products[3].ads,
          price: products[3].price,
        })
        break

      default:
        setSubscription({
          id: products[0].id,
          name: products[0].name,
          images: maxImages,
          ads: maxAds,
          price: products[0].price,
        })
    }
  }

  useEffect(() => {
    setUserSubscription()
  }, [token, user])

  const { mutate: handleCancelSubscription } = useMutation({
    mutationFn: async (token: string) => {
      const payload = {
        token: token,
      }
      setIsPending(true)
      await axios.put("/api/cancelSubscription", payload)
    },
    onError: (error: AxiosError) => {
      setIsPending(false)
      if (error.status === 401) {
        return toast({
          title: "Unauthorised.",
          description:
            "You are not authorised to send this request, please login.",
          variant: "destructive",
        })
      }
      if (error.status === 409) {
        return toast({
          title: "No Subscription Token Found.",
          description:
            "No subscription token supplied, please try again. If the error persists, please contact support",
          variant: "destructive",
        })
      }
      if (error.status === 500) {
        return toast({
          title: "Something went wrong.",
          description:
            "Error cancelling your subscription, please try again. If the error persists, please contact support",
          variant: "destructive",
        })
      }
    },
    onSuccess: () => {
      setIsPending(false)
      return toast({
        title: "Success!",
        description: "Your subscription was cancelled successfully.",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ["userSubscription"] })
      }
    },
  })

  return (
    <div className="space-y-5 text-primary">
      <h2 className="mb-5 font-bold text-customAccent">
        Subscription Details:
      </h2>
      <div className="grid w-full grid-cols-1 items-center md:grid-cols-2">
        <p className="h-6 w-full font-bold">Subscription Plan:</p>
        {isFetching ? (
          <p className="mt-1 h-10 w-60 animate-pulse rounded-full pt-2 italic text-muted-foreground md:mt-0 md:pl-3">
            {products[0].name}
          </p>
        ) : (
          <p className="mt-1 h-10 w-full pt-2 italic text-primary md:mt-0 md:pl-3">
            {subscription.name}
          </p>
        )}
      </div>
      <div className="grid w-full grid-cols-1 items-center md:grid-cols-2">
        <p className="h-6 w-full font-bold">Available Ad Space:</p>
        {isFetching ? (
          <p className="mt-1 h-10 w-60 animate-pulse rounded-full pt-2 italic text-muted-foreground md:mt-0 md:pl-3">
            0 / {products[0].ads}
          </p>
        ) : (
          <p className="mt-1 h-10 w-full pt-2 italic text-primary md:mt-0 md:pl-3">
            {listings.length} / {subscription.ads}
          </p>
        )}
      </div>
      <div className="grid w-full grid-cols-1 items-center md:grid-cols-2">
        <p className="h-6 w-full font-bold">Available Image Space:</p>
        {isFetching ? (
          <p className="mt-1 h-10 w-60 animate-pulse rounded-full pt-2 italic text-muted-foreground md:mt-0 md:pl-3">
            0 / {products[0].images}
          </p>
        ) : (
          <p className="mt-1 h-10 w-full pt-2 italic text-primary md:mt-0 md:pl-3">
            {images && images[0].length} / {subscription.images}
          </p>
        )}
      </div>
      {user && token !== (undefined || "") && payfastData !== undefined && (
        <div className="w-full px-2">
          <div className="w-full items-center rounded-lg border border-muted bg-muted p-2 pb-3 text-xs shadow-md">
            <div className="grid w-full grid-cols-2 items-center">
              <p className="h-6 w-full font-bold">Status:</p>
              <p className="h-6 w-full italic text-primary md:mt-0 md:pl-3">
                {payfastData.status_text}
              </p>
            </div>
            <div className="grid w-full grid-cols-2 items-center">
              <p className="h-6 w-full font-bold">Amount p/Month:</p>
              <p className="h-6 w-full italic text-primary md:mt-0 md:pl-3">
                R {subPrice}.00
              </p>
            </div>
            <div className="grid w-full grid-cols-2 items-center">
              <p className="h-6 w-full font-bold">Next Billing Date:</p>
              <p className="h-6 w-full italic text-primary md:mt-0 md:pl-3">
                {formatDateFromTimestamp(payfastData.run_date!)}
              </p>
            </div>
            <div className="grid w-full grid-cols-2 items-center">
              <p className="h-6 w-full font-bold">Cycles:</p>
              <p className="h-6 w-full italic text-primary md:mt-0 md:pl-3">
                {payfastData.cycles}
              </p>
            </div>
            <div className="grid w-full grid-cols-2 items-center">
              <p className="h-6 w-full font-bold">Cycles Complete:</p>
              <p className="h-6 w-full italic text-primary md:mt-0 md:pl-3">
                {payfastData.cycles_complete}
              </p>
            </div>
            <div className="grid w-full grid-cols-2 items-center">
              <p className="h-6 w-full font-bold">Token:</p>
              <p className="h-6 w-full italic text-primary md:mt-0 md:pl-3">
                {payfastData.token}
              </p>
            </div>
          </div>
          <p className="mt-5 py-2 text-sm text-primary">
            This is a recurring billing service that will be charged monthly
            over a period of 12 billing cycles. DearDegens.com does not offer
            refunds, and users can cancel their subscriptions at any time with
            immediate effect.
          </p>
          <div className="mt-5 flex w-full items-center justify-center md:justify-end">
            <AlertDialog>
              <AlertDialogTrigger className="flex h-10 items-center justify-center rounded-full border-2 border-customAccent bg-background px-3 text-sm font-semibold shadow-lg hover:text-customAccent">
                <p>CANCEL SUBSCRIPTION</p>{" "}
                {isPending && (
                  <Loader2 className="ml-2 animate-spin" size={15} />
                )}
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="mb-5 font-bold">
                    Are you sure you would like to cancel your subscription?
                  </AlertDialogTitle>
                  <div>
                    <div className="mb-5 grid grid-cols-1 gap-2 text-left">
                      We&apos;re sorry to see you leave, you&apos;re welcome
                      back anytime! Please feel free to email us at:
                      <Link
                        href="mailto:support@deardegens.com"
                        className="flex text-customAccent underline"
                      >
                        support@deardegens.com
                      </Link>
                      If you would like to leave some feedback about your
                      experience and where we can improve.
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
                        disabled={disabled}
                        className="w-20"
                        onClick={() => handleCancelSubscription(token)}
                      >
                        Confirm
                      </AlertDialogAction>
                      <AlertDialogCancel onClick={() => setDisabled(true)}>
                        Cancel
                      </AlertDialogCancel>
                    </div>
                  </div>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
    </div>
  )
}
