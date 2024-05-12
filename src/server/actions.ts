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

// Get General Listings
export async function getListings(decodedParam: string) {
  try {
    const listingGeneral = await db
      .select()
      .from(listings)
      .where(eq(listings.id, decodedParam))
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
    const adOffers = await db.execute(sql.raw(
      `
        SELECT * FROM offers 
        WHERE "sellerId" = '${userId}'; 
      `
    ))
    const offers = adOffers.rows.filter(item => item.adId === listingId)
    console.log("User offers query successful")
    return offers
  } catch (error) {
    console.error("Server error: Failed to fetch user offers - ", error)
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
    const adOffers = await db.execute(sql.raw(
      `
        SELECT * FROM offers 
        WHERE "userId" = '${userId}'; 
      `
    ))
    const offers = adOffers.rows.filter(item => item.adId === listingId)
    console.log("User offers query successful")
    return offers
  } catch (error) {
    console.error("Server error: Failed to fetch user offers - ", error)
  }
}


// Get Author Queries
export async function getQueriesAuthor(listingId: string) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorised", { status: 401 })
    }
    const userId = session.user.id
    const adQueries = await db.execute(sql.raw(
      `
        SELECT * FROM queries 
        WHERE "adId" = '${listingId}'; 
      `
    ))
    const offers = adQueries.rows.filter(item => item.adId === listingId)
    console.log("Author queries query successful")
    return offers
  } catch (error) {
    console.error("Server error: Failed to fetch author queries - ", error)
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
    const adQueries = await db.execute(sql.raw(
      `
        SELECT * FROM queries 
        WHERE "userId" = '${userId}'; 
      `
    ))
    const offers = adQueries.rows.filter(item => item.adId === listingId)
    console.log("User queries query successful")
    return offers
  } catch (error) {
    console.error("Server error: Failed to fetch user queries - ", error)
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
      .select({
        roomId: chatRoom.id,
        adId: chatRoom.adId,
        buyerId: buyer.id,
        buyerName: buyer.name,
        buyerImage: buyer.image,
        sellerId: seller.id,
        sellerName: seller.name,
        sellerImage: seller.image,
        createdAt: chatRoom.createdAt,
      })
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
    const roomMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.roomId, roomId))

    roomMessages &&
      roomMessages.sort((a: any, b: any) => a.createdAt - b.createdAt)

    // console.log("Chatroom messages query successful")
    return roomMessages
  } catch (error) {
    console.error("Server error: Failed to fetch chatroom messages - ", error)
  }
}
