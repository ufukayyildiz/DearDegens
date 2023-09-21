import Link from "next/link"
import { ThemeToggle } from "@/src/components/components-global/theme-toggle"
import { siteConfig } from "@/src/config/site"
import { authOptions } from "@/src/lib/auth/auth-options"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

import { db } from "../db/index"
import { users } from "../db/schema"
import { MainNav } from "./MainNav"
import { UserAccountNav } from "./UserAccountNav"
import { buttonVariants } from "./components-ui/Button"

export async function SiteHeader() {
  const session = await getServerSession(authOptions)

  if (session == null) {
    return console.log("No session, please login..")
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))

  return (
    <header className="sticky top-0 z-50 w-full border-b border-secondary backdrop-blur-md">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-5">
            {/* SIGN IN */}
            {session?.user && user ? (
              <UserAccountNav
                user={{
                  name: session.user.name || "",
                  email: session.user.email || "",
                  image: session.user.image || "",
                }}
              />
            ) : (
              <Link href="/signin" className={buttonVariants()}>
                Sign In
              </Link>
            )}

          </nav>
        </div>
      </div>
    </header>
  )
}
