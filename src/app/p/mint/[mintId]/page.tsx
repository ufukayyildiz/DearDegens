import React from "react"
import MintCarousel from "@/src/components/pageMint/MintCarousel"
import MintOffer from "@/src/components/pageMint/MintOffer"
import MintPageActions from "@/src/components/pageMint/MintPageActions"
import { db } from "@/src/db"
import { listingsGeneral, listingsProperty } from "@/src/db/schema"
import { formatTimeToNow } from "@/src/lib/utils"
import { eq } from "drizzle-orm"

interface MintPageProps {
  params: {
    mintId: string
  }
}

export default async function MintPage({ params }: MintPageProps) {
  const param = params
  const decodedParam = decodeURIComponent(param.mintId)

  const listingProperty = await db
    .select()
    .from(listingsProperty)
    .where(eq(listingsProperty.id, decodedParam))
  const listingGeneral = await db
    .select()
    .from(listingsGeneral)
    .where(eq(listingsGeneral.id, decodedParam))

  const mint = [...listingProperty, ...listingGeneral]

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
          <div key={index}>
            <MintCarousel listing={item.images} />
            <div className="flex flex-row w-full justify-between mt-10">
              <div className="my-auto w-full">
                <div className="flex w-full justify-between">
                  <h1 className="text-2xl font-bold mb-5 text-cyan-500">
                    R {formatPrice(item.price)}
                  </h1>
                  <MintOffer />
                </div>
                <h1 className="text-xl font-bold mb-2">{item.title}</h1>
                <p className="text-xs italic text-secondary">
                  Listed {formatTimeToNow(new Date(item.createdAt))}
                </p>
              </div>
            </div>
            <hr className="my-2 border border-t-muted-foreground" />
            <MintPageActions listingId={item.id}/>
            <hr className="my-2 border border-t-muted-foreground" />
            <h1 className="text-lg font-bold mt-5">Description</h1>
            <p className="mt-5">{item.description}</p>
            <hr className="my-2 border border-t-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  )
}
