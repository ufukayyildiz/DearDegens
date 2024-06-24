"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import Logo from "@/src/assets/deardegens2.png"
import UserAuthForm from "./UserAuthForm"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { zodValidator } from "@tanstack/zod-form-adapter"
import {
  SignUpCreationRequest,
  validateEmail,
} from "@/src/lib/validators/validateAuth"
import axios, { AxiosError } from "axios"
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

const SignUp = () => {
  const captchaKey = process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY!
  const [captchaValue, setCaptchaValue] = useState<string>("")
  const [disabled, setDisabled] = useState<boolean>(true)

  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
    },
    onSubmit: async ({ value }) => {
      if (value.password === value.confirm) {
        const payload: SignUpCreationRequest = {
          name: value.name,
          email: value.email,
          password: value.password,
        }
        createAuthSignin(payload)
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

  const { mutate: createAuthSignin } = useMutation({
    // PAYLOAD
    mutationFn: async ({ email, password, name }: SignUpCreationRequest) => {
      const payload: SignUpCreationRequest = {
        name,
        email,
        password,
      }
      const post = await axios.post("/api/auth/register/", payload)
      return post
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 409) {
        return toast({
          title: "Email Already Exists.",
          description: "Please try registering with a different email address.",
          variant: "destructive",
        })
      }
      if (error.response?.status === 500) {
        return toast({
          title: "Something went wrong.",
          description:
            "There was an error while registering. Please try again.",
          variant: "destructive",
        })
      }
    },
    onSuccess: () => {
      form.reset()
      return toast({
        title: "Success!",
        description:
          "Your account was created successfully! Please check your mailbox for a verification email and click on the verification link to log in.",
      })
    },
  })

  const verifyCaptcha = async (token: string) => {
    try {
      const response = await axios.post(`/api/auth/captcha?token=${token}`)

      if (response.data.success === true) {
        setDisabled(false)
      }
    } catch (error) {
      console.error("Failed to verify CAPTCHA token, error:", error)
      return toast({
        title: "Semthing went wrong.",
        description:
          "Failed to verify the existence of a carbon based life form",
        variant: "destructive",
      })
    }
  }

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
          {/* NAME */}
          <form.Field name="name">
            {(field) => {
              return (
                <div className="relative w-full flex-col">
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    className="w-full text-[17px] text-primary"
                    placeholder="Full Name"
                  />
                  <FieldInfo field={field} />
                </div>
              )
            }}
          </form.Field>

          {/* EMAIL */}
          <form.Field
            name="email"
            validators={{
              onChange: validateEmail,
              onChangeAsyncDebounceMs: onChangeAsyncDebounceMs,
              onChangeAsync: onChangeAsync,
            }}
          >
            {(field) => {
              return (
                <div className="relative w-full flex-col">
                  <Input
                    type="email"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    className="w-full text-[17px] text-primary"
                    placeholder="Email"
                  />
                  <FieldInfo field={field} />
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
                    placeholder="Confirm Password"
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
                    onChange={(value: any) => verifyCaptcha(value)}
                  />
                )}
                <Button
                  type="submit"
                  disabled={disabled || !canSubmit}
                  variant="outline"
                  className="w-28"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Register"
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

export default SignUp
