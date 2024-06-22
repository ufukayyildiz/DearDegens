import { z } from "zod"

export const validateOfferList = z.object({
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
  adTitle: z.string(),
  itemId: z.string(),
  sellerId: z.string(),
  itemName: z.string().nullable(),
})

export type OfferListCreationRequest = z.infer<typeof validateOfferList>
