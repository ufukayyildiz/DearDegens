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
import { Button } from "@/src/components/components-ui/Button"
import { toast } from "@/src/hooks/use-toast"
import {
  QueryReplyCreationRequest,
  validateQueryReply,
} from "@/src/lib/validators/validateQueryReply"
import { useForm } from "@tanstack/react-form"
import type { FieldApi } from "@tanstack/react-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { zodValidator } from "@tanstack/zod-form-adapter"
import axios from "axios"
import { MessageCircle, X } from "lucide-react"
import { z } from "zod"

import { Checkbox } from "../components-ui/Checkbox"
import { Label } from "../components-ui/Label"
import { Textarea } from "../components-ui/Textarea"

interface QueryReplyProps {
  queryId: string
}

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

export default function MintQueryReply({ queryId }: QueryReplyProps) {
  const queryClient = useQueryClient()
  const [disabled, setDisabled] = useState<boolean>(true)
  const [isPublic, setIsPublic] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      id: queryId,
      reply: "",
      isPublic: false,
    },
    onSubmit: async ({ value }) => {
      const payload: QueryReplyCreationRequest = {
        id: queryId,
        reply: value.reply,
        isPublic: isPublic,
      }
      createQuery(payload)
      setDisabled(true)
      setIsPublic(false)
      console.log("Submit Payload:", payload)
    },
  })

  const { mutate: createQuery } = useMutation({
    // PAYLOAD
    mutationFn: async ({ id, reply, isPublic }: QueryReplyCreationRequest) => {
      const payload: QueryReplyCreationRequest = {
        id,
        reply,
        isPublic,
      }

      const { data } = await axios.patch("/api/editQuery", payload)

      return data
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description:
          "There was an error sending your answer. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      setSubmitted(true)
      return toast({
        description: "Your answer is on the way to the buyer.",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["adQueries"],
        })
      }
    },
  })

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="hover:text-blue-500" variant="icon">
            <MessageCircle />
          </Button>
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
                  <p className="italic">
                    &apos;Answsers pave the way to enlightenment&apos;
                  </p>
                  <p className="text-xs">- Somebody</p>
                </AlertDialogTitle>

                <AlertDialogDescription>
                  <div className="relative mb-10 grid grid-cols-1 gap-2">
                    {/* REPLY */}
                    <form.Field
                      name="reply"
                      validators={{
                        onChange: z
                          .string()
                          .min(3, "Your reply must be at least 3 characters")
                          .max(
                            191,
                            "Your reply cannot be greater than 191 characters"
                          ),
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: z.string().refine(
                          async (value) => {
                            await new Promise((resolve) =>
                              setTimeout(resolve, 1000)
                            )
                            return !value.includes("error")
                          },
                          {
                            message: "No 'error' allowed in reply",
                          }
                        ),
                      }}
                    >
                      {(field) => (
                        <>
                          <div className="flex h-5 w-full justify-between">
                            <label className="py-1 text-primary">
                              Type your message here:
                            </label>
                            <label className="py-1 text-xs italic text-rose-400">
                              (required)
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

                  <div className="mb-5">
                    {/* ISPUBLIC */}
                    <form.Field name="isPublic">
                      {(field) => (
                        <>
                          <div className="flex items-center justify-start space-x-2">
                            <Checkbox
                              id={field.name}
                              name={field.name}
                              checked={isPublic}
                              onCheckedChange={() => setIsPublic(!isPublic)}
                              onChange={(e) => setIsPublic(true)}
                            />
                            <Label className="text-sm font-medium leading-none text-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Make public.
                            </Label>
                          </div>
                          <FieldInfo field={field} />
                        </>
                      )}
                    </form.Field>
                  </div>

                  <div>
                    <p className="text-xs italic">
                      (Note: By selecting &apos;Make public&apos; you agree to
                      sharing both the question and your answer with other users
                      on your ad listing page. This is to better inform other
                      users and reduce the chances of them potentially asking
                      the same question.)
                    </p>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <form.Subscribe
                  selector={(state) => [
                    state.canSubmit,
                    state.isSubmitting,
                    state.isSubmitted,
                    state.errors,
                  ]}
                >
                  {([canSubmit, isSubmitting]) =>
                    !submitted ? (
                      <div className="flex w-full justify-between">
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
                        <div className="flex gap-5">
                          <AlertDialogCancel onClick={() => setDisabled(true)}>
                            Cancel
                          </AlertDialogCancel>
                          <Button
                            type="submit"
                            disabled={disabled || !canSubmit}
                            variant="outline"
                            className="w-28"
                          >
                            {isSubmitting ? (
                              <p className="italic">whoosh!!</p>
                            ) : (
                              "Send"
                            )}
                          </Button>
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
