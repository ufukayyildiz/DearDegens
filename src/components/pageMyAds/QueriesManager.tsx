"use client"
import React from "react"
import { queriesManagerType, queryType } from "@/src/types/db"
import { useSession } from "next-auth/react"
import {
  useGetQueriesManagerAuthor,
  useGetQueriesManagerUser,
} from "@/src/server/services"
import MintQueriesManagerCardSkeleton from "./MintQueriesManagerCardSkeleton"
import MintQueriesManagerCard from "./MintQueriesManagerCard"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components-ui/Accordion"
import PlaceholderRabbit from "../placeholdersEmptyState/PlaceholderRabbit"

export default function QueriesManager() {
  const { data: session } = useSession()
  const userId = session?.user.id!
  const mock = [1]
  const userQueries =
    (useGetQueriesManagerUser().data as queriesManagerType[]) || []
  const userFetching = useGetQueriesManagerUser().isFetching
  const authorQueries =
    (useGetQueriesManagerAuthor().data as queriesManagerType[]) || []
  const authorFetching = useGetQueriesManagerAuthor().isFetching

  userQueries &&
    // @ts-ignore
    userQueries.sort((a: queriesManagerType, b: queriesManagerType) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

  authorQueries &&
    // @ts-ignore
    authorQueries.sort((a: queriesManagerType, b: queriesManagerType) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="in">
          <AccordionTrigger>Queries recieved:</AccordionTrigger>
          <AccordionContent>
            {authorFetching ? (
              mock.map(() => <MintQueriesManagerCardSkeleton />)
            ) : authorQueries[0] !== undefined ? (
              // @ts-ignore
              authorQueries.map((query: queryType) => (
                <MintQueriesManagerCard query={query} userId={userId} />
              ))
            ) : (
              <PlaceholderRabbit text={"You have not recieved any queries."} />
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="out">
          <AccordionTrigger>Queries sent:</AccordionTrigger>
          <AccordionContent>
            {userFetching ? (
              mock.map(() => <MintQueriesManagerCardSkeleton />)
            ) : userQueries[0] !== undefined ? (
              // @ts-ignore
              userQueries.map((query: queryType) => (
                <MintQueriesManagerCard query={query} userId={userId} />
              ))
            ) : (
              <PlaceholderRabbit text={"You have not yet sent any queries."} />
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
