"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import Logo from "@/src/assets/deardegens2.png"
import UserAuthForm from "./UserAuthForm"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { SignInCreationRequest } from "@/src/lib/validators/validateAuth"
import axios from "axios"
import bcrypt from "bcrypt"
import { signIn } from "next-auth/react"
import { Button } from "../components-ui/Button"
import { toast } from "@/src/hooks/use-toast"
import { validatePassword } from "@/src/lib/validators/validateAuth"
import { Input } from "../components-ui/Input"
import type { FieldApi } from "@tanstack/react-form"
import {
  onChangeAsync,
  onChangeAsyncDebounceMs,
} from "@/src/lib/validators/validateListing"
import { Loader2 } from "lucide-react"
import ReCAPTCHA from "react-google-recaptcha"
import { useRouter } from "next/navigation"

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

const SignIn = () => {
  const router = useRouter()
  const captchaKey = process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY!
  const [captchaValue, setCaptchaValue] = useState<string>("")
  const [disabled, setDisabled] = useState<boolean>(true)

  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const payload: SignInCreationRequest = {
        email: value.email,
        password: value.password,
      }
      console.log("Submit Payload:", payload)
      const response = await signIn("credentials", {
        email: payload.email,
        password: payload.password,
        redirect: true,
      })
    },
  })

  // const { mutate: createAuthSignin } = useMutation({
  //   // PAYLOAD
  //   mutationFn: async ({ email, password }: SignInCreationRequest) => {
  //     const payload: SignInCreationRequest = {
  //       email,
  //       password,
  //     }
  //     signIn("Credentials", {
  //       email: payload.email,
  //       password: payload.password,
  //       redirect: false,
  //     })
  //   },
  //   onError: () => {
  //     return toast({
  //       title: "Something went wrong.",
  //       description: "There was an error logging you in. Please try again.",
  //       variant: "destructive",
  //     })
  //   },
  // })

  useEffect(() => {
    if (captchaValue && captchaValue.length > 20) {
      setDisabled(false)
    }
  }, [captchaValue])

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6">
      <UserAuthForm />
      <form.Provider>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void form.handleSubmit()
          }}
          className="space-y-6"
        >
          {/* EMAIL */}
          <form.Field name="email">
            {(field) => {
              return (
                <div className="relative w-full flex-col">
                  <Input
                    id={field.name}
                    type="email"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    className="w-full text-[17px] text-primary"
                    placeholder="Email"
                  />
                </div>
              )
            }}
          </form.Field>

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
                    placeholder="Password"
                  />
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
                  className="w-20"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Login"
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

export default SignIn
