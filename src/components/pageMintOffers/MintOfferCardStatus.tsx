import React from "react"
import { offerType } from "@/src/types/db"

interface CardStatusProps {
  adOffer: offerType
}

export default function MintOfferCardStatus({ adOffer }: CardStatusProps) {
  if (adOffer.isConfirmed) {
    return (
      <div className="flex w-full justify-between">
        <p className="font-semibold italic">Offer Status:</p>
        <p className="font-semibold italic text-customAccent">
          Deal is sealed!
        </p>
      </div>
    )
  }

  if (adOffer.isAccepted) {
    return (
      <div className="flex w-full justify-between">
        <p className="font-semibold italic">Offer Status:</p>
        <p className="font-semibold italic text-customAccent">
          Accepted, awaiting confirmation
        </p>
      </div>
    )
  }

  if (adOffer.isDeclined) {
    return (
      <div className="flex w-full justify-between">
        <p className="font-semibold italic">Offer Status:</p>
        <p className="font-semibold italic text-rose-500">Declined</p>
      </div>
    )
  }

  if (adOffer.isCountered) {
    return (
      <div className="flex w-full justify-between">
        <p className="font-semibold italic">Offer Status:</p>
        <p className="font-semibold italic text-amber-500">
          Countered @ R {adOffer.counterPrice}
        </p>
      </div>
    )
  }

  if (
    adOffer.isAccepted === false ||
    adOffer.isCountered === false ||
    adOffer.isDeclined === false
  ) {
    return (
      <div className="flex w-full justify-between">
        <p className="font-semibold italic">Offer Status:</p>
        <p className="font-semibold italic">Pending</p>
      </div>
    )
  }
}
