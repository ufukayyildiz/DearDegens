import React from "react"
import { productType } from "@/src/types/subscription"
import SubscriptionPlanCard from "./SubscriptionPlanCard"
import { products } from "@/src/lib/categories/Products"

export default function SubscriptionPlans() {
  return (
    <div className="mt-12 flex flex-wrap justify-center gap-6 space-y-0 overflow-visible p-5 sm:mt-16 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none">
      {products.map((product: productType) => (
        <SubscriptionPlanCard product={product} />
      ))}
    </div>
  )
}
