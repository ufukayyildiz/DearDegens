import { z } from "zod"

export const validateCounterOffer = z.object({
  counterPrice: z.coerce
    .number()
    .min(1, {
      message: "Your price cannot be less than 1 Rand",
    })
    .max(999999999, {
      message: "Your price cannot be higher than 999,999,999 Rand",
    }),
  userId: z.string(),
  sellerId: z.string(),
  offerId: z.string(),
  adId: z.string(),
  adTitle: z.string(),
})

export type CounterOfferCreationRequest = z.infer<typeof validateCounterOffer>
