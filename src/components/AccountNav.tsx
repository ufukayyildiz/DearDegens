import { authOptions } from "@/src/lib/auth/auth-options"
import { eq, sql } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { userType } from "../types/db"
import { users } from "..//server/db/schema"
import { db } from "../server/db"
import { NotificationsNav } from "./NotificationsNav"
import { UserAccountNav } from "./UserAccountNav"
import { redirect } from "next/navigation"
import ChatSheetUser from "./pageMintChat/ChatSheetUser"
import { products } from "../lib/categories/Products"
import { getUserSubscription } from "../server/actions"
import { subscriptionType } from "../types/subscription"

export async function AccountNav() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/signin")
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))

  const admin: userType[] = (
    await db.execute(sql.raw(`SELECT * FROM users WHERE "admin" = 't'`))
  ).rows

  const token = user[0].subscriptionToken

  if (token) {
    try {
      const userSub: subscriptionType = await getUserSubscription(token)
      console.log("User Sub:", userSub)

      if (userSub.status_text !== "ACTIVE") {
        let subscriptionId: string = products[0].id

        if (user[0].maxAds! > products[0].ads) {
          subscriptionId = products[1].id
        }

        await db
          .update(users)
          .set({ subscription: subscriptionId, subscriptionToken: "" })
          .where(eq(users.id, session.user.id))
      }

      console.log("User subscription checked")
    } catch (error) {
      console.log("Error checking user subscription:", error)
    }
  }

  return (
    <div className="absolute right-0 top-[26px] flex flex-1 items-center justify-end space-x-4">
      {/* SIGN IN */}
      {session?.user && user && (
        <div className="flex items-center space-x-6">
          {/* <PostAd /> */}
          <ChatSheetUser />
          <NotificationsNav userId={session?.user.id} />
          <UserAccountNav
            adminId={admin[0].id}
            user={{
              id: session.user.id || "",
              name: session.user.name || "",
              email: session.user.email || "",
              image: session.user.image || "",
            }}
          />
        </div>
      )}
    </div>
  )
}
