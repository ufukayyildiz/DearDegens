import { z } from "zod"

export const validateOffer = z.object({
  offerPrice: z.coerce
    .number()
    .min(1, {
      message: "Your price cannot be less than 1 Rand",
    })
    .max(999999999, {
      message: "Your price cannot be higher than 999,999,999 Rand",
    }),
  askPrice: z.coerce.number(),
  adId: z.string(),
  sellerId: z.string(),
  title: z.string().nullable(),
})

export type OfferCreationRequest = z.infer<typeof validateOffer>
