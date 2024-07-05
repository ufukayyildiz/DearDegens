import React from "react"
import SubscriptionPlans from "@/src/components/pageSubscriptions/SubscriptionPlans"
export default function Order() {
  return (
    <section className="z-20 mx-auto mb-56 w-full overflow-hidden">
      <div className=" mx-auto w-11/12 min-w-[280px] md:w-8/12">
        <h1 className="mt-10 text-xl font-bold text-primary">
          Subscription Plans
        </h1>
        <hr className="my-2 border border-t-muted-foreground" />
      </div>
      <div className=" mx-auto w-11/12 min-w-[280px] ">
        <SubscriptionPlans />
      </div>
    </section>
  )
}
