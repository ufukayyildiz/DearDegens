import React from "react"
import MintOfferList from "../pageMintOffers/MintOfferList"
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth/auth-options"
import { listingItemType, listingsType } from "@/src/types/db"
import MintMarkSoldList from "../pageMintActionButtonList/MintMarkSoldList"
import { cn } from "@/src/lib/utils"

interface MintListProps {
  listing: listingsType
}

export default async function MintList({ listing }: MintListProps) {
  const list = JSON.parse(listing.items!)
  const session = await getServerSession(authOptions)

  // PRICE TEXT FORMATTER
  const formatPrice = (price: any) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
    })

    return formatter.format(price)
  }

  if (list[0].name !== "") {
    return (
      <div className="my-5 w-full">
        <hr className="my-2 border border-t-muted-foreground" />
        <h1 className=" mb-2 text-lg font-bold">Items Sold Separately:</h1>
        {list.map((item: listingItemType) => {
          return (
            <div className="pl-2">
              <hr className="border border-dotted border-muted" />
              <div
                key={item.id}
                className="flex h-12 w-full flex-row items-center justify-between"
              >
                <p
                  className={cn(
                    "w-40 truncate md:w-9/12",
                    item.isSold === "true" && "line-through"
                  )}
                >
                  {item.name}
                </p>
                <div className="flex items-center space-x-5">
                  {item.isSold === "false" && (
                    <p className="font-semibold text-customAccent">
                      R {formatPrice(item.price)}
                    </p>
                  )}
                  {session?.user.id !== listing.authorId &&
                    item.isSold === "false" && (
                      <MintOfferList
                        itemId={item.id}
                        itemName={item.name}
                        askPrice={item.price}
                        adId={listing.id}
                        sellerId={listing.authorId}
                        adTitle={listing.title!}
                        url={listing.url}
                      />
                    )}
                  {session?.user.id === listing.authorId &&
                    item.isSold === "false" && (
                      <MintMarkSoldList listing={listing} item={item} />
                    )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  } else {
    return <></>
  }
}
