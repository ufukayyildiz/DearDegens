import React from "react"
import { cn, formatTimeToNow } from "@/src/lib/utils"
import { offerType } from "@/src/types/db"
import { useSession } from "next-auth/react"

import MintOfferCardAuthorActions from "./MintOfferCardAuthorActions"
import MintOfferCardStatus from "./MintOfferCardStatus"
import MintOfferCardUserActions from "./MintOfferCardUserActions"

interface MintOfferCardProps {
  adOffer: offerType
}

export default function MintOfferCard({ adOffer }: MintOfferCardProps) {
  const { data: session } = useSession()
  const userId = session?.user.id
  const offerPrice = adOffer.offerPrice
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
  })

  const askPrice = adOffer.askPrice
  const orangePrice = askPrice && askPrice * 0.75
  const redPrice = askPrice && askPrice * 0.5

  return (
    <div className="flex flex-col h-[120px] p-2 mb-3 border border-muted justify-between text-primary shadow rounded-lg transition duration-500 hover:scale-[0.99]">
      <div className="flex w-full justify-between">
        <h1 className="text-lg font-bold italic">Offer Amount:</h1>
        {askPrice && offerPrice && orangePrice && redPrice && (
          <h1
            className={cn(
              "italic text-lg font-bold",
              offerPrice > orangePrice &&
                offerPrice <= askPrice &&
                "text-primary",
              offerPrice > askPrice && "text-customAccent font-semibold",
              offerPrice > redPrice &&
                offerPrice <= orangePrice &&
                "text-amber-500",
              redPrice >= offerPrice && "text-rose-500"
            )}
          >
            R {formatter.format(offerPrice)}
          </h1>
        )}
      </div>

      <MintOfferCardStatus adOffer={adOffer} />

      <div className="flex">
        <div className="flex flex-col w-1/2">
          <div className="flex w-full gap-1">
            <p className="text-xs italic">Buyer:</p>
            <p className="text-xs">{adOffer.userName}</p>
          </div>
          <div className="flex w-full gap-1 text-muted-foreground">
            <p className="text-xs italic">sent</p>
            <p className="text-xs italic">
              {formatTimeToNow(adOffer.createdAt!)}
            </p>
          </div>
        </div>

        {userId === adOffer.sellerId ? (
          <MintOfferCardAuthorActions adOffer={adOffer} />
        ) : (
          <MintOfferCardUserActions adOffer={adOffer} />
        )}
      </div>
    </div>
  )
}
