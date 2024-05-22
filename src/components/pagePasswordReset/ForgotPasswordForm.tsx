"use client"
import React, { useState, useEffect } from "react"
import { userType } from "@/src/types/db"
import axios from "axios"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { zodValidator } from "@tanstack/zod-form-adapter"
import type { FieldApi } from "@tanstack/react-form"
import { signOut } from "next-auth/react"
import {
  ResetPasswordCreationRequest,
  validatePassword,
} from "@/src/lib/validators/validateAuth"
import { toast } from "@/src/hooks/use-toast"
import { Input } from "../components-ui/Input"
import { Button } from "../components-ui/Button"
import {
  onChangeAsync,
  onChangeAsyncDebounceMs,
} from "@/src/lib/validators/validateListing"
import { Loader2 } from "lucide-react"
import ReCAPTCHA from "react-google-recaptcha"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

interface ForgotPasswordFormProps {
  user: userType[]
}

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.touchedErrors ? (
        <em className="z-50 text-xs text-rose-500">
          {field.state.meta.touchedErrors}
        </em>
      ) : null}
    </>
  )
}

export default function ForgotPasswordForm({ user }: ForgotPasswordFormProps) {
  const router = useRouter()
  const captchaKey = process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY!
  const [captchaValue, setCaptchaValue] = useState<string>("")
  const [disabled, setDisabled] = useState<boolean>(true)

  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      previousPassword: "",
      password: "",
      confirm: "",
    },
    onSubmit: async ({ value }) => {
      if (value.password === value.confirm) {
        const payload: ResetPasswordCreationRequest = {
          email: user[0].email,
          previousPassword: value.previousPassword,
          password: value.password,
        }
        resetPassword(payload)
        console.log("Submit Payload:", payload)
      } else {
        return toast({
          title: "Password miss match!",
          description:
            "The passwords supplied do not match, please re-enter your password",
        })
      }
    },
  })

  const { mutate: resetPassword } = useMutation({
    // PAYLOAD
    mutationFn: async ({
      email,
      password,
      previousPassword,
    }: ResetPasswordCreationRequest) => {
      const payload: ResetPasswordCreationRequest = {
        email,
        previousPassword,
        password,
      }
      const post = await axios.post("/api/auth/forgot-password/", payload)
      return post
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description:
          "There was an error while attempting to change your password. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      form.reset()

      router.push("/signin")

      return toast({
        title: "Success!",
        description: "Your password was changed successfully!",
      })
    },
  })

  useEffect(() => {
    if (captchaValue && captchaValue.length > 20) {
      setDisabled(false)
    }
  }, [captchaValue])

  return (
    <div className="flex flex-col">
      <h1 className="mt-10 text-center">
        Reset password for account:{" "}
        <span className="italic text-customAccent">{user[0].email}</span>
      </h1>
      <form.Provider>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void form.handleSubmit()
          }}
          className="mx-auto mt-5 w-full space-y-6 md:w-6/12"
        >
          {/* PASSWORD */}
          <form.Field
            name="password"
            validators={{
              onChange: validatePassword,
              onChangeAsyncDebounceMs: onChangeAsyncDebounceMs,
              onChangeAsync: onChangeAsync,
            }}
          >
            {(field) => {
              return (
                <div className="relative mb-10 w-full flex-col">
                  <Input
                    id={field.name}
                    type="password"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    className="w-full text-[17px] text-primary"
                    placeholder="New Password"
                  />
                  <FieldInfo field={field} />
                </div>
              )
            }}
          </form.Field>

          {/* CONFIRM PASSWORD */}
          <form.Field
            name="confirm"
            validators={{
              onChange: validatePassword,
              onChangeAsyncDebounceMs: onChangeAsyncDebounceMs,
              onChangeAsync: onChangeAsync,
            }}
          >
            {(field) => {
              return (
                <div className="relative mb-10 w-full flex-col">
                  <Input
                    id={field.name}
                    type="password"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    className="w-full text-[17px] text-primary"
                    placeholder="Confirm New Password"
                  />
                  <FieldInfo field={field} />
                </div>
              )
            }}
          </form.Field>
          <form.Subscribe
            /* @ts-ignore */
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
              state.isSubmitted,
              state.errors,
            ]}
          >
            {/* @ts-ignore */}
            {([canSubmit, isSubmitting]) => (
              <>
                {captchaKey && (
                  <ReCAPTCHA
                    sitekey={captchaKey}
                    onChange={(value: any) => setCaptchaValue(value)}
                  />
                )}
                <Button
                  type="submit"
                  disabled={disabled || !canSubmit}
                  variant="outline"
                  className=""
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </>
            )}
          </form.Subscribe>
        </form>
      </form.Provider>
    </div>
  )
}
