"use client"
import React, { useState } from "react"
import { useParams } from "next/navigation"
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import MintFilter from "@/src/components/pageMintFilter/MintFilter"
import { Button } from "@/src/components/components-ui/Button"
import CardsFeed from "@/src/components/componentsCards/CardsFeed"
import { Loader2, Filter, Search } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/components-ui/Sheet"

export default function FindAds() {
  const params = useParams()
  const paramsString = JSON.stringify(params?.params)
  const searchParams = paramsString.replace(/-/g, " ")
  const queryClient = useQueryClient()

  const [payload, setPayload] = useState<any>({
    search: searchParams,
    tab: "",
    category: "",
    subCategory: "",
    priceMin: 0,
    priceMax: 9999999,
    location: "",
    mileageMin: 0,
    mileageMax: 300000,
    yearMin: 1900,
    yearMax: 2024,
    transmission: "",
  })

  console.log("Page Payload:", payload)

  const fetchResults = async ({ pageParam }: any) => {
    try {
      const response = await axios.get(
        `/api/search?page=${pageParam}&limit=${5}&searchParam=${searchParams}`,
        { params: { payload } }
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

  const getSetFilterCallback = async (data: any) => {
    setPayload({
      search: searchParams,
      tab: data.tab,
      category: data.category,
      subCategory: data.subCategory,
      priceMin: data.priceMin,
      priceMax: data.priceMax,
      location: data.location,
      mileageMin: data.mileageMin,
      mileageMax: data.mileageMax,
      yearMin: data.yearMin,
      yearMax: data.yearMax,
      transmission: data.transmission,
    })
    await queryClient.invalidateQueries({ queryKey: ["results"] })
  }

  const listings = data?.pages.flatMap((page) => page && page.rows) || [""]
  console.log("listing", listings)

  return (
    <div className="min-w-screen relative w-full">
      <div className="mx-auto mb-52 h-auto min-h-screen w-11/12 min-w-[280px] overflow-hidden md:w-8/12">
        <div className="mt-10 flex flex-col items-center justify-between sm:flex-row ">
          <h1 className="text-xl font-bold">
            Showing results for:{" "}
            <span className="italic text-customAccent">{searchParams}</span>
          </h1>
          <Sheet>
            <SheetTrigger className="fixed right-0 top-40 flex h-20 w-10 items-center justify-center rounded-bl-3xl rounded-tl-3xl border-l-2 border-customAccent bg-background font-bold shadow-xl hover:text-customAccent sm:top-28 sm:my-0 md:static md:h-10 md:w-10 md:rounded-full md:border-2">
              <Filter size={22} />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle className="text-customAccent">
                Filter Results:
              </SheetTitle>
              <MintFilter
                setFilterCallback={getSetFilterCallback}
                initPayload={payload}
              />
            </SheetContent>
          </Sheet>
        </div>
        <hr className="mt-2 h-[2px] w-full bg-muted-foreground" />
        {isFetching ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-10 w-10 animate-spin text-zinc-500" />
          </div>
        ) : listings[0] !== undefined ? (
          <CardsFeed listings={listings} />
        ) : (
          <div className="flex  h-40 w-full items-center justify-center gap-5">
            <Search size={30} />
            <p className="text-center italic">No results found</p>
          </div>
        )}
        {isFetchingNextPage ? (
          <div className="flex justify-center py-10">
            {/* <Loader2 className="h-10 w-10 animate-spin text-zinc-500" /> */}
          </div>
        ) : (
          <Button onClick={() => fetchNextPage()}>Load more</Button>
        )}
      </div>
    </div>
  )
}
