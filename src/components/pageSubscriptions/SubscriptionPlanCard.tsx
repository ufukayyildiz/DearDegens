import React from "react"
import Link from "next/link"
import { db } from "@/src/server/db"
import { eq } from "drizzle-orm"
import { users } from "@/src/server/db/schema"
import { cn, formatPrice } from "@/src/lib/utils"
import { productType } from "@/src/types/subscription"
import { Button } from "../components-ui/Button"
import { getAuthSession } from "@/src/lib/auth/auth-options"
import { Circle } from "lucide-react"
import { ulid } from "ulid"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetHeader,
} from "../components-ui/Sheet"
import Payfast from "@/src/assets/payfast.svg"
import Image from "next/image"

interface SubscriptionPlanCardProps {
  product: productType
}

export default async function SubscriptionPlanCard({
  product,
}: SubscriptionPlanCardProps) {
  const session = await getAuthSession()
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, session?.user.email!))
  const merchantIdEnv = process.env.MERCHANT_ID
  const merchantKeyEnv = process.env.MERCHANT_KEY
  const passPhrase = process.env.PASSPHRASE!
  const pfHost = process.env.PFHOST
  // const domain = process.env.NGROK_URL
  const domain = process.env.URL
  const paymentId = `pmnt-${ulid()}`
  const crypto = require("crypto")

  // _____________________________________________________
  // GENERATE SIGNATURE
  const generateSignature = (data: any, passPhrase: any) => {
    // Create parameter string
    let pfOutput = ""
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key] !== "") {
          pfOutput += `${key}=${encodeURIComponent(String(data[key]).trim()).replace(/%20/g, "+")}&`
        }
      }
    }

    // Remove last ampersand
    let getString = pfOutput.slice(0, -1)
    if (passPhrase !== null) {
      getString += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(/%20/g, "+")}`
    }
    const signature = crypto.createHash("md5").update(getString).digest("hex")
    return signature
  }

  // _____________________________________________________
  // PAYMENT DATA
  const paymentData = {
    merchantId: parseInt(merchantIdEnv!),
    merchantKey: merchantKeyEnv,
    returnUrl: `${domain}/`,
    cancelUrl: `${domain}/`,
    stdNotifyUrl: `${domain}/api/createPaymentConfirmationStd`,
    subNotifyUrl: `${domain}/api/createPaymentConfirmationSub`,
    nameFirst: session?.user.name,
    emailAddress: session?.user.email,
    paymentId: paymentId,
    amount: product.price.toFixed(2),
    itemName: product.name,
    itemDescription: product.id,
    emailConfirmation: 1,
    confirmationAddress: session?.user.email,
    subscriptionType: 1,
    recurringAmount: product.price.toFixed(2),
    frequency: 3,
    cycles: 12,
  }

  // _____________________________________________________
  // STANDARD PAYMENT DATA
  const standardData: any = []

  standardData["merchant_id"] = paymentData.merchantId
  standardData["merchant_key"] = paymentData.merchantKey
  standardData["return_url"] = paymentData.returnUrl
  standardData["cancel_url"] = paymentData.cancelUrl
  standardData["notify_url"] = paymentData.stdNotifyUrl
  standardData["name_first"] = paymentData.nameFirst
  standardData["email_address"] = paymentData.emailAddress
  standardData["m_payment_id"] = paymentData.paymentId
  standardData["amount"] = paymentData.amount
  standardData["item_name"] = paymentData.itemName
  standardData["item_description"] = paymentData.itemDescription
  standardData["email_confirmation"] = paymentData.emailConfirmation
  standardData["confirmation_address"] = paymentData.confirmationAddress
  let standardSignature = generateSignature(standardData, passPhrase)
  standardData["signature"] = standardSignature

  // _____________________________________________________
  // SUBSCRIPTION PAYMENT DATA
  const subscriptionData: any = []

  subscriptionData["merchant_id"] = paymentData.merchantId
  subscriptionData["merchant_key"] = paymentData.merchantKey
  subscriptionData["return_url"] = paymentData.returnUrl
  subscriptionData["cancel_url"] = paymentData.cancelUrl
  subscriptionData["notify_url"] = paymentData.subNotifyUrl
  subscriptionData["name_first"] = paymentData.nameFirst
  subscriptionData["email_address"] = paymentData.emailAddress
  subscriptionData["m_payment_id"] = paymentData.paymentId
  subscriptionData["amount"] = paymentData.amount
  subscriptionData["item_name"] = paymentData.itemName
  subscriptionData["item_description"] = paymentData.itemDescription
  subscriptionData["email_confirmation"] = paymentData.emailConfirmation
  subscriptionData["confirmation_address"] = paymentData.confirmationAddress
  subscriptionData["subscription_type"] = paymentData.subscriptionType
  subscriptionData["recurring_amount"] = paymentData.recurringAmount
  subscriptionData["frequency"] = paymentData.frequency
  subscriptionData["cycles"] = paymentData.cycles
  let subscriptionSignature = generateSignature(subscriptionData, passPhrase)
  subscriptionData["signature"] = subscriptionSignature

  return (
    <div
      key={product.id}
      className={cn(
        "group flex min-w-80 flex-col divide-y divide-zinc-600 rounded-lg border border-transparent bg-background shadow-lg transition duration-300 md:hover:scale-105 dark:border-muted",
        "flex-1",
        "basis-1/3",
        "max-w-xs"
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
            <p className="mb-2 mt-3 font-bold underline">Includes:</p>
            <ul>
              {product.features.map((feat: string) => (
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
              ORDER
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
                over a period of 12 billing cycles. DearDegens.com does not
                offer refunds, and users can cancel their subscriptions at any
                time with immediate effect.
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

            {product.id === "001" && (
              <form action={`https://${pfHost}`} method="post">
                <input
                  type="hidden"
                  name="merchant_id"
                  value={paymentData.merchantId}
                />
                <input
                  type="hidden"
                  name="merchant_key"
                  value={paymentData.merchantKey}
                />
                <input
                  type="hidden"
                  name="return_url"
                  value={paymentData.returnUrl}
                />
                <input
                  type="hidden"
                  name="cancel_url"
                  value={paymentData.cancelUrl}
                />
                <input
                  type="hidden"
                  name="notify_url"
                  value={paymentData.stdNotifyUrl}
                />
                <input
                  type="hidden"
                  name="name_first"
                  value={paymentData.nameFirst!}
                />
                <input
                  type="hidden"
                  name="email_address"
                  value={paymentData.emailAddress!}
                />
                <input
                  type="hidden"
                  name="m_payment_id"
                  value={paymentData.paymentId}
                />
                <input type="hidden" name="amount" value={paymentData.amount} />
                <input
                  type="hidden"
                  name="item_name"
                  value={paymentData.itemName}
                />
                <input
                  type="hidden"
                  name="item_description"
                  value={paymentData.itemDescription}
                />
                <input
                  type="hidden"
                  name="email_confirmation"
                  value={paymentData.emailConfirmation}
                />
                <input
                  type="hidden"
                  name="confirmation_address"
                  value={paymentData.confirmationAddress!}
                />
                <input
                  type="hidden"
                  name="signature"
                  value={standardSignature}
                />
                {user[0].subscription !== "002" &&
                user[0].subscription !== "003" ? (
                  <Button
                    type="submit"
                    variant="secondary"
                    className="mt-5 w-full rounded-md bg-backgroundNegetive text-lg font-bold text-primaryNegetive hover:text-primary"
                  >
                    Proceed to Payment
                  </Button>
                ) : (
                  <p className="mt-2">
                    It seems you are{" "}
                    <span className="italic text-customAccent">
                      already have an active subscription.
                    </span>{" "}
                    If you would like to make changes to your current
                    subscription, please do so in your{" "}
                    <Link href="/account" className="underline">
                      Profile
                    </Link>{" "}
                    page.
                  </p>
                )}
              </form>
            )}

            {product.id === "002" && (
              <form action={`https://${pfHost}`} method="post">
                <input
                  type="hidden"
                  name="merchant_id"
                  value={paymentData.merchantId}
                />
                <input
                  type="hidden"
                  name="merchant_key"
                  value={paymentData.merchantKey}
                />
                <input
                  type="hidden"
                  name="return_url"
                  value={paymentData.returnUrl}
                />
                <input
                  type="hidden"
                  name="cancel_url"
                  value={paymentData.cancelUrl}
                />
                <input
                  type="hidden"
                  name="notify_url"
                  value={paymentData.subNotifyUrl}
                />
                <input
                  type="hidden"
                  name="name_first"
                  value={paymentData.nameFirst!}
                />
                <input
                  type="hidden"
                  name="email_address"
                  value={paymentData.emailAddress!}
                />
                <input
                  type="hidden"
                  name="m_payment_id"
                  value={paymentData.paymentId}
                />
                <input type="hidden" name="amount" value={paymentData.amount} />
                <input
                  type="hidden"
                  name="item_name"
                  value={paymentData.itemName}
                />
                <input
                  type="hidden"
                  name="item_description"
                  value={paymentData.itemDescription}
                />
                <input
                  type="hidden"
                  name="email_confirmation"
                  value={paymentData.emailConfirmation}
                />
                <input
                  type="hidden"
                  name="confirmation_address"
                  value={paymentData.confirmationAddress!}
                />
                <input
                  type="hidden"
                  name="subscription_type"
                  value={paymentData.subscriptionType}
                />
                <input
                  type="hidden"
                  name="recurring_amount"
                  value={paymentData.recurringAmount}
                />
                <input
                  type="hidden"
                  name="frequency"
                  value={paymentData.frequency}
                />
                <input type="hidden" name="cycles" value={paymentData.cycles} />
                <input
                  type="hidden"
                  name="signature"
                  value={subscriptionSignature}
                />
                {user[0].subscription !== "002" &&
                user[0].subscription !== "003" ? (
                  <Button
                    type="submit"
                    variant="secondary"
                    className="mt-5 w-full rounded-md bg-backgroundNegetive text-lg font-bold text-primaryNegetive hover:text-primary"
                  >
                    Proceed to Payment
                  </Button>
                ) : (
                  <p className="mt-2">
                    It seems you are{" "}
                    <span className="italic text-customAccent">
                      already have an active subscription.
                    </span>{" "}
                    If you would like to make changes to your current
                    subscription, please do so in your{" "}
                    <Link href="/profile" className="underline">
                      Profile
                    </Link>{" "}
                    page.
                  </p>
                )}
              </form>
            )}

            {product.id === "003" && (
              <form action={`https://${pfHost}`} method="post">
                <input
                  type="hidden"
                  name="merchant_id"
                  value={paymentData.merchantId}
                />
                <input
                  type="hidden"
                  name="merchant_key"
                  value={paymentData.merchantKey}
                />
                <input
                  type="hidden"
                  name="return_url"
                  value={paymentData.returnUrl}
                />
                <input
                  type="hidden"
                  name="cancel_url"
                  value={paymentData.cancelUrl}
                />
                <input
                  type="hidden"
                  name="notify_url"
                  value={paymentData.subNotifyUrl}
                />
                <input
                  type="hidden"
                  name="name_first"
                  value={paymentData.nameFirst!}
                />
                <input
                  type="hidden"
                  name="email_address"
                  value={paymentData.emailAddress!}
                />
                <input
                  type="hidden"
                  name="m_payment_id"
                  value={paymentData.paymentId}
                />
                <input type="hidden" name="amount" value={paymentData.amount} />
                <input
                  type="hidden"
                  name="item_name"
                  value={paymentData.itemName}
                />
                <input
                  type="hidden"
                  name="item_description"
                  value={paymentData.itemDescription}
                />
                <input
                  type="hidden"
                  name="email_confirmation"
                  value={paymentData.emailConfirmation}
                />
                <input
                  type="hidden"
                  name="confirmation_address"
                  value={paymentData.confirmationAddress!}
                />
                <input
                  type="hidden"
                  name="subscription_type"
                  value={paymentData.subscriptionType}
                />
                <input
                  type="hidden"
                  name="recurring_amount"
                  value={paymentData.recurringAmount}
                />
                <input
                  type="hidden"
                  name="frequency"
                  value={paymentData.frequency}
                />
                <input type="hidden" name="cycles" value={paymentData.cycles} />
                <input
                  type="hidden"
                  name="signature"
                  value={subscriptionSignature}
                />
                {user[0].subscription !== "002" &&
                user[0].subscription !== "003" ? (
                  <Button
                    type="submit"
                    variant="secondary"
                    className="mt-5 w-full rounded-md bg-backgroundNegetive text-lg font-bold text-primaryNegetive hover:text-primary"
                  >
                    Proceed to Payment
                  </Button>
                ) : (
                  <p className="mt-2">
                    It seems you{" "}
                    <span className="italic text-customAccent">
                      already have an active subscription.
                    </span>{" "}
                    If you would like to make changes to your current
                    subscription, please do so in your{" "}
                    <Link href="/Account" className="underline">
                      account
                    </Link>{" "}
                    page.
                  </p>
                )}
              </form>
            )}
            <div className="mt-8 flex flex-row items-center justify-end gap-2 text-sm italic">
              <p>Powered by</p>
              <div className="flex w-20 overflow-hidden rounded-full">
                <Image src={Payfast} alt="payfast_logo" />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
