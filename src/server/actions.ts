"use server"

import { eq, sql, and } from "drizzle-orm"
import { getServerSession } from "next-auth"

import { authOptions } from "../lib/auth/auth-options"
import { db } from "./db"
import {
  chatRoom,
  listings,
  messages,
  notifications,
  offers,
  queries,
  users,
  wishlist,
  wishlistItem,
} from "./db/schema"
import { alias } from "drizzle-orm/pg-core"

// Get User Info
export async function getUserInfo() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      console.log("Unauthorised.")
      return null
    }

    if (session) {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, session?.user.id))
      console.log("User info query successful")
      return user
    }
  } catch (error) {
    console.error("Server Error: Failed to fetch user info - ", error)
  }
}

// Get user image bucket by userId
export async function getBucket() {
  try {
    const session = await getServerSession(authOptions)
    const user =
      session &&
      (await db.select().from(users).where(eq(users.id, session?.user.id)))

    if (user) {
      const getBucket = user[0].imageBucket
      const bucket = []
      if (getBucket) {
        const currentBucket = getBucket.split(",")
        const formattedBucket = currentBucket.map((item: any) => {
          const matchResult = item.match(/"([^"]*)"/)
          return matchResult ? matchResult[1] : null
        })
        bucket.push(formattedBucket)
      }
      console.log("User bucket query successful")
      return bucket
    }
  } catch (error) {
    console.error("Server Error: Failed to fetch user image bucket - ", error)
  }
}

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

// Get Listing by Id
export async function getListingById(listingId: string) {
  try {
    const listingGeneral = await db
      .select()
      .from(listings)
      .where(eq(listings.id, listingId))

    console.log("General listing query successful.")
    return listingGeneral
  } catch (error) {
    console.error("Server error: Failed to fetch general listings - ", error)
  }
}

// Get Author Offers
export async function getOffersAuthor(listingId: any) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorised", { status: 401 })
    }
    const userId = session.user.id
    const adOffers = await db.execute(
      sql.raw(
        `
        SELECT * FROM offers 
        WHERE "sellerId" = '${userId}'; 
      `
      )
    )
    const offers = adOffers.rows.filter((item) => item.adId === listingId)
    console.log("Author offers query successful")
    return offers
  } catch (error) {
    console.error("Server error: Failed to fetch author offers - ", error)
  }
}

// Get Author Manager Offers
export async function getOffersManagerAuthor() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorised", { status: 401 })
    }
    const userId = session.user.id
    const offers = await db.execute(
      sql.raw(
        `
        SELECT * FROM offers 
        WHERE "sellerId" = '${userId}'; 
      `
      )
    )
    console.log("Author manager offers query successful")
    return offers.rows
  } catch (error) {
    console.error(
      "Server error: Failed to fetch author manager offers - ",
      error
    )
  }
}

// Get User Offers
export async function getOffersUser(listingId: any) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorised", { status: 401 })
    }
    const userId = session.user.id
    const adOffers = await db.execute(
      sql.raw(
        `
        SELECT * FROM offers 
        WHERE "userId" = '${userId}'; 
      `
      )
    )
    const offers = adOffers.rows.filter((item) => item.adId === listingId)
    console.log("User offers query successful")
    return offers
  } catch (error) {
    console.error("Server error: Failed to fetch user offers - ", error)
  }
}

// Get User Manager Offers
export async function getOffersManagerUser() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorised", { status: 401 })
    }
    const userId = session.user.id
    const offers = await db.execute(
      sql.raw(
        `
        SELECT * FROM offers 
        WHERE "userId" = '${userId}'; 
      `
      )
    )
    console.log("User manager offers query successful")
    return offers.rows
  } catch (error) {
    console.error("Server error: Failed to fetch user manager offers - ", error)
  }
}

// Get Author Queries
export async function getQueriesAuthor(listingId: string) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorised", { status: 401 })
    }

    const adQueries = await db.execute(
      sql.raw(
        `
        SELECT * FROM queries 
        WHERE "adId" = '${listingId}'; 
      `
      )
    )
    const queries = adQueries.rows.filter((item) => item.adId === listingId)
    console.log("Author queries query successful")
    return queries
  } catch (error) {
    console.error("Server error: Failed to fetch author queries - ", error)
  }
}

// Get Author Manager Queries
export async function getQueriesManagerAuthor() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorised", { status: 401 })
    }
    const userId = session.user.id
    const queries = await db.execute(
      sql.raw(
        `
        SELECT * FROM queries 
        WHERE "sellerId" = '${userId}'; 
      `
      )
    )
    console.log("Author manager queries query successful")
    return queries.rows
  } catch (error) {
    console.error(
      "Server error: Failed to fetch author manager queries - ",
      error
    )
  }
}

// Get User Queries
export async function getQueriesUser(listingId: string) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorised", { status: 401 })
    }
    const userId = session.user.id
    const adQueries = await db.execute(
      sql.raw(
        `
        SELECT * FROM queries 
        WHERE "userId" = '${userId}'; 
      `
      )
    )
    const offers = adQueries.rows.filter((item) => item.adId === listingId)
    console.log("User queries query successful")
    return offers
  } catch (error) {
    console.error("Server error: Failed to fetch user queries - ", error)
  }
}

// Get User Manager Queries
export async function getQueriesManagerUser() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorised", { status: 401 })
    }
    const userId = session.user.id
    const queries = await db.execute(
      sql.raw(
        `
        SELECT * FROM queries 
        WHERE "userId" = '${userId}'; 
      `
      )
    )
    console.log("User manager queries query successful")
    return queries.rows
  } catch (error) {
    console.error(
      "Server error: Failed to fetch user manager queries - ",
      error
    )
  }
}

export async function getWishlist() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorised", { status: 401 })
    }

    const userId = session.user.id

    const userWishlist = await db
      .select({
        wishlistId: wishlist.id,
        userId: wishlist.userId,
        itemId: wishlistItem.id,
        adId: wishlistItem.adId,
        createdAt: wishlistItem.createdAt,
      })
      .from(wishlist)
      .leftJoin(wishlistItem, eq(wishlist.id, wishlistItem.wishlistId))
      .where(eq(wishlist.userId, userId))

    console.log("Wishlist query successful")

    return userWishlist
  } catch (error) {
    console.error("Server error: Failed to fetch wishlist - ", error)
  }
}

// Get listing Chatrooms
export async function getChatrooms(mintId: string) {
  try {
    const buyer = alias(users, "buyer")
    const seller = alias(users, "seller")

    const roomQueries = await db
      .select()
      .from(chatRoom)
      .leftJoin(buyer, eq(buyer.id, chatRoom.userId))
      .leftJoin(seller, eq(seller.id, chatRoom.sellerId))
      .where(eq(chatRoom.adId, mintId))

    roomQueries &&
      roomQueries.sort((a: any, b: any) => b.createdAt - a.createdAt)

    console.log("Chatroom queries query successful")
    return roomQueries
  } catch (error) {
    console.error("Server error: Failed to fetch ad chatrooms - ", error)
  }
}

// Get Chatroom Messages
export async function getMessages(roomId: string) {
  try {
    const roomMessages = await db.execute(
      sql.raw(`SELECT * FROM messages WHERE "roomId" = '${roomId}'`)
    )

    console.log("Chatroom messages query successful")
    return roomMessages.rows
  } catch (error) {
    console.error("Server error: Failed to fetch chatroom messages - ", error)
  }
}
