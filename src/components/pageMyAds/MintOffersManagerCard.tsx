import React from "react"
import { cn, formatTimeToNow } from "@/src/lib/utils"
import { offerType } from "@/src/types/db"
import { useSession } from "next-auth/react"

import MintOfferCardAuthorActions from "../pageMintOffers/MintOfferCardAuthorActions"
import MintOfferCardStatus from "../pageMintOffers/MintOfferCardStatus"
import MintOfferCardUserActions from "../pageMintOffers/MintOfferCardUserActions"

interface MintOfferCardProps {
  adOffer: offerType
}

export default function MintOffersManagerCard({ adOffer }: MintOfferCardProps) {
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
    <div className="mx-auto mb-5 flex w-11/12 flex-col justify-between border border-t-muted p-2 text-primary">
      <div className="flex flex-col md:flex-row">
        {/* AD TITLE */}
        <div className=" flex w-full items-center truncate font-semibold text-customAccent">
          <p>{adOffer.adTitle}</p>
        </div>

        {/* STATUS */}
        {/* @ts-expect-error Server Component */}
        <MintOfferCardStatus adOffer={adOffer} />
      </div>

      <div className="mt-2 flex flex-col md:flex-row">
        {/* ASKING PRICE */}
        <div className="flex w-full">
          <h1 className="font-semibold text-primary">Asking price:</h1>
          {askPrice && <h1 className="pl-2">R {formatter.format(askPrice)}</h1>}
        </div>

        {/* OFFER PRICE */}
        <div className="flex w-full">
          <h1 className="font-semibold text-primary">Offer amount:</h1>
          {askPrice && offerPrice && orangePrice && redPrice && (
            <h1
              className={cn(
                "pl-2",
                offerPrice > orangePrice &&
                  offerPrice <= askPrice &&
                  "text-primary",
                offerPrice > askPrice && "font-semibold text-teal-500",
                offerPrice > redPrice &&
                  offerPrice <= orangePrice &&
                  "text-customAccent",
                redPrice >= offerPrice && "text-rose-500"
              )}
            >
              R {formatter.format(offerPrice)}
            </h1>
          )}
        </div>
      </div>

      <div className="mt-2 flex w-full items-center justify-between">
        <div className="flex ">
          <div className="flex w-full gap-1 text-muted-foreground">
            <p className="text-xs italic">sent</p>
            <p className="text-xs italic">
              {formatTimeToNow(adOffer.createdAt!)}
            </p>
          </div>
        </div>

        {/* ACTIONS */}
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
