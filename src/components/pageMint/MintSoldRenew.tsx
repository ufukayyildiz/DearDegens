"use client"
import React, { useState } from "react"
import { Button } from "../components-ui/Button"
import { listingsType } from "@/src/types/db"
import { toast } from "@/src/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Loader2 } from "lucide-react"

interface MintRenewProps {
  listing: listingsType
}

export default function MintSoldRenew({ listing }: MintRenewProps) {
  const queryClient = useQueryClient()

  const [expired, setExpired] = useState<boolean>(listing.isExpired!)
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
      setExpired(false)
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
        className="w-[160px]"
        onClick={() => updateIsExpired(JSON.stringify(listing.id))}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <span>Mark As Available</span>
        )}
      </Button>
    </div>
  )
}
