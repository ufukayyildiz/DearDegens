import React from "react"
import MintCarouselTwo from "@/src/components/pageMint/MintCarouselTwo"
import MintPageAuthorActions from "@/src/components/pageMint/MintPageAuthorActions"
import MintPageUsersActions from "@/src/components/pageMint/MintPageUsersActions"
import MintQA from "@/src/components/pageMint/MintQA"
import MintOffer from "@/src/components/pageMintOffers/MintOffer"
import { authOptions } from "@/src/lib/auth/auth-options"
import { formatTimeToNow } from "@/src/lib/utils"
import { getAdOffers, getAdQueries, getListings } from "@/src/server/actions"
import { db } from "@/src/server/db"
import { listings, queries } from "@/src/server/db/schema"
import { listingsType, queryType } from "@/src/types/db"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

interface MintPageProps {
  params: {
    mintId: string
  }
}

export default async function MintPage({ params }: MintPageProps) {
  const param = params
  const decodedParam = decodeURIComponent(param.mintId)
  const session = await getServerSession(authOptions)

  // LISTING QUERY
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["prelisting"],
    queryFn: () => getListings(decodedParam),
  })

  const listing: listingsType[] =
    (await db.select().from(listings).where(eq(listings.id, decodedParam))) ||
    []

  const query: queryType[] =
    (await db.select().from(queries).where(eq(queries.adId, decodedParam))) ||
    []

  // OFFER QUERY
  await queryClient.prefetchQuery({
    queryKey: ["adOffers"],
    queryFn: () => listing && getAdOffers(listing[0].id),
  })

  // QUERIES QUERY
  await queryClient.prefetchQuery({
    queryKey: ["adQueries"],
    queryFn: () => listing && getAdQueries(listing[0].id),
  })

  // PRICE TEXT FORMATTER
  const formatPrice = (price: any) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
    })

    return formatter.format(price)
  }

  return (
    <div className="flex h-auto w-full">
      <div className="mx-auto w-10/12 md:w-8/12">
        {listing &&
          listing.map((item, index) => (
            <div key={index} className="mb-60">
              <MintCarouselTwo listing={item.images} />
              <div className="mt-10 flex w-full flex-row justify-between">
                <div className="my-auto w-full">
                  <div className="flex w-full justify-between">
                    <h1 className="mb-5 text-3xl font-bold text-customAccent">
                      R {formatPrice(item.price)}
                    </h1>
                    {session &&
                      item.price &&
                      item.title &&
                      item.authorId !== session.user.id && (
                        <MintOffer
                          title={item.title}
                          sellerId={item.authorId}
                          adId={item.id}
                          askPrice={item.price}
                        />
                      )}
                  </div>
                  <h1 className="mb-2 text-2xl font-bold">{item.title}</h1>
                  <p className="text-xs italic text-secondary">
                    Listed {formatTimeToNow(item.createdAt!)}
                  </p>
                </div>
              </div>
              <hr className="my-2 border border-t-muted-foreground" />
              <div className="flex min-h-[40px] ">
                {session?.user.id === item.authorId ? (
                  <HydrationBoundary state={dehydrate(queryClient)}>
                    <MintPageAuthorActions listingId={item.id} />
                  </HydrationBoundary>
                ) : (
                  <HydrationBoundary state={dehydrate(queryClient)}>
                    <MintPageUsersActions listingId={item.id} />
                  </HydrationBoundary>
                )}
              </div>
              <hr className="my-2 border border-t-muted-foreground" />
              <h1 className="mt-5 text-lg font-bold">Description</h1>
              <p className="my-5 whitespace-pre-line">{item.description}</p>
              <hr className="my-2 border border-t-muted-foreground" />
              <h1 className="mt-5 text-lg font-bold">Queries</h1>
              <MintQA queries={query} />
            </div>
          ))}
      </div>
    </div>
  )
}
