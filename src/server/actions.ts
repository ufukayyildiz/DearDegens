"use server"

import { eq, sql, and, ne, or } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { Resend } from "resend"
import { authOptions, getAuthSession } from "../lib/auth/auth-options"
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
import { ListingRejectedTemplate } from "../components/emailTemplates/ListingRejectedTemplate"
import { listingsType, offersManagerType, offerType } from "../types/db"
import { nanoid } from "nanoid"
import axios, { AxiosError } from "axios"
import { ISO8601Timestamp } from "../lib/utils"
import { revalidatePath } from "next/cache"

// Admin accept listing
export const handleAccepted = async (listing: listingsType) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      console.log("Unauthorised.")
      return null
    }

    const currentDate: Date = new Date()
    const generateNotificationId = nanoid()
    const notificationId = generateNotificationId

    await db
      .update(listings)
      .set({ isReviewed: true, nonCompliant: false })
      .where(eq(listings.id, listing.id))

    await db.insert(notifications).values({
      id: notificationId,
      userId: listing.authorId,
      adId: listing.id,
      adUrl: listing.url,
      createdAt: currentDate,
      title: `Listing ${listing.title} is live!`,
      description: "Congratulations! Your listing has gone live",
      body: `Our team has reviewed your listing and approved it for public circulation on our platform. Good luck and happy selling!`,
      isRead: false,
    })

    revalidatePath("/command-centre")

    console.log("Successfully accepted listing")
  } catch (error) {
    console.error("Server Error: Failed to accept listing - ", error)
  }
}

// Admin reject listing
export const handleReject = async (listing: listingsType) => {
  try {
    const session = await getServerSession(authOptions)
    const resend = new Resend(process.env.RESEND_API_KEY)

    if (!session?.user) {
      console.log("Unauthorised.")
      return null
    }

    const currentDate: Date = new Date()
    const generateNotificationId = nanoid()
    const notificationId = generateNotificationId

    const author = await db
      .select()
      .from(users)
      .where(eq(users.id, listing.authorId))

    await db
      .update(listings)
      .set({ isReviewed: true, nonCompliant: true })
      .where(eq(listings.id, listing.id))

    await db.insert(notifications).values({
      id: notificationId,
      userId: listing.authorId,
      adId: listing.id,
      adUrl: listing.url,
      createdAt: currentDate,
      title: `Listing ${listing.title} rejected`,
      description:
        "We regret to inform you that your listing has been rejected",
      body: `Our team has reviewed your listing and found that it's content unfortunately does not conform to our content policies. Once you have amended your listing to be in line with the above-mentioned policies and terms of service, it will be resubmitted for review by our team. To make changes to your listing, you can visit your listings page via the ads manager and click on the EDIT button to navigate to your listing's edit page.`,
      isRead: false,
    })

    await resend.emails.send({
      from: "DearDegens Support <support@deardegens.com>",
      to: `${author[0].email}`,
      subject: "DearDegens.com: Listing rejected during review process.",
      react: ListingRejectedTemplate({
        userName: author[0].name || "",
        userEmail: author[0].email,
        adId: listing.id,
        adTitle: listing.title || "",
      }) as React.ReactElement,
    })

    revalidatePath("/command-centre")

    console.log("Successfully rejected listing")
  } catch (error) {
    console.error("Server Error: Failed to reject listing - ", error)
  }
}

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

// Get user subscription
export async function getUserSubscription(token: string) {
  try {
    const sandboxMode = process.env.SANDBOXMODE
    const merchantIdEnv = process.env.MERCHANT_ID
    const passPhrase = process.env.PASSPHRASE!
    const apiVersion = process.env.API_VERSION
    const timestamp = ISO8601Timestamp()
    const crypto = require("crypto")

    // GENERATE SIGNATURE
    const generateSignature = (data: any, passPhrase: any) => {
      if (token === (undefined || "")) {
        console.log("No subscription data available")
      }

      // Arrange the array by key alphabetically for API calls
      let ordered_data: any = {}

      Object.keys(data)
        .sort()
        .forEach((key) => {
          ordered_data[key] = data[key]
        })
      data = ordered_data

      // Create the get string
      let getString = ""
      for (let key in data) {
        getString +=
          key + "=" + encodeURIComponent(data[key]).replace(/%20/g, "+") + "&"
      }

      // Remove the last '&'
      getString = getString.substring(0, getString.length - 1)
      return crypto.createHash("md5").update(getString).digest("hex")
    }

    const apiData = {
      merchantId: parseInt(merchantIdEnv!),
      version: apiVersion,
      timestamp: timestamp,
      passphrase: passPhrase,
    }

    let data: any = []
    data["merchant-id"] = apiData.merchantId
    data["passphrase"] = apiData.passphrase
    data["timestamp"] = apiData.timestamp
    data["version"] = apiData.version
    let signature = generateSignature(data, passPhrase)
    data["signature"] = signature

    if (sandboxMode === "true") {
      const subscription = await axios.get(
        `https://api.payfast.co.za/subscriptions/${token}/fetch?testing=true`,
        {
          headers: {
            "merchant-id": apiData.merchantId,
            version: apiData.version,
            timestamp: apiData.timestamp,
            signature: signature,
          },
        }
      )
      console.log("User subscription query successful (sandbox)")
      return subscription.data.data.response
    }

    if (sandboxMode === "false") {
      const subscription = await axios.get(
        `https://api.payfast.co.za/subscriptions/${token}/fetch`,
        {
          headers: {
            "merchant-id": apiData.merchantId,
            version: apiData.version,
            timestamp: apiData.timestamp,
            signature: signature,
          },
        }
      )
      console.log("User subscription query successful")
      return subscription.data.data.response
    }
  } catch (error) {
    console.error("Server Error: Failed to fetch user subscription - ", error)
  }
}

// Get User Listings
export async function getUserListings() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      console.log("Unauthorised.")
      return null
    }

    if (session) {
      const listing = await db
        .select()
        .from(listings)
        .where(eq(listings.authorId, session?.user.id))
      console.log("User listings query successful")
      return listing
    }
  } catch (error) {
    console.error("Server Error: Failed to fetch user listings - ", error)
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
        SELECT 
          "offers".*,
          "listings"."url"
        FROM offers 
        LEFT JOIN "listings" ON "offers"."adId" = "listings"."id"
        WHERE "offers"."sellerId" = '${userId}'
        AND "offers"."adId" = '${listingId}'; 
      `
      )
    )

    console.log("Author offers query successful")
    return adOffers.rows as offerType[]
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
        SELECT 
          "offers".*,
          "listings"."url"
        FROM offers 
        LEFT JOIN "listings" ON "offers"."adId" = "listings"."id"
        WHERE "offers"."sellerId" = '${userId}';
      `
      )
    )
    console.log("Author manager offers query successful", offers.rows)
    return offers.rows as offersManagerType[]
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
        SELECT 
          "offers".*,
          "listings"."url"
        FROM offers 
        LEFT JOIN "listings" ON "offers"."adId" = "listings"."id"
        WHERE "offers"."userId" = '${userId}'
        AND "offers"."adId" = '${listingId}'; 
      `
      )
    )

    console.log("User offers query successful")
    return adOffers.rows as offerType[]
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
        SELECT 
          offers.*,
          "listings"."url"
        FROM offers 
        LEFT JOIN "listings" ON "offers"."adId" = "listings"."id"
        WHERE "offers"."userId" = '${userId}'; 
      `
      )
    )
    console.log("User manager offers query successful")
    return offers.rows as offersManagerType[]
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

// Get User Chatrooms
export async function getUserChatrooms() {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user.id
    const roomQueries = await db.execute(
      sql.raw(`
      SELECT 
        "chatRoom"."id" AS "id", 
        "chatRoom"."adId" AS "adId", 
        "listings"."title" AS "adTitle",
        "buyer"."id" AS "userId", 
        "buyer"."name" AS "userName", 
        "buyer"."image" AS "userImage",

        "seller"."id" AS "sellerId",
        "seller"."name" AS "sellerName",
        "seller"."image" AS "sellerImage",

        "chatRoom"."createdAt" AS "createdAt"
      FROM "chatRoom" 
      LEFT JOIN "listings" ON "listings"."id" = "chatRoom"."adId"
      LEFT JOIN "users" AS "buyer" ON "buyer"."id" = "chatRoom"."userId"
      LEFT JOIN "users" AS "seller" ON "seller"."id" = "chatRoom"."sellerId"
      WHERE "chatRoom"."userId" = '${userId}'
      OR "chatRoom"."sellerId" = '${userId}';
      `)
    )

    roomQueries.rows &&
      roomQueries.rows.sort((a: any, b: any) => b.createdAt - a.createdAt)

    console.log("User chatroom queries query successful")
    return roomQueries.rows
  } catch (error) {
    console.error("Server error: Failed to fetch user chatrooms - ", error)
  }
}

// Get listing Chatrooms
export async function getChatrooms(mintId: string) {
  try {
    const roomQueries = await db.execute(
      sql.raw(`
      SELECT 
        "chatRoom"."id" AS "id", 
        "chatRoom"."adId" AS "adId", 
        "listings"."title" AS "adTitle",
        "buyer"."id" AS "userId", 
        "buyer"."name" AS "userName", 
        "buyer"."image" AS "userImage",

        "seller"."id" AS "sellerId",
        "seller"."name" AS "sellerName",
        "seller"."image" AS "sellerImage",

        "chatRoom"."createdAt" AS "createdAt"
      FROM "chatRoom" 
      LEFT JOIN "listings" ON "listings"."id" = "chatRoom"."adId"
      LEFT JOIN "users" AS "buyer" ON "buyer"."id" = "chatRoom"."userId"
      LEFT JOIN "users" AS "seller" ON "seller"."id" = "chatRoom"."sellerId"
      WHERE "chatRoom"."adId" = '${mintId}';
      `)
    )

    roomQueries.rows &&
      roomQueries.rows.sort((a: any, b: any) => b.createdAt - a.createdAt)

    console.log("Chatroom queries query successful", roomQueries.rows)
    return roomQueries.rows
  } catch (error) {
    console.error("Server error: Failed to fetch ad chatrooms - ", error)
  }
}

// Get Chatroom Messages
export async function getMessages(roomId: string) {
  try {
    const session = await getAuthSession()
    const room = await db.select().from(chatRoom).where(eq(chatRoom.id, roomId))

    const buyerId = room[0].userId
    const sellerId = room[0].sellerId

    if (buyerId === session?.user.id) {
      await db
        .update(messages)
        .set({ isRead: true })
        .where(and(eq(messages.userId, sellerId), eq(messages.roomId, roomId)))
    }

    if (sellerId === session?.user.id) {
      await db
        .update(messages)
        .set({ isRead: true })
        .where(and(eq(messages.userId, buyerId), eq(messages.roomId, roomId)))
    }

    const buyerMessages = await db
      .select({
        id: messages.id,
        roomId: messages.roomId,
        userId: users.id,
        userName: users.name,
        message: messages.message,
        createdAt: messages.createdAt,
      })
      .from(messages)
      .leftJoin(users, eq(users.id, buyerId))
      .where(eq(messages.userId, buyerId))

    const sellerMessages = await db
      .select({
        id: messages.id,
        roomId: messages.roomId,
        userId: users.id,
        userName: users.name,
        message: messages.message,
        createdAt: messages.createdAt,
      })
      .from(messages)
      .leftJoin(users, eq(users.id, sellerId))
      .where(eq(messages.userId, sellerId))

    const roomMessages = [...sellerMessages, ...buyerMessages]

    const sortedMessages = roomMessages.sort(
      (a: any, b: any) => b.createdAt - a.createdAt
    )

    console.log("Chatroom messages query successful")
    return sortedMessages
  } catch (error) {
    console.error("Server error: Failed to fetch chatroom messages - ", error)
  }
}

export async function getUnreadMessages() {
  try {
    const session = await getAuthSession()

    if (!session) {
      return "unauthorized"
    }

    const rooms = await db
      .select({ id: chatRoom.id })
      .from(chatRoom)
      .where(
        or(
          eq(chatRoom.userId, session.user.id),
          eq(chatRoom.sellerId, session.user.id)
        )
      )

    let roomIds: string[] = []
    rooms.map((room) => roomIds.push(room.id))
    const ids = roomIds.map((id) => `'${id}'`).join(",")
    console.log("ids:", ids)

    const message = await db.execute(
      sql.raw(
        `
      SELECT "messages"."id" AS "id" 
      FROM "messages" 
      WHERE "roomId" IN (${ids})
      AND "userId" <> '${session.user.id}'
      AND "isRead" = ${false};
      `
      )
    )

    console.log("messages", message.rows)
    return message.rows
  } catch (error) {
    console.log("Error fetching unread messages:", error)
  }
}
