import axios from "axios"

export async function POST(request: Request) {
  try {
    const secret = process.env.GOOGLE_CAPTCHA_SECRET_KEY
    const url = new URL(request.url)

    const token = url.searchParams.get("token")
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
    )
    const verified = response.data

    console.log("Successfully verified user. Response:", verified)
    return new Response(JSON.stringify(verified), { status: 200 })
  } catch (error) {
    console.error("ERROR:", error)
    return new Response("Failed to fetch captcha user verification.", {
      status: 500,
    })
  }
}
