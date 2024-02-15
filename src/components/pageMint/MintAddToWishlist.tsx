"use client"
import React, { useState, useEffect } from "react"
import { Button } from "../components-ui/Button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useGetWishlist } from "@/src/server/services"
import axios from "axios"
import { toast } from "@/src/hooks/use-toast"
import { Heart } from "lucide-react"
import { cn } from "@/src/lib/utils"

interface WishListProps {
  listingId: { listingId: string }
}

export default function MintAddToWishlist({ listingId }: WishListProps) {
  const id = { listingId }
  const stringId = JSON.stringify(listingId.listingId)
  const queryClient = useQueryClient()
  const wishlist = useGetWishlist().data
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false)

  useEffect(() => {
    // @ts-ignore
    if (wishlist && wishlist.includes(stringId)) {
      setIsInWishlist(true)
    } else {
      setIsInWishlist(false)
    }
  }, [wishlist])

  const { mutate: addToWishlist } = useMutation({
    mutationFn: async (listingId: any) => {
      console.log("listingId:", listingId)
      await axios.patch("/api/addToWishlist", listingId)
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description:
          "Error adding / removing listing in wishlist. Please try again.",
        variant: "destructive",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ["wishlist"] })
      }
    },
  })

  const handleSubmit = () => {
    addToWishlist(id.listingId)
  }

  return (
    <Button
      onClick={handleSubmit}
      variant="icon"
      className={cn(
        "relative flex h-10 w-10 items-center justify-center hover:text-rose-500",
        isInWishlist === true && "animate-pulse text-rose-600"
      )}
    >
      <Heart className="absolute h-6 w-6" />
    </Button>
  )
}
