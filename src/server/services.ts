import { useQuery } from "@tanstack/react-query";
import { queryType, offerType } from "../types/db";
import { getAdQueries, getNotifications, getAdOffers, getListings } from "./actions";

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