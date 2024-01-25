"use client"

import React from "react"
import { useParams } from "next/navigation"
import { getAdOffers } from "@/src/server/actions"
import { useGetOffers } from "@/src/server/services"
import { offerType } from "@/src/types/db"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

import { ScrollArea } from "../components-ui/ScrollArea"
import MintOfferCard from "./MintOfferCard"
import MintOfferCardSkeleton from "./MintOfferCardSkeleton"

export default function MintOffers() {
  const { data: session } = useSession()
  const userId = session?.user.id

  const { mintId }: any = useParams()

  const adOffers = useGetOffers(mintId).data
  const isLoading = useGetOffers(mintId).isLoading
  adOffers?.sort((a: any, b: any) => b.offerPrice - a.offerPrice)

  let offers: offerType[] = []

  if (adOffers) {
    for (let i = 0; i < adOffers.length; i++) {
      if (adOffers[i].userId === userId || adOffers[i].sellerId === userId) {
        offers.push(adOffers[i])
      }
    }
  }

  return (
    <ScrollArea className="flex h-full flex-col pr-5 mt-5 pb-12">
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
