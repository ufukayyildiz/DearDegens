import React from "react"

export default function MintOffersManagerCardSkeleton() {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
  })
  return (
    <div className="mx-auto mb-5 flex w-11/12 flex-col justify-between border border-transparent border-t-muted p-2 text-primary">
      <div className="flex w-full flex-col md:flex-row">
        {/* AD TITLE */}
        <div className="mr-10 mb-2 md:mb-0 h-6 w-full animate-pulse rounded-full bg-muted"></div>

        {/* STATUS */}
        <div className="mr-10 h-6 w-full animate-pulse rounded-full bg-muted"></div>
      </div>

      <div className="mt-2 flex flex-col md:flex-row">
        {/* ASKING PRICE */}
        <div className="flex w-full text-muted-foreground">
          <h1 className="animate-pulse font-semibold">Asking price:</h1>
          <div className="ml-2 mb-2 md:mb-0 h-6 w-28 animate-pulse rounded-full bg-muted"></div>
        </div>

        {/* OFFER PRICE */}
        <div className="flex w-full text-muted-foreground">
          <h1 className="animate-pulse font-semibold">Offer amount:</h1>
          <div className="ml-2 h-6 w-28 animate-pulse rounded-full bg-muted"></div>
        </div>
      </div>

      <div className="mt-2 flex w-full items-center justify-between">
        <div className="flex ">
          <div className="flex w-full gap-1 text-muted-foreground">
            <p className="animate-pulse text-xs italic">sent</p>
            <p className="animate-pulse text-xs italic">x days ago</p>
          </div>
        </div>
      </div>
    </div>
  )
}
