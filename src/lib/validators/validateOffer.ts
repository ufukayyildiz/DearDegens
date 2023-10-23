import { z } from "zod"

export const validateOffer = z.object({

  price: z
    .coerce.number()
    .min(1, {
      message: "Your price cannot be less than 1 Rand",
    })
    .max(999999999, {
    message: "Your price cannot be higher than 999,999,999 Rand",
  }),
})

export type OfferCreationRequest = z.infer<typeof validateOffer>


