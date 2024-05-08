import React from "react"
import MintQuery from "../pageMintQueries/MintQuery"
import MintManageOffers from "./MintManageOffers"
import MintManageQueries from "./MintManagerQueries"
import MintAddToWishlist from "../pageMintWishlist/MintAddToWishlist"
import MintReport from "../pageMintReport/MintReport"
import ChatSheet from "../pageMintChat/ChatSheet"
import { listingsType } from "@/src/types/db"

interface UserActionsParams {
  listing: listingsType
}

export default function MintPageUsersActions({ listing }: UserActionsParams) {
  return (
    <div className="flex w-full justify-end">
      <div className=" flex w-full justify-end space-x-2">
        <MintAddToWishlist listing={listing} />
        <MintManageOffers />
        <MintManageQueries />
        <MintQuery listing={listing} />
        <MintReport listing ={listing}/>
        <ChatSheet listingId={listing.id} />
      </div>
    </div>
  )
}
