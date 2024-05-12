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
      <SheetTrigger className="group flex h-10 w-10 items-center justify-center hover:text-teal-500">
        <Gavel />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="h-full">
          <SheetTitle className="text-customAccent">Offers:</SheetTitle>
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
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
