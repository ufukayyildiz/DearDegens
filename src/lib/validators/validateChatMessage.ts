import { z } from "zod";

const validateChatMessage = z.object({
  message: z.string().max(200, {
    message: "Message must be less than 200 characters long",
  }),
  roomId: z.string(),
  userId: z.string(),
  userName: z.string()
})

export const validateMessage = z.string().max(200, {
  message: "Message must be less than 200 characters long",
})

export type ChatMessageCreationRequest = z.infer<typeof validateChatMessage>