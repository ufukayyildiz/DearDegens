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
  getAdOffers,
  getAdQueries,
  getListings,
  getNotifications,
  getBucket,
  getWishlist,
  getChatrooms,
  getMessages,
} from "./actions"

export function useGetQueries(mintId: any) {
  return useQuery<queryType[]>({
    queryKey: ["adQueries"],
    queryFn: () => mintId && getAdQueries(mintId),
  })
}


export function useGetWishlist() {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: () => getWishlist(),
  })
}

export function useGetBucket() {
  return useQuery({
    queryKey: ["getBucket"],
    queryFn: getBucket,
  })
}

export function useGetNotifications() {
  return useQuery({
    queryKey: ["notify"],
    queryFn: getNotifications,
  })
}

export function useGetOffers(mintId: any) {
  return useQuery<offerType[]>({
    queryKey: ["adOffers"],
    queryFn: () => mintId && getAdOffers(mintId),
  })
}

export function useGetListing(mintId: any) {
  return useQuery<listingsType>({
    queryKey: ["listing"],
    queryFn: () => mintId && getListings(mintId),
  })
}

export function useGetChatrooms(mintId: any) {
  return useQuery<roomType[]>({
    queryKey: ["chatroom"],
    queryFn: () => mintId && getChatrooms(mintId),
  })
}

export function useGetMessages(roomId: any) {
  return useQuery<messagesType[]>({
    queryKey: ["messages"],
    queryFn: () => roomId && getMessages(roomId),
    refetchInterval: 1000,
  })
}
