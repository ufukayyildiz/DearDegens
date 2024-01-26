import React from "react"
import { listingsType } from "@/src/types/db"

import IsHot from "./IsHot"
import IsNew from "./IsNew"
import IsPending from "./IsPending"
import IsSold from "./IsSold"
import IsUrgent from "./IsUrgent"

interface MyMintsProps {
  listing: listingsType
}

export default function AdTags({ listing }: MyMintsProps) {
  return (
    <div className="flex gap-3 w-full">
      {listing.isNew === true && <IsNew />}
      {listing.isUrgent === true && <IsUrgent />}
      {listing.isHot === true && <IsHot />}
      {listing.isPending === true && <IsPending />}
      {listing.isSold === true && <IsSold />}
    </div>
  )
}
