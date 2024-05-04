import React from "react"
import ShareButtons from "./ShareButtons"
import MintQuery from "../pageMintQueries/MintQuery"
import MintManageOffers from "./MintManageOffers"
import MintManageQueries from "./MintManagerQueries"
import MintAddToWishlist from "../pageMintWishlist/MintAddToWishlist"
import MintReport from "../pageMintReport/MintReport"
import { listingsType } from "@/src/types/db"

interface UserActionsParams {
  listing: listingsType
}

export default function MintPageUsersActions({ listing }: UserActionsParams) {
  return (
    <div className="flex w-full justify-end pr-5">
      <div className=" flex w-4/12 justify-end space-x-5">
        <MintAddToWishlist listing={listing} />
        <MintManageOffers listing={listing} />
        <MintManageQueries listing={listing} />
        <MintQuery listing={listing} />
        <MintReport />
      </div>
    </div>
  )
}
