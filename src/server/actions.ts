"use server"

import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

import { authOptions, getAuthSession } from "../lib/auth/auth-options"
import { db } from "./db"
import { listingsGeneral, notifications, offers } from "./db/schema"

// Get all notifications by userId
export async function getNotifications() {
  try {
    const session = await getServerSession(authOptions)
    const notification =
      session &&
      (await db
        .select()
        .from(notifications)
        .where(eq(notifications.userId, session?.user.id)))

    notification &&
      notification.sort((a: any, b: any) => b.createdAt - a.createdAt)

    console.log("Notification query successful")
    return notification
  } catch (error) {
    console.error("Server Error: Failed to fetch notifications - ", error)
  }
}

// Get General Listings
export async function getListings(decodedParam: string) {
  try {
    const listingGeneral = await db
      .select()
      .from(listingsGeneral)
      .where(eq(listingsGeneral.id, decodedParam))
    console.log("General listing query successful.")
    return listingGeneral
  } catch (error) {
    console.error("Server error: Failed to fetch general listings - ", error)
  }
}

// Get listing offers
export async function getAdOffers (mintId: string) {
  try {
    const adOffers = await db.select().from(offers).where(eq(offers.adId, mintId))

    adOffers && adOffers.sort((a: any, b: any) => b.createdAt - a.createdAt)

    console.log('Ad offers query successful')
    return adOffers
  } catch (error) {
    console.error("Server error: Failed to fetch ad offers - ", error)
  }
}
