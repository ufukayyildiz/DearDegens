import React from "react"
import EditListing from "@/src/components/pageEditMint/EditListing"
import { db } from "@/src/server/db"
import { listings, users } from "@/src/server/db/schema"
import { listingsType } from "@/src/types/db"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth/auth-options"
import { redirect } from "next/navigation"

interface MintPageProps {
  params: {
    listingId: string
  }
}

export default async function MintEditPage({ params }: MintPageProps) {
  const param = params
  const decodedParam = decodeURIComponent(param.listingId)
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/signin")
  }

  const listing: listingsType[] = await db
    .select()
    .from(listings)
    .where(eq(listings.id, decodedParam))

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))

  return (
    <div>
      <EditListing listing={listing} user={user} />
    </div>
  )
}
