import React from "react"
import Link from "next/link"
import { siteConfig } from "@/src/config/site"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { getServerSession } from "next-auth"
import { User } from "lucide-react"
import { authOptions } from "../lib/auth/auth-options"
import { getNotifications } from "../server/actions"
import { AccountNav } from "./AccountNav"
import { Button } from "./components-ui/Button"
import { MainNav } from "./MainNav"
import SearchbarTop from "./SearchbarTop"
import { userType } from "../types/db"

export default async function NavBar() {
  const session = await getServerSession(authOptions)

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["notify"],
    queryFn: getNotifications,
  })

  return (
    <header className="sticky top-0 z-50 flex w-full flex-col items-center justify-center bg-muted/60 px-5 backdrop-blur-xl">
      <div className="relative flex  h-[140px] w-full max-w-[1000px] items-center justify-between space-x-4 sm:h-20 sm:space-x-0">
        <div className="absolute top-5 flex w-full flex-col gap-3 sm:flex-row sm:gap-5 sm:pr-56">
          <MainNav items={siteConfig.mainNav} />
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
          <Button
            variant="icon"
            className="absolute right-0 top-7 h-10 w-10 rounded-full border-2 border-transparent bg-background text-primary shadow-lg hover:text-customAccent"
          >
            <Link href="/signin" className="w-auto">
              <User className="h-6 w-6" />
            </Link>
          </Button>
        )}
      </div>
    </header>
  )
}
