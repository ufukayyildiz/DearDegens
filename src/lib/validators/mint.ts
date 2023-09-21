import { z } from "zod"

export const MintValidator = z.object({
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
    }),
  brand: z
    .string()
    .min(3, {
      message: "Brand must be at least 3 characters long",
    })
    .max(64, {
      message: "Brand must be less than 64 characters long",
    }),
  model: z
    .string()
    .min(3, {
      message: "Model must be at least 3 characters long",
    })
    .max(128, {
      message: "Title must be less than 128 characters long",
    }),
  description: z
    .string()
    .min(3, {
      message: "Description must be at least 3 characters long",
    })
    .max(255, {
      message: "Description must be less than 255 characters long",
    }),
  images: z.string(),
  location: z.string(),
  meetup: z.string(),
})

export type AdCreationRequest = z.infer<typeof MintValidator>


