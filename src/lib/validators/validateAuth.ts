import { z } from "zod"
import { regexEmail, specialCharsRegex } from "../regex"
import { regexUppercase } from "../regex"
import { regexNumber } from "../regex"

export const validatePassword = z
  .string()
  .min(8, { message: "Requires minimum 8 characters" })
  .refine((value) => specialCharsRegex.test(value), {
    message: "Requires minimum one special character: &%$#@!",
  })
  .refine((value) => regexNumber.test(value), {
    message: "Requires minimum one number",
  })
  .refine((value) => regexUppercase.test(value), {
    message: "Requies minimum one uppercase letter.",
  })

export const validateEmail = z
  .string()
  .refine((value) => regexEmail.test(value), {
    message: "Not a valid email.",
  })

export const validateSignIn = z.object({
  email: z.string(),
  password: validatePassword,
})

export const validateSignUp = z.object({
  name: z
    .string()
    .max(128, { message: "Your full name cannot exceed 128 characters." }),
  email: validateEmail,
  password: validatePassword,
})

export type SignInCreationRequest = z.infer<typeof validateSignIn>
export type SignUpCreationRequest = z.infer<typeof validateSignUp>
