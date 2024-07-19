"use client"
import React, { useState } from "react"
import { Button } from "../components-ui/Button"
import { listingItemType, listingsType } from "@/src/types/db"
import { toast } from "@/src/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useGetListingById } from "@/src/server/services"
import { useRouter } from "next/navigation"

interface MintSoldProps {
  item: listingItemType
  listing: listingsType
}

export default function MintMarkSoldList({ item, listing }: MintSoldProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { mutate: updateIsSold } = useMutation({
    mutationFn: async () => {
      const payload = {
        itemId: item.id,
        listingId: listing.id,
      }
      setIsLoading(true)
      await axios.patch("/api/editIsSoldItem", payload)
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
        router.refresh()
        await queryClient.invalidateQueries({ queryKey: ["listing"] })
      }
    },
  })

  return (
    <div>
      <Button
        variant="outlineTwo"
        className="h-8 w-16"
        onClick={() => updateIsSold()}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <span className="text-xs">SOLD</span>
        )}
      </Button>
    </div>
  )
}
