"use client"
import { useQuery } from "@tanstack/react-query"
import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
    },
  },
})

import { listingsType, offerType, queryType } from "../types/db"
import {
  getAdOffers,
  getAdQueries,
  getListings,
  getNotifications,
  getBucket,
} from "./actions"

export function useGetQueries(mintId: any) {
  return useQuery<queryType[]>({
    queryKey: ["adQueries", mintId],
    queryFn: () => mintId && getAdQueries(mintId),
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
    queryKey: ["adOffers", mintId],
    queryFn: () => mintId && getAdOffers(mintId),
  })
}

export function useGetListing(mintId: any) {
  return useQuery<listingsType[]>({
    queryKey: ["listing", mintId],
    queryFn: () => mintId && getListings(mintId),
  })
}
