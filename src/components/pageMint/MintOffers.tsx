import React from "react"
import { offerType } from "@/src/types/db"
import MintOfferCard from "./MintOfferCard"
import { ScrollArea } from "../components-ui/ScrollArea";

type MintOfferType = {
  adOffers: offerType[];
};

export default function MintOffers({ adOffers }: MintOfferType) {

  console.log("adOffers sheet:", adOffers);
  const sortedOffers = adOffers && adOffers.slice().sort((a, b) => a.offerPrice - b.offerPrice);


  return (
    <ScrollArea className="flex h-full flex-col pr-5 mt-5 pb-12">
      {adOffers.map((item: offerType, index) => {
        return <MintOfferCard key={index} adOffer={item} />
      })}
    </ScrollArea>
  )
}
