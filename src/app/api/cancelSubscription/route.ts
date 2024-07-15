import { getServerSession } from "next-auth"
import { ISO8601Timestamp } from "@/src/lib/utils"
import axios from "axios"
import { db } from "@/src/server/db"
import { users } from "@/src/server/db/schema"
import { eq } from "drizzle-orm"
import { products } from "@/src/lib/categories/Products"
import { getAuthSession } from "@/src/lib/auth/auth-options"

export async function PUT(req: Request) {
  try {
    const session = await getAuthSession()
    console.log("session", session)
    const sandboxMode = process.env.SANDBOXMODE
    const merchantIdEnv = process.env.MERCHANT_ID
    const passPhrase = process.env.PASSPHRASE!
    const apiVersion = process.env.API_VERSION
    const timestamp = ISO8601Timestamp()
    const crypto = require("crypto")
    const body = await req.json()
    const { token } = body

    if (!session) {
      return new Response("Unauthorised, please login.", { status: 401 })
    }

    if (token === (undefined || "")) {
      return new Response("No subscription token supplied.", { status: 409 })
    }

    // GENERATE SIGNATURE
    const generateSignature = (data: any, passPhrase: any) => {
      // Arrange the array by key alphabetically for API calls
      let ordered_data: any = {}

      Object.keys(data)
        .sort()
        .forEach((key) => {
          ordered_data[key] = data[key]
        })
      data = ordered_data

      // Create the get string
      let getString = ""
      for (let key in data) {
        getString +=
          key + "=" + encodeURIComponent(data[key]).replace(/%20/g, "+") + "&"
      }

      // Remove the last '&'
      getString = getString.substring(0, getString.length - 1)
      return crypto.createHash("md5").update(getString).digest("hex")
    }

    const apiData = {
      merchantId: parseInt(merchantIdEnv!),
      version: apiVersion,
      timestamp: timestamp,
      passphrase: passPhrase,
    }

    let data: any = []
    data["merchant-id"] = apiData.merchantId
    data["passphrase"] = apiData.passphrase
    data["timestamp"] = apiData.timestamp
    data["version"] = apiData.version
    let signature = generateSignature(data, passPhrase)

    if (sandboxMode && token !== (undefined || "")) {
      const subscription = await axios.put(
        `https://api.payfast.co.za/subscriptions/${token}/cancel?testing=true`,
        {},
        {
          headers: {
            "merchant-id": apiData.merchantId,
            version: apiData.version,
            timestamp: apiData.timestamp,
            signature: signature,
          },
        }
      )

      if (subscription.data.status === "success") {
        const user = await db
          .select()
          .from(users)
          .where(eq(users.id, session.user.id))

        let subscriptionId: string = products[0].id

        if (user[0].maxAds! > products[0].ads) {
          subscriptionId = products[1].id
        }

        await db
          .update(users)
          .set({ subscription: subscriptionId, subscriptionToken: "" })
          .where(eq(users.id, session.user.id))

        console.log("User subscription cancelled successful (sandbox)")
        return new Response(JSON.stringify(subscription.data.response), {
          status: 200,
        })
      }
    }

    if (!sandboxMode && token !== (undefined || "")) {
      const subscription = await axios.put(
        `https://api.payfast.co.za/subscriptions/${token}/cancel`,
        {},
        {
          headers: {
            "merchant-id": apiData.merchantId,
            version: apiData.version,
            timestamp: apiData.timestamp,
            signature: signature,
          },
        }
      )

      if (subscription.data.status === "success") {
        const user = await db
          .select()
          .from(users)
          .where(eq(users.id, session.user.id))
        let subscriptionId: string = products[0].id

        if (user[0].maxAds! > products[0].ads) {
          subscriptionId = products[1].id
        }

        await db
          .update(users)
          .set({ subscription: subscriptionId, subscriptionToken: "" })
          .where(eq(users.id, session.user.id))

        console.log("User subscription cancelled successful")
        return new Response(JSON.stringify(subscription.data.response), {
          status: 200,
        })
      }
    }
  } catch (error) {
    console.error("Server Error: Failed to cancel user subscription - ", error)
    return new Response("Failed to cancel user subscription.", { status: 500 })
  }
}
