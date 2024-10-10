"use client"

import React, { useState } from "react"
import Link from "next/link"
import { AxiosError } from "axios"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components-ui/Select"
import { FieldLabel } from "../pageCreateMint/FieldLabel"
import { Button } from "@/src/components/components-ui/Button"
import { toast } from "@/src/hooks/use-toast"
import {
  UserReportCreationRequest,
  reportDescription,
} from "@/src/lib/validators/validateUserReport"
import { useForm } from "@tanstack/react-form"
import type { FieldApi } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Loader2, AlertTriangle } from "lucide-react"
import { z } from "zod"
import { Checkbox } from "../components-ui/Checkbox"
import { Label } from "../components-ui/Label"
import { Textarea } from "../components-ui/Textarea"
import { userActivities } from "@/src/lib/categories/Report"
import { cn } from "@/src/lib/utils"

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

interface UserReportProps {
  id: string
  qrymsgId: string
  userId: string
  authorId: string
}

export default function UserReport({
  id,
  qrymsgId,
  userId,
  authorId,
}: UserReportProps) {
  const [disabled, setDisabled] = useState<boolean>(true)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [infraction, setInfraction] = useState<string>("")
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false)
  const tooltip = document.getElementById(`${id}`)
  tooltip?.addEventListener("mouseover", () => {
    setTooltipVisible(true)
  })
  tooltip?.addEventListener("mouseout", () => {
    setTooltipVisible(false)
  })

  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      description: "",
      infraction: "",
      qrymsgId: qrymsgId,
      userId: userId,
      authorId: authorId,
    },
    onSubmit: async ({ value }) => {
      const payload: UserReportCreationRequest = {
        description: value.description,
        infraction: infraction,
        qrymsgId: qrymsgId,
        userId: userId,
        authorId: authorId,
      }
      createQuery(payload)
      setDisabled(true)
      console.log("Submit Payload:", payload)
    },
  })

  const { mutate: createQuery } = useMutation({
    // PAYLOAD
    mutationFn: async ({
      description,
      infraction,
      qrymsgId,
      authorId,
      userId,
    }: UserReportCreationRequest) => {
      const payload: UserReportCreationRequest = {
        description,
        infraction,
        qrymsgId,
        authorId,
        userId,
      }

      const { data } = await axios.post("/api/createUserReport", payload)

      return data
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        return toast({
          title: "Authentication Error.",
          description: "Unauthorised, please login.",
          variant: "destructive",
        })
      }
      if (error.response?.status === 429) {
        return toast({
          title: "Too Many Requests.",
          description: "Please wait 30sec before trying again.",
          variant: "destructive",
        })
      }
      if (error.response?.status === 500) {
        return toast({
          title: "Something went wrong.",
          description:
            "Your report was not published as there was an error connecting to the server. Please try again.",
          variant: "destructive",
        })
      }
    },
    onSuccess: () => {
      setSubmitted(true)
      form.reset()
      return toast({
        description: "Your report is on the way to DearDegens Support.",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      }
    },
  })

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger
          id={`${id}`}
          className="group relative flex h-10 w-10 items-center justify-center hover:text-orange-500"
        >
          <p
            className={cn(
              "absolute -top-10 hidden h-8 w-[85px] items-center justify-center rounded-md border border-muted bg-background p-1 text-center text-xs text-primary opacity-0 shadow-md",
              tooltipVisible &&
                "flex opacity-100 transition-opacity duration-200 ease-in"
            )}
          >
            Report User
          </p>
          <AlertTriangle />
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
                  <p className="italic">Report User:</p>
                </AlertDialogTitle>

                <AlertDialogDescription>
                  <div className="relative mb-10 grid grid-cols-1 gap-2">
                    {/* CATEGORY */}
                    <form.Field name="infraction">
                      {(field) => {
                        return (
                          <div className="relative mb-10 w-full flex-col">
                            <div className="flex w-full justify-between">
                              <FieldLabel>Users activities:</FieldLabel>
                              <FieldLabel className="py-2 text-xs italic text-rose-400">
                                (required)
                              </FieldLabel>
                            </div>

                            <Select
                              required
                              onValueChange={(event) => setInfraction(event)}
                            >
                              <SelectTrigger className="w-full text-primary">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="max-h-96 overflow-auto p-2">
                                {userActivities.map((item, index) => (
                                  <div key={index}>
                                    <SelectItem
                                      className="border-2 text-primary hover:border-customAccent"
                                      value={item}
                                      key={item}
                                    >
                                      {item}
                                    </SelectItem>
                                  </div>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )
                      }}
                    </form.Field>

                    {/* DESCRIPTION */}
                    <form.Field
                      name="description"
                      validators={{
                        onChange: reportDescription,
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: z.string().refine(
                          async (value) => {
                            await new Promise((resolve) =>
                              setTimeout(resolve, 1000)
                            )
                            return !value.includes("error")
                          },
                          {
                            message: "No 'error' allowed in message",
                          }
                        ),
                      }}
                    >
                      {(field) => (
                        <>
                          <div className="flex h-5 w-full justify-between">
                            <label className="py-1 text-primary">
                              Additional information:
                            </label>
                            <label className="py-1 text-xs italic text-rose-400">
                              (optional)
                            </label>
                          </div>
                          <Textarea
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="h-32 w-full text-primary"
                            required
                          />
                          <FieldInfo field={field} />
                        </>
                      )}
                    </form.Field>
                  </div>

                  <div>
                    <p className="text-xs italic">
                      (Note: This report will not be shared with the user in
                      question. Once we recieve your report, we will evaluate
                      the contents of the report against our terms of service
                      and DearDegens disclaimer. In the event of an infringment,
                      we will block the user and notify the authorities if
                      necessary.)
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
                        <div className="flex items-center justify-start space-x-2">
                          <Checkbox
                            id="disable"
                            checked={!disabled}
                            onCheckedChange={() => setDisabled(!disabled)}
                          />
                          <Label
                            htmlFor="disable"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            <Link href="/termsofservice" className="underline">
                              Agree to terms of service.
                            </Link>
                          </Label>
                        </div>
                        <div className="flex flex-row space-x-5">
                          <Button
                            type="submit"
                            disabled={disabled || !canSubmit}
                            variant="outline"
                            className="w-20"
                          >
                            {isSubmitting ? (
                              <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                              "Send"
                            )}
                          </Button>
                          <AlertDialogCancel onClick={() => setDisabled(true)}>
                            Cancel
                          </AlertDialogCancel>
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
