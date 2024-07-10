"use client"
import { useState, useEffect } from "react"
import { userType } from "@/src/types/db"
import { useGetUserSubscription } from "@/src/server/services"
import axios from "axios"
import React from "react"
import { Button } from "../components-ui/Button"
import { products } from "@/src/lib/categories/Products"
import { payfastAPI, productType } from "@/src/types/subscription"
import { formatDateFromTimestamp, formatPrice } from "@/src/lib/utils"

interface ProfileAccountProps {
  user: userType[]
  isFetching: boolean
}

export default function ProfileAccount({
  user,
  isFetching,
}: ProfileAccountProps) {
  const [subscription, setSubscription] = useState<any>({
    id: products[0].id,
    name: products[0].name,
    images: products[0].images,
    ads: products[0].ads,
    price: products[0].price,
  })

  const token = (user && user[0].subscriptionToken) || ""

  const payfastData = useGetUserSubscription(token).data as payfastAPI
  const subAmt = payfastData && JSON.stringify(payfastData.amount)
  const subPrice = payfastData && subAmt.substring(0, subAmt.length - 2)

  const setUserSubscription = () => {
    products.map((product: productType) => {
      if (
        user &&
        (user[0].subscription === "000" || user[0].subscription === "001")
      ) {
        setSubscription({
          id: products[0].id,
          name: products[0].name,
          images: products[0].images,
          ads: products[0].ads,
          price: products[0].price,
        })
      }
      if (user && user[0].subscription === product.id) {
        setSubscription({
          id: product.id,
          name: product.name,
          images: product.images,
          ads: product.ads,
          price: product.price,
        })
      }
    })
  }

  useEffect(() => {
    setUserSubscription()
  }, [user])

  return (
    <div className="space-y-5 text-primary">
      <h2 className="mb-5 font-bold text-customAccent">
        Subscription Details:
      </h2>
      <div className="grid w-full grid-cols-1 items-center md:grid-cols-2">
        <p className="h-6 w-full font-bold">Subscription Plan:</p>
        {isFetching ? (
          <p className="mt-1 h-10 w-60 animate-pulse rounded-full pt-2 italic text-muted-foreground md:mt-0 md:pl-3">
            {products[0].name}
          </p>
        ) : (
          <p className="mt-1 h-10 w-full pt-2 italic text-primary md:mt-0 md:pl-3">
            {subscription.name}
          </p>
        )}
      </div>
      <div className="grid w-full grid-cols-1 items-center md:grid-cols-2">
        <p className="h-6 w-full font-bold">Available Ad Space:</p>
        {isFetching ? (
          <p className="mt-1 h-10 w-60 animate-pulse rounded-full pt-2 italic text-muted-foreground md:mt-0 md:pl-3">
            {products[0].ads}
          </p>
        ) : (
          <p className="mt-1 h-10 w-full pt-2 italic text-primary md:mt-0 md:pl-3">
            {user[0].maxAds} / {subscription.ads}
          </p>
        )}
      </div>
      <div className="grid w-full grid-cols-1 items-center md:grid-cols-2">
        <p className="h-6 w-full font-bold">Available Image Space:</p>
        {isFetching ? (
          <p className="mt-1 h-10 w-60 animate-pulse rounded-full pt-2 italic text-muted-foreground md:mt-0 md:pl-3">
            {products[0].images}
          </p>
        ) : (
          <p className="mt-1 h-10 w-full pt-2 italic text-primary md:mt-0 md:pl-3">
            {user[0].maxImages} / {subscription.images}
          </p>
        )}
      </div>
      {payfastData !== undefined && (
        <div className="w-full px-2">
          <div className="w-full items-center rounded-lg border border-muted bg-muted p-2 pb-3 text-xs shadow-md">
            <div className="grid w-full grid-cols-2 items-center">
              <p className="h-6 w-full font-bold">Status:</p>
              <p className="h-6 w-full italic text-primary md:mt-0 md:pl-3">
                {payfastData.status_text}
              </p>
            </div>
            <div className="grid w-full grid-cols-2 items-center">
              <p className="h-6 w-full font-bold">Amount p/Month:</p>
              <p className="h-6 w-full italic text-primary md:mt-0 md:pl-3">
                R {subPrice}.00
              </p>
            </div>
            <div className="grid w-full grid-cols-2 items-center">
              <p className="h-6 w-full font-bold">Next Billing Date:</p>
              <p className="h-6 w-full italic text-primary md:mt-0 md:pl-3">
                {formatDateFromTimestamp(payfastData.run_date!)}
              </p>
            </div>
            <div className="grid w-full grid-cols-2 items-center">
              <p className="h-6 w-full font-bold">Cycles:</p>
              <p className="h-6 w-full italic text-primary md:mt-0 md:pl-3">
                {payfastData.cycles}
              </p>
            </div>
            <div className="grid w-full grid-cols-2 items-center">
              <p className="h-6 w-full font-bold">Cycles Complete:</p>
              <p className="h-6 w-full italic text-primary md:mt-0 md:pl-3">
                {payfastData.cycles_complete}
              </p>
            </div>
            <div className="grid w-full grid-cols-2 items-center">
              <p className="h-6 w-full font-bold">Token:</p>
              <p className="h-6 w-full italic text-primary md:mt-0 md:pl-3">
                {payfastData.token}
              </p>
            </div>
          </div>
        </div>
      )}
      {payfastData !== undefined && (
        <p className="mt-5 py-2 text-sm italic text-secondary">
          This is a recurring billing service that will be charged monthly over
          a period of 12 billing cycles. DearDegens.com does not offer refunds,
          and users can cancel their subscriptions at any time with immediate
          effect.
        </p>
      )}
    </div>
  )
}
