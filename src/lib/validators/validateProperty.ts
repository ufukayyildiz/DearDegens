import { z } from "zod"

import { phoneNumberRegex } from "../regex"

export const validateProperty = z.object({
  category: z.string(),
  price: z.coerce
    .number()
    .min(1, {
      message: "Your price cannot be less than 1 Rand",
    })
    .max(999999999, {
      message: "Your price cannot be higher than 999,999,999 Rand",
    }),
  title: z
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
    }),
  description: z
    .string()
    .min(3, {
      message: "Description must be at least 3 characters long",
    })
    .max(1600, {
      message: "Description must be less than 1,600 characters long",
    })
    .refine((value) => !phoneNumberRegex.test(value), {
      message:
        "Phone number detected. You will be able to communicate with buyers once an offer is agreed upon.",
    }),
  bedroom: z.string(),
  bathroom: z.string(),
  garage: z.string(),
  parkingSpace: z.string(),
  internet: z.string(),
  petFriendly: z.boolean(),
  images: z.string(),
  location: z.string(),
  availableStart: z.coerce.date(),
  availableEnd: z.coerce.date(),
})

export type PropertyCreationRequest = z.infer<typeof validateProperty>

/*
  breakfast: z.boolean(),
  lunch: z.boolean(),
  supper: z.boolean(),
  selfCatering: z.boolean(),
  kitchen: z.boolean(),
  kitchenWare: z.boolean(),
  kitchenAppliances: z.boolean(),
  braai: z.boolean(),
  balcony: z.boolean(),
  patio: z.boolean(),
  oceanView: z.boolean(),
  scenicView: z.boolean(),
  pool: z.boolean(),
  hotTub: z.boolean(),
  aircon: z.boolean(),
*/