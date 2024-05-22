"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/components-ui/AlertDialog"
import { Input } from "../components-ui/Input"
import { Button } from "@/src/components/components-ui/Button"
import { toast } from "@/src/hooks/use-toast"
import { ForgotPasswordCreationRequest } from "@/src/lib/validators/validateAuth"
import { useForm } from "@tanstack/react-form"
import type { FieldApi } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Loader2, AlertTriangle } from "lucide-react"
import { z } from "zod"
import { Checkbox } from "../components-ui/Checkbox"
import { Label } from "../components-ui/Label"
import { listingsType } from "@/src/types/db"

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.touchedErrors ? (
        <em className="absolute -bottom-8 text-rose-500">
          {field.state.meta.touchedErrors}
        </em>
      ) : null}
    </>
  )
}

export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState<boolean>(false)

  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      const payload: ForgotPasswordCreationRequest = {
        email: value.email,
      }
      forgotPassword(payload)
      console.log("Submit Payload:", payload)
    },
  })

  const { mutate: forgotPassword } = useMutation({
    // PAYLOAD
    mutationFn: async ({ email }: ForgotPasswordCreationRequest) => {
      const payload: ForgotPasswordCreationRequest = {
        email,
      }

      const { data } = await axios.post("/api/editForgotPassword", payload)

      return data
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description:
          "There was an error sending the password reset email. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      setSubmitted(true)
      return toast({
        title: "Success!",
        description:
          "Please check your account email for a link to change your password..",
      })
    },
  })

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="group flex h-9 items-center justify-center rounded-full border-2 border-transparent bg-background px-3 shadow-lg hover:border-customAccent">
          Forgot Password
        </AlertDialogTrigger>
        <AlertDialogContent>
          <form.Provider>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                event.stopPropagation()
                void form.handleSubmit()
              }}
              className="space-y-8"
            >
              <AlertDialogHeader>
                <AlertDialogTitle className="mb-5 font-bold">
                  <p className="italic">Forgot Password Reset:</p>
                </AlertDialogTitle>

                <AlertDialogDescription>
                  <div className="relative mb-10 grid grid-cols-1 gap-2">
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
                              onChange={(event) =>
                                field.handleChange(event.target.value)
                              }
                              className="w-full text-[17px] text-primary"
                              placeholder="Email"
                            />
                          </div>
                        )
                      }}
                    </form.Field>
                  </div>

                  <div>
                    <p className="text-xs italic">
                      (Note: Please supply your accound details, after which
                      we&apos;ll send you a link to reset your password.)
                    </p>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
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
                  {([canSubmit, isSubmitting]) =>
                    !submitted ? (
                      <div className="flex w-full flex-col justify-between gap-5 md:flex-row">
                        <div className="space-x-5">
                          <Button
                            type="submit"
                            disabled={!canSubmit}
                            variant="outline"
                            className="w-20"
                          >
                            {isSubmitting ? (
                              <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                              "Send"
                            )}
                          </Button>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </div>
                      </div>
                    ) : (
                      <AlertDialogAction onClick={() => setSubmitted(false)}>
                        Close
                      </AlertDialogAction>
                    )
                  }
                </form.Subscribe>
              </AlertDialogFooter>
            </form>
          </form.Provider>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
