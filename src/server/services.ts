import { useQuery } from "@tanstack/react-query"

import { listingsType, offerType, queryType } from "../types/db"
import {
  getAdOffers,
  getAdQueries,
  getListings,
  getNotifications,
} from "./actions"

export function useGetQueries(mintId: any) {
  return useQuery<queryType[]>({
    queryKey: ["adQueries"],
    queryFn: () => mintId && getAdQueries(mintId),
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
  return useQuery<listingsType[]>({
    queryKey: ["listing"],
    queryFn: () => mintId && getListings(mintId),
  })
}
