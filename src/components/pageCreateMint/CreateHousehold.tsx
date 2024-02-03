"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "@/src/hooks/use-toast"
import { categoryHousehold } from "@/src/lib/categories/mintHousehold"
import { southAfrica } from "@/src/lib/locations/southAfrica"
import { HouseholdCreationRequest } from "@/src/lib/validators/validateHousehold"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "@tanstack/react-form"
import type { FieldApi } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { Loader2 } from "lucide-react"

import { Button } from "../components-ui/Button"
import { Checkbox } from "../components-ui/Checkbox"
import { Label } from "../components-ui/Label"
import { FieldDescription } from "./FieldDescription"
import { FieldLabel } from "./FieldLabel"

import { Input } from "../components-ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components-ui/Select"

import {
  listingTitle,
  listingBrand,
  listingCategory,
  listingDescription,
  listingImages,
  listingLocation,
  listingMeetup,
  listingModel,
  listingPrice,
  onChangeAsync,
  onChangeAsyncDebounceMs,
} from "@/src/lib/validators/validateListing"

import { Textarea } from "../components-ui/Textarea"
import ListingSelectImage from "./ListingSelectImage"

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  console.log("field", field, field.state.meta.touchedErrors)
  return (
    <>
      {field.state.meta.touchedErrors ? (
        <em className="absolute -bottom-4 text-xs italic text-rose-400">
          {field.state.meta.touchedErrors}
        </em>
      ) : null}
    </>
  )
}

export default function CreateHousehold() {
  const router = useRouter()
  const [disabled, setDisabled] = useState<boolean>(true)

  // USER BUCKET
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const callSelectedImages = (data: string[]) => {
    setSelectedImages(data)
  }

  // TANSTACK-HOOK-FORM
  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      category: "",
      price: 0,
      title: "",
      brand: "",
      model: "",
      description: "",
      images: "",
      location: "",
      meetup: "",
    },
    onSubmit: async ({ value }) => {
      const payload: HouseholdCreationRequest = {
        category: value.category,
        price: value.price,
        title: value.title,
        brand: value.brand,
        model: value.model,
        description: value.description,
        images: JSON.stringify(selectedImages),
        location: value.location,
        meetup: value.meetup,
      }
      createPost(payload)
      setDisabled(true)
      console.log("Submit Payload:", payload)
    },
  })

  // MUTATION LISTING
  const { mutate: createPost } = useMutation({
    // PAYLOAD
    mutationFn: async ({
      category,
      price,
      title,
      brand,
      model,
      description,
      images,
      location,
      meetup,
    }: HouseholdCreationRequest) => {
      const payload: HouseholdCreationRequest = {
        category,
        price,
        title,
        brand,
        model,
        description,
        images,
        location,
        meetup,
      }
      const { data } = await axios.post("/api/createHousehold", payload)

      return data
    },

    // ERROR
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not published. Please try again.",
        variant: "destructive",
      })
    },

    // SUCCESS
    onSuccess: () => {
      router.push("/p/mymints")
      router.refresh()
      return toast({
        description: "Your post has been published.",
      })
    },
  })

  return (
    <div className="mx-auto mb-32 mt-10 w-full rounded-lg bg-background p-2">
      {/* LISTING IMAGES */}
      <ListingSelectImage onSelectedImages={callSelectedImages} />

      <form.Provider>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void form.handleSubmit()
          }}
          className="space-y-8"
        >
          <div className="flex flex-col gap-10 md:flex-row">
            {/* CATEGORY */}
            <form.Field
              name="category"
            >
              {(field) => {
                return (
                  <div className="relative w-full flex-col">
                    <div className="flex w-full justify-between">
                      <FieldLabel>Category</FieldLabel>
                      <FieldLabel className="py-2 text-xs italic text-rose-400">
                        (required)
                      </FieldLabel>
                    </div>

                    <Select
                      required
                      onValueChange={(event) => field.handleChange(event)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-96 overflow-auto p-2">
                        {categoryHousehold.map((category, index) => (
                          <div key={index}>
                            <hr className="mb-10"></hr>
                            <p
                              className="text-lg font-bold text-primary"
                              key={category.name}
                            >
                              {category.name}
                            </p>
                            {category.subCategories.map((subs) => (
                              <SelectItem key={subs} value={subs}>
                                {subs}
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      Select an appropriate category..
                    </FieldDescription>
                  </div>
                )
              }}
              </form.Field>

            {/* PRICE */}
            <form.Field
              name="price"
              validators={{
                onChange: listingPrice,
                onChangeAsyncDebounceMs: onChangeAsyncDebounceMs,
                onChangeAsync: onChangeAsync,
              }}
            >
              {(field) => (
                <div className="relative w-full flex-col">
                  <div className="flex w-full justify-between">
                    <FieldLabel>Price </FieldLabel>
                    <FieldLabel className="py-2 text-xs italic text-rose-400">
                      (required)
                    </FieldLabel>
                  </div>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) =>
                      /* @ts-ignore */
                      field.handleChange(event.target.value)
                    }
                  />

                  <FieldDescription>Have a price in mind?</FieldDescription>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </div>

          {/* TITLE */}
          <form.Field
            name="title"
            validators={{
              onChange: listingTitle,
              onChangeAsyncDebounceMs: onChangeAsyncDebounceMs,
              onChangeAsync: onChangeAsync,
            }}
          >
            {(field) => (
              <div className="relative w-full flex-col">
                <div className="flex w-full justify-between">
                  <FieldLabel>Title</FieldLabel>
                  <FieldLabel className="py-2 text-xs italic text-rose-400">
                    (required)
                  </FieldLabel>
                </div>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full text-primary"
                  required
                />
                <FieldDescription>
                  What are we listing for you today?
                </FieldDescription>
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <div className="flex w-full flex-col justify-between gap-10 md:flex-row">
            {/* BRAND */}
            <form.Field
              name="brand"
              validators={{
                onChange: listingBrand,
                onChangeAsyncDebounceMs: onChangeAsyncDebounceMs,
                onChangeAsync: onChangeAsync,
              }}
            >
              {(field) => (
                <div className="relative w-full flex-col">
                  <div className="flex w-full justify-between">
                    <FieldLabel>Brand</FieldLabel>
                  </div>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full text-primary"
                    required
                  />
                  <FieldDescription>
                    It&apos;s all about the branding..
                  </FieldDescription>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* MODEL */}
            <form.Field
              name="model"
              validators={{
                onChange: listingModel,
                onChangeAsyncDebounceMs: onChangeAsyncDebounceMs,
                onChangeAsync: onChangeAsync,
              }}
            >
              {(field) => (
                <div className="relative w-full flex-col">
                  <div className="flex w-full justify-between">
                    <FieldLabel>Model</FieldLabel>
                  </div>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full text-primary"
                    required
                  />
                  <FieldDescription>Model name/number..</FieldDescription>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </div>

          {/* DESCRIPTION */}
          <form.Field
            name="description"
            validators={{
              onChange: listingDescription,
              onChangeAsyncDebounceMs: onChangeAsyncDebounceMs,
              onChangeAsync: onChangeAsync,
            }}
          >
            {(field) => (
              <div className="relative w-full flex-col">
                <div className="flex w-full justify-between">
                  <FieldLabel>Type your message here:</FieldLabel>
                  <FieldLabel className="py-2 text-xs italic text-rose-400">
                    (required)
                  </FieldLabel>
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
                <FieldDescription>
                  Good descriptions = Speedy sales!
                </FieldDescription>
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <div className="flex flex-col gap-10 md:flex-row">
            {/* LOCATION */}
            <form.Field
              name="location"
            >
              {(field) => {
                return (
                  <div className="relative w-full flex-col">
                    <div className="flex w-full justify-between">
                      <FieldLabel>Location:</FieldLabel>
                      <FieldLabel className="py-2 text-xs italic text-rose-400">
                        (required)
                      </FieldLabel>
                    </div>

                    <Select
                      required
                      onValueChange={(event) => field.handleChange(event)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-96 overflow-auto p-2">
                        {southAfrica.map((category, index) => (
                          <div key={index}>
                            <hr className="mb-10"></hr>
                            <p
                              className="text-lg font-bold text-primary"
                              key={category.name}
                            >
                              {category.name}
                            </p>
                            {category.subCategories.map((subs) => (
                              <SelectItem key={subs} value={subs}>
                                {subs}
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldDescription>Where are you from?</FieldDescription>
                  </div>
                )
              }}
              </form.Field>

            {/* MEETUP */}
            <form.Field
              name="meetup"
            >
              {(field) => {
                return (
                  <div className="relative w-full flex-col">
                    <div className="flex w-full justify-between">
                      <FieldLabel>Meeting preferance:</FieldLabel>
                      <FieldLabel className="py-2 text-xs italic text-rose-400">
                        (required)
                      </FieldLabel>
                    </div>

                    <Select
                      required
                      onValueChange={(event) => field.handleChange(event)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-96 overflow-auto p-2">
                        <SelectItem key="pub" value="public">
                          Meet in public
                        </SelectItem>
                        <SelectItem key="col" value="collect">
                          Buyer collects
                        </SelectItem>
                        <SelectItem key="del" value="deliver">
                          Deliver to buyer
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      How is this deal going down?
                    </FieldDescription>
                  </div>
                )
              }}
            </form.Field>
          </div>

          <div className="mb-10 flex items-center justify-start space-x-2">
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

          <div className="flex gap-10">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  variant="outline"
                  disabled={disabled || !canSubmit}
                  className="w-20 items-center justify-center"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Send"
                  )}
                </Button>
              )}
            />
            <Button className="w-20">
              <Link href={`/`}>Cancel</Link>
            </Button>
          </div>
        </form>
      </form.Provider>
    </div>
  )
}
