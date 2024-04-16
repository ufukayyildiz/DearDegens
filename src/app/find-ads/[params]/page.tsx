"use client"
import React, { useState } from "react"
import { useParams } from "next/navigation"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import MintCardComponent from "@/src/components/componentsCards/MintCardComponent"
import CardsFeed from "@/src/components/componentsCards/CardsFeed"
import { Loader2 } from "lucide-react"

export default function FindAds() {
  const params = useParams()
  const paramsString = JSON.stringify(params?.params)
  const searchParams = paramsString.replace(/-/g, " ")

  const [payload, setPayload] = useState<any>({
    search: searchParams,
  })

  const fetchResults = async ({ pageParam }: any) => {
    try {
      const response = await axios.get(
        `/api/search?page=${pageParam}&limit=${5}&searchParam=${payload.search}`
      )
      console.log("response:", response)
      return response.data
    } catch (error) {
      console.error("fetch error:", error)
    }
  }

  const { data, fetchNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["results"],
      queryFn: fetchResults,
      initialPageParam: 1,
      getNextPageParam: (_, pages) => {
        return pages.length + 1
      },
    })

  const listings = data?.pages.flatMap((page) => page.rows) || [""]

  return (
    <div className="mx-auto w-11/12 min-w-[280px] overflow-hidden md:w-8/12">
      <h1 className="mt-10 text-xl font-bold">
        Showing results for:{" "}
        <span className="italic text-customAccent">{searchParams}</span>
      </h1>
      <hr className="mb-10 mt-2 h-[2px] w-full bg-muted-foreground" />
      {isFetching ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-10 w-10 animate-spin text-zinc-500" />
        </div>
      ) : (
        <CardsFeed listings={listings}/>
      )}
      {isFetchingNextPage && (
        <div className="flex justify-center py-10">
          <Loader2 className="h-10 w-10 animate-spin text-zinc-500" />
        </div>
      )}
    </div>
  )
}
