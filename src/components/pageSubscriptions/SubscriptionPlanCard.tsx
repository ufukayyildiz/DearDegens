import React from "react"
import Link from "next/link"
import { cn, formatPrice } from "@/src/lib/utils"
import { cookies } from "next/headers"
import { subscriptionsType } from "@/src/types/subscription"
import { Button } from "../components-ui/Button"
import { Circle } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetHeader,
} from "../components-ui/Sheet"

interface SubsciptionPlanCardProps {
  product: subscriptionsType
}

export default function SubscriptionPlanCard({
  product,
}: SubsciptionPlanCardProps) {
  async function create() {
    cookies().set({
      name: "name",
      value: "lee",
    })
  }

  return (
    <div
      key={product.id}
      className={cn(
        "group flex min-w-80 flex-col divide-y divide-zinc-600 rounded-lg border border-transparent bg-background shadow-sm transition duration-300 hover:scale-105 dark:border-muted",
        "flex-1", // This makes the flex item grow to fill the space
        "basis-1/3", // Assuming you want each card to take up roughly a third of the container's width
        "max-w-xs" // Sets a maximum width to the cards to prevent them from getting too large
      )}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold leading-6 text-customAccent">
          {product.name}
        </h2>
        <div className="min-h-44">
          <p className="mt-3 h-12 text-primary">{product.description}</p>
          <hr className="my-2 border border-t-muted-foreground" />
          <div className="text-sm italic text-secondary">
            <p className="mb-2 mt-3 font-bold underline">Features:</p>
            <ul>
              {product.features.map((feat) => (
                <div className="relative flex pl-4">
                  <Circle className="absolute left-0 top-[6px] flex h-2 w-2 text-customAccent" />
                  <li>{feat}</li>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8">
          <span className="white text-5xl font-extrabold">
            R {formatPrice.format(product.price)}{" "}
            {product.id !== "001" && product.id !== "000" && (
              <span className="top-0 text-sm">p/Month</span>
            )}
          </span>
        </p>
        <Sheet>
          {product.id !== "000" && (
            <SheetTrigger className="mt-8 h-8 w-full rounded-md border border-customAccent text-center text-sm font-semibold text-primary shadow-lg hover:bg-customAccent hover:text-zinc-100">
              SELECT
            </SheetTrigger>
          )}
          <SheetContent>
            <SheetHeader className="z-40 mr-10 h-16 w-[315px] bg-background pt-5 text-lg font-bold text-customAccent">
              <h1>Order Summary</h1>
              <div className="my-3 h-[1px] w-full bg-customAccent" />
            </SheetHeader>
            <div className="mt-10">
              <p>Selected Product:</p>
              <p className="text-lg font-bold italic text-customAccent">
                {product.name}
              </p>
            </div>
            <div className="mt-5 flex w-full justify-between">
              <p>Subscription amount:</p>
              <p>R {formatPrice.format(product.price)}.00</p>
            </div>
            <div className="flex w-full justify-between">
              <p>VAT amount:</p>
              <p>R 0.00</p>
            </div>
            <hr className="my-2 border border-t-muted-foreground" />
            <div className="flex w-full justify-between font-bold">
              <p>
                Total <span>(ZAR)</span>
              </p>
              <p>R {formatPrice.format(product.price)}.00</p>
            </div>
            {product.id !== "001" && (
              <p className="mt-5 py-2 text-sm italic text-secondary">
                This is a recurring billing service that will be charged monthly
                over a period of 12 billing cycles.
              </p>
            )}
            <p className="py-2 text-sm italic text-secondary">
              DearDegens.com does not store any personal banking or credit/debit
              card details in our database. All transactions are handled through
              our trusted third-party provider{" "}
              <Link
                href="https://payfast.io"
                target="_blank"
                className="underline"
              >
                Payfast
              </Link>
            </p>

            <Button
              variant="secondary"
              className="mt-5 w-full rounded-md bg-backgroundNegetive text-lg font-bold text-primaryNegetive hover:text-primary"
            >
              Proceed to Payment{" "}
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
