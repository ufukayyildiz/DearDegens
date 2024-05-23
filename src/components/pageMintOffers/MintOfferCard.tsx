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
    <div className="mb-3 flex h-[100px] flex-col justify-between rounded-lg border border-muted p-2 text-primary shadow-lg transition duration-75 hover:scale-[0.99] hover:border-customAccent">
      <div className="flex w-full justify-end">
        {/* <h1 className="font-bold italic">Offer Amount:</h1> */}
        {askPrice && offerPrice && orangePrice && redPrice && (
          <h1
            className={cn(
              "font-bold italic",
              offerPrice > orangePrice &&
                offerPrice <= askPrice &&
                "text-primary",
              offerPrice > askPrice && "font-semibold text-teal-500",
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
      {/* @ts-expect-error Server Component */}
      <MintOfferCardStatus adOffer={adOffer} />

      <div className="flex">
        <div className="flex w-1/2 flex-col">
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
          /* @ts-expect-error Server Component */
          <MintOfferCardAuthorActions adOffer={adOffer} />
        ) : (
          /* @ts-expect-error Server Component */
          <MintOfferCardUserActions adOffer={adOffer} />
        )}
      </div>
    </div>
  )
}
