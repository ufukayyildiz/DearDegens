import React, { useState, useEffect } from "react"
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
import MintOfferDelete from "./MintOfferDelete"
import { Button } from "../components-ui/Button"
import MintCounterTwo from "./MintCounterTwo"

interface MintOfferCardProps {
  adOffer: offerType
}

export default function MintOfferCardAuthorActions({
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
  // ACCEPT OFFER
  const { mutate: acceptOffer } = useMutation({
    mutationFn: async () => {
      await axios.put("/api/offerAcceptance", offerId)
    },
    onError: (error) => {
      if (error) {
        console.log("onError error:", error)
      }
      return toast({
        title: "Something went wrong.",
        description:
          "Could not update offer acceptance status. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      return toast({
        title: "Success!",
        description: `You have accepted the offer for ${adOffer.adTitle}.`,
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
  // REACCEPT OFFER
  const { mutate: reAcceptOffer } = useMutation({
    mutationFn: async () => {
      await axios.put("/api/offerReAcceptance", offerId)
    },
    onError: (error) => {
      if (error) {
        console.log("onError error:", error)
      }
      return toast({
        title: "Something went wrong.",
        description:
          "Could not update offer acceptance status. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      return toast({
        title: "Success!",
        description: `You have accepted the offer for ${adOffer.adTitle}.`,
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
  // DECLINE OFFER
  const { mutate: declineOffer } = useMutation({
    mutationFn: async () => {
      await axios.put("/api/offerDecline", offerId)
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description:
          "Could not update offer declined status. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      return toast({
        title: "Success!",
        description: `The offer of R ${adOffer.offerPrice} was successfully declined.`,
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
  // ALL ACTIONS
  if (
    adOffer.isAccepted === false &&
    adOffer.isCountered === false &&
    adOffer.isDeclined === false
  ) {
    return (
      <div className="flex w-1/2 items-end justify-end gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="focus-visible:outline-none">
              <Button
                variant="icon"
                size="icon"
                className="hover:text-blue-500"
              >
                <MintCounterTwo adOffer={adOffer} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Counter</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger className="focus-visible:outline-none">
              <Button
                variant="icon"
                size="icon"
                className="hover:text-rose-500"
                onClick={() => declineOffer()}
              >
                <X size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Decline</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger className="focus-visible:outline-none">
              <Button
                variant="icon"
                size="icon"
                className="hover:text-customAccent"
                onClick={() => acceptOffer()}
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
  // ACCEPTED ACTIONS
  if (adOffer.isAccepted === true) {
    return (
      <MintOfferDelete
        offer={adOffer}
        canDelete={canDelete}
        daysLeft={daysLeft}
      />
    )
  }

  // ________________________________________________________________________
  // DECLINED ACTIONS
  if (adOffer.isDeclined === true) {
    return (
      <div className="flex w-1/2 items-end justify-end gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="focus-visible:outline-none">
              <Button
                variant="icon"
                size="icon"
                className="hover:text-blue-500"
              >
                <MintCounterTwo adOffer={adOffer} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Counter</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="icon"
                size="icon"
                className="hover:text-teal-500"
                onClick={() => reAcceptOffer()}
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

  // ________________________________________________________________________
  // COUNTERED ACTIONS
  if (adOffer.isCountered === true) {
    return (
      <MintOfferDelete
        offer={adOffer}
        canDelete={canDelete}
        daysLeft={daysLeft}
      />
    )
  }
}
