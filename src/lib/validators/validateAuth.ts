import { z } from "zod"
import { regexEmail, specialCharsRegex } from "../regex"
import { regexUppercase } from "../regex"
import { regexNumber } from "../regex"
import { validateName } from "./validateUserProfile"

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
  name: validateName,
  email: validateEmail,
  password: validatePassword,
})

export const validateResetPassword = z.object({
  email: z.string(),
  previousPassword: validatePassword,
  password: validatePassword,
})

export const validateForgotPassword = z.object({
  email: z.string(),
})

export type SignInCreationRequest = z.infer<typeof validateSignIn>
export type SignUpCreationRequest = z.infer<typeof validateSignUp>
export type ResetPasswordCreationRequest = z.infer<typeof validateResetPassword>
export type ForgotPasswordCreationRequest = z.infer<
  typeof validateForgotPassword
>
