"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "@/src/hooks/use-toast"
import { categoryHousehold } from "@/src/lib/categories/mintHousehold"
import { southAfrica } from "@/src/lib/locations/southAfrica"
import {
  HouseholdCreationRequest,
  validateHousehold,
} from "@/src/lib/validators/validateHousehold"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../components-ui/Button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components-ui/Form"
import { Input } from "../components-ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components-ui/Select"

import { Textarea } from "../components-ui/Textarea"
import ListingSelectImage from "./ListingSelectImage"
import ListingUploadImage from "./ListingUploadImage"

type FormData = z.infer<typeof validateHousehold>

export default function CreateHousehold() {
  const router = useRouter()

  // USER BUCKET
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const callSelectedImages = (data: string[]) => {
    setSelectedImages(data)
  }

  // REACT-HOOK-FORM
  const form = useForm<FormData>({
    resolver: zodResolver(validateHousehold),
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

  async function onSubmit(data: FormData) {
    const payload: HouseholdCreationRequest = {
      category: data.category,
      price: data.price,
      title: data.title,
      brand: data.brand,
      model: data.model,
      description: data.description,
      images: JSON.stringify(selectedImages),
      location: data.location,
      meetup: data.meetup,
    }
    createPost(payload)
  }

  return (
    <div className="mx-auto mb-32 mt-10 w-full rounded-lg bg-background p-2">
      {/* UPLOAD IMAGES */}
      <ListingUploadImage />

      {/* LISTING IMAGES */}
      <ListingSelectImage onSelectedImages={callSelectedImages} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-10 md:flex-row">
            {/* CATEGORY */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <div className="flex h-5 w-full justify-between">
                    <FormLabel className="py-1">Category </FormLabel>
                    <FormLabel className="py-1 text-xs italic text-rose-400">
                      (required)
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Select
                      required
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-60">
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
                  </FormControl>
                  <FormDescription>
                    Select an appropriate category..
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PRICE */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <div className="flex h-5 w-full justify-between">
                    <FormLabel className="py-1">Price </FormLabel>
                    <FormLabel className="py-1 text-xs italic text-rose-400">
                      (required)
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Input {...field} type="number" className="w-60" required />
                  </FormControl>
                  <FormDescription>Have a price in mind?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* TITLE */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-5 w-full justify-between">
                  <FormLabel className="py-1">Title </FormLabel>
                  <FormLabel className="py-1 text-xs italic text-rose-400">
                    (required)
                  </FormLabel>
                </div>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
                <FormDescription>
                  What are we listing for you today?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full flex-col justify-between gap-10 md:flex-row">
            {/* BRAND */}
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    It&apos;s all about the branding..
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* MODEL */}
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Model name/number..</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* DESCRIPTION */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-5 w-full justify-between">
                  <FormLabel className="py-1">Description </FormLabel>
                  <FormLabel className="py-1 text-xs italic text-rose-400">
                    (required)
                  </FormLabel>
                </div>
                <FormControl>
                  <Textarea {...field} required />
                </FormControl>
                <FormDescription>
                  Good descriptions = Speedy sales!
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-10 md:flex-row">
            {/* LOCATION */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <div className="flex h-5 w-full justify-between">
                    <FormLabel className="py-1">Location </FormLabel>
                    <FormLabel className="py-1 text-xs italic text-rose-400">
                      (required)
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Select
                      required
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-60">
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
                  </FormControl>
                  <FormDescription>Where are you from?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* MEET */}
            <FormField
              control={form.control}
              name="meetup"
              render={({ field }) => (
                <FormItem>
                  <div className="flex h-5 w-full justify-between">
                    <FormLabel className="py-1">Meeting preferance </FormLabel>
                    <FormLabel className="py-1 text-xs italic text-rose-400">
                      (required)
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Select
                      required
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-60">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-auto p-2">
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
                  </FormControl>
                  <FormDescription>
                    How is this deal going down?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-10">
            <Button type="submit" variant="outline">
              Send
            </Button>
            <Button>
              <Link href={`/`}>Cancel</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
