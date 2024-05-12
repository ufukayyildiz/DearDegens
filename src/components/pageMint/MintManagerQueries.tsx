"use client"
import React from "react"
import { FileQuestion } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components-ui/Sheet"
import { ScrollArea } from "../components-ui/ScrollArea"
import MintQueriesCard from "../pageMintQueries/MintQueriesCard"
import { queryType } from "@/src/types/db"

interface ManageQueriesProps {
  queries: queryType[]
  userId: string
}

export default function MintManageQueries({
  queries,
  userId,
}: ManageQueriesProps) {
  return (
    <Sheet>
      <SheetTrigger className="group flex h-10 w-10 items-center justify-center hover:text-teal-500">
        <FileQuestion className="h-6 w-10" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="h-full">
          <SheetTitle className="mt-5 text-customAccent">Queries:</SheetTitle>
          <ScrollArea className="mt-5 flex h-full flex-col pb-16 pr-5">
            {queries &&
              userId &&
              queries.map((item: any, index) => {
                return (
                  <MintQueriesCard key={index} query={item} userId={userId} />
                )
              })}
          </ScrollArea>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
