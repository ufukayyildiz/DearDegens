import { parse } from "querystring"
import md5 from "md5"
import dns from "dns"
import axios from "axios"
import { db } from "@/src/server/db"
import { eq } from "drizzle-orm"
import { users } from "@/src/server/db/schema"
import { products } from "@/src/lib/categories/Products"
import {
  paymentResponseData,
  subscriptionResponseData,
  productType,
} from "@/src/types/subscription"

const getIpAddress = async (url: any) => {
  return new Promise((resolve, reject) => {
    dns.lookup(url, (err, address) => {
      if (err) reject(err)
      resolve(address)
    })
  })
}

const verifyPayfastSignature = (
  payfastParamStr: any,
  payFastSignature: any,
  payfastPassphrase = process.env.PASSPHRASE
) => {
  let tempPayfastParamStr
  if (payfastPassphrase === null) {
    tempPayfastParamStr = payfastParamStr
  } else {
    tempPayfastParamStr = `${payfastParamStr}&passphrase=${encodeURIComponent(
      // @ts-ignore
      payfastPassphrase
    )}`
  }

  const signature = md5(tempPayfastParamStr)

  return signature === payFastSignature
}

const verifyPayfastValidIP = async (urlReferer: any) => {
  const validHosts = [
    "www.payfast.co.za",
    "sandbox.payfast.co.za",
    "w1w.payfast.co.za",
    "w2w.payfast.co.za",
  ]

  try {
    let hostsIpAddress: any = []
    for (let i = 0; i < validHosts.length; i++) {
      const address = await getIpAddress(validHosts[i])
      hostsIpAddress = [...new Set(hostsIpAddress)]
      hostsIpAddress.push(address)
    }
    const refererIpAddress = await getIpAddress(
      urlReferer.replace("https://", "")
    )
    if (hostsIpAddress.length > 0 && refererIpAddress)
      return hostsIpAddress.includes(refererIpAddress)
  } catch (err) {
    console.error(err)
    return false
  }
  return false
}

const verifyPayfastPaymentData = (
  cartTotal: any,
  totalAmountCustomerPaid: any
) => {
  return !(cartTotal - totalAmountCustomerPaid > 0.01)
}

const payfastServerConfirmation = async (payfastHost: any, postData: any) => {
  const { data } = await axios.post(
    `https://${payfastHost}/eng/query/validate`,
    { ...postData }
  )

  if (data === "VALID") {
    return true
  }
  return false
}

export async function POST(request: any) {
  const referer = request.headers.get("referer")

  if (referer !== "https://www.payfast.co.za") {
    return new Response("Not Found", { status: 404 })
  }

  if (request.method === "POST") {
    const payfastHost = process.env.SANDBOXMODE
      ? "sandbox.payfast.co.za"
      : "www.payfast.co.za"

    // Read the request body as text
    const body = await request.text()

    // Check if the body is larger than 1MB
    if (body.length > 1e6) {
      return new Response("Payload too large", { status: 413 })
    }

    const responseData = parse(body) as paymentResponseData

    let payFastParamsString = ""
    let paymentAmount = 0

    products.map((product: productType) => {
      if (product.id === responseData.item_description) {
        let paymentAmount = product.price
      }
    })

    for (let key in responseData) {
      if (key !== "signature") {
        payFastParamsString += `${key}=${encodeURIComponent(
          // @ts-ignore
          responseData[key]
        )}&`
      }
    }

    payFastParamsString = payFastParamsString
      .slice(0, payFastParamsString.length - 1)
      .trim()
      .replace(/%20/g, "+")

    const isSignatureValid = verifyPayfastSignature(
      payFastParamsString,
      responseData.signature
    )

    const isIpAddressValid = await verifyPayfastValidIP(referer)

    const isPaymentDataValid = verifyPayfastPaymentData(
      paymentAmount,
      responseData.amount_gross
    )

    const isServerConfirmationValid = await payfastServerConfirmation(
      payfastHost,
      responseData
    )

    if (
      isSignatureValid &&
      isIpAddressValid &&
      isPaymentDataValid &&
      isServerConfirmationValid
    ) {
      if (responseData.item_description === products[1].id) {
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, responseData.email_address))
        if (!user) {
          return new Response("User could not be found.", { status: 404 })
        }
        const updatedMaxAds = user[0].maxAds! + 1
        const updatedMaxImages = user[0].maxImages! + 5

        await db
          .update(users)
          .set({
            subscription: products[1].id,
            maxAds: updatedMaxAds,
            maxImages: updatedMaxImages,
          })
          .where(eq(users.email, responseData.email_address))
      }

      console.log("Payment Successful")
      return new Response("Payment Successful", { status: 200 })
    } else {
      console.log("Payment Failed")
      return new Response("Payment Verification Failed", { status: 400 })
    }
  }

  return new Response("Method Not Allowed", { status: 405 })
}
