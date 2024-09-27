"use client"
import { useQuery } from "@tanstack/react-query"
import {
  roomType,
  listingsType,
  messagesType,
  offerType,
  queryType,
  userType,
} from "../types/db"
import {
  getUserInfo,
  getUserSubscription,
  getUserListings,
  getQueriesAuthor,
  getQueriesUser,
  getListingById,
  getNotifications,
  getBucket,
  getWishlist,
  getChatrooms,
  getMessages,
  getOffersAuthor,
  getOffersUser,
  getOffersManagerAuthor,
  getOffersManagerUser,
  getQueriesManagerAuthor,
  getQueriesManagerUser,
  getUserChatrooms,
  getUnreadMessages,
} from "./actions"

// ______________________________________________________________
// GET AUTHOR QUERIES
export function useGetQueriesAuthor(listingId: any) {
  return useQuery<queryType[]>({
    queryKey: ["authorQueries", listingId],
    queryFn: () => listingId && getQueriesAuthor(listingId),
  })
}

// GET USER QUERIES
export function useGetQueriesUser(listingId: any) {
  return useQuery<queryType[]>({
    queryKey: ["userQueries", listingId],
    queryFn: () => listingId && getQueriesUser(listingId),
  })
}

// GET AUTHOR OFFERS
export function useGetOffersAuthor(listingId: any) {
  return useQuery<offerType[]>({
    queryKey: ["authorOffers", listingId],
    queryFn: () => listingId && getOffersAuthor(listingId),
    refetchOnMount: true,
  })
}

// GET USER OFFERS
export function useGetOffersUser(listingId: any) {
  return useQuery<offerType[]>({
    queryKey: ["userOffers", listingId],
    queryFn: () => listingId && getOffersUser(listingId),
    refetchOnMount: true,
  })
}

// ______________________________________________________________
// GET AUTHOR MANAGER QUERIES
export function useGetQueriesManagerAuthor() {
  return useQuery({
    queryKey: ["authorQueriesManager"],
    queryFn: () => getQueriesManagerAuthor(),
  })
}

// GET USER MANAGER QUERIES
export function useGetQueriesManagerUser() {
  return useQuery({
    queryKey: ["userQueriesManager"],
    queryFn: () => getQueriesManagerUser(),
  })
}

// GET AUTHOR MANAGER OFFERS
export function useGetOffersManagerAuthor() {
  return useQuery({
    queryKey: ["authorOffersManager"],
    queryFn: () => getOffersManagerAuthor(),
    refetchOnMount: true,
  })
}

// GET USER MANAGER OFFERS
export function useGetOffersManagerUser() {
  return useQuery({
    queryKey: ["userOffersManager"],
    queryFn: () => getOffersManagerUser(),
    refetchOnMount: true,
  })
}

// ______________________________________________________________
// GET WISHLIST
export function useGetWishlist() {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: () => getWishlist(),
  })
}

// GET BUCKET
export function useGetBucket() {
  return useQuery({
    queryKey: ["getBucket"],
    queryFn: getBucket,
  })
}

// GET NOTIFICATIONS
export function useGetNotifications() {
  return useQuery({
    queryKey: ["notify"],
    queryFn: getNotifications,
  })
}

// GET LISTING BY ID
export function useGetListingById(listingId: any) {
  return useQuery<listingsType[]>({
    queryKey: ["listing"],
    queryFn: () => listingId && getListingById(listingId),
  })
}

// GET USER INFO
export function useGetUserInfo() {
  return useQuery<userType[]>({
    queryKey: ["userInfo"],
    // @ts-ignore
    queryFn: () => getUserInfo(),
  })
}

// GET USER SUBSCRIPTION
export function useGetUserSubscription(token: string) {
  return useQuery({
    queryKey: ["userSubscription", token],
    queryFn: () => getUserSubscription(token),
  })
}

// GET USER LISTINGS
export function useGetUserListings() {
  return useQuery({
    queryKey: ["userListings"],
    queryFn: () => getUserListings(),
  })
}

// ______________________________________________________________
// GET CHATROOM
export function useGetUnreadMessages() {
  return useQuery({
    queryKey: ["unreadMessage"],
    queryFn: () => getUnreadMessages(),
  })
}

export function useGetUserChatrooms() {
  return useQuery({
    queryKey: ["usersrooms"],
    queryFn: () => getUserChatrooms(),
    // refetchOnMount: "always",
  })
}

export function useGetChatrooms(mintId: any) {
  return useQuery<roomType[]>({
    queryKey: ["chatroom", mintId],
    queryFn: () => mintId && getChatrooms(mintId),
    // refetchOnMount: "always",
  })
}

// GET MESSAGES
export function useGetMessages(roomId: any) {
  return useQuery<messagesType[]>({
    queryKey: ["messages", roomId],
    queryFn: () => roomId && getMessages(roomId),
    // refetchInterval: 5000 * 60,
    // refetchOnMount: "always",
  })
}
