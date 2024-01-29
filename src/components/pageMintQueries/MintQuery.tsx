"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
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
import { QueryCreationRequest } from "@/src/lib/validators/validateQuery"
import { useGetListing } from "@/src/server/services"
import { useForm } from "@tanstack/react-form"
import type { FieldApi } from "@tanstack/react-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { zodValidator } from "@tanstack/zod-form-adapter"
import axios from "axios"
import { HelpCircle } from "lucide-react"
import { z } from "zod"

import { Checkbox } from "../components-ui/Checkbox"
import { Label } from "../components-ui/Label"
import { Textarea } from "../components-ui/Textarea"

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

export default function MintQuery() {
  const queryClient = useQueryClient()
  const [disabled, setDisabled] = useState<boolean>(true)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const { mintId }: any = useParams()

  const getListing = useGetListing(mintId).data
  const listing = getListing && getListing[0]

  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      query: "",
      adId: listing?.id,
      sellerId: listing?.authorId,
      adTitle: listing?.title || "",
    },
    onSubmit: async ({ value }) => {
      const payload: QueryCreationRequest = {
        query: value.query,
        adId: listing?.id || "",
        sellerId: listing?.authorId || "",
        adTitle: listing?.title || "",
      }
      createQuery(payload)
      setDisabled(true)
      console.log("Submit Payload:", payload)
    },
  })

  const { mutate: createQuery } = useMutation({
    // PAYLOAD
    mutationFn: async ({
      query,
      adId,
      sellerId,
      adTitle,
    }: QueryCreationRequest) => {
      const payload: QueryCreationRequest = {
        query,
        adId,
        sellerId,
        adTitle,
      }

      const { data } = await axios.post("/api/createQuery", payload)

      return data
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "There was an error sending your query. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      setSubmitted(true)
      return toast({
        description: "Your query is on the way to the seller.",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ["notify"] })
      }
    },
  })

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="group flex h-10 w-7 items-center justify-center hover:text-blue-500">
          <HelpCircle />
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
                  <p className="italic">Have a question for the seller?</p>
                </AlertDialogTitle>

                <AlertDialogDescription>
                  <div className="relative mb-10 grid grid-cols-1 gap-2">
                    {/* REPLY */}
                    <form.Field
                      name="query"
                      validators={{
                        onChange: z
                          .string()
                          .min(3, "Your message must be at least 3 characters")
                          .max(
                            191,
                            "Your message cannot be greater than 191 characters"
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
                            message: "No 'error' allowed in message",
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

                  <div>
                    <p className="text-xs italic">
                      (Note: Once the seller recieves this message, they will
                      have the option of making the query public when they
                      reply. Both your message and the sellers reply will be
                      displayed on the listing page to better inform other
                      potential buyers.)
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
