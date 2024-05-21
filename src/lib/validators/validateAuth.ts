import { z } from "zod"
import { regexEmail, specialCharsRegex } from "../regex"
import { regexUppercase } from "../regex"
import { regexNumber } from "../regex"

export const validatePassword = z
  .string()
  .min(8, { message: "Password needs to contain a minimum of 8 characters" })
  .refine((value) => specialCharsRegex.test(value), {
    message: "Password should conatin at least one of the following: &%$#@!",
  })
  .refine((value) => regexNumber.test(value), {
    message: "Password should contain at least one number",
  })
  .refine((value) => regexUppercase.test(value), {
    message: "Password should contain at least one uppercase letter.",
  })

export const validateEmail = z
  .string()
  .refine((value) => regexEmail.test(value), {
    message: "You need to supply a valid email.",
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
