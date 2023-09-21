"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/src/hooks/use-toast"
import { categoryGaming } from "@/src/lib/categories/mintGaming"
import { AdCreationRequest, MintValidator } from "@/src/lib/validators/mint"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components-ui/Accordion"
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

type FormData = z.infer<typeof MintValidator>

export default function MintGaming() {
  const router = useRouter()

  const [categoryValue, setCategoryValue] = useState<string | undefined>('')
 
  console.log('categoryValue:', categoryValue)

  // Initialise useForm
  const form = useForm<FormData>({
    resolver: zodResolver(MintValidator),
    defaultValues: {
      category: "",
      subCategory: "",
      price: 0,
      title: "",
      brand: "",
      model: "",
      description: "",
      images: "",
      meetup: "",
    },
  })

  const { mutate: createPost } = useMutation({
    // PAYLOAD
    mutationFn: async ({
      category,
      subCategory,
      price,
      title,
      brand,
      model,
      description,
      images,
      meetup,
    }: AdCreationRequest) => {
      const payload: AdCreationRequest = {
        category,
        subCategory,
        price,
        title,
        brand,
        model,
        description,
        images,
        meetup,
      }
      const { data } = await axios.post("/api/post/create", payload)

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
      router.push("/p/home")

      router.refresh()

      return toast({
        description: "Your post has been published.",
      })
    },
  })

  async function onSubmit(data: FormData) {
    const payload: AdCreationRequest = {
      category: data.category,
      subCategory: data.subCategory,
      price: data.price,
      title: data.title,
      brand: data.brand,
      model: data.model,
      description: data.description,
      images: data.images,
      meetup: data.meetup,
    }
    console.log("payload:", payload)
    createPost(payload)
  }

  return (
    <div className="mt-10 mx-auto w-full rounded-lg bg-background p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-row gap-10">
            {/* CATEGORY */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-60">
                        <SelectValue {...field} />
                      </SelectTrigger>
                      <SelectContent className=" max-h-60 overflow-auto p-2">
                        {categoryGaming.map((category, index) => (
                          <div key={index}>
                            <hr className="mb-2"></hr>
                            <p className="font-bold" key={category.name}>
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
          </div>

          {/* PRICE */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input {...field} type="number" className="w-44" />
                </FormControl>
                <FormDescription>Have a price in mind?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* TITLE */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  What are we listing for you today?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* DESCRIPTION */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  Good descriptions = Speedy sales!
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="outline" form="">
            Sell!
          </Button>
        </form>
      </Form>
    </div>
  )
}
