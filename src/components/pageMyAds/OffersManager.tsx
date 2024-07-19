"use client"
import React from "react"
import { offerType, offersManagerType } from "@/src/types/db"
import MintOffersManagerCard from "./MintOffersManagerCard"
import MintOffersManagerCardSkeleton from "./MintOffersManagerCardSkeleton"
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
  const mock = [1, 2, 3]
  const userOffers =
    (useGetOffersManagerUser().data as offersManagerType[]) || []
  const userFetching = useGetOffersManagerUser().isFetching
  const authorOffers =
    (useGetOffersManagerAuthor().data as offersManagerType[]) || []
  const authorFetching = useGetOffersManagerAuthor().isFetching

  userOffers &&
    // @ts-ignore
    userOffers.sort((a: offersManagerType, b: offersManagerType) => {
      // @ts-ignore
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })
  authorOffers &&
    // @ts-ignore
    authorOffers.sort((a: offersManagerType, b: offersManagerType) => {
      // @ts-ignore
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })

  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="in">
          <AccordionTrigger className="relative">
            Offers recieved:
          </AccordionTrigger>
          <AccordionContent>
            {authorFetching ? (
              mock.map((item) => <MintOffersManagerCardSkeleton />)
            ) : authorOffers[0] !== undefined ? (
              authorOffers.map((offer: offersManagerType) => (
                <MintOffersManagerCard adOffer={offer} />
              ))
            ) : (
              <PlaceholderFish text={"You have not recieved any offers"} />
            )}
          </AccordionContent>
        </AccordionItem>
        <hr className="mb-2 border border-t-muted-foreground" />
        <AccordionItem value="out">
          <AccordionTrigger className="relative">Offers sent:</AccordionTrigger>
          <AccordionContent>
            {userFetching ? (
              mock.map((item) => <MintOffersManagerCardSkeleton />)
            ) : userOffers[0] !== undefined ? (
              userOffers.map((offer: offersManagerType) => (
                <MintOffersManagerCard adOffer={offer} />
              ))
            ) : (
              <PlaceholderFish text={"You have not sent any offers."} />
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
