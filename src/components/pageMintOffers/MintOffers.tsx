"use client"

import React from "react"
import { useParams } from "next/navigation"
import { useGetOffers } from "@/src/server/services"
import { listingsType, offerType } from "@/src/types/db"
import { useSession } from "next-auth/react"

import { ScrollArea } from "../components-ui/ScrollArea"
import MintOfferCard from "./MintOfferCard"
import MintOfferCardSkeleton from "./MintOfferCardSkeleton"


export default function MintOffers() {
  const { data: session } = useSession()
  const userId = session?.user.id
  const params = useParams()
  const {listingId}: any = params
  const id = listingId.toString()

  const adOffers = useGetOffers(id).data
  const isLoading = useGetOffers(id).isLoading
  adOffers?.sort((a: any, b: any) => b.offerPrice - a.offerPrice)

  console.log('adOffers', adOffers)

  let offers: offerType[] = []

  console.log('offers:', offers)
  if (adOffers) {
    for (let i = 0; i < adOffers.length; i++) {
      if (adOffers[i].userId === userId || adOffers[i].sellerId === userId) {
        offers.push(adOffers[i])
      }
    }
  }

  return (
    <ScrollArea className="mt-5 flex h-full flex-col pb-12 pr-5">
      {offers &&
        offers.map((item: any, index) => {
          return isLoading === true ? (
            <MintOfferCardSkeleton />
          ) : (
            <MintOfferCard key={index} adOffer={item} />
          )
        })}
    </ScrollArea>
  )
}
