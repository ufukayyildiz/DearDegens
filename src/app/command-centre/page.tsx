import React from "react"
import {
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
} from "@/src/components/components-ui/Tabs"
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth/auth-options"
import DegenAdminAdCard from "@/src/components/pageAdmin/DegenAdminAdCard"
import { db } from "@/src/server/db"
import { listings } from "@/src/server/db/schema"
import { eq, and, sql } from "drizzle-orm"
import { listingsType, userType } from "@/src/types/db"

export default async function CommandCentre() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return console.log("Unauthorised, please login")
  }

  const admin: userType[] = (
    await db.execute(sql.raw(`SELECT * FROM users WHERE "admin" = 't'`))
  ).rows

  if (session.user.id !== admin[0].id) {
  }

  const toReview: listingsType[] = await db
    .select()
    .from(listings)
    .where(eq(listings.isReviewed, false))
  const expired: listingsType[] = await db
    .select()
    .from(listings)
    .where(and(eq(listings.isExpired, true), eq(listings.wasRenewed, true)))
  const rejected: listingsType[] = await db
    .select()
    .from(listings)
    .where(and(eq(listings.isReviewed, true), eq(listings.nonCompliant, true)))

  return (
    <div className="z-20 mx-auto mb-52 min-h-screen w-[95vw] min-w-[280px] overflow-hidden md:w-10/12">
      <Tabs defaultValue="new" className="h-full w-full">
        <TabsList className="mt-10 w-full md:space-x-5">
          <TabsTrigger
            value="new"
            className="w-full border-none font-bold text-primary md:text-xl"
          >
            Review Ads
          </TabsTrigger>
          <TabsTrigger
            value="rejected"
            className="w-full border-none font-bold text-primary md:text-xl"
          >
            Rejected Ads
          </TabsTrigger>
          <TabsTrigger
            value="expired"
            className="w-full border-none font-bold text-primary md:text-xl"
          >
            Expired Ads
          </TabsTrigger>
        </TabsList>
        <hr className="mb-5 border border-t-muted-foreground" />

        <TabsContent value="new">
          {toReview &&
            toReview.map((listing) => <DegenAdminAdCard listing={listing} />)}
        </TabsContent>

        <TabsContent value="rejected">
          {rejected &&
            rejected.map((listing) => <DegenAdminAdCard listing={listing} />)}
        </TabsContent>

        <TabsContent value="expired">
          {expired &&
            expired.map((listing) => <DegenAdminAdCard listing={listing} />)}
        </TabsContent>
      </Tabs>
    </div>
  )
}
