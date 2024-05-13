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

interface MintRenewProps {
  listing: listingsType
}

export default function MintMarkSold({ listing }: MintRenewProps) {
  const queryClient = useQueryClient()
  const isFetching = useGetListingById(listing.id)
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
        await queryClient.invalidateQueries({ queryKey: ["listing"] })
      }
    },
  })

  return (
    <div>
      <Button
        variant="outlineTwo"
        className="w-32"
        onClick={() => updateIsExpired(JSON.stringify(listing.id))}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : isFetching ? (
          <span>Mark As Sold</span>
        ) : (
          <span className="text-muted-foreground">Mark As Sold</span>
        )}
      </Button>
    </div>
  )
}
