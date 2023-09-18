import { z } from 'zod'

export const MintValidator = z.object({
  type: z.string(),
  categorydoc: z.string(),
  categorynpm: z.string(),
  index: z
    .number()
    .max(128, {
      message: 'Cannot have more than 200 items',
    }),
  title: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters long',
    })
    .max(128, {
      message: 'Title must be less than 128 characters long',
    }),
  description: z
    .string()
    .min(3, {
      message: 'Description must be at least 3 characters long',
    })
    .max(255, {
      message: 'Description must be less than 255 characters long',
    }),
  content: z.any(),
})

export type AdCreationRequest = z.infer<typeof MintValidator>
