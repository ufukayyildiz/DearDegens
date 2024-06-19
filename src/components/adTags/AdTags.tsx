import React from "react"
import { listingsType } from "@/src/types/db"

import IsHot from "./IsHot"
import IsNew from "./IsNew"
import IsPending from "./IsPending"
import IsSold from "./IsSold"
import IsUrgent from "./IsUrgent"
import IsExpired from "./IsExpired"
import IsNotReviewed from "./isNotReviewed"
import IsRejected from "./IsRejected"

interface MyMintsProps {
  listing: listingsType
}

export default function AdTags({ listing }: MyMintsProps) {
  return (
    <div className="flex w-full gap-3">
      {listing.isNew === true && <IsNew />}
      {listing.isUrgent === true && <IsUrgent />}
      {listing.isHot === true && <IsHot />}
      {listing.isPending === true && <IsPending />}
      {listing.isSold === true && <IsSold />}
      {listing.isExpired === true && <IsExpired />}
      {listing.isReviewed === false && <IsNotReviewed />}
      {listing.nonCompliant === true && <IsRejected />}
    </div>
  )
}
