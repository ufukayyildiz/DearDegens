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
} from "./actions"

// GET USER INFO
export function useGetUserInfo() {
  return useQuery<userType[]>({
    queryKey: ["userInfo"],
    // @ts-ignore
    queryFn: () => getUserInfo(),
  })
}

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

// GET CHATROOM
export function useGetChatrooms(mintId: any) {
  return useQuery<roomType[]>({
    queryKey: ["chatroom"],
    queryFn: () => mintId && getChatrooms(mintId),
  })
}

// GET MESSAGES
export function useGetMessages(roomId: any) {
  return useQuery<messagesType[]>({
    queryKey: ["messages"],
    queryFn: () => roomId && getMessages(roomId),
    refetchInterval: 1000,
  })
}
