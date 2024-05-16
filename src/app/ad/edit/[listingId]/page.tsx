import React from "react"
import EditListing from "@/src/components/pageEditMint/EditListing"
import { db } from "@/src/server/db"
import { listings } from "@/src/server/db/schema"
import { listingsType } from "@/src/types/db"
import { eq } from "drizzle-orm"

interface MintPageProps {
  params: {
    listingId: string
  }
}

export default async function MintEditPage({ params }: MintPageProps) {
  const param = params
  const decodedParam = decodeURIComponent(param.listingId)

  const listing: listingsType[] = await db
    .select()
    .from(listings)
    .where(eq(listings.id, decodedParam))

  return (
    <div>
      <EditListing listing={listing} />
    </div>
  )
}
