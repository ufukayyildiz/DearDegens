"use client"
import React from "react"
import MintPageAuthorActions from "./MintPageAuthorActions"
import MintPageUsersActions from "./MintPageUsersActions"
import { useSession } from "next-auth/react"
import { listingsType, queryType } from "@/src/types/db"
import {
  useGetOffersAuthor,
  useGetOffersUser,
  useGetQueriesAuthor,
  useGetQueriesUser,
} from "@/src/server/services"
import { offerType } from "@/src/types/db"

interface MintManagerProps {
  listing: listingsType
  domain: string
}

export default function MintManager({ listing, domain }: MintManagerProps) {
  const { data: session } = useSession()
  const userId = session?.user.id!
  const listingId = listing.id

  const userOffers = useGetOffersUser(listingId).data || []
  const userLoading = useGetOffersUser(listingId).isLoading
  const authorOffers = useGetOffersAuthor(listingId).data || []
  const authorLoading = useGetOffersAuthor(listingId).isLoading

  userOffers &&
    userOffers.sort(
      (a: offerType, b: offerType) => b.offerPrice! - a.offerPrice!
    )
  authorOffers &&
    authorOffers.sort(
      (a: offerType, b: offerType) => b.offerPrice! - a.offerPrice!
    )

  const userQueries = useGetQueriesUser(listingId).data || []
  const authorQueries = useGetQueriesAuthor(listingId).data || []

  userQueries &&
    userQueries.sort((a: any, b: any) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })
  authorQueries &&
    authorQueries.sort((a: any, b: any) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })

  console.log("userQueries", userQueries)

  return (
    <div>
      {session?.user.id === listing.authorId ? (
        <MintPageAuthorActions
          queries={authorQueries}
          offers={authorOffers}
          isLoading={authorLoading}
          listing={listing}
          domain={domain}
        />
      ) : (
        <MintPageUsersActions
          queries={userQueries}
          offers={userOffers}
          isLoading={userLoading}
          listing={listing}
          domain={domain}
        />
      )}
    </div>
  )
}
