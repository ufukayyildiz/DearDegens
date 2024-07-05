import React from "react"
import CreateListing from "@/src/components/pageCreateMint/CreateListing"
import { db } from "@/src/server/db"
import { users } from "@/src/server/db/schema"
import { eq } from "drizzle-orm"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { getBucket } from "@/src/server/actions"
import { authOptions, getAuthSession } from "@/src/lib/auth/auth-options"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function MintCreatePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/signin")
  }

  const queryClient = new QueryClient()

  // BUCKET QUERY
  await queryClient.prefetchQuery({
    queryKey: ["getBucketServer"],
    queryFn: () => getBucket,
  })

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateListing user={user} />
    </HydrationBoundary>
  )
}
