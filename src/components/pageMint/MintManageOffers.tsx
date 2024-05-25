"use client"
import React from "react"
import { Gavel } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components-ui/Sheet"
import { ScrollArea } from "../components-ui/ScrollArea"
import MintOfferCard from "../pageMintOffers/MintOfferCard"
import MintOfferCardSkeleton from "../pageMintOffers/MintOfferCardSkeleton"
import { offerType } from "@/src/types/db"
import Image from "next/image"
import Fish from "@/src/assets/fish.svg"

interface ManageOffersProps {
  offers: offerType[]
  isLoading: boolean
}

export default function MintManageOffers({
  offers,
  isLoading,
}: ManageOffersProps) {
  return (
    <Sheet>
      <SheetTrigger className="group flex h-10 min-w-10 items-center justify-center hover:text-teal-500">
        <Gavel />
      </SheetTrigger>
      <SheetContent className="p-0">
        <SheetHeader className="h-full">
          <SheetTitle className="mx-auto mt-5 w-11/12 text-customAccent">
            Offers:
          </SheetTitle>
          {offers.length === 0 ? (
            <div className="flex w-full flex-col items-center justify-center">
              <div className="w-full pt-10 text-center italic">
                There are no offers available for this listing.
              </div>
              <Image
                src={Fish}
                alt="fish"
                width={100}
                className="mt-10 text-primary"
              />
            </div>
          ) : (
            <ScrollArea className="mt-5 flex h-full flex-col pb-12 pr-2">
              {offers &&
                offers.map((item: any, index) => {
                  return isLoading === true ? (
                    <MintOfferCardSkeleton />
                  ) : (
                    <MintOfferCard key={index} adOffer={item} />
                  )
                })}
            </ScrollArea>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
