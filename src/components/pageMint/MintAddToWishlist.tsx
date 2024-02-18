"use client"
import React, { useState, useEffect } from "react"
import { Button } from "../components-ui/Button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useGetWishlist } from "@/src/server/services"
import axios from "axios"
import { toast } from "@/src/hooks/use-toast"
import { FaRegHeart, FaHeart } from "react-icons/fa6"
import { cn } from "@/src/lib/utils"
import { wishlistType } from "@/src/types/db"
import { useParams } from "next/navigation"

interface WishListProps {
  listingId: { listingId: string }
}

interface WishlistType {
  wishlistId: string
  userId: string
  itemId: string
  adId: string
  createdAt: Date
}

export default function MintAddToWishlist({ listingId }: WishListProps) {
  const params = useParams()
  // VARIABLES
  const id = { listingId }
  const queryClient = useQueryClient()
  const wishlist = useGetWishlist().data
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false)

  // TOGGLE ISWISHLIST:
  useEffect(() => {
    wishlist &&
      (wishlist as wishlistType).map((item: wishlistType) => {
        if (params && item.adId === params.mintId) {
          setIsInWishlist(true)
        }
      })
  }, [wishlist])

  // MUTATION: ADD TO WISHLIST
  const { mutate: addToWishlist } = useMutation({
    mutationFn: async (listingId: any) => {
      console.log("listingId:", listingId)
      await axios.post("/api/createWishlistItem", listingId)
    },
    onError: () => {
      return toast({
        description: "Error adding listing in wishlist. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      return toast({
        description: "Added to wishlist.",
      })
    },
    onSettled: async (_, error) => {
      setIsInWishlist(true)
      if (error) {
        console.log("onSettled error:", error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ["wishlist"] })
      }
    },
  })

  const handleSubmitAdd = () => {
    addToWishlist(id.listingId)
  }

  // MUTATION: REMOVE FROM WISHLIST
  const { mutate: removeFromWishlist } = useMutation({
    mutationFn: async (listingId: any) => {
      await axios.put("/api/deleteWishlistItem", listingId)
    },
    onError: () => {
      return toast({
        description: "Error removing from wishlist. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      return toast({
        description: "Removed from wishlist.",
      })
    },
    onSettled: async (_, error) => {
      setIsInWishlist(false)
      if (error) {
        console.log("onSettled error:", error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ["wishlist"] })
      }
    },
  })

  const handleSubmitRemove = () => {
    removeFromWishlist(id.listingId)
  }

  // UI
  return isInWishlist === true ? (
    <Button
      onClick={handleSubmitRemove}
      variant="icon"
      className={cn(
        "relative flex h-10 w-10 items-center justify-center text-rose-500 transition duration-75 hover:scale-110"
      )}
    >
      <FaHeart className="absolute h-6 w-6" />
    </Button>
  ) : (
    <Button
      onClick={handleSubmitAdd}
      variant="icon"
      className={cn(
        "relative flex h-10 w-10 items-center justify-center font-semibold hover:scale-110 hover:text-rose-500"
      )}
    >
      <FaRegHeart className="absolute h-6 w-6" />
    </Button>
  )
}
