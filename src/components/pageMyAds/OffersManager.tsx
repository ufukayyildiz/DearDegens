"use client"
import React from "react"
import { listingsType, offerType } from "@/src/types/db"
import { useSession } from "next-auth/react"
import MintOffersManagerCard from "./MintOffersManagerCard"
import {
  useGetOffersManagerAuthor,
  useGetOffersManagerUser,
} from "@/src/server/services"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components-ui/Accordion"
import PlaceholderFish from "../placeholdersEmptyState/PlaceholderFish"

export default function OffersManager() {
  const { data: session } = useSession()
  const userId = session?.user.id!

  const userOffers = (useGetOffersManagerUser().data as offerType[]) || []
  const userLoading = useGetOffersManagerUser().isLoading
  const authorOffers = (useGetOffersManagerAuthor().data as offerType[]) || []
  const authorLoading = useGetOffersManagerAuthor().isLoading

  userOffers &&
    // @ts-ignore
    userOffers.sort((a: offerType, b: offerType) => {
      // @ts-ignore
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })
  authorOffers &&
    // @ts-ignore
    authorOffers.sort((a: offerType, b: offerType) => {
      // @ts-ignore
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })

  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="in">
          <AccordionTrigger className="relative">
            {/* {authorOffers && authorOffers.length > 0 && (
              <div className="absolute -left-8 top-0 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-zinc-100">
                <p className="flex">{authorOffers.length}</p>
              </div>
            )} */}
            Offers recieved:
          </AccordionTrigger>
          <AccordionContent>
            {authorOffers.length !== undefined ? (
              authorOffers.map((offer: offerType) => (
                <MintOffersManagerCard adOffer={offer} />
              ))
            ) : (
              <PlaceholderFish text={"There are no offers available"} />
            )}
          </AccordionContent>
        </AccordionItem>
        <hr className="mb-2 border border-t-muted-foreground" />
        <AccordionItem value="out">
          <AccordionTrigger className="relative">
            {/* {userOffers && userOffers.length > 0 && (
              <div className="absolute -left-8 top-0 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-zinc-100">
                <p className="flex">{userOffers.length}</p>
              </div>
            )} */}
            Offers sent:
          </AccordionTrigger>
          <AccordionContent>
            {userOffers.length !== undefined ? (
              userOffers.map((offer: offerType) => (
                <MintOffersManagerCard adOffer={offer} />
              ))
            ) : (
              <PlaceholderFish text={"There are no offers available"} />
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
