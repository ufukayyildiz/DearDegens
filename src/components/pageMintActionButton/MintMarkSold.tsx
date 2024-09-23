"use client"
import React, { useState } from "react"
import { Button } from "../components-ui/Button"
import { listingsType } from "@/src/types/db"
import { toast } from "@/src/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useGetListingById } from "@/src/server/services"
import { useRouter } from "next/navigation"
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
} from "../components-ui/AlertDialog"

interface MintRenewProps {
  listing: listingsType
}

export default function MintMarkSold({ listing }: MintRenewProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const isFetching = useGetListingById(listing.id)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasFeedback, setHasFeedback] = useState<boolean>(false)

  const { mutate: updateIsExpired } = useMutation({
    mutationFn: async (listingId: any) => {
      setIsLoading(true)
      await axios.patch("/api/editIsSold", listingId)
    },
    onError: () => {
      setIsLoading(false)
      return toast({
        title: "Something went wrong.",
        description:
          "There was an error updating your listing. Please try again later.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      setHasFeedback(true)
      setIsLoading(false)
      return toast({
        title: "Success!",
        description: "Successfully marked your listing as sold.",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        router.refresh()
        await queryClient.invalidateQueries({ queryKey: ["listing"] })
      }
    },
  })

  return (
    <div>
      {!isFetching ? (
        <Button variant="outlineTwo">
          <span className="text-muted-foreground">SOLD</span>
        </Button>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outlineTwo">SOLD</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Mark listing as sold</AlertDialogTitle>
              <AlertDialogDescription>
                You are about to remove your listing from the market. This will
                not delete your listing, however it will no longer be visible to
                other users.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              {hasFeedback ? (
                <AlertDialogAction onClick={() => setHasFeedback(false)}>
                  Close
                </AlertDialogAction>
              ) : (
                <div className="flex flex-row gap-5">
                  <Button
                    variant="outline"
                    className="w-20"
                    onClick={() => updateIsExpired(JSON.stringify(listing.id))}
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <span>Confirm</span>
                    )}
                  </Button>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </div>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}
