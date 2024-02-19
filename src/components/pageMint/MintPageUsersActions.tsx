"use client"

import React from "react"

import ChatSheet from "../components-chat/ChatSheet"
import MintQuery from "../pageMintQueries/MintQuery"
import MintManager from "./MintManager"
import MintAddToWishlist from "../pageMintWishlist/MintAddToWishlist"
import MintReport from "../pageMintReport/MintReport"

export default function MintPageUsersActions(listingId: any) {
  return (
    <div className="flex w-full justify-end pr-5">
      <div className=" flex w-4/12 justify-end space-x-5">
        <MintAddToWishlist listingId={listingId} />
        <ChatSheet />
        <MintManager />
        <MintQuery />
        <MintReport />
      </div>
    </div>
  )
}
