import { z } from "zod"

import { phoneNumberRegex } from "../regex"

export const onChangeAsyncDebounceMs = 500
export const onChangeAsync = z.string().refine(
  async (value) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return !value.includes("error")
  },
  {
    message: "No 'error' allowed in message",
  }
)

export const listingCategory = z.string()
export const listingPrice = z.coerce.number()
export const listingTitle = z
  .string()
  .min(3, {
    message: "Title must be at least 3 characters long",
  })
  .max(64, {
    message: "Title must be less than 64 characters long",
  })
  .refine((value) => !phoneNumberRegex.test(value), {
    message:
      "Phone number detected. You will be able to communicate with buyers once an offer is agreed upon.",
  })
export const listingBrand = z
  .string()
  .min(3, {
    message: "Brand must be at least 3 characters long",
  })
  .max(64, {
    message: "Brand must be less than 64 characters long",
  })
  .refine((value) => !phoneNumberRegex.test(value), {
    message:
      "Phone number detected. You will be able to communicate with buyers once an offer is agreed upon.",
  })
export const listingModel = z
  .string()
  .min(3, {
    message: "Model must be at least 3 characters long",
  })
  .max(128, {
    message: "Model must be less than 128 characters long",
  })
  .refine((value) => !phoneNumberRegex.test(value), {
    message:
      "Phone number detected. You will be able to communicate with buyers once an offer is agreed upon.",
  })
export const listingDescription = z
  .string()
  .min(3, {
    message: "Description must be at least 3 characters long",
  })
  .max(5000, {
    message: "Description must be less than 5,000 characters long",
  })
  .refine((value) => !phoneNumberRegex.test(value), {
    message:
      "Phone number detected. You will be able to communicate with buyers once an offer is agreed upon.",
  })
export const listingImages = z.string()
export const listingLocation = z.string()
export const listingMeetup = z.string()
