import React from "react"
import Link from "next/link"
import { siteConfig } from "@/src/config/site"
import { getServerSession } from "next-auth"

import { authOptions } from "../lib/auth/auth-options"
import { AccountNav } from "./AccountNav"
import { MainNav } from "./MainNav"
import { Button } from "./components-ui/Button"

export default async function NavBar() {
  const session = await getServerSession(authOptions)
  return (
    <header className="sticky top-0 z-50 w-full bg-muted/60 backdrop-blur-xl">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        {/* SIGN IN */}
        {session?.user ? (
          <div>
            {/* @ts-expect-error Server Component */}
            <AccountNav />
          </div>
        ) : (
          <Button variant="outlinebold">
            <Link href="/signin">Sign In</Link>
          </Button>
        )}
      </div>
    </header>
  )
}
