"use client"
import React, { useState, useEffect } from "react"
import MintOffer from "../pageMintOffers/MintOffer"
import MintRenew from "./MintRenew"
import MintMarkSold from "./MintMarkSold"
import MintMarkAvailable from "./MintMarkAvailable"
import { useGetListingById } from "@/src/server/services"
import { useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { listingsType } from "@/src/types/db"

interface MintActionButtonProps {
  listing: listingsType
}

export default function MintActionButton({ listing }: MintActionButtonProps) {
  const { data: session } = useSession()
  const listingQuery = useGetListingById(listing.id).data || []
  const listingData = listingQuery[0]

  // _______________________________________________________________________
  // CHECK IS SOLD
  const [isSold, setIsSold] = useState<boolean>(false)
  useEffect(() => {
    if (listing && listing.isSold === true) {
      setIsSold(true)
    }
  }, [])

  // _______________________________________________________________________
  // RENDERS

  if (!session) {
    return null
  }

  if (listing && listing.isExpired === true && listing.wasRenewed === true) {
    return null
  }

  if (listing && listing.isExpired === true) {
    return <MintRenew listing={listing} />
  }

  if (listing && listing.isExpired === false) {
    return !isSold ? (
      <MintMarkSold listing={listing} />
    ) : (
      <MintMarkAvailable listing={listing} />
    )
  }
}
