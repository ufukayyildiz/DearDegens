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

interface MintRenewProps {
  listing: listingsType
}

export default function MintMarkAvailable({ listing }: MintRenewProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const isFetching = useGetListingById(listing.id).isFetching
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { mutate: updateIsExpired } = useMutation({
    mutationFn: async (listingId: any) => {
      setIsLoading(true)
      await axios.patch("/api/editIsSoldRenew", listingId)
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
        description: "Successfully marked your listing as not yet sold.",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        router.refresh()
        await queryClient.invalidateQueries({
          queryKey: ["listing"],
        })
      }
    },
  })

  return (
    <div>
      <Button
        variant="outlineTwo"
        className="w-28"
        onClick={() => updateIsExpired(JSON.stringify(listing.id))}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : isFetching ? (
          <span className="text-muted-foreground">AVAILABLE</span>
        ) : (
          <span>AVAILABLE</span>
        )}
      </Button>
    </div>
  )
}
