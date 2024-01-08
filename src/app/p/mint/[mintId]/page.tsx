import React from "react"
import MintCarousel from "@/src/components/pageMint/MintCarousel"
import MintOffer from "@/src/components/pageMint/MintOffer"
import MintPageAuthorActions from "@/src/components/pageMint/MintPageAuthorActions"
import MintPageUsersActions from "@/src/components/pageMint/MintPageUsersActions"
import { authOptions } from "@/src/lib/auth/auth-options"
import { formatTimeToNow } from "@/src/lib/utils"
import { getAdOffers, getListings } from "@/src/server/actions"
import { db } from "@/src/server/db"
import { listings } from "@/src/server/db/schema"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
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

  // LISTING QUERIES
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["prelisting"],
    queryFn: () => getListings(decodedParam),
  })

  const listing = await db
    .select()
    .from(listings)
    .where(eq(listings.id, decodedParam))

  const mint = listing

  // OFFER QUERIES
  await queryClient.prefetchQuery({
    queryKey: ["adOffers"],
    queryFn: () => mint && getAdOffers(mint[0].id),
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
    <div className="flex w-full h-auto">
      <div className="w-10/12 md:w-8/12 mx-auto">
        {mint &&
          mint.map((item, index) => (
            <div key={index} className="mb-60">
              <MintCarousel listing={item.images} />
              <div className="flex flex-row w-full justify-between mt-10">
                <div className="my-auto w-full">
                  <div className="flex w-full justify-between">
                    <h1 className="text-2xl font-bold mb-5 text-customAccent">
                      R {formatPrice(item.price)}
                    </h1>
                    {session &&
                      item.price &&
                      item.authorId !== session.user.id && (
                        <MintOffer
                          title={item.title}
                          sellerId={item.authorId}
                          adId={item.id}
                          askPrice={item.price}
                        />
                      )}
                  </div>
                  <h1 className="text-xl font-bold mb-2">{item.title}</h1>
                  <p className="text-xs italic text-secondary">
                    Listed {formatTimeToNow(new Date(item.createdAt))}
                  </p>
                </div>
              </div>
              <hr className="my-2 border border-t-muted-foreground" />
              <div className="min-h-[40px] flex ">
                {session?.user.id === item.authorId ? (
                  <HydrationBoundary state={dehydrate(queryClient)}>
                    <MintPageAuthorActions listingId={item.id} />
                  </HydrationBoundary>
                ) : (
                  <MintPageUsersActions listingId={item.id} />
                )}
              </div>
              <hr className="my-2 border border-t-muted-foreground" />
              <h1 className="text-lg font-bold mt-5">Description</h1>
              <p className="mt-5 whitespace-pre-line">{item.description}</p>
              <hr className="my-2 border border-t-muted-foreground" />
            </div>
          ))}
      </div>
    </div>
  )
}
