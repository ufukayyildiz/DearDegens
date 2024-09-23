import { z } from "zod"
import { regexWhiteSpace } from "../regex"

const validateChatMessage = z.object({
  message: z
    .string()
    .min(2, {
      message: "Message must be at least 2 characters long",
    })
    .max(200, {
      message: "Message must be less than 200 characters long",
    })
    .refine((value) => regexWhiteSpace.test(value), {
      message: "Message must contain text.",
    }),
  roomId: z.string(),
  userId: z.string(),
  userName: z.string(),
})

export const validateMessage = z
  .string()
  .min(2, {
    message: "Message must be at least 2 characters long",
  })
  .max(200, {
    message: "Message must be less than 200 characters long",
  })
  .refine((value) => regexWhiteSpace.test(value), {
    message: "Message must contain text.",
  })

export type ChatMessageCreationRequest = z.infer<typeof validateChatMessage>
