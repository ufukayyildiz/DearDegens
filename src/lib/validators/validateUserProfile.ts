import { z } from "zod"
import { regexEmail, specialCharsRegex } from "../regex"
import { regexUppercase } from "../regex"
import { regexNumber } from "../regex"

export const validateEmail = z
  .string()
  .refine((value) => regexEmail.test(value), {
    message: "Not a valid email.",
  })

export const validateName = z
  .string()
  .min(3, { message: "Your full name cannot be shorter than 3 characters" })
  .max(128, { message: "Your full name cannot be longer than 128 characters" })
// .refine((value) => specialCharsRegex.test(value), {
//   message: "Your name cannot contain any special characters.",
// })

export const validateContact = z
  .string()
  .max(15, { message: "Contact number cannot be longer than 15 characters" })

export const validateUserProfile = z.object({
  name: validateName,
  email: validateEmail,
  contact: validateContact,
})

export const validateForgotPassword = z.object({
  email: z.string(),
})

export type UserProfileCreationRequest = z.infer<typeof validateUserProfile>
