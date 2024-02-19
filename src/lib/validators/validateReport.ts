import { z } from "zod"

export const reportDescription = z
  .string()
  .min(3, {
    message: "Description must be at least 3 characters long",
  })
  .max(191, {
    message: "Description must be less than 191 characters long",
  })

export const validateReport = z.object({
  adId: z.string(),
  sellerId: z.string(),
  infraction: z.string(),
  description: reportDescription,
})



export type ReportCreationRequest = z.infer<typeof validateReport>
