import { userType } from "@/src/types/db"
import React, { useState, useEffect } from "react"
import { Button } from "../components-ui/Button"
import { Input } from "../components-ui/Input"
import type { FieldApi } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "@tanstack/react-form"
import { Loader2 } from "lucide-react"
import { toast } from "@/src/hooks/use-toast"
import { useQueryClient } from "@tanstack/react-query"
import { onChangeAsync } from "@/src/lib/validators/validateListing"
import { onChangeAsyncDebounceMs } from "@/src/lib/validators/validateListing"
import { UserProfileCreationRequest } from "@/src/lib/validators/validateUserProfile"
import {
  validateEmail,
  validateName,
  validateContact,
} from "@/src/lib/validators/validateUserProfile"

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.touchedErrors ? (
        <em className=" text-rose-500">{field.state.meta.touchedErrors}</em>
      ) : null}
    </>
  )
}

interface ProfileDataFormProps {
  user: userType
  isFetching: boolean
  setEditCallback: (data: any) => void
}

export default function ProfileDataForm({
  user,
  isFetching,
  setEditCallback,
}: ProfileDataFormProps) {
  const [disabled, setDisabled] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const sendSetEditCallback = (state: any) => {
    setEditCallback(state)
  }
  const queryClient = useQueryClient()

  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      name: user[0].name,
      email: user[0].email,
      contact: user[0].contact || "",
    },
    onSubmit: async ({ value }) => {
      const payload: UserProfileCreationRequest = {
        name: value.name,
        email: value.email,
        contact: value.contact,
      }
      updateUserProfile(payload)
      setDisabled(true)
      console.log("Submit Payload:", payload)
    },
  })

  const { mutate: updateUserProfile } = useMutation({
    // PAYLOAD
    mutationFn: async ({
      name,
      email,
      contact,
    }: UserProfileCreationRequest) => {
      const payload: UserProfileCreationRequest = {
        name,
        email,
        contact,
      }

      const { data } = await axios.patch("/api/editUserProfile", payload)

      return data
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description:
          "There was an error updating your profile details. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      setSubmitted(true)
      return toast({
        title: "Success!",
        description: "Successfully updated profile details.",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["userInfo"],
        })
      }
    },
  })

  return (
    <div className="space-y-5 text-primary">
      <h2 className="mb-5 font-bold text-customAccent">User Details:</h2>
      <form.Provider>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void form.handleSubmit()
          }}
          className="space-y-5"
        >
          {/* NAME */}
          <form.Field
            name="name"
            validators={{
              onChange: validateName,
              onChangeAsyncDebounceMs: onChangeAsyncDebounceMs,
              onChangeAsync: onChangeAsync,
            }}
          >
            {(field) => (
              <>
                <div className="grid w-full grid-cols-2 items-center">
                  <p className="h-6 w-full font-bold">Full Name:</p>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-10 w-full text-primary"
                    placeholder="Full Name"
                    required
                  />
                  <FieldInfo field={field} />
                </div>
              </>
            )}
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
            {(field) => (
              <>
                <div className="grid w-full grid-cols-2 items-center">
                  <p className="h-6 w-full font-bold">Email:</p>
                  <Input
                    id={field.name}
                    type="email"
                    disabled={true}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-10 w-full text-primary"
                    placeholder="Email"
                    required
                  />
                  <FieldInfo field={field} />
                </div>
              </>
            )}
          </form.Field>

          {/* CONTACT */}
          <form.Field
            name="contact"
            validators={{
              onChange: validateContact,
              onChangeAsyncDebounceMs: onChangeAsyncDebounceMs,
              onChangeAsync: onChangeAsync,
            }}
          >
            {(field) => (
              <>
                <div className="grid w-full grid-cols-2 items-center">
                  <p className="h-6 w-full font-bold">Contact Number:</p>
                  <Input
                    id={field.name}
                    type="text"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-10 w-full text-primary"
                    placeholder="Contact Number"
                  />
                  <FieldInfo field={field} />
                </div>
              </>
            )}
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
            {([canSubmit, isSubmitting]) =>
              !submitted ? (
                <div className="flex w-full flex-row justify-end gap-5">
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
                  <Button
                    variant="secondary"
                    onClick={() => sendSetEditCallback(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex w-full flex-row justify-end gap-5">
                  <Button
                    variant="secondary"
                    onClick={() => sendSetEditCallback(false)}
                  >
                    Close
                  </Button>
                </div>
              )
            }
          </form.Subscribe>
        </form>
      </form.Provider>
    </div>
  )
}
