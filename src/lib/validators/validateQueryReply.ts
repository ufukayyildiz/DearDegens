import { z } from "zod"

import { phoneNumberRegex } from "../regex"

export const validateQueryReply = z.object({
  id: z.string(),
  isPublic: z.boolean(),
  reply: z
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

export type QueryReplyCreationRequest = z.infer<typeof validateQueryReply>
