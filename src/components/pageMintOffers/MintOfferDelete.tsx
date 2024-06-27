import React, { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/components-ui/AlertDialog"
import { Button } from "../components-ui/Button"
import { Checkbox } from "../components-ui/Checkbox"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "@/src/hooks/use-toast"
import { useQueryClient } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
import { offerType } from "@/src/types/db"

interface MintOfferDeleteProps {
  offer: offerType
  canDelete: boolean
  daysLeft: number
}

export default function MintOfferDelete({
  offer,
  canDelete,
  daysLeft,
}: MintOfferDeleteProps) {
  const [disabled, setDisabled] = useState<boolean>(true)
  const queryClient = useQueryClient()

  const { mutate: handleDeleteOffer } = useMutation({
    mutationFn: async (offer: offerType) => {
      const payload = {
        offerId: offer.id,
        offerSellerId: offer.sellerId,
        offerUserId: offer.userId,
        offerAdId: offer.adId,
      }
      await axios.put("/api/deleteOffer", payload)
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "We were unable to delete this offer. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      setDisabled(true)
      return toast({
        title: "Success!",
        description: "Successfully deleted offer.",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ["authorOffersManager"] })
        await queryClient.invalidateQueries({ queryKey: ["userOffersManager"] })
      }
    },
  })

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="flex h-8 w-8 items-center justify-center rounded-full text-secondary hover:text-red-500">
            <Trash2 className="h-5 w-5" />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete your offer?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone and your offer will be permanantly
              deleted, after which the seller will be notified.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {canDelete === true ? (
              <div className="flex w-full flex-col justify-between gap-5 md:flex-row">
                <div className="flex items-center justify-start space-x-2">
                  <Checkbox
                    id="disable"
                    checked={!disabled}
                    onCheckedChange={() => setDisabled(!disabled)}
                  />
                  <label
                    htmlFor="disable"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Confirm deletion of offer.
                  </label>
                </div>
                <div>
                  <AlertDialogTrigger asChild>
                    <Button
                      onClick={() => handleDeleteOffer(offer)}
                      disabled={disabled && canDelete}
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogCancel className="ml-5" onClick={() => setDisabled(true)}>Cancel</AlertDialogCancel>
                </div>
              </div>
            ) : (
              <div className="flex w-full flex-row items-center justify-between">
                <p className="w-full text-sm italic text-red-500">
                  There are {daysLeft} days left before this offer can be
                  deleted.
                </p>
                <AlertDialogCancel className="ml-5">Cancel</AlertDialogCancel>
              </div>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
