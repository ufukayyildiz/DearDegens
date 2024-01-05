import React, { useEffect, useState } from "react"
import { cn, formatTimeToNow } from "@/src/lib/utils"
import { offerType } from "@/src/types/db"
import { Button } from "../components-ui/Button"
import { Check, X, RotateCcw } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/components-ui/Tooltip"

interface MintOfferCardProps {
  adOffer: offerType
}

export default function MintOfferCard({ adOffer }: MintOfferCardProps) {

  const offerPrice = adOffer.offerPrice
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
  })

  const askPrice = adOffer.askPrice
  const orangePrice = askPrice && askPrice * 0.75
  const redPrice = askPrice && askPrice * 0.5

  console.log('ask:', askPrice, "offer", offerPrice, "orange", orangePrice, "red:", redPrice)

  return (
    <div className="h-20 p-2 mb-3 border border-muted text-primary shadow rounded-lg">
      <div className="flex w-full mb-2 justify-between">
        <h1 className="font-bold italic">Offer Amount:</h1>
        {askPrice && offerPrice && orangePrice && redPrice && (
          <h1
            className={cn(
              "italic font-bold",
              offerPrice > orangePrice && offerPrice <= askPrice 
                && "text-primary",
              offerPrice > askPrice 
                && "text-customAccent font-semibold",
              offerPrice > redPrice && offerPrice <= orangePrice 
                && "text-amber-500",
              redPrice >= offerPrice 
                && "text-rose-500"
            )}
          >
            R {formatter.format(offerPrice)}
          </h1>
        )}
      </div>

      <div className="flex">
        <div className="flex flex-col w-1/2">
          <div className="flex w-full gap-1">
            <p className="text-xs italic">Buyer:</p>
            <p className="text-xs">{adOffer.userName}</p>
          </div>
          <div className="flex w-full gap-1 text-muted-foreground">
            <p className="text-xs italic">sent</p>
            <p className="text-xs italic">
              {formatTimeToNow(new Date(adOffer.createdAt))}
            </p>
          </div>
        </div>
        <div className="flex w-1/2 gap-1 items-end justify-end">
        <Tooltip>
            <TooltipTrigger>
              <Button variant="icon" size="icon" className="hover:text-blue-500">
                <RotateCcw size={20}/>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Counter</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="icon" size="icon" className="hover:text-rose-500">
                <X size={20}/>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Decline</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="icon" size="icon" className="hover:text-customAccent">
                <Check size={20}/>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Accept</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

    </div>
  )
}
