import React from "react"
import CreateListing from "@/src/components/pageCreateMint/CreateListing"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { getBucket } from "@/src/server/actions"

export default async function MintCreatePage() {
  const queryClient = new QueryClient()

  // BUCKET QUERY
  await queryClient.prefetchQuery({
    queryKey: ["getBucketServer"],
    queryFn: () => getBucket,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateListing />
    </HydrationBoundary>
  )
}
