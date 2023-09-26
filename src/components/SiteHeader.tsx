import Link from "next/link"
import { siteConfig } from "@/src/config/site"
import { authOptions } from "@/src/lib/auth/auth-options"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

import { db } from "../db/index"
import { notifications, users } from "../db/schema"
import { MainNav } from "./MainNav"
import { NotificationsNav } from "./NotificationsNav"
import { UserAccountNav } from "./UserAccountNav"
import { buttonVariants } from "./components-ui/Button"
import { redirect } from "next/navigation"

export async function SiteHeader() {
  const session = await getServerSession(authOptions)
  const userId = JSON.stringify(session?.user.id)

  if (!session) {
    return console.log('Unauthorised, please login')
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))

  const notification = await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))

  return (
    <header className="sticky top-0 z-50 w-full border-b border-secondary backdrop-blur-md">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-5">
            {/* SIGN IN */}
            {session?.user && user ? (
              <div className="flex items-center space-x-8">
                <NotificationsNav notification={notification} />
                <UserAccountNav
                  user={{
                    name: session.user.name || "",
                    email: session.user.email || "",
                    image: session.user.image || "",
                  }}
                />
              </div>
            ) : (
              <div>

              <Link href="/signin" className={buttonVariants()}>
                Sign In
              </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
