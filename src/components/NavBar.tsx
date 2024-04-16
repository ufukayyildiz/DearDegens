import React from "react"
import Link from "next/link"
import { siteConfig } from "@/src/config/site"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { getServerSession } from "next-auth"

import { authOptions } from "../lib/auth/auth-options"
import { getNotifications } from "../server/actions"
import { AccountNav } from "./AccountNav"
import { Button } from "./components-ui/Button"
import { MainNav } from "./MainNav"
import SearchbarBottom from "./SearchbarBottom"
import SearchbarTop from "./SearchbarTop"

export default async function NavBar() {
  const session = await getServerSession(authOptions)

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["notify"],
    queryFn: getNotifications,
  })

  return (
    <header className="sticky top-0 z-50 flex w-full flex-col bg-muted/60 backdrop-blur-xl">
      <div className="container flex h-20 w-full items-center justify-between space-x-4 sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="w-full px-8">
          {/* @ts-expect-error Server Component */}
          <SearchbarTop />
        </div>
        {/* SIGN IN */}
        {session?.user ? (
          <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
              {/* @ts-expect-error Server Component */}
              <AccountNav />
            </HydrationBoundary>
          </div>
        ) : (
          <Button variant="outlinebold" className="rounded-full bg-transparent">
            <Link href="/signin">Sign In</Link>
          </Button>
        )}
      </div>
      <div className="w-full px-8 pb-5 md:pb-0">
        {/* @ts-expect-error Server Component */}
        <SearchbarBottom />
      </div>
    </header>
  )
}
