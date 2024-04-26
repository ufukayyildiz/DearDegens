import React from "react"
import ShareButtons from "./ShareButtons"
import MintQuery from "../pageMintQueries/MintQuery"
import MintManager from "./MintManagerQueries"
import MintAddToWishlist from "../pageMintWishlist/MintAddToWishlist"
import MintReport from "../pageMintReport/MintReport"

interface UserActionsParams {
  listingId: string
}

export default function MintPageUsersActions(listingId: UserActionsParams) {
  return (
    <div className="flex w-full justify-end pr-5">
      <div className=" flex w-4/12 justify-end space-x-5">
        <MintAddToWishlist listingId={listingId} />
        <MintManager />
        <MintQuery />
        <MintReport />
      </div>
    </div>
  )
}
