import { z } from "zod"

import { phoneNumberRegex } from "../regex"
import { specialCharsRegex } from "../regex"

const currentYear = new Date().getFullYear()

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

export const listingTab = z.string()
export const listingCategory = z.string()
export const listingSubCategory = z.string()
export const listingCondition = z.string()
export const listingPrice = z
  .string()
  .min(2, {
    message: "Price must be at least 2 characters long",
  })
  .max(7, {
    message: "Price must be less than 7 characters long",
  })
// export const listingPrice = z.coerce
//   .number()
//   .max(9999999, { message: "Max price is 9,999,999" })
export const listingTitle = z
  .string()
  .min(1, {
    message: "Title must be at least 1 characters long",
  })
  .max(64, {
    message: "Title must be less than 64 characters long",
  })
  .refine((value) => !phoneNumberRegex.test(value), {
    message:
      "Phone number detected. You will be able to communicate with buyers once an offer is agreed upon.",
  })
  .refine((value) => !specialCharsRegex.test(value), {
    message: "Special characters are not allowed.",
  })
export const listingBrand = z
  .string()
  .min(1, {
    message: "Brand must be at least 1 characters long",
  })
  .max(64, {
    message: "Brand must be less than 64 characters long",
  })
  .refine((value) => !phoneNumberRegex.test(value), {
    message:
      "Phone number detected. You will be able to communicate with buyers once an offer is agreed upon.",
  })
  .refine((value) => !specialCharsRegex.test(value), {
    message: "Special characters are not allowed.",
  })
export const listingModel = z
  .string()
  .min(1, {
    message: "Model must be at least 1 characters long",
  })
  .max(128, {
    message: "Model must be less than 128 characters long",
  })
  .refine((value) => !phoneNumberRegex.test(value), {
    message:
      "Phone number detected. You will be able to communicate with buyers once an offer is agreed upon.",
  })
  .refine((value) => !specialCharsRegex.test(value), {
    message: "Special characters are not allowed.",
  })
export const listingDescription = z
  .string()
  .min(1, {
    message: "Description must be at least 1 characters long",
  })
  .max(5000, {
    message: "Description must be less than 5,000 characters long",
  })
  .refine((value) => !phoneNumberRegex.test(value), {
    message:
      "Phone number detected. You will be able to communicate with buyers once an offer is agreed upon.",
  })
export const listingItems = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    price: z.coerce.number(),
  })
)
// export const listingItems = z.array(
//   z.object({
//     id: z.string(),
//     name: z.string().max(64, {message: "Cannot be longer than 64 characters"}),
//     price: z.coerce.number().max(9999999, {message: "Max price is 9,999,999"}),
//   })
// )
export const listingImages = z.string()
export const listingLocation = z.string()
export const listingMeetup = z.string()

// Vehicle Listing Validators
export const listingMileage = z.string()
export const listingYear = z.string()
// export const listingMileage = z.coerce
//   .number()
//   .min(0, { message: "Mileage cannot be less than 0." })
//   .max(1000000, { message: "Surely this thing still can't be running?" })
// export const listingYear = z.coerce
//   .number()
//   .min(1900, { message: "Are you selling a 1885 Benz Patent Motor Car?" })
//   .max(currentYear, { message: "Are you Morty McFly or what?" })
export const listingTransmission = z.string()
export const listingFuel = z.string()
export const listingDisplayContact = z.boolean().default(false)
