import React from "react"
import MintCarousel from "@/src/components/pageMint/MintCarousel"
import MintOffer from "@/src/components/pageMint/MintOffer"
import MintPageUsersActions from "@/src/components/pageMint/MintPageUsersActions"
import MintPageAuthorActions from "@/src/components/pageMint/MintPageAuthorActions"
import { db } from "@/src/db"
import { listingsGeneral, offers } from "@/src/db/schema"
import { formatTimeToNow } from "@/src/lib/utils"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth/auth-options"
import { Button } from "@/src/components/components-ui/Button"

interface MintPageProps {
  params: {
    mintId: string
  }
}

export default async function MintPage({ params }: MintPageProps) {
  const param = params
  const decodedParam = decodeURIComponent(param.mintId)

  const session = await getServerSession(authOptions)

  // const listingProperty = await db
  //   .select()
  //   .from(listingsProperty)
  //   .where(eq(listingsProperty.id, decodedParam))
  const listingGeneral = await db
    .select()
    .from(listingsGeneral)
    .where(eq(listingsGeneral.id, decodedParam))

  const mint = [...listingGeneral]

  const adOffers = await db
    .select()
    .from(offers)
    .where(eq(offers.adId, mint[0].id))

  console.log('adOffers:', adOffers)

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
        {mint.map((item, index) => (
          <div key={index} className="mb-60">
            <MintCarousel listing={item.images} />
            <div className="flex flex-row w-full justify-between mt-10">
              <div className="my-auto w-full">
                <div className="flex w-full justify-between">
                  <h1 className="text-2xl font-bold mb-5 text-teal-500">
                    R {formatPrice(item.price)}
                  </h1>
                    {session && item.authorId !== session.user.id && (
                      <MintOffer title={item.title} sellerId={item.authorId} adId={item.id} />
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
                <MintPageAuthorActions listingId={item.id} adOffers={adOffers}/>
                ) : (
                <MintPageUsersActions listingId={item.id}/>
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
