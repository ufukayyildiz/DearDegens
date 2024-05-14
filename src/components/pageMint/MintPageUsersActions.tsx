"use client"
import React from "react"
import MintQuery from "../pageMintQueries/MintQuery"
import MintManageOffers from "./MintManageOffers"
import MintManageQueries from "./MintManagerQueries"
import MintAddToWishlist from "../pageMintWishlist/MintAddToWishlist"
import MintReport from "../pageMintReport/MintReport"
import ChatSheet from "../pageMintChat/ChatSheet"
import { listingsType } from "@/src/types/db"
import { useSession } from "next-auth/react"
import { offerType, queryType } from "@/src/types/db"
import ShareButtons from "./ShareButtons"

interface UserActionsProps {
  listing: listingsType
  offers: offerType[]
  queries: queryType[]
  isLoading: boolean
  domain: string
}

export default function MintPageUsersActions({
  offers,
  queries,
  listing,
  isLoading,
  domain,
}: UserActionsProps) {
  const { data: session } = useSession()
  const userId = session?.user.id!

  return (
    <div className="flex w-full justify-end">
      <div className=" flex w-full justify-end space-x-2">
        <ShareButtons domain={domain} />
        <MintAddToWishlist listing={listing} />
        <MintManageOffers offers={offers} isLoading={isLoading} />
        <MintManageQueries queries={queries} userId={userId} />
        <MintQuery listing={listing} />
        <MintReport listing={listing} />
        <ChatSheet listingId={listing.id} />
      </div>
    </div>
  )
}
