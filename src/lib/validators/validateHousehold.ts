import { z } from "zod"
import { phoneNumberRegex } from "../regex"

export const validateHousehold = z.object({
  category: z.string(),
  price: z
    .coerce.number()
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
    }).refine(
      (value) => !phoneNumberRegex.test(value), {
        message: "Phone number detected. You will be able to communicate with buyers once an offer is agreed upon."
      }
    ),
  brand: z
    .string()
    .min(3, {
      message: "Brand must be at least 3 characters long",
    })
    .max(64, {
      message: "Brand must be less than 64 characters long",
    }).refine(
      (value) => !phoneNumberRegex.test(value), {
        message: "Phone number detected. You will be able to communicate with buyers once an offer is agreed upon."
      }
    ),
  model: z
    .string()
    .min(3, {
      message: "Model must be at least 3 characters long",
    })
    .max(128, {
      message: "Model must be less than 128 characters long",
    }).refine(
      (value) => !phoneNumberRegex.test(value), {
        message: "Phone number detected. You will be able to communicate with buyers once an offer is agreed upon."
      }
    ),
  description: z
    .string()
    .min(3, {
      message: "Description must be at least 3 characters long",
    })
    .max(255, {
      message: "Description must be less than 255 characters long",
    }).refine(
      (value) => !phoneNumberRegex.test(value), {
        message: "Phone number detected. You will be able to communicate with buyers once an offer is agreed upon."
      }
    ),
  images: z.string(),
  location: z.string(),
  meetup: z.string(),
})

export type HouseholdCreationRequest = z.infer<typeof validateHousehold>


