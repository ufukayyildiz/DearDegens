import React from "react"
import { offerType } from "@/src/types/db"

interface CardStatusProps {
  adOffer: offerType
}

export default function MintOfferCardStatus({ adOffer }: CardStatusProps) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
  })

  if (adOffer.isConfirmed) {
    return (
      <div className="flex w-full">
        <p className="text-left text-sm italic text-teal-500">
          Confirmed, chat section unlocked.
        </p>
      </div>
    )
  }

  if (adOffer.isAccepted) {
    return (
      <div className="flex w-full">
        <p className="text-left text-sm italic">
          Offer accepted! Awaiting buyer final confirmation.
        </p>
      </div>
    )
  }

  if (adOffer.isDeclined) {
    return (
      <div className="flex w-full">
        <p className="text-left text-sm italic text-red-500">Offer declined</p>
      </div>
    )
  }

  if (adOffer.isCountered) {
    return (
      <div className="flex w-full">
        <p className="text-left text-sm italic">
          Countered @ R {formatter.format(adOffer.counterPrice!)} - awaiting
          buyer acceptance.
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
      <div className="flex w-full">
        <p className="text-left text-sm italic">
          Awaiting response from the seller.
        </p>
      </div>
    )
  }
}
