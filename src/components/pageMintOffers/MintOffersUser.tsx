"use client"

import React from "react"
import { useParams } from "next/navigation"
import { useGetOffers, useGetUserOffers } from "@/src/server/services"
import { listingsType, offerType } from "@/src/types/db"
import { useSession } from "next-auth/react"

import { ScrollArea } from "../components-ui/ScrollArea"
import MintOfferCard from "./MintOfferCard"
import MintOfferCardSkeleton from "./MintOfferCardSkeleton"

interface MintOffersProps {
  listing: listingsType
}

export default function MintOffersUser({ listing }: MintOffersProps) {
  const { data: session } = useSession()
  const userId = session?.user.id

  const offers = useGetUserOffers(userId, listing.id).data
  const isLoading = useGetUserOffers(userId, listing.id).isLoading

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
