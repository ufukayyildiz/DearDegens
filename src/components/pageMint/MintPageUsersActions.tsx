"use client"

import React from "react"

import { AlertTriangle, Heart } from "lucide-react"

import ChatSheet from "../components-chat/ChatSheet"
import MintQuery from "../pageMintQueries/MintQuery"
import MintManager from "./MintManager"
import MintAddToWishlist from "./MintAddToWishlist"

export default function MintPageUsersActions(listingId: any) {
  return (
    <div className="flex w-full justify-end pr-5">
      <div className=" flex w-4/12 justify-end space-x-5">
        <MintAddToWishlist listingId={listingId} />
        <ChatSheet />
        <MintManager />
        <MintQuery />
        <div className="group flex h-10 w-10 items-center justify-center hover:text-amber-500">
          <AlertTriangle />
        </div>
      </div>
    </div>
  )
}
