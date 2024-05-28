"use client"
import React from "react"
import { listingsType, offerType, queryType } from "@/src/types/db"
import { useSession } from "next-auth/react"
import {
  useGetQueriesManagerAuthor,
  useGetQueriesManagerUser,
} from "@/src/server/services"
import MintQueriesManagerCard from "./MintQueriesManagerCard"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components-ui/Accordion"

export default function QueriesManager() {
  const { data: session } = useSession()
  const userId = session?.user.id!

  const userQueries = useGetQueriesManagerUser().data || []
  const authorQueries = useGetQueriesManagerAuthor().data || []

  console.log("user:", userQueries, "author:", authorQueries)

  userQueries &&
    // @ts-ignore
    userQueries.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

  authorQueries &&
    // @ts-ignore
    authorQueries.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="in">
          <AccordionTrigger>Queries recieved:</AccordionTrigger>
          <AccordionContent>
            {authorQueries &&
              // @ts-ignore
              authorQueries.map((query: queryType) => (
                <MintQueriesManagerCard query={query} userId={userId} />
              ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="out">
          <AccordionTrigger>Queries sent:</AccordionTrigger>
          <AccordionContent>
            {userQueries &&
              // @ts-ignore
              userQueries.map((query: queryType) => (
                <MintQueriesManagerCard query={query} userId={userId} />
              ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
