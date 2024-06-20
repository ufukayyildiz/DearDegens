import React, { useState, useEffect } from "react"
import MintOfferDelete from "./MintOfferDelete"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/components-ui/Tooltip"
import { toast } from "@/src/hooks/use-toast"
import { offerType } from "@/src/types/db"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Check, X } from "lucide-react"

import { Button } from "../components-ui/Button"

interface MintOfferCardProps {
  adOffer: offerType
}

export default function MintOfferCardUserActions({
  adOffer,
}: MintOfferCardProps) {
  const offerId = JSON.stringify(adOffer.id)
  const queryClient = useQueryClient()

  const currentDate = new Date().getTime()
  const createdAt = new Date(adOffer.createdAt!).getTime()
  const oneDay = 24 * 60 * 60 * 1000
  const tenDays = 15 * 24 * 60 * 60 * 1000
  const endDate = createdAt + tenDays
  const differance = (endDate - currentDate) / oneDay
  const daysLeft = Math.ceil(differance)

  const [canDelete, setCanDelete] = useState<boolean>(false)

  useEffect(() => {
    if (daysLeft <= 0) {
      setCanDelete(true)
    }
  }, [])

  // ________________________________________________________________________
  // MUTATION CONFIRMATION
  const { mutate: offerConfirmation } = useMutation({
    mutationFn: async () => {
      const payload = {
        offerId: adOffer && adOffer.id,
        adId: adOffer && adOffer.adId,
        sellerId: adOffer && adOffer.sellerId,
        userId: adOffer && adOffer.userId,
      }
      await axios.put("/api/offerBuyerConfirmation", payload)
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description:
          "Could not update the offer confirmation status. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      return toast({
        title: "Success!",
        description:
          "You have successfully confirmed the offer. Its time to seal the deal!",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["authorOffers", adOffer.adId],
        })
      }
    },
  })

  // ________________________________________________________________________
  // MUTATION ACCEPTANCE
  const { mutate: offerBuyerAcceptance } = useMutation({
    mutationFn: async () => {
      await axios.put("/api/offerBuyerAcceptance", offerId)
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description:
          "Could not updated offer acceptance status. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      return toast({
        title: "Success!.",
        description:
          "You have successfully accepted the offer. You will now be asked for final confirmation.",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["authorOffers", adOffer.adId],
        })
      }
    },
  })

  // ________________________________________________________________________
  // MUTATION DECLINED
  const { mutate: offerBuyerDecline } = useMutation({
    mutationFn: async () => {
      await axios.put("/api/offerBuyerDecline", offerId)
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description:
          "Could not updated offer declined status. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      return toast({
        title: " We're sorry things didn't work out",
        description:
          "You have successfully declined the offer. Maybe next time..",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["authorOffers", adOffer.adId],
        })
      }
    },
  })

  if (
    adOffer.isAccepted === false &&
    adOffer.isCountered === false &&
    adOffer.isDeclined === false
  ) {
    return (
      <MintOfferDelete
        offer={adOffer}
        canDelete={canDelete}
        daysLeft={daysLeft}
      />
    )
  }

  // ________________________________________________________________________
  // DEAL SEALED ACTIONS
  if (adOffer.isConfirmed) {
    return (
      <MintOfferDelete
        offer={adOffer}
        canDelete={canDelete}
        daysLeft={daysLeft}
      />
    )
  }

  // ________________________________________________________________________
  // CONFIRMATION ACTIONS
  if (adOffer.isAccepted) {
    return (
      <div className="flex w-1/2 items-end justify-end gap-1">
        <Button
          onClick={() => offerConfirmation()}
          variant="outlineTwo"
          className="h-8 border-teal-500 hover:text-teal-500"
        >
          Confirm
        </Button>
      </div>
    )
  }

  // ________________________________________________________________________
  // COUNTERED ACTIONS
  if (adOffer.isCountered) {
    return (
      <div className="z-50 flex w-1/2 items-end justify-end gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="focus-visible:outline-none">
              <Button
                onClick={() => offerBuyerDecline()}
                variant="icon"
                size="icon"
                className="hover:text-rose-500"
              >
                <X size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Decline</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Button
                onClick={() => offerBuyerAcceptance()}
                variant="icon"
                size="icon"
                className="hover:text-teal-500"
              >
                <Check size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Accept</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <MintOfferDelete
          offer={adOffer}
          canDelete={canDelete}
          daysLeft={daysLeft}
        />
      </div>
    )
  }
}
