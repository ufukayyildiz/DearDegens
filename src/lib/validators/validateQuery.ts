import { z } from "zod"

import { phoneNumberRegex } from "../regex"

export const validateQuery = z.object({
  adId: z.string(),
  sellerId: z.string(),
  adTitle: z.string(),
  adBrand: z.string(),
          adModel: z.string(),
          adSubCategory: z.string(),
          adLocation: z.string(),
  query: z
    .string()
    .min(3, {
      message: "Query must be at least 3 characters long",
    })
    .max(191, {
      message: "Query must be less than 191 characters long",
    })
    .refine((value) => !phoneNumberRegex.test(value), {
      message:
        "Phone number detected. You will be able to communicate with buyers once an offer is agreed upon.",
    }),
})

export type QueryCreationRequest = z.infer<typeof validateQuery>
