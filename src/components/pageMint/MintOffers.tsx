"use client"

import React from "react"
import { useParams } from "next/navigation"
import { getAdOffers } from "@/src/server/actions"
import { offerType } from "@/src/types/db"
import { useQuery } from "@tanstack/react-query"

import { ScrollArea } from "../components-ui/ScrollArea"
import MintOfferCard from "./MintOfferCard"
import MintOfferCardSkeleton from "./MintOfferCardSkeleton"

export default function MintOffers() {
  const { mintId }: any = useParams()

  const { data, error, isLoading } = useQuery({
    queryKey: ["adOffers"],
    queryFn: () => getAdOffers(mintId),
  })

  const adOffers = data
  adOffers?.sort((a: any, b: any) => b.offerPrice - a.offerPrice)

  return (
    <ScrollArea className="flex h-full flex-col pr-5 mt-5 pb-12">
      {adOffers &&
        adOffers.map((item: offerType, index) => {
          return isLoading === true ? (
            <MintOfferCardSkeleton />
          ) : (
            <MintOfferCard key={index} adOffer={item} />
          )
        })}
    </ScrollArea>
  )
}
