"use client"
import React, { useState } from "react"
import { Button } from "../components-ui/Button"
import { listingsType } from "@/src/types/db"
import { toast } from "@/src/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface MintRenewProps {
  listing: listingsType
}

export default function MintRenew({ listing }: MintRenewProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { mutate: updateIsExpired } = useMutation({
    mutationFn: async (listingId: any) => {
      setIsLoading(true)
      await axios.patch("/api/editIsExpired", listingId)
    },
    onError: () => {
      setIsLoading(false)
      return toast({
        title: "Something went wrong.",
        description:
          "There was an error renewing your listing. Please try again later.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      setIsLoading(false)
      return toast({
        title: "Success!",
        description: "Successfully renewed your listing.",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        router.refresh()
        await queryClient.invalidateQueries({
          queryKey: ["listing", listing.id],
        })
      }
    },
  })

  return (
    <div>
      <Button
        variant="outlineTwo"
        className="animate-bounce"
        onClick={() => updateIsExpired(JSON.stringify(listing.id))}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <span>RENEW</span>
        )}
      </Button>
    </div>
  )
}
